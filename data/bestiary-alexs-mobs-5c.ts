import type { BestiaryEntry } from "@/types/bestiary";

const REV = "ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021";
const ROOT = `https://github.com/Codx-org/AlexsMobsContinued/blob/${REV}`;
const RAW = `https://raw.githubusercontent.com/Codx-org/AlexsMobsContinued/${REV}`;
const REGISTRY = `${ROOT}/src/main/java/com/github/alexthe666/alexsmobs/entity/AMEntityRegistry.java`;
const BIOME_CONFIG = `${ROOT}/src/main/java/com/github/alexthe666/alexsmobs/config/BiomeConfig.java`;
const DEFAULT_BIOMES = `${ROOT}/src/main/java/com/github/alexthe666/alexsmobs/config/DefaultBiomes.java`;
const TEXTURE_DIR = `${ROOT}/src/main/resources/assets/alexsmobs/textures/entity`;

type Seed = { id: string; name: string; habitat: keyof typeof HABITATS; texture?: string };
const HABITATS = {
  ALL_FOREST: "florestas e taigas do Overworld; o seletor inclui biomas Terralith compatíveis",
  ROADRUNNER: "badlands e biomas quentes/secos/arenosos configurados",
  GAZELLE: "savanas e equivalentes áridos configurados",
  CROCODILE: "pântanos e rios não frios configurados",
  FLY: "Overworld",
  HUMMINGBIRD: "Flower Forest, Sunflower Plains, jungles, Meadow e equivalentes floridos configurados",
  ORCA: "oceanos frios",
  SUNBIRD: "montanhas e picos configurados",
  GORILLA: "jungles configuradas",
  CRIMSON_MOSQUITO: "seletor CRIMSON_MOSQUITO da configuração oficial",
  RATTLESNAKE: "seletor RATTLESNAKE da configuração oficial",
  ENDERGRADE: "seletor ENDERGRADE da configuração oficial",
  HAMMERHEAD: "seletor HAMMERHEAD da configuração oficial",
  LOBSTER: "seletor LOBSTER da configuração oficial",
  KOMODO_DRAGON: "seletor KOMODO_DRAGON da configuração oficial",
  CAPUCHIN_MONKEY: "seletor CAPUCHIN_MONKEY da configuração oficial",
  CAVES_MONSTER: "cavernas do Overworld; exclui oceanos, mushroom biomes e Deep Dark na regra-base",
  WARPED_TOAD: "Warped Forest e biomas compatíveis, incluindo Incendium Inverted Forest/Quartz Flats",
  MOOSE: "biomas nevados/taigas frias configurados",
  MIMICUBE: "seletor MIMICUBE da configuração oficial",
  RACCOON: "florestas, planícies e taigas configuradas",
  DEEP_SEA: "deep oceans",
  SEAL: "praias e oceanos frios configurados",
  COCKROACH: "cavernas do Overworld; exclui oceanos, mushroom biomes e Deep Dark na regra-base",
  SHOEBILL: "pântanos configurados, com Mangrove Swamp excluído na regra-base",
  ELEPHANT: "savanas configuradas",
  SOUL_VULTURE: "seletor SOUL_VULTURE da configuração oficial",
  SNOW_LEOPARD: "seletor SNOW_LEOPARD da configuração oficial",
  SPECTRE: "seletor SPECTRE da configuração oficial",
  ALLIGATOR_SNAPPING_TURTLE: "seletor ALLIGATOR_SNAPPING_TURTLE da configuração oficial",
  MUNGUS: "seletor MUNGUS da configuração oficial",
  MANTIS_SHRIMP: "seletor MANTIS_SHRIMP da configuração oficial",
  GUSTER: "seletor GUSTER da configuração oficial",
  EMPTY: "sem bioma natural padrão no BiomeConfig; encontro/obtenção depende de outra mecânica",
  STRADDLER: "seletor STRADDLER da configuração oficial",
  SAVANNA_AND_MESA: "savanas e badlands/mesa configurados",
  ICE_FREE_RIVER: "rios sem gelo configurados",
  DROPBEAR: "seletor DROPBEAR da configuração oficial",
  TASMANIAN_DEVIL: "seletor TASMANIAN_DEVIL da configuração oficial",
  CACHALOT_WHALE: "seletor CACHALOT_WHALE da configuração oficial",
  LEAFCUTTER_ANTHILL: "habitats onde o mod gera Leafcutter Anthills",
  ENDERIOPHAGE: "seletor ENDERIOPHAGE da configuração oficial",
  BALD_EAGLE: "seletor BALD_EAGLE da configuração oficial",
  TIGER: "seletor TIGER da configuração oficial",
  DESERT: "desertos configurados",
  MIMIC_OCTOPUS: "seletor MIMIC_OCTOPUS da configuração oficial",
  SEAGULL: "seletor SEAGULL da configuração oficial",
  FROSTSTALKER: "seletor FROSTSTALKER da configuração oficial",
  TUSKLIN: "seletor TUSKLIN da configuração oficial",
  ALL_NETHER: "qualquer bioma do Nether",
  COSMAW: "seletor COSMAW da configuração oficial",
  TOUCAN: "seletor TOUCAN da configuração oficial",
  MANED_WOLF: "seletor MANED_WOLF da configuração oficial",
  ANACONDA: "seletor ANACONDA da configuração oficial",
  ANTEATER: "seletor ANTEATER da configuração oficial",
  ROCKY_ROLLER: "seletor ROCKY_ROLLER da configuração oficial",
  FLUTTER: "seletor FLUTTER da configuração oficial",
  MEADOWS: "meadows configurados",
  COMB_JELLY: "seletor COMB_JELLY da configuração oficial",
  COSMIC_COD: "seletor COSMIC_COD da configuração oficial",
  BISON: "seletor BISON da configuração oficial",
  GIANT_SQUID: "seletor GIANT_SQUID da configuração oficial",
  SPECIAL: "sem entrada de spawn por bioma no BiomeConfig; aparece por mecânica especial do mod",
  ALL_OVERWORLD: "Overworld",
  CATFISH: "seletor CATFISH da configuração oficial",
  FLYING_FISH: "seletor FLYING_FISH da configuração oficial",
  SKELEWAG: "seletor SKELEWAG da configuração oficial",
  POTOO: "seletor POTOO da configuração oficial",
  MANGROVE: "Mangrove Swamp e equivalentes configurados",
  RHINOCEROS: "seletor RHINOCEROS da configuração oficial",
  SUGAR_GLIDER: "seletor SUGAR_GLIDER da configuração oficial",
  FARSEER: "seletor FARSEER da configuração oficial",
  SKREECHER: "biomas na tag alexsmobs:skreechers_can_spawn_wardens",
  CAVES: "cavernas do Overworld; a regra-base exclui oceanos, mushroom biomes e Deep Dark",
  SKUNK: "seletor SKUNK da configuração oficial",
  BANANA_SLUG: "seletor BANANA_SLUG da configuração oficial",
} as const;

