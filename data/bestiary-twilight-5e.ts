import type { BestiaryDrop, BestiaryEntry, BestiaryEntryDepth } from "@/types/bestiary";

type RegistryCategory = "MONSTER" | "CREATURE";
type TwilightSeed = {
  id: string;
  name: string;
  registryCategory: RegistryCategory;
  depth: BestiaryEntryDepth;
};

const SOURCE_COMMIT = "008085c660f1f9fc9aad6376ea0dc8080b3c0629";
const REGISTRY_URL = `https://github.com/TeamTwilight/twilightforest/blob/${SOURCE_COMMIT}/src/main/java/twilightforest/init/TFEntities.java`;
const LANG_URL = `https://github.com/TeamTwilight/twilightforest/blob/${SOURCE_COMMIT}/src/generated/resources/assets/twilightforest/lang/en_us.json`;
const RELEASE_URL = "https://www.curseforge.com/minecraft/mc-mods/the-twilight-forest/files/7797302";

const TWILIGHT_SEEDS: TwilightSeed[] = [
  { id: "adherent", name: "Adherent", registryCategory: "MONSTER", depth: "compact" },
  { id: "alpha_yeti", name: "Alpha Yeti", registryCategory: "MONSTER", depth: "full" },
  { id: "armored_giant", name: "Armored Giant", registryCategory: "MONSTER", depth: "compact" },
  { id: "bighorn_sheep", name: "Bighorn Sheep", registryCategory: "CREATURE", depth: "compact" },
  { id: "blockchain_goblin", name: "Block and Chain Goblin", registryCategory: "MONSTER", depth: "compact" },
  { id: "boar", name: "Boar", registryCategory: "CREATURE", depth: "compact" },
  { id: "carminite_broodling", name: "Carminite Broodling", registryCategory: "MONSTER", depth: "compact" },
  { id: "carminite_ghastguard", name: "Carminite Ghastguard", registryCategory: "MONSTER", depth: "compact" },
  { id: "carminite_ghastling", name: "Carminite Ghastling", registryCategory: "MONSTER", depth: "compact" },
  { id: "carminite_golem", name: "Carminite Golem", registryCategory: "MONSTER", depth: "compact" },
  { id: "death_tome", name: "Death Tome", registryCategory: "MONSTER", depth: "compact" },
  { id: "deer", name: "Deer", registryCategory: "CREATURE", depth: "compact" },
  { id: "dwarf_rabbit", name: "Dwarf Rabbit", registryCategory: "CREATURE", depth: "compact" },
  { id: "fire_beetle", name: "Fire Beetle", registryCategory: "MONSTER", depth: "compact" },
  { id: "giant_miner", name: "Giant Miner", registryCategory: "MONSTER", depth: "compact" },
  { id: "harbinger_cube", name: "Harbinger Cube", registryCategory: "MONSTER", depth: "compact" },
  { id: "hedge_spider", name: "Hedge Spider", registryCategory: "MONSTER", depth: "compact" },
  { id: "helmet_crab", name: "Helmet Crab", registryCategory: "MONSTER", depth: "compact" },
  { id: "hostile_wolf", name: "Hostile Wolf", registryCategory: "MONSTER", depth: "compact" },
  { id: "hydra", name: "Hydra", registryCategory: "MONSTER", depth: "full" },
  { id: "ice_crystal", name: "Ice Crystal", registryCategory: "MONSTER", depth: "compact" },
  { id: "king_spider", name: "King Spider", registryCategory: "MONSTER", depth: "compact" },
  { id: "knight_phantom", name: "Knight Phantom", registryCategory: "MONSTER", depth: "full" },
  { id: "kobold", name: "Kobold", registryCategory: "MONSTER", depth: "compact" },
  { id: "lich", name: "Twilight Lich", registryCategory: "MONSTER", depth: "full" },
  { id: "lich_minion", name: "Lich Minion", registryCategory: "MONSTER", depth: "compact" },
  { id: "lower_goblin_knight", name: "Lower Goblin Knight", registryCategory: "MONSTER", depth: "compact" },
  { id: "loyal_zombie", name: "Loyal Zombie", registryCategory: "MONSTER", depth: "compact" },
  { id: "maze_slime", name: "Maze Slime", registryCategory: "MONSTER", depth: "compact" },
  { id: "minoshroom", name: "Minoshroom", registryCategory: "MONSTER", depth: "full" },
  { id: "minotaur", name: "Minotaur", registryCategory: "MONSTER", depth: "compact" },
  { id: "mist_wolf", name: "Mist Wolf", registryCategory: "MONSTER", depth: "compact" },
  { id: "mosquito_swarm", name: "Mosquito Swarm", registryCategory: "MONSTER", depth: "compact" },
  { id: "naga", name: "Naga", registryCategory: "MONSTER", depth: "full" },
  { id: "penguin", name: "Penguin", registryCategory: "CREATURE", depth: "compact" },
  { id: "pinch_beetle", name: "Pinch Beetle", registryCategory: "MONSTER", depth: "compact" },
  { id: "quest_ram", name: "Questing Ram", registryCategory: "CREATURE", depth: "full" },
  { id: "raven", name: "Raven", registryCategory: "CREATURE", depth: "compact" },
  { id: "redcap", name: "Redcap", registryCategory: "MONSTER", depth: "compact" },
  { id: "redcap_sapper", name: "Redcap Sapper", registryCategory: "MONSTER", depth: "compact" },
  { id: "rising_zombie", name: "Zombie", registryCategory: "MONSTER", depth: "compact" },
  { id: "roving_cube", name: "Roving Cube", registryCategory: "MONSTER", depth: "compact" },
  { id: "skeleton_druid", name: "Skeleton Druid", registryCategory: "MONSTER", depth: "compact" },
  { id: "slime_beetle", name: "Slime Beetle", registryCategory: "MONSTER", depth: "compact" },
  { id: "snow_guardian", name: "Snow Guardian", registryCategory: "MONSTER", depth: "compact" },
  { id: "snow_queen", name: "Snow Queen", registryCategory: "MONSTER", depth: "full" },
  { id: "squirrel", name: "Squirrel", registryCategory: "CREATURE", depth: "compact" },
  { id: "stable_ice_core", name: "Stable Ice Core", registryCategory: "MONSTER", depth: "compact" },
  { id: "swarm_spider", name: "Swarm Spider", registryCategory: "MONSTER", depth: "compact" },
  { id: "tiny_bird", name: "Tiny Bird", registryCategory: "CREATURE", depth: "compact" },
  { id: "towerwood_borer", name: "Towerwood Borer", registryCategory: "MONSTER", depth: "compact" },
  { id: "troll", name: "Troll", registryCategory: "MONSTER", depth: "compact" },
  { id: "unstable_ice_core", name: "Unstable Ice Core", registryCategory: "MONSTER", depth: "compact" },
  { id: "upper_goblin_knight", name: "Upper Goblin Knight", registryCategory: "MONSTER", depth: "compact" },
  { id: "ur_ghast", name: "Ur-Ghast", registryCategory: "MONSTER", depth: "full" },
  { id: "winter_wolf", name: "Winter Wolf", registryCategory: "MONSTER", depth: "compact" },
  { id: "wraith", name: "Wraith", registryCategory: "MONSTER", depth: "compact" },
  { id: "yeti", name: "Yeti", registryCategory: "MONSTER", depth: "compact" },
];

