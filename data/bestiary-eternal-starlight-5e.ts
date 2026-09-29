import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "e412e1e144137889125b7d2885f2598a936ec7b6";
const SOURCE_ROOT = `https://github.com/LeoMinecraftModding/eternal-starlight/blob/${SOURCE_COMMIT}`;
const REGISTRY_URL = `${SOURCE_ROOT}/common/src/main/java/cn/leolezury/eternalstarlight/common/registry/ESEntities.java`;
const ITEMS_URL = `${SOURCE_ROOT}/common/src/main/java/cn/leolezury/eternalstarlight/common/registry/ESItems.java`;
const WIP_URL = `${SOURCE_ROOT}/common/src/generated/resources/data/eternal_starlight/tags/item/wip.json`;
const LANG_EN_URL = `${SOURCE_ROOT}/common/src/main/resources/assets/eternal_starlight/lang/en_us.json`;
const LANG_PT_URL = `${SOURCE_ROOT}/common/src/main/resources/assets/eternal_starlight/lang/pt_br.json`;
const VERSION_URL = `${SOURCE_ROOT}/gradle.properties`;
const GUIDE_HREF = "/mods#guide-eternal-starlight";

const GATEKEEPER_URL = `${SOURCE_ROOT}/common/src/main/java/cn/leolezury/eternalstarlight/common/entity/living/boss/gatekeeper/TheGatekeeper.java`;
const STARLIGHT_GOLEM_URL = `${SOURCE_ROOT}/common/src/main/java/cn/leolezury/eternalstarlight/common/entity/living/boss/golem/StarlightGolem.java`;
const LUNAR_MONSTROSITY_URL = `${SOURCE_ROOT}/common/src/main/java/cn/leolezury/eternalstarlight/common/entity/living/boss/monstrosity/LunarMonstrosity.java`;
const TANGLED_URL = `${SOURCE_ROOT}/common/src/main/java/cn/leolezury/eternalstarlight/common/entity/living/monster/Tangled.java`;

const BASE_SOURCES: BestiaryEntry["sources"] = [
  { label: "Eternal Starlight 0.9.0 · ESEntities.java", href: REGISTRY_URL, note: "registry literal e MobCategory da revisão instalada" },
  { label: "Eternal Starlight 0.9.0 · ESItems.java", href: ITEMS_URL, note: "32 Spawn Eggs registrados na build" },
  { label: "Eternal Starlight 0.9.0 · wip.json", href: WIP_URL, note: "boarwarf_spawn_egg e astral_golem_spawn_egg marcados WIP; restam 30 alvos publicados" },
  { label: "Eternal Starlight 0.9.0 · en_us.json", href: LANG_EN_URL, note: "nomes oficiais em inglês" },
  { label: "Eternal Starlight 0.9.0 · pt_br.json", href: LANG_PT_URL, note: "traduções oficiais usadas no Bestiário" },
  { label: "Eternal Starlight 0.9.0 · gradle.properties", href: VERSION_URL, note: "mod_version=0.9.0 e minecraft_version=1.21.1" },
];

function sources(...extra: BestiaryEntry["sources"]): BestiaryEntry["sources"] {
  return [...BASE_SOURCES, ...extra];
}

type CompactSpec = {
  id: string;
  namePt: string;
  nameEn: string;
  category: string;
  mobCategory: "MONSTER" | "CREATURE" | "AMBIENT" | "WATER_CREATURE" | "WATER_AMBIENT";
  danger?: BestiaryEntry["danger"];
  note?: string;
};