const SEEDS: Seed[] = [
  { id: "grizzly_bear", name: "Grizzly Bear", habitat: "ALL_FOREST" },
  { id: "roadrunner", name: "Roadrunner", habitat: "ROADRUNNER" },
  { id: "gazelle", name: "Gazelle", habitat: "GAZELLE" },
  { id: "crocodile", name: "Crocodile", habitat: "CROCODILE" },
  { id: "fly", name: "Fly", habitat: "FLY" },
  { id: "hummingbird", name: "Hummingbird", habitat: "HUMMINGBIRD" },
  { id: "orca", name: "Orca", habitat: "ORCA" },
  { id: "sunbird", name: "Sunbird", habitat: "SUNBIRD" },
  { id: "gorilla", name: "Gorilla", habitat: "GORILLA" },
  { id: "crimson_mosquito", name: "Crimson Mosquito", habitat: "CRIMSON_MOSQUITO" },
  { id: "rattlesnake", name: "Rattlesnake", habitat: "RATTLESNAKE" },
  { id: "endergrade", name: "Endergrade", habitat: "ENDERGRADE" },
  { id: "hammerhead_shark", name: "Hammerhead Shark", habitat: "HAMMERHEAD" },
  { id: "lobster", name: "Lobster", habitat: "LOBSTER" },
  { id: "komodo_dragon", name: "Komodo Dragon", habitat: "KOMODO_DRAGON" },
  { id: "capuchin_monkey", name: "Capuchin Monkey", habitat: "CAPUCHIN_MONKEY" },
  { id: "cave_centipede", name: "Cave Centipede", habitat: "CAVES_MONSTER", texture: "centipede_head" },
  { id: "warped_toad", name: "Warped Toad", habitat: "WARPED_TOAD" },
  { id: "moose", name: "Moose", habitat: "MOOSE" },
  { id: "mimicube", name: "Mimicube", habitat: "MIMICUBE" },
  { id: "raccoon", name: "Raccoon", habitat: "RACCOON" },
  { id: "blobfish", name: "Blobfish", habitat: "DEEP_SEA" },
  { id: "seal", name: "Seal", habitat: "SEAL" },
  { id: "cockroach", name: "Cockroach", habitat: "COCKROACH" },
  { id: "shoebill", name: "Shoebill", habitat: "SHOEBILL" },
  { id: "elephant", name: "Elephant", habitat: "ELEPHANT" },
  { id: "soul_vulture", name: "Soul Vulture", habitat: "SOUL_VULTURE" },
  { id: "snow_leopard", name: "Snow Leopard", habitat: "SNOW_LEOPARD" },
  { id: "spectre", name: "Spectre", habitat: "SPECTRE" },
  { id: "alligator_snapping_turtle", name: "Alligator Snapping Turtle", habitat: "ALLIGATOR_SNAPPING_TURTLE" },
  { id: "mungus", name: "Mungus", habitat: "MUNGUS" },
  { id: "mantis_shrimp", name: "Mantis Shrimp", habitat: "MANTIS_SHRIMP" },
  { id: "guster", name: "Guster", habitat: "GUSTER" },
  { id: "warped_mosco", name: "Warped Mosco", habitat: "EMPTY" },
  { id: "straddler", name: "Straddler", habitat: "STRADDLER" },
  { id: "stradpole", name: "Stradpole", habitat: "STRADDLER" },
  { id: "emu", name: "Emu", habitat: "SAVANNA_AND_MESA" },
  { id: "platypus", name: "Platypus", habitat: "ICE_FREE_RIVER" },
  { id: "dropbear", name: "Dropbear", habitat: "DROPBEAR" },
  { id: "tasmanian_devil", name: "Tasmanian Devil", habitat: "TASMANIAN_DEVIL" },
  { id: "kangaroo", name: "Kangaroo", habitat: "SAVANNA_AND_MESA" },
  { id: "cachalot_whale", name: "Cachalot Whale", habitat: "CACHALOT_WHALE" },
  { id: "leafcutter_ant", name: "Leafcutter Ant", habitat: "LEAFCUTTER_ANTHILL" },
  { id: "enderiophage", name: "Enderiophage", habitat: "ENDERIOPHAGE" },
  { id: "bald_eagle", name: "Bald Eagle", habitat: "BALD_EAGLE" },
  { id: "tiger", name: "Tiger", habitat: "TIGER" },
  { id: "tarantula_hawk", name: "Tarantula Hawk", habitat: "DESERT" },
  { id: "void_worm", name: "Void Worm", habitat: "EMPTY" },
  { id: "frilled_shark", name: "Frilled Shark", habitat: "DEEP_SEA" },
  { id: "mimic_octopus", name: "Mimic Octopus", habitat: "MIMIC_OCTOPUS" },
  { id: "seagull", name: "Seagull", habitat: "SEAGULL" },
  { id: "froststalker", name: "Froststalker", habitat: "FROSTSTALKER" },
  { id: "tusklin", name: "Tusklin", habitat: "TUSKLIN" },
  { id: "laviathan", name: "Laviathan", habitat: "ALL_NETHER" },
  { id: "cosmaw", name: "Cosmaw", habitat: "COSMAW" },
  { id: "toucan", name: "Toucan", habitat: "TOUCAN" },
  { id: "maned_wolf", name: "Maned Wolf", habitat: "MANED_WOLF" },
  { id: "anaconda", name: "Anaconda", habitat: "ANACONDA" },
  { id: "anteater", name: "Anteater", habitat: "ANTEATER" },
  { id: "rocky_roller", name: "Rocky Roller", habitat: "ROCKY_ROLLER" },
  { id: "flutter", name: "Flutter", habitat: "FLUTTER" },
  { id: "gelada_monkey", name: "Gelada Monkey", habitat: "MEADOWS" },
  { id: "jerboa", name: "Jerboa", habitat: "DESERT" },
  { id: "terrapin", name: "Terrapin", habitat: "ICE_FREE_RIVER" },
  { id: "comb_jelly", name: "Comb Jelly", habitat: "COMB_JELLY" },
  { id: "cosmic_cod", name: "Cosmic Cod", habitat: "COSMIC_COD" },
  { id: "bunfungus", name: "Bunfungus", habitat: "MUNGUS" },
  { id: "bison", name: "Bison", habitat: "BISON" },
  { id: "giant_squid", name: "Giant Squid", habitat: "GIANT_SQUID" },
  { id: "sea_bear", name: "Sea Bear", habitat: "SPECIAL" },
  { id: "devils_hole_pupfish", name: "Devil's Hole Pupfish", habitat: "ALL_OVERWORLD" },
  { id: "catfish", name: "Catfish", habitat: "CATFISH" },
  { id: "flying_fish", name: "Flying Fish", habitat: "FLYING_FISH" },
  { id: "skelewag", name: "Skelewag", habitat: "SKELEWAG" },
  { id: "rain_frog", name: "Rain Frog", habitat: "DESERT" },
  { id: "potoo", name: "Potoo", habitat: "POTOO" },
  { id: "mudskipper", name: "Mudskipper", habitat: "MANGROVE" },
  { id: "rhinoceros", name: "Rhinoceros", habitat: "RHINOCEROS" },
  { id: "sugar_glider", name: "Sugar Glider", habitat: "SUGAR_GLIDER" },
  { id: "farseer", name: "Farseer", habitat: "FARSEER" },
  { id: "skreecher", name: "Skreecher", habitat: "SKREECHER" },
  { id: "underminer", name: "Underminer", habitat: "CAVES" },
  { id: "murmur", name: "Murmur", habitat: "CAVES_MONSTER" },
  { id: "skunk", name: "Skunk", habitat: "SKUNK" },
  { id: "banana_slug", name: "Banana Slug", habitat: "BANANA_SLUG" },
  { id: "blue_jay", name: "Blue Jay", habitat: "ALL_FOREST" },
  { id: "caiman", name: "Caiman", habitat: "MANGROVE" },
  { id: "triops", name: "Triops", habitat: "DESERT" },
];