type FullOverride = Partial<Omit<BestiaryEntry, "id" | "namePt" | "nameEn" | "mod" | "version" | "registryId" | "depth" | "sources">> & {
  drops?: BestiaryDrop[];
  sources?: BestiaryEntry["sources"];
};

const BOSS_SOURCE = {
  label: "Mundinho · auditoria versionada do Twilight Forest",
  href: "https://github.com/Lucas-V-Roveri/mundinho/blob/main/data/wiki-catalog.ts",
  note: "localização, progressão e utilidade de drops já auditadas para o pack 1.21.1",
};

const FULL_OVERRIDES: Record<string, FullOverride> = {
  naga: {
    category: "Chefe",
    behavior: "Hostil / chefe de progressão",
    danger: "Alto",
    summary: "Chefe da Naga Courtyard. A derrota faz parte da cadeia de progressão do Twilight Forest e libera o caminho para a Lich Tower.",
    dimensions: ["Twilight Forest"],
    locations: ["Naga Courtyard"],
    howToFind: "Na Twilight Forest, procure uma Naga Courtyard em biomas de floresta. As fontes auditadas tratam o encontro como natural da arena, sem item de invocação na rota normal.",
    drops: [
      { namePt: "Escama de Naga", nameEn: "Naga Scale", use: "Material da Naga e marco de progressão usado para avançar até a Lich Tower.", useConfidence: "Alta" },
      { namePt: "Troféu da Naga", nameEn: "Naga Trophy", use: "Troféu do boss; também pode entrar no padrão de estandarte da Naga nas receitas versionadas do mod.", useConfidence: "Alta" },
    ],
    progressionHref: "/progressao#progression:340",
    sources: [BOSS_SOURCE],
  },
  lich: {
    category: "Chefe",
    behavior: "Hostil / chefe de progressão",
    danger: "Alto",
    summary: "Chefe da Lich Tower. A recompensa principal inclui cetros mágicos e o encontro é um marco obrigatório da progressão padrão.",
    dimensions: ["Twilight Forest"],
    locations: ["Lich Tower"],
    howToFind: "Encontrado na Lich Tower, na Twilight Forest. As fontes de progressão não documentam item de invocação para a rota normal.",
    drops: [
      { namePt: "Cetro do Crepúsculo", nameEn: "Scepter of Twilight", use: "Cetro mágico que dispara projéteis.", useConfidence: "Alta" },
      { namePt: "Cetro de Drenagem de Vida", nameEn: "Scepter of Life Draining", use: "Cetro que drena vida de inimigos para curar o jogador.", useConfidence: "Alta" },
      { namePt: "Cetro Zumbi", nameEn: "Zombie Scepter", use: "Cetro associado ao loot do Twilight Lich; números e efeito detalhado não foram fixados sem fonte versionada suficiente.", useConfidence: "Média" },
      { namePt: "Troféu do Twilight Lich", nameEn: "Twilight Lich Trophy", use: "Troféu do boss e item usado por receitas de padrão de estandarte do mod.", useConfidence: "Alta" },
    ],
    progressionHref: "/progressao#progression:350",
    sources: [BOSS_SOURCE],
  },
  minoshroom: {
    category: "Mini-chefe",
    behavior: "Hostil / encontro do Labyrinth",
    danger: "Alto",
    summary: "Encontro central do Labyrinth. Seu Meef Stroganoff é ligado diretamente à progressão rumo à Fire Swamp.",
    dimensions: ["Twilight Forest"],
    locations: ["Labyrinth", "Twilight Swamp"],
    howToFind: "Fica no Labyrinth da região de Swamp. As fontes auditadas o tratam como encontro natural da estrutura, sem item de invocação na rota normal.",
    drops: [
      { namePt: "Strogonoff de Meef", nameEn: "Meef Stroganoff", use: "Comida ligada à progressão do Labyrinth; comê-la libera a etapa da Fire Swamp na progressão padrão.", useConfidence: "Alta" },
      { namePt: "Machado do Minotauro", nameEn: "Minotaur Axe", use: "Arma associada ao loot do Minoshroom; números de dano/efeito não foram adicionados sem fonte versionada suficiente.", useConfidence: "Média" },
    ],
    progressionHref: "/progressao#progression:360",
    sources: [BOSS_SOURCE],
  },
  hydra: {
    category: "Chefe",
    behavior: "Hostil / chefe de progressão",
    danger: "Severo",
    summary: "Chefe da Hydra Lair na Fire Swamp. Seus materiais alimentam a linha de Fiery Metal e a própria progressão do Twilight Forest.",
    dimensions: ["Twilight Forest"],
    locations: ["Hydra Lair", "Fire Swamp"],
    howToFind: "Procure a Hydra Lair na Fire Swamp. As fontes auditadas não documentam item de invocação para a rota normal.",
    drops: [
      { namePt: "Sangue Ígneo", nameEn: "Fiery Blood", use: "Material usado na linha de Fiery Metal e em equipamentos ígneos.", useConfidence: "Alta" },
      { namePt: "Costeleta de Hydra", nameEn: "Hydra Chop", use: "Comida do loot da Hydra; a progressão 4.8.3345 possui avanço ligado a comê-la.", useConfidence: "Alta" },
      { namePt: "Troféu da Hydra", nameEn: "Hydra Trophy", use: "Troféu da Hydra e registro do encontro concluído.", useConfidence: "Alta" },
    ],
    progressionHref: "/progressao#progression:360",
    sources: [BOSS_SOURCE],
  },
  knight_phantom: {
    category: "Chefe de encontro",
    behavior: "Hostil / encontro em grupo",
    danger: "Alto",
    summary: "Encontro dos Knight Phantoms dentro da Knight Stronghold. O Bestiário representa o tipo de entidade individual, enquanto a progressão trata a luta como encontro coletivo.",
    dimensions: ["Twilight Forest"],
    locations: ["Goblin Knight Stronghold", "Knight Stronghold", "Dark Forest"],
    howToFind: "Encontrados na Goblin Knight Stronghold / Knight Stronghold, na Dark Forest. Nenhum item de invocação foi documentado nas fontes auditadas.",
    drops: [
      { namePt: "Equipamento de Knightmetal", nameEn: "Knightmetal Gear", condition: "recompensa do encontro / baú", use: "Categoria de equipamentos ligada à recompensa dos Knight Phantoms; peça, quantidade e chance não foram presumidas.", useConfidence: "Média" },
      { namePt: "Troféu dos Knight Phantoms", nameEn: "Knight Phantom Trophy", condition: "recompensa do encontro", use: "Troféu do encontro dos Knight Phantoms.", useConfidence: "Alta" },
    ],
    progressionHref: "/progressao#progression:370",
    sources: [BOSS_SOURCE],
  },
  ur_ghast: {
    category: "Chefe",
    behavior: "Hostil / chefe de progressão",
    danger: "Severo",
    summary: "Chefe do topo da Dark Tower. A luta usa Ghast Traps e as fontes 1.21.1 divergem sobre Fiery Tears versus Fiery Blood; o conflito fica explícito.",
    dimensions: ["Twilight Forest"],
    locations: ["Dark Tower", "Dark Forest"],
    howToFind: "Fica no topo/arena da Dark Tower, na Dark Forest. A progressão 4.8.3345 documenta o uso das Ghast Traps durante a luta.",
    drops: [
      { namePt: "Lágrimas Ígneas", nameEn: "Fiery Tears", condition: "fontes 1.21.1; existe conflito histórico com Fiery Blood", use: "Material atual ligado ao Ur-Ghast; fontes 1.21.1 o tratam como equivalente funcional ao Fiery Blood em crafting.", useConfidence: "Média" },
      { namePt: "Carminite", nameEn: "Carminite", use: "Material da linha de mecanismos da Dark Tower.", useConfidence: "Alta" },
      { namePt: "Troféu do Ur-Ghast", nameEn: "Ur-Ghast Trophy", use: "Troféu do boss e registro da conclusão do encontro.", useConfidence: "Alta" },
    ],
    notes: ["Conflito preservado: uma fonte lista Fiery Blood; fontes versionadas 1.21.1/4.8.3345 registram Fiery Tears. Nenhuma chance ou quantidade foi inventada."],
    progressionHref: "/progressao#progression:370",
    status: "conflito entre fontes",
    sources: [BOSS_SOURCE],
  },
  alpha_yeti: {
    category: "Chefe",
    behavior: "Hostil / chefe de progressão",
    danger: "Alto",
    summary: "Chefe da Yeti Cave/Yeti Lair. A pele obtida no encontro faz parte da preparação para a região glacial.",
    dimensions: ["Twilight Forest"],
    locations: ["Yeti Cave", "Yeti Lair", "Snowy Forest"],
    howToFind: "Encontrado na Yeti Cave/Yeti Lair da região Snowy Forest. Nenhum item de invocação foi documentado nas fontes auditadas.",
    drops: [
      { namePt: "Pele do Alpha Yeti", nameEn: "Alpha Yeti Fur", use: "Material ligado à progressão; é usado para preparar a passagem segura pela região glacial.", useConfidence: "Alta" },
      { namePt: "Bomba de Gelo", nameEn: "Ice Bomb", use: "Projétil/arma consumível associado ao loot do Alpha Yeti.", useConfidence: "Média" },
      { namePt: "Troféu do Alpha Yeti", nameEn: "Alpha Yeti Trophy", use: "Troféu do boss.", useConfidence: "Alta" },
    ],
    progressionHref: "/progressao#progression:380",
    sources: [BOSS_SOURCE],
  },
  snow_queen: {
    category: "Chefe",
    behavior: "Hostil / chefe de progressão",
    danger: "Alto",
    summary: "Chefe do Aurora Palace, na Glacier. É um dos marcos finais da cadeia de progressão atualmente implementada do Twilight Forest.",
    dimensions: ["Twilight Forest"],
    locations: ["Aurora Palace", "Glacier"],
    howToFind: "Encontrada no Aurora Palace, na Glacier; a progressão versionada a coloca no topo do palácio.",
    drops: [
      { namePt: "Arco Perseguidor", nameEn: "Seeker Bow", use: "Arco listado entre os drops-chave da Snow Queen; detalhes numéricos do efeito não foram adicionados sem fonte versionada explícita.", useConfidence: "Média" },
      { namePt: "Tri-bow", nameEn: "Tri-bow", use: "Arco listado entre os drops-chave da Snow Queen; números de efeito ficaram de fora por falta de fonte versionada explícita.", useConfidence: "Média" },
      { namePt: "Troféu da Snow Queen", nameEn: "Snow Queen Trophy", use: "Troféu da Snow Queen, boss do topo do Aurora Palace.", useConfidence: "Alta" },
    ],
    progressionHref: "/progressao#progression:380",
    sources: [BOSS_SOURCE],
  },
  quest_ram: {
    category: "Criatura com mecânica própria",
    behavior: "Criatura / interação especial",
    danger: "Baixo",
    summary: "Criatura especial com interação própria. A própria advancement oficial confirma que existe uma tarefa de entregar ao Questing Ram aquilo que lhe falta.",
    dimensions: ["Twilight Forest"],
    locations: ["Localização específica não fixada neste card"],
    howToFind: "O tipo e a mecânica de interação estão confirmados nas fontes oficiais, mas este lote não presume bioma/estrutura exatos sem uma fonte primária auditada para spawn.",
    interaction: "A advancement oficial da build 4.8.3345 confirma uma interação de entrega ao Questing Ram. Itens, cores e quantidades não são preenchidos aqui sem auditoria específica.",
    track: ["seen"],
    sources: [
      {
        label: "Twilight Forest 4.8.3345 · en_us.json gerado",
        href: LANG_URL,
        note: "nome literal da entidade e texto oficial da advancement do Questing Ram",
      },
    ],
  },
};

