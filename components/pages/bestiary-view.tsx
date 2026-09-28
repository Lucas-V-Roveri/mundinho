"use client";

import * as React from "react";
import { useMundinho } from "@/components/app-providers";
import { BestiaryCard } from "@/components/bestiary/bestiary-card";
import { Button } from "@/components/ui/button";
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
  BESTIARY_LOT_5C_DETAILED,
  BESTIARY_MOD_AUDIT,
} from "@/data/bestiary-catalog";
import { useBestiaryState } from "@/lib/bestiary-state";
import type { Actor } from "@/types/content";
import type { BestiaryEntry, BestiaryTrackFlag } from "@/types/bestiary";
import { bestiaryStateKey } from "@/types/bestiary";

const FILTER_KEY = "mundinho.filter.bestiary";
const REVEAL_KEY = "mundinho.bestiary.revealAll";
const PAGE_SIZE = 36;

type GroupBy = "mod" | "dimension" | "type";
type Filters = {
  query: string;
  mod: string;
  type: string;
  danger: string;
  place: string;
  progress: string;
  groupBy: GroupBy;
};

const initialFilters: Filters = {
  query: "",
  mod: "todos",
  type: "todos",
  danger: "todos",
  place: "todos",
  progress: "todos",
  groupBy: "mod",
};

function entryType(entry: BestiaryEntry) {
  const category = entry.category.toLocaleLowerCase("pt-BR");
  const behavior = entry.behavior.toLocaleLowerCase("pt-BR");
  if (category.includes("mini-chefe")) return "mini-chefe";
  if (category.includes("chefe")) return "chefe";
  if (entry.track.includes("tamed")) return "domesticável";
  if (category.includes("hostil") || category.includes("monstro") || behavior.includes("hostil") || behavior.includes("combate")) return "hostil";
  if (category.includes("neutro")) return "neutro";
  if (category.includes("passivo")) return "passivo";
  return "não classificado";
}

function groupingKey(entry: BestiaryEntry, groupBy: GroupBy) {
  if (groupBy === "dimension") return entry.dimensions[0] ?? "Dimensão não confirmada";
  if (groupBy === "type") return entryType(entry);
  return entry.mod;
}

function groupLabel(groupBy: GroupBy) {
  return groupBy === "dimension" ? "dimensão" : groupBy === "type" ? "tipo" : "mod";
}

