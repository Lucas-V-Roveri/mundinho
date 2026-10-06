type CatalogOriginLike = { encounterId?: string };
type CatalogItemLike = { origins: readonly CatalogOriginLike[] };

const BESTIARY_MOB_BY_ENCOUNTER: Record<string, string> = {
  "bomd-blossom": "bomd-void-blossom",
  "bomd-lich": "bomd-night-lich",
  "bomd-gauntlet": "bomd-nether-gauntlet",
  "bomd-obsidilith": "bomd-obsidilith",
  "tf-naga": "twilightforest-naga",
  "tf-lich": "twilightforest-lich",
  "tf-minoshroom": "twilightforest-minoshroom",
  "tf-hydra": "twilightforest-hydra",
  "tf-knight-phantoms": "twilightforest-knight_phantom",
  "tf-ur-ghast": "twilightforest-ur_ghast",
  "tf-alpha-yeti": "twilightforest-alpha_yeti",
  "tf-snow-queen": "twilightforest-snow_queen",
};

export function bestiaryHrefForEncounter(encounterId: string) {
  const mobId = BESTIARY_MOB_BY_ENCOUNTER[encounterId];
  return mobId ? `/bestiario#mob-${mobId}` : null;
}

export function bestiaryHrefForCatalogItem(item: CatalogItemLike) {
  for (const origin of item.origins) {
    if (!origin.encounterId) continue;
    const href = bestiaryHrefForEncounter(origin.encounterId);
    if (href) return href;
  }
  return null;
}
