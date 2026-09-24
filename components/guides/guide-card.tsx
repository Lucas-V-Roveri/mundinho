"use client";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CraftingGrid } from "@/components/ui/crafting-slot";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { CustomItemPanel } from "@/components/checklist/custom-item-panel";
import type { Guide } from "@/types/content";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <article id={`guide-${guide.id}`} className="scroll-mt-64">
      <Card surface={guide.type === "chefe" ? "night" : guide.type === "dimensão" ? "wood" : "paper"} className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><CardTitle>{guide.title}</CardTitle><CardDescription>{guide.subtitle}</CardDescription></div>
            <span className="border-4 border-night-950 bg-torch-100 px-2 py-1 font-label text-lg text-ink-900">{guide.type}</span>
          </div>
          <div className="flex flex-wrap gap-2 font-label text-lg"><Tag label="fase" value={guide.phase} /><Tag label="risco" value={guide.risk} /><Tag label="complexidade" value={guide.complexity} /><Tag label="confiança" value={guide.confidence} /></div>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-base leading-7">{guide.intro}</p>
          <Accordion>
            {guide.sections.map((section, index) => <AccordionItem key={`${section.title}-${index}`} title={section.title} defaultOpen={index === 0}>
              {section.body ? <p className="leading-7">{section.body}</p> : null}
              {section.list ? <ul className="list-square space-y-2 pl-5">{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              {section.steps ? <ol className="space-y-2 pl-5">{section.steps.map((item, step) => <li key={item}><strong className="font-label text-xl text-wood-700">{step + 1}.</strong> {item}</li>)}</ol> : null}
            </AccordionItem>)}
            <AccordionItem title="Craftings pesquisados">
              <div className="grid gap-4">{guide.craftings.map((craft) => <section key={craft.title} className="border-4 border-night-950 bg-stone-100 p-4 shadow-pixel-sm">
                <div className="flex flex-wrap justify-between gap-2"><h4 className="font-label text-2xl text-wood-700">{craft.title}</h4><span className="font-label text-lg">confiança: {craft.confidence}</span></div>
                {craft.grid ? <div className="mt-3 overflow-x-auto"><CraftingGrid slots={craft.grid.map((slot, index) => <span key={index} className="leading-tight">{slot || null}</span>)} result={craft.result || craft.title} /></div> : null}
                {craft.ingredients ? <ul className="mt-3 list-square pl-5 text-sm leading-6">{craft.ingredients.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                {craft.body ? <p className="mt-3 text-sm leading-6 text-ink-700">{craft.body}</p> : null}
              </section>)}</div>
            </AccordionItem>
            <AccordionItem title="Checklist">
              <div className="grid gap-2">{guide.checklist.map(([id, label, phase]) => <ChecklistItem key={id} itemId={id} label={label} phase={phase} section="mods" entryKey={guide.id} />)}</div>
              <CustomItemPanel section="mods" entryKey={guide.id} />
            </AccordionItem>
            <AccordionItem title="Fontes"><ul className="space-y-2">{guide.sources.map(([label, href]) => <li key={href}><a className="font-label text-xl text-wood-700 underline decoration-2 underline-offset-4 hover:text-torch-700" href={href} target="_blank" rel="noreferrer">{label}</a></li>)}</ul></AccordionItem>
          </Accordion>
          {guide.notes?.length ? <div className="border-l-8 border-torch-500 bg-torch-100 p-4 text-sm text-ink-900">{guide.notes.map((note) => <p key={note}>{note}</p>)}</div> : null}
        </CardContent>
      </Card>
    </article>
  );
}

function Tag({ label, value }: { label: string; value: string }) { return <span className="border-2 border-current/30 bg-paper-100 px-2 py-1 text-ink-900"><strong>{label}:</strong> {value}</span>; }
