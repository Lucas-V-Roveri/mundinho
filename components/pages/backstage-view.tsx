"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { useMundinho } from "@/components/app-providers";

export function BackstageView() {
  const { content } = useMundinho();
  const [query, setQuery] = React.useState("");
  const data = content.backstage;
  if (!data) return <p className="pixel-surface panel-paper p-5">Bastidores indisponível nesta prévia.</p>;
  const normalized = query.trim().toLocaleLowerCase("pt-BR");
  const items = data.items.filter((item) => !normalized || `${item.name} ${item.fn} ${item.version}`.toLocaleLowerCase("pt-BR").includes(normalized));
  return <div className="space-y-6 page-enter">
    <header className="pixel-surface panel-stone p-5"><div className="smooth-text-panel border-2 border-night-950/20 p-3"><p className="font-label text-2xl text-wood-700">bibliotecas, performance, compat e cosméticos</p><h1 className="mt-2 font-display text-lg leading-relaxed sm:text-2xl">Bastidores</h1><p className="mt-3 max-w-4xl leading-7">{data.note}</p></div></header>
    <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filtrar os 87 bastidores..." aria-label="Filtrar bastidores" />
    <div className="overflow-x-auto border-4 border-night-950 bg-paper-100 shadow-pixel"><table className="w-full min-w-[48rem] border-collapse text-left text-sm"><thead className="bg-wood-700 text-paper-50"><tr><th className="border-b-4 border-night-950 p-3 font-label text-xl">Mod</th><th className="border-b-4 border-night-950 p-3 font-label text-xl">Versão</th><th className="border-b-4 border-night-950 p-3 font-label text-xl">Função</th></tr></thead><tbody>{items.map((item) => <tr key={item.name} id={item.name} className="odd:bg-paper-50 even:bg-stone-100"><td className="border-b-2 border-stone-300 p-3 font-semibold">{item.name}</td><td className="border-b-2 border-stone-300 p-3">{item.version}</td><td className="border-b-2 border-stone-300 p-3">{item.fn}</td></tr>)}</tbody></table></div>
    {data.image_sources?.length ? <section className="border-4 border-night-950 bg-paper-100 p-4 shadow-pixel"><h2 className="font-label text-2xl">Fontes das imagens</h2><div className="mt-3 grid gap-3 sm:grid-cols-2">{data.image_sources.map((source) => <article key={`${source.label}-${source.source}`} className="border-2 border-night-950 bg-paper-50 p-3"><strong className="font-label text-xl">{source.label}</strong><p className="mt-1 break-words text-sm">{source.source}</p>{source.note ? <p className="mt-1 text-xs text-ink-700">{source.note}</p> : null}</article>)}</div></section> : null}
    <section className="border-4 border-torch-700 bg-torch-100 p-4 text-ink-900 shadow-pixel"><h2 className="font-label text-2xl">A conferir in-game</h2><div className="mt-3 grid gap-3 sm:grid-cols-2">{data.to_check.map((item) => <article key={item.name} className="border-4 border-night-950 bg-paper-50 p-3"><strong className="font-label text-xl">{item.name}</strong><p className="mt-1 text-sm leading-5">{item.fn}</p></article>)}</div></section>
  </div>;
}
