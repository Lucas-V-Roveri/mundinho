import type { GuideTheme } from "@/types/content";

export type GuideThemeMeta = {
  theme: GuideTheme;
  rationale: string;
};

export const GUIDE_THEME_BY_ID = {
  acampamento: {
    theme: { accent: "torch", texture: "fire" },
    rationale: "Fogueira, descanso e calor pedem âmbar de tocha com detalhe de fogo.",
  },
  aether: {
    theme: { accent: "gold", texture: "stone" },
    rationale: "O Aether usa uma leitura luminosa/celestial; ouro diferencia a dimensão sem pintar o texto.",
  },
  "alexs-caves": {
    theme: { accent: "blue", texture: "stone" },
    rationale: "Exploração subterrânea e biomas de caverna ganham azul mineral sobre textura de pedra.",
  },
  "alexs-mobs": {
    theme: { accent: "grass", texture: "leaf" },
    rationale: "Fauna e ecossistemas combinam com verde natural e detalhe de folhas.",
  },
  bomd: {
    theme: { accent: "redstone", texture: "stone" },
    rationale: "Guia focado em bosses: vermelho de perigo sobre pedra mantém leitura de combate.",
  },
  bumblezone: {
    theme: { accent: "gold", texture: "stone" },
    rationale: "Mel e colmeias pedem ouro; a textura fica discreta para não simular favos atrás do texto.",
  },
  "cataclysm-restante": {
    theme: { accent: "redstone", texture: "stone" },
    rationale: "Bosses de alto risco usam o token de perigo e uma base mineral neutra.",
  },
  construcao: {
    theme: { accent: "wood", texture: "leather" },
    rationale: "Construção e decoração usam madeira quente com uma trama artesanal sutil.",
  },
  cozinha: {
    theme: { accent: "torch", texture: "none" },
    rationale: "Comida e cozinha ficam quentes e acolhedoras sem textura adicional competindo com receitas.",
  },
  create: {
    theme: { accent: "redstone", texture: "stone" },
    rationale: "Automação, engrenagens e metal usam redstone como sinal funcional sobre base de pedra/ferro.",
  },
  "deeper-darker": {
    theme: { accent: "blue", texture: "stone" },
    rationale: "Sculk e profundezas combinam com azul frio controlado e textura mineral.",
  },
  "dungeons-structures": {
    theme: { accent: "stone", texture: "stone" },
    rationale: "Estruturas e masmorras são o caso neutro intencional: pedra comunica arquitetura sem cor arbitrária.",
  },
  "end-reformulado": {
    theme: { accent: "blue", texture: "stone" },
    rationale: "Sem token roxo no sistema, azul noturno diferencia o End mantendo contraste AA.",
  },
  "eternal-starlight": {
    theme: { accent: "ice", texture: "ice" },
    rationale: "Atmosfera fria/etérea pede azul acinzentado e padrão de gelo discreto.",
  },
  fallingtree: {
    theme: { accent: "grass", texture: "leaf" },
    rationale: "Árvores e coleta de madeira usam verde de natureza com folhas.",
  },
  "friends-foes": {
    theme: { accent: "grass", texture: "leaf" },
    rationale: "Mobs integrados ao overworld usam a identidade natural do mundo vivo.",
  },
  graveyard: {
    theme: { accent: "stone", texture: "stone" },
    rationale: "Túmulos e estruturas sombrias usam pedra neutra de propósito, sem inventar uma cor chamativa.",
  },
  ignis: {
    theme: { accent: "torch", texture: "fire" },
    rationale: "Ignis e Burning Arena têm identidade diretamente ligada a fogo e calor.",
  },
  "illager-invasion": {
    theme: { accent: "redstone", texture: "stone" },
    rationale: "Invasões e combate recebem vermelho de risco com base estrutural de pedra.",
  },
  incendium: {
    theme: { accent: "torch", texture: "fire" },
    rationale: "Nether reformulado é identificado de longe por calor, fogo e âmbar.",
  },
  mca: {
    theme: { accent: "gold", texture: "none" },
    rationale: "Vida de vila, relações e família usam ouro acolhedor sem textura atrás das histórias.",
  },
  "mob-variants": {
    theme: { accent: "grass", texture: "leaf" },
    rationale: "Variações de criaturas vanilla permanecem visualmente ligadas ao overworld natural.",
  },
  "mowzies-mobs": {
    theme: { accent: "gold", texture: "stone" },
    rationale: "Bosses e criaturas míticas usam ouro de troféu com base neutra de pedra.",
  },
  "overworld-terreno": {
    theme: { accent: "grass", texture: "stone" },
    rationale: "Terreno e cavernas misturam identidade verde do overworld com padrão mineral.",
  },
  "overworld-vivo": {
    theme: { accent: "grass", texture: "leaf" },
    rationale: "Natureza, ambientação e vida do overworld usam verde e folhas.",
  },
  "piglin-proliferation": {
    theme: { accent: "torch", texture: "fire" },
    rationale: "Piglins e Nether herdam calor e fogo como assinatura reconhecível.",
  },
  quark: {
    theme: { accent: "wood", texture: "stone" },
    rationale: "Vanilla+ amplo usa madeira como acento cozy e pedra como textura neutra de apoio.",
  },
  relics: {
    theme: { accent: "gold", texture: "stone" },
    rationale: "Relíquias e artefatos usam ouro de descoberta/conquista sobre base neutra.",
  },
  "sophisticated-backpacks": {
    theme: { accent: "wood", texture: "leather" },
    rationale: "Mochilas pedem couro/marrom quente e textura de material costurado.",
  },
  "spider-overhaul": {
    theme: { accent: "redstone", texture: "stone" },
    rationale: "Ameaça de aranhas usa vermelho de perigo; pedra evita uma textura temática agressiva demais.",
  },
  supplementaries: {
    theme: { accent: "wood", texture: "leather" },
    rationale: "Blocos decorativos e utilidades artesanais usam madeira com trama discreta.",
  },
  "survival-climate": {
    theme: { accent: "ice", texture: "ice" },
    rationale: "Clima, frio e sobrevivência térmica ganham identidade azul acinzentada de gelo.",
  },
  "twilight-forest": {
    theme: { accent: "grass", texture: "leaf" },
    rationale: "Floresta, progressão orgânica e biomas verdes usam musgo/folhas.",
  },
  undergarden: {
    theme: { accent: "grass", texture: "stone" },
    rationale: "Dimensão subterrânea orgânica combina verde musgo com textura mineral escura.",
  },
  waystones: {
    theme: { accent: "blue", texture: "stone" },
    rationale: "Teleporte e viagem usam azul como sinal de conexão/rota sobre runas de pedra.",
  },
} as const satisfies Record<string, GuideThemeMeta>;

export type KnownGuideId = keyof typeof GUIDE_THEME_BY_ID;
export const EXPECTED_GUIDE_THEME_COUNT = 35;

export function guideThemeForId(id: string): GuideTheme | undefined {
  return GUIDE_THEME_BY_ID[id as KnownGuideId]?.theme;
}
