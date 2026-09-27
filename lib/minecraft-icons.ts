import iconConfig from "@/data/minecraft-icons.json";
import type { Guide, ProgressionItem } from "@/types/content";

const LEGACY_PLACEHOLDERS = new Set([
  "/icons/apple.svg",
  "/icons/boss.svg",
  "/icons/cube.svg",
  "/icons/dimension.svg",
  "/icons/item.svg",
  "/icons/structure.svg",
]);

function pathFor(name: string) {
  return `/icons/minecraft/${name}.png`;
}

export const MINECRAFT_ICON_FALLBACK = pathFor(iconConfig.fallback);

export function milestoneMinecraftIcon(order: number) {
  const name = iconConfig.milestones[String(order) as keyof typeof iconConfig.milestones];
  return pathFor(name ?? iconConfig.fallback);
}

export function guideMinecraftIcon(id: string) {
  const name = iconConfig.guides[id as keyof typeof iconConfig.guides];
  return pathFor(name ?? iconConfig.fallback);
}

export function resolveProgressionIcon(item: ProgressionItem) {
  const source = item.imagem?.src ?? item.icone;
  if (source && !LEGACY_PLACEHOLDERS.has(source)) return source;
  return milestoneMinecraftIcon(item.order);
}

export function resolveGuideIcon(guide: Guide) {
  const source = guide.imagem?.src ?? guide.icone;
  if (source && !LEGACY_PLACEHOLDERS.has(source)) return source;
  return guideMinecraftIcon(guide.id);
}
