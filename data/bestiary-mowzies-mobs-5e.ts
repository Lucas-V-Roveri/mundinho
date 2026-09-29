import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "7aa17309337cbd4102efc418cba12a4983b1540c";
const SOURCE_ROOT = `https://github.com/BobMowzie/MowziesMobs-Public/blob/${SOURCE_COMMIT}`;
const REGISTRY_URL = `${SOURCE_ROOT}/src/main/java/com/bobmowzie/mowziesmobs/server/entity/EntityHandler.java`;
const LANG_EN_URL = `${SOURCE_ROOT}/src/main/resources/assets/mowziesmobs/lang/en_us.json`;
const LANG_PT_URL = `${SOURCE_ROOT}/src/main/resources/assets/mowziesmobs/lang/pt_br.json`;
const WROUGHT_URL = `${SOURCE_ROOT}/src/main/java/com/bobmowzie/mowziesmobs/server/entity/wroughtnaut/EntityWroughtnaut.java`;
const FROSTMAW_URL = `${SOURCE_ROOT}/src/main/java/com/bobmowzie/mowziesmobs/server/entity/frostmaw/EntityFrostmaw.java`;
const UMVUTHI_URL = `${SOURCE_ROOT}/src/main/java/com/bobmowzie/mowziesmobs/server/entity/umvuthana/EntityUmvuthi.java`;
const CURSEFORGE_URL = "https://www.curseforge.com/minecraft/mc-mods/mowzies-mobs";
const GUIDE_HREF = "/mods#guide-mowzies-mobs";

const BASE_SOURCES: BestiaryEntry["sources"] = [
  {
    label: "Mowzie's Mobs 1.8.2 · EntityHandler.java",
    href: REGISTRY_URL,
    note: "registry literal da revisão 7aa1730: 18 criaturas antes do bloco de entidades técnicas, projéteis e efeitos",
  },
  {
    label: "Mowzie's Mobs 1.8.2 · en_us.json",
    href: LANG_EN_URL,
    note: "nomes oficiais em inglês das 18 entidades publicadas",
  },
  {
    label: "Mowzie's Mobs 1.8.2 · pt_br.json",
    href: LANG_PT_URL,
    note: "traduções oficiais disponíveis; Elokosa/Elokosa Howler ainda não têm chave PT-BR nessa revisão",
  },
  {
    label: "Mowzie's Mobs · CurseForge",
    href: CURSEFORGE_URL,
    note: "descrição oficial de encontros, biomas e recompensas principais",
  },
];

function sources(...extra: BestiaryEntry["sources"]): BestiaryEntry["sources"] {
  return [...BASE_SOURCES, ...extra];
}

type CompactSpec = {
  id: string;
  namePt: string;
  nameEn: string;
  category: string;
  behavior: string;
  danger?: BestiaryEntry["danger"];
  summary: string;
  locations?: string[];
  howToFind?: string;
  note?: string;
};

