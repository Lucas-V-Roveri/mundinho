/* eslint-disable @next/next/no-img-element -- Bestiário usa imagens/texturas oficiais rastreadas por fonte. */
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import type { BestiaryEntry, BestiaryStateRow, BestiaryTrackFlag } from "@/types/bestiary";

const flagLabel: Record<BestiaryTrackFlag, [string, string]> = {
  seen: ["Visto", "Não visto"],
  defeated: ["Derrotado", "Não derrotado"],
  tamed: ["Domesticado", "Não domesticado"],
};

function dangerTone(danger: BestiaryEntry["danger"]) {
  if (danger === "Severo" || danger === "Alto") return "danger" as const;
  if (danger === "Médio") return "focus" as const;
  return "success" as const;
}

function stateValue(row: BestiaryStateRow, flag: BestiaryTrackFlag) {
  return flag === "seen" ? row.seen : flag === "defeated" ? row.defeated : row.tamed;
}

export function BestiaryCompactCard({
  entry,
  row,
  disabled,
  revealAll = false,
  onFlag,
}: {
  entry: BestiaryEntry;
  row: BestiaryStateRow;
  disabled: boolean;
  revealAll?: boolean;
  onFlag: (flag: BestiaryTrackFlag, value: boolean) => Promise<void>;
}) {
  const [busy, setBusy] = React.useState<BestiaryTrackFlag | null>(null);
  const [imageFailed, setImageFailed] = React.useState(false);
  const seen = row.seen;
  const revealed = seen || revealAll;
  const hasImage = Boolean(entry.imageUrl) && !imageFailed;

  const toggle = async (flag: BestiaryTrackFlag) => {
    setBusy(flag);
    try {
      await onFlag(flag, !stateValue(row, flag));
    } catch {
      // O estado compartilhado exibe o erro na página; o botão só precisa voltar a responder.
    } finally {
      setBusy(null);
    }
  };

  return (
    <article id={`mob-${entry.id}`} className="pixel-surface panel-paper scroll-mt-28 p-4 text-ink-900">
      <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
        <div>
          <div className="border-4 border-night-950 bg-night-800 p-2">
            {hasImage ? (
              <img
                src={entry.imageUrl}
                alt={revealed ? entry.imageAlt ?? entry.nameEn : "Silhueta de criatura não descoberta"}
                loading="lazy"
                decoding="async"
                className={`aspect-square w-full object-contain [image-rendering:pixelated] ${revealed ? "" : "brightness-0 opacity-65"}`}
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="grid aspect-square w-full place-items-center border border-dashed border-stone-500 bg-night-950 font-display text-3xl text-paper-100/70" aria-label="Silhueta sem imagem cadastrada">
                ?
              </div>
            )}
          </div>
          {revealed && hasImage && entry.imageSourceUrl ? <a href={entry.imageSourceUrl} target="_blank" rel="noreferrer" className="mt-2 block text-center font-label text-base text-blue-700 underline">Fonte da imagem</a> : null}
          {revealed && entry.audit && !entry.imageUrl ? <p className="mt-2 text-xs leading-5 text-ink-700">{entry.audit.rows[0].Imagem}</p> : null}
          {revealed && entry.audit?.rows[0]["Fonte da imagem"].startsWith("Exemplo") ? <p className="mt-2 text-xs leading-5 text-ink-700">Exemplo masculino; aparência e tipo real dependem da entidade restaurada.</p> : null}
          <div className="mt-2 flex flex-wrap gap-1">
            <Tag tone={seen ? "success" : "neutral"}>{seen ? "visto" : "não visto"}</Tag>
            {revealed ? <Tag tone={dangerTone(entry.danger)}>{entry.danger}</Tag> : null}
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-label text-lg text-wood-700">{entry.mod}{revealed ? ` · ${entry.version}` : ""}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h2 className="font-display text-base leading-relaxed sm:text-lg">{revealed ? entry.namePt : "???"}</h2>
            {revealed ? <code className="max-w-full break-all border border-stone-500 bg-stone-100 px-2 py-1 font-mono text-[10px] leading-none text-ink-700">{entry.registryId}</code> : null}
          </div>

          {!revealed ? (
            <>
              <p className="mt-3 text-sm leading-6 text-ink-700">Ainda não visto por {row.actor}. O restante aparece quando vocês encontrarem a criatura ou ativarem “mostrar tudo”.</p>
              <div className="mt-4">
                <Button size="sm" variant={seen ? "success" : "ghost"} disabled={disabled || busy !== null} onClick={() => void toggle("seen")} aria-pressed={seen}>
                  {busy === "seen" ? "salvando..." : seen ? "Visto" : "Marcar como visto"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm leading-6">{entry.summary}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                <Tag>{entry.category}</Tag>
                <Tag tone="neutral">{entry.behavior}</Tag>
                <Tag tone={entry.status.includes("2+") ? "success" : entry.status.includes("conflito") ? "danger" : "neutral"}>{entry.status}</Tag>
              </div>

              <section className="mt-4 border-l-4 border-grass-700 bg-grass-100 p-3">
                <h3 className="font-label text-lg text-grass-900">Onde encontrar</h3>
                <p className="mt-1 text-sm leading-6">{entry.howToFind}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {entry.dimensions.map((dimension) => <Tag key={dimension}>{dimension}</Tag>)}
                  {entry.locations.map((location) => <Tag key={location} tone="external">{location}</Tag>)}
                </div>
              </section>

              <section className="mt-4">
                <h3 className="font-label text-lg text-wood-700">Drops</h3>
                {entry.drops.length ? (
                  <ul className="mt-2 space-y-2 text-sm">
                    {entry.drops.map((drop, dropIndex) => (
                      <li key={`${entry.id}-${dropIndex}-${drop.nameEn ?? drop.namePt}`} className="border border-stone-500 bg-paper-100 p-2">
                        {drop.mechanism ? <p className="mb-1 font-semibold text-blue-800">{drop.mechanism}</p> : null}
                        <strong>{drop.namePt}</strong>{drop.nameEn && drop.nameEn !== drop.namePt ? <span className="text-ink-700"> · {drop.nameEn}</span> : null}
                        <p className="mt-1 text-xs leading-5 text-ink-700">{[drop.quantity, drop.chance, drop.condition].filter(Boolean).join(" · ") || "quantidade/condição não documentada"}</p>
                        <p className="mt-1 leading-5"><strong>Para que serve:</strong> {drop.use || "Uso não documentado — conferir no JEI como último recurso."}</p>
                        {drop.confidenceDetail ? <p className="mt-2 text-xs leading-5"><strong>Confiança:</strong> {drop.confidenceDetail}</p> : null}
                        {drop.sourceDetail ? <details className="mt-2 text-xs leading-5"><summary className="cursor-pointer">Fontes da recompensa</summary><p className="mt-2 break-words">{drop.sourceDetail}</p></details> : null}
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {drop.useConfidence ? <Tag tone={drop.useConfidence === "Alta" ? "success" : drop.useConfidence === "Baixa-conferir" ? "danger" : "neutral"}>uso: {drop.useConfidence}</Tag> : null}
                          {drop.guideHref ? <a href={drop.guideHref} className="font-label text-base text-blue-700 underline underline-offset-2">ver crafting / receitas</a> : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm leading-6 text-ink-700">Nenhum drop foi publicado sem validação direta para este card.</p>
                )}
              </section>

              {entry.audit?.recipeGuideHref ? <a href={entry.audit.recipeGuideHref} className="mt-4 inline-block font-label text-lg text-blue-700 underline">Ver todas as receitas auditadas do mod</a> : null}

              {(entry.progressionHref || entry.guideHref) ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.progressionHref ? <a className="pixel-control border-2 border-night-950 bg-paper-50 px-3 py-2 font-label text-base text-blue-800" href={entry.progressionHref}>Abrir na Progressão</a> : null}
                  {entry.guideHref ? <a className="pixel-control border-2 border-night-950 bg-paper-50 px-3 py-2 font-label text-base text-blue-800" href={entry.guideHref}>Abrir em Mods</a> : null}
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2" aria-label={`Progresso de ${entry.namePt}`}>
                {entry.track.map((flag) => {
                  const active = stateValue(row, flag);
                  return (
                    <Button key={flag} size="sm" variant={active ? "success" : "ghost"} disabled={disabled || busy !== null} onClick={() => void toggle(flag)} aria-pressed={active}>
                      {busy === flag ? "salvando..." : active ? flagLabel[flag][0] : flagLabel[flag][1]}
                    </Button>
                  );
                })}
              </div>

              {entry.audit && entry.notes?.length ? <details className="mt-4 border-t-2 border-stone-500 pt-3"><summary className="cursor-pointer font-label text-lg text-wood-700">Notas de versão / limites</summary><ul className="mt-2 list-disc space-y-2 pl-5 text-xs leading-5">{entry.notes.map((note) => <li key={note}>{note}</li>)}</ul></details> : null}

              <details className="mt-4 border-t-2 border-stone-500 pt-3">
                <summary className="cursor-pointer font-label text-lg text-wood-700">Fontes</summary>
                <ul className="mt-2 space-y-2 text-xs leading-5">
                  {entry.sources.map((source) => (
                    <li key={`${source.href}-${source.label}`}>
                      <a className="font-semibold text-blue-700 underline underline-offset-2" href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
                      {source.note ? <span className="text-ink-700"> — {source.note}</span> : null}
                    </li>
                  ))}
                </ul>
              </details>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
