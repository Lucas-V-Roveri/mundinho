"use client";

import * as React from "react";
import { useMundinho } from "@/components/app-providers";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { CustomItemPanel } from "@/components/checklist/custom-item-panel";
import { ContentIcon, iconKindForType } from "@/components/media/content-icon";
import { Select } from "@/components/ui/select";
import { PHASE_EQUIPMENT, PHASE_ORDER, flatPlayerKey, isPlaceholder, personalSubitemProgress, sortProgression } from "@/lib/progression-model";
import type { Actor, ProgressionItem } from "@/types/content";

const phases = ["Todas", ...PHASE_ORDER];
const risks = ["Todos", "Baixo", "Médio", "Alto", "Severo"];

export function ProgressionView() {
  const { content, states, playerStates, actor } = useMundinho();
  const [phase, setPhase] = React.useState("Todas");
  const [risk, setRisk] = React.useState("Todos");
  React.useEffect(() => { const frame = requestAnimationFrame(() => { setPhase(localStorage.getItem("mundinho.filter.phase") || "Todas"); setRisk(localStorage.getItem("mundinho.filter.risk") || "Todos"); }); return () => cancelAnimationFrame(frame); }, []);
  const setPhaseSaved = (value: string) => { setPhase(value); localStorage.setItem("mundinho.filter.phase", value); };
  const setRiskSaved = (value: string) => { setRisk(value); localStorage.setItem("mundinho.filter.risk", value); };
  const sorted = React.useMemo(() => sortProgression(content.progression), [content.progression]);
  const filtered = sorted.filter((item) => (phase === "Todas" || item.phase === phase) && (risk === "Todos" || item.risk === risk));
  const byId = React.useMemo(() => new Map(content.progression.map((item) => [item.id, item])), [content.progression]);

  return <div className="space-y-6 page-enter">
    <header className="pixel-surface panel-paper p-5"><p className="font-label text-2xl text-wood-700">{content.progression.length} marcos do mundinho</p><h1 className="mt-2 font-display text-lg leading-relaxed sm:text-2xl">Progressão</h1><p className="mt-3 max-w-4xl leading-7">Por fase, risco e dependências reais. É uma ordem de conforto, não uma corrida para zerar tudo.</p></header>
    <section className="grid gap-3 border-4 border-night-950 bg-stone-100 p-4 shadow-pixel sm:grid-cols-2"><label className="font-label text-xl">Fase<Select className="mt-1" value={phase} onChange={(event) => setPhaseSaved(event.target.value)}>{phases.map((value) => <option key={value}>{value}</option>)}</Select></label><label className="font-label text-xl">Risco<Select className="mt-1" value={risk} onChange={(event) => setRiskSaved(event.target.value)}>{risks.map((value) => <option key={value}>{value}</option>)}</Select></label></section>

    {PHASE_ORDER.map((phaseName) => {
      const phaseItems = filtered.filter((item) => item.phase === phaseName);
      if (!phaseItems.length) return null;
      const allInPhase = content.progression.filter((item) => item.phase === phaseName);
      const complete = allInPhase.filter((item) => states[item.id]?.completed).length;
      return <section key={phaseName} className="space-y-4" aria-labelledby={`phase-${phaseName}`}>
        <header className="pixel-surface panel-wood p-4"><h2 id={`phase-${phaseName}`} className="font-display text-base sm:text-xl">{phaseName} · {complete}/{allInPhase.length}</h2><p className="mt-2 text-sm leading-6">Equipamento sugerido: {PHASE_EQUIPMENT[phaseName]}</p></header>
        <div className="grid gap-4">{phaseItems.map((item) => <ProgressionCard key={item.id} item={item} byId={byId} actor={actor} />)}</div>
      </section>;
    })}
    <CustomItemPanel section="progression" entryKey="progression" />
  </div>;
}

