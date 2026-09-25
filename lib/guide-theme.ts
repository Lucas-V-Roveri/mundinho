import type { Guide, GuideTheme } from "@/types/content";

export const DEFAULT_GUIDE_THEME: GuideTheme = {
  accent: "stone",
  texture: "stone",
};

export const GUIDE_ACCENTS = ["stone", "torch", "wood", "grass", "redstone", "gold", "blue", "ice"] as const;
export const GUIDE_TEXTURES = ["fire", "leather", "ice", "leaf", "stone", "none"] as const;

export function resolveGuideTheme(theme?: GuideTheme): GuideTheme {
  return theme ?? DEFAULT_GUIDE_THEME;
}

export function guideThemeClasses(theme?: GuideTheme) {
  const resolved = resolveGuideTheme(theme);
  return {
    frame: `guide-accent-${resolved.accent} guide-theme-frame`,
    stripe: `guide-texture-${resolved.texture} guide-theme-stripe`,
    badge: "guide-theme-badge",
    accent: `guide-accent-${resolved.accent}`,
  };
}

function normalize(value: string) {
  return value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function findGuideForText(guides: Guide[], text: string) {
  const haystack = normalize(text);
  return guides.find((guide) => {
    const candidates = normalize(`${guide.id} ${guide.title}`).split(/[^a-z0-9]+/).filter((token) => token.length >= 5);
    return candidates.some((token) => haystack.includes(token));
  });
}
