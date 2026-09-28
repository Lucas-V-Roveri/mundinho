import type { Actor } from "@/types/content";

export type BestiarySourceStatus =
  | "confirmado (2+ fontes)"
  | "confirmado (1 fonte)"
  | "conflito entre fontes"
  | "não documentado";

export type BestiaryTrackFlag = "seen" | "defeated" | "tamed";

export type BestiarySource = {
  label: string;
  href: string;
  note?: string;
};

export type BestiaryDrop = {
  namePt: string;
  nameEn?: string;
  quantity?: string;
  chance?: string;
  condition?: string;
};

export type BestiaryEntry = {
  id: string;
  namePt: string;
  nameEn: string;
  mod: string;
  version: string;
  registryId: string;
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
