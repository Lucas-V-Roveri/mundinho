import type { Actor, BackupPayload, ContentSection, CustomItem, ItemState } from "@/types/content";

const LEGACY_KEYS = ["mundinho.progress", "mundinhoProgress", "mundinho.progress.v1", "mundinho.custom.v1", "mundinho-state", "mundinho.checklists"] as const;
const nowIso = () => new Date().toISOString();

function safeJson(value: string | null): unknown { try { return value ? JSON.parse(value) : null; } catch { return null; } }
function sectionOf(value: unknown): ContentSection { const text = String(value ?? "extras").toLowerCase(); if (text.startsWith("mod")) return "mods"; if (text.startsWith("prog")) return "progression"; return "extras"; }

export function normalizeBackup(payload: unknown, actor: Actor, worldId: string): BackupPayload {
  const raw = (payload ?? {}) as Record<string, unknown>;
  const statesRaw = raw.item_state ?? raw.states ?? {};
  const customRaw = raw.custom_items ?? raw.custom ?? [];
  const item_state: Record<string, ItemState> = {};

  if (Array.isArray(statesRaw)) {
    statesRaw.forEach((item) => {
      if (typeof item !== "string") return;
      item_state[item] = { world_id: worldId, item_id: item, section: "mods", entry_key: "legacy", completed: true, completed_by: actor, completed_at: nowIso(), updated_at: nowIso() };
    });
  } else if (statesRaw && typeof statesRaw === "object") {
    Object.entries(statesRaw as Record<string, Partial<ItemState>>).forEach(([itemId, value]) => {
      item_state[itemId] = { world_id: worldId, item_id: itemId, section: value.section ?? "mods", entry_key: value.entry_key ?? "legacy", completed: Boolean(value.completed), completed_by: value.completed_by ?? (value.completed ? actor : null), completed_at: value.completed_at ?? (value.completed ? nowIso() : null), updated_at: nowIso(), deleted: Boolean(value.deleted), deleted_by: value.deleted_by ?? null, deleted_at: value.deleted_at ?? null };
    });
  }

  const custom_items: CustomItem[] = Array.isArray(customRaw)
    ? customRaw.filter((item) => item && typeof item === "object").map((item) => {
        const row = item as Record<string, unknown>;
        return { id: typeof row.id === "string" ? row.id : crypto.randomUUID(), world_id: worldId, section: sectionOf(row.section ?? row.scope_type), entry_key: String(row.entry_key ?? row.scope_key ?? "legacy"), title: String(row.title ?? row.text ?? "Item importado"), description: String(row.description ?? ""), difficulty: typeof row.difficulty === "string" ? row.difficulty : null, phase: typeof row.phase === "string" ? row.phase : null, created_by: row.created_by === "benamu" ? "benamu" : actor, created_at: typeof row.created_at === "string" ? row.created_at : nowIso(), deleted: Boolean(row.deleted), deleted_by: row.deleted_by === "benamu" || row.deleted_by === "gr1d" ? row.deleted_by : null, deleted_at: typeof row.deleted_at === "string" ? row.deleted_at : null, updated_at: nowIso() } as CustomItem;
      })
    : [];

  return { world_id: worldId, exported_at: nowIso(), item_state, custom_items };
}

export function normalizeLegacy(actor: Actor, worldId: string) {
  const item_state: Record<string, ItemState> = {};
  let count = 0;
  let found = false;
  for (const key of LEGACY_KEYS) {
    const parsed = safeJson(localStorage.getItem(key));
    if (!parsed) continue;
    found = true;
    if (Array.isArray(parsed)) {
      parsed.forEach((entry) => {
        if (typeof entry !== "string") return;
        item_state[entry] = { world_id: worldId, item_id: entry, section: "mods", entry_key: "legacy", completed: true, completed_by: actor, completed_at: nowIso(), updated_at: nowIso() };
        count += 1;
      });
    } else if (typeof parsed === "object") {
      const obj = parsed as Record<string, unknown>;
      const source = (obj.progress ?? obj.states ?? obj.completed ?? obj) as Record<string, unknown>;
      Object.entries(source).forEach(([id, value]) => {
        if (id === "custom" || id === "items") return;
        const completed = typeof value === "boolean" ? value : Boolean((value as Partial<ItemState>)?.completed);
        if (!completed) return;
        item_state[id] = { world_id: worldId, item_id: id, section: "mods", entry_key: "legacy", completed: true, completed_by: actor, completed_at: nowIso(), updated_at: nowIso() };
        count += 1;
      });
    }
  }
  return { found, count, payload: { world_id: worldId, exported_at: nowIso(), item_state, custom_items: [] } satisfies BackupPayload };
}

export function hasLegacyData() { return typeof window !== "undefined" && !localStorage.getItem("mundinho.legacyMigrationDone") && LEGACY_KEYS.some((key) => Boolean(localStorage.getItem(key))); }
