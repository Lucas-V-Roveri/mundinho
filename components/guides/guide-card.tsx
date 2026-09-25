"use client";

import type { Route } from "next";
import Link from "next/link";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { CustomItemPanel } from "@/components/checklist/custom-item-panel";
import { ContentIcon, iconKindForType } from "@/components/media/content-icon";
import { RecipeDisplay } from "@/components/guides/recipe-display";
import { useMundinho } from "@/components/app-providers";
import { guideThemeClasses } from "@/lib/guide-theme";
import { cn } from "@/lib/cn";
import type { Guide } from "@/types/content";

function normalize(value: string) {
  return value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function GuideCard({ guide }: { guide: Guide }) {
  const { content } = useMundinho();
  const tokens = [...new Set(normalize(`${guide.id} ${guide.title}`).split(/[^a-z0-9]+/).filter((token) => token.length >= 5 && !["guide", "restante", "reformulado", "utilidade"].includes(token)))];
  const related = content.progression.filter((item) => {
    const haystack = normalize(`${item.entry} ${item.mods} ${item.title}`);
    return tokens.some((token) => haystack.includes(token));
  });
  const theme = guideThemeClasses(guide.theme);

  return (
    <article id={`guide-${guide.id}`} className="scroll-mt-40">
      <Card surface="paper" className={cn("overflow-hidden text-ink-900", theme.frame)}>
        <div aria-hidden="true" className={theme.stripe} />
        <CardHeader className="text-ink-900">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <GuideEmblem guide={guide} />
              <div className="min-w-0">
                <CardTitle className="text-ink-900">{guide.title}</CardTitle>
                <CardDescription className="text-ink-700">{guide.subtitle}</CardDescription>
              </div>
            </div>
            <Tag className={cn(theme.badge, "shrink-0")}>{guide.type}</Tag>
          </div>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1" aria-label={`Metadados de ${guide.title}`}>
            <Tag tone="focus" className="shrink-0">fase: {guide.phase}</Tag>
            <Tag tone={guide.risk === "Severo" || guide.risk === "Alto" ? "danger" : "neutral"} className="shrink-0">risco: {guide.risk}</Tag>
            <Tag className="shrink-0">complexidade: {guide.complexity}</Tag>
            <Tag tone={String(guide.confidence).startsWith("Alta") ? "success" : "neutral"} className="shrink-0">confiança: {guide.confidence}</Tag>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 text-ink-900">
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
            <AccordionItem title={<SectionTitle icon="pickaxe">Craftings pesquisados</SectionTitle>}>
              <div className="grid gap-4">{guide.craftings.map((craft) => <RecipeDisplay key={craft.title} craft={craft} />)}</div>
            </AccordionItem>
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
        </CardContent>
      </Card>
    </article>
  );
}

function GuideEmblem({ guide }: { guide: Guide }) {
  const source = guide.imagem?.src ?? guide.icone;
  if (source) {
    return <ContentIcon src={source} alt={guide.imagem?.alt ?? `Ícone do guia ${guide.title}`} kind={iconKindForType(guide.type)} className="size-14 shrink-0 border border-stone-500 bg-paper-50 p-1" />;
  }
  return (
    <span className="grid size-14 shrink-0 place-items-center border border-[var(--guide-accent)] bg-paper-50 text-[var(--guide-accent)]" aria-label={`Ícone pixel-art temático de ${guide.title}`}>
      <PixelIcon name={guideFallbackIcon(guide)} size={32} />
    </span>
  );
}

function guideFallbackIcon(guide: Guide): PixelIconName {
  if (guide.id === "sophisticated-backpacks") return "chest";
  if (["acampamento", "cozinha", "ignis", "incendium", "piglin-proliferation"].includes(guide.id)) return "torch";
  if (["create", "construcao", "fallingtree", "overworld-terreno"].includes(guide.id)) return "pickaxe";
  if (guide.type === "dimensão" || guide.id === "waystones" || guide.id === "dungeons-structures") return "compass";
  if (["mca", "friends-foes", "alexs-mobs", "overworld-vivo", "mob-variants"].includes(guide.id)) return "heart";
  return "book";
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