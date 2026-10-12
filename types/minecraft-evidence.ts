import type { Actor } from "./content";

export type MinecraftEvidenceRow = {
  world_id: string;
  actor: Actor;
  advancement_id: string;
  milestone_id: string;
  done: boolean;
  criteria: Record<string, string>;
  criteria_total: number | null;
  rule_version: string;
  imported_at: string;
};

export type MinecraftObservation = { advancementId: string; done: boolean; criteria: Record<string, string> };
