import type { Actor, PlayerItemState, ProgressionItem } from "@/types/content";

export const PHASE_ORDER = ["Início", "Intermediário", "Avançado", "Pós-jogo"] as const;
export const RISK_ORDER = ["Baixo", "Médio", "Alto", "Severo"] as const;

export const PHASE_EQUIPMENT: Record<string, string> = {
  "Início": "Ferro/escudo quando houver combate; água, comida e retorno antes de sair longe.",
  "Intermediário": "Ferro encantado ou diamante parcial, ranged e kit de retorno.",
  "Avançado": "Diamante completo/encantado, poções, mobilidade e ponto de retorno seguro.",
  "Pós-jogo": "Diamante fortemente encantado ou netherite + kit específico do encontro.",
};

export const KNOWN_SUBITEM_IDS: Record<string, string[]> = {
  "progression:30": ["progression:30:copper", "progression:30:iron", "progression:30:gold", "progression:30:diamond", "progression:30:netherite"],
  "progression:360": ["progression:360:minoshroom", "progression:360:meef-stroganoff", "progression:360:hydra"],
  "progression:370": ["progression:370:knight-phantoms", "progression:370:ur-ghast"],
  "progression:380": ["progression:380:alpha-yeti", "progression:380:snow-queen"],
  "progression:390": ["progression:390:troll-caves", "progression:390:giants", "progression:390:lamp-of-cinders", "progression:390:thornlands"],
  "progression:420": ["progression:420:cloggrum", "progression:420:froststeel", "progression:420:utherium", "progression:420:regalium"],
  "progression:500": ["progression:500:victory-medals", "progression:500:valkyrie-queen"],
  "progression:810": ["progression:810:old-eye", "progression:810:nether-eye", "progression:810:cold-eye", "progression:810:rogue-eye", "progression:810:black-eye", "progression:810:magical-eye", "progression:810:lost-eye", "progression:810:corrupted-eye", "progression:810:wither-eye", "progression:810:guardian-eye", "progression:810:witch-eye", "progression:810:cursed-eye"],
  "progression:970": ["progression:970:burning-arena", "progression:970:revenant-1", "progression:970:revenant-2", "progression:970:burning-ashes", "progression:970:altar-of-fire", "progression:970:phase-1", "progression:970:phase-2", "progression:970:phase-3", "progression:970:defeat", "progression:970:ignitium", "progression:970:ignitium-item"],
};

export function flatPlayerKey(actor: Actor, itemId: string) { return `${actor}:${itemId}`; }

export function buildSubitemMap(items: ProgressionItem[]) {
  const dynamic = Object.fromEntries(items.filter((item) => item.subitens?.length).map((item) => [item.id, item.subitens!.map((subitem) => subitem.id)]));
  return { ...KNOWN_SUBITEM_IDS, ...dynamic };
}

export function parentForSubitem(items: ProgressionItem[], subitemId: string) { return items.find((item) => item.subitens?.some((subitem) => subitem.id === subitemId)); }
export function personalState(playerStates: Record<string, PlayerItemState>, actor: Actor, itemId: string) { return playerStates[flatPlayerKey(actor, itemId)]; }
export function personalSubitemProgress(playerStates: Record<string, PlayerItemState>, actor: Actor, item: ProgressionItem) {
  const ids = item.subitens?.map((subitem) => subitem.id) ?? [];
  return { completed: ids.filter((id) => personalState(playerStates, actor, id)?.completed).length, total: ids.length };
}

function phaseRank(value: string) { const index = PHASE_ORDER.indexOf(value as (typeof PHASE_ORDER)[number]); return index < 0 ? PHASE_ORDER.length : index; }
function riskRank(value: string) { const index = RISK_ORDER.indexOf(value as (typeof RISK_ORDER)[number]); return index < 0 ? RISK_ORDER.length : index; }
function confirmedDependencies(item: ProgressionItem) { return item.gate?.confirmed ? item.gate.depends_on ?? [] : []; }
function dependsTransitively(candidate: ProgressionItem, dependencyId: string, byId: Map<string, ProgressionItem>, seen = new Set<string>()): boolean {
  if (seen.has(candidate.id)) return false;
  seen.add(candidate.id);
  const dependencies = confirmedDependencies(candidate);
  if (dependencies.includes(dependencyId)) return true;
  return dependencies.some((id) => { const next = byId.get(id); return next ? dependsTransitively(next, dependencyId, byId, seen) : false; });
}

export function sortProgression(items: ProgressionItem[]) {
  const byId = new Map(items.map((item) => [item.id, item]));
  return [...items].sort((a, b) => {
    const phase = phaseRank(a.phase) - phaseRank(b.phase); if (phase) return phase;
    const risk = riskRank(a.risk) - riskRank(b.risk); if (risk) return risk;
    if (dependsTransitively(b, a.id, byId)) return -1;
    if (dependsTransitively(a, b.id, byId)) return 1;
    return a.order - b.order;
  });
}

export function isPlaceholder(value?: string | null) {
  const text = (value ?? "").trim().toLocaleLowerCase("pt-BR");
  return !text || text === "nenhum" || text === "—" || text === "sem tier obrigatório" || text === "sem tier mecânico obrigatório" || text.startsWith("trilha paralela — ordem indiferente");
}

export function dependencyReady(item: ProgressionItem, completed: (id: string) => boolean) { return confirmedDependencies(item).every(completed); }
