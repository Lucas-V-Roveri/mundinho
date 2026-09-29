import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "8fb0cd3f4ed556eb53336ed03ba6000d997b858d";
const SOURCE_ROOT = `https://github.com/SmartStreamLabs/The-Graveyard-Unofficial-Port-/blob/${SOURCE_COMMIT}`;
const REGISTRY_URL = `${SOURCE_ROOT}/src/main/java/com/finallion/graveyard/init/TGEntities.java`;
const LANG_URL = `${SOURCE_ROOT}/src/main/resources/assets/graveyard/lang/en_us.json`;
const LICH_URL = `${SOURCE_ROOT}/src/main/java/com/finallion/graveyard/entities/LichEntity.java`;
const README_URL = `${SOURCE_ROOT}/README.txt`;
const FILE_URL = "https://www.curseforge.com/minecraft/mc-mods/the-graveyard-unofficial-port/files/8213402";
const GUIDE_HREF = "/mods#guide-graveyard";

const BASE_SOURCES: BestiaryEntry["sources"] = [
  {
    label: "The Graveyard 2.6.2 · TGEntities.java",
    href: REGISTRY_URL,
    note: "registry da revisão do port: 13 entidades vivas de gameplay + Skull como projétil MISC",
  },
  {
    label: "The Graveyard · en_us.json",
    href: LANG_URL,
    note: "nomes oficiais, subtitles e advancements usados para descrever o boss e o Ghouling",
  },
  {
    label: "graveyard-2.6.2 NeoForge 1.21.1.jar · CurseForge",
    href: FILE_URL,
    note: "arquivo publicado para Minecraft 1.21.1 / NeoForge",
  },
];

type CompactSpec = {
  id: string;
  name: string;
  category: string;
  behavior: string;
  danger?: BestiaryEntry["danger"];
  summary: string;
  track?: BestiaryEntry["track"];
  note?: string;
};

function compact(spec: CompactSpec): BestiaryEntry {
  return {
    id: `graveyard-${spec.id.replaceAll("_", "-")}`,
    namePt: spec.name,
    nameEn: spec.name,
    mod: "The Graveyard",
    version: "2.6.2 · graveyard-2.6.2 NeoForge 1.21.1.jar",
    registryId: `graveyard:${spec.id}`,
    depth: "compact",
    category: spec.category,
    behavior: spec.behavior,
    danger: spec.danger ?? "Médio",
    summary: spec.summary,
    dimensions: [],
    locations: [],
    howToFind: "O registry 2.6.2 confirma a entidade; este card não fixa estrutura, bioma ou taxa de spawn sem uma regra versionada específica.",
    drops: [],
    notes: [
      spec.note ??
        "Registry e idioma oficial confirmam a criatura; atributos, loot e spawn não são extrapolados sem fonte direta da build.",
    ],
    track: spec.track ?? ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: BASE_SOURCES,
  };
}

