export type WikiStatus = "confirmado (2+ fontes)" | "confirmado (1 fonte)" | "conflito entre fontes" | "não documentado";

export type WikiSource = {
  id: string;
  label: string;
  url: string;
  kind: "repo" | "official-wiki" | "curseforge" | "third-party";
  versionNote: string;
};

export type CatalogOrigin = {
  kind: "drop" | "craft" | "loot";
  label: string;
  encounterId?: string;
  chance?: string;
  quantity?: string;
  condition?: string;
  sources: string[];
};

export type CatalogRecipe = {
  type: "crafting" | "smelting" | "blasting" | string;
  station: string;
  grid?: Array<string | null>;
  ingredients?: string[];
  resultQuantity?: string;
  sources: string[];
};

export type CatalogItem = {
  id: string;
  nameEn: string;
  namePt: string;
  mod: string;
  icon?: string;
  iconSource?: string;
  utility: string;
  origins: CatalogOrigin[];
  recipe?: CatalogRecipe;
  usedIn?: Array<{ label: string; sources: string[] }>;
  milestoneIds: string[];
  status: WikiStatus;
  sources: string[];
  notes?: string[];
};

export type EncounterDrop = {
  itemId: string;
  chance?: string;
  quantity?: string;
  condition?: string;
  guaranteed?: boolean;
  sources: string[];
};

export type CatalogEncounter = {
  id: string;
  nameEn: string;
  namePt: string;
  mod: string;
  image?: string;
  imageSource?: string;
  milestoneIds: string[];
  find: Array<{ text: string; sources: string[] }>;
  start?: Array<{ text: string; itemId?: string; sources: string[] }>;
  drops: EncounterDrop[];
  status: WikiStatus;
  sources: string[];
  notes?: string[];
  searched?: string[];
};

export const WIKI_SOURCES: WikiSource[] = [
  { id: "tf-cf-483345", label: "CurseForge — Twilight Forest 4.8.3345", url: "https://www.curseforge.com/minecraft/mc-mods/the-twilight-forest/files/7797302", kind: "curseforge", versionNote: "Minecraft 1.21.1 · NeoForge · Twilight Forest 4.8.3345 (versão exata do pack)." },
  { id: "tf-9m-guide", label: "The Twilight Forest Mod Wiki — Guide", url: "https://wiki.9minecraft.net/the-twilight-forest-mod/guide/", kind: "third-party", versionNote: "Wiki de terceiros; páginas de itens do mesmo wiki expõem dados para NeoForge 1.21.1 / TF 4.8.3345. Usada para localização e lista de drops, não para probabilidades ausentes." },
  { id: "tf-mcmodwiki-prog", label: "mcmodwiki — Boss Progression", url: "https://mcmodwiki.com/the-twilight-forest/guides/boss-progression-guide", kind: "third-party", versionNote: "Declara explicitamente cobertura de Twilight Forest 4.8.3345 em Minecraft 1.21.1." },
  { id: "tf-mctoolbox", label: "MC Toolbox — Twilight Forest 1.21.1", url: "https://mctoolbox.net/mod/twilight-forest", kind: "third-party", versionNote: "Guia que identifica explicitamente NeoForge 1.21.1 / TF 4.8.3345." },
  { id: "tf-wikimine-1211", label: "WIKI-MINE — Twilight Forest 1.21.1", url: "https://wiki-mine.com/guides/twilight-forest-1211-complete-guide-to-the-world-and-bosses", kind: "third-party", versionNote: "Guia de terceiros identificado como 1.21.1; usado como segunda evidência do loot atual do Ur-Ghast." },
  { id: "final-boss-cf", label: "CurseForge — Twilight Forest Final Boss (remake)", url: "https://www.curseforge.com/minecraft/mc-mods/twilight-forest-final-boss-remake", kind: "curseforge", versionNote: "Há builds 2.1.1/2.1.2 testadas especificamente com TF 4.8.3345 + MC 1.21.1 NeoForge. O snapshot do site não registra qual das duas está instalada." },
  { id: "final-boss-old-cf", label: "CurseForge — Twilight Forest Final Boss (original)", url: "https://www.curseforge.com/minecraft/mc-mods/twilight-forest-final-boss", kind: "curseforge", versionNote: "Forge 1.20.1; usada somente para registrar divergência histórica. NÃO tratada como evidência da versão 1.21.1." },
];

