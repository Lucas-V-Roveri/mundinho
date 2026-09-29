"use client";

import * as React from "react";
import { useMundinho } from "@/components/app-providers";
import { BestiaryCard } from "@/components/bestiary/bestiary-card";
import { ContentIcon } from "@/components/media/content-icon";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
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
  BESTIARY_LOT_5D_DETAILED,
  BESTIARY_LOT_5E_TWILIGHT_DETAILED,
  BESTIARY_MOD_AUDIT,
} from "@/data/bestiary-catalog";
import { useBestiaryState } from "@/lib/bestiary-state";
import { cn } from "@/lib/cn";
import { findGuideForText, guideThemeClasses } from "@/lib/guide-theme";
import { resolveGuideIcon } from "@/lib/minecraft-icons";
import type { BestiaryEntry, BestiaryStateRow, BestiaryTrackFlag } from "@/types/bestiary";
import { bestiaryStateKey } from "@/types/bestiary";
import type { Actor, Guide } from "@/types/content";

const FILTER_KEY = "mundinho.filter.bestiary";
const REVEAL_KEY = "mundinho.bestiary.revealAll";
const FILTER_PAGE_SIZE = 48;

type Filters = { query: string; mod: string; type: string; place: string; danger: string; progress: string };
const initialFilters: Filters = { query: "", mod: "todos", type: "todos", place: "todos", danger: "todos", progress: "todos" };

function entryType(entry: BestiaryEntry) {
  const category = entry.category.toLocaleLowerCase("pt-BR");
  const behavior = entry.behavior.toLocaleLowerCase("pt-BR");
  if (category.includes("mini-chefe")) return "Mini-chefe";
  if (category.includes("chefe")) return "Chefe";
  if (entry.track.includes("tamed") || category.includes("domestic")) return "Domesticável";
  if (behavior.includes("hostil") || category.includes("monstro") || category.includes("hostil")) return "Hostil";
  if (behavior.includes("neutro") || category.includes("neutr")) return "Neutro";
  if (behavior.includes("passivo") || category.includes("fauna") || category.includes("criatura")) return "Passivo";
  return "Outro";
}

function guideForMod(guides: Guide[], mod: string) {
  const preferredId: Record<string, string> = {
    "L_Ender's Cataclysm": "cataclysm-restante",
    "Alex's Mobs Continued": "alexs-mobs",
    "The Aether": "aether",
    "Creeper Overhaul": "mob-variants",
    "Alex's Caves": "alexs-caves",
  };
  const id = preferredId[mod];
  return (id ? guides.find((guide) => guide.id === id) : undefined) ?? findGuideForText(guides, mod);
}

function hasActiveFilters(filters: Filters) {
  return filters.query.trim() !== ""
    || filters.mod !== "todos"
    || filters.type !== "todos"
    || filters.place !== "todos"
    || filters.danger !== "todos"
    || filters.progress !== "todos";
}

function BestiaryModSection({
  mod,
  entries,
  index,
  rows,
  guide,
  disabled,
  revealAll,
  onFlag,
}: {
  mod: string;
  entries: BestiaryEntry[];
  index: number;
  rows: BestiaryStateRow[];
  guide?: Guide;
  disabled: boolean;
  revealAll: boolean;
  onFlag: (entry: BestiaryEntry, flag: BestiaryTrackFlag, value: boolean) => Promise<void>;
}) {
  const [open, setOpen] = React.useState(index === 0);
  const theme = guide ? guideThemeClasses(guide.theme) : undefined;
  const seen = rows.filter((row) => row.seen).length;
  const defeatEligible = entries.filter((entry) => entry.track.includes("defeated"));
  const tameEligible = entries.filter((entry) => entry.track.includes("tamed"));
  const defeated = defeatEligible.filter((entry) => rows[entries.indexOf(entry)]?.defeated).length;
  const tamed = tameEligible.filter((entry) => rows[entries.indexOf(entry)]?.tamed).length;
  const version = entries[0]?.version ?? "versão não cadastrada";

  return (
    <AccordionItem
      open={open}
      onOpenChange={setOpen}
      headingLevel={2}
      className={cn("scroll-mt-28", theme?.frame)}
      title={(
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          {guide ? (
            <span className="inventory-slot grid size-11 shrink-0 place-items-center border-2 border-night-950 bg-stone-700" aria-hidden="true">
              <ContentIcon src={resolveGuideIcon(guide)} alt="" kind="item" className="minecraft-item-sprite size-8" />
            </span>
          ) : null}
          <span className="min-w-[12rem] flex-1">
            <strong className="block truncate font-label text-2xl">{mod}</strong>
            <span className="mt-1 block font-mono text-[10px] leading-4 text-paper-100/80">{version}</span>
          </span>
          <span className="flex flex-wrap gap-2 font-sans text-xs normal-case tracking-normal">
            <span className="border border-paper-100/40 bg-night-950/35 px-2 py-1">visto {seen}/{entries.length}</span>
            {defeatEligible.length ? <span className="border border-paper-100/40 bg-night-950/35 px-2 py-1">derrotados {defeated}/{defeatEligible.length}</span> : null}
            {tameEligible.length ? <span className="border border-paper-100/40 bg-night-950/35 px-2 py-1">domesticados {tamed}/{tameEligible.length}</span> : null}
          </span>
        </span>
      )}
    >
      {open ? (
        <div className="grid gap-5">
          {entries.map((entry, entryIndex) => (
            <BestiaryCard
              key={entry.id}
              entry={entry}
              row={rows[entryIndex]}
              disabled={disabled}
              revealAll={revealAll}
              onFlag={(flag, value) => onFlag(entry, flag, value)}
            />
          ))}
        </div>
      ) : null}
    </AccordionItem>
  );
}

