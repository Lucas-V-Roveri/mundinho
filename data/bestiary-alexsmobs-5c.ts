import type { BestiaryEntry, BestiaryModAudit } from "@/types/bestiary";

type RegistryCategory = "MONSTER" | "CREATURE" | "WATER_CREATURE" | "WATER_AMBIENT" | "AMBIENT";
type Spec = readonly [registry: string, name: string, habitatPreset: string, registryCategory: RegistryCategory, dimension: string];

const REGISTRY_SOURCE = "https://github.com/Codx-org/AlexsMobsContinued/blob/ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021/src/main/java/com/github/alexthe666/alexsmobs/entity/AMEntityRegistry.java";
const BIOME_SOURCE = "https://github.com/Codx-org/AlexsMobsContinued/blob/ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021/src/main/java/com/github/alexthe666/alexsmobs/config/BiomeConfig.java";
const DEFAULT_BIOMES_SOURCE = "https://github.com/Codx-org/AlexsMobsContinued/blob/ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021/src/main/java/com/github/alexthe666/alexsmobs/config/DefaultBiomes.java";

const SPECS: Spec[] = [
  ["grizzly_bear", "Grizzly Bear", "ALL_FOREST", "CREATURE", "Overworld"],
  ["roadrunner", "Roadrunner", "ROADRUNNER", "CREATURE", "Overworld"],
  ["gazelle", "Gazelle", "GAZELLE", "CREATURE", "Overworld"],
  ["crocodile", "Crocodile", "CROCODILE", "CREATURE", "Overworld"],
  ["fly", "Fly", "FLY", "AMBIENT", "Overworld"],
  ["hummingbird", "Hummingbird", "HUMMINGBIRD", "CREATURE", "Overworld"],
  ["orca", "Orca", "ORCA", "WATER_CREATURE", "Overworld"],
  ["sunbird", "Sunbird", "SUNBIRD", "CREATURE", "Overworld"],
  ["gorilla", "Gorilla", "GORILLA", "CREATURE", "Overworld"],
  ["crimson_mosquito", "Crimson Mosquito", "CRIMSON_MOSQUITO", "MONSTER", "Nether"],
  ["rattlesnake", "Rattlesnake", "RATTLESNAKE", "CREATURE", "Overworld"],
  ["endergrade", "Endergrade", "ENDERGRADE", "CREATURE", "The End"],
  ["hammerhead_shark", "Hammerhead Shark", "HAMMERHEAD", "WATER_CREATURE", "Overworld"],
  ["lobster", "Lobster", "LOBSTER", "WATER_AMBIENT", "Overworld"],
  ["komodo_dragon", "Komodo Dragon", "KOMODO_DRAGON", "CREATURE", "Overworld"],
  ["capuchin_monkey", "Capuchin Monkey", "CAPUCHIN_MONKEY", "CREATURE", "Overworld"],
  ["centipede_head", "Cave Centipede", "CAVES_MONSTER", "MONSTER", "Overworld"],
  ["warped_toad", "Warped Toad", "WARPED_TOAD", "CREATURE", "Nether"],
  ["moose", "Moose", "MOOSE", "CREATURE", "Overworld"],
  ["mimicube", "Mimicube", "MIMICUBE", "MONSTER", "The End"],
  ["raccoon", "Raccoon", "RACCOON", "CREATURE", "Overworld"],
  ["blobfish", "Blobfish", "DEEP_SEA", "WATER_AMBIENT", "Overworld"],
  ["seal", "Seal", "SEAL", "CREATURE", "Overworld"],
  ["cockroach", "Cockroach", "COCKROACH", "AMBIENT", "Overworld"],
  ["shoebill", "Shoebill", "SHOEBILL", "CREATURE", "Overworld"],
  ["elephant", "Elephant", "ELEPHANT", "CREATURE", "Overworld"],
  ["soul_vulture", "Soul Vulture", "SOUL_VULTURE", "MONSTER", "Nether"],
  ["snow_leopard", "Snow Leopard", "SNOW_LEOPARD", "CREATURE", "Overworld"],
  ["spectre", "Spectre", "SPECTRE", "CREATURE", "The End"],
  ["alligator_snapping_turtle", "Alligator Snapping Turtle", "ALLIGATOR_SNAPPING_TURTLE", "CREATURE", "Overworld"],
  ["mungus", "Mungus", "MUNGUS", "CREATURE", "Overworld"],
  ["mantis_shrimp", "Mantis Shrimp", "MANTIS_SHRIMP", "WATER_CREATURE", "Overworld"],
  ["guster", "Guster", "GUSTER", "MONSTER", "Overworld"],
  ["warped_mosco", "Warped Mosco", "EMPTY", "MONSTER", "Nether"],
  ["straddler", "Straddler", "STRADDLER", "MONSTER", "Nether"],
  ["stradpole", "Stradpole", "STRADDLER", "WATER_AMBIENT", "Nether"],
  ["emu", "Emu", "SAVANNA_AND_MESA", "CREATURE", "Overworld"],
  ["platypus", "Platypus", "ICE_FREE_RIVER", "CREATURE", "Overworld"],
  ["dropbear", "Dropbear", "DROPBEAR", "MONSTER", "Nether"],
  ["tasmanian_devil", "Tasmanian Devil", "TASMANIAN_DEVIL", "CREATURE", "Overworld"],
  ["kangaroo", "Kangaroo", "SAVANNA_AND_MESA", "CREATURE", "Overworld"],
  ["cachalot_whale", "Cachalot Whale", "CACHALOT_WHALE", "WATER_CREATURE", "Overworld"],
  ["leafcutter_ant", "Leafcutter Ant", "LEAFCUTTER_ANTHILL", "CREATURE", "Overworld"],
  ["enderiophage", "Enderiophage", "ENDERIOPHAGE", "CREATURE", "The End"],
  ["bald_eagle", "Bald Eagle", "BALD_EAGLE", "CREATURE", "Overworld"],
  ["tiger", "Tiger", "TIGER", "CREATURE", "Overworld"],
  ["tarantula_hawk", "Tarantula Hawk", "DESERT", "CREATURE", "Overworld"],
  ["void_worm", "Void Worm", "EMPTY", "MONSTER", "The End"],
  ["frilled_shark", "Frilled Shark", "DEEP_SEA", "WATER_CREATURE", "Overworld"],
  ["mimic_octopus", "Mimic Octopus", "MIMIC_OCTOPUS", "WATER_CREATURE", "Overworld"],
  ["seagull", "Seagull", "SEAGULL", "CREATURE", "Overworld"],
  ["froststalker", "Froststalker", "FROSTSTALKER", "CREATURE", "Overworld"],
  ["tusklin", "Tusklin", "TUSKLIN", "CREATURE", "Overworld"],
  ["laviathan", "Laviathan", "ALL_NETHER", "CREATURE", "Nether"],
  ["cosmaw", "Cosmaw", "COSMAW", "CREATURE", "The End"],
  ["toucan", "Toucan", "TOUCAN", "CREATURE", "Overworld"],
  ["maned_wolf", "Maned Wolf", "MANED_WOLF", "CREATURE", "Overworld"],
  ["anaconda", "Anaconda", "ANACONDA", "CREATURE", "Overworld"],
  ["anteater", "Anteater", "ANTEATER", "CREATURE", "Overworld"],
  ["rocky_roller", "Rocky Roller", "ROCKY_ROLLER", "MONSTER", "Overworld"],
  ["flutter", "Flutter", "FLUTTER", "AMBIENT", "Overworld"],
  ["gelada_monkey", "Gelada Monkey", "MEADOWS", "CREATURE", "Overworld"],
  ["jerboa", "Jerboa", "DESERT", "AMBIENT", "Overworld"],
  ["terrapin", "Terrapin", "ICE_FREE_RIVER", "WATER_AMBIENT", "Overworld"],
  ["comb_jelly", "Comb Jelly", "COMB_JELLY", "WATER_AMBIENT", "Overworld"],
  ["cosmic_cod", "Cosmic Cod", "COSMIC_COD", "AMBIENT", "The End"],
  ["bunfungus", "Bunfungus", "MUNGUS", "CREATURE", "Overworld"],
  ["bison", "Bison", "BISON", "CREATURE", "Overworld"],
  ["giant_squid", "Giant Squid", "GIANT_SQUID", "WATER_CREATURE", "Overworld"],
  ["sea_bear", "Sea Bear", "SEA_BEAR", "WATER_CREATURE", "Overworld"],
  ["devils_hole_pupfish", "Devil's Hole Pupfish", "ALL_OVERWORLD", "WATER_AMBIENT", "Overworld"],
  ["catfish", "Catfish", "CATFISH", "WATER_AMBIENT", "Overworld"],
  ["flying_fish", "Flying Fish", "FLYING_FISH", "WATER_AMBIENT", "Overworld"],
  ["skelewag", "Skelewag", "SKELEWAG", "MONSTER", "Overworld"],
  ["rain_frog", "Rain Frog", "DESERT", "AMBIENT", "Overworld"],
  ["potoo", "Potoo", "POTOO", "CREATURE", "Overworld"],
  ["mudskipper", "Mudskipper", "MANGROVE", "CREATURE", "Overworld"],
  ["rhinoceros", "Rhinoceros", "RHINOCEROS", "CREATURE", "Overworld"],
  ["sugar_glider", "Sugar Glider", "SUGAR_GLIDER", "CREATURE", "Overworld"],
  ["farseer", "Farseer", "FARSEER", "MONSTER", "The End"],
  ["skreecher", "Skreecher", "SKREECHER", "CREATURE", "Overworld"],
  ["underminer", "Underminer", "CAVES", "AMBIENT", "Overworld"],
  ["murmur", "Murmur", "CAVES_MONSTER", "MONSTER", "Overworld"],
  ["skunk", "Skunk", "SKUNK", "CREATURE", "Overworld"],
  ["banana_slug", "Banana Slug", "BANANA_SLUG", "CREATURE", "Overworld"],
  ["blue_jay", "Blue Jay", "ALL_FOREST", "CREATURE", "Overworld"],
  ["caiman", "Caiman", "MANGROVE", "CREATURE", "Overworld"],
  ["triops", "Triops", "DESERT", "WATER_AMBIENT", "Overworld"],
];