const commonTfSources = ["tf-9m-guide", "tf-mcmodwiki-prog"];

export const ITEM_CATALOG: CatalogItem[] = [
  { id: "tf-naga-scale", nameEn: "Naga Scale", namePt: "Escama de Naga", mod: "The Twilight Forest", utility: "Material deixado pela Naga; a progressão do mod usa a escama como marco para avançar até a Lich Tower.", origins: [{ kind: "drop", label: "Naga", encounterId: "tf-naga", sources: ["tf-9m-guide"] }], milestoneIds: ["340"], status: "confirmado (2+ fontes)", sources: commonTfSources },
  { id: "tf-naga-trophy", nameEn: "Naga Trophy", namePt: "Troféu da Naga", mod: "The Twilight Forest", utility: "Troféu do boss; também pode entrar no padrão de estandarte da Naga nas receitas versionadas do mod.", origins: [{ kind: "drop", label: "Naga", encounterId: "tf-naga", sources: ["tf-9m-guide"] }], usedIn: [{ label: "Naga Banner Pattern (com papel, receita shapeless)", sources: ["tf-9m-guide"] }], milestoneIds: ["340"], status: "confirmado (2+ fontes)", sources: commonTfSources },
  { id: "tf-scepter-twilight", nameEn: "Scepter of Twilight", namePt: "Cetro do Crepúsculo", mod: "The Twilight Forest", utility: "Cetro mágico obtido na luta contra o Twilight Lich; dispara projéteis mágicos.", origins: [{ kind: "drop", label: "Twilight Lich", encounterId: "tf-lich", sources: ["tf-9m-guide"] }], milestoneIds: ["350"], status: "confirmado (2+ fontes)", sources: commonTfSources },
  { id: "tf-scepter-life", nameEn: "Scepter of Life Draining", namePt: "Cetro de Drenagem de Vida", mod: "The Twilight Forest", utility: "Cetro mágico do Twilight Lich; drena vida dos inimigos para curar o jogador.", origins: [{ kind: "drop", label: "Twilight Lich", encounterId: "tf-lich", sources: ["tf-9m-guide"] }], milestoneIds: ["350"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-scepter-zombie", nameEn: "Zombie Scepter", namePt: "Cetro Zumbi", mod: "The Twilight Forest", utility: "Um dos cetros associados ao loot do Twilight Lich; a fonte consultada confirma o item, mas não detalha números do efeito.", origins: [{ kind: "drop", label: "Twilight Lich", encounterId: "tf-lich", sources: ["tf-9m-guide"] }], milestoneIds: ["350"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-lich-trophy", nameEn: "Twilight Lich Trophy", namePt: "Troféu do Twilight Lich", mod: "The Twilight Forest", utility: "Troféu do Twilight Lich; serve como registro do boss e é usado por receitas de padrão de estandarte do mod.", origins: [{ kind: "drop", label: "Twilight Lich", encounterId: "tf-lich", sources: ["tf-9m-guide"] }], milestoneIds: ["350"], status: "confirmado (2+ fontes)", sources: commonTfSources },
  { id: "tf-meef-stroganoff", nameEn: "Meef Stroganoff", namePt: "Strogonoff de Meef", mod: "The Twilight Forest", utility: "Comida ligada à progressão do Labyrinth; comê-la libera a etapa da Fire Swamp na progressão padrão.", origins: [{ kind: "drop", label: "Minoshroom", encounterId: "tf-minoshroom", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], milestoneIds: ["360"], status: "confirmado (2+ fontes)", sources: commonTfSources },
  { id: "tf-minotaur-axe", nameEn: "Minotaur Axe", namePt: "Machado do Minotauro", mod: "The Twilight Forest", utility: "Arma associada ao loot do Minoshroom; números de dano/efeito não entram porque não foram confirmados nas fontes versionadas usadas.", origins: [{ kind: "drop", label: "Minoshroom", encounterId: "tf-minoshroom", sources: ["tf-9m-guide"] }], milestoneIds: ["360"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-fiery-blood", nameEn: "Fiery Blood", namePt: "Sangue Ígneo", mod: "The Twilight Forest", utility: "Material da Hydra usado na linha de Fiery Metal; não é tratado aqui como drop atual do Ur-Ghast.", origins: [{ kind: "drop", label: "Hydra", encounterId: "tf-hydra", sources: ["tf-9m-guide"] }], usedIn: [{ label: "Fiery Metal / equipamentos ígneos", sources: ["tf-9m-guide"] }], milestoneIds: ["360"], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-mctoolbox"] },
  { id: "tf-hydra-chop", nameEn: "Hydra Chop", namePt: "Costeleta de Hydra", mod: "The Twilight Forest", utility: "Comida do loot da Hydra; a progressão 4.8.3345 possui avanço ligado a comer a Hydra Chop.", origins: [{ kind: "drop", label: "Hydra", encounterId: "tf-hydra", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], milestoneIds: ["360"], status: "confirmado (2+ fontes)", sources: commonTfSources },
  { id: "tf-hydra-trophy", nameEn: "Hydra Trophy", namePt: "Troféu da Hydra", mod: "The Twilight Forest", utility: "Troféu da Hydra e prova do encontro concluído dentro da cadeia de progressão do Twilight Forest.", origins: [{ kind: "drop", label: "Hydra", encounterId: "tf-hydra", sources: ["tf-9m-guide"] }], milestoneIds: ["360"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-knightmetal-gear", nameEn: "Knightmetal Gear", namePt: "Equipamento de Knightmetal", mod: "The Twilight Forest", utility: "Categoria de equipamentos ligada ao loot dos Knight Phantoms; a fonte não fixa peça, quantidade ou chance por derrota.", origins: [{ kind: "loot", label: "Knight Phantoms / baú de recompensa", encounterId: "tf-knight-phantoms", sources: ["tf-9m-guide"] }], milestoneIds: ["370"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-phantom-trophy", nameEn: "Knight Phantom Trophy", namePt: "Troféu dos Knight Phantoms", mod: "The Twilight Forest", utility: "Troféu do encontro dos Knight Phantoms.", origins: [{ kind: "loot", label: "Knight Phantoms / recompensa do encontro", encounterId: "tf-knight-phantoms", sources: ["tf-9m-guide"] }], milestoneIds: ["370"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-fiery-tears", nameEn: "Fiery Tears", namePt: "Lágrimas Ígneas", mod: "The Twilight Forest", utility: "Material atual ligado ao Ur-Ghast; fontes 1.21.1 o tratam como equivalente funcional ao Fiery Blood em crafting.", origins: [{ kind: "loot", label: "Ur-Ghast", encounterId: "tf-ur-ghast", sources: ["tf-mcmodwiki-prog", "tf-wikimine-1211"] }], milestoneIds: ["370"], status: "conflito entre fontes", sources: ["tf-9m-guide", "tf-mcmodwiki-prog", "tf-wikimine-1211"], notes: ["A wiki 9Minecraft lista Fiery Blood para o Ur-Ghast; mcmodwiki 4.8.3345 e WIKI-MINE 1.21.1 registram Fiery Tears. O site exibe o conflito em vez de substituir silenciosamente um pelo outro."] },
  { id: "tf-carminite", nameEn: "Carminite", namePt: "Carminite", mod: "The Twilight Forest", utility: "Material da linha de mecanismos da Dark Tower; aparece entre as recompensas documentadas do Ur-Ghast.", origins: [{ kind: "loot", label: "Ur-Ghast", encounterId: "tf-ur-ghast", sources: ["tf-9m-guide", "tf-wikimine-1211"] }], milestoneIds: ["370"], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-wikimine-1211"] },
  { id: "tf-ur-ghast-trophy", nameEn: "Ur-Ghast Trophy", namePt: "Troféu do Ur-Ghast", mod: "The Twilight Forest", utility: "Troféu do Ur-Ghast e registro do boss da Dark Tower.", origins: [{ kind: "loot", label: "Ur-Ghast", encounterId: "tf-ur-ghast", sources: ["tf-9m-guide", "tf-wikimine-1211"] }], milestoneIds: ["370"], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-wikimine-1211"] },
  { id: "tf-alpha-yeti-fur", nameEn: "Alpha Yeti Fur", namePt: "Pele do Alpha Yeti", mod: "The Twilight Forest", utility: "Material obtido do Alpha Yeti; a progressão 4.8.3345 usa a pele como passo para suportar a região glacial.", origins: [{ kind: "drop", label: "Alpha Yeti", encounterId: "tf-alpha-yeti", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], milestoneIds: ["380"], status: "confirmado (2+ fontes)", sources: commonTfSources },
  { id: "tf-ice-bomb", nameEn: "Ice Bomb", namePt: "Bomba de Gelo", mod: "The Twilight Forest", utility: "Projétil/arma consumível associado ao loot do Alpha Yeti; quantidade não foi registrada porque a fonte usada não fixa o número.", origins: [{ kind: "drop", label: "Alpha Yeti", encounterId: "tf-alpha-yeti", sources: ["tf-9m-guide"] }], milestoneIds: ["380"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-alpha-yeti-trophy", nameEn: "Alpha Yeti Trophy", namePt: "Troféu do Alpha Yeti", mod: "The Twilight Forest", utility: "Troféu do Alpha Yeti.", origins: [{ kind: "drop", label: "Alpha Yeti", encounterId: "tf-alpha-yeti", sources: ["tf-9m-guide"] }], milestoneIds: ["380"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-seeker-bow", nameEn: "Seeker Bow", namePt: "Arco Perseguidor", mod: "The Twilight Forest", utility: "Arco listado entre os drops-chave da Snow Queen; detalhes numéricos do efeito não foram adicionados sem fonte versionada explícita.", origins: [{ kind: "drop", label: "Snow Queen", encounterId: "tf-snow-queen", sources: ["tf-9m-guide"] }], milestoneIds: ["380"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-tri-bow", nameEn: "Tri-bow", namePt: "Tri-bow", mod: "The Twilight Forest", utility: "Arco listado entre os drops-chave da Snow Queen; números de efeito ficaram de fora por falta de fonte versionada explícita.", origins: [{ kind: "drop", label: "Snow Queen", encounterId: "tf-snow-queen", sources: ["tf-9m-guide"] }], milestoneIds: ["380"], status: "confirmado (1 fonte)", sources: ["tf-9m-guide"] },
  { id: "tf-snow-queen-trophy", nameEn: "Snow Queen Trophy", namePt: "Troféu da Snow Queen", mod: "The Twilight Forest", utility: "Troféu da Snow Queen, boss do topo do Aurora Palace.", origins: [{ kind: "drop", label: "Snow Queen", encounterId: "tf-snow-queen", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], milestoneIds: ["380"], status: "confirmado (2+ fontes)", sources: commonTfSources },
];

export const ENCOUNTER_CATALOG: CatalogEncounter[] = [
  { id: "tf-naga", nameEn: "Naga", namePt: "Naga", mod: "The Twilight Forest", milestoneIds: ["340"], find: [{ text: "Na Twilight Forest, procure uma Naga Courtyard em biomas de floresta.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], start: [{ text: "As fontes consultadas descrevem o encontro na arena da Naga e não documentam item de invocação para a progressão normal.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], drops: [{ itemId: "tf-naga-scale", sources: ["tf-9m-guide"] }, { itemId: "tf-naga-trophy", sources: ["tf-9m-guide"] }], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-mctoolbox", "tf-cf-483345"] },
  { id: "tf-lich", nameEn: "Twilight Lich", namePt: "Twilight Lich", mod: "The Twilight Forest", milestoneIds: ["350"], find: [{ text: "Encontrado na Lich Tower, na Twilight Forest.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], start: [{ text: "As fontes de progressão descrevem a luta no topo/estrutura da Lich Tower e não documentam item de invocação para a rota normal.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], drops: [{ itemId: "tf-scepter-twilight", sources: ["tf-9m-guide"] }, { itemId: "tf-scepter-life", sources: ["tf-9m-guide"] }, { itemId: "tf-scepter-zombie", sources: ["tf-9m-guide"] }, { itemId: "tf-lich-trophy", sources: ["tf-9m-guide"] }], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-mcmodwiki-prog", "tf-cf-483345"], notes: ["Twilight Eye permanece fora deste catálogo factual por decisão do projeto: continua 'a conferir' até validação in-game do usuário."] },
  { id: "tf-minoshroom", nameEn: "Minoshroom", namePt: "Minoshroom", mod: "The Twilight Forest", milestoneIds: ["360"], find: [{ text: "Fica no Labyrinth da região de Swamp; a cadeia de progressão leva ao prêmio do Labyrinth antes da Fire Swamp.", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], start: [{ text: "As fontes consultadas tratam o Minoshroom como encontro natural da estrutura; não documentam item de invocação para a progressão normal.", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], drops: [{ itemId: "tf-meef-stroganoff", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }, { itemId: "tf-minotaur-axe", sources: ["tf-9m-guide"] }], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-mcmodwiki-prog", "tf-cf-483345"] },
  { id: "tf-hydra", nameEn: "Hydra", namePt: "Hydra", mod: "The Twilight Forest", milestoneIds: ["360"], find: [{ text: "Procure a Hydra Lair na Fire Swamp.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], start: [{ text: "O encontro faz parte da própria Hydra Lair; as fontes consultadas não documentam item de invocação para a rota normal.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], drops: [{ itemId: "tf-fiery-blood", sources: ["tf-9m-guide"] }, { itemId: "tf-hydra-chop", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }, { itemId: "tf-hydra-trophy", sources: ["tf-9m-guide"] }], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-mcmodwiki-prog", "tf-mctoolbox", "tf-cf-483345"] },
  { id: "tf-knight-phantoms", nameEn: "Knight Phantoms", namePt: "Knight Phantoms", mod: "The Twilight Forest", milestoneIds: ["370"], find: [{ text: "Encontrados no Goblin Knight Stronghold / Knight Stronghold, na Dark Forest.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], start: [{ text: "A progressão descreve o encontro dentro da stronghold; nenhum item de invocação foi documentado nas fontes consultadas.", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], drops: [{ itemId: "tf-knightmetal-gear", sources: ["tf-9m-guide"] }, { itemId: "tf-phantom-trophy", sources: ["tf-9m-guide"] }], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-mcmodwiki-prog", "tf-mctoolbox", "tf-cf-483345"], notes: ["A fonte resume 'Knightmetal gear' e não fixa quais peças, quantidades ou chances; esses números não foram inferidos."] },
  { id: "tf-ur-ghast", nameEn: "Ur-Ghast", namePt: "Ur-Ghast", mod: "The Twilight Forest", milestoneIds: ["370"], find: [{ text: "Fica no topo/arena da Dark Tower, na Dark Forest.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], start: [{ text: "A progressão 4.8.3345 documenta o uso das Ghast Traps durante a luta; não há item de invocação documentado para a rota normal.", sources: ["tf-mcmodwiki-prog"] }], drops: [{ itemId: "tf-fiery-tears", sources: ["tf-mcmodwiki-prog", "tf-wikimine-1211"] }, { itemId: "tf-carminite", sources: ["tf-9m-guide", "tf-wikimine-1211"] }, { itemId: "tf-ur-ghast-trophy", sources: ["tf-9m-guide", "tf-wikimine-1211"] }], status: "conflito entre fontes", sources: ["tf-9m-guide", "tf-mcmodwiki-prog", "tf-wikimine-1211", "tf-cf-483345"], notes: ["Conflito preservado: 9Minecraft lista Fiery Blood; mcmodwiki 4.8.3345 e WIKI-MINE 1.21.1 listam Fiery Tears. Nenhuma chance/quantidade foi inventada."] },
  { id: "tf-alpha-yeti", nameEn: "Alpha Yeti", namePt: "Alpha Yeti", mod: "The Twilight Forest", milestoneIds: ["380"], find: [{ text: "Encontrado na Yeti Cave/Yeti Lair da região Snowy Forest.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], start: [{ text: "Encontro natural da Yeti Cave/Yeti Lair; nenhum item de invocação foi documentado nas fontes consultadas.", sources: ["tf-9m-guide", "tf-mctoolbox"] }], drops: [{ itemId: "tf-alpha-yeti-fur", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }, { itemId: "tf-ice-bomb", sources: ["tf-9m-guide"] }, { itemId: "tf-alpha-yeti-trophy", sources: ["tf-9m-guide"] }], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-mcmodwiki-prog", "tf-mctoolbox", "tf-cf-483345"] },
  { id: "tf-snow-queen", nameEn: "Snow Queen", namePt: "Snow Queen", mod: "The Twilight Forest", milestoneIds: ["380"], find: [{ text: "Encontrada no Aurora Palace, na Glacier; a progressão versionada a coloca no topo do palácio.", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], start: [{ text: "Encontro da própria estrutura; nenhum item de invocação foi documentado nas fontes consultadas.", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], drops: [{ itemId: "tf-seeker-bow", sources: ["tf-9m-guide"] }, { itemId: "tf-tri-bow", sources: ["tf-9m-guide"] }, { itemId: "tf-snow-queen-trophy", sources: ["tf-9m-guide", "tf-mcmodwiki-prog"] }], status: "confirmado (2+ fontes)", sources: ["tf-9m-guide", "tf-mcmodwiki-prog", "tf-cf-483345"] },
  { id: "tf-castle-keeper", nameEn: "Castle Keeper", namePt: "Castle Keeper", mod: "Twilight Forest Final Boss (remake)", milestoneIds: ["400"], find: [{ text: "O addon adiciona o Castle Keeper como boss final do Twilight Forest; o caminho de progressão base leva ao Final Castle.", sources: ["final-boss-cf", "tf-9m-guide"] }], drops: [], status: "não documentado", sources: ["final-boss-cf", "tf-9m-guide", "tf-cf-483345"], notes: ["A página do remake confirma que o Castle Keeper tem loot próprio e que seus drops permitem criar o Cube of Annihilation, mas não nomeia os drops nem documenta a receita.", "O projeto antigo 1.20.1 dizia exigir Twilight Tweaks para spawn; o remake informa que v2.0.0+ não requer TwilightTweaks. Não transplantamos o gatilho antigo para 1.21.1."], searched: ["CurseForge — Twilight Forest Final Boss (remake)", "CurseForge — projeto antigo 1.20.1 apenas para histórico", "CurseForge — Twilight Forest 4.8.3345", "The Twilight Forest Mod Wiki — Guide"] },
];

export const itemById = new Map(ITEM_CATALOG.map((item) => [item.id, item]));
export const sourceById = new Map(WIKI_SOURCES.map((source) => [source.id, source]));

export function encountersForMilestone(id: string) {
  return ENCOUNTER_CATALOG.filter((entry) => entry.milestoneIds.includes(id));
}

export function itemsForMilestone(id: string) {
  return ITEM_CATALOG.filter((entry) => entry.milestoneIds.includes(id));
}