const MONSTERS = new Set(["cave_centipede", "crimson_mosquito", "dropbear", "farseer", "guster", "mimicube", "murmur", "rocky_roller", "skelewag", "soul_vulture", "straddler", "void_worm", "warped_mosco"]);
const AMBIENT = new Set(["cockroach", "cosmic_cod", "fly", "jerboa", "rain_frog", "underminer"]);
const WATER = new Set(["blobfish", "cachalot_whale", "catfish", "comb_jelly", "devils_hole_pupfish", "flying_fish", "frilled_shark", "giant_squid", "hammerhead_shark", "lobster", "mantis_shrimp", "mimic_octopus", "mudskipper", "orca", "sea_bear", "stradpole", "terrapin", "triops"]);

const TAME: Record<string, { item: string; detail: string; tag: string }> = {
  grizzly_bear: { item: "Salmon", detail: "30% por tentativa após aceitar o alimento; o código grava o dono.", tag: "grizzly_tameables" },
  gorilla: { item: "itens da tag #alexsmobs:bananas", detail: "30% por tentativa quando recebe alimento domesticável.", tag: "gorilla_tameables" },
  elephant: { item: "Acacia Blossom", detail: "1 em 3 por tentativa quando recebe a flor.", tag: "elephant_tameables" },
  raccoon: { item: "itens da tag #forge:eggs", detail: "30% após lavar o item na água.", tag: "raccoon_tameables" },
  capuchin_monkey: { item: "itens da tag #alexsmobs:bananas", detail: "1 em 5 por tentativa.", tag: "capuchin_monkey_tameables" },
  cosmaw: { item: "Cosmic Cod", detail: "30% por tentativa quando consome o peixe.", tag: "cosmaw_tameables" },
};

