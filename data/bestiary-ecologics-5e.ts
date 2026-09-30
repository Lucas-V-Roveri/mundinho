import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "cfd79749690ac87228da05d5e0930f8b48efa669";
const SOURCE_ROOT = `https://github.com/samedifferent/Ecologics/blob/${SOURCE_COMMIT}`;
const REGISTRY_URL = `${SOURCE_ROOT}/common/src/main/java/samebutdifferent/ecologics/registry/ModEntityTypes.java`;
const PENGUIN_SPAWN_URL = `${SOURCE_ROOT}/forge/src/main/resources/data/ecologics/forge/biome_modifier/spawn_penguin.json`;
const PROJECT_URL = "https://www.curseforge.com/minecraft/mc-mods/ecologics";

const BASE_SOURCES: BestiaryEntry["sources"] = [
  {
    label: "Ecologics · ModEntityTypes.java",
    href: REGISTRY_URL,
    note: "registry oficial confirma Penguin e Squirrel como EntityTypes próprios do namespace ecologics",
  },
  {
    label: "Ecologics 2.3.7 · CurseForge",
    href: PROJECT_URL,
    note: "arquivo oficial para Minecraft 1.21.1 / NeoForge e galeria do projeto com Penguins e Squirrels",
  },
];

const PENGUIN: BestiaryEntry = {
  id: "ecologics-penguin",
  namePt: "Penguin",
  nameEn: "Penguin",
  mod: "Ecologics",
  version: "2.3.7 · NeoForge 1.21.1",
  registryId: "ecologics:penguin",
  depth: "compact",
  category: "Animal",
  behavior: "Passivo · Animal · pode caçar/pegar peixes",
  danger: "Baixo",
  summary: "Penguin é uma criatura própria de Ecologics. O código e os dados oficiais confirmam seu EntityType e regras de spawn dedicadas.",
  dimensions: ["Overworld"],
  locations: ["Snowy Plains"],
  howToFind: "O biome modifier oficial adiciona ecologics:penguin em minecraft:snowy_plains, em grupos de 4–5 na revisão auditada.",
  drops: [],
  notes: [
    "O projeto também mantém tags próprias para itens que atraem Penguins e para seus alvos de caça.",
    "Loot e atributos numéricos não são duplicados sem necessidade; o objetivo aqui é identificação e localização confiável.",
  ],
  track: ["seen"],
  status: "confirmado (2+ fontes)",
  sources: [
    ...BASE_SOURCES,
    {
      label: "Ecologics · spawn_penguin.json",
      href: PENGUIN_SPAWN_URL,
      note: "confirma ecologics:penguin em Snowy Plains",
    },
  ],
};

const SQUIRREL: BestiaryEntry = {
  id: "ecologics-squirrel",
  namePt: "Squirrel",
  nameEn: "Squirrel",
  mod: "Ecologics",
  version: "2.3.7 · NeoForge 1.21.1",
  registryId: "ecologics:squirrel",
  depth: "compact",
  category: "Animal",
  behavior: "Passivo · Animal",
  danger: "Baixo",
  summary: "Squirrel é uma criatura própria de Ecologics, registrada separadamente e integrada às mecânicas de nozes/itens de atração do mod.",
  dimensions: ["Overworld"],
  locations: [],
  howToFind: "O registry confirma a criatura, mas este card não congela bioma ou taxa de spawn sem o biome modifier exato da build 2.3.7 em mãos.",
  drops: [],
  notes: [
    "O código oficial mantém a tag squirrel_tempt_items, confirmando a interação com alimentos apropriados.",
    "O card evita extrapolar local de spawn apenas a partir de screenshots ou versões antigas.",
  ],
  track: ["seen"],
  status: "confirmado (2+ fontes)",
  sources: BASE_SOURCES,
};

export const ECOLOGICS_BESTIARY_5E: BestiaryEntry[] = [PENGUIN, SQUIRREL];
export const ECOLOGICS_BESTIARY_5E_COUNT = ECOLOGICS_BESTIARY_5E.length;
export const ECOLOGICS_BESTIARY_5E_FULL = ECOLOGICS_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const ECOLOGICS_BESTIARY_5E_COMPACT = ECOLOGICS_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
