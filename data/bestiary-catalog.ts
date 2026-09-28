import { AETHER_BESTIARY_5B } from "@/data/bestiary-aether-5b";
import { ALEXS_CAVES_BESTIARY_5C } from "@/data/bestiary-alexs-caves-5c";
import { ALEXS_MOBS_BESTIARY_5C } from "@/data/bestiary-alexs-mobs-5c";
import {
  BESTIARY_ENTRIES as BESTIARY_LOT_5A_ENTRIES,
  BESTIARY_INVENTORY_TOTAL,
  BESTIARY_LOT_5A_DETAILED,
  BESTIARY_MOD_AUDIT as BESTIARY_LOT_5A_AUDIT,
} from "@/data/bestiary";
import type { BestiaryModAudit } from "@/types/bestiary";

export { BESTIARY_INVENTORY_TOTAL, BESTIARY_LOT_5A_DETAILED };
export const BESTIARY_LOT_5B_DETAILED = AETHER_BESTIARY_5B.length;
export const BESTIARY_LOT_5C_DETAILED = ALEXS_MOBS_BESTIARY_5C.length + ALEXS_CAVES_BESTIARY_5C.length;
export const BESTIARY_ENTRIES = [
  ...BESTIARY_LOT_5A_ENTRIES,
  ...AETHER_BESTIARY_5B,
  ...ALEXS_MOBS_BESTIARY_5C,
  ...ALEXS_CAVES_BESTIARY_5C,
];
export const BESTIARY_DETAILED_TOTAL = BESTIARY_ENTRIES.length;

export const BESTIARY_MOD_AUDIT: BestiaryModAudit[] = BESTIARY_LOT_5A_AUDIT.map((item) => {
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
  return item;
});
