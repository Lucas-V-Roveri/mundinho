"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export type ChecklistCheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  label: React.ReactNode;
  meta?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
};

export const ChecklistCheckbox = React.forwardRef<HTMLInputElement, ChecklistCheckboxProps>(
  ({ className, checked, defaultChecked, disabled, id, label, meta, onCheckedChange, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? `check-${generatedId}`;
    const metaId = meta ? `${inputId}-meta` : undefined;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "group flex cursor-pointer items-start gap-3 border-4 border-night-950 bg-paper-50 p-3 text-ink-900 shadow-pixel-sm transition-[transform,box-shadow,background-color] duration-150 ease-pixel hover:-translate-y-0.5 hover:bg-torch-100 disabled:pointer-events-none",
          disabled && "cursor-not-allowed opacity-55",
          className,
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-describedby={metaId}
          className="peer sr-only"
          onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
          {...props}
        />
        <span
          aria-hidden="true"
          className="mt-0.5 grid size-7 shrink-0 place-items-center border-4 border-night-950 bg-stone-100 font-display text-[11px] text-night-950 shadow-inset peer-checked:bg-grass-500 peer-focus-visible:outline peer-focus-visible:outline-4 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-torch-300"
        >
          <span className="opacity-0 peer-checked:opacity-100">✓</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-label text-xl leading-none peer-checked:line-through">{label}</span>
          {meta ? (
            <span id={metaId} className="mt-1 block text-xs leading-5 text-ink-700">
              {meta}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);
ChecklistCheckbox.displayName = "ChecklistCheckbox";
