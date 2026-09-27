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

async function fetchIcon(name) {
  const candidates = [`items/${name}.png`, `blocks/${name}.png`];
  for (const relative of candidates) {
    const response = await fetch(`${base}/${relative}`, { cache: "no-store" });
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    if (response.status !== 404) throw new Error(`Falha ao buscar ${relative}: HTTP ${response.status}`);
  }
  throw new Error(`Sprite Minecraft ${config.version} não encontrado: ${name}`);
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
