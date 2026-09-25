import * as React from "react";

import { cn } from "@/lib/cn";

export type TagTone = "neutral" | "success" | "achievement" | "focus" | "danger" | "external";

const tones: Record<TagTone, string> = {
  neutral: "bg-stone-100 text-ink-700",
  success: "bg-grass-100 text-grass-900",
  achievement: "bg-gold-100 text-gold-900",
  focus: "bg-torch-100 text-ink-900",
  danger: "bg-redstone-100 text-redstone-900",
  external: "bg-blue-100 text-blue-900",
};

export function Tag({
  tone = "neutral",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: TagTone }) {
  return (
    <span className={cn("tag-flat text-lg", tones[tone], className)} {...props}>
      {children}
    </span>
  );
}
