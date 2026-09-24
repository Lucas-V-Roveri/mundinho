"use client";

import Link from "next/link";
import { ActorSelector } from "@/components/shell/actor-selector";
import { ChunkLoader } from "@/components/shell/chunk-loader";
import { Navigation } from "@/components/shell/navigation";
import { GlobalSearch } from "@/components/search/global-search";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <ChunkLoader />
      <GlobalSearch />
      <header className="sticky top-0 z-40 border-b-4 border-night-950 bg-dirt-900/95 shadow-pixel-sm backdrop-blur-none">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <Link href="/" className="group inline-block focus-visible:outline-offset-4">
              <span className="block font-display text-sm leading-relaxed text-torch-300 sm:text-base">Mundinho · pra sempre</span>
              <span className="font-label text-xl text-paper-100">wiki & diário de gr1d + benamu</span>
            </Link>
            <span className="border-2 border-paper-100/30 bg-night-900 px-2 py-1 font-label text-lg text-paper-100">Java 1.21.1 · NeoForge</span>
          </div>
          <Navigation />
          <ActorSelector />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      <footer className="mx-auto mb-8 w-[calc(100%-2rem)] max-w-7xl border-4 border-night-950 bg-wood-700 px-4 py-3 text-paper-50 shadow-pixel">
        <p className="font-label text-lg">feito pra dois, sem pressa de zerar o mundo.</p>
      </footer>
    </div>
  );
}
