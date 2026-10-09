"use client";

import * as React from "react";
import { GuideCard } from "@/components/guides/guide-card";
import { TwilightCatalogPanel } from "@/components/wiki/wiki-catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DataStatePanel } from "@/components/ui/data-state";
import { useMundinho } from "@/components/app-providers";
import { STATIC_TOTALS } from "@/lib/static-totals";

function guideIdFromHash(hash: string, guideIds: string[]) {
  const target = decodeURIComponent(hash.replace(/^#/, ""));
  return guideIds.find((id) => target === `guide-${id}` || target.startsWith(`guide-${id}-`));
}

export function ModsView() {
  const { content, dataStatus, dataError, retry } = useMundinho();
  const [type, setType] = React.useState("todos");
  const [query, setQuery] = React.useState("");
  const [expandedGuideIds, setExpandedGuideIds] = React.useState<Set<string>>(new Set());
  const expansionInitialized = React.useRef(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setType(localStorage.getItem("mundinho.filter.guideType") || "todos"));
    return () => cancelAnimationFrame(frame);
  }, []);

  const guideIds = React.useMemo(() => content.guides.map((guide) => guide.id), [content.guides]);

  React.useEffect(() => {
    if (!guideIds.length) return;

    const openHashTarget = () => {
      const targetGuideId = guideIdFromHash(window.location.hash, guideIds);
      if (!targetGuideId) return;
      setExpandedGuideIds((current) => current.has(targetGuideId) ? current : new Set([...current, targetGuideId]));
    };

    if (!expansionInitialized.current) {
      const targetGuideId = guideIdFromHash(window.location.hash, guideIds);
      setExpandedGuideIds(new Set([targetGuideId ?? guideIds[0]]));
      expansionInitialized.current = true;
    } else {
      openHashTarget();
    }

    window.addEventListener("hashchange", openHashTarget);
    return () => window.removeEventListener("hashchange", openHashTarget);
  }, [guideIds]);

  React.useEffect(() => {
    const targetId = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!targetId) return;
    const targetGuideId = guideIdFromHash(window.location.hash, guideIds);
    if (!targetGuideId || !expandedGuideIds.has(targetGuideId)) return;
    const frame = requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView({ block: "start" }));
    return () => cancelAnimationFrame(frame);
  }, [expandedGuideIds, guideIds]);

  const changeType = (value: string) => {
    setType(value);
    localStorage.setItem("mundinho.filter.guideType", value);
  };

  const setGuideExpanded = (guideId: string, expanded: boolean) => {
    setExpandedGuideIds((current) => {
      const next = new Set(current);
      if (expanded) next.add(guideId);
      else next.delete(guideId);
      return next;
    });
  };

  const normalized = query.trim().toLocaleLowerCase("pt-BR");
  const guides = content.guides.filter((guide) => (type === "todos" || guide.type === type) && (!normalized || `${guide.title} ${guide.subtitle} ${guide.intro}`.toLocaleLowerCase("pt-BR").includes(normalized)));
  const ready = dataStatus === "ready";
  const expandedVisibleCount = guides.filter((guide) => expandedGuideIds.has(guide.id)).length;

  return (
    <div className="space-y-6 page-enter">
      <header className="pixel-surface panel-paper p-5 text-ink-900">
        <p className="font-label text-2xl text-wood-700">wiki central</p>
        <h1 className="mt-2 font-display text-lg leading-relaxed text-ink-900 sm:text-2xl">Mods</h1>
        <p className="mt-3 max-w-4xl leading-7 text-ink-900">Cada entrada mantém o padrão aprovado: como começar, preparo, progressão, riscos, craftings por nível de confiança, checklist e fontes.</p>
        <p className="mt-3 font-label text-xl text-wood-700">{ready ? content.guides.length : STATIC_TOTALS.guides} guia(s) no Mundinho</p>
      </header>
      <section className="border border-stone-500 bg-stone-100 p-4 text-ink-900" aria-label="Filtros dos guias">
        <div className="grid gap-3 sm:grid-cols-[1fr_14rem]">
          <Input disabled={!ready} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filtrar os guias desta página..." aria-label="Filtrar guias" />
          <Select disabled={!ready} value={type} onChange={(event) => changeType(event.target.value)} aria-label="Tipo de guia">
            <option value="todos">Todos os tipos</option>
            <option value="dimensão">Dimensões</option>
            <option value="chefe">Chefes</option>
            <option value="utilidade">Utilidade</option>
          </Select>
        </div>
        {ready && guides.length ? (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-stone-300 pt-3">
            <span className="mr-auto font-label text-lg text-wood-700">{expandedVisibleCount}/{guides.length} abertos</span>
            <Button variant="ghost" size="sm" onClick={() => setExpandedGuideIds((current) => new Set([...current, ...guides.map((guide) => guide.id)]))} disabled={expandedVisibleCount === guides.length}>Expandir todos</Button>
            <Button variant="ghost" size="sm" onClick={() => setExpandedGuideIds((current) => {
              const next = new Set(current);
              guides.forEach((guide) => next.delete(guide.id));
              return next;
            })} disabled={expandedVisibleCount === 0}>Recolher todos</Button>
          </div>
        ) : null}
      </section>
      {dataStatus === "loading" ? <DataStatePanel status="loading" loadingText={`abrindo os ${STATIC_TOTALS.guides} guias...`} /> : dataStatus === "error" ? <DataStatePanel status="error" error={dataError} retry={retry} /> : guides.length ? <><p className="font-label text-xl text-paper-100">{guides.length} guia(s) nesta seleção</p><div className="grid gap-6">{guides.map((guide) => <GuideCard key={guide.id} guide={guide} expanded={expandedGuideIds.has(guide.id)} onExpandedChange={(expanded) => setGuideExpanded(guide.id, expanded)} />)}</div><TwilightCatalogPanel /></> : <DataStatePanel status="empty" emptyText="Nenhum guia corresponde a este filtro." />}
    </div>
  );
}