function compact(spec: CompactSpec): BestiaryEntry {
  return {
    id: `mowzies-mobs-${spec.id.replaceAll("_", "-")}`,
    namePt: spec.namePt,
    nameEn: spec.nameEn,
    mod: "Mowzie's Mobs",
    version: "1.8.2 · pack 1.21.1 NeoForge",
    registryId: `mowziesmobs:${spec.id}`,
    depth: "compact",
    category: spec.category,
    behavior: spec.behavior,
    danger: spec.danger ?? "Médio",
    summary: spec.summary,
    dimensions: [],
    locations: spec.locations ?? [],
    howToFind:
      spec.howToFind ??
      "O registry 1.8.2 confirma a entidade, mas este card não fixa spawn natural sem uma regra versionada específica.",
    drops: [],
    notes: [
      spec.note ??
        "Registry + arquivos de idioma confirmam a criatura; drops, chance de spawn e atributos não são extrapolados sem fonte específica.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources(),
  };
}

const COMPACT_ENTRIES: BestiaryEntry[] = [
  compact({
    id: "foliaath",
    namePt: "Foliata",
    nameEn: "Foliaath",
    category: "Planta monstruosa",
    behavior: "Hostil · registrada como MONSTER",
    danger: "Médio",
    summary: "Planta carnívora imóvel do Mowzie's Mobs. A documentação oficial descreve a Foliaath adulta como ameaça de selva e a semente como início do ciclo de crescimento.",
    locations: ["Selvas / jungle"],
    howToFind: "A descrição oficial coloca Foliaaths em selvas. O card não inventa peso, altura ou frequência de spawn.",
    note: "O pt_br oficial usa ‘Foliata’. A documentação oficial também descreve sementes e a fase filhote, mas este card não quantifica drops.",
  }),
  compact({
    id: "baby_foliaath",
    namePt: "Foliata Filhote",
    nameEn: "Baby Foliaath",
    category: "Planta jovem",
    behavior: "MONSTER no registry · fase jovem da Foliaath",
    danger: "Baixo",
    summary: "Forma jovem da Foliaath. O próprio texto de item 1.8.2 documenta alimentação com carne e crescimento até a forma adulta.",
    howToFind: "É a fase jovem ligada às sementes de Foliaath; não é tratada aqui como spawn natural independente.",
    note: "O pt_br oficial usa ‘Foliata Filhote’. O texto do item foliaath_seed confirma alimentação com carne e crescimento após dois dias.",
  }),
  compact({
    id: "umvuthana_follower_raptor",
    namePt: "Umvuthana",
    nameEn: "Umvuthana",
    category: "Seguidor Umvuthana",
    behavior: "MONSTER no registry · variante seguidora de Raptor",
    summary: "Variante técnica de gameplay do Umvuthana que segue um Umvuthana Raptor. Ela é uma entidade viva registrada, não projétil/efeito, por isso permanece no alvo aprovado de 18 cards.",
    howToFind: "Associada ao grupo liderado por Umvuthana Raptor; o card não a apresenta como spawn natural autônomo.",
  }),
  compact({
    id: "umvuthana_follower_player",
    namePt: "Umvuthana",
    nameEn: "Umvuthana",
    category: "Seguidor Umvuthana",
    behavior: "MONSTER no registry · variante seguidora do jogador",
    summary: "Variante de Umvuthana alinhada ao jogador. O registry a mantém como entidade própria e o arquivo de idioma a exibe simplesmente como Umvuthana.",
    howToFind: "É uma variante de seguidor do jogador; não é tratada como criatura de spawn natural independente.",
    note: "O texto oficial do Sol Visage documenta invocação e recolhimento de servos por máscaras.",
  }),
  compact({
    id: "umvuthana_crane_player",
    namePt: "Garça Umvuthana",
    nameEn: "Umvuthana Crane",
    category: "Seguidor Umvuthana",
    behavior: "MONSTER no registry · variante Crane alinhada ao jogador",
    summary: "Variante de Umvuthana Crane ligada ao jogador. O registry 1.8.2 separa esta entidade da Crane selvagem.",
    howToFind: "É uma variante alinhada ao jogador; o card não afirma spawn natural independente.",
    note: "O pt_br contém a tradução ‘Garça Umvuthana’ (com um espaço inicial no JSON, normalizado apenas na apresentação).",
  }),
  compact({
    id: "umvuthana",
    namePt: "Umvuthana",
    nameEn: "Umvuthana",
    category: "Caçador tribal",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Médio",
    summary: "Caçador Umvuthana da linha da savana. A descrição oficial os apresenta em grupos com máscaras e dardos, ligados ao encontro de Umvuthi.",
    locations: ["Savanas"],
    howToFind: "Procure a linha de encontros Umvuthana em savanas; o card não fixa taxa de spawn.",
    note: "A documentação oficial diz que caçadores Umvuthana podem deixar suas máscaras, sem quantificar aqui a chance.",
  }),
  compact({
    id: "umvuthana_raptor",
    namePt: "Falcão Umvuthana",
    nameEn: "Umvuthana Raptor",
    category: "Líder Umvuthana",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Alto",
    summary: "Variante Raptor da tribo Umvuthana. O registro 1.8.2 lhe dá entidade própria e seguidores específicos.",
    locations: ["Savanas"],
    howToFind: "Associado aos grupos Umvuthana de savana descritos oficialmente; frequência exata não é afirmada.",
  }),
  compact({
    id: "umvuthana_crane",
    namePt: "Garça Umvuthana",
    nameEn: "Umvuthana Crane",
    category: "Umvuthana",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Médio",
    summary: "Variante Crane da família Umvuthana, separada no registry 1.8.2 da Crane alinhada ao jogador.",
    locations: ["Savanas"],
    howToFind: "Associada à linha Umvuthana; o card evita inventar frequência ou estrutura específica.",
  }),
  compact({
    id: "grottol",
    namePt: "Grutáceo",
    nameEn: "Grottol",
    category: "Criatura subterrânea",
    behavior: "MONSTER no registry · criatura evasiva",
    danger: "Baixo",
    summary: "Criatura rara de cavernas descrita oficialmente como fonte móvel de diamantes. Tenta escapar do jogador e pode usar minecarts.",
    locations: ["Subsolo / cavernas profundas"],
    howToFind: "A descrição oficial coloca Grottols no subsolo profundo. Ferramentas de ferro ou melhores são recomendadas pela própria página para minerá-los.",
    note: "O card não converte ‘fonte de diamantes’ em quantidade/chance de drop sem loot table versionada auditada.",
  }),
  compact({
    id: "lantern",
    namePt: "Lanterno",
    nameEn: "Lantern",
    category: "Criatura ambiente",
    behavior: "Passivo/ambiental · registrado como AMBIENT",
    danger: "Baixo",
    summary: "Criatura luminosa de florestas fechadas. A descrição oficial associa sua parte interna a luminous jelly.",
    locations: ["Florestas fechadas / roofed forests"],
    howToFind: "A página oficial descreve Lanterns em roofed forests; o card não fixa taxa ou horário de spawn.",
  }),
  compact({
    id: "naga",
    namePt: "Naga",
    nameEn: "Naga",
    category: "Predador voador",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Alto",
    summary: "Predador alado que usa veneno ácido. A documentação oficial o associa a penhascos costeiros.",
    locations: ["Penhascos costeiros"],
    howToFind: "Procure regiões costeiras com penhascos; o card não fixa bioma/tag ou taxa sem regra versionada específica.",
    note: "A página oficial menciona presas de Naga e seu uso na linha de antídoto, sem quantificar aqui o drop.",
  }),
  compact({
    id: "sculptor",
    namePt: "Tongbi, o Escultor",
    nameEn: "Tongbi, the Sculptor",
    category: "NPC / desafio",
    behavior: "MISC no registry · encontro de prova de Geomancy",
    danger: "Médio",
    summary: "Tongbi é o encontro central do teste do Escultor. Em vez de um boss tradicional, propõe um percurso/desafio de Geomancy.",
    locations: ["Earthrend Monastery"],
    howToFind: "A descrição oficial situa Tongbi no pátio do Earthrend Monastery; complete o teste para a recompensa ligada à Geomancy.",
    note: "Apesar de MobCategory.MISC, é uma entidade viva de gameplay com encontro próprio; por isso entra no Bestiário.",
  }),
  compact({
    id: "bluff",
    namePt: "Rochedo",
    nameEn: "Bluff",
    category: "Criatura de pedra",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Médio",
    summary: "Criatura pétrea ligada aos Earthrend Monasteries e à linha de Geomancy.",
    locations: ["Earthrend Monastery"],
    howToFind: "A documentação oficial associa Bluffs aos Earthrend Monasteries.",
    note: "A página oficial descreve Bluff Rods como recompensa útil à Geomancy, mas o card não inventa quantidade/chance.",
  }),
  compact({
    id: "elokosa_follower_howler",
    namePt: "Elokosa",
    nameEn: "Elokosa",
    category: "Criatura da selva",
    behavior: "MONSTER no registry · seguidor de Elokosa Howler",
    danger: "Médio",
    summary: "Elokosa ligado ao grupo de um Howler. A linha 1.8 introduziu Bilokosa/Elokosa e sua transformação entre formas conforme o ciclo do dia.",
    locations: ["Copas de selva / jungle canopy"],
    howToFind: "A descrição oficial coloca a família Bilokosa/Elokosa nas copas da selva; esta variante aparece vinculada ao Howler.",
    note: "O en_us 1.8.2 traz ‘Elokosa’; o pt_br da mesma revisão ainda não possui esta chave, então o nome não foi traduzido artificialmente.",
  }),
  compact({
    id: "elokosa_howler",
    namePt: "Elokosa Howler",
    nameEn: "Elokosa Howler",
    category: "Líder Elokosa",
    behavior: "Hostil · registrado como MONSTER",
    danger: "Alto",
    summary: "Howler é a variante alfa da família Elokosa/Bilokosa, introduzida na linha 1.8 e registrada como entidade própria em 1.8.2.",
    locations: ["Copas de selva / jungle canopy"],
    howToFind: "Procure grupos da família Elokosa/Bilokosa nas copas de selva; o Howler atua como alfa do grupo.",
    note: "O pt_br 1.8.2 ainda não possui chave para Elokosa Howler; o card preserva o nome oficial inglês.",
  }),
];

const FULL_ENTRIES: BestiaryEntry[] = [
  {
    id: "mowzies-mobs-ferrous-wroughtnaut",
    namePt: "Forjonauta Férreo",
    nameEn: "Ferrous Wroughtnaut",
    mod: "Mowzie's Mobs",
    version: "1.8.2 · pack 1.21.1 NeoForge",
    registryId: "mowziesmobs:ferrous_wroughtnaut",
    depth: "full",
    category: "Chefe / guardião subterrâneo",
    behavior: "Hostil ao ativar · MONSTER com boss bar e janelas específicas de vulnerabilidade",
    danger: "Severo",
    summary: "Guardião de uma câmara subterrânea, fortemente protegido fora das janelas corretas de ataque. É um dos três encontros paralelos já previstos na Progressão do Mundinho.",
    dimensions: [],
    locations: ["Câmara subterrânea do Ferrous Wroughtnaut"],
    howToFind: "A documentação oficial o descreve guardando câmaras perdidas no subsolo. No pack, Mowzie's Cataclysm adiciona o Eye of Wrought como auxílio de localização; o marco correspondente é progression:770.",
    health: "40 HP base",
    attack: "30 de dano base no atributo de ataque; golpes específicos podem aplicar lógica própria",
    interaction: "A implementação usa estado de vulnerabilidade: atacar sem respeitar a janela/ângulo correto não equivale a uma luta de dano contínuo comum.",
    drops: [
      { namePt: "Machado de Mil Metais", nameEn: "Axe of a Thousand Metals", use: "Arma especial do Wroughtnaut." },
      { namePt: "Capacete Forjado", nameEn: "Wrought Helm", use: "Capacete especial do Wroughtnaut." },
    ],
    notes: [
      "O atributo-base da revisão 1.8.2 é 40 HP e 30 de ataque; configurações do mod podem aplicar multiplicadores em runtime.",
      "A página oficial confirma Axe of a Thousand Metals e Wrought Helm como recompensas do encontro.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:770",
    sources: sources({
      label: "EntityWroughtnaut.java",
      href: WROUGHT_URL,
      note: "boss bar, IA, estado de vulnerabilidade e atributos-base",
    }),
  },
  {
    id: "mowzies-mobs-frostmaw",
    namePt: "Congedíbula",
    nameEn: "Frostmaw",
    mod: "Mowzie's Mobs",
    version: "1.8.2 · pack 1.21.1 NeoForge",
    registryId: "mowziesmobs:frostmaw",
    depth: "full",
    category: "Chefe / criatura glacial",
    behavior: "Hostil ao despertar · MONSTER com boss bar, golpes físicos e ataques de gelo",
    danger: "Severo",
    summary: "Gigante glacial encontrado raramente em áreas nevadas. Dorme protegendo um Ice Crystal e acorda para uma luta de forte pressão corpo a corpo e gelo.",
    dimensions: [],
    locations: ["Áreas nevadas"],
    howToFind: "A documentação oficial o coloca raramente em regiões nevadas. No pack, Mowzie's Cataclysm adiciona o Eye of Frost como auxílio; o marco correspondente é progression:780.",
    health: "250 HP base",
    attack: "10 de dano base no atributo de ataque; swipes, slam e ataques de gelo possuem lógica própria",
    interaction: "O código mantém estado HAS_CRYSTAL e animações distintas de ativação com/sem cristal; o guia do Mundinho já trata o Ice Crystal como parte central do encontro.",
    drops: [],
    notes: [
      "O atributo-base da revisão 1.8.2 é 250 HP e 10 de ataque; configurações podem multiplicar valores.",
      "A página oficial diz que Frostmaw guarda um Ice Crystal; este card não registra o cristal como drop garantido sem transformar a mecânica em uma loot table inexistente.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:780",
    sources: sources({
      label: "EntityFrostmaw.java",
      href: FROSTMAW_URL,
      note: "boss bar, Ice Crystal, ataques de gelo, cooldowns e atributos-base",
    }),
  },
  {
    id: "mowzies-mobs-umvuthi",
    namePt: "Umvuthi, o Pássaro do Sol",
    nameEn: "Umvuthi, the Sunbird",
    mod: "Mowzie's Mobs",
    version: "1.8.2 · pack 1.21.1 NeoForge",
    registryId: "mowziesmobs:umvuthi",
    depth: "full",
    category: "Chefe / líder Umvuthana",
    behavior: "MONSTER com boss bar · ataques solares, invocação de seguidores e mecânicas de diálogo/troca",
    danger: "Severo",
    summary: "Líder da linha Umvuthana e terceiro encontro paralelo do guia. Sua implementação combina Sunstrike, Solar Beam, Supernova, seguidores e estados de interação próprios.",
    dimensions: [],
    locations: ["Trono de Umvuthi em savana / Umvuthana Grove"],
    howToFind: "A descrição oficial associa Umvuthi a um trono em savana. No pack, Mowzie's Cataclysm adiciona o Eye of the Sunbird como auxílio; o marco correspondente é progression:790.",
    health: "150 HP base",
    interaction: "A classe 1.8.2 implementa diálogo/troca, Sun's Blessing e múltiplas habilidades solares; o card não presume que todas as rotas de interação estejam disponíveis em qualquer estado do encontro.",
    drops: [
      { namePt: "Máscara do Sol", nameEn: "Sol Visage", use: "Item ligado à invocação e recolhimento de servos por máscaras." },
    ],
    notes: [
      "A classe fixa MAX_HEALTH em 150 e possui habilidades Sunstrike, Solar Beam, Supernova e Spawn Followers.",
      "A documentação oficial associa o Sol Visage à recompensa de Umvuthi; o texto do item 1.8.2 confirma seu uso com servos e máscaras.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:790",
    sources: sources({
      label: "EntityUmvuthi.java",
      href: UMVUTHI_URL,
      note: "150 HP base, boss abilities, seguidores, diálogo/troca e Sun's Blessing",
    }),
  },
];

export const MOWZIES_MOBS_BESTIARY_5E: BestiaryEntry[] = [...FULL_ENTRIES, ...COMPACT_ENTRIES];
export const MOWZIES_MOBS_BESTIARY_5E_COUNT = MOWZIES_MOBS_BESTIARY_5E.length;
export const MOWZIES_MOBS_BESTIARY_5E_FULL = MOWZIES_MOBS_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const MOWZIES_MOBS_BESTIARY_5E_COMPACT = MOWZIES_MOBS_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
