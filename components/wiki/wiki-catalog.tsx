"use client";

import * as React from "react";
import { ContentIcon } from "@/components/media/content-icon";
import { Dialog } from "@/components/ui/dialog";
import { Tag } from "@/components/ui/tag";
import {
  ENCOUNTER_CATALOG,
  ITEM_CATALOG,
  WIKI_SOURCES,
  encountersForMilestone,
  itemById,
  sourceById,
  type CatalogItem,
  type WikiStatus,
} from "@/data/wiki-catalog";
import { bestiaryHrefForCatalogItem, bestiaryHrefForEncounter } from "@/lib/bestiary-links";

function statusTone(status: WikiStatus): "success" | "danger" | "neutral" | "focus" {
  if (status === "confirmado (2+ fontes)") return "success";
  if (status === "conflito entre fontes") return "danger";
  if (status === "não documentado") return "neutral";
  return "focus";
}

function Sources({ ids }: { ids: string[] }) {
  const unique = [...new Set(ids)];
  return <div className="flex flex-wrap gap-2">{unique.map((id) => {
    const source = sourceById.get(id);
    if (!source) return null;
    return <a key={id} href={source.url} target="_blank" rel="noreferrer" className="semantic-link text-xs">{source.label}</a>;
  })}</div>;
}

export function ItemButton({ item, onOpen }: { item: CatalogItem; onOpen: (item: CatalogItem) => void }) {
  return <button type="button" onClick={() => onOpen(item)} className="pixel-card-interactive inventory-slot group grid min-h-28 min-w-28 place-items-center gap-1 border-2 border-night-950 bg-paper-50 p-2 text-center text-ink-900" title={`${item.namePt} / ${item.nameEn}`}>
    <ContentIcon src={item.icon} alt={`Ícone de ${item.nameEn}`} kind="item" className="minecraft-item-sprite size-10" />
    <strong className="text-xs leading-4">{item.namePt}</strong>
    <span className="text-[10px] leading-3 text-ink-700">{item.nameEn}</span>
  </button>;
}

export function ItemSheet({ item, open, onOpenChange }: { item: CatalogItem | null; open: boolean; onOpenChange: (value: boolean) => void }) {
  if (!item) return null;
  const bestiaryHref = bestiaryHrefForCatalogItem(item);
  return <Dialog open={open} onOpenChange={onOpenChange} title={`${item.namePt} · ${item.nameEn}`} description={`${item.mod} · crafting em Mods`} className="w-[min(94vw,52rem)]">
    <div className="grid gap-4 text-ink-900 sm:grid-cols-[6rem_1fr]">
      <div className="inventory-slot grid size-24 place-items-center border-2 border-night-950 bg-stone-100">
        <ContentIcon src={item.icon} alt={`Ícone de ${item.nameEn}`} kind="item" className="minecraft-item-sprite size-16" />
      </div>
      <div className="space-y-3">
        <Tag tone={statusTone(item.status)}>{item.status}</Tag>
        <p className="text-xs text-ink-700">Marcos: {item.milestoneIds.map((id) => `#${id}`).join(", ")}</p>
        {bestiaryHref ? <a href={bestiaryHref} className="pixel-control inline-block border-2 border-night-950 bg-paper-50 px-3 py-2 font-label text-lg text-blue-800">Origem e utilidade: abrir no Bestiário</a> : <p className="text-sm text-ink-700">Origem/utilidade ainda sem card de Bestiário mapeado.</p>}
      </div>
    </div>
    <p className="mt-4 border border-stone-300 bg-stone-100 p-3 text-sm leading-6">Este painel mantém somente informação de crafting. O que o drop é, como é obtido e para que serve fica centralizado no Bestiário.</p>
    {item.recipe ? <section className="mt-5 border-t border-stone-300 pt-4"><h3 className="font-label text-xl">Receita</h3><p className="mt-1 text-sm">{item.recipe.station} · {item.recipe.type}</p>{item.recipe.ingredients?.length ? <p className="mt-2 text-sm">{item.recipe.ingredients.join(" + ")}</p> : null}<div className="mt-2"><Sources ids={item.recipe.sources} /></div></section> : null}
    {item.usedIn?.length ? <section className="mt-5 border-t border-stone-300 pt-4"><h3 className="font-label text-xl">Crafting documentado</h3><div className="mt-2 space-y-2">{item.usedIn.map((usage) => <div key={usage.label}><p className="text-sm">{usage.label}</p><Sources ids={usage.sources} /></div>)}</div></section> : null}
    {item.notes?.length ? <section className="mt-5 border border-torch-700 bg-torch-100 p-3"><h3 className="font-label text-xl">Observações de crafting</h3>{item.notes.map((note) => <p key={note} className="mt-1 text-sm leading-5">{note}</p>)}</section> : null}
    <section className="mt-5 border-t border-stone-300 pt-4"><h3 className="font-label text-xl">Fontes do crafting</h3><div className="mt-2"><Sources ids={item.sources} /></div>{item.iconSource ? <p className="mt-2 text-xs">Fonte do ícone: {item.iconSource}</p> : <p className="mt-2 text-xs text-ink-700">Ícone real ainda não cadastrado com origem verificável; usando fallback local genérico.</p>}</section>
  </Dialog>;
}

