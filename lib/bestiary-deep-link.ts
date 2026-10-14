/** Resolve only real card/recipe anchors. Never treat a URL as discovery evidence. */
export function findBestiaryHashTarget<T extends { id: string; registryId: string }>(entries: readonly T[], hash: string): T | undefined {
  let target: string;
  try {
    target = decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return undefined;
  }
  return entries.find((entry) => target === `mob-${entry.id}` || target === `mob-${entry.id}-recipes`);
}
