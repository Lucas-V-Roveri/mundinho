"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  ["/", "Início"],
  ["/progressao", "Progressão"],
  ["/mods", "Mods"],
  ["/amendments", "Amendments"],
  ["/extras", "Extras"],
  ["/bastidores", "Bastidores"],
] as const;

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navegação principal" className="flex flex-wrap gap-2">
      {items.map(([href, label]) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "pixel-control border-4 border-night-950 px-3 py-2 font-label text-lg leading-none shadow-pixel-sm",
              active ? "bg-torch-500 text-night-950" : "bg-wood-500 text-paper-50 hover:bg-wood-300 hover:text-ink-900",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
