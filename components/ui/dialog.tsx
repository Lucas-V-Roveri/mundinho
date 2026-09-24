"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className={cn(
        "pixel-dialog m-auto w-[min(92vw,34rem)] border-4 border-night-950 bg-paper-100 p-0 text-ink-900 shadow-pixel",
        className,
      )}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClose={() => {
        if (open) onOpenChange(false);
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className="border-b-4 border-night-950 bg-wood-700 p-4 text-paper-50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="font-display text-sm leading-relaxed">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mt-2 text-sm leading-6 text-paper-100">
                {description}
              </p>
            ) : null}
          </div>
          <Button variant="ghost" size="icon" aria-label="Fechar diálogo" onClick={() => onOpenChange(false)}>
            ×
          </Button>
        </div>
      </div>
      <div className="p-5">{children}</div>
      {footer ? <div className="flex flex-wrap justify-end gap-3 border-t-4 border-night-950 bg-stone-100 p-4">{footer}</div> : null}
    </dialog>
  );
}
