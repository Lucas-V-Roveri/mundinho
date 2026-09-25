"use client";

import { useMundinho } from "@/components/app-providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataStatePanel } from "@/components/ui/data-state";
import { PixelIcon } from "@/components/ui/pixel-icon";

export function AmendmentsView() {
  const { content, dataStatus, dataError, retry } = useMundinho();
  const data = content.amendments;

  return <div className="space-y-6 page-enter">
    <header className="pixel-surface panel-paper p-5 text-ink-900">
      <p className="font-label text-2xl text-wood-700">consulta fixa</p>
      <h1 className="mt-2 font-display text-lg leading-relaxed text-ink-900 sm:text-2xl">Amendments</h1>
      <p className="mt-3 max-w-4xl leading-7 text-ink-900">{data?.intro ?? "Ajustes e detalhes de uso dos mods do mundinho."}</p>
    </header>

    {dataStatus === "loading" ? <DataStatePanel status="loading" loadingText="abrindo as anotações..." /> : dataStatus === "error" ? <DataStatePanel status="error" error={dataError} retry={retry} /> : !data ? <DataStatePanel status="empty" emptyText="Amendments carregou, mas não trouxe conteúdo." /> : <>
      <div className="grid gap-4 md:grid-cols-2">{data.groups.map((group) => <Card key={group.title} id={group.title} surface="paper" className="scroll-mt-40 text-ink-900"><CardHeader tone="wood"><CardTitle>{group.title}</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm leading-6">{group.items.map((item) => <li key={item} className="flex gap-2"><PixelIcon name="book" size={14} className="mt-1 shrink-0 text-wood-700" /><span>{item}</span></li>)}</ul></CardContent></Card>)}</div>
      <section className="border border-stone-500 bg-paper-100 p-4 text-ink-900"><h2 className="flex items-center gap-2 font-label text-2xl"><PixelIcon name="book" size={18} /> Fontes</h2><ul className="mt-2 space-y-2">{data.sources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noreferrer" className="semantic-link font-label text-xl">{label}</a></li>)}</ul></section>
    </>}
  </div>;
}
