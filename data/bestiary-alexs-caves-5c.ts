import type { BestiaryEntry } from "@/types/bestiary";

const REV = "d2a7b05998d85e602d86c4999e53340fb1ee9b06";
const ROOT = `https://github.com/Raguto/AlexsCaves-1.21.1/blob/${REV}`;
const RAW = `https://raw.githubusercontent.com/Raguto/AlexsCaves-1.21.1/${REV}`;
const REGISTRY = `${ROOT}/src/main/java/com/github/alexmodguy/alexscaves/server/entity/ACEntityRegistry.java`;
const ITEMS = `${ROOT}/src/main/java/com/github/alexmodguy/alexscaves/server/item/ACItemRegistry.java`;
const TEXTURE_DIR = `${ROOT}/src/main/resources/assets/alexscaves/textures/entity`;
const ENTITY_ROOT = `${ROOT}/src/main/java/com/github/alexmodguy/alexscaves/server/entity/living`;

type Cave = "Magnetic Caves" | "Primordial Caves" | "Toxic Caves" | "Abyssal Chasm" | "Forlorn Hollows" | "Candy Cavity";
type Seed = { id: string; name: string; cave: Cave; category?: string; texture?: string };

const SEEDS: Seed[] = [
  { id: "teletor", name: "Teletor", cave: "Magnetic Caves" },
  { id: "magnetron", name: "Magnetron", cave: "Magnetic Caves" },
  { id: "boundroid", name: "Boundroid", cave: "Magnetic Caves" },
  { id: "ferrouslime", name: "Ferrouslime", cave: "Magnetic Caves" },
  { id: "notor", name: "Notor", cave: "Magnetic Caves" },
  { id: "subterranodon", name: "Subterranodon", cave: "Primordial Caves" },
  { id: "vallumraptor", name: "Vallumraptor", cave: "Primordial Caves" },
  { id: "grottoceratops", name: "Grottoceratops", cave: "Primordial Caves" },
  { id: "trilocaris", name: "Trilocaris", cave: "Primordial Caves" },
  { id: "tremorsaurus", name: "Tremorsaurus", cave: "Primordial Caves" },
  { id: "relicheirus", name: "Relicheirus", cave: "Primordial Caves" },
  { id: "luxtructosaurus", name: "Luxtructosaurus", cave: "Primordial Caves", category: "Chefe" },
  { id: "atlatitan", name: "Atlatitan", cave: "Primordial Caves" },
  { id: "nucleeper", name: "Nucleeper", cave: "Toxic Caves" },
  { id: "radgill", name: "Radgill", cave: "Toxic Caves" },
  { id: "brainiac", name: "Brainiac", cave: "Toxic Caves", category: "Criatura extrema" },
  { id: "gammaroach", name: "Gammaroach", cave: "Toxic Caves" },
  { id: "raycat", name: "Raycat", cave: "Toxic Caves", category: "Domesticável" },
  { id: "tremorzilla", name: "Tremorzilla", cave: "Toxic Caves", category: "Criatura extrema domesticável" },
  { id: "lanternfish", name: "Lanternfish", cave: "Abyssal Chasm" },
  { id: "sea_pig", name: "Sea Pig", cave: "Abyssal Chasm" },
  { id: "hullbreaker", name: "Hullbreaker", cave: "Abyssal Chasm", category: "Criatura extrema" },
  { id: "gossamer_worm", name: "Gossamer Worm", cave: "Abyssal Chasm" },
  { id: "tripodfish", name: "Tripodfish", cave: "Abyssal Chasm" },
  { id: "deep_one", name: "Deep One", cave: "Abyssal Chasm" },
  { id: "deep_one_knight", name: "Deep One Knight", cave: "Abyssal Chasm" },
  { id: "deep_one_mage", name: "Deep One Mage", cave: "Abyssal Chasm" },
  { id: "mine_guardian", name: "Mine Guardian", cave: "Abyssal Chasm" },
  { id: "gloomoth", name: "Gloomoth", cave: "Forlorn Hollows" },
  { id: "underzealot", name: "Underzealot", cave: "Forlorn Hollows" },
  { id: "watcher", name: "Watcher", cave: "Forlorn Hollows", category: "Criatura extrema" },
  { id: "corrodent", name: "Corrodent", cave: "Forlorn Hollows" },
  { id: "vesper", name: "Vesper", cave: "Forlorn Hollows" },
  { id: "forsaken", name: "Forsaken", cave: "Forlorn Hollows", category: "Criatura extrema" },
  { id: "sweetish_fish", name: "Sweetish Fish", cave: "Candy Cavity" },
  { id: "caniac", name: "Caniac", cave: "Candy Cavity" },
  { id: "gumbeeper", name: "Gumbeeper", cave: "Candy Cavity" },
  { id: "candicorn", name: "Candicorn", cave: "Candy Cavity", category: "Domesticável / montaria" },
  { id: "gum_worm", name: "Gum Worm", cave: "Candy Cavity" },
  { id: "caramel_cube", name: "Caramel Cube", cave: "Candy Cavity" },
  { id: "gummy_bear", name: "Gummy Bear", cave: "Candy Cavity" },
  { id: "licowitch", name: "Licowitch", cave: "Candy Cavity" },
  { id: "gingerbread_man", name: "Gingerbread Man", cave: "Candy Cavity" },
];

