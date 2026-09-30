import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "fedbebcef160c47aca4e8bdfa82fc7473b7eabee";
const SOURCE_ROOT = `https://github.com/Stardust-Labs-MC/Incendium/blob/${SOURCE_COMMIT}`;
const INFERNO_URL = `${SOURCE_ROOT}/data/incendium/functions/hovering_inferno/summon.mcfunction`;
const SENTRY_URL = `${SOURCE_ROOT}/data/incendium/functions/entity/sentry/init.mcfunction`;
const SANCTUM_URL = `${SOURCE_ROOT}/data/incendium/functions/sanctum/mob/init.mcfunction`;
const MOB_INIT_URL = `${SOURCE_ROOT}/data/incendium/functions/entity/mob/init.mcfunction`;
const REACTOR_URL = `${SOURCE_ROOT}/data/incendium/worldgen/structure_set/greater_structures.json`;
const VERSION_EVIDENCE_URL = "https://github.com/Stardust-Labs-MC/Incendium/issues/106";

const BASE_SOURCES: BestiaryEntry["sources"] = [
  {
    label: "Incendium · fonte oficial",
    href: `https://github.com/Stardust-Labs-MC/Incendium/tree/${SOURCE_COMMIT}`,
    note: "datapack oficial: os encontros usam entidades vanilla com tags/NBT/functions em vez de registrar EntityTypes incendium:*",
  },
  {
    label: "Incendium 5.4.4 · compatibilidade 1.21–1.21.1",
    href: VERSION_EVIDENCE_URL,
    note: "issue oficial registra v5.4.4 em Minecraft 1.21–1.21.1",
  },
];

const HOVERING_INFERNO: BestiaryEntry = {
  id: "incendium-hovering-inferno",
  namePt: "Hovering Inferno",
  nameEn: "Hovering Inferno",
  mod: "Incendium",
  version: "5.4.4 · Minecraft 1.21.1",
  registryId: "minecraft:blaze",
  depth: "full",
  category: "Chefe customizado via datapack · Blaze",
  behavior: "Hostil · encontro de boss controlado por functions/tags do Incendium",
  danger: "Severo",
  summary: "Boss do Incendium construído sobre um Blaze vanilla customizado. A função oficial de summon cria literalmente um blaze e então aplica atributos, tags e a lógica própria do encontro.",
  dimensions: ["Nether"],
  locations: ["Infernal Altar"],
  howToFind: "O encontro é ligado ao sistema de Infernal Altar do Incendium. O Bestiário usa minecraft:blaze como registryId porque não existe EntityType incendium:hovering_inferno.",
  drops: [],
  notes: [
    "A função summon.mcfunction cria um Blaze e aplica 700 de vida base, armadura e resistência a knockback na revisão auditada.",
    "A lógica do boss usa tags como in.hovering_inferno / in.inferno_entity e funções próprias para fases e arena.",
  ],
  track: ["seen", "defeated"],
  status: "confirmado (2+ fontes)",
  sources: [
    ...BASE_SOURCES,
    {
      label: "Hovering Inferno · summon.mcfunction",
      href: INFERNO_URL,
      note: "confirma que o tipo-base é minecraft:blaze e documenta a inicialização do boss",
    },
  ],
};

const PIPELINE_SENTRY: BestiaryEntry = {
  id: "incendium-pipeline-sentry",
  namePt: "Pipeline Sentry",
  nameEn: "Pipeline Sentry",
  mod: "Incendium",
  version: "5.4.4 · Minecraft 1.21.1",
  registryId: "minecraft:blaze",
  depth: "compact",
  category: "Variante customizada · Blaze",
  behavior: "Hostil · sentinela de pipeline",
  danger: "Alto",
  summary: "Blaze customizado usado como sentinela nas Pipelines de Incendium. A lógica oficial identifica a criatura pela tag in.sentry e altera nome/comportamento via functions.",
  dimensions: ["Nether"],
  locations: ["Pipeline"],
  howToFind: "Explore as Pipelines do Incendium. O advancement oficial reconhece explicitamente a derrota de um Pipeline Sentry.",
  drops: [],
  notes: ["Não existe EntityType incendium:pipeline_sentry; o tipo-base verificado é minecraft:blaze."],
  track: ["seen", "defeated"],
  status: "confirmado (2+ fontes)",
  sources: [
    ...BASE_SOURCES,
    { label: "Pipeline Sentry · init.mcfunction", href: SENTRY_URL, note: "nome customizado e tag in.sentry" },
  ],
};

