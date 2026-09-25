"use client";

import { Button } from "@/components/ui/button";
import { ChecklistCheckbox } from "@/components/ui/checklist-checkbox";
import { useMundinho } from "@/components/app-providers";
import { flatPlayerKey } from "@/lib/progression-model";
import type { ContentSection } from "@/types/content";

export function ChecklistItem({ itemId, label, toastLabel, phase, section, entryKey, disabled = false }: { itemId: string; label: string; toastLabel?: string; phase?: string; section: ContentSection; entryKey: string; disabled?: boolean }) {
  const { actor, playerStates, toggleItem, dataStatus, retry } = useMundinho();

  if (dataStatus === "loading") {
    return <div role="status" className="border border-stone-500 bg-stone-100 p-3 text-ink-900"><span className="font-label text-xl">{label}</span><span className="mt-1 block text-xs">carregando marcação...</span></div>;
  }

  if (dataStatus === "error") {
    return <div role="alert" className="border border-redstone-700 bg-redstone-100 p-3 text-redstone-900"><span className="font-label text-xl">{label}</span><span className="mt-1 block text-xs">estado indisponível</span><Button variant="danger" size="sm" className="mt-2" onClick={retry}>tentar novamente</Button></div>;
  }

  const state = playerStates[flatPlayerKey(actor, itemId)];
  const checked = Boolean(state?.completed);
  const when = state?.completed_at ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(state.completed_at)) : null;
  const meta = checked ? `${actor} marcou${when ? ` · ${when}` : ""}` : phase || `${actor} ainda não marcou`;

  return <ChecklistCheckbox checked={checked} label={label} meta={meta} disabled={disabled} onCheckedChange={(value) => void toggleItem({ itemId, completed: value, section, entryKey, label: toastLabel ?? label })} />;
}