const CAVE_DANGER: Record<Cave, BestiaryEntry["danger"]> = {
  "Magnetic Caves": "Médio",
  "Primordial Caves": "Alto",
  "Toxic Caves": "Alto",
  "Abyssal Chasm": "Severo",
  "Forlorn Hollows": "Alto",
  "Candy Cavity": "Alto",
};

const EXTREME = new Set(["luxtructosaurus", "hullbreaker", "brainiac", "tremorzilla", "watcher", "forsaken"]);
const HOSTILE = new Set([
  "teletor", "magnetron", "boundroid", "ferrouslime", "luxtructosaurus", "nucleeper", "brainiac", "hullbreaker", "deep_one", "deep_one_knight", "deep_one_mage", "mine_guardian", "underzealot", "watcher", "corrodent", "vesper", "forsaken", "caniac", "gumbeeper", "gum_worm", "caramel_cube", "licowitch", "gingerbread_man",
]);

const ATTRS: Record<string, { health?: string; attack?: string; note?: string; cls: string }> = {
  ferrouslime: { health: "10 HP", attack: "2 de ataque base", cls: "FerrouslimeEntity" },
  trilocaris: { health: "10 HP", attack: "1 de ataque base", cls: "TrilocarisEntity" },
  luxtructosaurus: { health: "600 HP", attack: "12 de ataque base", note: "20 de armadura; resistência a knockback 1.0; follow range 256.", cls: "LuxtructosaurusEntity" },
  atlatitan: { health: "400 HP", cls: "AtlatitanEntity" },
  nucleeper: { health: "40 HP", note: "4 de armadura.", cls: "NucleeperEntity" },
  brainiac: { health: "40 HP", attack: "5 de ataque base", note: "8 de armadura; follow range 32.", cls: "BrainiacEntity" },
  gammaroach: { health: "14 HP", attack: "2 de ataque base", cls: "GammaroachEntity" },
  raycat: { health: "24 HP", attack: "1 de ataque base", cls: "RaycatEntity" },
  tremorzilla: { health: "500 HP", attack: "30 de ataque base", note: "10 de armadura; resistência a knockback 1.0; follow range 128.", cls: "TremorzillaEntity" },
  hullbreaker: { health: "400 HP", attack: "16 de ataque base", cls: "HullbreakerEntity" },
  deep_one: { health: "30 HP", attack: "3 de ataque base", cls: "DeepOneEntity" },
  gloomoth: { health: "4 HP", cls: "GloomothEntity" },
  watcher: { health: "30 HP", attack: "4 de ataque base", note: "Follow range 256.", cls: "WatcherEntity" },
  vesper: { health: "16 HP", attack: "3 de ataque base", note: "Follow range 52.", cls: "VesperEntity" },
  forsaken: { health: "250 HP", attack: "10 de ataque base", note: "Resistência a knockback 0.6; follow range 64.", cls: "ForsakenEntity" },
  caramel_cube: { health: "4 HP", attack: "2 de ataque base", cls: "CaramelCubeEntity" },
  candicorn: { health: "30 HP", attack: "6 de ataque base", note: "Follow range 64.", cls: "CandicornEntity" },
};

