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

const tones: Record<SyncState, string> = {
  connecting: "bg-torch-500 text-night-950",
  supabase: "bg-grass-500 text-night-950",
  "preview-local": "bg-torch-500 text-night-950",
  error: "bg-redstone-500 text-paper-50",
};

export function SyncStatus({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { syncStatus, retry, dataError } = useMundinho();

  if (syncStatus === "error") {
    return (
      <Button
        variant="danger"
        size="sm"
        onClick={retry}
        title={dataError ?? undefined}
        className={cn("whitespace-nowrap", compact && "min-h-7 border-2 px-2 py-1 text-[11px]", className)}
      >
        {compact ? "falha · tentar" : labels.error}
      </Button>
    );
  }

  return (
    <span
      role="status"
      aria-live="polite"
      title={dataError ?? undefined}
      aria-label={dataError ? `${labels[syncStatus]}. ${dataError}` : labels[syncStatus]}
      className={cn(
        "inline-flex items-center gap-2 border border-night-950 px-2 py-1 font-label text-lg leading-none",
        tones[syncStatus],
        compact && "text-sm",
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
