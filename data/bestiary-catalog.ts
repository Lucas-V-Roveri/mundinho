import { AETHER_BESTIARY_5B } from "@/data/bestiary-aether-5b";
import { ALEXS_CAVES_BESTIARY_5C } from "@/data/bestiary-alexs-caves-5c";
import { ALEXS_MOBS_BESTIARY_5C } from "@/data/bestiary-alexs-mobs-5c";
import {
  BOMD_BESTIARY_5E,
  BOMD_BESTIARY_5E_COMPACT,
  BOMD_BESTIARY_5E_COUNT,
  BOMD_BESTIARY_5E_FULL,
} from "@/data/bestiary-bomd-5e";
import {
  BUMBLEZONE_BESTIARY_5E,
  BUMBLEZONE_BESTIARY_5E_COMPACT,
  BUMBLEZONE_BESTIARY_5E_COUNT,
  BUMBLEZONE_BESTIARY_5E_FULL,
} from "@/data/bestiary-bumblezone-5e";
import {
  DEEPER_DARKER_BESTIARY_5E,
  DEEPER_DARKER_BESTIARY_5E_COMPACT,
  DEEPER_DARKER_BESTIARY_5E_COUNT,
  DEEPER_DARKER_BESTIARY_5E_FULL,
} from "@/data/bestiary-deeper-darker-5e";
import {
  ECOLOGICS_BESTIARY_5E,
  ECOLOGICS_BESTIARY_5E_COMPACT,
  ECOLOGICS_BESTIARY_5E_COUNT,
  ECOLOGICS_BESTIARY_5E_FULL,
} from "@/data/bestiary-ecologics-5e";
import { enrichBestiaryEntries } from "@/data/bestiary-drop-uses";
import {
  ETERNAL_STARLIGHT_BESTIARY_5E,
  ETERNAL_STARLIGHT_BESTIARY_5E_COMPACT,
  ETERNAL_STARLIGHT_BESTIARY_5E_COUNT,
  ETERNAL_STARLIGHT_BESTIARY_5E_FULL,
} from "@/data/bestiary-eternal-starlight-5e";
import {
  GRAVEYARD_BESTIARY_5E,
  GRAVEYARD_BESTIARY_5E_COMPACT,
  GRAVEYARD_BESTIARY_5E_COUNT,
  GRAVEYARD_BESTIARY_5E_FULL,
} from "@/data/bestiary-graveyard-5e";
import {
  INCENDIUM_BESTIARY_5E,
  INCENDIUM_BESTIARY_5E_COMPACT,
  INCENDIUM_BESTIARY_5E_COUNT,
  INCENDIUM_BESTIARY_5E_FULL,
} from "@/data/bestiary-incendium-5e";
import { BESTIARY_LOT_5D_COUNTS, BESTIARY_LOT_5D_ENTRIES } from "@/data/bestiary-lote-5d";
import {
  MCA_BESTIARY_5E,
  MCA_BESTIARY_5E_COMPACT,
  MCA_BESTIARY_5E_COUNT,
  MCA_BESTIARY_5E_FULL,
} from "@/data/bestiary-mca-5e";
import {
  MOWZIES_MOBS_BESTIARY_5E,
  MOWZIES_MOBS_BESTIARY_5E_COMPACT,
  MOWZIES_MOBS_BESTIARY_5E_COUNT,
  MOWZIES_MOBS_BESTIARY_5E_FULL,
} from "@/data/bestiary-mowzies-mobs-5e";
import {
  TWILIGHT_FOREST_BESTIARY_5E,
  TWILIGHT_FOREST_BESTIARY_5E_COMPACT,
  TWILIGHT_FOREST_BESTIARY_5E_COUNT,
  TWILIGHT_FOREST_BESTIARY_5E_FULL,
} from "@/data/bestiary-twilight-5e";
import {
  UNDERGARDEN_BESTIARY_5E,
  UNDERGARDEN_BESTIARY_5E_COMPACT,
  UNDERGARDEN_BESTIARY_5E_COUNT,
  UNDERGARDEN_BESTIARY_5E_FULL,
} from "@/data/bestiary-undergarden-5e";
import {
  BESTIARY_ENTRIES as BESTIARY_LOT_5A_ENTRIES,
  BESTIARY_INVENTORY_TOTAL as BESTIARY_BASE_INVENTORY_TOTAL,
  BESTIARY_LOT_5A_DETAILED,
  BESTIARY_MOD_AUDIT as BESTIARY_LOT_5A_AUDIT,
} from "@/data/bestiary";
import type { BestiaryModAudit } from "@/types/bestiary";

