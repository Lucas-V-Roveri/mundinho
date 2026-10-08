import { integratedAudits as integrated } from "@/data/bestiary-audit-registry";
import type { BestiaryAuditRecipe, BestiaryAuditRow, BestiaryEntry } from "@/types/bestiary";

/** Enrich existing cards; persisted IDs, registry IDs and tracking flags remain stable. */
export function integrateBestiaryAudits(entries: BestiaryEntry[]): BestiaryEntry[] {
  const audits: Record<string, { rows: BestiaryAuditRow[]; recipes: BestiaryAuditRecipe[]; imageSourceUrl: string; recipeGuideHref?: string }> = integrated;
  return entries.map((entry) => {
    const audit = audits[entry.id];
    if (!audit) return entry;
    const first = audit.rows[0];
    return {
      ...entry,
      audit: { rows: audit.rows, recipes: audit.recipes, recipeGuideHref: audit.recipeGuideHref },
      imageUrl: first.Imagem.startsWith("/images/") ? first.Imagem : undefined,
      imageAlt: first["Fonte da imagem"].startsWith("Exemplo") ? first["Fonte da imagem"] : `${entry.nameEn} · render do modelo e texturas da versão auditada`,
      imageSourceUrl: first.Imagem.startsWith("/images/") ? audit.imageSourceUrl : undefined,
      howToFind: first["Onde encontrar"],
      summary: `${entry.nameEn} · ${first["Categoria/comportamento"]}. As recompensas abaixo distinguem morte, interação e outras mecânicas da versão auditada.`,
      notes: [
        ...(entry.id === "mca-villager-revive-tombstone" ? ["Este card representa uma mecânica, não uma espécie ou EntityType autônomo. A ressurreição usa o tipo e dados salvos no túmulo; a Scythe não força todo resultado a ser zombie villager.", "Os registryIds legados foram preservados como exemplos de zombie villagers MCA, sem afirmar que são os únicos resultados possíveis.", "Imagem: exemplo masculino de zombie villager MCA com genes declarados; a aparência do NPC concreto e de outras entidades restauradas não foi fornecida."] : entry.notes ?? []).filter((note) => !note.includes("drops e interações ficam") && !note.includes("Loot e atributos numéricos não são duplicados")),
        ...(!first.Imagem.startsWith("/images/") ? [`Imagem: ${first.Imagem}. Fonte/limite: ${first["Fonte da imagem"]}`] : []),
      ],
      status: audit.rows.every((row) => row.Confiança.includes("Exceção")) ? "não documentado" : entry.status,
      drops: audit.rows.map((row) => ({
        namePt: row["Drop/Recompensa"],
        quantity: row.Quantidade,
        condition: row["Chance/condição"],
        mechanism: row.Mecanismo,
        use: row["Para que serve"],
        useConfidence: row.Confiança.startsWith("Alta") ? "Alta" : row.Confiança.startsWith("Média") ? "Média" : "Baixa-conferir",
        confidenceDetail: row.Confiança,
        sourceDetail: row["Fontes pesquisadas"],
        guideHref: row.Crafting.match(/(?:https?:\/\/|\/bestiary\/receitas\/)\S+/)?.[0]?.replace(/[);]+$/, ""),
      })),
    };
  });
}
