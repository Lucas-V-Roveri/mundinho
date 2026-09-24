"use client";

import * as React from "react";
import { useMundinho } from "@/components/app-providers";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { CustomItemPanel } from "@/components/checklist/custom-item-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";

const phases = ["Todas", "Início", "Intermediário", "Avançado", "Pós-jogo"];
const risks = ["Todos", "Baixo", "Médio", "Alto", "Severo"];

export function ProgressionView() {
  const { content } = useMundinho();
  const [phase, setPhase] = React.useState("Todas");
  const [risk, setRisk] = React.useState("Todos");
  React.useEffect(() => { const frame = requestAnimationFrame(() => { setPhase(localStorage.getItem("mundinho.filter.phase") || "Todas"); setRisk(localStorage.getItem("mundinho.filter.risk") || "Todos"); }); return () => cancelAnimationFrame(frame); }, []);
  const setPhaseSaved = (value: string) => { setPhase(value); localStorage.setItem("mundinho.filter.phase", value); };
  const setRiskSaved = (value: string) => { setRisk(value); localStorage.setItem("mundinho.filter.risk", value); };
  const filtered = content.progression.filter((item) => (phase === "Todas" || item.phase === phase) && (risk === "Todos" || item.risk === risk));

  return <div className="space-y-6 page-enter"><header className="pixel-surface panel-paper p-5"><p className="font-label text-2xl text-wood-700">98 marcos aprovados</p><h1 className="mt-2 font-display text-lg leading-relaxed sm:text-2xl">Progressão</h1><p className="mt-3 max-w-4xl leading-7">Ordem sugerida por dificuldade e dependência real. Quando não há gate, a trilha continua paralela — sem inventar fila única.</p></header><section className="grid gap-3 border-4 border-night-950 bg-stone-100 p-4 shadow-pixel sm:grid-cols-2"><label className="font-label text-xl">Fase<Select className="mt-1" value={phase} onChange={(event) => setPhaseSaved(event.target.value)}>{phases.map((value) => <option key={value}>{value}</option>)}</Select></label><label className="font-label text-xl">Risco<Select className="mt-1" value={risk} onChange={(event) => setRiskSaved(event.target.value)}>{risks.map((value) => <option key={value}>{value}</option>)}</Select></label></section><div className="grid gap-4">{filtered.map((item) => <article key={item.id} id={item.id} className="scroll-mt-64"><Card surface={item.risk === "Severo" ? "night" : "paper"} interactive><CardHeader><div className="flex flex-wrap justify-between gap-3"><div><span className="font-label text-xl opacity-80">#{String(item.order).padStart(3, "0")} · {item.entry}</span><CardTitle className="mt-2">{item.title}</CardTitle></div><div className="flex flex-wrap gap-2 font-label text-lg"><span className="border-2 border-current px-2 py-1">{item.phase}</span><span className="border-2 border-current px-2 py-1">risco {item.risk}</span><span className="border-2 border-current px-2 py-1">{item.confidence}</span></div></div></CardHeader><CardContent className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]"><div className="space-y-3 text-sm leading-6"><Detail label="Equipamento mínimo" value={item.equipment} /><Detail label="Obrigatório" value={item.required} /><Detail label="Recomendação" value={item.soft} /><Detail label="Dependência" value={item.dependency} /><Detail label="Se despreparado" value={item.unprepared} /></div><div><ChecklistItem itemId={item.id} label={item.title} phase={`${item.phase} · ${item.entry}`} section="progression" entryKey={item.entry} /><div className="mt-3 border-4 border-night-950 bg-stone-100 p-3 text-xs leading-5 text-ink-700"><strong>Complexidade:</strong> {item.complexity}<br/><strong>Reversibilidade:</strong> {item.reversibility}<br/><strong>Âncora vanilla:</strong> {item.vanilla}</div></div></CardContent></Card></article>)}</div><CustomItemPanel section="progression" entryKey="progression" /></div>;
}
function Detail({ label, value }: { label: string; value: string }) { return <p><strong className="font-label text-xl text-wood-700">{label}:</strong> {value || "—"}</p>; }
