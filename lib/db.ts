import type { SupabaseClient } from "@supabase/supabase-js";
import type { Actor, BackupPayload, ContentSection, CustomItem, ItemState } from "@/types/content";
import { normalizeBackup, normalizeLegacy } from "@/lib/legacy-migration";

const nowIso = () => new Date().toISOString();
export type DataMode = "supabase" | "preview-local";

export interface DataStore {
  mode: DataMode;
  getStates(): Promise<Record<string, ItemState>>;
  getCustomItems(): Promise<CustomItem[]>;
  setCompleted(input: { itemId: string; completed: boolean; actor: Actor; section: ContentSection; entryKey: string }): Promise<ItemState>;
  addCustomItem(input: Pick<CustomItem, "section" | "entry_key" | "title" | "description" | "difficulty" | "phase">, actor: Actor): Promise<CustomItem>;
  deleteCustomItem(id: string, actor: Actor): Promise<void>;
  subscribe(listener: () => void): () => void;
  exportAll(): Promise<BackupPayload>;
  importAll(payload: unknown, actor: Actor): Promise<void>;
  migrateLegacy(actor: Actor): Promise<{ found: boolean; migrated: number }>;
}

class LocalPreviewStore implements DataStore {
  mode: DataMode = "preview-local";
  private listeners = new Set<() => void>();
  constructor(private worldId: string) {}
  private get statesKey() { return `mundinho.preview.states.${this.worldId}`; }
  private get customKey() { return `mundinho.preview.custom.${this.worldId}`; }
  private states(): Record<string, ItemState> { try { return JSON.parse(localStorage.getItem(this.statesKey) || "{}"); } catch { return {}; } }
  private custom(): CustomItem[] { try { const value = JSON.parse(localStorage.getItem(this.customKey) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } }
  private emit() { this.listeners.forEach((listener) => listener()); }
  async getStates() { return this.states(); }
  async getCustomItems() { return this.custom().filter((item) => !item.deleted && !item.deleted_at); }
  async setCompleted({ itemId, completed, actor, section, entryKey }: Parameters<DataStore["setCompleted"]>[0]) { const states = this.states(); const row: ItemState = { world_id: this.worldId, item_id: itemId, section, entry_key: entryKey, completed, completed_by: completed ? actor : null, completed_at: completed ? nowIso() : null, updated_at: nowIso(), deleted: false, deleted_by: null, deleted_at: null }; states[itemId] = row; localStorage.setItem(this.statesKey, JSON.stringify(states)); this.emit(); return row; }
  async addCustomItem(input: Parameters<DataStore["addCustomItem"]>[0], actor: Actor) { const custom = this.custom(); const row: CustomItem = { ...input, id: crypto.randomUUID(), world_id: this.worldId, created_by: actor, created_at: nowIso(), deleted: false, deleted_by: null, deleted_at: null, updated_at: nowIso() }; custom.push(row); localStorage.setItem(this.customKey, JSON.stringify(custom)); this.emit(); return row; }
  async deleteCustomItem(id: string, actor: Actor) { const custom = this.custom(); const row = custom.find((item) => item.id === id); if (row) { row.deleted = true; row.deleted_by = actor; row.deleted_at = nowIso(); } localStorage.setItem(this.customKey, JSON.stringify(custom)); this.emit(); }
  subscribe(listener: () => void) { this.listeners.add(listener); const onStorage = () => listener(); window.addEventListener("storage", onStorage); return () => { this.listeners.delete(listener); window.removeEventListener("storage", onStorage); }; }
  async exportAll(): Promise<BackupPayload> { return { world_id: this.worldId, exported_at: nowIso(), item_state: this.states(), custom_items: this.custom() }; }
  async importAll(payload: unknown, actor: Actor) { const normalized = normalizeBackup(payload, actor, this.worldId); localStorage.setItem(this.statesKey, JSON.stringify(normalized.item_state)); localStorage.setItem(this.customKey, JSON.stringify(normalized.custom_items)); this.emit(); }
  async migrateLegacy(actor: Actor) { const normalized = normalizeLegacy(actor, this.worldId); if (!normalized.found) return { found: false, migrated: 0 }; await this.importAll(normalized.payload, actor); localStorage.setItem("mundinho.legacyMigrationDone", "1"); return { found: true, migrated: normalized.count }; }
}

class SupabaseStore implements DataStore {
  mode: DataMode = "supabase";
  constructor(private client: SupabaseClient, private worldId: string) {}
  async getStates() { const { data, error } = await this.client.from("mundinho_item_state").select("*").eq("world_id", this.worldId); if (error) throw error; return Object.fromEntries(((data ?? []) as ItemState[]).map((row) => [row.item_id, row])); }
  async getCustomItems() { const { data, error } = await this.client.from("mundinho_custom_items").select("*").eq("world_id", this.worldId).eq("deleted", false).order("created_at"); if (error) throw error; return (data ?? []) as CustomItem[]; }
  async setCompleted({ itemId, completed, actor, section, entryKey }: Parameters<DataStore["setCompleted"]>[0]) { const payload = { world_id: this.worldId, item_id: itemId, section, entry_key: entryKey, completed, completed_by: completed ? actor : null, completed_at: completed ? nowIso() : null, updated_at: nowIso(), deleted: false, deleted_by: null, deleted_at: null }; const { data, error } = await this.client.from("mundinho_item_state").upsert(payload, { onConflict: "world_id,item_id" }).select().single(); if (error) throw error; return data as ItemState; }
  async addCustomItem(input: Parameters<DataStore["addCustomItem"]>[0], actor: Actor) { const { data, error } = await this.client.from("mundinho_custom_items").insert({ world_id: this.worldId, ...input, created_by: actor, deleted: false }).select().single(); if (error) throw error; return data as CustomItem; }
  async deleteCustomItem(id: string, actor: Actor) { const { error } = await this.client.from("mundinho_custom_items").update({ deleted: true, deleted_by: actor, deleted_at: nowIso(), updated_at: nowIso() }).eq("world_id", this.worldId).eq("id", id); if (error) throw error; }
  subscribe(listener: () => void) { const channel = this.client.channel(`mundinho:${crypto.randomUUID()}`).on("postgres_changes", { event: "*", schema: "public", table: "mundinho_item_state", filter: `world_id=eq.${this.worldId}` }, listener).on("postgres_changes", { event: "*", schema: "public", table: "mundinho_custom_items", filter: `world_id=eq.${this.worldId}` }, listener).subscribe(); return () => { void this.client.removeChannel(channel); }; }
  async exportAll(): Promise<BackupPayload> { const [item_state, custom_items] = await Promise.all([this.getStates(), this.getCustomItems()]); return { world_id: this.worldId, exported_at: nowIso(), item_state, custom_items }; }
  async importAll(payload: unknown, actor: Actor) { const normalized = normalizeBackup(payload, actor, this.worldId); const rows = Object.values(normalized.item_state); if (rows.length) { const { error } = await this.client.from("mundinho_item_state").upsert(rows, { onConflict: "world_id,item_id" }); if (error) throw error; } for (const item of normalized.custom_items) { const row = { world_id: this.worldId, section: item.section, entry_key: item.entry_key, title: item.title, description: item.description, difficulty: item.difficulty, phase: item.phase, created_by: item.created_by || actor, deleted: item.deleted, deleted_by: item.deleted_by, deleted_at: item.deleted_at }; const { error } = await this.client.from("mundinho_custom_items").insert(row); if (error) throw error; } }
  async migrateLegacy(actor: Actor) { const normalized = normalizeLegacy(actor, this.worldId); if (!normalized.found) return { found: false, migrated: 0 }; await this.importAll(normalized.payload, actor); localStorage.setItem("mundinho.legacyMigrationDone", "1"); return { found: true, migrated: normalized.count }; }
}

export function createDataStore(client: SupabaseClient | null, worldId: string): DataStore { return client ? new SupabaseStore(client, worldId) : new LocalPreviewStore(worldId); }
