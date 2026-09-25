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
    <nav aria-label="Navegação principal" className="min-w-0 overflow-x-auto">
      <div className="flex min-w-max items-center gap-1">
        {items.map(([href, label]) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "border-b-4 px-2 py-2 font-label text-lg leading-none transition-colors duration-100 ease-pixel focus-visible:outline-offset-1",
                active
                  ? "border-torch-500 bg-wood-700 text-paper-50"
                  : "border-transparent text-paper-100 hover:border-wood-300 hover:bg-night-800 hover:text-torch-100",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
