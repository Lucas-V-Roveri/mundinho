import type { Actor, GuideSection, PlayerItemState } from "../types/content.ts";
import type { MinecraftEvidenceRow } from "../types/minecraft-evidence.ts";

export type TechniqueDefinition = NonNullable<GuideSection["minecraft"]>;

/** Read-only projection. Site completion and upload evidence remain separate. */
export function techniqueProgress(definition: TechniqueDefinition, actor: Actor, rows: MinecraftEvidenceRow[], states: Record<string, PlayerItemState>) {
  const evidence = rows.find((row) => row.actor === actor && row.milestone_id === definition.milestoneId && row.advancement_id === definition.advancementId);
  const criteria = new Set(Object.keys(evidence?.criteria ?? {}));
  const registered = definition.criteria.filter((criterion) => criteria.has(criterion));
  return {
    evidence,
    registered,
    missing: definition.criteria.filter((criterion) => !criteria.has(criterion)),
    total: definition.criteria.length,
    siteDone: states[`${actor}:${definition.milestoneId}`]?.completed === true,
    requirementGroups: definition.requirements.map((alternatives) => ({ alternatives, met: alternatives.some((criterion) => criteria.has(criterion)) })),
  };
}