const TAME: Record<string, { text: string; source: string }> = {
  subterranodon: { text: "Pode ser domesticado ao chocar um ovo de Subterranodon perto de um jogador; o código também aceita Trilocaris Tail/Cooked Trilocaris Tail e aplica 1 em 3 por tentativa.", source: "SubterranodonEntity" },
  vallumraptor: { text: "Pode nascer domesticado ao chocar o ovo perto de um jogador. A classe também possui rota própria com Serene Salad quando o Vallumraptor está relaxado.", source: "VallumraptorEntity" },
  tremorsaurus: { text: "Pode nascer domesticado ao chocar o ovo perto de um jogador. A classe também mantém tentativas próprias de domesticação; o card não simplifica essa segunda rota além do que o código confirma.", source: "TremorsaurusEntity" },
  raycat: { text: "Use Radgill em um Raycat não domesticado. Cada tentativa consome o item e tem 1 em 3 de chance de domesticar.", source: "RaycatEntity" },
  tremorzilla: { text: "Alimente com Nuclear Bomb. A partir da 4ª tentativa registrada, cada mastigação qualificável usa uma rolagem de 1 em 3 para domesticar.", source: "TremorzillaEntity" },
  candicorn: { text: "Use Caramel Apple em um Candicorn não domesticado. Cada tentativa consome a maçã e tem 1 em 3 de chance; depois de domesticado pode receber Saddle.", source: "CandicornEntity" },
};

function classUrl(name: string) {
  return `${ENTITY_ROOT}/${name}.java`;
}

function baseCategory(seed: Seed) {
  if (seed.category) return seed.category;
  if (HOSTILE.has(seed.id)) return "Hostil";
  if (["lanternfish", "sea_pig", "gossamer_worm", "tripodfish", "sweetish_fish", "trilocaris", "radgill"].includes(seed.id)) return "Fauna aquática";
  return "Criatura";
}

export const ALEXS_CAVES_BESTIARY_5C: BestiaryEntry[] = SEEDS.map((seed) => {
  const attrs = ATTRS[seed.id];
  const tame = TAME[seed.id];
  const danger = EXTREME.has(seed.id) ? "Severo" : CAVE_DANGER[seed.cave];
  const texture = seed.texture ?? seed.id;
  const sources = [
    { label: "Alex's Caves 2.0.10 · registry", href: REGISTRY, note: "existência e tipo registrado" },
    { label: "Alex's Caves 2.0.10 · spawn eggs por bioma", href: ITEMS, note: `${seed.name} associado a ${seed.cave}` },
    ...(attrs ? [{ label: `Alex's Caves · ${attrs.cls}.java`, href: classUrl(attrs.cls), note: "atributos numéricos exibidos no card" }] : []),
    ...(tame ? [{ label: `Alex's Caves · ${tame.source}.java`, href: classUrl(tame.source), note: "mecânica de domesticação" }] : []),
  ];
  return {
    id: `alexscaves-${seed.id.replaceAll("_", "-")}`,
    namePt: seed.name,
    nameEn: seed.name,
    mod: "Alex's Caves",
    version: "2.0.10 · pack 1.21.1",
    registryId: `alexscaves:${seed.id}`,
    category: baseCategory(seed),
    behavior: HOSTILE.has(seed.id) ? "Hostil / encontro de combate" : "Comportamento detalhado não generalizado sem fonte individual; trate como fauna própria do bioma.",
    danger,
    summary: EXTREME.has(seed.id)
      ? `Encontro de alta pressão de ${seed.cave}. O card registra apenas os números e mecânicas confirmados na build 2.0.10; o passo a passo completo continua na Progressão quando já existe marco.`
      : `Criatura confirmada de ${seed.cave} na build 2.0.10. O card evita completar comportamento, drops ou atributos que não foram validados individualmente.`,
    dimensions: ["Overworld"],
    locations: [seed.cave],
    howToFind: `Explore ${seed.cave}. A associação deste mob ao bioma vem do mapa de Spawn Eggs do próprio código 2.0.10; altura, horário e microestrutura ficam omitidos quando não foram confirmados.`,
    health: attrs?.health,
    attack: attrs?.attack,
    taming: tame?.text,
    drops: [],
    notes: [
      ...(attrs?.note ? [attrs.note] : []),
      "Drops ficam vazios neste card quando a loot table/mecânica não foi auditada individualmente; vazio aqui significa não confirmado, não 'não dropa nada'.",
      "O nível de perigo segue a escala já aprovada da Progressão para o bioma/encontro, não é um atributo do mod.",
    ],
    track: tame ? ["seen", "defeated", "tamed"] : ["seen", "defeated"],
    status: "confirmado (1 fonte)",
    imageUrl: `${RAW}/src/main/resources/assets/alexscaves/textures/entity/${texture}.png`,
    imageAlt: `Textura oficial de ${seed.name}`,
    imageSourceUrl: TEXTURE_DIR,
    sources,
  };
});
