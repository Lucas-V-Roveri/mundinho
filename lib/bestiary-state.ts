"use client";

import * as React from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getBrowserSupabase } from "@/lib/supabase/browser";
import { classifyRuntimeConfig, loadPublicRuntimeConfig } from "@/lib/runtime-config";
import type { DataMode } from "@/lib/db";
import type { Actor } from "@/types/content";
import type { BestiaryStateRow, BestiaryTrackFlag } from "@/types/bestiary";
import { bestiaryStateKey } from "@/types/bestiary";

const DEFAULT_WORLD = "mundinho-pra-sempre";
const nowIso = () => new Date().toISOString();

type BestiaryStateStatus = "loading" | "ready" | "error";

type UseBestiaryStateInput = {
  actor: Actor;
  mode: DataMode | null;
  parentDataStatus: "loading" | "ready" | "error";
};

function localKey(worldId: string) {
  return `mundinho.preview.bestiary.${worldId}`;
}

function readLocal(worldId: string) {
  try {
    const value = JSON.parse(localStorage.getItem(localKey(worldId)) || "{}");
    return value && typeof value === "object" ? (value as Record<string, BestiaryStateRow>) : {};
  } catch {
    return {};
  }
}

function blankRow(worldId: string, actor: Actor, mobId: string): BestiaryStateRow {
  return {
    world_id: worldId,
    mob_id: mobId,
    actor,
    seen: false,
    seen_at: null,
    defeated: false,
    defeated_at: null,
    tamed: false,
    tamed_at: null,
    updated_by: actor,
    updated_at: nowIso(),
    deleted: false,
    deleted_by: null,
    deleted_at: null,
  };
}

