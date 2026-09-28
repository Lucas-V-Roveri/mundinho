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
  return <button type="button" onClick={() => onOpen(item)} className="pixel-card-interactive inventory-slot group grid min-h-28 min-w-28 place-items-center gap-1 border-2 border-night-950 bg-paper-50 p-2 text-center text-ink-900" title={`${item.namePt} / ${item.nameEn}\n${item.utility}`}>
    <ContentIcon src={item.icon} alt={`Ícone de ${item.nameEn}`} kind="item" className="minecraft-item-sprite size-10" />
    <strong className="text-xs leading-4">{item.namePt}</strong>
    <span className="text-[10px] leading-3 text-ink-700">{item.nameEn}</span>
  </button>;
}

export function ItemSheet({ item, open, onOpenChange }: { item: CatalogItem | null; open: boolean; onOpenChange: (value: boolean) => void }) {
  if (!item) return null;
  return <Dialog open={open} onOpenChange={onOpenChange} title={`${item.namePt} · ${item.nameEn}`} description={`${item.mod} · ${item.status}`} className="w-[min(94vw,52rem)]">
    <div className="grid gap-4 text-ink-900 sm:grid-cols-[6rem_1fr]">
      <div className="inventory-slot grid size-24 place-items-center border-2 border-night-950 bg-stone-100">
        <ContentIcon src={item.icon} alt={`Ícone de ${item.nameEn}`} kind="item" className="minecraft-item-sprite size-16" />
      </div>
      <div className="space-y-3">
        <Tag tone={statusTone(item.status)}>{item.status}</Tag>
        <p className="text-sm leading-6">{item.utility}</p>
        <p className="text-xs text-ink-700">Marcos: {item.milestoneIds.map((id) => `#${id}`).join(", ")}</p>
      </div>
    </div>
    <section className="mt-5 border-t border-stone-300 pt-4"><h3 className="font-label text-xl">Como obter</h3><div className="mt-2 space-y-3">{item.origins.map((origin, index) => <article key={`${origin.label}-${index}`} className="border border-stone-300 bg-stone-100 p-3"><strong className="text-sm">{origin.label}</strong>{origin.chance ? <p className="text-xs">Chance: {origin.chance}</p> : null}{origin.quantity ? <p className="text-xs">Quantidade: {origin.quantity}</p> : null}{origin.condition ? <p className="text-xs">Condição: {origin.condition}</p> : null}<div className="mt-2"><Sources ids={origin.sources} /></div></article>)}</div></section>
    {item.recipe ? <section className="mt-5 border-t border-stone-300 pt-4"><h3 className="font-label text-xl">Receita</h3><p className="mt-1 text-sm">{item.recipe.station} · {item.recipe.type}</p>{item.recipe.ingredients?.length ? <p className="mt-2 text-sm">{item.recipe.ingredients.join(" + ")}</p> : null}<div className="mt-2"><Sources ids={item.recipe.sources} /></div></section> : null}
    {item.usedIn?.length ? <section className="mt-5 border-t border-stone-300 pt-4"><h3 className="font-label text-xl">Usado em</h3><div className="mt-2 space-y-2">{item.usedIn.map((usage) => <div key={usage.label}><p className="text-sm">{usage.label}</p><Sources ids={usage.sources} /></div>)}</div></section> : null}
    {item.notes?.length ? <section className="mt-5 border border-torch-700 bg-torch-100 p-3"><h3 className="font-label text-xl">Observações</h3>{item.notes.map((note) => <p key={note} className="mt-1 text-sm leading-5">{note}</p>)}</section> : null}
    <section className="mt-5 border-t border-stone-300 pt-4"><h3 className="font-label text-xl">Fontes</h3><div className="mt-2"><Sources ids={item.sources} /></div>{item.iconSource ? <p className="mt-2 text-xs">Fonte do ícone: {item.iconSource}</p> : <p className="mt-2 text-xs text-ink-700">Ícone real ainda não cadastrado com origem verificável; usando fallback local genérico.</p>}</section>
  </Dialog>;
}

