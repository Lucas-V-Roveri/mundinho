import * as React from "react";

import { cn } from "@/lib/cn";

export type PixelIconName = "torch" | "chest" | "compass" | "heart" | "book" | "pickaxe";

const paths: Record<PixelIconName, React.ReactNode> = {
  torch: <><path d="M10 2h4v5h-1v3h-2V7h-1z" /><path d="M9 10h6v3h-1v9h-4v-9H9z" /><path d="M8 4h2v3H8zM14 4h2v3h-2z" /></>,
  chest: <><path d="M3 6h18v14H3z" /><path d="M3 5h18v4H3z" /><path d="M10 10h4v4h-4z" /><path d="M5 8h14v2H5z" /></>,
  compass: <><path d="M8 3h8v2h3v3h2v8h-2v3h-3v2H8v-2H5v-3H3V8h2V5h3z" /><path d="M10 8h6l-3 8H7z" /></>,
  heart: <path d="M4 5h6v3h4V5h6v3h2v6h-2v3h-3v3H7v-3H4v-3H2V8h2z" />,
  book: <><path d="M3 4h8v16H3zM13 4h8v16h-8z" /><path d="M11 6h2v14h-2z" /><path d="M5 7h4v2H5zM15 7h4v2h-4z" /></>,
  pickaxe: <><path d="M4 3h10v2h3v2h-5v2H9V7H4z" /><path d="M12 7h3v3h-2v2h-2v2H9v2H7v2H5v3H2v-4h2v-2h2v-2h2v-2h2V9h2z" /></>,
};

export function PixelIcon({ name, size = 20, className, title }: { name: PixelIconName; size?: number; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("shrink-0", className)}
      shapeRendering="crispEdges"
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
