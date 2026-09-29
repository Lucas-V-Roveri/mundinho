import { AETHER_BESTIARY_5B } from "@/data/bestiary-aether-5b";
import { enrichBestiaryEntries } from "@/data/bestiary-drop-uses";
import {
  BESTIARY_ENTRIES as BESTIARY_LOT_5A_ENTRIES,
  BESTIARY_INVENTORY_TOTAL,
  BESTIARY_LOT_5A_DETAILED,
  BESTIARY_MOD_AUDIT as BESTIARY_LOT_5A_AUDIT,
} from "@/data/bestiary";
import type { BestiaryModAudit } from "@/types/bestiary";

export { BESTIARY_INVENTORY_TOTAL, BESTIARY_LOT_5A_DETAILED };
export const BESTIARY_LOT_5B_DETAILED = AETHER_BESTIARY_5B.length;
export const BESTIARY_ENTRIES = enrichBestiaryEntries([...BESTIARY_LOT_5A_ENTRIES, ...AETHER_BESTIARY_5B]);
export const BESTIARY_DETAILED_TOTAL = BESTIARY_ENTRIES.length;

export const BESTIARY_MOD_AUDIT: BestiaryModAudit[] = BESTIARY_LOT_5A_AUDIT.map((item) =>
  item.mod === "The Aether"
    ? {
        ...item,
        status: "calibrado",
        note: "Registro vivo do The Aether 1.5.10 concluído: 20 mobs no total — Zephyr no 5A e 19 criaturas adicionais no 5B. Projéteis, barcos, parachutes e entidades técnicas ficam fora do Bestiário.",
      }
    : item,
);
