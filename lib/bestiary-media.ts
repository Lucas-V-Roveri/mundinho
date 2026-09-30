import type { BestiaryEntry } from "@/types/bestiary";

const RAW_TEXTURE_PATHS = [
  "/textures/entity/",
  "/textures/entities/",
  "/texture/entity/",
  "/texture/entities/",
  "/sprite_sheets/",
  "/spritesheets/",
  "/sprite-sheet/",
];

const RAW_TEXTURE_LABELS = [
  "textura oficial",
  "textura de referência",
  "official texture",
  "texture reference",
  "uv map",
  "mapa uv",
  "sprite sheet",
  "spritesheet",
];

export function isUnsafeBestiaryImage(entry: Pick<BestiaryEntry, "imageUrl" | "imageAlt">) {
  if (!entry.imageUrl) return false;

  const url = decodeURIComponent(entry.imageUrl).toLocaleLowerCase("en-US");
  const alt = (entry.imageAlt ?? "").toLocaleLowerCase("pt-BR");

  return RAW_TEXTURE_PATHS.some((pattern) => url.includes(pattern))
    || RAW_TEXTURE_LABELS.some((pattern) => alt.includes(pattern));
}

/**
 * O slot visual do Bestiário é conteúdo editorial, não um visualizador de assets.
 * Se a única mídia cadastrada for textura/UV/sprite técnico, o resultado correto
 * é o placeholder "imagem a adicionar".
 */
export function sanitizeBestiaryMedia(entry: BestiaryEntry): BestiaryEntry {
  if (!isUnsafeBestiaryImage(entry)) return entry;

  return {
    ...entry,
    imageUrl: undefined,
    imageAlt: undefined,
    imageSourceUrl: undefined,
  };
}
