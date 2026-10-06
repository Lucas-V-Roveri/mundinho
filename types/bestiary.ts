import type { Actor } from "@/types/content";

export type BestiarySourceStatus =
  | "confirmado (2+ fontes)"
  | "confirmado (1 fonte)"
  | "conflito entre fontes"
  | "não documentado";

export type BestiaryTrackFlag = "seen" | "defeated" | "tamed";
export type BestiaryUseConfidence = "Alta" | "Média" | "Baixa-conferir";
export type BestiaryEntryDepth = "compact" | "full";

export type BestiarySource = {
  label: string;
  href: string;
  note?: string;
};

export type BestiaryDrop = {
  namePt: string;
  nameEn?: string;
  mechanism?: string;
  confidenceDetail?: string;
  sourceDetail?: string;
  quantity?: string;
  chance?: string;
  condition?: string;
  /** Obrigatório na camada publicada; dados legados são enriquecidos no catálogo. */
  use?: string;
  useConfidence?: BestiaryUseConfidence;
  /** Âncora direta para receitas já documentadas na aba Mods. */
  guideHref?: string;
};

export type BestiaryAuditRow = {
  "Mob": string;
  "Mod": string;
  "Categoria/comportamento": string;
  "Onde encontrar": string;
  "Mecanismo": string;
  "Drop/Recompensa": string;
  "Quantidade": string;
  "Chance/condição": string;
  "Para que serve": string;
  "Confiança": string;
  "Imagem": string;
  "Fonte da imagem": string;
  "Fontes pesquisadas": string;
  "Crafting": string;
};

export type BestiaryAuditRecipe = {
  id: string; pattern: string[]; key: Record<string, string>; ingredients: string[]; result: string; count: number; source: string;
};

export type BestiaryEntry = {
  audit?: { rows: BestiaryAuditRow[]; recipes: BestiaryAuditRecipe[] };
  id: string;
  namePt: string;
  nameEn: string;
  mod: string;
  version: string;
  registryId: string;
  /** Ausente mantém o renderer legado completo; novos lotes devem classificar explicitamente. */
  depth?: BestiaryEntryDepth;
  category: string;
  behavior: string;
  danger: "Baixo" | "Médio" | "Alto" | "Severo";
  summary: string;
  dimensions: string[];
  locations: string[];
  howToFind: string;
  health?: string;
  attack?: string;
  interaction?: string;
  taming?: string;
  drops: BestiaryDrop[];
  notes?: string[];
  track: BestiaryTrackFlag[];
  status: BestiarySourceStatus;
  imageUrl?: string;
  imageAlt?: string;
  imageSourceUrl?: string;
  guideHref?: string;
  progressionHref?: string;
  sources: BestiarySource[];
};

export type BestiaryStateRow = {
  world_id: string;
  mob_id: string;
  actor: Actor;
  seen: boolean;
  seen_at: string | null;
  defeated: boolean;
  defeated_at: string | null;
  tamed: boolean;
  tamed_at: string | null;
  updated_by: Actor;
  updated_at: string;
  deleted: boolean;
  deleted_by: Actor | null;
  deleted_at: string | null;
};

export type BestiaryModAudit = {
  mod: string;
  version: string;
  status: "calibrado" | "inventariado" | "pendente";
  sourceHref: string;
  note: string;
};

export function bestiaryStateKey(actor: Actor, mobId: string) {
  return `${actor}::${mobId}`;
}