function withFlag(row: BestiaryStateRow, flag: BestiaryTrackFlag, value: boolean): BestiaryStateRow {
  const next = { ...row, updated_at: nowIso(), updated_by: row.actor, deleted: false, deleted_by: null, deleted_at: null };
  const stamp = nowIso();

  if (flag === "seen") {
    next.seen = value;
    next.seen_at = value ? row.seen_at ?? stamp : null;
    if (!value) {
      next.defeated = false;
      next.defeated_at = null;
      next.tamed = false;
      next.tamed_at = null;
    }
  }

  if (flag === "defeated") {
    next.defeated = value;
    next.defeated_at = value ? row.defeated_at ?? stamp : null;
    if (value) {
      next.seen = true;
      next.seen_at = row.seen_at ?? stamp;
    }
  }

  if (flag === "tamed") {
    next.tamed = value;
    next.tamed_at = value ? row.tamed_at ?? stamp : null;
    if (value) {
      next.seen = true;
      next.seen_at = row.seen_at ?? stamp;
    }
  }

  return next;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export function useBestiaryState({ actor, mode, parentDataStatus }: UseBestiaryStateInput) {
  const [rows, setRows] = React.useState<Record<string, BestiaryStateRow>>({});
  const [status, setStatus] = React.useState<BestiaryStateStatus>("loading");
  const [error, setError] = React.useState<string | null>(null);
  const [retryNonce, setRetryNonce] = React.useState(0);
  const clientRef = React.useRef<SupabaseClient | null>(null);
  const worldIdRef = React.useRef(DEFAULT_WORLD);

  const retry = React.useCallback(() => {
    setStatus("loading");
    setError(null);
    setRetryNonce((value) => value + 1);
  }, []);

  React.useEffect(() => {
    if (parentDataStatus !== "ready" || !mode) return;

    let cancelled = false;
    let unsubscribe = () => {};

    const fail = (problem: unknown) => {
      if (cancelled) return;
      setStatus("error");
      setError(errorMessage(problem));
    };

    const loadSupabase = async (client: SupabaseClient, worldId: string) => {
      const load = async () => {
        const { data, error: queryError } = await client
          .from("mundinho_bestiary_state")
          .select("*")
          .eq("world_id", worldId)
          .eq("deleted", false);
        if (queryError) throw queryError;
        if (cancelled) return;
        const next = Object.fromEntries(((data ?? []) as BestiaryStateRow[]).map((row) => [bestiaryStateKey(row.actor, row.mob_id), row]));
        setRows(next);
        setStatus("ready");
        setError(null);
      };

      await load();
      const channel = client
        .channel(`mundinho-bestiary:${crypto.randomUUID()}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "mundinho_bestiary_state", filter: `world_id=eq.${worldId}` },
          () => { void load().catch(fail); },
        )
        .subscribe();
      unsubscribe = () => { void client.removeChannel(channel); };
    };

    void (async () => {
      if (mode === "preview-local") {
        const config = await loadPublicRuntimeConfig();
        const worldId = config.worldId || DEFAULT_WORLD;
        worldIdRef.current = worldId;
        clientRef.current = null;
        setRows(readLocal(worldId));
        if (!cancelled) {
          setStatus("ready");
          setError(null);
        }
        const onStorage = (event: StorageEvent) => {
          if (event.key === localKey(worldId)) setRows(readLocal(worldId));
        };
        window.addEventListener("storage", onStorage);
        unsubscribe = () => window.removeEventListener("storage", onStorage);
        return;
      }

      const config = await loadPublicRuntimeConfig();
      const configState = classifyRuntimeConfig(config);
      if (configState.kind !== "configured") throw new Error(configState.kind === "invalid" ? configState.reason : "Supabase indisponível para o Bestiário.");
      const worldId = configState.config.worldId || DEFAULT_WORLD;
      const client = getBrowserSupabase(configState.config) as SupabaseClient;
      clientRef.current = client;
      worldIdRef.current = worldId;
      await loadSupabase(client, worldId);
    })().catch(fail);

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [mode, parentDataStatus, retryNonce]);

  const effectiveStatus: BestiaryStateStatus = parentDataStatus === "error"
    ? "error"
    : parentDataStatus !== "ready" || !mode
      ? "loading"
      : status;
  const effectiveError = parentDataStatus === "error" ? "A fonte principal do Mundinho não está disponível." : error;

  const setFlag = React.useCallback(async (mobId: string, flag: BestiaryTrackFlag, value: boolean) => {
    if (effectiveStatus !== "ready") return;
    const worldId = worldIdRef.current;
    const key = bestiaryStateKey(actor, mobId);
    const previous = rows[key] ?? blankRow(worldId, actor, mobId);
    const next = withFlag(previous, flag, value);
    setRows((current) => ({ ...current, [key]: next }));

    try {
      if (mode === "preview-local") {
        const stored = readLocal(worldId);
        stored[key] = next;
        localStorage.setItem(localKey(worldId), JSON.stringify(stored));
        window.dispatchEvent(new StorageEvent("storage", { key: localKey(worldId), newValue: JSON.stringify(stored) }));
        return;
      }

      const client = clientRef.current;
      if (!client) throw new Error("Cliente do Supabase ainda não está pronto.");
      const { error: writeError } = await client
        .from("mundinho_bestiary_state")
        .upsert(next, { onConflict: "world_id,mob_id,actor" });
      if (writeError) throw writeError;
    } catch (problem) {
      setRows((current) => {
        const copy = { ...current };
        if (rows[key]) copy[key] = previous;
        else delete copy[key];
        return copy;
      });
      setError(errorMessage(problem));
      setStatus("error");
      throw problem;
    }
  }, [actor, effectiveStatus, mode, rows]);

  const rowFor = React.useCallback((mobId: string) => rows[bestiaryStateKey(actor, mobId)] ?? blankRow(worldIdRef.current, actor, mobId), [actor, rows]);

  const allRowsForActor = React.useMemo(
    () => Object.values(rows).filter((row) => row.actor === actor && !row.deleted),
    [actor, rows],
  );

  return { rows, status: effectiveStatus, error: effectiveError, retry, setFlag, rowFor, allRowsForActor };
}