function ProgressionCard({ item, byId, actor }: { item: ProgressionItem; byId: Map<string, ProgressionItem>; actor: Actor }) {
  const { playerStates } = useMundinho();
  const subitems = item.subitens ?? [];
  const gr1dProgress = personalSubitemProgress(playerStates, "gr1d", item);
  const benamuProgress = personalSubitemProgress(playerStates, "benamu", item);
  const status = (who: Actor) => Boolean(playerStates[flatPlayerKey(who, item.id)]?.completed);
  const dependencies = item.gate?.confirmed ? item.gate.depends_on ?? [] : [];
  const activeProgress = actor === "gr1d" ? gr1dProgress : benamuProgress;

  return <article id={item.id} className="scroll-mt-64">
    <details className={`progression-card pixel-surface ${item.risk === "Severo" ? "panel-night" : "panel-paper"}`}>
      <summary className="progression-summary cursor-pointer list-none p-4">
        <div className="grid gap-3 sm:grid-cols-[4rem_1fr_auto] sm:items-start">
          <ContentIcon src={item.imagem?.src ?? item.icone} alt={item.imagem?.alt ?? `Ícone de ${item.title}`} kind={iconKindForType(item.type)} className="size-14 border-2 border-current/30 bg-paper-50 p-1" />
          <div className="min-w-0"><span className="font-label text-lg opacity-80">#{String(item.order).padStart(3, "0")} · {item.entry}</span><h3 className="mt-1 font-display text-sm leading-6 sm:text-base">{item.title}</h3><p className="mt-1 text-xs opacity-80">{item.mods}</p>{!isPlaceholder(item.equipment) ? <p className="mt-2 truncate text-sm"><strong>Equipamento mínimo:</strong> {item.equipment}</p> : null}</div>
          <div className="flex flex-wrap gap-2 sm:max-w-64 sm:justify-end"><Badge>{item.phase}</Badge><Badge>risco {item.risk}</Badge><Badge>confiança: {item.confidence}</Badge></div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs"><PlayerPill actor="gr1d" done={status("gr1d")} progress={subitems.length ? gr1dProgress : undefined} /><PlayerPill actor="benamu" done={status("benamu")} progress={subitems.length ? benamuProgress : undefined} />{subitems.length ? <span className="border-2 border-current/30 bg-paper-100 px-2 py-1 text-ink-900">{actor}: {activeProgress.completed}/{activeProgress.total} subitens</span> : null}</div>
      </summary>
      <div className="border-t-4 border-current/25 p-4">
        {dependencies.length ? <div className="mb-4 flex flex-wrap gap-2">{dependencies.map((id) => { const dependency = byId.get(id); return <a key={id} href={`#${id}`} className="border-2 border-torch-700 bg-torch-100 px-2 py-1 font-label text-lg text-ink-900 underline">Depende de: #{dependency ? String(dependency.order).padStart(3, "0") : id} {dependency?.title ?? "marco"}</a>; })}</div> : null}
        <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-3 text-sm leading-6"><Detail label="Obrigatório" value={item.required} /><Detail label="Recomendação" value={item.soft} /><Detail label="Se despreparado" value={item.unprepared} /><Detail label="Complexidade" value={item.complexity} /><Detail label="Reversibilidade" value={item.reversibility} /><Detail label="Âncora vanilla" value={item.vanilla} /></div>
          <div className="space-y-3">
            {subitems.length ? <><ChecklistItem itemId={item.id} label="Marcar como feito" toastLabel={item.title} phase={`Conclui automaticamente quando ${actor} terminar ${subitems.length}/${subitems.length} subitens.`} section="progression" entryKey={item.entry} disabled /><div className="space-y-2 border-4 border-night-950 bg-stone-100 p-3 text-ink-900"><div className="flex justify-between gap-3"><strong className="font-label text-xl">Subitens de {actor}</strong><span className="font-label text-xl">{activeProgress.completed}/{activeProgress.total}</span></div>{subitems.map((subitem) => <div key={subitem.id} className="space-y-1"><ChecklistItem itemId={subitem.id} label={subitem.title} toastLabel={`${item.title}: ${subitem.title}`} phase={[subitem.phase, subitem.equipment].filter(Boolean).join(" · ")} section="progression" entryKey={item.entry} /><div className="flex flex-wrap gap-1 pl-10 text-xs">{subitem.phase ? <span className="border border-stone-500 px-1">fase {subitem.phase}</span> : null}{subitem.equipment ? <span className="border border-stone-500 px-1">{subitem.equipment}</span> : null}</div></div>)}</div></> : <ChecklistItem itemId={item.id} label="Marcar como feito" toastLabel={item.title} phase={item.phase} section="progression" entryKey={item.entry} />}
          </div>
        </div>
      </div>
    </details>
  </article>;
}

function Detail({ label, value }: { label: string; value?: string }) { if (isPlaceholder(value)) return null; return <p><strong className="font-label text-xl text-wood-700">{label}:</strong> {value}</p>; }
function Badge({ children }: { children: React.ReactNode }) { return <span className="border-2 border-current px-2 py-1 font-label text-lg">{children}</span>; }
function PlayerPill({ actor, done, progress }: { actor: Actor; done: boolean; progress?: { completed: number; total: number } }) { return <span className={`border-2 border-current px-2 py-1 font-label text-lg ${done ? "bg-grass-100 text-grass-900" : "bg-stone-100 text-ink-700"}`}>{actor} {done ? "✓" : "○"}{progress ? ` ${progress.completed}/${progress.total}` : ""}</span>; }
