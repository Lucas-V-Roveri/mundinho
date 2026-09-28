/* eslint-disable @next/next/no-img-element -- Bestiário usa texturas raw oficiais com fallback visual simples. */
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

export function BestiaryCard({
  entry,
  row,
  disabled,
  onFlag,
}: {
  entry: BestiaryEntry;
  row: BestiaryStateRow;
  disabled: boolean;
  onFlag: (flag: BestiaryTrackFlag, value: boolean) => Promise<void>;
}) {
  const [busy, setBusy] = React.useState<BestiaryTrackFlag | null>(null);
  const seen = row.seen;

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
    <article id={`mob-${entry.id}`} className="pixel-surface panel-paper scroll-mt-28 p-4 text-ink-900 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[12rem_1fr]">
        <div>
          <a href={entry.imageSourceUrl} target="_blank" rel="noreferrer" className="block border-4 border-night-950 bg-night-800 p-2" title="Abrir origem da imagem">
            {entry.imageUrl ? (
              <img
                src={entry.imageUrl}
                alt={seen ? entry.imageAlt ?? entry.nameEn : `Silhueta de ${entry.nameEn}`}
                loading="lazy"
                decoding="async"
                className={`aspect-square w-full object-contain [image-rendering:pixelated] transition-[filter,opacity] ${seen ? "" : "brightness-0 opacity-65"}`}
                onError={(event) => { event.currentTarget.style.display = "none"; }}
              />
            ) : <div className="aspect-square w-full bg-night-950" aria-hidden="true" />}
          </a>
          <div className="mt-3 flex flex-wrap gap-2">
            <Tag tone={seen ? "success" : "neutral"}>{seen ? "visto" : "não visto"}</Tag>
            <Tag tone={dangerTone(entry.danger)}>{entry.danger}</Tag>
          </div>
          <p className="mt-3 break-all font-mono text-[11px] leading-5 text-ink-700">{entry.registryId}</p>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-label text-xl text-wood-700">{entry.mod} · {entry.version}</p>
              <h2 className="mt-1 font-display text-base leading-relaxed sm:text-xl">{entry.namePt}</h2>
              {entry.namePt !== entry.nameEn ? <p className="mt-1 text-sm text-ink-700">{entry.nameEn}</p> : null}
            </div>
            <Tag tone={entry.status.includes("2+") ? "success" : entry.status.includes("conflito") ? "danger" : "neutral"}>{entry.status}</Tag>
          </div>

          <p className="mt-4 leading-7">{entry.summary}</p>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="border border-stone-500 bg-stone-100 p-3"><dt className="font-label text-lg text-wood-700">Categoria</dt><dd className="mt-1 text-sm">{entry.category}</dd></div>
            <div className="border border-stone-500 bg-stone-100 p-3"><dt className="font-label text-lg text-wood-700">Comportamento</dt><dd className="mt-1 text-sm">{entry.behavior}</dd></div>
            {entry.health ? <div className="border border-stone-500 bg-stone-100 p-3"><dt className="font-label text-lg text-wood-700">Vida</dt><dd className="mt-1 text-sm">{entry.health}</dd></div> : null}
            {entry.attack ? <div className="border border-stone-500 bg-stone-100 p-3"><dt className="font-label text-lg text-wood-700">Ataque</dt><dd className="mt-1 text-sm">{entry.attack}</dd></div> : null}
          </dl>

          <section className="mt-5 border-l-4 border-grass-700 bg-grass-100 p-4">
            <h3 className="font-label text-xl text-grass-900">Onde encontrar</h3>
            <p className="mt-2 text-sm leading-6">{entry.howToFind}</p>
            <div className="mt-3 flex flex-wrap gap-2">{entry.dimensions.map((dimension) => <Tag key={dimension}>{dimension}</Tag>)}{entry.locations.map((location) => <Tag key={location} tone="external">{location}</Tag>)}</div>
          </section>

          {entry.interaction || entry.taming ? (
            <section className="mt-4 border-l-4 border-blue-700 bg-blue-100 p-4">
              <h3 className="font-label text-xl text-blue-900">Interação</h3>
              {entry.interaction ? <p className="mt-2 text-sm leading-6">{entry.interaction}</p> : null}
              {entry.taming ? <p className="mt-2 text-sm leading-6"><strong>Domesticação:</strong> {entry.taming}</p> : null}
            </section>
          ) : null}

          {entry.drops.length ? (
            <section className="mt-5">
              <h3 className="font-label text-xl text-wood-700">Drops documentados</h3>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {entry.drops.map((drop) => (
                  <div key={`${entry.id}-${drop.nameEn ?? drop.namePt}`} className="border border-stone-500 bg-paper-100 p-3 text-sm">
                    <strong>{drop.namePt}</strong>{drop.nameEn && drop.nameEn !== drop.namePt ? <span className="text-ink-700"> · {drop.nameEn}</span> : null}
                    <p className="mt-1 text-xs leading-5 text-ink-700">{[drop.quantity, drop.chance, drop.condition].filter(Boolean).join(" · ")}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {entry.notes?.length ? (
            <details className="mt-5 border border-stone-500 bg-stone-100 p-3">
              <summary className="cursor-pointer font-label text-xl text-wood-700">Notas de versão / configuração</summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">{entry.notes.map((note) => <li key={note}>{note}</li>)}</ul>
            </details>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2" aria-label={`Progresso de ${entry.namePt}`}>
            {entry.track.map((flag) => {
              const active = stateValue(row, flag);
              return (
                <Button key={flag} size="sm" variant={active ? "success" : "ghost"} disabled={disabled || busy !== null} onClick={() => void toggle(flag)} aria-pressed={active}>
                  {busy === flag ? "salvando..." : active ? flagLabel[flag][0] : flagLabel[flag][1]}
                </Button>
              );
            })}
          </div>

          <details className="mt-5 border-t-2 border-stone-500 pt-4">
            <summary className="cursor-pointer font-label text-xl text-wood-700">Fontes</summary>
            <ul className="mt-3 space-y-2 text-sm">
              {entry.sources.map((source) => (
                <li key={source.href}>
                  <a className="font-semibold text-blue-700 underline underline-offset-2" href={source.href} target="_blank" rel="noreferrer">{source.label}</a>
                  {source.note ? <span className="text-ink-700"> — {source.note}</span> : null}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </article>
  );
}
