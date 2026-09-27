import type { GuideTheme } from "@/types/content";

export type GuideThemeMeta = {
  theme: GuideTheme;
  rationale: string;
};

export const GUIDE_THEME_BY_ID = {
  acampamento: { theme: { accent: "torch", texture: "fire" }, rationale: "Fogueira, descanso e cozinha de expedição fazem do fogo a identidade dominante." },
  aether: { theme: { accent: "gold", texture: "stone" }, rationale: "Dungeons Bronze/Silver/Gold e estética celestial pedem ouro/templo." },
  "alexs-caves": { theme: { accent: "stone", texture: "stone" }, rationale: "A campanha gira em torno de biomas subterrâneos, tablets e exploração profunda." },
  "alexs-mobs": { theme: { accent: "grass", texture: "leaf" }, rationale: "Fauna, ecossistemas e materiais de criaturas dão identidade natural ao guia." },
  bomd: { theme: { accent: "blue", texture: "ice" }, rationale: "Bosses sobrenaturais muito diferentes entre si são unificados pela família end/arcana." },
  bumblezone: { theme: { accent: "gold", texture: "stone" }, rationale: "Mel, colmeia, Bee Queen e Sempiternal Sanctum dão uma leitura dourada clara." },
  "cataclysm-restante": { theme: { accent: "blue", texture: "ice" }, rationale: "Bosses antigos e eldritch distribuídos por vários ambientes pedem end/arcana." },
  construcao: { theme: { accent: "wood", texture: "leather" }, rationale: "Móveis, madeira e interiores artesanais pedem uma identidade quente e material." },
  cozinha: { theme: { accent: "torch", texture: "fire" }, rationale: "Fogão, preparo e refeições têm associação visual imediata com calor." },
  create: { theme: { accent: "redstone", texture: "stone" }, rationale: "Mecânica, energia, automação e máquinas usam redstone como assinatura funcional." },
  "deeper-darker": { theme: { accent: "blue", texture: "ice" }, rationale: "Sculk, portal Ancient City e Otherside têm identidade obscura e extradimensional." },
  "dungeons-structures": { theme: { accent: "stone", texture: "stone" }, rationale: "Dungeons, fortalezas, monumentos e strongholds são exploração arquitetônica." },
  "end-reformulado": { theme: { accent: "blue", texture: "ice" }, rationale: "Eyes, portal, End e Nullscape tornam a família end/arcana direta." },
  "eternal-starlight": { theme: { accent: "blue", texture: "ice" }, rationale: "Profecia, Starlight, Gatekeeper e dimensão sobrenatural combinam com arcana." },
  fallingtree: { theme: { accent: "grass", texture: "leaf" }, rationale: "Árvore, madeira e coleta florestal são a identidade inteira do mod." },
  "friends-foes": { theme: { accent: "grass", texture: "leaf" }, rationale: "A personalidade vem das criaturas e da interação com o mundo." },
  graveyard: { theme: { accent: "stone", texture: "stone" }, rationale: "Crypts, prisões, ruínas e túmulos pedem pedra escura." },
  ignis: { theme: { accent: "torch", texture: "fire" }, rationale: "Burning Arena, Burning Ashes e soul fire tornam fogo inequívoco." },
  "illager-invasion": { theme: { accent: "redstone", texture: "stone" }, rationale: "Raid, hostilidade e combate usam redstone sem virar fundo de texto." },
  incendium: { theme: { accent: "torch", texture: "fire" }, rationale: "Nether, lava e estruturas incendiárias dominam a identidade visual." },
  mca: { theme: { accent: "wood", texture: "leather" }, rationale: "Vila, casa, relações e vida cotidiana combinam com linguagem doméstica e quente." },
  "mob-variants": { theme: { accent: "grass", texture: "leaf" }, rationale: "É uma expansão leve do bestiário vivo do mundo normal." },
  "mowzies-mobs": { theme: { accent: "gold", texture: "stone" }, rationale: "Encontros rituais, Sunbird e bosses monumentais têm forte linguagem de templo." },
  "overworld-terreno": { theme: { accent: "stone", texture: "stone" }, rationale: "Terreno, mineração e redes de cavernas são a própria proposta." },
  "overworld-vivo": { theme: { accent: "grass", texture: "leaf" }, rationale: "Ecologia e weathering tornam o mundo organicamente vivo." },
  "piglin-proliferation": { theme: { accent: "gold", texture: "stone" }, rationale: "Ouro e cultura piglin são mais específicos que simplesmente Nether=fogo." },
  quark: { theme: { accent: "redstone", texture: "stone" }, rationale: "Sistemas funcionais, mecanismos e utilidades vanilla+ combinam com linguagem técnica." },
  relics: { theme: { accent: "gold", texture: "stone" }, rationale: "Loot raro, tesouro e artefatos pedem identidade de relíquia dourada." },
  "sophisticated-backpacks": { theme: { accent: "wood", texture: "leather" }, rationale: "Mochilas e armazenamento têm couro como leitura imediata." },
  "spider-overhaul": { theme: { accent: "stone", texture: "stone" }, rationale: "Aranhas, estruturas e ameaça subterrânea encaixam em pedra/caverna." },
  supplementaries: { theme: { accent: "wood", texture: "leather" }, rationale: "Objetos funcionais de casa/base têm linguagem artesanal semelhante à decoração." },
  "survival-climate": { theme: { accent: "ice", texture: "ice" }, rationale: "Clima e temperatura distinguem esse guia dos demais de survival." },
  "twilight-forest": { theme: { accent: "grass", texture: "leaf" }, rationale: "Floresta, biomas, vegetação e exploração mágica tornam o tema natural." },
  undergarden: { theme: { accent: "grass", texture: "leaf" }, rationale: "A dimensão é subterrânea, mas a identidade é orgânica, úmida e biome-heavy." },
  waystones: { theme: { accent: "blue", texture: "ice" }, rationale: "Teleporte e rede mágica de viagem são essencialmente arcane utility." },
} as const satisfies Record<string, GuideThemeMeta>;

export type KnownGuideId = keyof typeof GUIDE_THEME_BY_ID;
export const EXPECTED_GUIDE_THEME_COUNT = 35;

export function guideThemeForId(id: string): GuideTheme | undefined {
  return GUIDE_THEME_BY_ID[id as KnownGuideId]?.theme;
}
