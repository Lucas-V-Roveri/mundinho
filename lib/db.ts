import type { SupabaseClient } from "@supabase/supabase-js";
import type { Actor, BackupPayload, ContentSection, CustomItem, ItemState, PlayerItemState } from "@/types/content";
import { normalizeBackup, normalizeLegacy } from "@/lib/legacy-migration";
import { KNOWN_SUBITEM_IDS, flatPlayerKey } from "@/lib/progression-model";

const nowIso = () => new Date().toISOString();
export type DataMode = "supabase" | "preview-local";

export interface DataStore {
  mode: DataMode;
  getStates(): Promise<Record<string, ItemState>>;
  getPlayerStates(): Promise<Record<string, PlayerItemState>>;
  getCustomItems(): Promise<CustomItem[]>;
  configureSubitems(map: Record<string, string[]>): void;
  ensureCompatibility(fallbackActor: Actor): Promise<void>;
  setCompleted(input: { itemId: string; completed: boolean; actor: Actor; section: ContentSection; entryKey: string }): Promise<PlayerItemState>;
  addCustomItem(input: Pick<CustomItem, "section" | "entry_key" | "title" | "description" | "difficulty" | "phase">, actor: Actor): Promise<CustomItem>;
  deleteCustomItem(id: string, actor: Actor): Promise<void>;
  subscribe(listener: () => void): () => void;
  exportAll(): Promise<BackupPayload>;
  importAll(payload: unknown, actor: Actor): Promise<void>;
  migrateLegacy(actor: Actor): Promise<{ found: boolean; migrated: number }>;
}

abstract class BaseStore {
  protected subitemsByParent: Record<string, string[]> = { ...KNOWN_SUBITEM_IDS };
  configureSubitems(map: Record<string, string[]>) { this.subitemsByParent = { ...KNOWN_SUBITEM_IDS, ...map }; }
  protected parentOf(itemId: string) { return Object.entries(this.subitemsByParent).find(([, ids]) => ids.includes(itemId))?.[0] ?? null; }
}

