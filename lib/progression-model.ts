import type { Actor, PlayerItemState, ProgressionItem } from "@/types/content";

export const PHASE_ORDER = ["Início", "Intermediário", "Avançado", "Pós-jogo"] as const;
export const RISK_ORDER = ["Baixo", "Médio", "Alto", "Severo"] as const;

export const PHASE_EQUIPMENT: Record<string, string> = {
  "Início": "Ferro/escudo quando houver combate; água, comida e retorno antes de sair longe.",
  "Intermediário": "Ferro encantado ou diamante parcial, ranged e kit de retorno.",
  "Avançado": "Diamante completo/encantado, poções, mobilidade e ponto de retorno seguro.",
  "Pós-jogo": "Diamante fortemente encantado ou netherite + kit específico do encontro.",
};

export function flatPlayerKey(actor: Actor, itemId: string) {
  return `${actor}:${itemId}`;
}

export function buildSubitemMap(items: ProgressionItem[]) {
  return Object.fromEntries(
    items
      .filter((item) => item.subitens?.length)
      .map((item) => [item.id, item.subitens!.map((subitem) => subitem.id)]),
  );
}

export function parentForSubitem(items: ProgressionItem[], subitemId: string) {
  return items.find((item) => item.subitens?.some((subitem) => subitem.id === subitemId));
}

export function personalState(playerStates: Record<string, PlayerItemState>, actor: Actor, itemId: string) {
  return playerStates[flatPlayerKey(actor, itemId)];
}

export function personalSubitemProgress(playerStates: Record<string, PlayerItemState>, actor: Actor, item: ProgressionItem) {
  const ids = item.subitens?.map((subitem) => subitem.id) ?? [];
  const completed = ids.filter((id) => personalState(playerStates, actor, id)?.completed).length;
  return { completed, total: ids.length };
}

function phaseRank(value: string) {
  const index = PHASE_ORDER.indexOf(value as (typeof PHASE_ORDER)[number]);
  return index < 0 ? PHASE_ORDER.length : index;
}
function riskRank(value: string) {
  const index = RISK_ORDER.indexOf(value as (typeof RISK_ORDER)[number]);
  return index < 0 ? RISK_ORDER.length : index;
}
function confirmedDependencies(item: ProgressionItem) {
  return item.gate?.confirmed ? item.gate.depends_on ?? [] : [];
}

function dependsTransitively(candidate: ProgressionItem, dependencyId: string, byId: Map<string, ProgressionItem>, seen = new Set<string>()): boolean {
  if (seen.has(candidate.id)) return false;
  seen.add(candidate.id);
  const dependencies = confirmedDependencies(candidate);
  if (dependencies.includes(dependencyId)) return true;
  return dependencies.some((id) => {
    const next = byId.get(id);
    return next ? dependsTransitively(next, dependencyId, byId, seen) : false;
  });
}

export function sortProgression(items: ProgressionItem[]) {
  const byId = new Map(items.map((item) => [item.id, item]));
  return [...items].sort((a, b) => {
    const phase = phaseRank(a.phase) - phaseRank(b.phase);
    if (phase) return phase;
    const risk = riskRank(a.risk) - riskRank(b.risk);
    if (risk) return risk;
    if (dependsTransitively(b, a.id, byId)) return -1;
    if (dependsTransitively(a, b.id, byId)) return 1;
    return a.order - b.order;
  });
}

export function isPlaceholder(value?: string | null) {
  const text = (value ?? "").trim().toLocaleLowerCase("pt-BR");
  return !text || text === "nenhum" || text === "—" || text === "sem tier obrigatório" || text === "sem tier mecânico obrigatório" || text.startsWith("trilha paralela — ordem indiferente");
}

export function dependencyReady(item: ProgressionItem, completed: (id: string) => boolean) {
  const deps = confirmedDependencies(item);
  return deps.every(completed);
}
