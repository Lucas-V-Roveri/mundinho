"use client";

import * as React from "react";
import { useMundinho } from "@/components/app-providers";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { CustomItemPanel } from "@/components/checklist/custom-item-panel";
import { ContentIcon } from "@/components/media/content-icon";
import { WorldXpBar } from "@/components/progression/world-xp-bar";
import { DataStatePanel } from "@/components/ui/data-state";
import { Select } from "@/components/ui/select";
import { Tag } from "@/components/ui/tag";
import { resolveProgressionIcon } from "@/lib/minecraft-icons";
import { PHASE_EQUIPMENT, PHASE_ORDER, flatPlayerKey, isPlaceholder, personalSubitemProgress, sortProgression } from "@/lib/progression-model";
import { STATIC_TOTALS } from "@/lib/static-totals";
import { worldXpStats } from "@/lib/world-xp";
import type { Actor, ItemState, PlayerItemState, ProgressionItem } from "@/types/content";

const phases = ["Todas", ...PHASE_ORDER];
const risks = ["Todos", "Baixo", "Médio", "Alto", "Severo"];
const SHOW_COMPLETED_KEY = "mundinho.progression.showCompleted";
const actors: Actor[] = ["gr1d", "benamu"];

type Completion = { completed: boolean; completedAt: string | null };

