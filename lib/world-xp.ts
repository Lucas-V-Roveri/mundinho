import type { ContentStore, CustomItem, ItemState } from "@/types/content";

const CUSTOM_ITEM_CUTOFF = new Date("2026-09-24T20:00:00Z").getTime();

export type WorldXpStats = {
  completed: number;
  total: number;
  percent: number;
};

export function worldXpStats(
  content: ContentStore,
  states: Record<string, ItemState>,
  customItems: CustomItem[],
): WorldXpStats {
  const ids = new Set<string>();
  content.guides.forEach((guide) => guide.checklist.forEach(([id]) => ids.add(id)));
  content.progression.forEach((item) => ids.add(item.id));
  content.extras?.items.forEach((item) => ids.add(item.id));
  customItems
    .filter((item) => new Date(item.created_at).getTime() >= CUSTOM_ITEM_CUTOFF)
    .forEach((item) => ids.add(`custom:${item.id}`));

  const total = ids.size;
  const completed = [...ids].filter((id) => states[id]?.completed).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}
