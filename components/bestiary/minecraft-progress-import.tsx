"use client";

import * as React from "react";
import { useMundinho } from "@/components/app-providers";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { BESTIARY_ENTRIES } from "@/data/bestiary-catalog";
import { useBestiaryState } from "@/lib/bestiary-state";
import { bestiarySyncPlan, parseMinecraftProgressDocuments, type MinecraftProgressSummary } from "@/lib/minecraft-progress";

export function MinecraftProgressImport() {
  const { actor, mode, dataStatus } = useMundinho();
  const bestiary = useBestiaryState({ actor, mode, parentDataStatus: dataStatus });
  const [summary, setSummary] = React.useState<MinecraftProgressSummary | null>(null);
  const [fileNames, setFileNames] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const readFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setMessage(null);
    const documents: Array<{ name: string; data: unknown }> = [];
    const names: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.name.toLowerCase().endsWith(".json")) continue;
      try {
        documents.push({ name: file.name, data: JSON.parse(await file.text()) });
        names.push(file.name);
      } catch {
        setMessage(`Não consegui ler ${file.name} como JSON do Minecraft.`);
      }
    }

    setFileNames(names);
    setSummary(parseMinecraftProgressDocuments(documents, BESTIARY_ENTRIES));
  };

  const apply = async () => {
    if (!summary || bestiary.status !== "ready") return;
    const plan = bestiarySyncPlan(summary, BESTIARY_ENTRIES);
    setBusy(true);
    setMessage(null);

    try {
      let changed = 0;
      for (const item of plan) {
        const current = bestiary.rowFor(item.mobId);
        if (item.defeated && !current.defeated) {
          await bestiary.setFlag(item.mobId, "defeated", true);
          changed += 1;
        } else if (item.seen && !current.seen) {
          await bestiary.setFlag(item.mobId, "seen", true);
          changed += 1;
        }
      }
      setMessage(`${changed} card(s) atualizado(s) para ${actor}. Nenhum progresso existente foi desmarcado.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  };

  const plan = summary ? bestiarySyncPlan(summary, BESTIARY_ENTRIES) : [];
  const defeated = plan.filter((item) => item.defeated).length;
  const onlySeen = plan.filter((item) => item.seen && !item.defeated).length;

  return (
    <section className="pixel-surface panel-paper p-5 text-ink-900" aria-labelledby="minecraft-sync-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-label text-xl text-grass-800">save → site</p>
          <h2 id="minecraft-sync-title" className="mt-1 font-display text-base sm:text-lg">Sincronizar Minecraft</h2>
        </div>
        <Tag tone="achievement">aplicar como {actor}</Tag>
      </div>

      <p className="mt-3 max-w-4xl text-sm leading-6">
        Selecione o JSON de <code>stats/&lt;UUID&gt;.json</code> e, opcionalmente, o de <code>advancements/&lt;UUID&gt;.json</code> do mesmo save. Os arquivos são lidos no navegador; o site envia ao Supabase somente os estados derivados do Bestiário.
      </p>
      <p className="mt-2 max-w-4xl text-xs leading-5 text-ink-700">
        Regra conservadora: <code>minecraft:killed</code> marca “derrotado” (e portanto visto); <code>minecraft:killed_by</code> marca apenas “visto”. Domesticado não é inferido porque o stats vanilla não fornece um sinal confiável por entidade. Advancements concluídos são contabilizados, mas não marcam a Progressão sem um mapeamento explícito e versionado.
      </p>

      <label className="mt-4 block border-2 border-dashed border-stone-500 bg-paper-50 p-4 text-sm">
        <span className="font-label text-lg">Arquivos JSON do jogador</span>
        <input className="mt-2 block w-full text-sm" type="file" accept="application/json,.json" multiple onChange={(event) => void readFiles(event.target.files)} />
      </label>

      {summary ? (
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            <Tag tone="success">{defeated} derrotado(s)</Tag>
            <Tag>{onlySeen} visto(s) por morte</Tag>
            <Tag tone="external">{summary.completedAdvancements.length} advancement(s) concluído(s)</Tag>
            <Tag tone={summary.unmatchedMobIds.length ? "neutral" : "success"}>{summary.unmatchedMobIds.length} entidade(s) sem card correspondente</Tag>
          </div>
          <p className="text-xs text-ink-700">Arquivos lidos: {fileNames.join(", ") || "nenhum"}</p>
          {summary.unmatchedMobIds.length ? (
            <details className="border border-stone-500 bg-stone-100 p-3">
              <summary className="cursor-pointer font-label text-lg">IDs observados fora do Bestiário</summary>
              <p className="mt-2 break-words font-mono text-[10px] leading-5">{summary.unmatchedMobIds.join(" · ")}</p>
            </details>
          ) : null}
          <Button disabled={busy || bestiary.status !== "ready" || plan.length === 0} onClick={() => void apply()}>
            {busy ? "sincronizando..." : `Aplicar ${plan.length} encontro(s) a ${actor}`}
          </Button>
        </div>
      ) : null}

      {message ? <p className="mt-3 border border-stone-500 bg-stone-100 p-3 text-sm">{message}</p> : null}
    </section>
  );
}
