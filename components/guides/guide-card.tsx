"use client";

import type { Route } from "next";
import Link from "next/link";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { CustomItemPanel } from "@/components/checklist/custom-item-panel";
import { ContentIcon, iconKindForType } from "@/components/media/content-icon";
import { RecipeDisplay } from "@/components/guides/recipe-display";
import { useMundinho } from "@/components/app-providers";
import type { Guide } from "@/types/content";

function normalize(value: string) { return value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

export function GuideCard({ guide }: { guide: Guide }) {
  const { content } = useMundinho();
  const tokens = [...new Set(normalize(`${guide.id} ${guide.title}`).split(/[^a-z0-9]+/).filter((token) => token.length >= 5 && !["guide", "restante", "reformulado", "utilidade"].includes(token)))];
  const related = content.progression.filter((item) => {
    const haystack = normalize(`${item.entry} ${item.mods} ${item.title}`);
    return tokens.some((token) => haystack.includes(token));
  });

  return (
    <article id={`guide-${guide.id}`} className="scroll-mt-64">
      <Card surface={guide.type === "chefe" ? "night" : guide.type === "dimensão" ? "wood" : "paper"} className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3"><ContentIcon src={guide.imagem?.src ?? guide.icone} alt={guide.imagem?.alt ?? `Ícone do guia ${guide.title}`} kind={iconKindForType(guide.type)} className="size-14 shrink-0 border-2 border-current/30 bg-paper-50 p-1" /><div><CardTitle>{guide.title}</CardTitle><CardDescription>{guide.subtitle}</CardDescription></div></div>
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
            <AccordionItem title="Craftings pesquisados"><div className="grid gap-4">{guide.craftings.map((craft) => <RecipeDisplay key={craft.title} craft={craft} />)}</div></AccordionItem>
            <AccordionItem title={`Marcos relacionados (${related.length})`}>
              {related.length ? <div className="grid gap-2 sm:grid-cols-2">{related.map((item) => <Link key={item.id} href={`/progressao#${item.id}` as Route} className="border-4 border-night-950 bg-paper-50 p-3 text-ink-900 shadow-pixel-sm hover:bg-torch-100"><span className="font-label text-lg">#{String(item.order).padStart(3, "0")} · {item.phase}</span><strong className="mt-1 block text-sm">{item.title}</strong></Link>)}</div> : <p className="text-sm">Nenhum marco exclusivo deste guia; ele entra como apoio/consulta.</p>}
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
