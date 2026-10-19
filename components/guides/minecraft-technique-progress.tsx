"use client";

import * as React from "react";
import { useMundinho } from "@/components/app-providers";
import { techniqueProgress, type TechniqueDefinition } from "@/lib/minecraft-techniques";
import type { Actor } from "@/types/content";
import type { MinecraftEvidenceRow } from "@/types/minecraft-evidence";

const ACTORS: Actor[] = ["gr1d", "benamu"];
export type TechniqueEvidence = { rows: MinecraftEvidenceRow[]; ready: boolean; error: string | null };

function date(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(value));
}

export function MinecraftTechniqueProgress({ definition, evidence }: { definition: TechniqueDefinition; evidence: TechniqueEvidence }) {
  const { playerStates, mode } = useMundinho();
  const [showAll, setShowAll] = React.useState(false);
  if (evidence.error) return <p role="alert">Não foi possível consultar as evidências: {evidence.error}. As marcações permanecem preservadas.</p>;
  if (!evidence.ready) return <p role="status">Consultando o progresso individual…</p>;
  if (mode !== "supabase") return <p>Prévia local: conecte o Supabase para consultar os uploads reais. As técnicas abaixo continuam disponíveis.</p>;

  const progress = Object.fromEntries(ACTORS.map((actor) => [actor, techniqueProgress(definition, actor, evidence.rows, playerStates)])) as Record<Actor, ReturnType<typeof techniqueProgress>>;
  const isWolf = definition.catalog === "wolves";
  const rows = definition.rows?.filter((row) => showAll || definition.catalog === "archaeology" || row.criteria.some((criterion) => ACTORS.some((actor) => !progress[actor].registered.includes(criterion))));
  const cell = (actor: Actor, criteria: string[]) => {
    const current = progress[actor];
    if (!current.evidence) return "Sem evidência no upload";
    const missing = criteria.filter((criterion) => !current.registered.includes(criterion));
    if (!missing.length) return "Já registrado";
    return criteria.length === 1 ? (isWolf ? "Não documentado no upload" : "Não registrado no upload") : missing.join(", ");
  };

  return <div className="mt-4 min-w-0 space-y-3 border border-stone-500 bg-stone-100 p-3 text-sm" data-testid={`technique-${definition.milestoneId.split(":")[1]}`}>
    <h4 className="font-label text-xl">Progresso individual · último upload</h4>
    <p className="text-xs">Os critérios pertencem a cada jogador. Ausência no upload não prova que algo nunca foi feito desde então. Esta consulta não altera marcações.</p>
    <div className="grid gap-3 sm:grid-cols-2">
      {ACTORS.map((actor) => {
        const current = progress[actor];
        return <div key={actor} className="border border-stone-400 bg-paper-50 p-3" data-actor={actor}>
          <strong>{actor}</strong>
          <p>{current.siteDone ? "Marcado como feito na Progressão" : "Sem conclusão marcada na Progressão"}</p>
          {current.evidence ? <><p>{current.registered.length}/{current.total} critérios · {current.evidence.done ? "feito no Minecraft" : "em andamento no upload"}</p><p className="text-xs">Importado em {date(current.evidence.imported_at)}</p>{["foods", "biomes", "hostiles"].includes(definition.catalog ?? "") ? <p>{current.missing.length} ainda não registrados no upload</p> : null}</> : <p>Sem evidência deste advancement no upload.</p>}
          {definition.catalog === "archaeology" && current.evidence ? <p>{current.requirementGroups.filter((group) => group.met).length}/2 grupos cumpridos: fragmento E uma das seis escavações. Não exige 7/7.</p> : null}
          {isWolf && current.siteDone ? <p className="mt-2">Conciliação opcional: a lista do upload não reabre sua conclusão.</p> : null}
        </div>;
      })}
    </div>
    {rows ? <>
      <p>{isWolf ? "Variantes ainda não documentadas: consulta opcional, sem novas tarefas obrigatórias." : "Tabela de apoio: técnica e pendências por jogador."}</p>
      {definition.catalog !== "archaeology" ? <button type="button" className="semantic-link underline underline-offset-2" aria-pressed={showAll} onClick={() => setShowAll((value) => !value)}>{showAll ? "Mostrar apenas o não registrado" : "Incluir critérios já registrados"}</button> : null}
      <div className="max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label={`Tabela de apoio ${definition.milestoneId}`}>
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <thead><tr>{["Alvo / circuito", "gr1d", "benamu", "Onde / como fazer no pack"].map((heading) => <th key={heading} scope="col" className="border border-stone-400 bg-stone-200 p-2">{heading}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row.label}><th scope="row" className="max-w-56 break-words border border-stone-400 p-2 font-normal">{row.label}{row.criteria.length > 1 ? <p className="mt-1 text-xs">{row.criteria.join(", ")}</p> : null}</th>{ACTORS.map((actor) => <td key={actor} className="max-w-64 break-words border border-stone-400 p-2">{cell(actor, row.criteria)}</td>)}<td className="border border-stone-400 p-2">{row.technique}{row.links?.map((link) => <a key={link.href} href={link.href} className="semantic-link mt-1 block underline underline-offset-2">{link.label}</a>)}</td></tr>)}</tbody>
        </table>
      </div>
      {!rows.length ? <p>Nenhuma pendência documentada nesta tabela. Você pode incluir os critérios já registrados para consultar as técnicas.</p> : null}
    </> : null}
  </div>;
}