const COMPACT_ENTRIES: BestiaryEntry[] = [
  compact({
    id: "skeleton_creeper",
    name: "Skeleton Creeper",
    category: "Morto-vivo explosivo",
    behavior: "Hostil · registrado como MONSTER",
    summary: "Variante esquelética de creeper registrada como uma das criaturas próprias de The Graveyard.",
  }),
  compact({
    id: "acolyte",
    name: "Acolyte",
    category: "Cultista",
    behavior: "Hostil · registrado como MONSTER",
    summary: "Humanoide hostil ligado ao conjunto de encontros e estruturas de The Graveyard.",
  }),
  compact({
    id: "reaper",
    name: "Reaper",
    category: "Morto-vivo",
    behavior: "Hostil · registrado como MONSTER",
    summary: "Criatura hostil do bestiário de The Graveyard, com entidade própria no registry 2.6.2.",
  }),
  compact({
    id: "ghoul",
    name: "Ghoul",
    category: "Morto-vivo",
    behavior: "Hostil · registrado como MONSTER",
    summary: "Ghoul é uma das criaturas centrais do mod e aparece explicitamente entre os mobs destacados pela documentação do port.",
  }),
  compact({
    id: "nightmare",
    name: "Nightmare",
    category: "Morto-vivo",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Alto",
    summary: "Nightmare é uma criatura hostil do mod; o advancement oficial registra inclusive um desafio de derrotá-la enquanto o jogador está sob Blindness.",
  }),
  compact({
    id: "revenant",
    name: "Revenant",
    category: "Morto-vivo",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Alto",
    summary: "Revenant é uma entidade hostil própria de The Graveyard, confirmada pelo registry e pelo arquivo de idioma.",
  }),
  compact({
    id: "falling_corpse",
    name: "Falling Corpse",
    category: "Invocação / morto-vivo",
    behavior: "Hostil · registrado como MONSTER",
    summary: "Entidade viva usada pela linha de combate do Corrupted Champion; entra porque possui atributos próprios e não é apenas um projétil visual.",
  }),
  compact({
    id: "wraith",
    name: "Wraith",
    category: "Espectro",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Alto",
    summary: "Espectro hostil de The Graveyard. O advancement oficial registra sua invocação ao profanar um coffin.",
    note: "O advancement “Taking from the Dead” confirma a interação de invocação por coffin; o card não presume que isso seja a única forma de encontrá-lo.",
  }),
  compact({
    id: "corrupted_pillager",
    name: "Corrupted Pillager",
    category: "Illager corrompido",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Alto",
    summary: "Variante corrompida de Pillager registrada como entidade própria no mod.",
  }),
  compact({
    id: "corrupted_vindicator",
    name: "Corrupted Vindicator",
    category: "Illager corrompido",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Alto",
    summary: "Variante corrompida de Vindicator registrada como entidade própria no mod.",
  }),
  compact({
    id: "ghouling",
    name: "Ghouling",
    category: "Servo invocado",
    behavior: "CREATURE · leal ao jogador que o invoca",
    danger: "Baixo",
    summary: "Servo invocado pelo Bone Staff. A documentação do próprio port diz que ele segue e teleporta até o mestre e pode ser re-invocado após morrer.",
    track: ["seen", "defeated", "tamed"],
    note: "README do port confirma vínculo ao jogador que primeiro usa o staff; o estado “tamed” do Bestiário representa esse vínculo de dono.",
  }),
  compact({
    id: "nameless_hanged",
    name: "Nameless Hanged",
    category: "NPC sobrenatural",
    behavior: "CREATURE · interativo",
    danger: "Baixo",
    summary: "Entidade interativa do mod. O idioma oficial contém falas e subtitles próprios para sua interação.",
    note: "O arquivo de idioma confirma que interage com o jogador e possui comportamento específico de horário; detalhes de trade ficam no guia, não são duplicados aqui.",
  }),
];

const LICH: BestiaryEntry = {
  id: "graveyard-corrupted-champion",
  namePt: "Corrupted Champion",
  nameEn: "Corrupted Champion",
  mod: "The Graveyard",
  version: "2.6.2 · graveyard-2.6.2 NeoForge 1.21.1.jar",
  registryId: "graveyard:lich",
  depth: "full",
  category: "Chefe · Lich",
  behavior: "Hostil · MONSTER · boss bar · combate em múltiplas fases com períodos de invulnerabilidade",
  danger: "Severo",
  summary: "Boss principal de The Graveyard. O código e os subtitles oficiais confirmam três fases, transições protegidas, invocações, skulls e feitiços.",
  dimensions: [],
  locations: ["Lich Prison / altar do Lich"],
  howToFind: "O advancement oficial exige encontrar o altar do Lich e invocá-lo à noite usando um vial de sangue cheio e os três fragmentos do Bone Staff. O marco correspondente é progression:620.",
  interaction: "Encontro deliberado por ritual; o código mantém timers de invulnerabilidade de spawn/transição e estados separados para as três fases.",
  drops: [],
  notes: [
    "O registry usa graveyard:lich, mas o nome exibido oficial é “Corrupted Champion”.",
    "Vida e parâmetros de combate são lidos da GraveyardConfig em partes da luta; o card evita congelar números que podem variar no pack.",
    "O source tree público 2.6.2 usado para o registry já teve o alvo de Minecraft atualizado para uma linha mais nova; o JAR 1.21.1 exato é confirmado separadamente pela página de arquivo do CurseForge.",
  ],
  track: ["seen", "defeated"],
  status: "confirmado (2+ fontes)",
  guideHref: GUIDE_HREF,
  progressionHref: "/progressao#progression:620",
  sources: [
    ...BASE_SOURCES,
    {
      label: "LichEntity.java",
      href: LICH_URL,
      note: "boss bar, fases, invulnerabilidade, spells e valores lidos da configuração",
    },
    {
      label: "README · Ghouling / boss reward",
      href: README_URL,
      note: "documentação do port sobre a linha pós-boss e o Ghouling",
    },
  ],
};

export const GRAVEYARD_BESTIARY_5E: BestiaryEntry[] = [LICH, ...COMPACT_ENTRIES];
export const GRAVEYARD_BESTIARY_5E_COUNT = GRAVEYARD_BESTIARY_5E.length;
export const GRAVEYARD_BESTIARY_5E_FULL = GRAVEYARD_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const GRAVEYARD_BESTIARY_5E_COMPACT = GRAVEYARD_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
