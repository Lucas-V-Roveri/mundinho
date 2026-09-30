import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "18eedfd4a5d1c2e28cc7fc028e4a58ade3f0308d";
const SOURCE_ROOT = `https://github.com/Luke100000/minecraft-comes-alive/blob/${SOURCE_COMMIT}`;
const LANG_URL = `${SOURCE_ROOT}/common/src/main/resources/assets/mca/lang/en_us.json`;
const REPO_URL = `https://github.com/Luke100000/minecraft-comes-alive/tree/${SOURCE_COMMIT}`;

const BASE_SOURCES: BestiaryEntry["sources"] = [
  {
    label: "MCA Reborn 1.21.1 · código oficial",
    href: REPO_URL,
    note: "branch 1.21.1 usada para reconciliar os tipos especiais do inventário aprovado",
  },
  {
    label: "MCA Reborn · en_us.json",
    href: LANG_URL,
    note: "confirma mca:grim_reaper, os tipos MCA de villager/zombie villager e as mecânicas de Scythe/Staff of Life com tombstones",
  },
];

const GRIM_REAPER: BestiaryEntry = {
  id: "mca-grim-reaper",
  namePt: "Grim Reaper",
  nameEn: "Grim Reaper",
  mod: "Minecraft Comes Alive Reborn",
  version: "7.7.36-beta.3+1.21.1",
  registryId: "mca:grim_reaper",
  depth: "full",
  category: "Chefe / entidade sobrenatural",
  behavior: "Hostil · entidade própria do MCA",
  danger: "Severo",
  summary: "Entidade sobrenatural própria do MCA Reborn. O idioma oficial registra tanto mca:grim_reaper quanto seu Spawn Egg, confirmando que não é apenas uma skin ou profissão de villager.",
  dimensions: [],
  locations: [],
  howToFind: "O card não fixa um local de spawn universal: o MCA controla a aparição do Grim Reaper por sua própria lógica de ReaperSpawner.",
  drops: [],
  notes: [
    "Registry lógico confirmado por entity.mca.grim_reaper e item.mca.grim_reaper_spawn_egg na build 1.21.1.",
    "Atributos, loot e condições exatas de aparição não são congelados aqui sem uma regra versionada específica da build instalada.",
  ],
  track: ["seen", "defeated"],
  status: "confirmado (2+ fontes)",
  sources: BASE_SOURCES,
};

const RAIDER: BestiaryEntry = {
  id: "mca-raider",
  namePt: "Raider",
  nameEn: "Raider",
  mod: "Minecraft Comes Alive Reborn",
  version: "7.7.36-beta.3+1.21.1",
  registryId: "mca:male_villager / mca:female_villager",
  depth: "compact",
  category: "Villager especial / raider",
  behavior: "Hostil · variante lógica de villager MCA, não EntityType mca:raider separado",
  danger: "Alto",
  summary: "Raider é tratado pelo MCA como um tipo especial de villager no gameplay, sem um EntityType próprio chamado mca:raider. O card representa o encontro conceitual aprovado sem fabricar um registry inexistente.",
  dimensions: [],
  locations: [],
  howToFind: "A fonte 1.21.1 confirma que os villagers MCA usam os tipos base masculino/feminino; o card não inventa uma regra de spawn específica para Raiders.",
  drops: [],
  notes: [
    "Os tipos base publicados pelo MCA são mca:male_villager e mca:female_villager.",
    "O nome Raider é mantido como alvo conceitual do inventário aprovado; não existe evidência para publicar mca:raider como EntityType independente.",
  ],
  track: ["seen", "defeated"],
  status: "confirmado (1 fonte)",
  sources: BASE_SOURCES,
};

const REVIVE_TOMBSTONE: BestiaryEntry = {
  id: "mca-villager-revive-tombstone",
  namePt: "Villager Revive Tombstone",
  nameEn: "Villager Revive Tombstone",
  mod: "Minecraft Comes Alive Reborn",
  version: "7.7.36-beta.3+1.21.1",
  registryId: "mca:male_zombie_villager / mca:female_zombie_villager",
  depth: "compact",
  category: "Encontro de ressurreição / zombie villager MCA",
  behavior: "Mecânica de tombstone · resultado da ressurreição pode retornar como morto-vivo",
  danger: "Médio",
  summary: "Entrada conceitual para a mecânica aprovada de reviver villagers em tombstones. O próprio tooltip da Scythe diz que a alma pode ser usada num tombstone e que o villager caído se ergue como undead.",
  dimensions: [],
  locations: ["Tombstones do MCA"],
  howToFind: "Use a mecânica de morte/ressurreição do MCA associada a tombstones. O Bestiário registra o resultado jogável sem fingir que existe uma entidade chamada mca:villager_revive_tombstone.",
  interaction: "A Scythe captura a alma de um villager morto; Staff of Life/itens de ressurreição interagem com tombstones segundo os tooltips oficiais.",
  drops: [],
  notes: [
    "O resultado morto-vivo usa os tipos MCA mca:male_zombie_villager e mca:female_zombie_villager.",
    "O tombstone em si é bloco/mecânica, não um EntityType; por isso o registryId do card aponta para os tipos vivos resultantes, não para um ID fictício.",
  ],
  track: ["seen", "defeated"],
  status: "confirmado (1 fonte)",
  sources: BASE_SOURCES,
};

export const MCA_BESTIARY_5E: BestiaryEntry[] = [GRIM_REAPER, RAIDER, REVIVE_TOMBSTONE];
export const MCA_BESTIARY_5E_COUNT = MCA_BESTIARY_5E.length;
export const MCA_BESTIARY_5E_FULL = MCA_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const MCA_BESTIARY_5E_COMPACT = MCA_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