export function ProgressionView() {
  const { content, states, playerStates, customItems, actor, dataStatus, dataError, retry } = useMundinho();
  const [phase, setPhase] = React.useState("Todas");
  const [risk, setRisk] = React.useState("Todos");
  const [showCompleted, setShowCompleted] = React.useState(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setPhase(localStorage.getItem("mundinho.filter.phase") || "Todas");
      setRisk(localStorage.getItem("mundinho.filter.risk") || "Todos");
      setShowCompleted(localStorage.getItem(SHOW_COMPLETED_KEY) === "true");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const setPhaseSaved = (value: string) => { setPhase(value); localStorage.setItem("mundinho.filter.phase", value); };
  const setRiskSaved = (value: string) => { setRisk(value); localStorage.setItem("mundinho.filter.risk", value); };
  const toggleCompleted = () => {
    setShowCompleted((current) => {
      const next = !current;
      localStorage.setItem(SHOW_COMPLETED_KEY, String(next));
      return next;
    });
  };

  const sorted = React.useMemo(() => sortProgression(content.progression), [content.progression]);
  const completions = React.useMemo(
    () => new Map(sorted.map((item) => [item.id, completionForItem(item, states, playerStates)])),
    [sorted, states, playerStates],
  );
  const filtered = sorted.filter((item) => (phase === "Todas" || item.phase === phase) && (risk === "Todos" || item.risk === risk));
  const hiddenCompleted = filtered.filter((item) => completions.get(item.id)?.completed).length;
  const visible = showCompleted ? filtered : filtered.filter((item) => !completions.get(item.id)?.completed);
  const byId = React.useMemo(() => new Map(content.progression.map((item) => [item.id, item])), [content.progression]);
  const xp = React.useMemo(() => worldXpStats(content, states, customItems), [content, states, customItems]);
  const ready = dataStatus === "ready";

  return <div className="space-y-6 page-enter">
    <header className="pixel-surface panel-paper p-5 text-ink-900">
      <p className="font-label text-2xl text-wood-700">{STATIC_TOTALS.progression} marcos do mundinho</p>
      <h1 className="mt-2 font-display text-lg leading-relaxed text-ink-900 sm:text-2xl">Progressão</h1>
      <p className="mt-3 max-w-4xl leading-7 text-ink-900">Por fase, risco e dependências reais. É uma ordem de conforto, não uma corrida para zerar tudo.</p>
    </header>

    <WorldXpBar stats={xp} status={dataStatus} />

    <section className="grid gap-3 border border-stone-500 bg-stone-100 p-4 text-ink-900 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
      <label className="font-label text-xl">Fase<Select disabled={!ready} className="mt-1" value={phase} onChange={(event) => setPhaseSaved(event.target.value)}>{phases.map((value) => <option key={value}>{value}</option>)}</Select></label>
      <label className="font-label text-xl">Risco<Select disabled={!ready} className="mt-1" value={risk} onChange={(event) => setRiskSaved(event.target.value)}>{risks.map((value) => <option key={value}>{value}</option>)}</Select></label>
      <button
        type="button"
        disabled={!ready}
        aria-pressed={showCompleted}
        onClick={toggleCompleted}
        className="pixel-control min-h-11 border-2 border-night-950 bg-paper-50 px-3 py-2 font-label text-lg text-ink-900 disabled:opacity-50"
        data-testid="show-completed-toggle"
      >
        mostrar concluídos ({hiddenCompleted})
      </button>
    </section>

    {dataStatus === "loading" ? <DataStatePanel status="loading" loadingText="organizando os 101 marcos..." /> : dataStatus === "error" ? <DataStatePanel status="error" error={dataError} retry={retry} /> : content.progression.length === 0 ? <DataStatePanel status="empty" emptyText="A progressão carregou, mas não trouxe nenhum marco." /> : <>
      {PHASE_ORDER.map((phaseName) => {
        const filteredInPhase = filtered.filter((item) => item.phase === phaseName);
        if (!filteredInPhase.length) return null;
        const phaseItems = visible.filter((item) => item.phase === phaseName);
        const allInPhase = content.progression.filter((item) => item.phase === phaseName);
        const complete = allInPhase.filter((item) => completions.get(item.id)?.completed).length;
        return <section key={phaseName} className="space-y-4" aria-labelledby={`phase-${phaseName}`}>
          <header className="pixel-surface header-texture-wood p-4 text-paper-50">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={`phase-${phaseName}`} className="font-display text-base sm:text-xl">{phaseName} · {complete}/{allInPhase.length}</h2>
              <span className="font-label text-xl">exibindo {phaseItems.length} de {allInPhase.length}</span>
            </div>
            <p className="mt-2 text-sm leading-6">Equipamento sugerido: {PHASE_EQUIPMENT[phaseName]}</p>
          </header>
          {phaseItems.length ? (
            <div className="progression-timeline grid gap-4">{phaseItems.map((item) => {
              const completion = completions.get(item.id) ?? { completed: false, completedAt: null };
              return <ProgressionCard key={item.id} item={item} byId={byId} actor={actor} completed={completion.completed} completedAt={completion.completedAt} compactCompleted={showCompleted && completion.completed} />;
            })}</div>
          ) : (
            <p className="border border-stone-500 bg-stone-100 p-4 font-label text-xl text-ink-700">Todos os marcos desta fase que passam pelos filtros estão concluídos e ocultos.</p>
          )}
        </section>;
      })}
      <CustomItemPanel section="progression" entryKey="progression" />
    </>}
  </div>;
}

function completionForItem(
  item: ProgressionItem,
  states: Record<string, ItemState>,
  playerStates: Record<string, PlayerItemState>,
): Completion {
  const world = states[item.id];
  if (world?.completed) return { completed: true, completedAt: world.completed_at };

  const subitems = item.subitens ?? [];
  for (const who of actors) {
    const direct = playerStates[flatPlayerKey(who, item.id)];
    if (direct?.completed) return { completed: true, completedAt: direct.completed_at };
    if (subitems.length && subitems.every((subitem) => playerStates[flatPlayerKey(who, subitem.id)]?.completed)) {
      const dates = subitems
        .map((subitem) => playerStates[flatPlayerKey(who, subitem.id)]?.completed_at)
        .filter((value): value is string => Boolean(value))
        .sort();
      return { completed: true, completedAt: dates.at(-1) ?? null };
    }
  }
  return { completed: false, completedAt: null };
}

function ProgressionCard({
  item,
  byId,
  actor,
  completed,
  completedAt,
  compactCompleted,
}: {
  item: ProgressionItem;
  byId: Map<string, ProgressionItem>;
  actor: Actor;
  completed: boolean;
  completedAt: string | null;
  compactCompleted: boolean;
}) {
  const { playerStates } = useMundinho();
  const subitems = item.subitens ?? [];
  const gr1dProgress = personalSubitemProgress(playerStates, "gr1d", item);
  const benamuProgress = personalSubitemProgress(playerStates, "benamu", item);
  const status = (who: Actor) => Boolean(playerStates[flatPlayerKey(who, item.id)]?.completed);
  const dependencies = item.gate?.confirmed ? item.gate.depends_on ?? [] : [];
  const activeProgress = actor === "gr1d" ? gr1dProgress : benamuProgress;
  const danger = item.risk === "Severo" || item.risk === "Alto";
  const icon = resolveProgressionIcon(item);

  return <article id={item.id} className="progression-timeline-item relative scroll-mt-40 pl-12 sm:pl-16">
    <span className="progression-timeline-node inventory-slot absolute left-0 top-4 z-10 grid size-10 place-items-center border-2 border-night-950 bg-stone-700 sm:size-12" aria-hidden="true">
      <ContentIcon src={icon} alt="" kind="item" className="minecraft-item-sprite size-7 sm:size-8" />
    </span>
    <details className="progression-card pixel-surface pixel-card-interactive panel-paper overflow-hidden" data-completed={completed ? "true" : "false"}>
      <summary className="progression-summary cursor-pointer list-none p-4 text-ink-900">
        {compactCompleted ? (
          <div className="grid gap-3 sm:grid-cols-[3.5rem_1fr_auto] sm:items-center">
            <span className="inventory-slot grid size-12 place-items-center border-2 border-night-950 bg-stone-700 font-display text-2xl text-grass-100" aria-label="Concluído">✓</span>
            <div className="min-w-0">
              <span className="font-label text-lg text-ink-700">#{String(item.order).padStart(3, "0")} · {item.entry}</span>
              <h3 className="mt-1 text-base font-bold leading-snug line-through decoration-2 sm:text-lg">{item.title}</h3>
              <p className="mt-1 font-label text-lg text-grass-900">concluído em {formatCompletionDate(completedAt)}</p>
            </div>
            <Tag tone="success">concluído</Tag>
          </div>
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-[4rem_1fr_auto] sm:items-start">
              <span className="inventory-slot grid size-14 place-items-center border-2 border-night-950 bg-stone-700">
                <ContentIcon src={icon} alt={`Item-símbolo de ${item.title}`} kind="item" className="minecraft-item-sprite size-10" />
              </span>
              <div className="min-w-0"><span className="font-label text-lg text-ink-700">#{String(item.order).padStart(3, "0")} · {item.entry}</span><h3 className="mt-1 font-sans text-base font-bold leading-snug sm:text-lg">{item.title}</h3><p className="mt-1 text-xs text-ink-700">{item.mods}</p>{!isPlaceholder(item.equipment) ? <p className="mt-2 line-clamp-2 text-sm"><strong>Equipamento mínimo:</strong> {item.equipment}</p> : null}</div>
              <div className="flex flex-wrap gap-2 sm:max-w-64 sm:justify-end"><Tag tone="focus">{item.phase}</Tag><Tag tone={danger ? "danger" : "neutral"}>risco {item.risk}</Tag><Tag tone={String(item.confidence).startsWith("Alta") ? "success" : "neutral"}>confiança: {item.confidence}</Tag></div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs"><PlayerPill actor="gr1d" done={status("gr1d")} progress={subitems.length ? gr1dProgress : undefined} /><PlayerPill actor="benamu" done={status("benamu")} progress={subitems.length ? benamuProgress : undefined} />{subitems.length ? <Tag>{actor}: {activeProgress.completed}/{activeProgress.total} subitens</Tag> : null}</div>
          </>
        )}
      </summary>
      <div className="border-t border-stone-300 p-4 text-ink-900">
        {dependencies.length ? <div className="mb-4 flex flex-wrap gap-2">{dependencies.map((id) => { const dependency = byId.get(id); return <a key={id} href={`#${id}`} className="semantic-link font-label text-lg">Depende de: #{dependency ? String(dependency.order).padStart(3, "0") : id} {dependency?.title ?? "marco"}</a>; })}</div> : null}
        <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <dl className="grid gap-2 text-sm leading-6"><Detail label="Obrigatório" value={item.required} /><Detail label="Recomendação" value={item.soft} /><Detail label="Se despreparado" value={item.unprepared} tone="danger" /><Detail label="Complexidade" value={item.complexity} /><Detail label="Reversibilidade" value={item.reversibility} /><Detail label="Âncora vanilla" value={item.vanilla} /></dl>
          <div className="space-y-3">
            {subitems.length ? <><ChecklistItem itemId={item.id} label="Marcar como feito" toastLabel={item.title} phase={`Conclui automaticamente quando ${actor} terminar ${subitems.length}/${subitems.length} subitens.`} section="progression" entryKey={item.entry} disabled /><div className="space-y-2 border border-stone-500 bg-stone-100 p-3 text-ink-900"><div className="flex justify-between gap-3"><strong className="font-label text-xl">Subitens de {actor}</strong><span className="font-label text-xl">{activeProgress.completed}/{activeProgress.total}</span></div>{subitems.map((subitem) => <div key={subitem.id} className="space-y-1"><ChecklistItem itemId={subitem.id} label={subitem.title} toastLabel={`${item.title}: ${subitem.title}`} phase={[subitem.phase, subitem.equipment].filter(Boolean).join(" · ")} section="progression" entryKey={item.entry} /><div className="flex flex-wrap gap-1 pl-10 text-xs">{subitem.phase ? <Tag tone="focus">fase {subitem.phase}</Tag> : null}{subitem.equipment ? <Tag>{subitem.equipment}</Tag> : null}</div></div>)}</div></> : <ChecklistItem itemId={item.id} label="Marcar como feito" toastLabel={item.title} phase={item.phase} section="progression" entryKey={item.entry} />}
          </div>
        </div>
      </div>
    </details>
  </article>;
}

function formatCompletionDate(value: string | null) {
  if (!value) return "data registrada no mundo";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(value));
}

function Detail({ label, value, tone = "neutral" }: { label: string; value?: string; tone?: "neutral" | "danger" }) {
  if (isPlaceholder(value)) return null;
  return <div className={`grid gap-1 border-l-2 pl-3 sm:grid-cols-[9rem_1fr] ${tone === "danger" ? "border-redstone-500" : "border-stone-300"}`}><dt className={`font-label text-xl ${tone === "danger" ? "text-redstone-700" : "text-wood-700"}`}>{label}</dt><dd>{value}</dd></div>;
}
function PlayerPill({ actor, done, progress }: { actor: Actor; done: boolean; progress?: { completed: number; total: number } }) { return <Tag tone={done ? "success" : "neutral"}>{actor} {done ? "✓" : "○"}{progress ? ` ${progress.completed}/${progress.total}` : ""}</Tag>; }
