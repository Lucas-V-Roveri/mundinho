import { AETHER_BESTIARY_5B } from "@/data/bestiary-aether-5b";
import { ALEXS_CAVES_BESTIARY_5C } from "@/data/bestiary-alexs-caves-5c";
import { ALEXS_MOBS_BESTIARY_5C } from "@/data/bestiary-alexs-mobs-5c";
import {
  BUMBLEZONE_BESTIARY_5E,
  BUMBLEZONE_BESTIARY_5E_COMPACT,
  BUMBLEZONE_BESTIARY_5E_COUNT,
  BUMBLEZONE_BESTIARY_5E_FULL,
} from "@/data/bestiary-bumblezone-5e";
import { enrichBestiaryEntries } from "@/data/bestiary-drop-uses";
import { BESTIARY_LOT_5D_COUNTS, BESTIARY_LOT_5D_ENTRIES } from "@/data/bestiary-lote-5d";
import {
  TWILIGHT_FOREST_BESTIARY_5E,
  TWILIGHT_FOREST_BESTIARY_5E_COMPACT,
  TWILIGHT_FOREST_BESTIARY_5E_COUNT,
  TWILIGHT_FOREST_BESTIARY_5E_FULL,
} from "@/data/bestiary-twilight-5e";
import {
  BESTIARY_ENTRIES as BESTIARY_LOT_5A_ENTRIES,
  BESTIARY_INVENTORY_TOTAL as BESTIARY_BASE_INVENTORY_TOTAL,
  BESTIARY_LOT_5A_DETAILED,
  BESTIARY_MOD_AUDIT as BESTIARY_LOT_5A_AUDIT,
} from "@/data/bestiary";
import type { BestiaryModAudit } from "@/types/bestiary";

/**
 * 259 cards publicados antes do 5E + 172 alvos aprovados no Lote 5E.
 * O inventário legado (263) ficou obsoleto quando os sub-lotes 5D/5E foram fechados.
 */
export const BESTIARY_INVENTORY_TOTAL = Math.max(BESTIARY_BASE_INVENTORY_TOTAL, 431);
export { BESTIARY_LOT_5A_DETAILED, BESTIARY_LOT_5D_COUNTS };
export const BESTIARY_LOT_5B_DETAILED = AETHER_BESTIARY_5B.length;
export const BESTIARY_LOT_5C_DETAILED = ALEXS_MOBS_BESTIARY_5C.length + ALEXS_CAVES_BESTIARY_5C.length;
export const BESTIARY_LOT_5D_DETAILED = BESTIARY_LOT_5D_ENTRIES.length;
export const BESTIARY_LOT_5E_TWILIGHT_DETAILED = TWILIGHT_FOREST_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_TWILIGHT_FULL = TWILIGHT_FOREST_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_TWILIGHT_COMPACT = TWILIGHT_FOREST_BESTIARY_5E_COMPACT;
export const BESTIARY_LOT_5E_BUMBLEZONE_DETAILED = BUMBLEZONE_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_BUMBLEZONE_FULL = BUMBLEZONE_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_BUMBLEZONE_COMPACT = BUMBLEZONE_BESTIARY_5E_COMPACT;

export const BESTIARY_ENTRIES = enrichBestiaryEntries([
  ...BESTIARY_LOT_5A_ENTRIES,
  ...AETHER_BESTIARY_5B,
  ...ALEXS_MOBS_BESTIARY_5C,
  ...ALEXS_CAVES_BESTIARY_5C,
  ...BESTIARY_LOT_5D_ENTRIES,
  ...TWILIGHT_FOREST_BESTIARY_5E,
  ...BUMBLEZONE_BESTIARY_5E,
]);
export const BESTIARY_DETAILED_TOTAL = BESTIARY_ENTRIES.length;

const LOT_5D_AUDIT: BestiaryModAudit[] = [
  { mod: "L_Ender's Cataclysm", version: "3.33", status: "calibrado", sourceHref: "https://github.com/lender544/new1.20.1/blob/1.21/src/main/java/com/github/L_Ender/cataclysm/init/ModEntities.java", note: "Build 3.33 auditada pelo registry 1.21.1: 38 mobs restantes além de Ignis. Entidades MISC, projéteis, efeitos e partes de boss ficam fora." },
  { mod: "Creeper Overhaul", version: "4.0.6", status: "calibrado", sourceHref: "https://github.com/bonsaistudi0s/Creeper-Overhaul/blob/1.21.x/common/src/main/java/tech/thatgravyboat/creeperoverhaul/common/registry/ModEntities.java", note: "Registry 1.21.x reconciliado: 16 variantes distintas no total; Bamboo Creeper já estava no 5A e as outras 15 entram no 5D." },
  { mod: "Friends&Foes", version: "4.0.27", status: "calibrado", sourceHref: "https://github.com/Faboslav/friends-and-foes/blob/1.21.1/common/src/main/java/com/faboslav/friendsandfoes/common/init/FriendsAndFoesEntityTypes.java", note: "Registry 1.21.1 reconciliado em 10 mobs jogáveis. ice_chunk e player_illusion foram tratados como entidades técnicas e excluídos." },
  { mod: "Enderman Overhaul", version: "2.0.3", status: "calibrado", sourceHref: "https://github.com/bonsaistudi0s/Enderman-Overhaul/blob/1.21.x/src/main/java/tech/alexnijjar/endermanoverhaul/common/registry/ModEntityTypes.java", note: "Registry, loot tables e biome modifiers 1.21.x reconciliados em 18 variantes jogáveis; pets, summons e auxiliares ficam fora." },
  { mod: "Variants&Ventures", version: "1.0.26", status: "calibrado", sourceHref: "https://github.com/Faboslav/variants-and-ventures/blob/1.21.1/common/src/main/java/com/faboslav/variantsandventures/common/init/VariantsAndVenturesEntityTypes.java", note: "Registry 1.21.1 confirma quatro entidades próprias: Gelid, Murk, Thicket e Verdant." },
  { mod: "Illager Invasion", version: "21.1.6", status: "calibrado", sourceHref: "https://github.com/Fuzss/illager-invasion/blob/1.21.1/Common/src/generated/resources/assets/illagerinvasion/lang/en_us.json", note: "Linha 1.21.1 confirma onze entidades com chaves próprias e Spawn Eggs correspondentes." },
  { mod: "Piglin Proliferation", version: "2.0.15", status: "calibrado", sourceHref: "https://github.com/seymourimadeit/Piglin-Proliferation/blob/e417875/src/main/java/tallestred/piglinproliferation/common/entities/PPEntityTypes.java", note: "Registry da revisão auditada contém exatamente Piglin Alchemist e Piglin Traveler." },
  { mod: "Spider Overhaul", version: "0.0.6-NeoForge-v1.21", status: "calibrado", sourceHref: "https://github.com/Chybx/Spider-Overhaul/blob/master/src/main/java/dev/chybx/spideroverhaul/registry/ModEntities.java", note: "0.0.6 registra onze variantes no código, mas o projeto declara somente seis implementadas em survival; apenas essas seis entram no Bestiário agora." },
];
const LOT_5D_AUDIT_BY_MOD = new Map(LOT_5D_AUDIT.map((item) => [item.mod, item]));