export function EncounterDetails({ milestoneId }: { milestoneId: string }) {
  const encounters = encountersForMilestone(milestoneId);
  if (!encounters.length) return null;
  return <section className="mt-5 space-y-4 border-t-2 border-stone-300 pt-4" aria-label="Wiki do encontro">
    {encounters.map((encounter) => {
      const bestiaryHref = bestiaryHrefForEncounter(encounter.id);
      return <article key={encounter.id} id={`encounter-${encounter.id}`} className="border border-stone-500 bg-paper-100 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="font-label text-lg text-wood-700">Wiki do encontro</p><h4 className="font-sans text-base font-bold">{encounter.namePt} <span className="font-normal text-ink-700">· {encounter.nameEn}</span></h4><p className="mt-1 text-xs text-ink-700">{encounter.mod}</p></div><Tag tone={statusTone(encounter.status)}>{encounter.status}</Tag></div>
        {bestiaryHref ? <a href={bestiaryHref} className="mt-3 inline-block font-label text-lg text-blue-700 underline underline-offset-2">Abrir criatura e drops no Bestiário</a> : null}
        {encounter.find.length ? <section className="mt-4"><h5 className="font-label text-xl">Como encontrar</h5>{encounter.find.map((fact, i) => <div key={i} className="mt-2"><p className="text-sm leading-5">{fact.text}</p><Sources ids={fact.sources} /></div>)}</section> : null}
        {encounter.start?.length ? <section className="mt-4"><h5 className="font-label text-xl">Como iniciar</h5>{encounter.start.map((fact, i) => <div key={i} className="mt-2"><p className="text-sm leading-5">{fact.text}</p><Sources ids={fact.sources} /></div>)}</section> : null}
        {encounter.drops.length ? <section className="mt-4"><h5 className="font-label text-xl">Drops</h5><p className="mt-1 text-xs text-ink-700">A explicação de cada drop vive no card da criatura no Bestiário.</p><div className="mt-2 flex gap-2 overflow-x-auto pb-2">{encounter.drops.map((drop) => { const item = itemById.get(drop.itemId); if (!item) return null; return <div key={drop.itemId} className="shrink-0">{bestiaryHref ? <a href={bestiaryHref} className="pixel-card-interactive inventory-slot group grid min-h-28 min-w-28 place-items-center gap-1 border-2 border-night-950 bg-paper-50 p-2 text-center text-ink-900" title={`Abrir ${item.namePt} no card de ${encounter.namePt}`}><ContentIcon src={item.icon} alt={`Ícone de ${item.nameEn}`} kind="item" className="minecraft-item-sprite size-10" /><strong className="text-xs leading-4">{item.namePt}</strong><span className="text-[10px] leading-3 text-blue-700 underline underline-offset-2">ver no Bestiário</span></a> : <div className="inventory-slot grid min-h-28 min-w-28 place-items-center border-2 border-night-950 bg-paper-50 p-2 text-center"><strong className="text-xs leading-4">{item.namePt}</strong><span className="text-[10px] text-redstone-700">sem card mapeado</span></div>}{drop.chance ? <p className="mt-1 text-center text-xs">{drop.chance}</p> : null}{drop.quantity ? <p className="text-center text-xs">{drop.quantity}</p> : null}{drop.condition ? <p className="max-w-28 text-center text-[10px] leading-4">{drop.condition}</p> : null}</div>; })}</div></section> : null}
        {encounter.notes?.length ? <div className="mt-4 border border-torch-700 bg-torch-100 p-3">{encounter.notes.map((note) => <p key={note} className="text-xs leading-5">{note}</p>)}</div> : null}
        {encounter.status === "não documentado" && encounter.searched?.length ? <div className="mt-4"><strong className="font-label text-lg">Não documentado nas fontes consultadas</strong><p className="mt-1 text-xs">Procurei em: {encounter.searched.join("; ")}.</p></div> : null}
      </article>;
    })}
  </section>;
}

