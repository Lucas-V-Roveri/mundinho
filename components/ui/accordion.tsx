"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

export function Accordion({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-3", className)} {...props} />;
}

export type AccordionItemProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  headingLevel = 3,
}: AccordionItemProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const generatedId = React.useId();
  const panelId = `accordion-panel-${generatedId}`;
  const buttonId = `accordion-trigger-${generatedId}`;
  const isControlled = controlledOpen !== undefined;
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const Heading = `h${headingLevel}` as keyof React.JSX.IntrinsicElements;

  function toggle() {
    const next = !isOpen;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  return (
    <section className={cn("accordion-item overflow-hidden border-2 border-night-950 bg-paper-100 text-ink-900", className)}>
      <Heading className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          className="pixel-accordion-trigger header-texture-wood flex w-full cursor-pointer items-center justify-between gap-4 border-0 border-l-4 border-l-[var(--guide-accent,var(--color-torch-500))] px-4 py-3 text-left font-label text-2xl leading-none text-paper-50 outline-offset-[-3px] hover:bg-wood-500 hover:text-torch-100"
        >
          <span className="min-w-0 flex-1">{title}</span>
          <span
            aria-hidden="true"
            className="accordion-chevron shrink-0 font-label text-2xl text-torch-300"
            data-open={isOpen ? "true" : "false"}
          >
            ▶
          </span>
        </button>
      </Heading>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        data-open={isOpen ? "true" : "false"}
        className="accordion-panel"
      >
        <div className="accordion-panel-inner min-h-0 overflow-hidden">
          <div className="border-t border-wood-900/20 bg-paper-100 p-4 text-ink-900">{children}</div>
        </div>
      </div>
    </section>
  );
}
