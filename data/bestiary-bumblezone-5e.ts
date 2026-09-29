import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "78c52256e38a537a31839b264e6058138e6cb4e8";
const SOURCE_ROOT = `https://github.com/TelepathicGrunt/Bumblezone/blob/${SOURCE_COMMIT}`;
const REGISTRY_URL = `${SOURCE_ROOT}/common/src/main/java/com/telepathicgrunt/the_bumblezone/modinit/BzEntities.java`;
const LANG_EN_URL = `${SOURCE_ROOT}/common/src/main/resources/assets/the_bumblezone/lang/en_us.json`;
const LANG_PT_URL = `${SOURCE_ROOT}/common/src/main/resources/assets/the_bumblezone/lang/pt_br.json`;
const VERSION_URL = `${SOURCE_ROOT}/gradle.properties`;
const GUIDE_HREF = "/mods#guide-bumblezone";

const BEEHEMOTH_URL = `${SOURCE_ROOT}/common/src/main/java/com/telepathicgrunt/the_bumblezone/entities/mobs/BeehemothEntity.java`;
const BEE_QUEEN_URL = `${SOURCE_ROOT}/common/src/main/java/com/telepathicgrunt/the_bumblezone/entities/mobs/BeeQueenEntity.java`;
const HONEY_SLIME_URL = `${SOURCE_ROOT}/common/src/main/java/com/telepathicgrunt/the_bumblezone/entities/mobs/HoneySlimeEntity.java`;
const ROOTMIN_URL = `${SOURCE_ROOT}/common/src/main/java/com/telepathicgrunt/the_bumblezone/entities/mobs/RootminEntity.java`;
const VARIANT_BEE_URL = `${SOURCE_ROOT}/common/src/main/java/com/telepathicgrunt/the_bumblezone/entities/mobs/VariantBeeEntity.java`;
const COSMIC_CRYSTAL_URL = `${SOURCE_ROOT}/common/src/main/java/com/telepathicgrunt/the_bumblezone/entities/living/CosmicCrystalEntity.java`;
const CONFIG_URL = `${SOURCE_ROOT}/common/src/main/java/com/telepathicgrunt/the_bumblezone/configs/BzGeneralConfigs.java`;

const BASE_SOURCES: BestiaryEntry["sources"] = [
  { label: "The Bumblezone 7.15.3 · BzEntities.java", href: REGISTRY_URL, note: "registry literal das entidades e MobCategory da build instalada" },
  { label: "The Bumblezone 7.15.3 · en_us.json", href: LANG_EN_URL, note: "nomes publicados e chaves entity.the_bumblezone.<id>" },
  { label: "The Bumblezone 7.15.3 · pt_br.json", href: LANG_PT_URL, note: "traduções oficiais usadas nos nomes em português" },
  { label: "The Bumblezone 7.15.3 · gradle.properties", href: VERSION_URL, note: "mod_version=7.15.3 na revisão auditada" },
];

function sources(...extra: BestiaryEntry["sources"]): BestiaryEntry["sources"] {
  return [...BASE_SOURCES, ...extra];
}