const categoryLabel: Record<RegistryCategory, string> = {
  MONSTER: "Monstro",
  CREATURE: "Criatura",
  WATER_CREATURE: "Criatura aquática",
  WATER_AMBIENT: "Fauna aquática",
  AMBIENT: "Fauna ambiente",
};

function behaviorFor(category: RegistryCategory) {
  return category === "MONSTER" ? "Hostil (registro MONSTER)" : "Comportamento fino a conferir";
}

function typeFor(category: RegistryCategory): BestiaryEntry["type"] {
  return category === "MONSTER" ? "Hostil" : "Não confirmado";
}

function dangerFor(category: RegistryCategory): BestiaryEntry["danger"] {
  if (category === "MONSTER") return "Médio";
  if (category === "AMBIENT" || category === "WATER_AMBIENT") return "Baixo";
  return "Médio";
}

function makeEntry([registry, name, habitatPreset, registryCategory, dimension]: Spec): BestiaryEntry {
  const special = registry === "void_worm";
  const noNaturalPreset = habitatPreset === "EMPTY";
  return {
    id: `alexsmobs-${registry.replaceAll("_", "-")}`,
    namePt: name,
    nameEn: name,
    mod: "Alex's Mobs Continued",
    version: "2.1.14 · pack 1.21.1",
    registryId: `alexsmobs:${registry}`,
    category: special ? "Chefe" : categoryLabel[registryCategory],
    behavior: special ? "Chefe hostil; invocação e combate detalhados ficam no marco correspondente" : behaviorFor(registryCategory),
    type: special ? "Chefe" : typeFor(registryCategory),
    danger: special ? "Severo" : dangerFor(registryCategory),
    summary: special
      ? "Entidade de chefe registrada nesta build. O Bestiário confirma existência e origem; o passo a passo permanece na Progressão para não duplicar o guia."
      : "Criatura registrada na build 2.1.14. Este card fecha existência, categoria de spawn e habitat-base sem copiar atributos ou drops de outra versão.",
    dimensions: [dimension],
    locations: noNaturalPreset
      ? ["Preset de bioma EMPTY: sem spawn natural definido pela configuração-base consultada"]
      : [`Preset de bioma ${habitatPreset} em BiomeConfig/DefaultBiomes`],
    habitat: habitatPreset,
    howToFind: noNaturalPreset
      ? "A configuração-base desta build associa a criatura ao preset EMPTY. O Bestiário não inventa um spawn natural; consulte o guia/mecânica específica quando ela for documentada."
      : `A build 2.1.14 associa esta criatura ao preset ${habitatPreset}. A lista exata de biomas e compatibilidades fica no DefaultBiomes da mesma revisão.`,
    drops: [],
    notes: [
      "Atributos, drops, domesticação e mecânicas finas não são preenchidos em massa: entram apenas após auditoria da classe/loot table desta mesma build.",
      registryCategory !== "MONSTER" ? "MobCategory do registry não prova passividade ou neutralidade; por isso o tipo comportamental fica como ‘Não confirmado’." : "O registry usa MobCategory.MONSTER, então o card pode classificar o comportamento-base como hostil.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    confidence: "Alta",
    sources: [
      { label: "Alex's Mobs Continued 2.1.14 · registry", href: REGISTRY_SOURCE, note: "entidade e MobCategory na revisão usada pelo pack" },
      { label: "Alex's Mobs Continued 2.1.14 · BiomeConfig", href: BIOME_SOURCE, note: `vínculo da entidade ao preset ${habitatPreset}` },
      { label: "Alex's Mobs Continued 2.1.14 · DefaultBiomes", href: DEFAULT_BIOMES_SOURCE, note: "definições dos presets e compatibilidades de bioma" },
    ],
  };
}

export const ALEXS_MOBS_5C: BestiaryEntry[] = SPECS.map(makeEntry);

export const ALEXS_MOBS_5C_AUDIT: BestiaryModAudit = {
  mod: "Alex's Mobs Continued",
  version: "2.1.14",
  status: "inventariado",
  sourceHref: REGISTRY_SOURCE,
  note: "90 mobs vivos separados de projéteis/partes técnicas; Bone Serpent e Crow permanecem no 5A, e 88 novas entradas entram no 5C. Existência, MobCategory e preset de bioma foram cruzados na revisão exata usada pelo pack.",
};