const TWILIGHT_5E_AUDIT: BestiaryModAudit = {
  mod: "The Twilight Forest",
  version: "4.8.3345",
  status: "calibrado",
  sourceHref: "https://github.com/TeamTwilight/twilightforest/blob/008085c660f1f9fc9aad6376ea0dc8080b3c0629/src/main/java/twilightforest/init/TFEntities.java",
  note: "Build NeoForge 1.21.1 auditada na revisão histórica de 22/03/2026: 59 entidades MONSTER/CREATURE no registry, PlateauBoss excluído como placeholder do Final Castle e Rising Zombie mantido como MONSTER real sem Spawn Egg. Resultado: 58 cards; IDs literais cruzados com o en_us.json gerado da mesma revisão.",
};

const BUMBLEZONE_5E_AUDIT: BestiaryModAudit = {
  mod: "The Bumblezone",
  version: "7.15.3+1.21.1-neoforge",
  status: "calibrado",
  sourceHref: "https://github.com/TelepathicGrunt/Bumblezone/blob/78c52256e38a537a31839b264e6058138e6cb4e8/common/src/main/java/com/telepathicgrunt/the_bumblezone/modinit/BzEntities.java",
  note: "Build 7.15.3 auditada na revisão que fixa mod_version=7.15.3: seis criaturas jogáveis entram no Bestiário — Variant Bee, Honey Slime, Beehemoth, Bee Queen, Rootmin e Cosmic Crystal. Projéteis e Sentry Watcher ficam fora; Cosmic Crystal entra apesar de MobCategory.MISC porque é LivingEntity de combate com atributos próprios.",
};

const UPDATED_BASE_AUDIT: BestiaryModAudit[] = BESTIARY_LOT_5A_AUDIT.map((item) => {
  if (item.mod === "The Aether") {
    return {
      ...item,
      status: "calibrado",
      note: "Registro vivo do The Aether 1.5.10 concluído: 20 mobs no total — Zephyr no 5A e 19 criaturas adicionais no 5B. Projéteis, barcos, parachutes e entidades técnicas ficam fora do Bestiário.",
    };
  }
  if (item.mod === "Alex's Mobs Continued") {
    return {
      ...item,
      status: "calibrado",
      note: "Registry e BiomeConfig da build 2.1.14 auditados. O Bestiário representa 90 criaturas conceituais do mod: Bone Serpent e Crow do 5A + 88 entradas do 5C; partes, projéteis e entidades técnicas não viram cards separados.",
    };
  }
  if (item.mod === "Alex's Caves") {
    return {
      ...item,
      status: "calibrado",
      note: "Build 2.0.10 auditada por registry e mapeamento oficial de Spawn Eggs: 43 criaturas jogáveis distribuídas entre Magnetic Caves, Primordial Caves, Toxic Caves, Abyssal Chasm, Forlorn Hollows e Candy Cavity.",
    };
  }
  if (item.mod === TWILIGHT_5E_AUDIT.mod) {
    return { ...item, ...TWILIGHT_5E_AUDIT };
  }
  if (item.mod === BUMBLEZONE_5E_AUDIT.mod) {
    return { ...item, ...BUMBLEZONE_5E_AUDIT };
  }
  const lot5dAudit = LOT_5D_AUDIT_BY_MOD.get(item.mod);
  if (lot5dAudit) {
    return { ...item, ...lot5dAudit };
  }
  return item;
});

const UPDATED_BASE_AUDIT_MODS = new Set(UPDATED_BASE_AUDIT.map((item) => item.mod));
export const BESTIARY_MOD_AUDIT: BestiaryModAudit[] = [
  ...UPDATED_BASE_AUDIT,
  ...LOT_5D_AUDIT.filter((item) => !UPDATED_BASE_AUDIT_MODS.has(item.mod)),
  ...(UPDATED_BASE_AUDIT_MODS.has(TWILIGHT_5E_AUDIT.mod) ? [] : [TWILIGHT_5E_AUDIT]),
  ...(UPDATED_BASE_AUDIT_MODS.has(BUMBLEZONE_5E_AUDIT.mod) ? [] : [BUMBLEZONE_5E_AUDIT]),
];