function dimensionsFor(habitat: keyof typeof HABITATS): string[] {
  if (["ALL_NETHER", "WARPED_TOAD"].includes(habitat)) return ["Nether"];
  if (["ALL_FOREST","ROADRUNNER","GAZELLE","CROCODILE","FLY","HUMMINGBIRD","ORCA","SUNBIRD","GORILLA","CAVES_MONSTER","MOOSE","RACCOON","DEEP_SEA","SEAL","COCKROACH","SHOEBILL","ELEPHANT","SAVANNA_AND_MESA","ICE_FREE_RIVER","DESERT","MEADOWS","ALL_OVERWORLD","MANGROVE","CAVES"].includes(habitat)) return ["Overworld"];
  return [];
}

function categoryFor(id: string) {
  if (MONSTERS.has(id)) return "Monstro (registro MONSTER)";
  if (WATER.has(id)) return "Criatura aquática";
  if (AMBIENT.has(id)) return "Criatura ambiente";
  return "Criatura (registro CREATURE)";
}

function behaviorFor(id: string) {
  if (MONSTERS.has(id)) return "Registro técnico MONSTER; tratar como encontro de combate. Mecânica fina não é generalizada sem fonte específica.";
  return "Registro técnico não indica agressividade por si só; comportamento fino fica sem afirmação até fonte específica por mob.";
}