export function EncounterDetails({ milestoneId }: { milestoneId: string }) {
  const encounters = encountersForMilestone(milestoneId);
  const [selected, setSelected] = React.useState<CatalogItem | null>(null);
  if (!encounters.length) return null;
  return <section className="mt-5 space-y-4 border-t-2 border-stone-300 pt-4" aria-label="Wiki do encontro">
    {encounters.map((encounter) => <article key={encounter.id} id={`encounter-${encounter.id}`} className="border border-stone-500 bg-paper-100 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2"><div><p className="font-label text-lg text-wood-700">Wiki do encontro</p><h4 className="font-sans text-base font-bold">{encounter.namePt} <span className="font-normal text-ink-700">· {encounter.nameEn}</span></h4><p className="mt-1 text-xs text-ink-700">{encounter.mod}</p></div><Tag tone={statusTone(encounter.status)}>{encounter.status}</Tag></div>
      {encounter.find.length ? <section className="mt-4"><h5 className="font-label text-xl">Como encontrar</h5>{encounter.find.map((fact, i) => <div key={i} className="mt-2"><p className="text-sm leading-5">{fact.text}</p><Sources ids={fact.sources} /></div>)}</section> : null}
      {encounter.start?.length ? <section className="mt-4"><h5 className="font-label text-xl">Como iniciar</h5>{encounter.start.map((fact, i) => <div key={i} className="mt-2"><p className="text-sm leading-5">{fact.text}</p><Sources ids={fact.sources} /></div>)}</section> : null}
      {encounter.drops.length ? <section className="mt-4"><h5 className="font-label text-xl">Drops</h5><div className="mt-2 flex gap-2 overflow-x-auto pb-2">{encounter.drops.map((drop) => { const item = itemById.get(drop.itemId); if (!item) return null; return <div key={drop.itemId} className="shrink-0"><ItemButton item={item} onOpen={setSelected} />{drop.chance ? <p className="mt-1 text-center text-xs">{drop.chance}</p> : null}</div>; })}</div></section> : null}
      {encounter.notes?.length ? <div className="mt-4 border border-torch-700 bg-torch-100 p-3">{encounter.notes.map((note) => <p key={note} className="text-xs leading-5">{note}</p>)}</div> : null}
      {encounter.status === "não documentado" && encounter.searched?.length ? <div className="mt-4"><strong className="font-label text-lg">Não documentado nas fontes consultadas</strong><p className="mt-1 text-xs">Procurei em: {encounter.searched.join("; ")}.</p></div> : null}
    </article>)}
    <ItemSheet item={selected} open={Boolean(selected)} onOpenChange={(value) => { if (!value) setSelected(null); }} />
  </section>;
}

export function TwilightCatalogPanel() {
  const [selected, setSelected] = React.useState<CatalogItem | null>(null);
  const twilightItems = ITEM_CATALOG.filter((item) => item.milestoneIds.some((id) => ["340", "350", "360", "370", "380", "400"].includes(id)));
  return <section id="catalogo-twilight" className="pixel-surface panel-paper p-5 text-ink-900">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="font-label text-xl text-wood-700">Craftings pesquisados · catálogo único</p><h2 className="mt-1 font-display text-base sm:text-xl">Itens do Lote 1 · Twilight Forest</h2></div><Tag tone="focus">{twilightItems.length} itens</Tag></div>
    <p className="mt-3 text-sm leading-6">Os cards abaixo usam os mesmos dados dos drops na Progressão. Clique para ver origem, utilidade, receita quando documentada, usos, status e fontes.</p>
    <div className="mt-4 flex gap-3 overflow-x-auto pb-3">{twilightItems.map((item) => <div key={item.id} className="shrink-0"><ItemButton item={item} onOpen={setSelected} /></div>)}</div>
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
