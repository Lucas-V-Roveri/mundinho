import type { BestiaryEntry } from "@/types/bestiary";

type JsonObject = Record<string, unknown>;

type MinecraftStatsFile = {
  stats?: Record<string, Record<string, number>>;
};

type MinecraftAdvancement = {
  done?: boolean;
  criteria?: Record<string, string>;
};

type MinecraftAdvancementsFile = Record<string, MinecraftAdvancement>;

export type MinecraftProgressSummary = {
  killed: Record<string, number>;
  killedBy: Record<string, number>;
  completedAdvancements: string[];
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
      if (isObject(value) && (value as MinecraftAdvancement).done === true) completedAdvancements.add(id);
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
    recognizedMobIds,
    unmatchedMobIds,
  };
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
