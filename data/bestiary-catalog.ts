import { AETHER_BESTIARY_5B } from "@/data/bestiary-aether-5b";
import { ALEXS_CAVES_5C, ALEXS_CAVES_5C_AUDIT } from "@/data/bestiary-alexscaves-5c";
import { ALEXS_MOBS_5C, ALEXS_MOBS_5C_AUDIT } from "@/data/bestiary-alexsmobs-5c";
import {
  BESTIARY_ENTRIES as BESTIARY_LOT_5A_ENTRIES,
  BESTIARY_INVENTORY_TOTAL,
  BESTIARY_LOT_5A_DETAILED,
  BESTIARY_MOD_AUDIT as BESTIARY_LOT_5A_AUDIT,
} from "@/data/bestiary";
import type { BestiaryModAudit } from "@/types/bestiary";

export { BESTIARY_INVENTORY_TOTAL, BESTIARY_LOT_5A_DETAILED };
export const BESTIARY_LOT_5B_DETAILED = AETHER_BESTIARY_5B.length;
export const BESTIARY_LOT_5C_DETAILED = ALEXS_MOBS_5C.length + ALEXS_CAVES_5C.length;
export const BESTIARY_ENTRIES = [
  ...BESTIARY_LOT_5A_ENTRIES,
  ...AETHER_BESTIARY_5B,
  ...ALEXS_MOBS_5C,
  ...ALEXS_CAVES_5C,
];
export const BESTIARY_DETAILED_TOTAL = BESTIARY_ENTRIES.length;

const baseAudit = BESTIARY_LOT_5A_AUDIT.map((item) => {
  if (item.mod === "The Aether") {
    return {
      ...item,
      status: "calibrado" as const,
      note: "Registro vivo do The Aether 1.5.10 concluído: 20 mobs no total — Zephyr no 5A e 19 criaturas adicionais no 5B. Projéteis, barcos, parachutes e entidades técnicas ficam fora do Bestiário.",
    };
  }
  if (item.mod === "Alex's Mobs Continued") return ALEXS_MOBS_5C_AUDIT;
  return item;
});

export const BESTIARY_MOD_AUDIT: BestiaryModAudit[] = [...baseAudit, ALEXS_CAVES_5C_AUDIT];
