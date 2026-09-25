import * as React from "react";

import { cn } from "@/lib/cn";

export type CardSurface = "paper" | "wood" | "stone" | "night";
export type CardHeaderTone = "plain" | "wood" | "stone";

const surfaceClasses: Record<CardSurface, string> = {
  paper: "panel-paper",
  wood: "panel-wood",
  stone: "panel-stone",
  night: "panel-night",
};

const headerClasses: Record<CardHeaderTone, string> = {
  plain: "",
  wood: "header-texture-wood text-paper-50",
  stone: "bg-stone-100 text-ink-900",
};

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  surface?: CardSurface;
  interactive?: boolean;
};

export function Card({
  className,
  surface = "paper",
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "pixel-surface",
        surfaceClasses[surface],
        interactive && "pixel-card-interactive",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  tone = "plain",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { tone?: CardHeaderTone }) {
  return <div className={cn("space-y-2 border-b-2 border-current/15 p-5", headerClasses[tone], className)} {...props} />;
}

export function CardTitle({
  className,
  display = false,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { display?: boolean }) {
  return (
    <h3
      className={cn(
        display ? "font-display text-sm leading-relaxed" : "font-sans text-lg font-bold leading-snug",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-6 opacity-80", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-wrap items-center gap-3 border-t-2 border-current/15 p-5", className)} {...props} />;
}