class LocalPreviewStore extends BaseStore implements DataStore {
  mode: DataMode = "preview-local";
  private listeners = new Set<() => void>();
  constructor(private worldId: string) { super(); }
  private get statesKey() { return `mundinho.preview.states.${this.worldId}`; }
  private get playerKey() { return `mundinho.preview.playerStates.${this.worldId}`; }
  private get customKey() { return `mundinho.preview.custom.${this.worldId}`; }
  private states(): Record<string, ItemState> { try { return JSON.parse(localStorage.getItem(this.statesKey) || "{}"); } catch { return {}; } }
  private players(): Record<string, PlayerItemState> { try { return JSON.parse(localStorage.getItem(this.playerKey) || "{}"); } catch { return {}; } }
  private custom(): CustomItem[] { try { const value = JSON.parse(localStorage.getItem(this.customKey) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } }
  private savePlayers(value: Record<string, PlayerItemState>) { localStorage.setItem(this.playerKey, JSON.stringify(value)); }
  private emit() { this.listeners.forEach((listener) => listener()); }
  async getStates() { return this.states(); }
  async getPlayerStates() { return this.players(); }
  async getCustomItems() { return this.custom().filter((item) => !item.deleted && !item.deleted_at); }

  private syncAggregate(itemId: string, section: ContentSection, entryKey: string, players = this.players()) {
    const candidates = (["gr1d", "benamu"] as const).map((actor) => players[flatPlayerKey(actor, itemId)]).filter((row): row is PlayerItemState => Boolean(row?.completed));
    candidates.sort((a, b) => String(b.completed_at).localeCompare(String(a.completed_at)));
    const winner = candidates[0];
    const states = this.states();
    states[itemId] = { world_id: this.worldId, item_id: itemId, section, entry_key: entryKey, completed: Boolean(winner), completed_by: winner?.actor ?? null, completed_at: winner?.completed_at ?? null, updated_at: nowIso(), deleted: false, deleted_by: null, deleted_at: null };
    localStorage.setItem(this.statesKey, JSON.stringify(states));
  }

  private recomputeParent(parentId: string, actor: Actor, section: ContentSection, entryKey: string, players: Record<string, PlayerItemState>) {
    const ids = this.subitemsByParent[parentId] ?? [];
    const completed = ids.length > 0 && ids.every((id) => players[flatPlayerKey(actor, id)]?.completed);
    const existing = players[flatPlayerKey(actor, parentId)];
    players[flatPlayerKey(actor, parentId)] = { world_id: this.worldId, item_id: parentId, actor, section, entry_key: entryKey, completed, completed_at: completed ? existing?.completed_at ?? nowIso() : null, updated_at: nowIso() };
  }

  async setCompleted({ itemId, completed, actor, section, entryKey }: Parameters<DataStore["setCompleted"]>[0]) {
    const players = this.players();
    const row: PlayerItemState = { world_id: this.worldId, item_id: itemId, actor, section, entry_key: entryKey, completed, completed_at: completed ? nowIso() : null, updated_at: nowIso() };
    players[flatPlayerKey(actor, itemId)] = row;
    const parentId = this.parentOf(itemId);
    if (parentId) this.recomputeParent(parentId, actor, "progression", entryKey, players);
    this.savePlayers(players);
    this.syncAggregate(itemId, section, entryKey, players);
    if (parentId) this.syncAggregate(parentId, "progression", entryKey, players);
    this.emit();
    return row;
  }

  async ensureCompatibility(fallbackActor: Actor) {
    const states = this.states(); const players = this.players(); let changed = false;
    for (const state of Object.values(states)) {
      if (!state.completed) continue;
      const actor = state.completed_by === "gr1d" || state.completed_by === "benamu" ? state.completed_by : fallbackActor;
      const key = flatPlayerKey(actor, state.item_id);
      if (!players[key]?.completed) { players[key] = { world_id: this.worldId, item_id: state.item_id, actor, section: state.section, entry_key: state.entry_key, completed: true, completed_at: state.completed_at ?? nowIso(), updated_at: nowIso() }; changed = true; }
    }
    for (const [parentId, ids] of Object.entries(this.subitemsByParent)) {
      for (const actor of ["gr1d", "benamu"] as const) {
        const parent = players[flatPlayerKey(actor, parentId)];
        if (!parent?.completed) continue;
        for (const id of ids) { const key = flatPlayerKey(actor, id); if (!players[key]?.completed) { players[key] = { world_id: this.worldId, item_id: id, actor, section: "progression", entry_key: parent.entry_key, completed: true, completed_at: parent.completed_at ?? nowIso(), updated_at: nowIso() }; changed = true; } }
      }
    }
    if (changed) this.savePlayers(players);
  }

  async addCustomItem(input: Parameters<DataStore["addCustomItem"]>[0], actor: Actor) { const custom = this.custom(); const row: CustomItem = { ...input, id: crypto.randomUUID(), world_id: this.worldId, created_by: actor, created_at: nowIso(), deleted: false, deleted_by: null, deleted_at: null, updated_at: nowIso() }; custom.push(row); localStorage.setItem(this.customKey, JSON.stringify(custom)); this.emit(); return row; }
  async deleteCustomItem(id: string, actor: Actor) { const custom = this.custom(); const row = custom.find((item) => item.id === id); if (row) { row.deleted = true; row.deleted_by = actor; row.deleted_at = nowIso(); } localStorage.setItem(this.customKey, JSON.stringify(custom)); this.emit(); }
  subscribe(listener: () => void) { this.listeners.add(listener); const onStorage = () => listener(); window.addEventListener("storage", onStorage); return () => { this.listeners.delete(listener); window.removeEventListener("storage", onStorage); }; }
  async exportAll(): Promise<BackupPayload> { return { world_id: this.worldId, exported_at: nowIso(), item_state: this.states(), player_item_state: this.players(), custom_items: this.custom() }; }
  async importAll(payload: unknown, actor: Actor) { const normalized = normalizeBackup(payload, actor, this.worldId); localStorage.setItem(this.statesKey, JSON.stringify({ ...this.states(), ...normalized.item_state })); localStorage.setItem(this.playerKey, JSON.stringify({ ...this.players(), ...(normalized.player_item_state ?? {}) })); localStorage.setItem(this.customKey, JSON.stringify([...this.custom(), ...normalized.custom_items])); await this.ensureCompatibility(actor); this.emit(); }
  async migrateLegacy(actor: Actor) { const normalized = normalizeLegacy(actor, this.worldId); if (!normalized.found) return { found: false, migrated: 0 }; await this.importAll(normalized.payload, actor); localStorage.setItem("mundinho.legacyMigrationDone", "1"); return { found: true, migrated: normalized.count }; }
}

class SupabaseStore extends BaseStore implements DataStore {
  mode: DataMode = "supabase";
  constructor(private client: SupabaseClient, private worldId: string) { super(); }
  async getStates() { const { data, error } = await this.client.from("mundinho_item_state").select("*").eq("world_id", this.worldId); if (error) throw error; return Object.fromEntries(((data ?? []) as ItemState[]).map((row) => [row.item_id, row])); }
  async getPlayerStates() { const { data, error } = await this.client.from("mundinho_player_item_state").select("*").eq("world_id", this.worldId); if (error) throw error; return Object.fromEntries(((data ?? []) as PlayerItemState[]).map((row) => [flatPlayerKey(row.actor, row.item_id), row])); }
  async getCustomItems() { const { data, error } = await this.client.from("mundinho_custom_items").select("*").eq("world_id", this.worldId).eq("deleted", false).order("created_at"); if (error) throw error; return (data ?? []) as CustomItem[]; }

