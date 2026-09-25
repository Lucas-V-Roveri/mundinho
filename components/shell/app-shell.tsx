"use client";

import Link from "next/link";
import { ActorSelector } from "@/components/shell/actor-selector";
import { ChunkLoader } from "@/components/shell/chunk-loader";
import { FooterTools } from "@/components/shell/footer-tools";
import { Navigation } from "@/components/shell/navigation";
import { GlobalSearch } from "@/components/search/global-search";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <ChunkLoader />
      <header className="sticky top-0 z-40 border-b border-night-950 bg-night-900/98 shadow-soft">
        <div className="mx-auto w-full max-w-7xl px-4 py-2 sm:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 min-[980px]:grid-cols-[auto_minmax(0,1fr)_auto]">
            <div className="flex min-w-0 items-center gap-4">
              <Link href="/" className="min-w-0 shrink-0 focus-visible:outline-offset-4">
                <span className="block truncate font-display text-[10px] leading-relaxed text-torch-300 sm:text-xs">Mundinho · pra sempre</span>
                <span className="hidden font-label text-lg text-paper-100 min-[680px]:block">wiki & diário de gr1d + benamu</span>
              </Link>
              <div className="hidden min-w-0 flex-1 min-[980px]:block">
                <Navigation />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 min-[980px]:col-start-3">
              <GlobalSearch />
              <ActorSelector />
            </div>

            <div className="col-span-2 min-w-0 border-t border-paper-100/10 pt-1 min-[980px]:hidden">
              <Navigation />
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      <footer className="mx-auto mb-8 w-[calc(100%-2rem)] max-w-7xl border border-night-950 bg-night-800 px-4 py-4 text-paper-50 shadow-soft">
        <FooterTools />
        <p className="mt-3 border-t border-paper-100/15 pt-3 font-label text-lg">feito pra dois, sem pressa de zerar o mundo.</p>
      </footer>
    </div>
  );
}