/** 259 cards pré-5E + 172 alvos aprovados no Lote 5E = 431. */
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
export const BESTIARY_LOT_5E_DEEPER_DARKER_DETAILED = DEEPER_DARKER_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_DEEPER_DARKER_FULL = DEEPER_DARKER_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_DEEPER_DARKER_COMPACT = DEEPER_DARKER_BESTIARY_5E_COMPACT;
export const BESTIARY_LOT_5E_ETERNAL_STARLIGHT_DETAILED = ETERNAL_STARLIGHT_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_ETERNAL_STARLIGHT_FULL = ETERNAL_STARLIGHT_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_ETERNAL_STARLIGHT_COMPACT = ETERNAL_STARLIGHT_BESTIARY_5E_COMPACT;
export const BESTIARY_LOT_5E_UNDERGARDEN_DETAILED = UNDERGARDEN_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_UNDERGARDEN_FULL = UNDERGARDEN_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_UNDERGARDEN_COMPACT = UNDERGARDEN_BESTIARY_5E_COMPACT;
export const BESTIARY_LOT_5E_MOWZIES_MOBS_DETAILED = MOWZIES_MOBS_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_MOWZIES_MOBS_FULL = MOWZIES_MOBS_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_MOWZIES_MOBS_COMPACT = MOWZIES_MOBS_BESTIARY_5E_COMPACT;
export const BESTIARY_LOT_5E_BOMD_DETAILED = BOMD_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_BOMD_FULL = BOMD_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_BOMD_COMPACT = BOMD_BESTIARY_5E_COMPACT;
export const BESTIARY_LOT_5E_GRAVEYARD_DETAILED = GRAVEYARD_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_GRAVEYARD_FULL = GRAVEYARD_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_GRAVEYARD_COMPACT = GRAVEYARD_BESTIARY_5E_COMPACT;
export const BESTIARY_LOT_5E_MCA_DETAILED = MCA_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_MCA_FULL = MCA_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_MCA_COMPACT = MCA_BESTIARY_5E_COMPACT;
export const BESTIARY_LOT_5E_ECOLOGICS_DETAILED = ECOLOGICS_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_ECOLOGICS_FULL = ECOLOGICS_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_ECOLOGICS_COMPACT = ECOLOGICS_BESTIARY_5E_COMPACT;
export const BESTIARY_LOT_5E_INCENDIUM_DETAILED = INCENDIUM_BESTIARY_5E_COUNT;
export const BESTIARY_LOT_5E_INCENDIUM_FULL = INCENDIUM_BESTIARY_5E_FULL;
export const BESTIARY_LOT_5E_INCENDIUM_COMPACT = INCENDIUM_BESTIARY_5E_COMPACT;

export const BESTIARY_ENTRIES = enrichBestiaryEntries([
  ...BESTIARY_LOT_5A_ENTRIES,
  ...AETHER_BESTIARY_5B,
  ...ALEXS_MOBS_BESTIARY_5C,
  ...ALEXS_CAVES_BESTIARY_5C,
  ...BESTIARY_LOT_5D_ENTRIES,
  ...TWILIGHT_FOREST_BESTIARY_5E,
  ...BUMBLEZONE_BESTIARY_5E,
  ...ETERNAL_STARLIGHT_BESTIARY_5E,
  ...UNDERGARDEN_BESTIARY_5E,
  ...DEEPER_DARKER_BESTIARY_5E,
  ...MOWZIES_MOBS_BESTIARY_5E,
  ...BOMD_BESTIARY_5E,
  ...GRAVEYARD_BESTIARY_5E,
  ...MCA_BESTIARY_5E,
  ...ECOLOGICS_BESTIARY_5E,
  ...INCENDIUM_BESTIARY_5E,
]);
export const BESTIARY_DETAILED_TOTAL = BESTIARY_ENTRIES.length;

