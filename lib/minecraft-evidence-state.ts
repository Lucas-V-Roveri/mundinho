"use client";

import * as React from "react";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import { classifyRuntimeConfig, loadPublicRuntimeConfig } from "@/lib/runtime-config";
import type { DataMode } from "@/lib/db";
import type { Actor } from "@/types/content";
import type { MinecraftEvidenceRow, MinecraftObservation } from "@/types/minecraft-evidence";

export function useMinecraftEvidence({ mode, parentDataStatus }: { mode: DataMode | null; parentDataStatus: string }) {
  const [rows, setRows] = React.useState<MinecraftEvidenceRow[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [nonce, setNonce] = React.useState(0);
  const loader = React.useRef<(() => Promise<void>) | null>(null);

  React.useEffect(() => {
    if (parentDataStatus !== "ready" || !mode) return;
    let cancelled = false;
    let unsubscribe = () => {};
    let timer: ReturnType<typeof setTimeout> | undefined;
    let request = 0;
    const fail = (problem: unknown) => { if (!cancelled) setError(problem instanceof Error ? problem.message : String(problem)); };
    void (async () => {
      if (mode !== "supabase") { if (!cancelled) { setRows([]); setLoaded(true); setError(null); } return; }
      const config = classifyRuntimeConfig(await loadPublicRuntimeConfig());
      if (config.kind !== "configured") throw new Error("Conecte o Supabase para carregar as evidências do Minecraft.");
      const client = getBrowserSupabase(config.config);
      const world = config.config.worldId || "mundinho-pra-sempre";
      const load = async () => {
        const currentRequest = ++request;
        const { data, error: problem } = await client.from("mundinho_minecraft_evidence").select("*").eq("world_id", world);
        if (problem) throw problem;
        if (!cancelled && currentRequest === request) { setRows((data ?? []) as MinecraftEvidenceRow[]); setLoaded(true); setError(null); }
      };
      loader.current = load;
      await load();
      const channel = client.channel(`minecraft-evidence:${crypto.randomUUID()}`).on("postgres_changes", { event: "*", schema: "public", table: "mundinho_minecraft_evidence", filter: `world_id=eq.${world}` }, () => {
        clearTimeout(timer); timer = setTimeout(() => { void load().catch(fail); }, 150);
      }).subscribe();
      unsubscribe = () => { void client.removeChannel(channel); };
    })().catch(fail);
    return () => { cancelled = true; loader.current = null; clearTimeout(timer); unsubscribe(); };
  }, [mode, parentDataStatus, nonce]);

  const apply = async (actor: Actor, observations: MinecraftObservation[]) => {
    if (mode !== "supabase" || parentDataStatus !== "ready" || !loaded || error) throw new Error("A sincronização da Progressão precisa estar conectada ao Supabase.");
    const config = classifyRuntimeConfig(await loadPublicRuntimeConfig());
    if (config.kind !== "configured") throw new Error("Supabase indisponível.");
    const { data, error: problem } = await getBrowserSupabase(config.config).rpc("mundinho_sync_minecraft_canary", {
      p_world_id: config.config.worldId || "mundinho-pra-sempre", p_actor: actor,
      p_observations: observations,
    });
    if (problem) throw problem;
    await loader.current?.();
    return data as { evidence_changed: number; completions_changed: number };
  };

  return { rows, error, ready: parentDataStatus === "ready" && loaded && !error, retry: () => setNonce((value) => value + 1), refresh: async () => { await loader.current?.(); }, apply };
}
