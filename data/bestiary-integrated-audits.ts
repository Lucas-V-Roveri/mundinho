import integrated from "@/data/bestiary-integrated-audits.json";
import type { BestiaryAuditRecipe, BestiaryAuditRow, BestiaryEntry } from "@/types/bestiary";

/** Enrich existing cards; persisted IDs, registry IDs and tracking flags remain stable. */
export function integrateBestiaryAudits(entries: BestiaryEntry[]): BestiaryEntry[] {
  const audits: Record<string, { rows: BestiaryAuditRow[]; recipes: BestiaryAuditRecipe[]; imageSourceUrl: string }> = integrated;
  return entries.map((entry) => {
    const audit = audits[entry.id];
    if (!audit) return entry;
    const first = audit.rows[0];
    return {
      ...entry,
      audit: { rows: audit.rows, recipes: audit.recipes },
      imageUrl: first.Imagem,
      imageAlt: `${entry.nameEn} · render do modelo e texturas da versão auditada`,
      imageSourceUrl: audit.imageSourceUrl,
      howToFind: first["Onde encontrar"],
      summary: `${entry.nameEn} · ${first["Categoria/comportamento"]}. As recompensas abaixo distinguem morte, interação e outras mecânicas da versão auditada.`,
      notes: entry.notes?.filter((note) => !note.includes("drops e interações ficam") && !note.includes("Loot e atributos numéricos não são duplicados")),
      drops: audit.rows.map((row) => ({
        namePt: row["Drop/Recompensa"],
        quantity: row.Quantidade,
        condition: row["Chance/condição"],
        mechanism: row.Mecanismo,
        use: row["Para que serve"],
        useConfidence: row.Confiança.startsWith("Alta") ? "Alta" : row.Confiança.startsWith("Média") ? "Média" : "Baixa-conferir",
        confidenceDetail: row.Confiança,
        sourceDetail: row["Fontes pesquisadas"],
        guideHref: row.Crafting.match(/^https?:\/\/\S+/)?.[0],
      })),
    };
  });
}
