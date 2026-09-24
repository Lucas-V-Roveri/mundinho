"use client";

import { ChecklistCheckbox } from "@/components/ui/checklist-checkbox";
import { useMundinho } from "@/components/app-providers";
import { flatPlayerKey } from "@/lib/progression-model";
import type { ContentSection } from "@/types/content";

export function ChecklistItem({ itemId, label, toastLabel, phase, section, entryKey, disabled = false }: { itemId: string; label: string; toastLabel?: string; phase?: string; section: ContentSection; entryKey: string; disabled?: boolean }) {
  const { actor, playerStates, toggleItem } = useMundinho();
  const state = playerStates[flatPlayerKey(actor, itemId)];
  const checked = Boolean(state?.completed);
  const when = state?.completed_at ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(state.completed_at)) : null;
  const meta = checked ? `${actor} marcou${when ? ` · ${when}` : ""}` : phase || `${actor} ainda não marcou`;

  return <ChecklistCheckbox checked={checked} label={label} meta={meta} disabled={disabled} onCheckedChange={(value) => void toggleItem({ itemId, completed: value, section, entryKey, label: toastLabel ?? label })} />;
}
