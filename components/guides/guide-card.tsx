"use client";

import * as React from "react";
import type { Route } from "next";
import Link from "next/link";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { CustomItemPanel } from "@/components/checklist/custom-item-panel";
import { ContentIcon } from "@/components/media/content-icon";
import { RecipeDisplay } from "@/components/guides/recipe-display";
import { useMundinho } from "@/components/app-providers";
import { guideThemeClasses } from "@/lib/guide-theme";
import { resolveGuideIcon } from "@/lib/minecraft-icons";
import { cn } from "@/lib/cn";
import type { Guide } from "@/types/content";

function normalize(value: string) {
  return value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

type GuideCardProps = {
  guide: Guide;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};

export function GuideCard({ guide, expanded, onExpandedChange }: GuideCardProps) {
  const { content } = useMundinho();
  const [internalExpanded, setInternalExpanded] = React.useState(true);
  const isExpanded = expanded ?? internalExpanded;
  const setExpanded = (next: boolean) => {
    if (onExpandedChange) onExpandedChange(next);
    else setInternalExpanded(next);
  };
  const tokens = [...new Set(normalize(`${guide.id} ${guide.title}`).split(/[^a-z0-9]+/).filter((token) => token.length >= 5 && !["guide", "restante", "reformulado", "utilidade"].includes(token)))];
  const related = content.progression.filter((item) => {
    const haystack = normalize(`${item.entry} ${item.mods} ${item.title}`);
    return tokens.some((token) => haystack.includes(token));
  });
  const theme = guideThemeClasses(guide.theme);

  return (
    <article id={`guide-${guide.id}`} className="scroll-mt-40">
      <AccordionItem
        open={isExpanded}
        onOpenChange={setExpanded}
        headingLevel={2}
        className={cn("scroll-mt-40", theme.frame)}
        title={(
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
            <GuideEmblem guide={guide} />
            <span className="min-w-[12rem] flex-1">
              <strong className="block truncate font-label text-2xl">{guide.title}</strong>
              <span className="mt-1 block truncate font-mono text-[10px] leading-4 text-paper-100/80">{guide.subtitle}</span>
            </span>
            <span className="flex flex-wrap gap-2 font-sans text-xs normal-case tracking-normal" aria-label={`Metadados de ${guide.title}`}>
              <span className="border border-paper-100/40 bg-night-950/35 px-2 py-1">{guide.type}</span>
              <span className="border border-paper-100/40 bg-night-950/35 px-2 py-1">fase {guide.phase}</span>
              <span className="border border-paper-100/40 bg-night-950/35 px-2 py-1">risco {guide.risk}</span>
              <span className="border border-paper-100/40 bg-night-950/35 px-2 py-1">complexidade {guide.complexity}</span>
              <span className="border border-paper-100/40 bg-night-950/35 px-2 py-1">confiança {guide.confidence}</span>
            </span>
          </span>
        )}
      >
        {isExpanded ? (
          <div className="space-y-5 text-ink-900">
            <p className="text-base leading-7">{guide.intro}</p>
            <Accordion>
              {guide.sections.map((section, index) => (
                <AccordionItem
                  key={`${section.title}-${index}`}
                  title={<SectionTitle icon={sectionIcon(section.title, index)}>{section.title}</SectionTitle>}
                  defaultOpen={index === 0}
                >
                  {section.body ? <p className="leading-7">{section.body}</p> : null}
                  {section.list ? <ul className="list-square space-y-2 pl-5">{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                  {section.steps ? <ol className="space-y-2 pl-5">{section.steps.map((item, step) => <li key={item}><strong className="font-label text-xl text-wood-700">{step + 1}.</strong> {item}</li>)}</ol> : null}
                </AccordionItem>
              ))}
              <div id={`guide-${guide.id}-craftings`} className="scroll-mt-40">
                <AccordionItem title={<SectionTitle icon="pickaxe">Craftings pesquisados</SectionTitle>}>
                  {guide.craftings.length ? <div className="grid gap-4">{guide.craftings.map((craft) => <RecipeDisplay key={craft.title} craft={craft} />)}</div> : <p className="leading-7">{guide.craftingNote || "Este guia não possui um crafting de progressão relevante documentado."}</p>}
                </AccordionItem>
              </div>
              <AccordionItem title={<SectionTitle icon="compass">Marcos relacionados ({related.length})</SectionTitle>}>
                {related.length ? <div className="grid gap-2 sm:grid-cols-2">{related.map((item) => <Link key={item.id} href={`/progressao#${item.id}` as Route} className="pixel-card-interactive block border-4 border-night-950 bg-paper-50 p-3 text-ink-900"><span className="font-label text-lg text-blue-700">#{String(item.order).padStart(3, "0")} · {item.phase}</span><strong className="mt-1 block text-sm">{item.title}</strong></Link>)}</div> : <p className="text-sm">Nenhum marco exclusivo deste guia; ele entra como apoio/consulta.</p>}
              </AccordionItem>
              <AccordionItem title={<SectionTitle icon="chest">Checklist</SectionTitle>}>
                <div className="grid gap-2">{guide.checklist.map(([id, label, phase]) => <ChecklistItem key={id} itemId={id} label={label} phase={phase} section="mods" entryKey={guide.id} />)}</div>
                <CustomItemPanel section="mods" entryKey={guide.id} />
              </AccordionItem>
              <AccordionItem title={<SectionTitle icon="book">Fontes</SectionTitle>}>
                <ul className="space-y-2">{guide.sources.map(([label, href]) => <li key={href}><a className="semantic-link font-label text-xl" href={href} target="_blank" rel="noreferrer">{label}</a></li>)}</ul>
              </AccordionItem>
            </Accordion>
            {guide.notes?.length ? <div className="border-l-4 border-torch-500 bg-torch-100 p-4 text-sm text-ink-900">{guide.notes.map((note) => <p key={note}>{note}</p>)}</div> : null}
          </div>
        ) : null}
      </AccordionItem>
    </article>
  );
}

function GuideEmblem({ guide }: { guide: Guide }) {
  return (
    <span className="inventory-slot grid size-11 shrink-0 place-items-center border-2 border-night-950 bg-stone-700" aria-hidden="true">
      <ContentIcon src={resolveGuideIcon(guide)} alt="" kind="item" className="minecraft-item-sprite size-8" />
    </span>
  );
}

function sectionIcon(title: string, index: number): PixelIconName {
  const value = normalize(title);
  if (value.includes("come") || value.includes("acesso") || value.includes("rota")) return "compass";
  if (value.includes("equip") || value.includes("combate") || value.includes("boss")) return "pickaxe";
  if (value.includes("loot") || value.includes("item") || value.includes("recomp")) return "chest";
  if (value.includes("risco") || value.includes("cuidado")) return "torch";
  return index % 2 === 0 ? "book" : "compass";
}

function SectionTitle({ icon, children }: { icon: PixelIconName; children: React.ReactNode }) {
  return <span className="flex items-center gap-2"><PixelIcon name={icon} size={16} className="text-torch-300" /><span>{children}</span></span>;
}
