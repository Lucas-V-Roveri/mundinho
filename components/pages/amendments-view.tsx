"use client";

import { useMundinho } from "@/components/app-providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AmendmentsView() {
  const { content } = useMundinho();
  const data = content.amendments;
  if (!data) return <p className="pixel-surface panel-paper p-5">Conteúdo de Amendments indisponível nesta prévia.</p>;
  return <div className="space-y-6 page-enter">
    <header className="pixel-surface panel-paper p-5"><p className="font-label text-2xl text-wood-700">consulta fixa</p><h1 className="mt-2 font-display text-lg leading-relaxed sm:text-2xl">Amendments</h1><p className="mt-3 max-w-4xl leading-7">{data.intro}</p></header>
    <div className="grid gap-4 md:grid-cols-2">{data.groups.map((group, index) => <Card key={group.title} id={group.title} surface={index % 3 === 0 ? "wood" : index % 3 === 1 ? "paper" : "stone"} className="scroll-mt-64"><CardHeader><CardTitle>{group.title}</CardTitle></CardHeader><CardContent><ul className="list-square space-y-2 pl-5 text-sm leading-6">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></CardContent></Card>)}</div>
    <section className="border-4 border-night-950 bg-paper-100 p-4 shadow-pixel"><h2 className="font-label text-2xl">Fontes</h2><ul className="mt-2 space-y-2">{data.sources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noreferrer" className="font-label text-xl text-wood-700 underline">{label}</a></li>)}</ul></section>
  </div>;
}
