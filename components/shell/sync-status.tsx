"use client";

import { Button } from "@/components/ui/button";
import { useMundinho, type SyncStatus as SyncState } from "@/components/app-providers";
import { cn } from "@/lib/cn";

const labels: Record<SyncState, string> = {
  connecting: "conectando...",
  supabase: "Supabase compartilhado",
  "preview-local": "Prévia local",
  error: "falha de conexão — tentar novamente",
};

const statLabels: Record<SyncState, string> = {
  connecting: "...",
  supabase: "ONLINE",
  "preview-local": "LOCAL",
  error: "ERRO",
};

const tones: Record<SyncState, string> = {
  connecting: "bg-torch-500 text-night-950",
  supabase: "bg-grass-500 text-night-950",
  "preview-local": "bg-torch-500 text-night-950",
  error: "bg-redstone-500 text-paper-50",
};

const statTones: Record<SyncState, string> = {
  connecting: "text-torch-700",
  supabase: "text-grass-900",
  "preview-local": "text-torch-700",
  error: "text-redstone-700",
};

export function SyncStatus({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { syncStatus, retry } = useMundinho();

  if (!compact) {
    return (
      <span
        role="status"
        aria-live="polite"
        aria-label={labels[syncStatus]}
        className={cn("block break-words font-display text-xl leading-relaxed sm:text-2xl", statTones[syncStatus], className)}
      >
        {statLabels[syncStatus]}
      </span>
    );
  }

  if (syncStatus === "error") {
    return (
      <Button
        variant="danger"
        size="sm"
        onClick={retry}
        aria-label={labels.error}
        className={cn("min-h-7 whitespace-nowrap border-2 px-2 py-1 text-[11px]", className)}
      >
        <span className="min-[980px]:hidden">falha · tentar</span>
        <span className="hidden min-[980px]:inline">falha de conexão — tentar novamente</span>
      </Button>
    );
  }

  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-2 border border-night-950 px-2 py-1 font-label text-sm leading-none",
        tones[syncStatus],
        className,
      )}
    >
      <span aria-hidden="true" className="size-2 border border-night-950 bg-current opacity-35" />
      {labels[syncStatus]}
    </span>
  );
}

export function syncStatusLabel(status: SyncState) {
  return labels[status];
}