const LOT_5D_AUDIT: BestiaryModAudit[] = [
  { mod: "L_Ender's Cataclysm", version: "3.33", status: "calibrado", sourceHref: "https://github.com/lender544/new1.20.1/blob/1.21/src/main/java/com/github/L_Ender/cataclysm/init/ModEntities.java", note: "Build 3.33 auditada pelo registry 1.21.1: 38 mobs restantes além de Ignis; projéteis, efeitos, partes e entidades técnicas ficam fora." },
  { mod: "Creeper Overhaul", version: "4.0.6", status: "calibrado", sourceHref: "https://github.com/bonsaistudi0s/Creeper-Overhaul/blob/1.21.x/common/src/main/java/tech/thatgravyboat/creeperoverhaul/common/registry/ModEntities.java", note: "Registry 1.21.x reconciliado: 16 variantes no total; Bamboo Creeper já estava no 5A e as outras 15 entram no 5D." },
  { mod: "Friends&Foes", version: "4.0.27", status: "calibrado", sourceHref: "https://github.com/Faboslav/friends-and-foes/blob/1.21.1/common/src/main/java/com/faboslav/friendsandfoes/common/init/FriendsAndFoesEntityTypes.java", note: "Registry 1.21.1 reconciliado em 10 mobs jogáveis; ice_chunk e player_illusion são técnicos e ficam fora." },
  { mod: "Enderman Overhaul", version: "2.0.3", status: "calibrado", sourceHref: "https://github.com/bonsaistudi0s/Enderman-Overhaul/blob/1.21.x/src/main/java/tech/alexnijjar/endermanoverhaul/common/registry/ModEntityTypes.java", note: "Registry, loot tables e biome modifiers reconciliados em 18 variantes jogáveis; auxiliares ficam fora." },
  { mod: "Variants&Ventures", version: "1.0.26", status: "calibrado", sourceHref: "https://github.com/Faboslav/variants-and-ventures/blob/1.21.1/common/src/main/java/com/faboslav/variantsandventures/common/init/VariantsAndVenturesEntityTypes.java", note: "Registry 1.21.1 confirma Gelid, Murk, Thicket e Verdant." },
  { mod: "Illager Invasion", version: "21.1.6", status: "calibrado", sourceHref: "https://github.com/Fuzss/illager-invasion/blob/1.21.1/Common/src/generated/resources/assets/illagerinvasion/lang/en_us.json", note: "Linha 1.21.1 confirma onze entidades com chaves próprias e Spawn Eggs correspondentes." },
  { mod: "Piglin Proliferation", version: "2.0.15", status: "calibrado", sourceHref: "https://github.com/seymourimadeit/Piglin-Proliferation/blob/e417875/src/main/java/tallestred/piglinproliferation/common/entities/PPEntityTypes.java", note: "Registry auditado contém exatamente Piglin Alchemist e Piglin Traveler." },
  { mod: "Spider Overhaul", version: "0.0.6-NeoForge-v1.21", status: "calibrado", sourceHref: "https://github.com/Chybx/Spider-Overhaul/blob/master/src/main/java/dev/chybx/spideroverhaul/registry/ModEntities.java", note: "Código registra onze variantes, mas o projeto declara somente seis implementadas em survival; entram apenas essas seis." },
];

