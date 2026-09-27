"use client";

import type { Route } from "next";
import Link from "next/link";
import { ContentIcon } from "@/components/media/content-icon";
import { guideThemeClasses } from "@/lib/guide-theme";
import { cn } from "@/lib/cn";
import type { GuideTheme } from "@/types/content";

export function GuideCompactCard({
  href,
  theme,
  iconSrc,
  eyebrow,
  title,
  meta,
  className,
  onClick,
}: {
  href: string;
  theme?: GuideTheme;
  iconSrc: string;
  eyebrow: string;
  title: string;
  meta?: string;
  className?: string;
  onClick?: () => void;
}) {
  const themed = guideThemeClasses(theme);
  return (
    <Link
      href={href as Route}
      onClick={onClick}
      className={cn(
        "guide-compact-card pixel-card-interactive relative block overflow-hidden border-4 border-night-950 bg-paper-50 p-3 pl-5 text-ink-900",
        themed.frame,
        className,
      )}
    >
      <span aria-hidden="true" className={themed.stripe} />
      <div className={cn("-m-3 -ml-5 mb-3 border-b border-stone-300 p-3 pl-5", themed.header)}>
        <span className="font-label text-xl text-ink-700">{eyebrow}</span>
      </div>
      <div className="flex items-start gap-3">
        <span className="inventory-slot grid size-12 shrink-0 place-items-center border-2 border-night-950 bg-stone-700">
          <ContentIcon src={iconSrc} alt="" kind="item" className="minecraft-item-sprite size-8" />
        </span>
        <span className="min-w-0">
          <strong className="block text-sm leading-5">{title}</strong>
          {meta ? <span className="mt-1 block text-xs leading-5 text-ink-700">{meta}</span> : null}
        </span>
      </div>
    </Link>
  );
}