  private async syncAggregate(itemId: string, section: ContentSection, entryKey: string) {
    const { data, error } = await this.client.from("mundinho_player_item_state").select("*").eq("world_id", this.worldId).eq("item_id", itemId).eq("completed", true).order("completed_at", { ascending: false }).limit(1);
    if (error) throw error;
    const winner = (data?.[0] ?? null) as PlayerItemState | null;
    const payload = { world_id: this.worldId, item_id: itemId, section, entry_key: entryKey, completed: Boolean(winner), completed_by: winner?.actor ?? null, completed_at: winner?.completed_at ?? null, updated_at: nowIso(), deleted: false, deleted_by: null, deleted_at: null };
    const { error: upsertError } = await this.client.from("mundinho_item_state").upsert(payload, { onConflict: "world_id,item_id" });
    if (upsertError) throw upsertError;
  }

  private async recomputeParent(parentId: string, actor: Actor, entryKey: string) {
    const ids = this.subitemsByParent[parentId] ?? [];
    const { data, error } = await this.client.from("mundinho_player_item_state").select("item_id,completed,completed_at").eq("world_id", this.worldId).eq("actor", actor).in("item_id", ids);
    if (error) throw error;
    const completed = ids.length > 0 && ids.every((id) => data?.some((row) => row.item_id === id && row.completed));
    const payload = { world_id: this.worldId, item_id: parentId, actor, section: "progression" as const, entry_key: entryKey, completed, completed_at: completed ? nowIso() : null, updated_at: nowIso() };
    const { error: parentError } = await this.client.from("mundinho_player_item_state").upsert(payload, { onConflict: "world_id,item_id,actor" });
    if (parentError) throw parentError;
    await this.syncAggregate(parentId, "progression", entryKey);
  }

  async setCompleted({ itemId, completed, actor, section, entryKey }: Parameters<DataStore["setCompleted"]>[0]) {
    const payload: PlayerItemState = { world_id: this.worldId, item_id: itemId, actor, section, entry_key: entryKey, completed, completed_at: completed ? nowIso() : null, updated_at: nowIso() };
    const { data, error } = await this.client.from("mundinho_player_item_state").upsert(payload, { onConflict: "world_id,item_id,actor" }).select().single();
    if (error) throw error;
    await this.syncAggregate(itemId, section, entryKey);
    const parentId = this.parentOf(itemId); if (parentId) await this.recomputeParent(parentId, actor, entryKey);
    return data as PlayerItemState;
  }

