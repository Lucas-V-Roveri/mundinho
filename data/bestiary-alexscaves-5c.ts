import type { BestiaryEntry, BestiaryModAudit } from "@/types/bestiary";

type RegistryCategory = "MONSTER" | "CREATURE" | "WATER_CREATURE" | "WATER_AMBIENT" | "AMBIENT" | "UNDERGROUND_WATER_CREATURE";
type Spec = readonly [registry: string, name: string, cave: string, registryCategory: RegistryCategory];

const REVISION = "d2a7b05998d85e602d86c4999e53340fb1ee9b06";
const REGISTRY_SOURCE = `https://github.com/Raguto/AlexsCaves-1.21.1/blob/${REVISION}/src/main/java/com/github/alexmodguy/alexscaves/server/entity/ACEntityRegistry.java`;

const SPECS: Spec[] = [
  ["teletor", "Teletor", "Magnetic Caves", "MONSTER"],
  ["magnetron", "Magnetron", "Magnetic Caves", "MONSTER"],
  ["boundroid", "Boundroid", "Magnetic Caves", "MONSTER"],
  ["ferrouslime", "Ferrouslime", "Magnetic Caves", "MONSTER"],
  ["notor", "Notor", "Magnetic Caves", "AMBIENT"],
  ["subterranodon", "Subterranodon", "Primordial Caves", "CREATURE"],
  ["vallumraptor", "Vallumraptor", "Primordial Caves", "CREATURE"],
  ["grottoceratops", "Grottoceratops", "Primordial Caves", "CREATURE"],
  ["trilocaris", "Trilocaris", "Primordial Caves", "WATER_AMBIENT"],
  ["tremorsaurus", "Tremorsaurus", "Primordial Caves", "CREATURE"],
  ["relicheirus", "Relicheirus", "Primordial Caves", "CREATURE"],
  ["luxtructosaurus", "Luxtructosaurus", "Primordial Caves", "MONSTER"],
  ["atlatitan", "Atlatitan", "Primordial Caves", "CREATURE"],
  ["nucleeper", "Nucleeper", "Toxic Caves", "MONSTER"],
  ["radgill", "Radgill", "Toxic Caves", "WATER_AMBIENT"],
  ["brainiac", "Brainiac", "Toxic Caves", "MONSTER"],
  ["gammaroach", "Gammaroach", "Toxic Caves", "AMBIENT"],
  ["raycat", "Raycat", "Toxic Caves", "CREATURE"],
  ["tremorzilla", "Tremorzilla", "Toxic Caves", "CREATURE"],
  ["lanternfish", "Lanternfish", "Abyssal Chasm", "WATER_AMBIENT"],
  ["sea_pig", "Sea Pig", "Abyssal Chasm", "WATER_CREATURE"],
  ["hullbreaker", "Hullbreaker", "Abyssal Chasm", "UNDERGROUND_WATER_CREATURE"],
  ["gossamer_worm", "Gossamer Worm", "Abyssal Chasm", "WATER_CREATURE"],
  ["tripodfish", "Tripodfish", "Abyssal Chasm", "WATER_CREATURE"],
  ["deep_one", "Deep One", "Abyssal Chasm", "MONSTER"],
  ["deep_one_knight", "Deep One Knight", "Abyssal Chasm", "MONSTER"],
  ["deep_one_mage", "Deep One Mage", "Abyssal Chasm", "MONSTER"],
  ["mine_guardian", "Mine Guardian", "Abyssal Chasm", "MONSTER"],
  ["gloomoth", "Gloomoth", "Forlorn Hollows", "AMBIENT"],
  ["underzealot", "Underzealot", "Forlorn Hollows", "MONSTER"],
  ["watcher", "Watcher", "Forlorn Hollows", "MONSTER"],
  ["corrodent", "Corrodent", "Forlorn Hollows", "MONSTER"],
  ["vesper", "Vesper", "Forlorn Hollows", "MONSTER"],
  ["forsaken", "Forsaken", "Forlorn Hollows", "MONSTER"],
  ["sweetish_fish", "Sweetish Fish", "Candy Cavity", "WATER_AMBIENT"],
  ["caniac", "Caniac", "Candy Cavity", "MONSTER"],
  ["gumbeeper", "Gumbeeper", "Candy Cavity", "MONSTER"],
  ["candicorn", "Candicorn", "Candy Cavity", "CREATURE"],
  ["gum_worm", "Gum Worm", "Candy Cavity", "MONSTER"],
  ["caramel_cube", "Caramel Cube", "Candy Cavity", "MONSTER"],
  ["gummy_bear", "Gummy Bear", "Candy Cavity", "CREATURE"],
  ["licowitch", "Licowitch", "Candy Cavity", "MONSTER"],
  ["gingerbread_man", "Gingerbread Man", "Candy Cavity", "MONSTER"],
];

const caveSlug: Record<string, string> = {
  "Magnetic Caves": "magnetic_caves",
  "Primordial Caves": "primordial_caves",
  "Toxic Caves": "toxic_caves",
  "Abyssal Chasm": "abyssal_chasm",
  "Forlorn Hollows": "forlorn_hollows",
  "Candy Cavity": "candy_cavity",
};

