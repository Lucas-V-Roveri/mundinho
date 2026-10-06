import audit from "@/data/bestiary-bomd-audit.json";
import type { BestiaryEntry } from "@/types/bestiary";

const SOURCE_COMMIT = "1a7bd955d201d1b4d066157b8335cd967677e209";
const SOURCE_ROOT = `https://github.com/CERBON-MODS/Bosses-of-Mass-Destruction-FORGE/blob/${SOURCE_COMMIT}`;
const REGISTRY_URL = `${SOURCE_ROOT}/Common/src/main/java/com/cerbon/bosses_of_mass_destruction/entity/BMDEntities.java`;
const LANG_URL = `${SOURCE_ROOT}/Common/src/main/resources/assets/bosses_of_mass_destruction/lang/en_us.json`;
const CONFIG_ROOT = `${SOURCE_ROOT}/Common/src/main/java/com/cerbon/bosses_of_mass_destruction/config/mob`;
const CURSEFORGE_URL = "https://www.curseforge.com/minecraft/mc-mods/bosses-of-mass-destruction-forge";
const GUIDE_HREF = "/mods#guide-bomd";

const BASE_SOURCES: BestiaryEntry["sources"] = [
  {
    label: "BOMD 1.3.3 · BMDEntities.java",
    href: REGISTRY_URL,
    note: "registry da build 1.3.3: Lich, Obsidilith, Nether Gauntlet e Void Blossom são os quatro MONSTER; projéteis e auxiliares MISC ficam fora",
  },
  {
    label: "BOMD 1.3.3 · en_us.json",
    href: LANG_URL,
    note: "nomes oficiais e chaves de configuração/advancements dos quatro bosses",
  },
  {
    label: "Bosses of Mass Destruction · CurseForge",
    href: CURSEFORGE_URL,
    note: "descrição oficial das quatro localizações e da proposta endgame",
  },
];

function boss(spec: {
  id: string;
  registryId: string;
  name: string;
  category: string;
  behavior: string;
  danger: BestiaryEntry["danger"];
  summary: string;
  dimensions: string[];
  locations: string[];
  howToFind: string;
  progressionId: string;
  notes: string[];
  configFile: string;
}): BestiaryEntry {
  const auditedRows = audit.rows.filter((row) => row.Mob === spec.name);
  return {
    id: `bomd-${spec.id}`,
    namePt: spec.name,
    nameEn: spec.name,
    mod: "Bosses of Mass Destruction",
    version: "1.3.3 · BOMD-NeoForge-1.21-1.3.3.jar",
    registryId: `bosses_of_mass_destruction:${spec.registryId}`,
    depth: "full",
    category: spec.category,
    behavior: spec.behavior,
    danger: spec.danger,
    summary: spec.summary,
    dimensions: spec.dimensions,
    locations: spec.locations,
    howToFind: auditedRows[0]?.["Onde encontrar"] ?? spec.howToFind,
    audit: { rows: auditedRows, recipes: audit.recipes.map((recipe) => ({ ...recipe, key: Object.fromEntries(Object.entries(recipe.key).filter(([, value]) => typeof value === "string")) })) },
    imageUrl: auditedRows[0]?.Imagem,
    imageAlt: `${spec.name} · render técnico do modelo auditado BOMD 1.3.3`,
    imageSourceUrl: "/bestiary/auditoria/bomd-proveniencia.json",
    drops: auditedRows.map((row) => ({
      namePt: row["Drop/Recompensa"],
      quantity: row.Quantidade,
      condition: row["Chance/condição"],
      mechanism: row.Mecanismo,
      use: row["Para que serve"],
      useConfidence: row.Confiança.includes("Média") ? "Média" : row.Confiança.startsWith("Alta") ? "Alta" : "Baixa-conferir",
      confidenceDetail: row.Confiança,
      sourceDetail: row["Fontes pesquisadas"],
      guideHref: row.Crafting,
    })),
    notes: [
      ...spec.notes,
      "Calibração 2026-10-06: recompensa de morte, tesouro de estrutura e baú/blocos pós-boss são mecanismos separados; configurações externas e addon End Remastered são condicionais, não prêmio garantido.",
      "Vida, armadura, ataque/efeitos e geração são configuráveis na build 1.3.3; o card não congela números que o pack pode alterar.",
      "A revisão 1.3.3 não possui pt_br.json; o nome oficial inglês é preservado em vez de inventar tradução.",
    ],
    track: ["seen", "defeated"],
    status: "confirmado (2+ fontes)",
    guideHref: GUIDE_HREF,
    progressionHref: `/progressao#${spec.progressionId}`,
    sources: [
      ...BASE_SOURCES,
      {
        label: `BOMD 1.3.3 · ${spec.configFile}`,
        href: `${CONFIG_ROOT}/${spec.configFile}`,
        note: "configuração versionada do encontro",
      },
    ],
  };
}

