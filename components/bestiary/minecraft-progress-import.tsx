"use client";

import * as React from "react";
import { useMundinho } from "@/components/app-providers";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { BESTIARY_ENTRIES } from "@/data/bestiary-catalog";
import { useBestiaryState } from "@/lib/bestiary-state";
import { MINECRAFT_STORY_CANARY } from "@/data/minecraft-story-canary";
import { MINECRAFT_CATEGORY_A } from "@/data/minecraft-category-a";
import { useMinecraftEvidence } from "@/lib/minecraft-evidence-state";
import { bestiarySyncPlan, categoryASyncPlan, parseMinecraftProgressDocuments, validateMinecraftImportActor, type MinecraftProgressSummary } from "@/lib/minecraft-progress";
import type { Actor } from "@/types/content";

export function MinecraftProgressImport({ scope = "both", onSynced }: { scope?: "both" | "progression"; onSynced?: () => Promise<void> }) {
  const { actor, mode, dataStatus, content, refresh } = useMundinho();
  const bestiary = useBestiaryState({ actor, mode, parentDataStatus: scope === "both" ? dataStatus : "loading" });
  const evidence = useMinecraftEvidence({ mode, parentDataStatus: dataStatus });
  const [preview, setPreview] = React.useState<{ actor: Actor; summary: MinecraftProgressSummary } | null>(null);
  const summary = preview?.actor === actor ? preview.summary : null;
  const [fileNames, setFileNames] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const readFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setPreview(null);
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
        return;
      }
    }

    setFileNames(names);
    try {
      validateMinecraftImportActor(names, actor);
      setPreview({ actor, summary: parseMinecraftProgressDocuments(documents, BESTIARY_ENTRIES) });
    } catch (error) { setMessage(error instanceof Error ? error.message : String(error)); }
  };

  const apply = async () => {
    if (!summary || dataStatus !== "ready") return;
    const plan = scope === "both" ? bestiarySyncPlan(summary, BESTIARY_ENTRIES) : [];
    const signals = categoryASyncPlan(summary, [...MINECRAFT_CATEGORY_A, ...MINECRAFT_STORY_CANARY], content.progression).filter((item) => item.enabled);
    if ((plan.length && bestiary.status !== "ready") || (signals.length && (!evidence.ready || mode !== "supabase"))) return;
    setBusy(true);
    setMessage(null);

    try {
      let changed = 0;
      const result = signals.length ? await evidence.apply(actor, signals.map(({ advancementId, done, criteria }) => ({ advancementId, done, criteria }))) : { evidence_changed: 0, completions_changed: 0 };
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
      await refresh();
      await onSynced?.();
      setMessage(`${result.evidence_changed} evidência(s) gravada(s), ${result.completions_changed} marcação(ões) nova(s) na Progressão${scope === "both" ? ` e ${changed} card(s) do Bestiário atualizado(s)` : ""} para ${actor}. Evidências parciais não concluem marcos. Nenhum progresso existente foi desmarcado.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  };

  const plan = summary && scope === "both" ? bestiarySyncPlan(summary, BESTIARY_ENTRIES) : [];
  const signals = summary ? categoryASyncPlan(summary, [...MINECRAFT_CATEGORY_A, ...MINECRAFT_STORY_CANARY], content.progression) : [];
  const activeSignals = signals.filter((item) => item.enabled);
  const completions = new Set(activeSignals.flatMap((item) => item.completions)).size;
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
        {scope === "progression" ? <>Selecione o JSON de <code>advancements/&lt;UUID&gt;.json</code> de um jogador.</> : <>Selecione os JSONs de <code>stats/&lt;UUID&gt;.json</code> e/ou <code>advancements/&lt;UUID&gt;.json</code> de um único jogador.</>} Os arquivos são lidos no navegador; somente estados e evidências dos sinais aprovados são enviados ao Supabase. Confira quem está selecionado antes de aplicar.
      </p>
      <p className="mt-2 max-w-4xl text-xs leading-5 text-ink-700">
        {scope === "both" ? <>Kills marcam “derrotado”; mortes pelo mob marcam apenas “visto”. </> : null}Na Progressão, evidências parciais são registradas dentro do marco e não concluem seu checklist. Os sinais do End Remastered alimentam apenas os olhos comprovados. Cinco sinais a conferir permanecem desativados; os dez marcos iniciais de story são concluídos somente com done=true. Receitas e os demais marcos novos ficam fora deste canário.
      </p>

      <label className="mt-4 block border-2 border-dashed border-stone-500 bg-paper-50 p-4 text-sm">
        <span className="font-label text-lg">Arquivos JSON do jogador</span>
        <input className="mt-2 block w-full text-sm" type="file" accept="application/json,.json" multiple onChange={(event) => void readFiles(event.target.files)} />
      </label>

      {summary ? (
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {scope === "both" ? <><Tag tone="success">{defeated} derrotado(s)</Tag><Tag>{onlySeen} visto(s) por morte</Tag></> : null}
            <Tag tone="external">{summary.completedAdvancements.length} advancement(s) concluído(s)</Tag>
            <Tag>{activeSignals.length} sinal(is) gravável(is)</Tag><Tag>{completions} objetivo(s) comprovado(s)</Tag>
            {scope === "both" ? <Tag tone={summary.unmatchedMobIds.length ? "neutral" : "success"}>{summary.unmatchedMobIds.length} entidade(s) sem card correspondente</Tag> : null}
          </div>
          <p className="text-xs text-ink-700">Arquivos lidos: {fileNames.join(", ") || "nenhum"}</p>
          {scope === "both" && summary.unmatchedMobIds.length ? (
            <details className="border border-stone-500 bg-stone-100 p-3">
              <summary className="cursor-pointer font-label text-lg">IDs observados fora do Bestiário</summary>
              <p className="mt-2 break-words font-mono text-[10px] leading-5">{summary.unmatchedMobIds.join(" · ")}</p>
            </details>
          ) : null}
          {signals.length ? <details className="border border-stone-500 bg-stone-100 p-3"><summary className="cursor-pointer font-label text-lg">Conferir {signals.length} sinais encontrados antes de aplicar</summary><ul className="mt-3 space-y-3 text-sm">{signals.map((signal) => <li key={signal.advancementId}><a className="semantic-link" href={`/progressao#${signal.milestoneId}`}>#{signal.milestoneId.split(":")[1]}</a> · <code className="break-all">{signal.advancementId}</code><p>{signal.enabled ? `${Object.keys(signal.criteria).length}/${signal.total ?? "Y a conferir"} critérios · ${signal.completions.length ? (signal.kind === "milestone" ? "marco comprovado" : "subitem comprovado") : "evidência parcial, sem conclusão"}` : "Desativado até validar o trigger instalado"}</p><p className="text-xs">Confiança: {signal.confidence}</p><p className="text-xs">{signal.rule}</p></li>)}</ul></details> : null}
          <Button disabled={busy || dataStatus !== "ready" || (plan.length > 0 && bestiary.status !== "ready") || (activeSignals.length > 0 && (!evidence.ready || mode !== "supabase")) || (plan.length === 0 && activeSignals.length === 0)} onClick={() => void apply()}>
            {busy ? "sincronizando..." : `Aplicar somente a ${actor}`}
          </Button>
        </div>
      ) : null}

      {message ? <p className="mt-3 border border-stone-500 bg-stone-100 p-3 text-sm">{message}</p> : null}
      {preview && preview.actor !== actor ? <p className="mt-3 text-sm">O jogador selecionado mudou. Selecione novamente os arquivos desse jogador antes de aplicar.</p> : null}
      {evidence.error ? <p role="alert" className="mt-3 text-sm">Não consegui carregar as evidências: {evidence.error} <Button size="sm" onClick={evidence.retry}>tentar novamente</Button></p> : null}
    </section>
  );
}
