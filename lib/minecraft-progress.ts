import type { BestiaryEntry } from "@/types/bestiary";

type JsonObject = Record<string, unknown>;

type MinecraftStatsFile = {
  stats?: Record<string, Record<string, number>>;
};

export type MinecraftAdvancement = {
  done?: boolean;
  criteria?: Record<string, string>;
};

type MinecraftAdvancementsFile = Record<string, MinecraftAdvancement>;

export type MinecraftProgressSummary = {
  killed: Record<string, number>;
  killedBy: Record<string, number>;
  completedAdvancements: string[];
  advancements: Record<string, MinecraftAdvancement>;
  recognizedMobIds: string[];
  unmatchedMobIds: string[];
};

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function numberMap(value: unknown) {
  if (!isObject(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(([, amount]) => typeof amount === "number" && Number.isFinite(amount) && amount > 0),
  ) as Record<string, number>;
}

export function parseMinecraftProgressDocuments(
  documents: Array<{ name: string; data: unknown }>,
  entries: Pick<BestiaryEntry, "id" | "registryId">[],
): MinecraftProgressSummary {
  const killed: Record<string, number> = {};
  const killedBy: Record<string, number> = {};
  const completedAdvancements = new Set<string>();
  const advancements: Record<string, MinecraftAdvancement> = {};

  for (const document of documents) {
    if (!isObject(document.data)) continue;

    const possibleStats = document.data as MinecraftStatsFile;
    if (isObject(possibleStats.stats)) {
      const nextKilled = numberMap(possibleStats.stats?.["minecraft:killed"]);
      const nextKilledBy = numberMap(possibleStats.stats?.["minecraft:killed_by"]);
      for (const [id, amount] of Object.entries(nextKilled)) killed[id] = Math.max(killed[id] ?? 0, amount);
      for (const [id, amount] of Object.entries(nextKilledBy)) killedBy[id] = Math.max(killedBy[id] ?? 0, amount);
      continue;
    }

    const possibleAdvancements = document.data as MinecraftAdvancementsFile;
    for (const [id, value] of Object.entries(possibleAdvancements)) {
      if (!id.includes(":") || id.includes("recipes/") || id.endsWith("recipes") || /(^|\/)recipe($|\/)/.test(id.split(":")[1]) || !isObject(value)) continue;
      const criteria = isObject(value.criteria)
        ? Object.fromEntries(Object.entries(value.criteria).filter(([, stamp]) => typeof stamp === "string" && stamp.length <= 64)) as Record<string, string>
        : {};
      if (Object.keys(criteria).length > 0 && Object.keys(criteria).every((key) => key === "has_recipe" || key === "has_the_recipe")) continue;
      advancements[id] = mergeMinecraftAdvancement(advancements[id], { done: value.done === true, criteria });
      if (value.done === true) completedAdvancements.add(id);
    }
  }

  const registryToCard = new Map(entries.map((entry) => [entry.registryId, entry.id]));
  const observedIds = new Set([...Object.keys(killed), ...Object.keys(killedBy)]);
  const recognizedMobIds = [...observedIds].filter((id) => registryToCard.has(id)).sort();
  const unmatchedMobIds = [...observedIds].filter((id) => !registryToCard.has(id)).sort();

  return {
    killed,
    killedBy,
    completedAdvancements: [...completedAdvancements].sort(),
    advancements,
    recognizedMobIds,
    unmatchedMobIds,
  };
}

export function mergeMinecraftAdvancement(previous: MinecraftAdvancement | undefined, next: MinecraftAdvancement): MinecraftAdvancement {
  return { done: previous?.done === true || next.done === true, criteria: { ...next.criteria, ...previous?.criteria } };
}

export type MinecraftSignalRule = {
  advancementId: string; milestoneId: string; enabled: boolean; confidence: string;
  kind: string; total: number | null; rule: string; reason: string; source: string;
};

export const ENDREM_CRITERION_TARGETS: Readonly<Record<string, string>> = Object.fromEntries(
  ["old", "nether", "cold", "rogue", "black", "magical", "lost", "corrupted", "wither", "guardian", "witch", "cursed"]
    .map((eye) => [`${eye}_eye`, `progression:810:${eye}-eye`]),
);

export function categoryASyncPlan(
  summary: MinecraftProgressSummary,
  rules: readonly MinecraftSignalRule[],
  milestones: readonly { id: string; subitens?: readonly { id: string }[] }[],
) {
  return rules.flatMap((rule) => {
    const observed = summary.advancements[rule.advancementId];
    const milestone = milestones.find((item) => item.id === rule.milestoneId);
    if (!observed || !milestone) return [];
    const criteria = observed.criteria ?? {};
    const allowedTargets = new Set(milestone.subitens?.map((item) => item.id) ?? []);
    let completions: string[] = [];
    if (rule.enabled && rule.kind === "completion" && observed.done === true) completions = ["progression:810:lost-eye"];
    if (rule.enabled && rule.kind === "criteria") completions = Object.keys(criteria).flatMap((key) => ENDREM_CRITERION_TARGETS[key] ? [ENDREM_CRITERION_TARGETS[key]] : []);
    if (rule.enabled && rule.kind === "milestone" && observed.done === true) completions = [milestone.id];
    return [{ ...rule, done: observed.done === true, criteria, completions: completions.filter((id) => allowedTargets.has(id) || (rule.kind === "milestone" && id === milestone.id)) }];
  });
}

/** Filenames identify the attached saves, not an authentication mechanism. */
export function validateMinecraftImportActor(names: string[], actor: string) {
  const bindings: Record<string, string> = {
    "8665c085-fd1e-410f-80b1-277175791399": "gr1d",
    "f6b62653-46b8-4328-b701-ec6a178f2718": "benamu",
  };
  const uuids = [...new Set(names.flatMap((name) => name.toLowerCase().match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g) ?? []))];
  if (uuids.length > 1) throw new Error("Selecione arquivos de apenas um jogador por importação; os critérios dos dois não podem ser somados.");
  const expected = uuids[0] ? bindings[uuids[0]] : undefined;
  if (expected && actor !== expected) throw new Error(`Este arquivo pertence a ${expected}. Selecione ${expected} antes de importar.`);
}

export function bestiarySyncPlan(
  summary: MinecraftProgressSummary,
  entries: Pick<BestiaryEntry, "id" | "registryId" | "track">[],
) {
  return entries.flatMap((entry) => {
    const kills = summary.killed[entry.registryId] ?? 0;
    const deaths = summary.killedBy[entry.registryId] ?? 0;
    if (kills <= 0 && deaths <= 0) return [];

    return [{
      mobId: entry.id,
      registryId: entry.registryId,
      defeated: kills > 0 && entry.track.includes("defeated"),
      seen: kills > 0 || deaths > 0,
      kills,
      deaths,
    }];
  });
}