export const BOMD_BESTIARY_5E: BestiaryEntry[] = [
  boss({
    id: "void-blossom",
    registryId: "void_blossom",
    name: "Void Blossom",
    category: "Chefe endgame · planta monstruosa",
    behavior: "Hostil · MONSTER · ataques de espinhos, esporos e lâminas de pétala",
    danger: "Alto",
    summary: "Boss subterrâneo do fundo do Overworld. O próprio mod usa Void Lilies como pista para conduzir o jogador até o encontro.",
    dimensions: ["Overworld"],
    locations: ["Cavernas raras no fundo do mundo"],
    howToFind: "Explore as cavernas profundas do Overworld e siga as Void Lilies, que a documentação oficial descreve como pista para a arena.",
    progressionId: "progression:860",
    notes: [
      "BMDEntities registra Void Blossom como MONSTER e a classe de configuração expõe geração própria de arena.",
      "O en_us 1.3.3 registra o advancement “Extreme Weeding” para derrotar o boss.",
    ],
    configFile: "VoidBlossomConfig.java",
  }),
  boss({
    id: "night-lich",
    registryId: "lich",
    name: "Night Lich",
    category: "Chefe endgame · lich",
    behavior: "Hostil · MONSTER · magia, teleporte, cometas e invocação de minions",
    danger: "Severo",
    summary: "Lich encontrado em torres raras de biomas frios. Soul Stars funcionam como o mecanismo oficial de localização do encontro.",
    dimensions: ["Overworld"],
    locations: ["Torres raras em biomas frios"],
    howToFind: "Obtenha/acompanhe Soul Stars e siga sua direção até uma Lich Tower em região fria, como descrito pela página oficial.",
    progressionId: "progression:870",
    notes: [
      "O registry usa o ID literal bosses_of_mass_destruction:lich, enquanto o idioma oficial exibe “Night Lich”.",
      "O en_us 1.3.3 documenta teleporte, rage, minion summon, iceballs e comet por subtitles/configuração.",
    ],
    configFile: "LichConfig.java",
  }),
  boss({
    id: "nether-gauntlet",
    registryId: "gauntlet",
    name: "Nether Gauntlet",
    category: "Chefe endgame · constructo",
    behavior: "Hostil · MONSTER · imune a fogo · golpes, energia e laser",
    danger: "Severo",
    summary: "Constructo colossal de uma estrutura rara do Nether. A luta combina golpes físicos, energia e ataques explosivos/laser.",
    dimensions: ["Nether"],
    locations: ["Estruturas raras do Nether"],
    howToFind: "Explore o Nether até localizar a estrutura rara do Gauntlet; a build 1.3.3 expõe configuração própria de geração da arena.",
    progressionId: "progression:880",
    notes: [
      "BMDEntities registra Gauntlet como MONSTER com fireImmune().",
      "O en_us 1.3.3 documenta spin punch, laser charge, energia e opções de força de explosão na configuração.",
    ],
    configFile: "GauntletConfig.java",
  }),
  boss({
    id: "obsidilith",
    registryId: "obsidilith",
    name: "Obsidilith",
    category: "Chefe endgame · constructo do End",
    behavior: "Hostil · MONSTER · imune a fogo · escudos, runas, ondas e teleporte",
    danger: "Severo",
    summary: "Boss das ilhas do End, encontrado em estruturas raras próprias. É o encontro mais naturalmente tardio dos quatro pela dependência de acesso ao End exterior.",
    dimensions: ["The End"],
    locations: ["Estruturas raras nas ilhas do End"],
    howToFind: "Acesse as ilhas do End e procure as estruturas raras do Obsidilith; a configuração 1.3.3 expõe parâmetros próprios de geração da arena.",
    progressionId: "progression:890",
    notes: [
      "BMDEntities registra Obsidilith como MONSTER com fireImmune().",
      "O en_us 1.3.3 registra escudo de energia, ataques de runa/onda, teleporte e opções de arena configuráveis.",
    ],
    configFile: "ObsidilithConfig.java",
  }),
];

export const BOMD_BESTIARY_5E_COUNT = BOMD_BESTIARY_5E.length;
export const BOMD_BESTIARY_5E_FULL = BOMD_BESTIARY_5E.filter((entry) => entry.depth === "full").length;
export const BOMD_BESTIARY_5E_COMPACT = BOMD_BESTIARY_5E.filter((entry) => entry.depth === "compact").length;
