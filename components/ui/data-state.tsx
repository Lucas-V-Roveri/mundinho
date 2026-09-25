"use client";

import { Button } from "@/components/ui/button";

export function DataStatePanel({
  status,
  error,
  retry,
  loadingText = "acendendo as tochas...",
  emptyText = "Nada por aqui ainda.",
}: {
  status: "loading" | "empty" | "error";
  error?: string | null;
  retry?: () => void;
  loadingText?: string;
  emptyText?: string;
}) {
  if (status === "loading") {
    return <div role="status" aria-live="polite" className="border border-stone-500 bg-stone-100 p-4 text-ink-900"><p className="font-label text-xl">{loadingText}</p><div className="mt-3 h-4 w-2/3 animate-pulse bg-stone-300" aria-hidden="true" /></div>;
  }

  if (status === "error") {
    return <div role="alert" className="border border-redstone-700 bg-redstone-100 p-4 text-redstone-900"><p className="font-label text-xl">falha ao carregar</p><p className="mt-1 text-sm">{error || "A fonte de dados não respondeu."}</p>{retry ? <Button variant="danger" size="sm" className="mt-3" onClick={retry}>tentar novamente</Button> : null}</div>;
  }

  return <div className="border border-stone-500 bg-stone-100 p-4 text-ink-900"><p className="font-label text-xl">{emptyText}</p></div>;
}