const categoryLabel: Record<RegistryCategory, string> = {
  MONSTER: "Monstro",
  CREATURE: "Criatura",
  WATER_CREATURE: "Criatura aquática",
  WATER_AMBIENT: "Fauna aquática",
  AMBIENT: "Fauna ambiente",
  UNDERGROUND_WATER_CREATURE: "Criatura aquática subterrânea",
};

const severe = new Set(["luxtructosaurus", "hullbreaker", "tremorzilla", "forsaken"]);
const high = new Set(["brainiac", "watcher"]);
const specialType: Partial<Record<string, BestiaryEntry["type"]>> = {
  luxtructosaurus: "Chefe",
  hullbreaker: "Não confirmado",
  tremorzilla: "Não confirmado",
  forsaken: "Hostil",
  brainiac: "Hostil",
  watcher: "Hostil",
};

function behaviorFor(category: RegistryCategory) {
  return category === "MONSTER" ? "Hostil (registro MONSTER)" : "Comportamento fino a conferir";
}

function typeFor(registry: string, category: RegistryCategory): BestiaryEntry["type"] {
  return specialType[registry] ?? (category === "MONSTER" ? "Hostil" : "Não confirmado");
}

function dangerFor(registry: string, category: RegistryCategory): BestiaryEntry["danger"] {
  if (severe.has(registry)) return "Severo";
  if (high.has(registry)) return "Alto";
  if (category === "MONSTER") return "Médio";
  if (category === "AMBIENT" || category === "WATER_AMBIENT") return "Baixo";
  return "Médio";
}

function bookSource(cave: string) {
  const slug = caveSlug[cave];
  return `https://github.com/Raguto/AlexsCaves-1.21.1/blob/${REVISION}/src/main/resources/assets/alexscaves/books/pt_br/${slug}/chapter.txt`;
}

function makeEntry([registry, name, cave, registryCategory]: Spec): BestiaryEntry {
  const isLux = registry === "luxtructosaurus";
  const isHull = registry === "hullbreaker";
  const isTremorzilla = registry === "tremorzilla";
  const isForsaken = registry === "forsaken";
  return {
    id: `alexscaves-${registry.replaceAll("_", "-")}`,
    namePt: name,
    nameEn: name,
    mod: "Alex's Caves",
    version: "2.0.10 · pack 1.21.1",
    registryId: `alexscaves:${registry}`,
    category: isLux ? "Chefe" : categoryLabel[registryCategory],
    behavior: isLux
      ? "Chefe hostil; o passo a passo completo fica no guia/marco do mod"
      : isHull
        ? "Criatura extrema do Abyssal Chasm; não tratada aqui como boss formal"
        : behaviorFor(registryCategory),
    type: typeFor(registry, registryCategory),
    danger: dangerFor(registry, registryCategory),
    summary: isLux
      ? "Chefe do Primordial Caves confirmado pelo registry e pelo Cave Book desta build. O Bestiário resume o encontro e evita duplicar o guia."
      : isHull
        ? "Criatura extrema do Abyssal Chasm. O projeto já a separa de um boss formal; detalhes finos ficam no marco correspondente."
        : isTremorzilla
          ? "Criatura extrema do Toxic Caves registrada na build 2.0.10. O card não presume domesticação, atributos ou drops sem auditar as fontes específicas."
          : isForsaken
            ? "Monstro de alto risco do Forlorn Hollows. Existência, cave biome e categoria de registry estão confirmadas nesta build."
            : `Habitante de ${cave} registrado na build 2.0.10. Existência, cave biome e categoria de spawn estão confirmadas sem transplantar números de outra versão.`,
    dimensions: ["Overworld"],
    locations: [cave],
    habitat: cave,
    howToFind: `Procurem ${cave}. O Cave Book incluído na própria build lista ${name} entre os habitantes desse cave biome; o registry 1.21.1 confirma a entidade.`,
    drops: [],
    notes: [
      "Vida, dano, armadura, drops, domesticação e mecânicas finas ficam em aberto quando a classe/loot table específica não foi auditada neste lote.",
      registryCategory !== "MONSTER" ? "MobCategory do registry não prova passividade ou neutralidade; o tipo comportamental permanece ‘Não confirmado’." : "O registry usa MobCategory.MONSTER, suficiente para marcar o comportamento-base como hostil.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    confidence: "Alta",
    sources: [
      { label: "Alex's Caves 2.0.10 · registry 1.21.1", href: REGISTRY_SOURCE, note: "entidade e MobCategory na revisão exata do port usado pelo pack" },
      { label: `Alex's Caves 2.0.10 · Cave Book pt-BR · ${cave}`, href: bookSource(cave), note: "lista in-game de habitantes do cave biome" },
    ],
  };
}

export const ALEXS_CAVES_5C: BestiaryEntry[] = SPECS.map(makeEntry);

export const ALEXS_CAVES_5C_AUDIT: BestiaryModAudit = {
  mod: "Alex's Caves",
  version: "2.0.10",
  status: "inventariado",
  sourceHref: REGISTRY_SOURCE,
  note: "43 mobs vivos separados de projéteis, segmentos e entidades técnicas. Registry 1.21.1 e Cave Book da mesma revisão fecham existência, categoria e cave biome.",
};
