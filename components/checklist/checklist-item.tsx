"use client";

import { ChecklistCheckbox } from "@/components/ui/checklist-checkbox";
import { useMundinho } from "@/components/app-providers";
import type { ContentSection } from "@/types/content";

export function ChecklistItem({ itemId, label, phase, section, entryKey }: { itemId: string; label: string; phase?: string; section: ContentSection; entryKey: string }) {
  const { states, toggleItem } = useMundinho();
  const state = states[itemId];
  const checked = Boolean(state?.completed);
  const when = state?.completed_at ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(state.completed_at)) : null;
  const meta = checked ? `marcado por ${state.completed_by ?? "?"}${when ? ` · ${when}` : ""}` : phase || "a fazer";

  return <ChecklistCheckbox checked={checked} label={label} meta={meta} onCheckedChange={(value) => void toggleItem({ itemId, completed: value, section, entryKey, label })} />;
}
