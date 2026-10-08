import audit_bz from "@/data/bestiary-audit-bz.json";
import audit_inc from "@/data/bestiary-audit-inc.json";
import audit_so from "@/data/bestiary-audit-so.json";
import initial from "@/data/bestiary-integrated-audits.json";
export const integratedAudits = {
  ...initial,
  ...audit_bz,
  ...audit_inc,
  ...audit_so,
};
