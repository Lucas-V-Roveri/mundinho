import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const config = JSON.parse(await readFile(path.join(root, "data/minecraft-icons.json"), "utf8"));
const outDir = path.join(root, "public/icons/minecraft");
await mkdir(outDir, { recursive: true });

const names = [...new Set([
  config.fallback,
  ...Object.values(config.milestones),
  ...Object.values(config.guides),
])].sort();

const base = `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/${config.sourceCommit}/data/${config.version}`;

async function fetchJson(relative) {
  const response = await fetch(`${base}/${relative}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Falha ao buscar ${relative}: HTTP ${response.status}`);
  return response.json();
}

function byName(rows) {
  return Object.fromEntries((Array.isArray(rows) ? rows : Object.values(rows)).filter((row) => row?.name).map((row) => [row.name, row]));
}

const [itemTextureRows, blockTextureRows] = await Promise.all([
  fetchJson("items_textures.json"),
  fetchJson("blocks_textures.json"),
]);
const itemTextures = byName(itemTextureRows);
const blockTextures = byName(blockTextureRows);

function metadataTexture(entry) {
  if (!entry) return null;
  if (typeof entry === "string") return entry;
  if (typeof entry.texture === "string") return entry.texture;
  if (Array.isArray(entry.textures)) {
    const candidate = entry.textures.find((value) => typeof value === "string" || typeof value?.texture === "string");
    return typeof candidate === "string" ? candidate : candidate?.texture ?? null;
  }
  return null;
}

function normalizeTexturePath(value) {
  if (!value) return null;
  let normalized = String(value).replace(/^textures\//, "");
  if (normalized.startsWith("minecraft:item/")) normalized = `items/${normalized.slice("minecraft:item/".length)}`;
  else if (normalized.startsWith("minecraft:block/")) normalized = `blocks/${normalized.slice("minecraft:block/".length)}`;
  else normalized = normalized.replace(/^minecraft:/, "").replace(/^item\//, "items/").replace(/^block\//, "blocks/");
  if (!normalized.endsWith(".png")) normalized += ".png";
  return normalized;
}

async function fetchIcon(name) {
  const candidates = [...new Set([
    `items/${name}.png`,
    `blocks/${name}.png`,
    normalizeTexturePath(metadataTexture(itemTextures[name])),
    normalizeTexturePath(metadataTexture(blockTextures[name])),
  ].filter(Boolean))];

  for (const relative of candidates) {
    const response = await fetch(`${base}/${relative}`, { cache: "no-store" });
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    if (response.status !== 404) throw new Error(`Falha ao buscar ${relative}: HTTP ${response.status}`);
  }
  throw new Error(`Sprite Minecraft ${config.version} não encontrado: ${name} (tentativas: ${candidates.join(", ")})`);
}

let cursor = 0;
const workers = Array.from({ length: 8 }, async () => {
  while (cursor < names.length) {
    const index = cursor++;
    const name = names[index];
    const bytes = await fetchIcon(name);
    await writeFile(path.join(outDir, `${name}.png`), bytes);
    console.log(`[minecraft-icons] ${name}.png`);
  }
});

await Promise.all(workers);
console.log(`[minecraft-icons] ${names.length} sprites Minecraft ${config.version} gerados em public/icons/minecraft`);
