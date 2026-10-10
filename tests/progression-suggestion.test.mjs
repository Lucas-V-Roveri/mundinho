import assert from "node:assert/strict";
import test from "node:test";
import { nextEligibleProgression } from "../lib/progression-model.ts";

function milestone(id, order, phase, dependsOn = []) {
  return {
    id,
    order,
    phase,
    risk: "Baixo",
    gate: { confirmed: dependsOn.length > 0, depends_on: dependsOn },
  };
}

test("suggestion advances to the next eligible phase when the current phase is complete", () => {
  const items = [
    milestone("inicio:1", 10, "Início"),
    milestone("inicio:2", 20, "Início"),
    milestone("intermediario:1", 30, "Intermediário", ["inicio:2"]),
    milestone("avancado:1", 40, "Avançado", ["intermediario:1"]),
  ];
  const completed = new Set(["inicio:1", "inicio:2"]);

  assert.equal(nextEligibleProgression(items, (id) => completed.has(id))?.id, "intermediario:1");
});

test("suggestion never returns a completed milestone", () => {
  const items = [
    milestone("inicio:1", 10, "Início"),
    milestone("inicio:2", 20, "Início"),
    milestone("intermediario:1", 30, "Intermediário"),
  ];
  const completed = new Set(["inicio:1"]);

  assert.equal(nextEligibleProgression(items, (id) => completed.has(id))?.id, "inicio:2");
});

test("suggestion respects confirmed dependencies", () => {
  const items = [
    milestone("inicio:1", 10, "Início"),
    milestone("intermediario:locked", 20, "Intermediário", ["inicio:1"]),
    milestone("intermediario:free", 30, "Intermediário"),
  ];

  assert.equal(nextEligibleProgression(items, () => false)?.id, "inicio:1");
  assert.equal(nextEligibleProgression(items, (id) => id === "inicio:1")?.id, "intermediario:locked");
});

test("transversal accompanies expeditions without replacing the suggested next milestone", () => {
  const items = [{...milestone("cross", 1, "Início"),transversal:true},milestone("next",2,"Início")];
  assert.equal(nextEligibleProgression(items, () => false)?.id,"next");
});
