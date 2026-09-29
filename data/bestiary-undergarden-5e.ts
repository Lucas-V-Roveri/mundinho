import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "6d7f02deab3e2ad44692f7edf2dea1cca3ba747f";
const SOURCE_ROOT = `https://github.com/quek04/undergarden/blob/${SOURCE_COMMIT}`;
const REGISTRY_URL = `${SOURCE_ROOT}/src/main/java/quek/undergarden/registry/UGEntityTypes.java`;
const LANG_EN_URL = `${SOURCE_ROOT}/src/generated/resources/assets/undergarden/lang/en_us.json`;
const LANG_PT_URL = `${SOURCE_ROOT}/src/main/resources/assets/undergarden/lang/pt_br.json`;
const VERSION_URL = `${SOURCE_ROOT}/gradle.properties`;
const GUIDE_HREF = "/mods#guide-undergarden";

const DWELLER_URL = `${SOURCE_ROOT}/src/main/java/quek/undergarden/entity/animal/dweller/Dweller.java`;
const MINION_URL = `${SOURCE_ROOT}/src/main/java/quek/undergarden/entity/Minion.java`;
const STONEBORN_URL = `${SOURCE_ROOT}/src/main/java/quek/undergarden/entity/monster/stoneborn/Stoneborn.java`;
const GUARDIAN_URL = `${SOURCE_ROOT}/src/main/java/quek/undergarden/entity/monster/boss/ForgottenGuardian.java`;
const POT_URL = `${SOURCE_ROOT}/src/main/java/quek/undergarden/entity/animal/MysteriousPot.java`;
const DENIZEN_URL = `${SOURCE_ROOT}/src/main/java/quek/undergarden/entity/monster/denizen/Denizen.java`;

const BASE_SOURCES: BestiaryEntry["sources"] = [
  { label: "The Undergarden 0.9.6 · UGEntityTypes.java", href: REGISTRY_URL, note: "registry literal da revisão histórica 1.21.1/0.9.6" },
  { label: "The Undergarden 0.9.6 · en_us.json", href: LANG_EN_URL, note: "nomes oficiais em inglês e chaves entity.undergarden.<id>" },
  { label: "The Undergarden 0.9.6 · pt_br.json", href: LANG_PT_URL, note: "traduções oficiais disponíveis na própria build" },
  { label: "The Undergarden 0.9.6 · gradle.properties", href: VERSION_URL, note: "minecraft_version=1.21.1 e mod_version=0.9.6" },
];

function sources(...extra: BestiaryEntry["sources"]): BestiaryEntry["sources"] {
  return [...BASE_SOURCES, ...extra];
}

type CompactSpec = {
  id: string;
  namePt: string;
  nameEn: string;
  registryId: string;
  category: string;
  behavior: string;
  danger: BestiaryEntry["danger"];
  summary: string;
  track: BestiaryEntry["track"];
  note?: string;
  source?: BestiaryEntry["sources"][number];
};

function compact(spec: CompactSpec): BestiaryEntry {
  return {
    id: spec.id,
    namePt: spec.namePt,
    nameEn: spec.nameEn,
    mod: "The Undergarden",
    version: "0.9.6 · pack 1.21.1 NeoForge",
    registryId: spec.registryId,
    depth: "compact",
    category: spec.category,
    behavior: spec.behavior,
    danger: spec.danger,
    summary: spec.summary,
    dimensions: ["The Undergarden"],
    locations: [],
    howToFind: "Na dimensão The Undergarden. Este card não fixa bioma/estrutura específica quando o registry e os recursos versionados auditados não bastam para sustentar essa granularidade.",
    drops: [],
    notes: [
      spec.note ?? "Drops e distribuição fina não foram afirmados sem fonte versionada específica para esses campos.",
    ],
    track: spec.track,
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources(...(spec.source ? [spec.source] : [])),
  };
}

