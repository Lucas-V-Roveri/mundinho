"use client";

import * as React from "react";
import type { WorldXpStats } from "@/lib/world-xp";
import { cn } from "@/lib/cn";

type DataStatus = "loading" | "ready" | "error";

export function WorldXpBar({
  stats,
  status,
  className,
}: {
  stats: WorldXpStats;
  status: DataStatus;
  className?: string;
}) {
  const previous = React.useRef<number | null>(null);
  const [bump, setBump] = React.useState(false);

  React.useEffect(() => {
    if (status !== "ready") return;
    if (previous.current !== null && stats.completed > previous.current) {
      setBump(true);
      const timer = window.setTimeout(() => setBump(false), 360);
      previous.current = stats.completed;
      return () => window.clearTimeout(timer);
    }
    previous.current = stats.completed;
  }, [stats.completed, status]);

  return (
    <section
      className={cn("world-xp-shell border-4 border-night-950 bg-night-900 p-3 text-paper-50", className)}
      aria-live="polite"
      aria-busy={status === "loading"}
      data-testid="world-xp"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-label text-xl sm:text-2xl">
        <span>XP do mundinho</span>
        {status === "ready" ? (
          <span>{stats.completed}/{stats.total} · {stats.percent}%</span>
        ) : status === "loading" ? (
          <span>acendendo as tochas...</span>
        ) : (
          <span>XP indisponível</span>
        )}
      </div>
      <div className="world-xp-track mt-2 h-6 overflow-hidden border-4 border-night-950 bg-stone-700" aria-hidden="true">
        {status === "ready" ? (
          <div
            className={cn("xp-fill world-xp-fill h-full", bump && "world-xp-bump")}
            style={{ width: `${stats.percent}%` }}
          />
        ) : (
          <div className="h-full w-full bg-night-800" />
        )}
      </div>
    </section>
  );
}