export function BestiaryView() {
  const { actor, mode, dataStatus, content } = useMundinho();
  const bestiary = useBestiaryState({ actor, mode, parentDataStatus: dataStatus });
  const [filters, setFilters] = React.useState<Filters>(initialFilters);
  const [revealAll, setRevealAll] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(FILTER_PAGE_SIZE);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const stored = JSON.parse(localStorage.getItem(FILTER_KEY) || "null");
        if (stored && typeof stored === "object") setFilters({ ...initialFilters, ...stored });
      } catch {
        // filtro inválido: usa padrão
      }
      setRevealAll(localStorage.getItem(REVEAL_KEY) === "true");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const updateFilter = (key: keyof Filters, value: string) => {
    setVisibleCount(FILTER_PAGE_SIZE);
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
      const progressMatch = filters.progress === "todos"
        || (filters.progress === "unseen" && !row.seen)
        || (filters.progress === "seen" && row.seen)
        || (filters.progress === "defeated" && row.defeated)
        || (filters.progress === "tamed" && row.tamed);
      const placeMatch = filters.place === "todos" || entry.dimensions.includes(filters.place) || entry.locations.includes(filters.place);
      const text = `${entry.namePt} ${entry.nameEn} ${entry.mod} ${entry.registryId} ${entry.category} ${entry.behavior} ${entry.danger} ${entry.dimensions.join(" ")} ${entry.locations.join(" ")}`.toLocaleLowerCase("pt-BR");
      return (filters.mod === "todos" || entry.mod === filters.mod)
        && (filters.type === "todos" || entryType(entry) === filters.type)
        && placeMatch
        && (filters.danger === "todos" || entry.danger === filters.danger)
        && progressMatch
        && (!query || text.includes(query));
    });
  }, [bestiary, filters]);

  const filtering = hasActiveFilters(filters);
  const grouped = React.useMemo(() => {
    const result = new Map<string, BestiaryEntry[]>();
    BESTIARY_ENTRIES.forEach((entry) => result.set(entry.mod, [...(result.get(entry.mod) ?? []), entry]));
    return [...result.entries()].sort(([a], [b]) => a.localeCompare(b, "pt-BR"));
  }, []);

  const visibleFiltered = filtering ? filtered.slice(0, visibleCount) : [];

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
    seen: BESTIARY_ENTRIES.filter((entry) => (["gr1d", "benamu"] as Actor[]).some((who) => bestiary.rows[bestiaryStateKey(who, entry.id)]?.seen)).length,
    defeated: BESTIARY_ENTRIES.filter((entry) => (["gr1d", "benamu"] as Actor[]).some((who) => bestiary.rows[bestiaryStateKey(who, entry.id)]?.defeated)).length,
    tamed: BESTIARY_ENTRIES.filter((entry) => (["gr1d", "benamu"] as Actor[]).some((who) => bestiary.rows[bestiaryStateKey(who, entry.id)]?.tamed)).length,
  }), [bestiary.rows]);

  const setFlag = async (entry: BestiaryEntry, flag: BestiaryTrackFlag, value: boolean) => {
    await bestiary.setFlag(entry.id, flag, value);
  };

  return (
    <div className="space-y-6 page-enter">
      <header className="pixel-surface panel-paper p-5 text-ink-900">
        <p className="font-label text-2xl text-wood-700">wiki central · lote 5E</p>
        <h1 className="mt-2 font-display text-lg leading-relaxed text-ink-900 sm:text-2xl">Bestiário</h1>
        <p className="mt-3 max-w-4xl leading-7">
          Catálogo de criaturas do pack com origem rastreável, versão, habitat, drops documentados e descoberta separada para gr1d e benamu. O inventário aprovado tem {BESTIARY_INVENTORY_TOTAL} candidatos; {BESTIARY_DETAILED_TOTAL} já possuem card auditado ({BESTIARY_LOT_5A_DETAILED} do 5A + {BESTIARY_LOT_5B_DETAILED} do 5B + {BESTIARY_LOT_5C_DETAILED} do 5C + {BESTIARY_LOT_5D_DETAILED} do 5D + {BESTIARY_LOT_5E_TWILIGHT_DETAILED} do Twilight/5E).
        </p>
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
          <Button size="sm" variant={revealAll ? "success" : "ghost"} aria-pressed={revealAll} onClick={toggleRevealAll}>{revealAll ? "ocultar não descobertos" : "mostrar tudo"}</Button>
          <span className="ml-auto font-label text-lg text-ink-700">{filtering ? `${filtered.length} resultado(s)` : `${grouped.length} mod(s)`}</span>
        </div>
      </section>

      {bestiary.status === "loading" ? <DataStatePanel status="loading" loadingText="catalogando criaturas..." /> : bestiary.status === "error" ? <DataStatePanel status="error" error={bestiary.error} retry={bestiary.retry} /> : filtering ? (
        filtered.length ? (
          <section className="space-y-4" aria-label="Resultados filtrados do Bestiário">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b-4 border-wood-700 pb-2 text-paper-100">
              <h2 className="font-display text-base sm:text-lg">Resultados</h2>
              <span className="font-label text-xl">{filtered.length} criatura(s)</span>
            </div>
            <p className="text-sm text-paper-100/80">Com filtros ativos, os cards ficam soltos e cada um mantém o nome do mod no próprio cabeçalho.</p>
            <div className="grid gap-5">
              {visibleFiltered.map((entry) => <BestiaryCard key={entry.id} entry={entry} row={bestiary.rowFor(entry.id)} disabled={bestiary.status !== "ready"} revealAll={revealAll} onFlag={(flag, value) => setFlag(entry, flag, value)} />)}
            </div>
            {visibleCount < filtered.length ? <Button variant="ghost" onClick={() => setVisibleCount((count) => count + FILTER_PAGE_SIZE)}>mostrar mais resultados ({Math.min(visibleCount, filtered.length)}/{filtered.length})</Button> : null}
          </section>
        ) : <DataStatePanel status="empty" emptyText="Nenhuma criatura corresponde a estes filtros." />
      ) : (
        <Accordion className="space-y-4">
          {grouped.map(([mod, entries], index) => (
            <BestiaryModSection
              key={mod}
              mod={mod}
              entries={entries}
              index={index}
              rows={entries.map((entry) => bestiary.rowFor(entry.id))}
              guide={guideForMod(content.guides, mod)}
              disabled={bestiary.status !== "ready"}
              revealAll={revealAll}
              onFlag={setFlag}
            />
          ))}
        </Accordion>
      )}

      <section className="pixel-surface panel-paper p-5 text-ink-900" aria-labelledby="bestiary-audit-title">
        <h2 id="bestiary-audit-title" className="font-display text-base sm:text-lg">Auditoria do Bestiário · Lotes 5A–5E</h2>
        <p className="mt-3 max-w-4xl text-sm leading-6">“Calibrado” significa que a lista foi cruzada com registry/código da versão do pack e que dados finos só entram quando a fonte sustenta o campo. Drops não auditados ficam explicitamente não confirmados; quando um drop é listado, a camada publicada exige também “Para que serve”.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {BESTIARY_MOD_AUDIT.map((item) => (
            <a key={item.mod} href={item.sourceHref} target="_blank" rel="noreferrer" className="pixel-card-interactive border-4 border-night-950 bg-paper-100 p-4 text-ink-900">
              <div className="flex flex-wrap items-start justify-between gap-2"><strong>{item.mod}</strong><Tag tone={item.status === "calibrado" ? "success" : "neutral"}>{item.status}</Tag></div>
              <p className="mt-1 font-mono text-[10px] text-ink-700">{item.version}</p>
              <p className="mt-2 text-sm leading-6">{item.note}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