const COMPACT_ENTRIES: BestiaryEntry[] = [
  compact({ id: "undergarden-rotling", namePt: "Podrito", nameEn: "Rotling", registryId: "undergarden:rotling", category: "Rotspawn · monstro", behavior: "Hostil · registrado como MONSTER", danger: "Médio", summary: "Rotspawn hostil registrado como entidade própria do Undergarden.", track: ["seen", "defeated"] }),
  compact({ id: "undergarden-rotwalker", namePt: "Podreiro", nameEn: "Rotwalker", registryId: "undergarden:rotwalker", category: "Rotspawn · monstro", behavior: "Hostil · registrado como MONSTER", danger: "Médio", summary: "Rotspawn hostil de porte maior registrado como entidade própria do Undergarden.", track: ["seen", "defeated"] }),
  compact({ id: "undergarden-rotbeast", namePt: "Podrão", nameEn: "Rotbeast", registryId: "undergarden:rotbeast", category: "Rotspawn · monstro", behavior: "Hostil · registrado como MONSTER", danger: "Alto", summary: "Rotspawn hostil de grande porte; o registry 0.9.6 o mantém entre os monstros normais da dimensão.", track: ["seen", "defeated"] }),
  compact({ id: "undergarden-rotbelcher", namePt: "Podrômito", nameEn: "Rotbelcher", registryId: "undergarden:rotbelcher", category: "Rotspawn · monstro", behavior: "Hostil · registrado como MONSTER", danger: "Alto", summary: "Rotspawn hostil com entidade de projétil própria no mod; o projétil não vira card separado.", track: ["seen", "defeated"] }),
  compact({ id: "undergarden-greater-dweller", namePt: "Andarilho Maior", nameEn: "Greater Dweller", registryId: "undergarden:greater_dweller", category: "Criatura", behavior: "Criatura · usa categoria própria do Undergarden", danger: "Baixo", summary: "Variante maior da fauna do Undergarden, registrada em uma MobCategory própria da dimensão.", track: ["seen"] }),
  compact({ id: "undergarden-gwibling", namePt: "Boixinho", nameEn: "Gwibling", registryId: "undergarden:gwibling", category: "Fauna aquática", behavior: "Passivo/ambiental · WATER_AMBIENT", danger: "Baixo", summary: "Fauna aquática pequena do Undergarden; a própria progressão do mod inclui capturá-lo com balde.", track: ["seen"], note: "O advancement oficial da build documenta a captura de um Gwibling com balde." }),
  compact({ id: "undergarden-brute", namePt: "Bárbaro", nameEn: "Brute", registryId: "undergarden:brute", category: "Criatura", behavior: "Criatura · registrada como CREATURE", danger: "Médio", summary: "Criatura terrestre registrada no grupo CREATURE do Undergarden.", track: ["seen"] }),
  compact({ id: "undergarden-scintling", namePt: "Cintilinho", nameEn: "Scintling", registryId: "undergarden:scintling", category: "Criatura ambiente", behavior: "Ambiental · AMBIENT", danger: "Baixo", summary: "Criatura ambiental do Undergarden registrada na categoria AMBIENT.", track: ["seen"] }),
  compact({ id: "undergarden-gloomper", namePt: "Saltaro", nameEn: "Gloomper", registryId: "undergarden:gloomper", category: "Animal", behavior: "Passivo · Animal/CREATURE", danger: "Baixo", summary: "Animal saltador do Undergarden; pode ser reproduzido e atraído com Gloomgourd.", track: ["seen"], source: { label: "Gloomper.java", href: `${SOURCE_ROOT}/src/main/java/quek/undergarden/entity/animal/Gloomper.java`, note: "Animal, reprodução e alimentação com Gloomgourd" } }),
  compact({ id: "undergarden-nargoyle", namePt: "Nárgula", nameEn: "Nargoyle", registryId: "undergarden:nargoyle", category: "Monstro de caverna", behavior: "Hostil · registrado como MONSTER", danger: "Médio", summary: "Monstro de caverna registrado como entidade hostil própria do Undergarden.", track: ["seen", "defeated"] }),
  compact({ id: "undergarden-muncher", namePt: "Mastigador", nameEn: "Muncher", registryId: "undergarden:muncher", category: "Monstro de caverna", behavior: "Hostil · registrado como MONSTER", danger: "Médio", summary: "Monstro de caverna do Undergarden registrado como MONSTER.", track: ["seen", "defeated"] }),
  compact({ id: "undergarden-sploogie", namePt: "Cuspor", nameEn: "Sploogie", registryId: "undergarden:sploogie", category: "Monstro de caverna", behavior: "Hostil · registrado como MONSTER", danger: "Médio", summary: "Monstro de caverna do Undergarden registrado como MONSTER.", track: ["seen", "defeated"] }),
  compact({ id: "undergarden-gwib", namePt: "Boixo", nameEn: "Gwib", registryId: "undergarden:gwib", category: "Fauna aquática", behavior: "Passivo · WATER_CREATURE", danger: "Baixo", summary: "Criatura aquática do Undergarden registrada como WATER_CREATURE.", track: ["seen"] }),
  compact({ id: "undergarden-mog", namePt: "Musso", nameEn: "Mog", registryId: "undergarden:mog", category: "Criatura", behavior: "Criatura · registrada como CREATURE", danger: "Baixo", summary: "Fauna terrestre do Undergarden registrada como CREATURE.", track: ["seen"] }),
  compact({ id: "undergarden-smog-mog", namePt: "Fu-Musso", nameEn: "S'Mog", registryId: "undergarden:smog_mog", category: "Criatura", behavior: "Criatura · registrada como CREATURE", danger: "Baixo", summary: "Criatura própria do Undergarden registrada como CREATURE; o nome inglês publicado pela build é S'Mog.", track: ["seen"] }),
  compact({ id: "undergarden-forgotten", namePt: "Esquecido", nameEn: "Forgotten", registryId: "undergarden:forgotten", category: "Monstro", behavior: "Hostil · registrado como MONSTER", danger: "Alto", summary: "Monstro Forgotten do Undergarden, distinto do Forgotten Guardian e registrado como MONSTER.", track: ["seen", "defeated"] }),
  compact({ id: "undergarden-denizen", namePt: "Cidadão", nameEn: "Denizen", registryId: "undergarden:denizen", category: "Monstro / habitante", behavior: "Combativo · MONSTER com rotinas de campfire, melee e lança", danger: "Médio", summary: "Habitante dos Denizen Camps. Possui variantes baixa/alta, pode descansar junto a campfires e alterna ataques melee e lança.", track: ["seen", "defeated"], source: { label: "Denizen.java", href: DENIZEN_URL, note: "variantes, campfire e ataques melee/ranged" } }),
  compact({ id: "undergarden-mysterious-pot", namePt: "Mysterious Pot", nameEn: "Mysterious Pot", registryId: "undergarden:mysterious_pot", category: "Criatura / pote vivo", behavior: "Evasivo · foge de jogadores quando desperto", danger: "Baixo", summary: "Pote vivo persistente: fica imóvel/inativo, desperta ao ser atingido, pula, foge de jogadores e volta a se esconder quando a área fica segura.", track: ["seen"], note: "A chave de Mysterious Pot existe no en_us.json histórico, mas não no pt_br.json 0.9.6; por isso o card preserva o nome inglês.", source: { label: "MysteriousPot.java", href: POT_URL, note: "estado ativo/inativo, fuga e esconderijo" } }),
];