export function BestiaryView() {
  const { actor, mode, dataStatus } = useMundinho();
  const bestiary = useBestiaryState({ actor, mode, parentDataStatus: dataStatus });
  const [filters, setFilters] = React.useState<Filters>(initialFilters);
  const [revealAll, setRevealAll] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(localStorage.getItem(FILTER_KEY) || "null");
        if (stored && typeof stored === "object") setFilters({ ...initialFilters, ...stored });
      } catch { /* filtro inválido: usa padrão */ }
      setRevealAll(localStorage.getItem(REVEAL_KEY) === "true");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((current) => {
      const next = { ...current, [key]: value };
      localStorage.setItem(FILTER_KEY, JSON.stringify(next));
      return next;
    });
  };

  const toggleRevealAll = () => {
    setRevealAll((current) => {
      const next = !current;
      localStorage.setItem(REVEAL_KEY, String(next));
      return next;
    });
  };

  const mods = React.useMemo(() => [...new Set(BESTIARY_ENTRIES.map((entry) => entry.mod))].sort(), []);
  const types = React.useMemo(() => [...new Set(BESTIARY_ENTRIES.map(entryType))].sort(), []);
  const places = React.useMemo(() => [...new Set(BESTIARY_ENTRIES.flatMap((entry) => [...entry.dimensions, ...entry.locations]))].sort(), []);

  const filtered = React.useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase("pt-BR");
    return BESTIARY_ENTRIES.filter((entry) => {
      const row = bestiary.rowFor(entry.id);
      const type = entryType(entry);
      const progressMatch = filters.progress === "todos"
        || (filters.progress === "unseen" && !row.seen)
        || (filters.progress === "seen" && row.seen)
        || (filters.progress === "defeated" && row.defeated)
        || (filters.progress === "tamed" && row.tamed);
      const placeMatch = filters.place === "todos" || entry.dimensions.includes(filters.place) || entry.locations.includes(filters.place);
      const text = `${entry.namePt} ${entry.nameEn} ${entry.mod} ${entry.registryId} ${entry.category} ${type} ${entry.behavior} ${entry.danger} ${entry.dimensions.join(" ")} ${entry.locations.join(" ")}`.toLocaleLowerCase("pt-BR");
      return (filters.mod === "todos" || entry.mod === filters.mod)
        && (filters.type === "todos" || type === filters.type)
        && (filters.danger === "todos" || entry.danger === filters.danger)
        && placeMatch
        && progressMatch
        && (!query || text.includes(query));
    });
  }, [bestiary, filters]);

  React.useEffect(() => setVisibleCount(PAGE_SIZE), [filters]);

  React.useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || visibleCount >= filtered.length) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((item) => item.isIntersecting)) setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length));
    }, { rootMargin: "500px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [filtered.length, visibleCount]);

  const visible = React.useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const grouped = React.useMemo(() => {
    const result = new Map<string, BestiaryEntry[]>();
    visible.forEach((entry) => {
      const key = groupingKey(entry, filters.groupBy);
      result.set(key, [...(result.get(key) ?? []), entry]);
    });
    return [...result.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
  }, [filters.groupBy, visible]);

  const statsFor = React.useCallback((who: Actor) => {
    const rows = BESTIARY_ENTRIES.map((entry) => bestiary.rows[bestiaryStateKey(who, entry.id)]).filter(Boolean);
    return {
      seen: rows.filter((row) => row.seen).length,
      defeated: rows.filter((row) => row.defeated).length,
      tamed: rows.filter((row) => row.tamed).length,
    };
  }, [bestiary.rows]);

  const gr1d = statsFor("gr1d");
  const benamu = statsFor("benamu");
  const world = React.useMemo(() => ({
    seen: BESTIARY_ENTRIES.filter((entry) => ["gr1d", "benamu"].some((who) => bestiary.rows[bestiaryStateKey(who as Actor, entry.id)]?.seen)).length,
    defeated: BESTIARY_ENTRIES.filter((entry) => ["gr1d", "benamu"].some((who) => bestiary.rows[bestiaryStateKey(who as Actor, entry.id)]?.defeated)).length,
    tamed: BESTIARY_ENTRIES.filter((entry) => ["gr1d", "benamu"].some((who) => bestiary.rows[bestiaryStateKey(who as Actor, entry.id)]?.tamed)).length,
  }), [bestiary.rows]);

  const setFlag = async (mobId: string, flag: BestiaryTrackFlag, value: boolean) => {
    await bestiary.setFlag(mobId, flag, value);
  };

  return (
    <div className="space-y-6 page-enter">
      <header className="pixel-surface panel-paper p-5 text-ink-900">
        <p className="font-label text-2xl text-wood-700">wiki central · lote 5C</p>
        <h1 className="mt-2 font-display text-lg leading-relaxed text-ink-900 sm:text-2xl">Bestiário</h1>
        <p className="mt-3 max-w-4xl leading-7">Catálogo de criaturas do pack com origem rastreável, versão, habitat e descoberta separada para gr1d e benamu. O inventário-base tem {BESTIARY_INVENTORY_TOTAL} candidatos; {BESTIARY_DETAILED_TOTAL} já possuem card auditado ({BESTIARY_LOT_5A_DETAILED} do 5A + {BESTIARY_LOT_5B_DETAILED} do 5B + {BESTIARY_LOT_5C_DETAILED} do 5C).</p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="border-2 border-night-950 bg-paper-50 p-3"><strong className="font-label text-xl">gr1d</strong><p className="mt-1 text-sm">{gr1d.seen} vistos · {gr1d.defeated} derrotados · {gr1d.tamed} domesticados</p></div>
          <div className="border-2 border-night-950 bg-paper-50 p-3"><strong className="font-label text-xl">benamu</strong><p className="mt-1 text-sm">{benamu.seen} vistos · {benamu.defeated} derrotados · {benamu.tamed} domesticados</p></div>
          <div className="border-2 border-night-950 bg-paper-50 p-3"><strong className="font-label text-xl">juntos</strong><p className="mt-1 text-sm">{world.seen} vistos · {world.defeated} derrotados · {world.tamed} domesticados</p></div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2"><Tag tone="achievement">marcando como {actor}</Tag><Tag>{BESTIARY_DETAILED_TOTAL}/{BESTIARY_INVENTORY_TOTAL} auditados</Tag></div>
      </header>

      <section className="border border-stone-500 bg-stone-100 p-4 text-ink-900" aria-label="Filtros do Bestiário">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <Input value={filters.query} onChange={(event) => updateFilter("query", event.target.value)} placeholder="Nome, mod, registry, bioma..." aria-label="Filtrar Bestiário" />
          <Select value={filters.mod} onChange={(event) => updateFilter("mod", event.target.value)} aria-label="Filtrar por mod"><option value="todos">Todos os mods</option>{mods.map((mod) => <option key={mod} value={mod}>{mod}</option>)}</Select>
          <Select value={filters.place} onChange={(event) => updateFilter("place", event.target.value)} aria-label="Filtrar por dimensão ou bioma"><option value="todos">Todas as dimensões / biomas</option>{places.map((place) => <option key={place} value={place}>{place}</option>)}</Select>
          <Select value={filters.type} onChange={(event) => updateFilter("type", event.target.value)} aria-label="Filtrar por tipo"><option value="todos">Todos os tipos</option>{types.map((type) => <option key={type} value={type}>{type}</option>)}</Select>
          <Select value={filters.danger} onChange={(event) => updateFilter("danger", event.target.value)} aria-label="Filtrar por perigo"><option value="todos">Todo perigo</option>{["Baixo", "Médio", "Alto", "Severo"].map((danger) => <option key={danger} value={danger}>{danger}</option>)}</Select>
          <Select value={filters.progress} onChange={(event) => updateFilter("progress", event.target.value)} aria-label="Filtrar por descoberta"><option value="todos">Todo progresso</option><option value="unseen">Não vistos</option><option value="seen">Vistos</option><option value="defeated">Derrotados</option><option value="tamed">Domesticados</option></Select>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="font-label text-lg">Agrupar:</span>
          {(["mod", "dimension", "type"] as GroupBy[]).map((value) => <Button key={value} size="sm" variant={filters.groupBy === value ? "success" : "ghost"} aria-pressed={filters.groupBy === value} onClick={() => updateFilter("groupBy", value)}>{groupLabel(value)}</Button>)}
          <Button size="sm" variant={revealAll ? "success" : "ghost"} aria-pressed={revealAll} onClick={toggleRevealAll}>{revealAll ? "ocultar não descobertos" : "mostrar tudo"}</Button>
          <span className="ml-auto font-label text-lg text-ink-700">{filtered.length} resultado(s)</span>
        </div>
      </section>

      {bestiary.status === "loading" ? <DataStatePanel status="loading" loadingText="catalogando criaturas..." /> : bestiary.status === "error" ? <DataStatePanel status="error" error={bestiary.error} retry={bestiary.retry} /> : grouped.length ? (
        <div className="space-y-8">
          {grouped.map(([group, entries]) => (
            <section key={group} aria-labelledby={`bestiary-group-${group.replaceAll(" ", "-")}`} className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-2 border-b-4 border-wood-700 pb-2 text-paper-100">
                <h2 id={`bestiary-group-${group.replaceAll(" ", "-")}`} className="font-display text-base sm:text-lg">{group}</h2>
                <span className="font-label text-xl">{entries.length} carregado(s)</span>
              </div>
              <div className="grid gap-5">{entries.map((entry) => <BestiaryCard key={entry.id} entry={entry} row={bestiary.rowFor(entry.id)} disabled={bestiary.status !== "ready"} revealAll={revealAll} onFlag={(flag, value) => setFlag(entry.id, flag, value)} />)}</div>
            </section>
          ))}
          {visibleCount < filtered.length ? <div ref={loadMoreRef} className="border border-stone-500 bg-stone-100 p-3 text-center font-label text-lg text-ink-700" aria-live="polite">carregando mais criaturas… {Math.min(visibleCount, filtered.length)}/{filtered.length}</div> : null}
        </div>
      ) : <DataStatePanel status="empty" emptyText="Nenhuma criatura corresponde a estes filtros." />}

      <section className="pixel-surface panel-paper p-5 text-ink-900" aria-labelledby="bestiary-audit-title">
        <h2 id="bestiary-audit-title" className="font-display text-base sm:text-lg">Auditoria do Bestiário · Lotes 5A–5C</h2>
        <p className="mt-3 max-w-4xl text-sm leading-6">“Calibrado” significa que a lista foi cruzada com registry/código da versão do pack e que dados mais finos só entram quando a fonte sustenta o campo. Alex’s Mobs Continued e Alex’s Caves agora usam as revisões correspondentes às builds 2.1.14 e 2.0.10.</p>
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
