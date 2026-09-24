"use client";

import { useMundinho } from "@/components/app-providers";

export function ChunkLoader() {
  const { loading } = useMundinho();
  if (!loading) return null;
  return (
    <div role="status" aria-live="polite" aria-label="Carregando o mundinho" className="fixed inset-0 z-[120] grid place-items-center bg-night-950 text-paper-50">
      <div className="w-[min(88vw,32rem)] border-4 border-torch-700 bg-night-900 p-6 shadow-pixel">
        <p className="font-display text-xs leading-relaxed text-torch-300">Carregando chunks...</p>
        <div className="mt-5 grid grid-cols-8 gap-1" aria-hidden="true">
          {Array.from({ length: 32 }, (_, index) => <span key={index} className="chunk-pixel aspect-square border-2 border-night-950 bg-dirt-500" style={{ animationDelay: `${(index % 8) * 50 + Math.floor(index / 8) * 70}ms` }} />)}
        </div>
      </div>
    </div>
  );
}