const FULL_ENTRIES: BestiaryEntry[] = [
  {
    id: "undergarden-dweller",
    namePt: "Andarilho",
    nameEn: "Dweller",
    mod: "The Undergarden",
    version: "0.9.6 · pack 1.21.1 NeoForge",
    registryId: "undergarden:dweller",
    depth: "full",
    category: "Animal / montaria",
    behavior: "Passivo · reproduzível, selável e montável",
    danger: "Baixo",
    summary: "Animal do Undergarden que funciona como montaria de salto. Adultos podem receber sela; um jogador montado controla o Dweller segurando Underbean on a Stick.",
    dimensions: ["The Undergarden"],
    locations: [],
    howToFind: "Fauna natural do Undergarden. O card não fixa bioma específico sem uma fonte versionada adicional de spawn.",
    health: "15 HP",
    interaction: "Pode receber sela quando adulto. Com sela, o jogador pode montar; o controle exige Underbean on a Stick na mão principal ou secundária. A montaria também aceita salto do jogador.",
    taming: "Não há domesticação/tame no código 0.9.6. Underbeans atraem e reproduzem Dwellers; sela habilita a montaria.",
    drops: [],
    notes: ["Dweller implementa ItemSteerable, Saddleable e PlayerRideableJumping.", "Underbeans são alimento/reprodução; não marcar como 'domesticado' no progresso porque a entidade não é TamableAnimal."],
    track: ["seen"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources({ label: "Dweller.java", href: DWELLER_URL, note: "atributos, reprodução, sela, montaria e Underbean on a Stick" }),
  },
  {
    id: "undergarden-stoneborn",
    namePt: "Pedrudo",
    nameEn: "Stoneborn",
    mod: "The Undergarden",
    version: "0.9.6 · pack 1.21.1 NeoForge",
    registryId: "undergarden:stoneborn",
    depth: "full",
    category: "NPC neutro / comerciante",
    behavior: "Neutro · Merchant/Npc com persistent anger quando provocado",
    danger: "Alto",
    summary: "Comerciante do Undergarden. Abre tela de trade própria, oferece até quatro negociações do pool Stoneborn e possui uma mecânica específica que o torna instável fora da dimensão.",
    dimensions: ["The Undergarden"],
    locations: [],
    howToFind: "Spawn natural no Undergarden; o método de spawn da classe aplica uma chance adicional de 1/10 além das regras normais de mob.",
    health: "50 HP · 10 armor",
    attack: "10 de dano base · 0,9 knockback resistance",
    interaction: "Interaja dentro do Undergarden para abrir a tela de comércio. O advancement oficial registra o marco de realizar uma troca com um Stoneborn.",
    drops: [],
    notes: ["Fora do Undergarden, acumula TimeOutOfUndergarden, recebe Confusion e após mais de 300 ticks remove a si próprio e explode com força 3.", "Stoneborn é NeutralMob + Npc + Merchant; não deve ser tratado como hostil comum apesar de estar registrado em MobCategory.MONSTER."],
    track: ["seen"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources({ label: "Stoneborn.java", href: STONEBORN_URL, note: "atributos, comércio, neutralidade e comportamento fora da dimensão" }),
  },
  {
    id: "undergarden-minion",
    namePt: "Máquina Esquecida",
    nameEn: "Forgotten Minion",
    mod: "The Undergarden",
    version: "0.9.6 · pack 1.21.1 NeoForge",
    registryId: "undergarden:minion",
    depth: "full",
    category: "Golem aliado",
    behavior: "Aliado · AbstractGolem de ataque à distância",
    danger: "Baixo",
    summary: "Golem utilitário do Undergarden. A progressão oficial documenta sua criação com Forgotten Block e Carved Gloomgourd; em combate, ele ataca inimigos à distância e pode ser reparado com Forgotten Nuggets.",
    dimensions: ["The Undergarden"],
    locations: [],
    howToFind: "É uma criatura criada pelo jogador; o advancement 0.9.6 descreve a criação usando Forgotten Block e Carved Gloomgourd.",
    health: "20 HP · 10 armor · 5 armor toughness",
    attack: "Ranged · dispara Minion Projectile a até 10 blocos",
    interaction: "Forgotten Nugget cura 5 HP quando o Minion está ferido. Seu targeting exclui Stoneborn e prioriza Enemy, Rotspawn e Cavern Creature.",
    drops: [],
    notes: ["UGEntityTypes registra Minion como MISC, mas a classe estende AbstractGolem e recebe atributos vivos próprios — por isso entra no Bestiário.", "O projétil do Minion é entidade técnica e não recebe card separado."],
    track: ["seen"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    sources: sources({ label: "Minion.java", href: MINION_URL, note: "golem, atributos, ranged attack e reparo com Forgotten Nugget" }),
  },
  {
    id: "undergarden-forgotten-guardian",
    namePt: "Guardião Esquecido",
    nameEn: "Forgotten Guardian",
    mod: "The Undergarden",
    version: "0.9.6 · pack 1.21.1 NeoForge",
    registryId: "undergarden:forgotten_guardian",
    depth: "full",
    category: "Chefe / guardião de dungeon",
    behavior: "Hostil · persegue jogadores em melee e não despawna normalmente",
    danger: "Severo",
    summary: "Guardião das Catacombs e ápice do Undergarden base no Mundinho. É um monstro corpo a corpo resistente, imune a projéteis e efeitos, com alto knockback e capacidade de quebrar blocos ao avançar quando mob griefing permite.",
    dimensions: ["The Undergarden"],
    locations: ["Catacombs"],
    howToFind: "No Mundinho, o encontro está no marco progression:430: explorar Catacombs e enfrentar o Forgotten Guardian.",
    health: "80 HP · 10 armor · 5 armor toughness",
    attack: "10 de dano base · 2 attack knockback",
    interaction: "Projéteis diretos são totalmente defletidos. Também não pode ser afetado por MobEffects, não se afoga, não é empurrado por fluidos e não pode ser levado por leash.",
    drops: [],
    notes: ["Quando agressivo e bloqueado por obstáculos, pode destruir blocos que não sejam Wither-immune se mob griefing estiver habilitado.", "A progressão oficial do mod possui advancement específico para derrotar o Forgotten Guardian e depois forjar Forgotten Ingot a partir de seus nuggets; o card não lista drop quantitativo sem loot table auditada."],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: "/progressao#progression:430",
    sources: sources({ label: "ForgottenGuardian.java", href: GUARDIAN_URL, note: "atributos, imunidades, projéteis, block breaking e combate" }),
  },
];

export const UNDERGARDEN_BESTIARY_5E: BestiaryEntry[] = [...FULL_ENTRIES, ...COMPACT_ENTRIES];
export const UNDERGARDEN_BESTIARY_5E_COUNT = UNDERGARDEN_BESTIARY_5E.length;
export const UNDERGARDEN_BESTIARY_5E_FULL = UNDERGARDEN_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const UNDERGARDEN_BESTIARY_5E_COMPACT = UNDERGARDEN_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