function baseEntry(seed: TwilightSeed): BestiaryEntry {
  const isMonster = seed.registryCategory === "MONSTER";
  const literalName = seed.id === "rising_zombie" ? "Rising Zombie" : seed.name;
  const commonNotes = [
    `ID literal confirmado pela chave entity.twilightforest.${seed.id} no lang gerado da mesma revisão histórica.`,
    "Spawn/localização fina, atributos e drops ficam omitidos quando não foram confirmados individualmente por fonte auditada.",
  ];

  const base: BestiaryEntry = {
    id: `twilightforest-${seed.id}`,
    namePt: literalName,
    nameEn: literalName,
    mod: "The Twilight Forest",
    version: "4.8.3345 · pack 1.21.1",
    registryId: `twilightforest:${seed.id}`,
    depth: seed.depth,
    category: isMonster ? "Monstro do Twilight Forest" : "Criatura do Twilight Forest",
    behavior: isMonster ? "Hostil (MobCategory.MONSTER no registry oficial)" : "Criatura (MobCategory.CREATURE no registry oficial)",
    danger: isMonster ? "Médio" : "Baixo",
    summary: `${literalName} é uma entidade jogável registrada pelo Twilight Forest 4.8.3345. ID e categoria foram cruzados entre registry e recursos gerados da mesma revisão histórica.`,
    dimensions: ["Twilight Forest"],
    locations: ["Localização específica não auditada"],
    howToFind: "A entidade está confirmada na build 4.8.3345. Este card não presume bioma, estrutura, peso ou regra de spawn sem validação individual.",
    drops: [],
    notes: commonNotes,
    track: isMonster ? ["seen", "defeated"] : ["seen"],
    status: "confirmado (2+ fontes)",
    sources: [
      { label: "Twilight Forest 4.8.3345 · TFEntities.java", href: REGISTRY_URL, note: `registro e MobCategory ${seed.registryCategory}` },
      { label: "Twilight Forest 4.8.3345 · en_us.json gerado", href: LANG_URL, note: `chave literal entity.twilightforest.${seed.id}` },
      { label: "CurseForge · Twilight Forest 4.8.3345", href: RELEASE_URL, note: "arquivo oficial da build NeoForge 1.21.1 usada no pack" },
    ],
  };

  if (seed.id === "rising_zombie") {
    base.notes = [
      ...(base.notes ?? []),
      "O lang da build exibe o nome visível como “Zombie”; o tipo/classe registrado é RisingZombie e o registryId literal é twilightforest:rising_zombie.",
      "A entidade usa MobCategory.MONSTER e é registrada sem Spawn Egg; isso não a torna uma entidade técnica.",
    ];
  }

  return base;
}

export const TWILIGHT_FOREST_BESTIARY_5E: BestiaryEntry[] = TWILIGHT_SEEDS.map((seed) => {
  const base = baseEntry(seed);
  const override = FULL_OVERRIDES[seed.id];
  if (!override) return base;

  return {
    ...base,
    ...override,
    depth: seed.depth,
    drops: override.drops ?? base.drops,
    notes: [...(base.notes ?? []), ...(override.notes ?? [])],
    track: override.track ?? base.track,
    sources: [...base.sources, ...(override.sources ?? [])],
  };
});

export const TWILIGHT_FOREST_BESTIARY_5E_COUNT = TWILIGHT_FOREST_BESTIARY_5E.length;
export const TWILIGHT_FOREST_BESTIARY_5E_FULL = TWILIGHT_FOREST_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const TWILIGHT_FOREST_BESTIARY_5E_COMPACT = TWILIGHT_FOREST_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
