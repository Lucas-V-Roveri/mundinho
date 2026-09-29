import type { BestiaryEntry } from "@/types/bestiary";
type Seed = {
  id: string;
  name: string;
  dimension?: string;
  location?: string;
  category?: string;
  behavior?: string;
  danger?: BestiaryEntry["danger"];
  note?: string;
};
type Group = {
  key: string;
  mod: string;
  version: string;
  registryPrefix: string;
  category: string;
  behavior: string;
  danger: BestiaryEntry["danger"];
  dimension: string;
  location: string;
  howToFind: string;
  sourceLabel: string;
  sourceHref: string;
  sourceNote: string;
  projectLabel: string;
  projectHref: string;
  projectNote: string;
  notes?: string[];
};
function buildEntries(group: Group, seeds: Seed[]): BestiaryEntry[] {
  return seeds.map((seed) => ({
    id: `${group.key}-${seed.id}`,
    namePt: seed.name,
    nameEn: seed.name,
    mod: group.mod,
    version: `${group.version} · pack 1.21.1`,
    registryId: `${group.registryPrefix}:${seed.id}`,
    category: seed.category ?? group.category,
    behavior: seed.behavior ?? group.behavior,
    danger: seed.danger ?? group.danger,
    summary: `${seed.name} é uma entidade distinta registrada por ${group.mod}. O card do Lote 5D mantém apenas fatos auditados e não preenche atributos, drops ou mecânicas por inferência.`,
    dimensions: [seed.dimension ?? group.dimension],
    locations: [seed.location ?? group.location],
    howToFind: group.howToFind,
    drops: [],
    notes: [
      ...(group.notes ?? []),
      ...(seed.note ? [seed.note] : []),
      "Vida, dano, drops e interações ficam sem números neste lote quando não foram validados diretamente na revisão instalada.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (1 fonte)",
    sources: [
      { label: group.sourceLabel, href: group.sourceHref, note: group.sourceNote },
      { label: group.projectLabel, href: group.projectHref, note: group.projectNote },
    ],
  }));
}
const CATACLYSM: Group = {
  key: "cataclysm", mod: "L_Ender's Cataclysm", version: "3.33", registryPrefix: "cataclysm",
  category: "Monstro do Cataclysm", behavior: "Hostil", danger: "Alto", dimension: "Variável",
  location: "Estruturas e encontros do L_Ender's Cataclysm",
  howToFind: "A entidade está confirmada no registry da build 3.33. O ponto exato de spawn/estrutura não é presumido neste lote quando ainda não foi validado individualmente.",
  sourceLabel: "Cataclysm 3.33 · ModEntities.java", sourceHref: "https://github.com/lender544/new1.20.1/blob/1.21/src/main/java/com/github/L_Ender/cataclysm/init/ModEntities.java", sourceNote: "registry e MobCategory da build 1.21.1",
  projectLabel: "Cataclysm 3.33 · gradle.properties", projectHref: "https://github.com/lender544/new1.20.1/blob/1.21/gradle.properties", projectNote: "Minecraft 1.21.1 e mod_version=3.33",
  notes: ["Ignis já pertence ao Lote 5A e não é duplicado aqui. Entidades MISC, projéteis, efeitos e partes de chefes ficam fora."],
};
const CREEPER_OVERHAUL: Group = {
  key: "creeperoverhaul", mod: "Creeper Overhaul", version: "4.0.6", registryPrefix: "creeperoverhaul",
  category: "Variante de Creeper", behavior: "IA própria da variante", danger: "Médio", dimension: "Overworld",
  location: "Biomas definidos pelos biome modifiers oficiais do mod",
  howToFind: "Procure o bioma-tema da variante. O Lote 5D usa o registry e os biome modifiers oficiais como limite factual e não presume pesos ou grupos sem leitura individual.",
  sourceLabel: "Creeper Overhaul · ModEntities.java", sourceHref: "https://github.com/bonsaistudi0s/Creeper-Overhaul/blob/1.21.x/common/src/main/java/tech/thatgravyboat/creeperoverhaul/common/registry/ModEntities.java", sourceNote: "16 entidades de Creeper registradas; Bamboo Creeper já estava no 5A",
  projectLabel: "Creeper Overhaul · source 1.21.x", projectHref: "https://github.com/bonsaistudi0s/Creeper-Overhaul/tree/1.21.x", projectNote: "fonte da linha 1.21 usada no pack",
  notes: ["Bamboo Creeper já pertence ao Lote 5A e não é duplicado aqui."],
};
const FRIENDS_FOES: Group = {
  key: "friendsfoes", mod: "Friends&Foes", version: "4.0.27", registryPrefix: "friendsandfoes",
  category: "Mob do Friends&Foes", behavior: "IA própria do mod", danger: "Médio", dimension: "Variável",
  location: "Encontros definidos pelas regras próprias do Friends&Foes",
  howToFind: "O registry confirma a entidade; habitat e gatilho de encontro ficam sem inferência quando não foram auditados individualmente neste lote.",
  sourceLabel: "Friends&Foes · EntityTypes", sourceHref: "https://github.com/Faboslav/friends-and-foes/blob/1.21.1/common/src/main/java/com/faboslav/friendsandfoes/common/init/FriendsAndFoesEntityTypes.java", sourceNote: "registry da linha 1.21.1",
  projectLabel: "Friends&Foes · source 1.21.1", projectHref: "https://github.com/Faboslav/friends-and-foes/tree/1.21.1", projectNote: "fonte da versão do pack",
  notes: ["ice_chunk é projétil/efeito e player_illusion é entidade técnica de ilusão; ambos foram excluídos."],
};
const ENDERMAN_OVERHAUL: Group = {
  key: "endermanoverhaul", mod: "Enderman Overhaul", version: "2.0.3", registryPrefix: "endermanoverhaul",
  category: "Variante de Enderman", behavior: "IA própria da variante", danger: "Médio", dimension: "Variável",
  location: "Bioma-tema definido pelo biome modifier oficial",
  howToFind: "Procure o bioma-tema indicado no card. O registry e os biome modifiers confirmam variantes distintas; pets, summons e classes auxiliares não viram cards.",
  sourceLabel: "Enderman Overhaul · ModEntityTypes.java", sourceHref: "https://github.com/bonsaistudi0s/Enderman-Overhaul/blob/1.21.x/src/main/java/tech/alexnijjar/endermanoverhaul/common/registry/ModEntityTypes.java", sourceNote: "18 variantes jogáveis registradas",
  projectLabel: "Enderman Overhaul · source 1.21.x", projectHref: "https://github.com/bonsaistudi0s/Enderman-Overhaul/tree/1.21.x", projectNote: "loot tables e biome modifiers da linha 1.21",
};
const VARIANTS_VENTURES: Group = {
  key: "variantsventures", mod: "Variants&Ventures", version: "1.0.26", registryPrefix: "variantsandventures",
  category: "Variante hostil", behavior: "Hostil", danger: "Médio", dimension: "Overworld",
  location: "Regras de conversão/spawn do Variants&Ventures",
  howToFind: "O registry 1.21.1 confirma quatro entidades próprias. O gatilho exato de cada variante não é preenchido por inferência neste lote.",
  sourceLabel: "Variants&Ventures · EntityTypes", sourceHref: "https://github.com/Faboslav/variants-and-ventures/blob/1.21.1/common/src/main/java/com/faboslav/variantsandventures/common/init/VariantsAndVenturesEntityTypes.java", sourceNote: "Gelid, Murk, Thicket e Verdant",
  projectLabel: "CurseForge · Variants&Ventures 1.0.26", projectHref: "https://www.curseforge.com/minecraft/mc-mods/variants-and-ventures/files/all?version=1.21.1", projectNote: "build 1.0.26 para 1.21.1",
};
const ILLAGER_INVASION: Group = {
  key: "illagerinvasion", mod: "Illager Invasion", version: "21.1.6", registryPrefix: "illagerinvasion",
  category: "Illager", behavior: "IA própria do mod", danger: "Médio", dimension: "Overworld",
  location: "Raids, estruturas ou encontros definidos pelo Illager Invasion",
  howToFind: "A build 1.21.1 expõe nome e Spawn Egg para estas onze entidades. O gatilho exato de encontro não é presumido no card sem auditoria individual.",
  sourceLabel: "Illager Invasion · en_us.json 1.21.1", sourceHref: "https://github.com/Fuzss/illager-invasion/blob/1.21.1/Common/src/generated/resources/assets/illagerinvasion/lang/en_us.json", sourceNote: "11 entity keys e Spawn Eggs correspondentes",
  projectLabel: "Illager Invasion · source 1.21.1", projectHref: "https://github.com/Fuzss/illager-invasion/tree/1.21.1", projectNote: "linha mantida para Minecraft 1.21.1",
};
const PIGLIN_PROLIFERATION: Group = {
  key: "piglinproliferation", mod: "Piglin Proliferation", version: "2.0.15", registryPrefix: "piglinproliferation",
  category: "Piglin especial", behavior: "IA própria do mod", danger: "Médio", dimension: "Nether",
  location: "Encontros definidos pelo Piglin Proliferation",
  howToFind: "O registry da revisão auditada contém exatamente Piglin Alchemist e Piglin Traveler. O card não presume o gatilho de spawn além dessa confirmação.",
  sourceLabel: "Piglin Proliferation · PPEntityTypes.java", sourceHref: "https://github.com/seymourimadeit/Piglin-Proliferation/blob/e417875/src/main/java/tallestred/piglinproliferation/common/entities/PPEntityTypes.java", sourceNote: "dois EntityTypes próprios",
  projectLabel: "Piglin Proliferation · source", projectHref: "https://github.com/seymourimadeit/Piglin-Proliferation", projectNote: "repositório oficial do mod",
};
const SPIDER_OVERHAUL: Group = {
  key: "spideroverhaul", mod: "Spider Overhaul", version: "0.0.6-NeoForge-v1.21", registryPrefix: "spider_overhaul",
  category: "Variante de aranha", behavior: "Hostil / IA própria da variante", danger: "Médio", dimension: "Overworld",
  location: "Bioma-tema da variante",
  howToFind: "Somente as seis variantes que o próprio projeto marca como implementadas em survival entram neste lote.",
  sourceLabel: "Spider Overhaul · ModEntities.java", sourceHref: "https://github.com/Chybx/Spider-Overhaul/blob/master/src/main/java/dev/chybx/spideroverhaul/registry/ModEntities.java", sourceNote: "11 variantes registradas e entidades MISC separadas",
  projectLabel: "Spider Overhaul · README", projectHref: "https://github.com/Chybx/Spider-Overhaul#content", projectNote: "seis spiders implementadas em survival na 0.0.6",
  notes: ["Sculk, Mushroom, Ocean, Taiga e Savanna existem no código, mas o autor as marca como ainda não implementadas no fluxo de survival; ficam fora do Bestiário por enquanto."],
};
const CATACLYSM_SEEDS: Seed[] = [
  { id: "ender_golem", name: "Ender Golem" },
  { id: "ender_guardian", name: "Ender Guardian" },
  { id: "netherite_monstrosity", name: "Netherite Monstrosity" },
  { id: "netherite_ministrosity", name: "Netherite Ministrosity", category: "Criatura do Cataclysm", behavior: "IA própria do mod", danger: "Médio" },
  { id: "endermaptera", name: "Endermaptera" },
  { id: "deepling", name: "Deepling" },
  { id: "deepling_brute", name: "Deepling Brute" },
  { id: "deepling_angler", name: "Deepling Angler" },
  { id: "deepling_priest", name: "Deepling Priest" },
  { id: "deepling_warlock", name: "Deepling Warlock" },
  { id: "lionfish", name: "Lionfish" },
  { id: "coral_golem", name: "Coral Golem" },
  { id: "coralssus", name: "Coralssus" },
  { id: "ignited_revenant", name: "Ignited Revenant" },
  { id: "ignited_berserker", name: "Ignited Berserker" },
  { id: "the_harbinger", name: "The Harbinger" },
  { id: "the_watcher", name: "The Watcher" },
  { id: "the_prowler", name: "The Prowler" },
  { id: "the_leviathan", name: "The Leviathan" },
  { id: "the_baby_leviathan", name: "The Baby Leviathan", category: "Criatura do Cataclysm", behavior: "IA própria do mod", danger: "Médio" },
  { id: "amethyst_crab", name: "Amethyst Crab" },
  { id: "ancient_remnant", name: "Ancient Remnant" },
  { id: "modern_remnant", name: "Modern Remnant", category: "Criatura do Cataclysm", behavior: "IA própria do mod", danger: "Médio" },
  { id: "koboleton", name: "Koboleton" },
  { id: "kobolediator", name: "Kobolediator" },
  { id: "wadjet", name: "Wadjet" },
  { id: "maledictus", name: "Maledictus" },
  { id: "draugr", name: "Draugr" },
  { id: "royal_draugr", name: "Royal Draugr" },
  { id: "elite_draugr", name: "Elite Draugr" },
  { id: "aptrgangr", name: "Aptrgangr" },
  { id: "hippocamtus", name: "Hippocamtus" },
  { id: "cindaria", name: "Cindaria" },
  { id: "clawdian", name: "Clawdian" },
  { id: "scylla", name: "Scylla" },
  { id: "urchinkin", name: "Urchinkin" },
  { id: "drowned_host", name: "Drowned Host" },
  { id: "symbiocto", name: "Symbiocto" },
];
const CREEPER_SEEDS: Seed[] = [
  { id: "jungle_creeper", name: "Jungle Creeper", location: "Biomas de jungle configurados pelo mod" },
  { id: "desert_creeper", name: "Desert Creeper", location: "Biomas de desert configurados pelo mod" },
  { id: "badlands_creeper", name: "Badlands Creeper", location: "Biomas de badlands configurados pelo mod" },
  { id: "hills_creeper", name: "Hills Creeper", location: "Biomas de hills configurados pelo mod" },
  { id: "savannah_creeper", name: "Savannah Creeper", location: "Biomas de savanna configurados pelo mod" },
  { id: "mushroom_creeper", name: "Mushroom Creeper", location: "Biomas de mushroom configurados pelo mod" },
  { id: "swamp_creeper", name: "Swamp Creeper", location: "Biomas de swamp configurados pelo mod" },
  { id: "dripstone_creeper", name: "Dripstone Creeper", location: "Biomas de dripstone caves configurados pelo mod" },
  { id: "cave_creeper", name: "Cave Creeper", location: "Biomas de caves configurados pelo mod" },
  { id: "dark_oak_creeper", name: "Dark Oak Creeper", location: "Biomas de dark oak forests configurados pelo mod" },
  { id: "spruce_creeper", name: "Spruce Creeper", location: "Biomas de spruce forests/taigas configurados pelo mod" },
  { id: "beach_creeper", name: "Beach Creeper", location: "Biomas de beaches configurados pelo mod" },
  { id: "snowy_creeper", name: "Snowy Creeper", location: "Biomas de snowy biomes configurados pelo mod" },
  { id: "ocean_creeper", name: "Ocean Creeper", location: "Biomas de oceans configurados pelo mod" },
  { id: "birch_creeper", name: "Birch Creeper", location: "Biomas de birch forests configurados pelo mod" },
];
const FRIENDS_SEEDS: Seed[] = [
  { id: "copper_golem", name: "Copper Golem" },
  { id: "crab", name: "Crab" },
  { id: "glare", name: "Glare" },
  { id: "iceologer", name: "Iceologer" },
  { id: "illusioner", name: "Illusioner" },
  { id: "mauler", name: "Mauler" },
  { id: "moobloom", name: "Moobloom" },
  { id: "rascal", name: "Rascal" },
  { id: "tuff_golem", name: "Tuff Golem" },
  { id: "wildfire", name: "Wildfire" },
];
const ENDERMAN_SEEDS: Seed[] = [
  { id: "badlands_enderman", name: "Badlands Enderman", dimension: "Overworld", location: "badlands" },
  { id: "cave_enderman", name: "Cave Enderman", dimension: "Overworld", location: "caves" },
  { id: "coral_enderman", name: "Coral Enderman", dimension: "Overworld", location: "coral/ocean biomes configured" },
  { id: "crimson_forest_enderman", name: "Crimson Forest Enderman", dimension: "Nether", location: "Crimson Forest" },
  { id: "dark_oak_enderman", name: "Dark Oak Enderman", dimension: "Overworld", location: "dark oak forests" },
  { id: "desert_enderman", name: "Desert Enderman", dimension: "Overworld", location: "deserts" },
  { id: "end_enderman", name: "End Enderman", dimension: "The End", location: "The End" },
  { id: "end_islands_enderman", name: "End Islands Enderman", dimension: "The End", location: "End islands" },
  { id: "flower_fields_enderman", name: "Flower Fields Enderman", dimension: "Overworld", location: "flower-rich biomes configured" },
  { id: "ice_spikes_enderman", name: "Ice Spikes Enderman", dimension: "Overworld", location: "Ice Spikes" },
  { id: "mushroom_fields_enderman", name: "Mushroom Fields Enderman", dimension: "Overworld", location: "Mushroom Fields" },
  { id: "nether_wastes_enderman", name: "Nether Wastes Enderman", dimension: "Nether", location: "Nether Wastes" },
  { id: "savanna_enderman", name: "Savanna Enderman", dimension: "Overworld", location: "savannas" },
  { id: "snowy_enderman", name: "Snowy Enderman", dimension: "Overworld", location: "snowy biomes" },
  { id: "soulsand_valley_enderman", name: "Soulsand Valley Enderman", dimension: "Nether", location: "Soul Sand Valley" },
  { id: "swamp_enderman", name: "Swamp Enderman", dimension: "Overworld", location: "swamps" },
  { id: "warped_forest_enderman", name: "Warped Forest Enderman", dimension: "Nether", location: "Warped Forest" },
  { id: "windswept_hills_enderman", name: "Windswept Hills Enderman", dimension: "Overworld", location: "windswept hills" },
];
const VARIANTS_SEEDS: Seed[] = [
  { id: "gelid", name: "Gelid" },
  { id: "murk", name: "Murk" },
  { id: "thicket", name: "Thicket" },
  { id: "verdant", name: "Verdant" },
];
const ILLAGER_SEEDS: Seed[] = [
  { id: "alchemist", name: "Alchemist" },
  { id: "archivist", name: "Archivist" },
  { id: "basher", name: "Basher" },
  { id: "firecaller", name: "Firecaller" },
  { id: "inquisitor", name: "Inquisitor" },
  { id: "invoker", name: "Invoker" },
  { id: "marauder", name: "Marauder" },
  { id: "necromancer", name: "Necromancer" },
  { id: "provoker", name: "Provoker" },
  { id: "sorcerer", name: "Sorcerer" },
  { id: "surrendered", name: "Surrendered" },
];
const PIGLIN_SEEDS: Seed[] = [
  { id: "piglin_alchemist", name: "Piglin Alchemist" },
  { id: "piglin_traveler", name: "Piglin Traveler" },
];
const SPIDER_SEEDS: Seed[] = [
  { id: "birch_spider", name: "Birch Spider", location: "fallen birch logs / birch habitat" },
  { id: "desert_spider", name: "Desert Spider", location: "desert habitat" },
  { id: "swamp_spider", name: "Swamp Spider", location: "swamps" },
  { id: "cavern_spider", name: "Cavern Spider", location: "underground caves" },
  { id: "jungle_spider", name: "Jungle Spider", location: "jungles" },
  { id: "ice_spider", name: "Ice Spider", location: "cold/icy habitat" },
];
export const BESTIARY_LOT_5D_COUNTS = {
  cataclysm: CATACLYSM_SEEDS.length,
  creeperOverhaul: CREEPER_SEEDS.length,
  friendsAndFoes: FRIENDS_SEEDS.length,
  endermanOverhaul: ENDERMAN_SEEDS.length,
  variantsAndVentures: VARIANTS_SEEDS.length,
  illagerInvasion: ILLAGER_SEEDS.length,
  piglinProliferation: PIGLIN_SEEDS.length,
  spiderOverhaul: SPIDER_SEEDS.length,
} as const;
export const BESTIARY_LOT_5D_ENTRIES: BestiaryEntry[] = [
  ...buildEntries(CATACLYSM, CATACLYSM_SEEDS),
  ...buildEntries(CREEPER_OVERHAUL, CREEPER_SEEDS),
  ...buildEntries(FRIENDS_FOES, FRIENDS_SEEDS),
  ...buildEntries(ENDERMAN_OVERHAUL, ENDERMAN_SEEDS),
  ...buildEntries(VARIANTS_VENTURES, VARIANTS_SEEDS),
  ...buildEntries(ILLAGER_INVASION, ILLAGER_SEEDS),
  ...buildEntries(PIGLIN_PROLIFERATION, PIGLIN_SEEDS),
  ...buildEntries(SPIDER_OVERHAUL, SPIDER_SEEDS),
];
if (BESTIARY_LOT_5D_ENTRIES.length !== 104) {
  throw new Error(`Lote 5D inconsistente: esperado 104 cards, recebido ${BESTIARY_LOT_5D_ENTRIES.length}.`);
}
