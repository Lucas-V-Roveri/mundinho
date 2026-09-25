"use client";

import * as React from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import { classifyRuntimeConfig, loadPublicRuntimeConfig } from "@/lib/runtime-config";
import { createDataStore, type DataMode, type DataStore } from "@/lib/db";
import { emptyContentStore, loadContentStore } from "@/lib/content-store";
import { hasLegacyData } from "@/lib/legacy-migration";
import { buildSubitemMap } from "@/lib/progression-model";
import type { Actor, ContentSection, ContentStore, CustomItem, ItemState, PlayerItemState } from "@/types/content";
import { useToast } from "@/components/ui/toast";

const DEFAULT_WORLD = "mundinho-pra-sempre";

export type SyncStatus = "connecting" | "supabase" | "preview-local" | "error";
export type DataStatus = "loading" | "ready" | "error";

type ContextValue = {
  actor: Actor;
  setActor: (actor: Actor) => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  playUiSound: (kind?: "click" | "success") => void;
  mode: DataMode | null;
  syncStatus: SyncStatus;
  dataStatus: DataStatus;
  dataError: string | null;
  loading: boolean;
  retry: () => void;
  content: ContentStore;
  states: Record<string, ItemState>;
  playerStates: Record<string, PlayerItemState>;
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

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [actor, setActorState] = React.useState<Actor>("gr1d");
  const [soundEnabled, setSoundEnabledState] = React.useState(false);
  const [mode, setMode] = React.useState<DataMode | null>(null);
  const [syncStatus, setSyncStatus] = React.useState<SyncStatus>("connecting");
  const [dataStatus, setDataStatus] = React.useState<DataStatus>("loading");
  const [dataError, setDataError] = React.useState<string | null>(null);
  const [retryNonce, setRetryNonce] = React.useState(0);
  const [content, setContent] = React.useState<ContentStore>(emptyContentStore);
  const [states, setStates] = React.useState<Record<string, ItemState>>({});
  const [playerStates, setPlayerStates] = React.useState<Record<string, PlayerItemState>>({});
  const [customItems, setCustomItems] = React.useState<CustomItem[]>([]);
  const [legacyAvailable, setLegacyAvailable] = React.useState(false);
  const storeRef = React.useRef<DataStore | null>(null);
  const audioRef = React.useRef<AudioContext | null>(null);

  const retry = React.useCallback(() => {
    setSyncStatus("connecting");
    setDataStatus("loading");
    setDataError(null);
    setMode(null);
    storeRef.current = null;
    setRetryNonce((value) => value + 1);
  }, []);

  const refresh = React.useCallback(async () => {
    const store = storeRef.current;
    if (!store) throw new Error("A fonte de dados ainda não está pronta.");
    const [nextStates, nextPlayerStates, nextCustom] = await Promise.all([
      store.getStates(),
      store.getPlayerStates(),
      store.getCustomItems(),
    ]);
    setStates(nextStates);
    setPlayerStates(nextPlayerStates);
    setCustomItems(nextCustom);
  }, []);

  React.useEffect(() => {
    const storedActor = (localStorage.getItem("mundinho.actor") as Actor) || "gr1d";
    const preferenceFrame = window.requestAnimationFrame(() => {
      setActorState(storedActor);
      setSoundEnabledState(localStorage.getItem("mundinho.sound") === "1");
      setLegacyAvailable(hasLegacyData());
    });

    let unsubscribe = () => {};
    let cancelled = false;
    storeRef.current = null;

    const fail = (error: unknown) => {
      if (cancelled) return;
      const message = errorMessage(error);
      setSyncStatus("error");
      setDataStatus("error");
      setDataError(message);
      setMode(null);
      storeRef.current = null;
      toast({ title: "Falha de conexão", description: message, variant: "error" });
    };

    void (async () => {
      const config = await loadPublicRuntimeConfig();
      const configState = classifyRuntimeConfig(config);
      const worldId = config.worldId || DEFAULT_WORLD;

      if (configState.kind === "invalid") throw new Error(configState.reason);

      if (configState.kind === "absent") {
        const store = createDataStore(null, worldId);
        store.configureSubitems({});
        storeRef.current = store;
        await store.ensureCompatibility(storedActor);
        await refresh();
        if (cancelled) return;
        setContent(emptyContentStore);
        setMode("preview-local");
        setSyncStatus("preview-local");
        setDataStatus("error");
        setDataError("Configuração do Supabase ausente: a prévia local mantém apenas o estado deste navegador; o conteúdo compartilhado da wiki não pôde ser carregado.");
        unsubscribe = store.subscribe(() => {
          void refresh().catch(fail);
        });
        return;
      }

      const client = getBrowserSupabase(configState.config) as SupabaseClient;
      const loadedContent = await loadContentStore(client);
      const store = createDataStore(client, worldId);
      store.configureSubitems(buildSubitemMap(loadedContent.progression));
      storeRef.current = store;
      await store.ensureCompatibility(storedActor);
      await refresh();
      if (cancelled) return;

      setContent(loadedContent);
      setMode("supabase");
      setSyncStatus("supabase");
      setDataStatus("ready");
      setDataError(null);
      unsubscribe = store.subscribe(() => {
        void refresh().catch(fail);
      });
    })().catch(fail);

    return () => {
      cancelled = true;
      unsubscribe();
      window.cancelAnimationFrame(preferenceFrame);
    };
  }, [refresh, retryNonce, toast]);

  const setActor = React.useCallback((value: Actor) => {
    setActorState(value);
    localStorage.setItem("mundinho.actor", value);
  }, []);

  const setSoundEnabled = React.useCallback((value: boolean) => {
    setSoundEnabledState(value);
    localStorage.setItem("mundinho.sound", value ? "1" : "0");
  }, []);

  const playUiSound = React.useCallback((kind: "click" | "success" = "click") => {
    if (!soundEnabled) return;
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
    oscillator.start();
    oscillator.stop(context.currentTime + 0.09);
  }, [soundEnabled]);

  const surfaceMutationError = React.useCallback((error: unknown) => {
    const message = errorMessage(error);
    setSyncStatus("error");
    setDataStatus("error");
    setDataError(message);
    toast({ title: "Falha de conexão", description: `${message} · tente novamente.`, variant: "error" });
  }, [toast]);

  const toggleItem = React.useCallback(async (input: Parameters<ContextValue["toggleItem"]>[0]) => {
    const store = storeRef.current;
    if (!store || dataStatus !== "ready") return;
    try {
      await store.setCompleted({ itemId: input.itemId, completed: input.completed, actor, section: input.section, entryKey: input.entryKey });
      playUiSound(input.completed ? "success" : "click");
      if (input.completed) toast({ title: "Advancement Made!", description: `${actor} marcou: ${input.label}`, variant: "advancement" });
      await refresh();
    } catch (error) {
      surfaceMutationError(error);
    }
  }, [actor, dataStatus, playUiSound, refresh, surfaceMutationError, toast]);

  const addCustomItem = React.useCallback(async (input: Parameters<ContextValue["addCustomItem"]>[0]) => {
    const store = storeRef.current;
    if (!store || dataStatus !== "ready") return;
    try {
      await store.addCustomItem(input, actor);
      toast({ title: "Item adicionado", description: input.title, variant: "info" });
      await refresh();
    } catch (error) { surfaceMutationError(error); }
  }, [actor, dataStatus, refresh, surfaceMutationError, toast]);

  const deleteCustomItem = React.useCallback(async (id: string) => {
    const store = storeRef.current;
    if (!store || dataStatus !== "ready") return;
    try {
      await store.deleteCustomItem(id, actor);
      toast({ title: "Item arquivado", description: "Soft delete aplicado; o histórico foi preservado.", variant: "warning" });
      await refresh();
    } catch (error) { surfaceMutationError(error); }
  }, [actor, dataStatus, refresh, surfaceMutationError, toast]);

  const exportData = React.useCallback(async () => {
    const store = storeRef.current;
    if (!store || dataStatus !== "ready") return;
    try {
      const payload = await store.exportAll();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `mundinho-backup-${new Date().toISOString().slice(0, 10)}.json`;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (error) { surfaceMutationError(error); }
  }, [dataStatus, surfaceMutationError]);

  const importData = React.useCallback(async (file: File) => {
    const store = storeRef.current;
    if (!store || dataStatus !== "ready") return;
    try {
      const payload = JSON.parse(await file.text());
      await store.importAll(payload, actor);
      await refresh();
      toast({ title: "Backup importado", description: "O progresso antigo ou novo foi mesclado sem apagar marcações existentes.", variant: "advancement" });
    } catch (error) { surfaceMutationError(error); }
  }, [actor, dataStatus, refresh, surfaceMutationError, toast]);

  const migrateLegacy = React.useCallback(async () => {
    const store = storeRef.current;
    if (!store || dataStatus !== "ready") return;
    try {
      const result = await store.migrateLegacy(actor);
      setLegacyAvailable(false);
      await refresh();
      toast({ title: result.found ? "Progresso antigo migrado" : "Nada para migrar", description: result.found ? `${result.migrated} item(ns) recuperados.` : undefined, variant: result.found ? "advancement" : "info" });
    } catch (error) { surfaceMutationError(error); }
  }, [actor, dataStatus, refresh, surfaceMutationError, toast]);

  const loading = dataStatus === "loading";

  return (
    <AppContext.Provider value={{
      actor, setActor, soundEnabled, setSoundEnabled, playUiSound,
      mode, syncStatus, dataStatus, dataError, loading, retry,
      content, states, playerStates, customItems, legacyAvailable,
      toggleItem, addCustomItem, deleteCustomItem, exportData, importData, migrateLegacy, refresh,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useMundinho() {
  const context = React.useContext(AppContext);
  if (!context) throw new Error("useMundinho precisa estar dentro de AppProviders");
  return context;
}