export function TwilightCatalogPanel() {
  const [selected, setSelected] = React.useState<CatalogItem | null>(null);
  const twilightItems = ITEM_CATALOG.filter((item) => item.milestoneIds.some((id) => ["340", "350", "360", "370", "380", "400"].includes(id)));
  const craftingItems = twilightItems.filter((item) => Boolean(item.recipe || item.usedIn?.length));
  return <section id="catalogo-twilight" className="pixel-surface panel-paper p-5 text-ink-900">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="font-label text-xl text-wood-700">Craftings pesquisados · Mods</p><h2 className="mt-1 font-display text-base sm:text-xl">Twilight Forest · relações de crafting</h2></div><Tag tone="focus">{craftingItems.length} item(ns)</Tag></div>
    <p className="mt-3 text-sm leading-6">Origem e utilidade dos drops ficam no Bestiário. Aqui permanecem somente receitas e relações de crafting já documentadas; cada item aponta de volta para o card da criatura.</p>
    {craftingItems.length ? <div className="mt-4 flex gap-3 overflow-x-auto pb-3">{craftingItems.map((item) => <div id={`twilight-crafting-${item.id}`} key={item.id} className="shrink-0 scroll-mt-28"><ItemButton item={item} onOpen={setSelected} /></div>)}</div> : <p className="mt-4 border border-stone-300 bg-stone-100 p-3 text-sm">Nenhum crafting de drop está documentado neste catálogo ainda; consulte o Bestiário para origem e utilidade.</p>}
    <ItemSheet item={selected} open={Boolean(selected)} onOpenChange={(value) => { if (!value) setSelected(null); }} />
  </section>;
}

export function WikiSourcesPanel() {
  const statuses = ["confirmado (2+ fontes)", "confirmado (1 fonte)", "conflito entre fontes", "não documentado"] as WikiStatus[];
  return <section id="fontes-wiki" className="border border-stone-500 bg-paper-100 p-4 text-ink-900">
    <h2 className="font-label text-2xl">Fontes da wiki · Lote 1</h2>
    <div className="mt-3 grid gap-3 sm:grid-cols-2">{WIKI_SOURCES.map((source) => <article key={source.id} className="border border-stone-300 bg-paper-50 p-3"><a href={source.url} target="_blank" rel="noreferrer" className="semantic-link font-semibold">{source.label}</a><p className="mt-1 text-xs leading-5">{source.versionNote}</p></article>)}</div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">{statuses.map((status) => { const encounters = ENCOUNTER_CATALOG.filter((entry) => entry.status === status); const items = ITEM_CATALOG.filter((entry) => entry.status === status); return <article key={status} className="border border-stone-300 bg-stone-100 p-3"><Tag tone={statusTone(status)}>{status}</Tag><p className="mt-2 text-sm">Encontros: {encounters.length ? encounters.map((entry) => entry.nameEn).join(", ") : "nenhum"}</p><p className="mt-1 text-sm">Itens: {items.length ? items.map((entry) => entry.nameEn).join(", ") : "nenhum"}</p></article>; })}</div>
    <div className="mt-5 border border-stone-300 bg-paper-50 p-3"><strong className="font-label text-xl">Imagens e ícones</strong><p className="mt-1 text-sm leading-5">Nenhum ícone específico de mod foi incorporado neste lote sem uma origem de arquivo verificável. Até os assets serem baixados de uma fonte identificada e creditada, o componente usa o fallback local do site. Isso evita atribuir imagem a uma fonte incerta.</p></div>
  </section>;
}