const LOT_5E_AUDIT: BestiaryModAudit[] = [
  { mod: "The Twilight Forest", version: "4.8.3345", status: "calibrado", sourceHref: "https://github.com/TeamTwilight/twilightforest/blob/008085c660f1f9fc9aad6376ea0dc8080b3c0629/src/main/java/twilightforest/init/TFEntities.java", note: "Build NeoForge 1.21.1 auditada: 58 cards após excluir PlateauBoss placeholder e preservar Rising Zombie real." },
  { mod: "The Bumblezone", version: "7.15.3+1.21.1-neoforge", status: "calibrado", sourceHref: "https://github.com/TelepathicGrunt/Bumblezone/blob/78c52256e38a537a31839b264e6058138e6cb4e8/common/src/main/java/com/telepathicgrunt/the_bumblezone/modinit/BzEntities.java", note: "Seis criaturas jogáveis confirmadas; projéteis e Sentry Watcher ficam fora." },
  { mod: "Eternal Starlight", version: "0.9.0+1.21.1+neoforge", status: "calibrado", sourceHref: "https://github.com/LeoMinecraftModding/eternal-starlight/blob/e412e1e144137889125b7d2885f2598a936ec7b6/common/src/main/java/cn/leolezury/eternalstarlight/common/registry/ESEntities.java", note: "32 Spawn Eggs menos Boarwarf e Astral Golem marcados WIP: 30 cards." },
  { mod: "The Undergarden", version: "0.9.6", status: "calibrado", sourceHref: "https://github.com/quek04/undergarden/blob/6d7f02deab3e2ad44692f7edf2dea1cca3ba747f/src/main/java/quek/undergarden/registry/UGEntityTypes.java", note: "21 criaturas normais/bosses + Forgotten Minion vivo em MISC: 22 cards." },
  { mod: "Deeper and Darker", version: "1.4.1", status: "calibrado", sourceHref: "https://github.com/KyaniteMods/DeeperAndDarker/blob/f7ba235d078411a1165a8cac184adfe0ccc8cebe/src/main/java/com/kyanite/deeperdarker/content/DDEntities.java", note: "Registry e Spawn Eggs reconciliados em 11 criaturas; barcos técnicos ficam fora." },
  { mod: "Mowzie's Mobs", version: "1.8.2", status: "calibrado", sourceHref: "https://github.com/BobMowzie/MowziesMobs-Public/blob/7aa17309337cbd4102efc418cba12a4983b1540c/src/main/java/com/bobmowzie/mowziesmobs/server/entity/EntityHandler.java", note: "18 entidades vivas de gameplay: 3 full + 15 compact; efeitos/projéteis/auxiliares ficam fora." },
  { mod: "Bosses of Mass Destruction", version: "1.3.3", status: "calibrado", sourceHref: "https://github.com/CERBON-MODS/Bosses-of-Mass-Destruction-FORGE/blob/1a7bd955d201d1b4d066157b8335cd967677e209/Common/src/main/java/com/cerbon/bosses_of_mass_destruction/entity/BMDEntities.java", note: "Quatro bosses MONSTER confirmados e ligados aos marcos 860/870/880/890." },
  { mod: "The Graveyard", version: "2.6.2", status: "calibrado", sourceHref: "https://github.com/SmartStreamLabs/The-Graveyard-Unofficial-Port-/blob/8fb0cd3f4ed556eb53336ed03ba6000d997b858d/src/main/java/com/finallion/graveyard/init/TGEntities.java", note: "13 criaturas vivas de gameplay; Skull projétil fica fora. Divergência do source tree 2.6.2 para linha MC mais nova permanece documentada." },
  { mod: "Minecraft Comes Alive Reborn", version: "7.7.36-beta.3+1.21.1", status: "calibrado", sourceHref: "https://github.com/Luke100000/minecraft-comes-alive/tree/18eedfd4a5d1c2e28cc7fc028e4a58ade3f0308d", note: "Três tipos especiais aprovados: Grim Reaper como mca:grim_reaper; Raider como variante lógica dos villagers MCA; Villager Revive Tombstone como encounter de ressurreição que usa os zombie villagers MCA. IDs fictícios não foram criados." },
  { mod: "Ecologics", version: "2.3.7", status: "calibrado", sourceHref: "https://github.com/samedifferent/Ecologics/blob/cfd79749690ac87228da05d5e0930f8b48efa669/common/src/main/java/samebutdifferent/ecologics/registry/ModEntityTypes.java", note: "Penguin e Squirrel confirmados como EntityTypes próprios; build oficial 2.3.7 para NeoForge 1.21.1 confirmada no CurseForge." },
  { mod: "Incendium", version: "5.4.4", status: "calibrado", sourceHref: "https://github.com/Stardust-Labs-MC/Incendium/tree/fedbebcef160c47aca4e8bdfa82fc7473b7eabee", note: "Cinco alvos aprovados reconciliados como encounters/variantes de datapack. Hovering Inferno e Pipeline Sentry usam Blaze; Sanctum Cultist usa Pillager; Nether Reactor é estrutura real incendium:nether_reactor. Nenhum EntityType incendium:* fictício foi criado." },
];

const BASE_OVERRIDES: BestiaryModAudit[] = [
  { mod: "The Aether", version: "1.5.10", status: "calibrado", sourceHref: "https://github.com/The-Aether-Team/The-Aether", note: "Registro vivo concluído: 20 mobs no total — Zephyr no 5A e 19 adicionais no 5B; entidades técnicas ficam fora." },
  { mod: "Alex's Mobs Continued", version: "2.1.14", status: "calibrado", sourceHref: "https://github.com/AlexModGuy/AlexsMobs", note: "Bestiário representa 90 criaturas conceituais do conjunto auditado; partes, projéteis e entidades técnicas ficam fora." },
  { mod: "Alex's Caves", version: "2.0.10", status: "calibrado", sourceHref: "https://github.com/AlexModGuy/AlexsCaves", note: "Build auditada por registry e Spawn Eggs: 43 criaturas jogáveis." },
];

const ALL_OVERRIDES = [...BASE_OVERRIDES, ...LOT_5D_AUDIT, ...LOT_5E_AUDIT];
const AUDIT_BY_MOD = new Map(ALL_OVERRIDES.map((item) => [item.mod, item]));
const UPDATED_BASE_AUDIT: BestiaryModAudit[] = BESTIARY_LOT_5A_AUDIT.map((item) => ({
  ...item,
  ...(AUDIT_BY_MOD.get(item.mod) ?? {}),
}));
const UPDATED_BASE_AUDIT_MODS = new Set(UPDATED_BASE_AUDIT.map((item) => item.mod));

export const BESTIARY_MOD_AUDIT: BestiaryModAudit[] = [
  ...UPDATED_BASE_AUDIT,
  ...ALL_OVERRIDES.filter((item) => !UPDATED_BASE_AUDIT_MODS.has(item.mod)),
];