export const BUMBLEZONE_BESTIARY_5E: BestiaryEntry[] = [
  {
    id: "bumblezone-variant-bee",
    namePt: "Abelha Variante",
    nameEn: "Bee Variant",
    mod: "The Bumblezone",
    version: "7.15.3 · pack 1.21.1 NeoForge",
    registryId: "the_bumblezone:variant_bee",
    depth: "compact",
    category: "Criatura variante",
    behavior: "Neutro · herda o comportamento-base de Bee",
    danger: "Baixo",
    summary: "Entidade própria do Bumblezone que estende a abelha vanilla e escolhe uma variante visual/configurada. Pode cruzar com abelhas vanilla e com outras Variant Bees.",
    dimensions: ["The Bumblezone"],
    locations: [],
    howToFind: "O registry permite spawn sem restrição própria de bloco; a taxa e a distribuição fina dependem da configuração/worldgen. Esta auditoria não inventa um bioma específico.",
    drops: [],
    notes: [
      "O código 7.15.3 registra a entidade como MobCategory.CREATURE e VariantBeeEntity estende Bee.",
      "A lista padrão de variantes e a taxa pós-worldgen são configuráveis; o card representa a entidade, não cada textura como mob separado.",
    ],
    track: ["seen"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources({ label: "VariantBeeEntity.java", href: VARIANT_BEE_URL, note: "herança de Bee, variantes e reprodução" }),
  },
  {
    id: "bumblezone-honey-slime",
    namePt: "Slime de Mel",
    nameEn: "Honey Slime",
    mod: "The Bumblezone",
    version: "7.15.3 · pack 1.21.1 NeoForge",
    registryId: "the_bumblezone:honey_slime",
    depth: "compact",
    category: "Criatura neutra",
    behavior: "Neutro · possui vingança/anger e pode atacar quando provocado",
    danger: "Baixo",
    summary: "Slime de mel do Bumblezone. É um Animal/NeutralMob, pode entrar em estado de raiva e adultos se dividem ao morrer.",
    dimensions: ["The Bumblezone"],
    locations: [],
    howToFind: "Possui spawn placement próprio registrado no Bumblezone. A distribuição exata por estrutura/bioma não foi fixada sem uma fonte versionada adicional.",
    health: "8 HP adulto · 2 HP filhote",
    attack: "3 adulto · 1 filhote (atributo-base após setup)",
    drops: [],
    notes: [
      "HoneySlimeEntity implementa NeutralMob e registra goals de revenge/anger.",
      "Ao morrer, um adulto pode se dividir em 2–4 slimes menores; em estado de mel, os filhos continuam Honey Slimes.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources({ label: "HoneySlimeEntity.java", href: HONEY_SLIME_URL, note: "atributos, neutralidade, anger e divisão" }),
  },
  {
    id: "bumblezone-beehemoth",
    namePt: "Beehemoth",
    nameEn: "Beehemoth",
    mod: "The Bumblezone",
    version: "7.15.3 · pack 1.21.1 NeoForge",
    registryId: "the_bumblezone:beehemoth",
    depth: "full",
    category: "Montaria domesticável",
    behavior: "Passivo/domesticável · voador, montável e selável após domesticação",
    danger: "Baixo",
    summary: "Grande abelha domesticável do Bumblezone. A mecânica central é amizade: depois de domado, pode receber sela, ser montado e evoluir para Queen Beehemoth ao atingir 1000 de friendship.",
    dimensions: ["The Bumblezone"],
    locations: [],
    howToFind: "A entidade possui spawn placement natural registrado no mod. A auditoria confirma o mob e suas mecânicas, mas não fixa um bioma específico sem fonte versionada suficiente.",
    health: "40 HP base; amizade pode adicionar até +20 HP",
    attack: "4 de dano base",
    interaction: "Depois de domesticado pelo dono, aceita itens de alimentação de abelha para cura/amizade. Pode receber sela, sentar e servir de montaria voadora. Ao chegar a 1000 de amizade, vira Queen Beehemoth.",
    taming: "Royal Jelly Bucket e Royal Jelly Bottle têm chance 100% no código 7.15.3. Honey Bucket e Bee Bread usam 25%; itens aceitos com 'honey' no id usam 10%; os demais itens da tag de alimentação usam 6,7%.",
    drops: [],
    notes: [
      "BeehemothEntity estende TamableAnimal e implementa FlyingAnimal, Saddleable e PlayerRideable.",
      "A amizade é persistida entre -100 e 1000; ferir o próprio Beehemoth pode reduzir friendship.",
      "Os números de domesticação acima vêm diretamente de mobInteract na revisão 7.15.3.",
    ],
    track: ["seen", "tamed"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources({ label: "BeehemothEntity.java", href: BEEHEMOTH_URL, note: "atributos, domesticação, friendship, sela e montaria" }),
  },
  {
    id: "bumblezone-bee-queen",
    namePt: "Abelha Rainha",
    nameEn: "Bee Queen",
    mod: "The Bumblezone",
    version: "7.15.3 · pack 1.21.1 NeoForge",
    registryId: "the_bumblezone:bee_queen",
    depth: "full",
    category: "NPC / quest",
    behavior: "Neutro · comerciante/quest giver; fica hostil quando provocada",
    danger: "Médio",
    summary: "Centro da progressão Queen's Desire. A Bee Queen negocia itens, acompanha avanços da linha de missão e entrega a Essence of the Bees ao fim da progressão documentada.",
    dimensions: ["The Bumblezone"],
    locations: [],
    howToFind: "Encontrar e interagir com a Bee Queen é o marco #450 do Mundinho. A localização estrutural fina fica no guia da dimensão; este card mantém apenas o que foi confirmado na build 7.15.3.",
    health: "150 HP",
    attack: "10 de dano base quando entra em combate",
    interaction: "Aceita o sistema próprio de Queen Trades e a linha Queen's Desire. O próprio lang da build documenta reset dos avanços com clique direito de mão vazia e mensagens de itens desejados/bonus trade.",
    drops: [],
    notes: [
      "BeeQueenEntity estende Animal e implementa NeutralMob.",
      "Atacá-la inicia persistent anger; com agressividade de abelhas ativa, o ataque pode aplicar Wrath of the Hive em vez de Protection of the Hive.",
      "A classe define a Essence of the Bees como recompensa garantida da etapa final gerenciada pela Queen.",
    ],
    track: ["seen"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:450",
    sources: sources({ label: "BeeQueenEntity.java", href: BEE_QUEEN_URL, note: "atributos, neutralidade, Queen Trades, Queen's Desire e Essence reward" }),
  },
  {
    id: "bumblezone-rootmin",
    namePt: "Rootmin",
    nameEn: "Rootmin",
    mod: "The Bumblezone",
    version: "7.15.3 · pack 1.21.1 NeoForge",
    registryId: "the_bumblezone:rootmin",
    depth: "compact",
    category: "Monstro",
    behavior: "Hostil · Enemy com ataques de projétil e estados de esconder/curiosidade/raiva",
    danger: "Médio",
    summary: "Criatura hostil do Bumblezone que alterna estados de esconderijo e combate e pode disparar Dirt Pellets, inclusive variantes homing em suas rotinas de ataque.",
    dimensions: ["The Bumblezone"],
    locations: [],
    howToFind: "O registry o classifica como MobCategory.MONSTER e registra spawn placement em solo. A classe possui lógica de flor adaptada ao Floral Meadow, mas isso não foi tratado como prova de exclusividade de spawn.",
    drops: [],
    notes: [
      "RootminEntity implementa Enemy e OwnableEntity; o Bestiário não presume domesticação porque a ownership aparece também em contexto de Essence Event.",
      "A classe mantém poses próprias para angry, curious, curse, embarrassed, shock, shoot e esconder/revelar.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources({ label: "RootminEntity.java", href: ROOTMIN_URL, note: "hostilidade, estados, projéteis e lógica de flor" }),
  },
  {
    id: "bumblezone-cosmic-crystal",
    namePt: "Entidade de Cristal Cósmico",
    nameEn: "Cosmic Crystal Entity",
    mod: "The Bumblezone",
    version: "7.15.3 · pack 1.21.1 NeoForge",
    registryId: "the_bumblezone:cosmic_crystal_entity",
    depth: "full",
    category: "Chefe de evento",
    behavior: "Hostil / entidade de combate de Essence Event",
    danger: "Severo",
    summary: "Entidade viva especial dos Essence Events. O combate alterna estados de esmagamento, giro e múltiplos padrões de laser, com suporte a segunda fase, escudo e escala de dificuldade.",
    dimensions: ["The Bumblezone"],
    locations: ["Essence Event"],
    howToFind: "É controlado por um Essence Controller e aparece dentro da progressão de Essence Events/Sempiternal Sanctum. No Mundinho, essa etapa está ligada ao marco #470.",
    health: "60 HP por padrão (config cosmicCrystalHealth)",
    attack: "Variável · tracking smash/spin e lasers vertical, horizontal, sweep e tracking",
    interaction: "Não é um NPC de troca ou criatura domesticável. O código o modela como LivingEntity de arena, com alvo de combate, shield, difficulty boost e estados de ataque sincronizados.",
    drops: [],
    notes: [
      "Apesar de estar em MobCategory.MISC no registry, CosmicCrystalEntity é uma LivingEntity com atributos próprios e por isso entra no Bestiário como criatura jogável de combate.",
      "O valor padrão de vida é 60 na configuração 7.15.3; servidores podem alterar cosmicCrystalHealth.",
      "A classe registra estados NORMAL, TRACKING_SMASHING_ATTACK, TRACKING_SPINNING_ATTACK, VERTICAL_LASER, HORIZONTAL_LASER, SWEEP_LASER e TRACKING_LASER.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:470",
    sources: sources(
      { label: "CosmicCrystalEntity.java", href: COSMIC_CRYSTAL_URL, note: "LivingEntity, estados de combate, shield e difficulty boost" },
      { label: "BzGeneralConfigs.java", href: CONFIG_URL, note: "cosmicCrystalHealth=60 na configuração padrão 7.15.3" },
    ),
  },
];

export const BUMBLEZONE_BESTIARY_5E_COUNT = BUMBLEZONE_BESTIARY_5E.length;
export const BUMBLEZONE_BESTIARY_5E_FULL = BUMBLEZONE_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const BUMBLEZONE_BESTIARY_5E_COMPACT = BUMBLEZONE_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
