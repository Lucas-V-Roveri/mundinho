import { MINECRAFT_CATEGORY_A } from "@/data/minecraft-category-a";
import type { Actor } from "@/types/content";
import type { MinecraftEvidenceRow } from "@/types/minecraft-evidence";

export function MinecraftEvidence({ milestoneId, actor, rows }: { milestoneId: string; actor: Actor; rows: MinecraftEvidenceRow[] }) {
  const observed = rows.filter((row) => row.milestone_id === milestoneId && row.actor === actor);
  const pending = MINECRAFT_CATEGORY_A.filter((rule) => rule.milestoneId === milestoneId && !rule.enabled);
  if (!observed.length && !pending.length) return null;
  return <div className="mt-4 space-y-3 border border-stone-500 bg-stone-100 p-3 text-sm" data-testid="minecraft-evidence">
    <h4 className="font-label text-xl">Progresso do Minecraft · {actor}</h4>
    <p className="text-xs text-ink-700">Evidências parciais não concluem o marco nem seus subitens. Critérios não são somados entre jogadores.</p>
    {observed.map((row) => {
      const rule = MINECRAFT_CATEGORY_A.find((item) => item.advancementId === row.advancement_id);
      const count = Object.keys(row.criteria).length;
      return <div key={row.advancement_id} className="border-l-2 border-grass-700 pl-3">
        <p className="break-all font-mono text-xs">{row.advancement_id}</p>
        <p>{count}/{row.criteria_total ?? "Y a conferir"} critérios · {row.done ? "feito no Minecraft" : "em andamento"}</p>
        <p className="text-xs">{rule?.kind === "partial" ? "Evidência parcial registrada; checklist preservado." : rule?.kind === "criteria" ? "Critérios alternativos do root; somente os olhos comprovados alimentam #810." : "Sinal de conclusão do subitem Lost Eye; não conclui #810 inteiro."}</p>
        <p className="text-xs">Confiança: {rule?.confidence ?? "Baixa-conferir"}</p>
      </div>;
    })}
    {pending.map((rule) => <p key={rule.advancementId} className="text-xs"><code className="break-all">{rule.advancementId}</code> · Confiança: {rule.confidence}. Sincronização desativada até validar o trigger instalado.</p>)}
  </div>;
}
