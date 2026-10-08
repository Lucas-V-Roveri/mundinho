import audit_ac from "@/data/bestiary-audit-ac.json";
import audit_cat from "@/data/bestiary-audit-cat.json";
import audit_es from "@/data/bestiary-audit-es.json";
import audit_ug from "@/data/bestiary-audit-ug.json";
import audit_aether from "@/data/bestiary-audit-aether.json";
import audit_mm from "@/data/bestiary-audit-mm.json";
import audit_gy from "@/data/bestiary-audit-gy.json";
import audit_eo from "@/data/bestiary-audit-eo.json";
import audit_co from "@/data/bestiary-audit-co.json";
import audit_dd from "@/data/bestiary-audit-dd.json";
import audit_ii from "@/data/bestiary-audit-ii.json";
import audit_ff from "@/data/bestiary-audit-ff.json";
import audit_bz from "@/data/bestiary-audit-bz.json";
import audit_inc from "@/data/bestiary-audit-inc.json";
import audit_so from "@/data/bestiary-audit-so.json";
import initial from "@/data/bestiary-integrated-audits.json";
export const integratedAudits = {
  ...initial,
  ...audit_ac,
  ...audit_cat,
  ...audit_es,
  ...audit_ug,
  ...audit_aether,
  ...audit_mm,
  ...audit_gy,
  ...audit_eo,
  ...audit_co,
  ...audit_dd,
  ...audit_ii,
  ...audit_ff,
  ...audit_bz,
  ...audit_inc,
  ...audit_so,
};
