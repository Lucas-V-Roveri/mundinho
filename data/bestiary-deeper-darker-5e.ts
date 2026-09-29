import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "f7ba235d078411a1165a8cac184adfe0ccc8cebe";
const SOURCE_ROOT = `https://github.com/KyaniteMods/DeeperAndDarker/blob/${SOURCE_COMMIT}`;
const REGISTRY_URL = `${SOURCE_ROOT}/src/main/java/com/kyanite/deeperdarker/content/DDEntities.java`;
const ITEMS_URL = `${SOURCE_ROOT}/src/main/java/com/kyanite/deeperdarker/content/DDItems.java`;
const ADVANCEMENT_URL = `${SOURCE_ROOT}/src/generated/resources/data/deeperdarker/advancement/main/kill_all_sculk_mobs.json`;
const LANG_EN_URL = `${SOURCE_ROOT}/src/main/resources/assets/deeperdarker/lang/en_gb.json`;
const LANG_PT_URL = `${SOURCE_ROOT}/src/main/resources/assets/deeperdarker/lang/pt_br.json`;
const ANGLER_URL = `${SOURCE_ROOT}/src/main/java/com/kyanite/deeperdarker/content/entities/AnglerFish.java`;
const OVERCAST_POT_URL = `${SOURCE_ROOT}/src/main/java/com/kyanite/deeperdarker/content/entities/OvercastPot.java`;
const STALKER_URL = `${SOURCE_ROOT}/src/main/java/com/kyanite/deeperdarker/content/entities/Stalker.java`;
const GUIDE_HREF = "/mods#guide-deeper-darker";

const BASE_SOURCES: BestiaryEntry["sources"] = [
  {
    label: "Deeper and Darker 1.4.1 · DDEntities.java",
    href: REGISTRY_URL,
    note: "registry literal da revisão f7ba235d; dois barcos MISC ficam fora e restam 11 criaturas registradas",
  },
  {
    label: "Deeper and Darker 1.4.1 · DDItems.java",
    href: ITEMS_URL,
    note: "as mesmas 11 criaturas possuem Spawn Egg registrado na build auditada",
  },
  {
    label: "Deeper and Darker 1.4.1 · kill_all_sculk_mobs.json",
    href: ADVANCEMENT_URL,
    note: "critério auxiliar de gameplay; os três Overcast Pots foram removidos temporariamente deste advancement no commit auditado",
  },
  {
    label: "Deeper and Darker 1.4.1 · en_gb.json",
    href: LANG_EN_URL,
    note: "nomes oficiais em inglês quando existe chave de entidade nessa revisão",
  },
  {
    label: "Deeper and Darker 1.4.1 · pt_br.json",
    href: LANG_PT_URL,
    note: "traduções oficiais em português quando existe chave de entidade nessa revisão",
  },
];

function sources(...extra: BestiaryEntry["sources"]): BestiaryEntry["sources"] {
  return [...BASE_SOURCES, ...extra];
}

type CompactSpec = {
  id: string;
  namePt: string;
  nameEn: string;
  category?: string;
  behavior?: string;
  danger?: BestiaryEntry["danger"];
  health?: string;
  attack?: string;
  note?: string;
  extraSource?: BestiaryEntry["sources"][number];
};

