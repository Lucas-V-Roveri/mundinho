"use client";

import * as React from "react";
import { useMundinho } from "@/components/app-providers";
import { BestiaryCard } from "@/components/bestiary/bestiary-card";
import { DataStatePanel } from "@/components/ui/data-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tag } from "@/components/ui/tag";
import {
  BESTIARY_DETAILED_TOTAL,
  BESTIARY_ENTRIES,
  BESTIARY_INVENTORY_TOTAL,
  BESTIARY_LOT_5A_DETAILED,
  BESTIARY_LOT_5B_DETAILED,
  BESTIARY_MOD_AUDIT,
} from "@/data/bestiary-catalog";
import { useBestiaryState } from "@/lib/bestiary-state";
import type { BestiaryTrackFlag } from "@/types/bestiary";

const FILTER_KEY = "mundinho.filter.bestiary";

type Filters = { query: string; mod: string; behavior: string; dimension: string; progress: string };
const initialFilters: Filters = { query: "", mod: "todos", behavior: "todos", dimension: "todos", progress: "todos" };

export function BestiaryView() {
  const { actor, mode, dataStatus } = useMundinho();
  const bestiary = useBestiaryState({ actor, mode, parentDataStatus: dataStatus });
  const [filters, setFilters] = React.useState<Filters>(initialFilters);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(localStorage.getItem(FILTER_KEY) || "null");
        if (stored && typeof stored === "object") setFilters({ ...initialFilters, ...stored });
      } catch { /* filtro inválido: usa padrão */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((current) => {
      const next = { ...current, [key]: value };
      localStorage.setItem(FILTER_KEY, JSON.stringify(next));
      return next;
    });
  };

  const mods = React.useMemo(() => [...new Set(BESTIARY_ENTRIES.map((entry) => entry.mod))].sort(), []);
  const behaviors = React.useMemo(() => [...new Set(BESTIARY_ENTRIES.map((entry) => entry.behavior))].sort(), []);
  const dimensions = React.useMemo(() => [...new Set(BESTIARY_ENTRIES.flatMap((entry) => entry.dimensions))].sort(), []);

  const filtered = React.useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase("pt-BR");
    return BESTIARY_ENTRIES.filter((entry) => {
      const row = bestiary.rowFor(entry.id);
      const progressMatch = filters.progress === "todos"
        || (filters.progress === "unseen" && !row.seen)
        || (filters.progress === "seen" && row.seen)
        || (filters.progress === "defeated" && row.defeated)
        || (filters.progress === "tamed" && row.tamed);
      const text = `${entry.namePt} ${entry.nameEn} ${entry.mod} ${entry.registryId} ${entry.category} ${entry.behavior} ${entry.dimensions.join(" ")} ${entry.locations.join(" ")}`.toLocaleLowerCase("pt-BR");
      return (filters.mod === "todos" || entry.mod === filters.mod)
        && (filters.behavior === "todos" || entry.behavior === filters.behavior)
        && (filters.dimension === "todos" || entry.dimensions.includes(filters.dimension))
        && progressMatch
        && (!query || text.includes(query));
    });
  }, [bestiary, filters]);

  const grouped = React.useMemo(() => {
    const result = new Map<string, typeof BESTIARY_ENTRIES>();
    filtered.forEach((entry) => result.set(entry.mod, [...(result.get(entry.mod) ?? []), entry]));
    return [...result.entries()];
  }, [filtered]);

  const trackedRows = BESTIARY_ENTRIES.map((entry) => bestiary.rowFor(entry.id));
  const seenCount = trackedRows.filter((row) => row.seen).length;
  const defeatedCount = trackedRows.filter((row) => row.defeated).length;
  const tamedCount = trackedRows.filter((row) => row.tamed).length;

  const setFlag = async (mobId: string, flag: BestiaryTrackFlag, value: boolean) => {
    await bestiary.setFlag(mobId, flag, value);
  };

  return (
    <div className="space-y-6 page-enter">
      <header className="pixel-surface panel-paper p-5 text-ink-900">
        <p className="font-label text-2xl text-wood-700">wiki central · lote 5B</p>
        <h1 className="mt-2 font-display text-lg leading-relaxed text-ink-900 sm:text-2xl">Bestiário</h1>
        <p className="mt-3 max-w-4xl leading-7">Catálogo de criaturas do pack com origem rastreável, versão, comportamento, spawn, drops e descoberta separada para gr1d e benamu. O inventário-base continua com {BESTIARY_INVENTORY_TOTAL} candidatos; já há {BESTIARY_DETAILED_TOTAL} cards detalhados ({BESTIARY_LOT_5A_DETAILED} do 5A + {BESTIARY_LOT_5B_DETAILED} do 5B).</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag tone="achievement">{actor}</Tag>
          <Tag tone="success">{seenCount}/{BESTIARY_DETAILED_TOTAL} vistos</Tag>
          <Tag tone="danger">{defeatedCount} derrotados</Tag>
          <Tag tone="external">{tamedCount} domesticados</Tag>
          <Tag>{BESTIARY_INVENTORY_TOTAL} candidatos no inventário</Tag>
        </div>
      </header>

      <section className="grid gap-3 border border-stone-500 bg-stone-100 p-4 text-ink-900 lg:grid-cols-5" aria-label="Filtros do Bestiário">
        <Input value={filters.query} onChange={(event) => updateFilter("query", event.target.value)} placeholder="Nome, mod, registry..." aria-label="Filtrar Bestiário" />
        <Select value={filters.mod} onChange={(event) => updateFilter("mod", event.target.value)} aria-label="Filtrar por mod"><option value="todos">Todos os mods</option>{mods.map((mod) => <option key={mod} value={mod}>{mod}</option>)}</Select>
        <Select value={filters.behavior} onChange={(event) => updateFilter("behavior", event.target.value)} aria-label="Filtrar por comportamento"><option value="todos">Todos os comportamentos</option>{behaviors.map((behavior) => <option key={behavior} value={behavior}>{behavior}</option>)}</Select>
        <Select value={filters.dimension} onChange={(event) => updateFilter("dimension", event.target.value)} aria-label="Filtrar por dimensão"><option value="todos">Todas as dimensões</option>{dimensions.map((dimension) => <option key={dimension} value={dimension}>{dimension}</option>)}</Select>
        <Select value={filters.progress} onChange={(event) => updateFilter("progress", event.target.value)} aria-label="Filtrar por descoberta"><option value="todos">Todo progresso</option><option value="unseen">Não vistos</option><option value="seen">Vistos</option><option value="defeated">Derrotados</option><option value="tamed">Domesticados</option></Select>
      </section>

      {bestiary.status === "loading" ? <DataStatePanel status="loading" loadingText="catalogando criaturas..." /> : bestiary.status === "error" ? <DataStatePanel status="error" error={bestiary.error} retry={bestiary.retry} /> : grouped.length ? (
        <div className="space-y-8">
          {grouped.map(([mod, entries]) => (
            <section key={mod} aria-labelledby={`bestiary-group-${mod.replaceAll(" ", "-")}`} className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-2 border-b-4 border-wood-700 pb-2 text-paper-100">
                <h2 id={`bestiary-group-${mod.replaceAll(" ", "-")}`} className="font-display text-base sm:text-lg">{mod}</h2>
                <span className="font-label text-xl">{entries.length} nesta seleção</span>
              </div>
              <div className="grid gap-5">{entries.map((entry) => <BestiaryCard key={entry.id} entry={entry} row={bestiary.rowFor(entry.id)} disabled={bestiary.status !== "ready"} onFlag={(flag, value) => setFlag(entry.id, flag, value)} />)}</div>
            </section>
          ))}
        </div>
      ) : <DataStatePanel status="empty" emptyText="Nenhuma criatura corresponde a estes filtros." />}

      <section className="pixel-surface panel-paper p-5 text-ink-900" aria-labelledby="bestiary-audit-title">
        <h2 id="bestiary-audit-title" className="font-display text-base sm:text-lg">Auditoria do Bestiário · Lotes 5A–5B</h2>
        <p className="mt-3 max-w-4xl text-sm leading-6">“Calibrado” significa que o formato foi cruzado com registry/código/wiki/loot quando disponíveis. No Aether, o 5B fecha o registro de mobs vivos da versão 1.5.10; entidades técnicas e projéteis continuam deliberadamente fora do Bestiário.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {BESTIARY_MOD_AUDIT.map((item) => (
            <a key={item.mod} href={item.sourceHref} target="_blank" rel="noreferrer" className="pixel-card-interactive border-4 border-night-950 bg-paper-100 p-4 text-ink-900">
              <div className="flex flex-wrap items-center justify-between gap-2"><strong>{item.mod}</strong><Tag tone="success">{item.status}</Tag></div>
              <p className="mt-1 font-mono text-xs text-ink-700">{item.version}</p>
              <p className="mt-2 text-sm leading-6">{item.note}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
