import * as React from "react";

import { cn } from "@/lib/cn";

export type CardSurface = "paper" | "wood" | "stone" | "night";

const surfaceClasses: Record<CardSurface, string> = {
  paper: "panel-paper",
  wood: "panel-wood",
  stone: "panel-stone",
  night: "panel-night",
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

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2 border-b-4 border-current/15 p-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-display text-sm leading-relaxed", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-6 opacity-80", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-wrap items-center gap-3 border-t-4 border-current/15 p-5", className)} {...props} />;
}