function compact(spec: CompactSpec): BestiaryEntry {
  const hostile = spec.mobCategory === "MONSTER";
  const aquatic = spec.mobCategory === "WATER_CREATURE" || spec.mobCategory === "WATER_AMBIENT";
  const ambient = spec.mobCategory === "AMBIENT" || spec.mobCategory === "WATER_AMBIENT";
  return {
    id: `eternal-starlight-${spec.id.replaceAll("_", "-")}`,
    namePt: spec.namePt,
    nameEn: spec.nameEn,
    mod: "Eternal Starlight",
    version: "0.9.0 · pack 1.21.1 NeoForge",
    registryId: `eternal_starlight:${spec.id}`,
    depth: "compact",
    category: spec.category,
    behavior: hostile ? "Hostil · registrado como MONSTER" : ambient ? "Ambiental · criatura de baixa agressividade no registry" : aquatic ? "Fauna aquática" : "Criatura · registrada como CREATURE",
    danger: spec.danger ?? (hostile ? "Médio" : "Baixo"),
    summary: `${spec.namePt} é uma entidade própria da build 0.9.0 de Eternal Starlight. O card preserva a categoria literal do registry e evita afirmar spawn, drop ou mecânica fina sem uma fonte versionada específica.`,
    dimensions: ["Eternal Starlight"],
    locations: [],
    howToFind: "Na dimensão Eternal Starlight. A distribuição por bioma/estrutura não é fixada neste card quando o registry e os recursos-base não sustentam essa granularidade.",
    drops: [],
    notes: [
      `MobCategory na revisão 0.9.0: ${spec.mobCategory}.`,
      spec.note ?? "Drops e localização fina ficam sem afirmação até uma fonte versionada específica sustentar esses campos.",
    ],
    track: hostile ? ["seen", "defeated"] : ["seen"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources(),
  };
}

const COMPACT_ENTRIES: BestiaryEntry[] = [
  compact({ id: "gleech", namePt: "Sanguessuga Luminosa", nameEn: "Gleech", category: "Monstro", mobCategory: "MONSTER" }),
  compact({ id: "lonestar_skeleton", namePt: "Esqueleto da Estrela Solitária", nameEn: "Lonestar Skeleton", category: "Monstro", mobCategory: "MONSTER" }),
  compact({ id: "nightfall_spider", namePt: "Aranha do Anoitecer", nameEn: "Nightfall Spider", category: "Monstro", mobCategory: "MONSTER" }),
  compact({ id: "seeker", namePt: "Buscador", nameEn: "Seeker", category: "Monstro", mobCategory: "MONSTER", note: "O registry 0.9.0 também marca Seeker como fireImmune." }),
  compact({ id: "thirst_walker", namePt: "Andarilho Sedento", nameEn: "Thirst Walker", category: "Monstro", mobCategory: "MONSTER" }),
  compact({ id: "creteor", namePt: "Creteor", nameEn: "Creteor", category: "Monstro", mobCategory: "MONSTER" }),
  compact({ id: "tiny_creteor", namePt: "Creteor Pequeno", nameEn: "Tiny Creteor", category: "Monstro", mobCategory: "MONSTER" }),
  compact({ id: "stranghoul", namePt: "Carniçal Estranho", nameEn: "Stranghoul", category: "Monstro", mobCategory: "MONSTER" }),
  compact({ id: "ent", namePt: "Ent", nameEn: "Ent", category: "Criatura", mobCategory: "CREATURE" }),
  compact({ id: "ratlin", namePt: "Ratoide", nameEn: "Ratlin", category: "Criatura", mobCategory: "CREATURE" }),
  compact({ id: "zombified_ratlin", namePt: "Ratoide Zumbificado", nameEn: "Zombified Ratlin", category: "Criatura", mobCategory: "CREATURE", note: "Apesar do nome, a entidade é registrada como CREATURE na revisão 0.9.0; o card preserva essa classificação literal." }),
  compact({ id: "shadow_snail", namePt: "Caracol Sombrio", nameEn: "Shadow Snail", category: "Criatura", mobCategory: "CREATURE" }),
  compact({ id: "yeti", namePt: "Iéti", nameEn: "Yeti", category: "Criatura", mobCategory: "CREATURE" }),
  compact({ id: "aurora_deer", namePt: "Cervo Aurora", nameEn: "Aurora Deer", category: "Criatura", mobCategory: "CREATURE" }),
  compact({ id: "crystallized_moth", namePt: "Mariposa Cristalizada", nameEn: "Crystallized Moth", category: "Monstro", mobCategory: "MONSTER" }),
  compact({ id: "shimmer_lacewing", namePt: "Crisopídeo Cintilante", nameEn: "Shimmer Lacewing", category: "Criatura ambiente", mobCategory: "AMBIENT" }),
  compact({ id: "starfire_bird", namePt: "Pássaro de Fogo Estelar", nameEn: "Starfire Bird", category: "Criatura ambiente", mobCategory: "AMBIENT" }),
  compact({ id: "grimstone_golem", namePt: "Golem de Pedra Sombria", nameEn: "Grimstone Golem", category: "Criatura / golem", mobCategory: "CREATURE" }),
  compact({ id: "aethersent_golem", namePt: "Golem Golpe Etéreo", nameEn: "Aethersent Golem", category: "Criatura / golem", mobCategory: "CREATURE" }),
  compact({ id: "rookfish", namePt: "Peixe Torre", nameEn: "Rookfish", category: "Fauna aquática", mobCategory: "WATER_CREATURE" }),
  compact({ id: "luminofish", namePt: "Peixe Luminária", nameEn: "Luminofish", category: "Fauna aquática ambiente", mobCategory: "WATER_AMBIENT" }),
  compact({ id: "luminaris", namePt: "Luminária", nameEn: "Luminaris", category: "Fauna aquática ambiente", mobCategory: "WATER_AMBIENT" }),
  compact({ id: "twilight_gaze", namePt: "Olhar do Crepúsculo", nameEn: "Twilight Gaze", category: "Fauna aquática", mobCategory: "WATER_CREATURE" }),
  compact({ id: "freeze", namePt: "Freeze", nameEn: "Freeze", category: "Monstro", mobCategory: "MONSTER", danger: "Alto", note: "O registry 0.9.0 marca Freeze como fireImmune." }),
  compact({ id: "permafrost", namePt: "Gelo Eterno", nameEn: "Permafrost", category: "Monstro", mobCategory: "MONSTER", danger: "Alto", note: "O registry 0.9.0 marca Permafrost como fireImmune e registra entidades auxiliares próprias de spit/cloud, que não recebem cards separados." }),
  compact({ id: "tangled_skull", namePt: "Crânio Emaranhado", nameEn: "Tangled Skull", category: "Monstro", mobCategory: "MONSTER", danger: "Alto" }),
];

const FULL_ENTRIES: BestiaryEntry[] = [
  {
    id: "eternal-starlight-the-gatekeeper",
    namePt: "O Guardião do Portal",
    nameEn: "The Gatekeeper",
    mod: "Eternal Starlight",
    version: "0.9.0 · pack 1.21.1 NeoForge",
    registryId: "eternal_starlight:the_gatekeeper",
    depth: "full",
    category: "Chefe / NPC / comerciante",
    behavior: "NPC que pode iniciar desafio de boss; implementa Merchant e múltiplas fases de combate",
    danger: "Alto",
    summary: "Gate de acesso à dimensão no Mundinho. Na 0.9.0, The Gatekeeper combina interação de NPC/comerciante com um desafio de boss; o primeiro desafio por jogador entrega os itens usados para abrir o portal.",
    dimensions: ["Overworld"],
    locations: ["Portal Ruins"],
    howToFind: "Marco progression:530: encontrar Portal Ruins, derrotar The Gatekeeper e então abrir o portal para Eternal Starlight.",
    interaction: "A classe implementa Npc e Merchant e possui respostas próprias para challenge, trade e leave. O combate usa um BehaviorManager com fases de greatsword, hammer, dash, bow, fireball, teleport e cura.",
    drops: [],
    notes: [
      "O guia do Mundinho documenta que, na 0.9.0, o primeiro desafio vencido por jogador entrega Glimmering Tablet e Orb of Prophecy.",
      "O registry o classifica como MONSTER, mas a classe também é NPC/Merchant; não é um hostil comum de spawn natural.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:530",
    sources: sources({ label: "TheGatekeeper.java", href: GATEKEEPER_URL, note: "NPC/Merchant, challenge e BehaviorManager de combate" }),
  },
  {
    id: "eternal-starlight-starlight-golem",
    namePt: "Golem da Starlight",
    nameEn: "Starlight Golem",
    mod: "Eternal Starlight",
    version: "0.9.0 · pack 1.21.1 NeoForge",
    registryId: "eternal_starlight:starlight_golem",
    depth: "full",
    category: "Chefe / puzzle",
    behavior: "Hostil · ESBoss com ataques próprios de raio, smash e charge",
    danger: "Severo",
    summary: "Boss da Golem Forge. O marco do Mundinho trata o encontro como boss/puzzle: entender e desligar as fontes de energia é parte da abertura da janela de dano.",
    dimensions: ["Eternal Starlight"],
    locations: ["Golem Forge"],
    howToFind: "Marco progression:550, após o acesso à dimensão pelo Gatekeeper.",
    interaction: "A classe estende ESBoss e implementa RayAttackUser. A implementação possui fases específicas de smash e charge e entidades auxiliares de laser/energized flame que não viram cards separados.",
    drops: [],
    notes: ["Fire-immune no registry 0.9.0.", "O Bestiário preserva o vínculo com o puzzle já documentado na Progressão sem inventar uma sequência adicional."],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:550",
    sources: sources({ label: "StarlightGolem.java", href: STARLIGHT_GOLEM_URL, note: "ESBoss, RayAttackUser e fases próprias" }),
  },
  {
    id: "eternal-starlight-lunar-monstrosity",
    namePt: "Monstruosidade Lunar",
    nameEn: "Lunar Monstrosity",
    mod: "Eternal Starlight",
    version: "0.9.0 · pack 1.21.1 NeoForge",
    registryId: "eternal_starlight:lunar_monstrosity",
    depth: "full",
    category: "Chefe",
    behavior: "Hostil · ESBoss com fases de mordida, escavação, soul e stun",
    danger: "Severo",
    summary: "Boss do Cursed Garden. A classe 0.9.0 usa o sistema ESBoss e possui múltiplas fases, incluindo ataques de sopro/ray e estados próprios de aproximação, escavação e stun.",
    dimensions: ["Eternal Starlight"],
    locations: ["Cursed Garden"],
    howToFind: "Marco progression:540, após o acesso à dimensão pelo Gatekeeper.",
    interaction: "O encontro possui entidades auxiliares de breath, spores, thorns e poisonous cloud no registry; elas são ataques/efeitos do boss e não cards separados.",
    drops: [],
    notes: ["O guia do Mundinho recomenda fonte de fogo e opção de stun/controle para este encontro.", "A classe implementa RayAttackUser e o código possui fases dedicadas de Bite, Dig, Soul e Stun."],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:540",
    sources: sources({ label: "LunarMonstrosity.java", href: LUNAR_MONSTROSITY_URL, note: "ESBoss, RayAttackUser e fases do encontro" }),
  },
  {
    id: "eternal-starlight-tangled",
    namePt: "Emaranhado",
    nameEn: "Tangled",
    mod: "Eternal Starlight",
    version: "0.9.0 · pack 1.21.1 NeoForge",
    registryId: "eternal_starlight:tangled",
    depth: "full",
    category: "Mini-chefe",
    behavior: "Hostil · MONSTER ligado ao encontro Tangled Hatred",
    danger: "Alto",
    summary: "Criatura central do encontro Tangled Hatred, documentado no Mundinho como miniboss/conteúdo secundário. O registry também contém Tangled Skull e Tangled Husk, mas somente o Skull possui Spawn Egg no conjunto publicado de 30.",
    dimensions: ["Eternal Starlight"],
    locations: [],
    howToFind: "Vínculo com progression:560, que agrupa Tangled Hatred e encontros secundários documentados sem impor sequência rígida.",
    drops: [],
    notes: ["Tangled é MONSTER e possui Spawn Egg na 0.9.0.", "Tangled Skull recebe card compacto próprio; Tangled Husk é entidade auxiliar MISC e fica fora."],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:560",
    sources: sources({ label: "Tangled.java", href: TANGLED_URL, note: "classe da criatura central do encontro Tangled" }),
  },
];

export const ETERNAL_STARLIGHT_BESTIARY_5E: BestiaryEntry[] = [...FULL_ENTRIES, ...COMPACT_ENTRIES];
export const ETERNAL_STARLIGHT_BESTIARY_5E_COUNT = ETERNAL_STARLIGHT_BESTIARY_5E.length;
export const ETERNAL_STARLIGHT_BESTIARY_5E_FULL = ETERNAL_STARLIGHT_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const ETERNAL_STARLIGHT_BESTIARY_5E_COMPACT = ETERNAL_STARLIGHT_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
