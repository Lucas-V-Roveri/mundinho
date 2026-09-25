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
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const Heading = `h${headingLevel}` as keyof React.JSX.IntrinsicElements;

  function toggle() {
    const next = !isOpen;
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  return (
    <section className={cn("accordion-item border-2 border-night-950 bg-paper-100 text-ink-900", className)}>
      <Heading>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          className="pixel-control pixel-accordion-trigger header-texture-wood flex w-full items-center justify-between gap-4 border-4 border-night-950 px-4 py-3 text-left font-label text-xl text-paper-50 hover:bg-wood-500"
        >
          <span>{title}</span>
          <span aria-hidden="true" className="accordion-chevron text-2xl" data-open={isOpen ? "true" : "false"}>
            ›
          </span>
        </button>
      </Heading>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        data-open={isOpen ? "true" : "false"}
        className="accordion-panel"
      >
        <div className="overflow-hidden">
          <div className="border-t-2 border-wood-900/30 bg-paper-100 p-4 text-ink-900">{children}</div>
        </div>
      </div>
    </section>
  );
}
