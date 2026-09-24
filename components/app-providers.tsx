"use client";

import * as React from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import { loadPublicRuntimeConfig } from "@/lib/runtime-config";
import { createDataStore, type DataMode, type DataStore } from "@/lib/db";
import { emptyContentStore, loadContentStore } from "@/lib/content-store";
import { hasLegacyData } from "@/lib/legacy-migration";
import type { Actor, ContentSection, ContentStore, CustomItem, ItemState } from "@/types/content";
import { useToast } from "@/components/ui/toast";

const DEFAULT_WORLD = "mundinho-pra-sempre";
type ContextValue = {
  actor: Actor;
  setActor: (actor: Actor) => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  playUiSound: (kind?: "click" | "success") => void;
  mode: DataMode;
  loading: boolean;
  content: ContentStore;
  states: Record<string, ItemState>;
  customItems: CustomItem[];
  legacyAvailable: boolean;
  toggleItem: (input: { itemId: string; completed: boolean; section: ContentSection; entryKey: string; label: string }) => Promise<void>;
  addCustomItem: (input: Pick<CustomItem, "section" | "entry_key" | "title" | "description" | "difficulty" | "phase">) => Promise<void>;
  deleteCustomItem: (id: string) => Promise<void>;
  exportData: () => Promise<void>;
  importData: (file: File) => Promise<void>;
  migrateLegacy: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AppContext = React.createContext<ContextValue | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [actor, setActorState] = React.useState<Actor>("gr1d");
  const [soundEnabled, setSoundEnabledState] = React.useState(false);
  const [mode, setMode] = React.useState<DataMode>("preview-local");
  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState<ContentStore>(emptyContentStore);
  const [states, setStates] = React.useState<Record<string, ItemState>>({});
  const [customItems, setCustomItems] = React.useState<CustomItem[]>([]);
  const [legacyAvailable, setLegacyAvailable] = React.useState(false);
  const storeRef = React.useRef<DataStore | null>(null);
  const audioRef = React.useRef<AudioContext | null>(null);

  const refresh = React.useCallback(async () => {
    const store = storeRef.current;
    if (!store) return;
    const [nextStates, nextCustom] = await Promise.all([store.getStates(), store.getCustomItems()]);
    setStates(nextStates);
    setCustomItems(nextCustom);
  }, []);

  React.useEffect(() => {
    setActorState((localStorage.getItem("mundinho.actor") as Actor) || "gr1d");
    setSoundEnabledState(localStorage.getItem("mundinho.sound") === "1");
    setLegacyAvailable(hasLegacyData());
    let unsubscribe = () => {};
    let cancelled = false;

    (async () => {
      let client: SupabaseClient | null = null;
      let worldId = DEFAULT_WORLD;
      try {
        const config = await loadPublicRuntimeConfig();
        worldId = config.worldId || DEFAULT_WORLD;
        client = getBrowserSupabase(config) as SupabaseClient;
        const loadedContent = await loadContentStore(client);
        if (!cancelled) setContent(loadedContent);
      } catch (error) {
        console.warn("Supabase indisponível; usando prévia local.", error);
        toast({ title: "Prévia local", description: "Sem sincronização compartilhada nesta sessão.", variant: "warning" });
      }

      const store = createDataStore(client, worldId);
      storeRef.current = store;
      setMode(store.mode);
      await refresh();
      unsubscribe = store.subscribe(() => void refresh());
      if (!cancelled) setLoading(false);
    })().catch((error) => {
      console.error(error);
      toast({ title: "Falha ao abrir o mundinho", description: String(error), variant: "error" });
      setLoading(false);
    });

    return () => { cancelled = true; unsubscribe(); };
  }, [refresh, toast]);

  const setActor = React.useCallback((value: Actor) => { setActorState(value); localStorage.setItem("mundinho.actor", value); }, []);
  const setSoundEnabled = React.useCallback((value: boolean) => { setSoundEnabledState(value); localStorage.setItem("mundinho.sound", value ? "1" : "0"); }, []);

  const playUiSound = React.useCallback((kind: "click" | "success" = "click") => {
    if (!soundEnabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const context = audioRef.current ?? new AudioCtx();
    audioRef.current = context;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "square";
    oscillator.frequency.value = kind === "success" ? 880 : 440;
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.09);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(); oscillator.stop(context.currentTime + 0.09);
  }, [soundEnabled]);

  const toggleItem = React.useCallback(async (input: Parameters<ContextValue["toggleItem"]>[0]) => {
    if (!storeRef.current) return;
    await storeRef.current.setCompleted({ itemId: input.itemId, completed: input.completed, actor, section: input.section, entryKey: input.entryKey });
    playUiSound(input.completed ? "success" : "click");
    if (input.completed) toast({ title: "Advancement Made!", description: `${actor} marcou: ${input.label}`, variant: "advancement" });
    await refresh();
  }, [actor, playUiSound, refresh, toast]);

  const addCustomItem = React.useCallback(async (input: Parameters<ContextValue["addCustomItem"]>[0]) => { if (!storeRef.current) return; await storeRef.current.addCustomItem(input, actor); toast({ title: "Item adicionado", description: input.title, variant: "info" }); await refresh(); }, [actor, refresh, toast]);
  const deleteCustomItem = React.useCallback(async (id: string) => { if (!storeRef.current) return; await storeRef.current.deleteCustomItem(id, actor); toast({ title: "Item arquivado", description: "Soft delete aplicado; o histórico foi preservado.", variant: "warning" }); await refresh(); }, [actor, refresh, toast]);

  const exportData = React.useCallback(async () => {
    if (!storeRef.current) return;
    const payload = await storeRef.current.exportAll();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `mundinho-backup-${new Date().toISOString().slice(0, 10)}.json`; anchor.click(); URL.revokeObjectURL(url);
  }, []);

  const importData = React.useCallback(async (file: File) => { if (!storeRef.current) return; const payload = JSON.parse(await file.text()); await storeRef.current.importAll(payload, actor); await refresh(); toast({ title: "Backup importado", description: "O progresso foi mesclado no mundinho.", variant: "advancement" }); }, [actor, refresh, toast]);
  const migrateLegacy = React.useCallback(async () => { if (!storeRef.current) return; const result = await storeRef.current.migrateLegacy(actor); setLegacyAvailable(false); await refresh(); toast({ title: result.found ? "Progresso antigo migrado" : "Nada para migrar", description: result.found ? `${result.migrated} item(ns) recuperados.` : undefined, variant: result.found ? "advancement" : "info" }); }, [actor, refresh, toast]);

  return <AppContext.Provider value={{ actor, setActor, soundEnabled, setSoundEnabled, playUiSound, mode, loading, content, states, customItems, legacyAvailable, toggleItem, addCustomItem, deleteCustomItem, exportData, importData, migrateLegacy, refresh }}>{children}</AppContext.Provider>;
}

export function useMundinho() { const context = React.useContext(AppContext); if (!context) throw new Error("useMundinho precisa estar dentro de AppProviders"); return context; }
