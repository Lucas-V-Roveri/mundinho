"use client";

import Link from "next/link";
import { ActorSelector } from "@/components/shell/actor-selector";
import { ChunkLoader } from "@/components/shell/chunk-loader";
import { FooterTools } from "@/components/shell/footer-tools";
import { Navigation } from "@/components/shell/navigation";
import { GlobalSearch } from "@/components/search/global-search";
import { PixelIcon } from "@/components/ui/pixel-icon";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <ChunkLoader />
      <GlobalSearch />
      <header className="sticky top-0 z-40 border-b-2 border-night-950 bg-night-900/98 shadow-soft">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-2 sm:px-6 min-[980px]:grid-cols-[auto_1fr_auto]">
          <Link href="/" className="group inline-flex min-w-0 items-center gap-2 focus-visible:outline-offset-4">
            <PixelIcon name="torch" size={22} className="text-torch-300" />
            <span className="min-w-0">
              <span className="block truncate font-display text-[10px] leading-relaxed text-torch-300 sm:text-xs">Mundinho · pra sempre</span>
              <span className="hidden font-label text-lg text-paper-100 min-[680px]:block">wiki & diário de gr1d + benamu</span>
            </span>
          </Link>
          <div className="col-span-2 min-w-0 min-[980px]:col-span-1">
            <Navigation />
          </div>
          <ActorSelector />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      <footer className="mx-auto mb-8 w-[calc(100%-2rem)] max-w-7xl border-2 border-night-950 bg-night-800 px-4 py-4 text-paper-50 shadow-soft">
        <FooterTools />
        <p className="mt-3 border-t border-paper-100/15 pt-3 font-label text-lg">feito pra dois, sem pressa de zerar o mundo.</p>
      </footer>
    </div>
  );
}