  async ensureCompatibility(fallbackActor: Actor) {
    const [states, players] = await Promise.all([this.getStates(), this.getPlayerStates()]);
    const additions: PlayerItemState[] = [];
    for (const state of Object.values(states)) {
      if (!state.completed) continue;
      const actor = state.completed_by === "gr1d" || state.completed_by === "benamu" ? state.completed_by : fallbackActor;
      if (players[flatPlayerKey(actor, state.item_id)]?.completed) continue;
      additions.push({ world_id: this.worldId, item_id: state.item_id, actor, section: state.section, entry_key: state.entry_key, completed: true, completed_at: state.completed_at ?? nowIso(), updated_at: nowIso() });
    }
    const merged = { ...players };
    additions.forEach((row) => { merged[flatPlayerKey(row.actor, row.item_id)] = row; });
    for (const [parentId, ids] of Object.entries(this.subitemsByParent)) {
      for (const actor of ["gr1d", "benamu"] as const) {
        const parent = merged[flatPlayerKey(actor, parentId)]; if (!parent?.completed) continue;
        for (const id of ids) {
          const key = flatPlayerKey(actor, id); if (merged[key]?.completed) continue;
          const row: PlayerItemState = { world_id: this.worldId, item_id: id, actor, section: "progression", entry_key: parent.entry_key, completed: true, completed_at: parent.completed_at ?? nowIso(), updated_at: nowIso() };
          additions.push(row); merged[key] = row;
        }
      }
    }
    if (additions.length) { const { error } = await this.client.from("mundinho_player_item_state").upsert(additions, { onConflict: "world_id,item_id,actor" }); if (error) throw error; }
  }

  async addCustomItem(input: Parameters<DataStore["addCustomItem"]>[0], actor: Actor) { const { data, error } = await this.client.from("mundinho_custom_items").insert({ world_id: this.worldId, ...input, created_by: actor, deleted: false }).select().single(); if (error) throw error; return data as CustomItem; }
  async deleteCustomItem(id: string, actor: Actor) { const { error } = await this.client.from("mundinho_custom_items").update({ deleted: true, deleted_by: actor, deleted_at: nowIso(), updated_at: nowIso() }).eq("world_id", this.worldId).eq("id", id); if (error) throw error; }
  subscribe(listener: () => void) { const channel = this.client.channel(`mundinho:${crypto.randomUUID()}`).on("postgres_changes", { event: "*", schema: "public", table: "mundinho_item_state", filter: `world_id=eq.${this.worldId}` }, listener).on("postgres_changes", { event: "*", schema: "public", table: "mundinho_player_item_state", filter: `world_id=eq.${this.worldId}` }, listener).on("postgres_changes", { event: "*", schema: "public", table: "mundinho_custom_items", filter: `world_id=eq.${this.worldId}` }, listener).subscribe(); return () => { void this.client.removeChannel(channel); }; }
  async exportAll(): Promise<BackupPayload> { const [item_state, player_item_state, custom_items] = await Promise.all([this.getStates(), this.getPlayerStates(), this.getCustomItems()]); return { world_id: this.worldId, exported_at: nowIso(), item_state, player_item_state, custom_items }; }
  async importAll(payload: unknown, actor: Actor) {
    const normalized = normalizeBackup(payload, actor, this.worldId);
    const rows = Object.values(normalized.item_state); if (rows.length) { const { error } = await this.client.from("mundinho_item_state").upsert(rows, { onConflict: "world_id,item_id" }); if (error) throw error; }
    const playerRows = Object.values(normalized.player_item_state ?? {}); if (playerRows.length) { const { error } = await this.client.from("mundinho_player_item_state").upsert(playerRows, { onConflict: "world_id,item_id,actor" }); if (error) throw error; }
    for (const item of normalized.custom_items) { const row = { world_id: this.worldId, section: item.section, entry_key: item.entry_key, title: item.title, description: item.description, difficulty: item.difficulty, phase: item.phase, created_by: item.created_by || actor, deleted: item.deleted, deleted_by: item.deleted_by, deleted_at: item.deleted_at }; const { error } = await this.client.from("mundinho_custom_items").insert(row); if (error) throw error; }
    await this.ensureCompatibility(actor);
  }
  async migrateLegacy(actor: Actor) { const normalized = normalizeLegacy(actor, this.worldId); if (!normalized.found) return { found: false, migrated: 0 }; await this.importAll(normalized.payload, actor); localStorage.setItem("mundinho.legacyMigrationDone", "1"); return { found: true, migrated: normalized.count }; }
}

export function createDataStore(client: SupabaseClient | null, worldId: string): DataStore { return client ? new SupabaseStore(client, worldId) : new LocalPreviewStore(worldId); }
