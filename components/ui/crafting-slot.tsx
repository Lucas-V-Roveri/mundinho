import * as React from "react";

import { cn } from "@/lib/cn";

export type CraftingSlotProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export function CraftingSlot({ className, label, children, ...props }: CraftingSlotProps) {
  return (
    <div
      className={cn(
        "inventory-slot grid aspect-square min-h-12 place-items-center border-4 border-night-950 bg-stone-100 p-1 text-center text-xs text-ink-900",
        className,
      )}
      aria-label={label}
      {...props}
    >
      {children}
    </div>
  );
}

export type CraftingGridProps = {
  slots: React.ReactNode[];
  result: React.ReactNode;
  resultLabel?: string;
  className?: string;
};

export function CraftingGrid({ slots, result, resultLabel = "Resultado", className }: CraftingGridProps) {
  const normalized = Array.from({ length: 9 }, (_, index) => slots[index] ?? null);

  return (
    <div
      className={cn(
        "inline-flex max-w-full items-center gap-3 border-4 border-night-950 bg-stone-300 p-3 shadow-pixel-sm",
        className,
      )}
      role="group"
      aria-label="Receita de crafting 3 por 3"
    >
      <div className="grid w-40 grid-cols-3 gap-1.5 sm:w-48">
        {normalized.map((slot, index) => (
          <CraftingSlot key={index} label={`Slot ${index + 1}`}>
            {slot}
          </CraftingSlot>
        ))}
      </div>
      <span aria-hidden="true" className="font-display text-lg text-ink-900">
        →
      </span>
      <CraftingSlot label={resultLabel} className="size-16 bg-paper-50 sm:size-20">
        {result}
      </CraftingSlot>
    </div>
  );
}