export const ALEXS_MOBS_BESTIARY_5C: BestiaryEntry[] = SEEDS.map((seed) => {
  const tame = TAME[seed.id];
  const texture = seed.texture ?? seed.id;
  const special = seed.habitat === "EMPTY" || seed.habitat === "SPECIAL";
  return {
    id: `alexsmobs-${seed.id.replaceAll("_", "-")}`,
    namePt: seed.name,
    nameEn: seed.name,
    mod: "Alex's Mobs Continued",
    version: "2.1.14 · pack 1.21.1",
    registryId: `alexsmobs:${seed.id === "cave_centipede" ? "centipede_head" : seed.id}`,
    category: categoryFor(seed.id),
    behavior: behaviorFor(seed.id),
    danger: seed.id === "void_worm" ? "Severo" : MONSTERS.has(seed.id) ? "Médio" : "Baixo",
    summary: special
      ? "Criatura confirmada no registry da build instalada. O BiomeConfig não fornece um spawn natural padrão para este encontro, então o card não inventa um bioma."
      : "Criatura confirmada no registry da build instalada. O habitat abaixo vem do BiomeConfig/DefaultBiomes da mesma revisão; mecânicas finas ficam de fora quando não foram confirmadas individualmente.",
    dimensions: dimensionsFor(seed.habitat),
    locations: [HABITATS[seed.habitat]],
    howToFind: special
      ? `O registry confirma ${seed.name}, mas o seletor padrão de bioma é ${seed.habitat === "EMPTY" ? "EMPTY" : "ausente/especial"}. Consulte a mecânica específica antes de sair caçando por um bioma aleatório.`
      : `Procure em ${HABITATS[seed.habitat]}. Esta descrição resume o seletor ${seed.habitat} da configuração oficial; configs do pack ainda podem alterar pesos ou habilitar/desabilitar spawn.`,
    taming: tame ? `${tame.item}. ${tame.detail}` : undefined,
    drops: [],
    notes: [
      "Vida, dano e drops foram deixados vazios neste card quando não houve validação individual na build 2.1.14.",
      "Perigo é classificação editorial conservadora do Bestiário, não um atributo oficial do mod.",
    ],
    track: tame ? ["seen", "defeated", "tamed"] : ["seen", "defeated"],
    status: "confirmado (1 fonte)",
    imageUrl: `${RAW}/src/main/resources/assets/alexsmobs/textures/entity/${texture}.png`,
    imageAlt: `Textura oficial de ${seed.name}`,
    imageSourceUrl: TEXTURE_DIR,
    sources: [
      { label: "Alex's Mobs Continued · registry exato", href: REGISTRY, note: "existência e categoria técnica da entidade" },
      { label: "Alex's Mobs Continued · BiomeConfig.java", href: BIOME_CONFIG, note: `associação ao seletor ${seed.habitat}` },
      { label: "Alex's Mobs Continued · DefaultBiomes.java", href: DEFAULT_BIOMES, note: "definição do habitat na build pesquisada" },
      ...(tame ? [{ label: `Alex's Mobs Continued · ${tame.tag}.json`, href: `${ROOT}/src/main/resources/data/alexsmobs/tags/items/${tame.tag}.json`, note: "item/tag de domesticação" }] : []),
    ],
  };
});
