"use client";

import * as React from "react";
import { GuideCard } from "@/components/guides/guide-card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useMundinho } from "@/components/app-providers";

export function ModsView() {
  const { content } = useMundinho();
  const [type, setType] = React.useState("todos");
  const [query, setQuery] = React.useState("");
  React.useEffect(() => { const frame = requestAnimationFrame(() => setType(localStorage.getItem("mundinho.filter.guideType") || "todos")); return () => cancelAnimationFrame(frame); }, []);
  const changeType = (value: string) => { setType(value); localStorage.setItem("mundinho.filter.guideType", value); };
  const normalized = query.trim().toLocaleLowerCase("pt-BR");
  const guides = content.guides.filter((guide) => (type === "todos" || guide.type === type) && (!normalized || `${guide.title} ${guide.subtitle} ${guide.intro}`.toLocaleLowerCase("pt-BR").includes(normalized)));

  return (
    <div className="space-y-6 page-enter">
      <header className="pixel-surface panel-paper p-5 text-ink-900">
        <p className="font-label text-2xl text-wood-700">wiki central</p>
        <h1 className="mt-2 font-display text-lg leading-relaxed text-ink-900 sm:text-2xl">Mods</h1>
        <p className="mt-3 max-w-4xl leading-7 text-ink-900">Cada entrada mantém o padrão aprovado: como começar, preparo, progressão, riscos, craftings por nível de confiança, checklist e fontes.</p>
      </header>
      <section className="grid gap-3 border border-stone-500 bg-stone-100 p-4 text-ink-900 sm:grid-cols-[1fr_14rem]" aria-label="Filtros dos guias">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filtrar os guias desta página..." aria-label="Filtrar guias" />
        <Select value={type} onChange={(event) => changeType(event.target.value)} aria-label="Tipo de guia">
          <option value="todos">Todos os tipos</option>
          <option value="dimensão">Dimensões</option>
          <option value="chefe">Chefes</option>
          <option value="utilidade">Utilidade</option>
        </Select>
      </section>
      <p className="font-label text-xl text-paper-100">{guides.length} guia(s)</p>
      <div className="grid gap-6">{guides.map((guide) => <GuideCard key={guide.id} guide={guide} />)}</div>
    </div>
  );
}