function compact(spec: CompactSpec): BestiaryEntry {
  return {
    id: `deeper-darker-${spec.id.replaceAll("_", "-")}`,
    namePt: spec.namePt,
    nameEn: spec.nameEn,
    mod: "Deeper and Darker",
    version: "1.4.1 · pack 1.21.1 NeoForge",
    registryId: `deeperdarker:${spec.id}`,
    depth: "compact",
    category: spec.category ?? "Monstro de sculk",
    behavior: spec.behavior ?? "Hostil · registrado como MONSTER",
    danger: spec.danger ?? "Médio",
    summary: `${spec.namePt} é uma criatura registrada na build 1.4.1 de Deeper and Darker e possui Spawn Egg próprio. O card evita afirmar spawn natural, drops ou mecânicas finas sem evidência versionada específica.`,
    dimensions: [],
    locations: [],
    howToFind: "A build 1.4.1 confirma a entidade e seu Spawn Egg; a distribuição natural por dimensão, bioma ou estrutura não é fixada neste card sem uma fonte versionada específica.",
    ...(spec.health ? { health: spec.health } : {}),
    ...(spec.attack ? { attack: spec.attack } : {}),
    drops: [],
    notes: [
      spec.note ?? "Registry + Spawn Egg confirmam a criatura; localização natural e drops ficam sem afirmação neste lote.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: spec.extraSource ? sources(spec.extraSource) : sources(),
  };
}

const COMPACT_ENTRIES: BestiaryEntry[] = [
  compact({
    id: "angler_fish",
    namePt: "Peixe-pescador cru",
    nameEn: "Angler Fish",
    category: "Fauna aquática hostil",
    behavior: "Aquático e hostil dentro d'água · registrado como WATER_CREATURE",
    danger: "Médio",
    health: "6 HP",
    attack: "3 de dano base",
    note: "A classe AnglerFish caça jogadores que estejam na água, além de bacalhaus e salmões. O nome PT-BR reproduz literalmente a chave oficial entity.deeperdarker.angler_fish da revisão auditada.",
    extraSource: { label: "AnglerFish.java", href: ANGLER_URL, note: "IA hostil na água, 6 HP e 3 de dano base" },
  }),
  compact({
    id: "anger_pot",
    namePt: "Anger Pot",
    nameEn: "Anger Pot",
    category: "Monstro / Overcast Pot",
    behavior: "Hostil · OvercastPot estende Monster, persegue jogador e usa ataque corpo a corpo",
    attack: "5 de dano base",
    note: "Não há chave de entidade para Anger Pot nos arquivos pt_br/en_gb auditados; o card preserva o nome canônico do registry. O commit f7ba235d removeu temporariamente os pots do advancement, mas a entidade e o Spawn Egg continuam registrados.",
    extraSource: { label: "OvercastPot.java", href: OVERCAST_POT_URL, note: "classe Monster com target de Player e ataque corpo a corpo" },
  }),
  compact({
    id: "fear_pot",
    namePt: "Fear Pot",
    nameEn: "Fear Pot",
    category: "Monstro / Overcast Pot",
    behavior: "Hostil · OvercastPot estende Monster, persegue jogador e usa ataque corpo a corpo",
    attack: "5 de dano base",
    note: "Não há chave de entidade para Fear Pot nos arquivos pt_br/en_gb auditados; o card preserva o nome canônico do registry. O commit f7ba235d removeu temporariamente os pots do advancement, mas a entidade e o Spawn Egg continuam registrados.",
    extraSource: { label: "OvercastPot.java", href: OVERCAST_POT_URL, note: "classe Monster com target de Player e ataque corpo a corpo" },
  }),
  compact({
    id: "sorrow_pot",
    namePt: "Sorrow Pot",
    nameEn: "Sorrow Pot",
    category: "Monstro / Overcast Pot",
    behavior: "Hostil · OvercastPot estende Monster, persegue jogador e usa ataque corpo a corpo",
    attack: "5 de dano base",
    note: "Não há chave de entidade para Sorrow Pot nos arquivos pt_br/en_gb auditados; o card preserva o nome canônico do registry. O commit f7ba235d removeu temporariamente os pots do advancement, mas a entidade e o Spawn Egg continuam registrados.",
    extraSource: { label: "OvercastPot.java", href: OVERCAST_POT_URL, note: "classe Monster com target de Player e ataque corpo a corpo" },
  }),
  compact({ id: "sculk_centipede", namePt: "Centopeia de sculk", nameEn: "Sculk Centipede" }),
  compact({ id: "sculk_leech", namePt: "Sanguessuga de sculk", nameEn: "Sculk Leech" }),
  compact({ id: "sculk_snapper", namePt: "Agarrador de sculk", nameEn: "Sculk Snapper" }),
  compact({ id: "shattered", namePt: "Estilhaçado", nameEn: "Shattered" }),
  compact({ id: "shriek_worm", namePt: "Minhoca sonora", nameEn: "Shriek Worm" }),
  compact({
    id: "sludge",
    namePt: "Gosma",
    nameEn: "Sludge",
    note: "Sludge está no registry e possui Spawn Egg na build 1.4.1, embora não faça parte do critério kill_all_sculk_mobs dessa revisão.",
  }),
];

const FULL_ENTRIES: BestiaryEntry[] = [
  {
    id: "deeper-darker-stalker",
    namePt: "Stalker",
    nameEn: "Stalker",
    mod: "Deeper and Darker",
    version: "1.4.1 · pack 1.21.1 NeoForge",
    registryId: "deeperdarker:stalker",
    depth: "full",
    category: "Chefe / Ancient Temple",
    behavior: "Hostil · Monster com boss bar, percepção por vibrações, ataque corpo a corpo e ataque em área",
    danger: "Severo",
    summary: "Criatura central do Ancient Temple e marco de Progressão do Deeper and Darker. A classe 1.4.1 usa boss bar, reage a vibrações e alterna pressão corpo a corpo com um ataque em área que também invoca Sculk Leeches.",
    dimensions: ["Otherside"],
    locations: ["Ancient Temple"],
    howToFind: "Após abrir o portal e entrar no Otherside (progression:580), explorar um Ancient Temple até o encontro do Stalker em progression:590.",
    health: "200 HP",
    attack: "22 de dano base no ataque principal; o ataque em área aplica 2 de dano por acerto na implementação auditada",
    interaction: "Escuta eventos de vibração em raio 20 e pode transformar a origem da perturbação em alvo. Durante o ataque em área, pode gerar de 1 a 3 Sculk Leeches em pulsos.",
    drops: [],
    notes: [
      "O registry classifica Stalker como MONSTER e DDItems registra Spawn Egg próprio.",
      "O advancement kill_all_sculk_mobs inclui Stalker na revisão auditada.",
      "Nenhum drop é afirmado aqui sem loot table versionada confirmada neste lote.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:590",
    sources: sources({ label: "Stalker.java", href: STALKER_URL, note: "boss bar, 200 HP, 22 de ataque, vibrações e ataque em área" }),
  },
];

export const DEEPER_DARKER_BESTIARY_5E: BestiaryEntry[] = [...FULL_ENTRIES, ...COMPACT_ENTRIES];
export const DEEPER_DARKER_BESTIARY_5E_COUNT = DEEPER_DARKER_BESTIARY_5E.length;
export const DEEPER_DARKER_BESTIARY_5E_FULL = DEEPER_DARKER_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const DEEPER_DARKER_BESTIARY_5E_COMPACT = DEEPER_DARKER_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
