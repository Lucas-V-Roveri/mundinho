import { describeCelebration, type Celebration, type CelebrationContext, type CelebrationInput } from "./taxonomy";

export const CELEBRATION_EVENT = "mundinho:celebration";
export type Anchor = { element: HTMLElement; card: HTMLElement; rect: DOMRect; cardRect: DOMRect; scrollX: number; scrollY: number; capturedAt: number; checked: boolean };
export type CelebrationEvent = { celebration: Celebration; anchor: Anchor };
const anchors = new Map<string, Anchor[]>();
const confirmations = new Map<string, boolean>();
let enabled = true;

/** Feature switch is deliberately separate from persisted progress contracts. */
export function setCelebrationsEnabled(value: boolean) { enabled = value; if (!value) clearCelebrationSession(); }
export function clearCelebrationSession() { anchors.clear(); confirmations.clear(); }
export function reconcileConfirmations(context: CelebrationContext) {
  for (const [key, value] of confirmations) {
    if (context.playerStates[key]?.completed === value) confirmations.delete(key);
  }
}

export function identifyCheckbox(input: HTMLInputElement, context: CelebrationContext): string | undefined {
  const label = input.closest("label");
  const title = label?.querySelector(".font-label")?.textContent?.trim();
  if (!title) return;
  const handmade = input.closest(".handmade-note");
  const guideRoot = input.closest("article[id^='guide-']");
  const progressionRoot = input.closest("article[id^='progression:']");
  if (handmade) {
    const section = guideRoot ? "mods" : progressionRoot ? "progression" : location.pathname === "/extras" ? "extras" : "progression";
    const entry = guideRoot?.id.slice(6) ?? (progressionRoot ? context.content.progression.find((p) => p.id === progressionRoot.id)?.entry : section === "extras" ? "extras" : undefined);
    const custom = context.customItems.find((c) => c.section === section && (!entry || c.entry_key === entry) && c.title === title && !c.deleted);
    return custom ? `custom:${custom.id}` : undefined;
  }
  if (progressionRoot) {
    const item = context.content.progression.find((p) => p.id === progressionRoot.id);
    return item?.subitens?.find((s) => s.title === title)?.id ?? item?.id;
  }
  if (guideRoot) {
    const guide = context.content.guides.find((g) => `guide-${g.id}` === guideRoot.id);
    return guide?.checklist.find(([, text]) => text === title)?.[0];
  }
  return context.content.extras?.items.find((extra) => extra.title === title && input.closest(`[id="${CSS.escape(extra.id)}"]`))?.id;
}

/** Capture phase runs before React's handler, for mouse, touch and keyboard changes. */
export function captureCheckbox(event: Event, context: CelebrationContext) {
  if (!enabled || !(event.target instanceof HTMLInputElement) || event.target.type !== "checkbox") return;
  const input = event.target;
  const itemId = identifyCheckbox(input, context);
  const element = input.closest("label");
  if (!itemId || !element) return;
  const now = performance.now();
  for (const [key, queue] of anchors) {
    const fresh = queue.filter((anchor) => now - anchor.capturedAt < 15000);
    if (fresh.length) anchors.set(key, fresh); else anchors.delete(key);
  }
  const card = element.closest<HTMLElement>(".handmade-note, .progression-card, .pixel-surface") ?? element;
  const queue = anchors.get(itemId) ?? [];
  queue.push({ element, card, rect: element.getBoundingClientRect(), cardRect: card.getBoundingClientRect(), scrollX: window.scrollX, scrollY: window.scrollY, capturedAt: now, checked: input.checked });
  anchors.set(itemId, queue.slice(-8));
  if (anchors.size > 32) anchors.delete(anchors.keys().next().value!);
}

/** The sole existing-handler integration: called only after all progress writes succeeded. */
export function celebrateConfirmed(input: CelebrationInput, context: CelebrationContext) {
  if (typeof window === "undefined" || !enabled) return;
  try {
    const queue = anchors.get(input.itemId) ?? [];
    const index = queue.findIndex((a) => a.checked === input.completed && performance.now() - a.capturedAt < 15000);
    const anchor = index >= 0 ? queue.splice(index, 1)[0] : undefined;
    if (!queue.length) anchors.delete(input.itemId);
    const key = `${context.actor}:${input.itemId}`;
    const wasCompleted = confirmations.get(key) ?? Boolean(context.playerStates[key]?.completed);
    const celebration = describeCelebration(input, context, confirmations);
    confirmations.set(key, input.completed);
    if (confirmations.size > 256) confirmations.delete(confirmations.keys().next().value!);
    if (!input.completed || wasCompleted || !anchor || document.hidden) return;
    window.dispatchEvent(new CustomEvent<CelebrationEvent>(CELEBRATION_EVENT, { detail: { celebration, anchor } }));
  } catch {
    // An optional visual effect must never turn a saved checklist into a mutation error.
  }
}