const SANCTUM_CULTIST: BestiaryEntry = {
  id: "incendium-sanctum-cultist",
  namePt: "Sanctum Cultist",
  nameEn: "Sanctum Cultist",
  mod: "Incendium",
  version: "5.4.4 · Minecraft 1.21.1",
  registryId: "minecraft:pillager",
  depth: "compact",
  category: "Variante customizada · Pillager",
  behavior: "Hostil · cultista do Sanctum",
  danger: "Alto",
  summary: "Pillager customizado do Sanctum. A função oficial de spawn invoca um pillager com a tag in.sanctum_cultist e a inicialização troca seu nome para Sanctum Cultist.",
  dimensions: ["Nether"],
  locations: ["Sanctum"],
  howToFind: "Aparece como parte dos encontros do Sanctum. O tipo real continua sendo minecraft:pillager.",
  drops: [],
  notes: ["Incendium implementa o Cultist por tags/NBT, não por um novo registry de entidade."],
  track: ["seen", "defeated"],
  status: "confirmado (2+ fontes)",
  sources: [
    ...BASE_SOURCES,
    { label: "Sanctum mobs · init.mcfunction", href: SANCTUM_URL, note: "confirma pillager + tag in.sanctum_cultist e nome Sanctum Cultist" },
  ],
};

const SANCTUM_INFERNO: BestiaryEntry = {
  id: "incendium-sanctum-inferno",
  namePt: "Sanctum Inferno",
  nameEn: "Sanctum Inferno",
  mod: "Incendium",
  version: "5.4.4 · Minecraft 1.21.1",
  registryId: "minecraft:blaze",
  depth: "compact",
  category: "Variante customizada · Blaze / encounter do Sanctum",
  behavior: "Hostil · criatura customizada por datapack",
  danger: "Alto",
  summary: "Entrada aprovada para a variante de Inferno ligada ao Sanctum. Como Incendium não registra tipos próprios, o card preserva o tipo-base Blaze em vez de publicar um ID incendium:* fictício.",
  dimensions: ["Nether"],
  locations: ["Sanctum"],
  howToFind: "Procure o encounter correspondente dentro do Sanctum; o card evita congelar uma taxa de spawn que o datapack não expõe como EntityType separado.",
  drops: [],
  notes: [
    "A revisão auditada roteia os mobs do Sanctum por tags/functions e o sistema de Inferno por lógica de Blaze customizado.",
    "Nome mantido conforme o inventário aprovado do pack; registryId representa o tipo vanilla subjacente, não um ID próprio do datapack.",
  ],
  track: ["seen", "defeated"],
  status: "confirmado (1 fonte)",
  sources: [
    ...BASE_SOURCES,
    { label: "Incendium · mob init", href: MOB_INIT_URL, note: "roteamento por tags para mobs do Sanctum e lógica de Inferno" },
  ],
};

const NETHER_REACTOR: BestiaryEntry = {
  id: "incendium-nether-reactor",
  namePt: "Nether Reactor",
  nameEn: "Nether Reactor",
  mod: "Incendium",
  version: "5.4.4 · Minecraft 1.21.1",
  registryId: "incendium:nether_reactor",
  depth: "compact",
  category: "Encounter / estrutura",
  behavior: "Estrutura hostil com mobs customizados; não é EntityType",
  danger: "Alto",
  summary: "Nether Reactor é um encounter estrutural do Incendium incluído no inventário aprovado do Bestiário. A fonte oficial registra incendium:nether_reactor como estrutura e inicializa seus mobs especiais separadamente.",
  dimensions: ["Nether"],
  locations: ["Nether Reactor"],
  howToFind: "Gera no conjunto de estruturas maiores do Incendium. O advancement oficial inclui objetivos de saquear o Nether Reactor.",
  drops: [],
  notes: [
    "registryId aqui é o ID real da estrutura, não de uma entidade.",
    "A lógica do Reactor inicializa, entre outros, Ghast Sentry (ghast) e Director (wither skeleton); esses auxiliares não viram cards extras porque o alvo aprovado deste lote é o encounter Nether Reactor.",
  ],
  track: ["seen"],
  status: "confirmado (2+ fontes)",
  sources: [
    ...BASE_SOURCES,
    { label: "greater_structures.json", href: REACTOR_URL, note: "confirma incendium:nether_reactor no structure set" },
    { label: "entity/mob/init.mcfunction", href: MOB_INIT_URL, note: "confirma os mobs especiais do Nether Reactor" },
  ],
};

export const INCENDIUM_BESTIARY_5E: BestiaryEntry[] = [
  HOVERING_INFERNO,
  PIPELINE_SENTRY,
  SANCTUM_CULTIST,
  SANCTUM_INFERNO,
  NETHER_REACTOR,
];
export const INCENDIUM_BESTIARY_5E_COUNT = INCENDIUM_BESTIARY_5E.length;
export const INCENDIUM_BESTIARY_5E_FULL = INCENDIUM_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const INCENDIUM_BESTIARY_5E_COMPACT = INCENDIUM_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
