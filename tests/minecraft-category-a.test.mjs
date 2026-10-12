import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { MINECRAFT_CATEGORY_A } from "../data/minecraft-category-a.ts";
import { categoryASyncPlan, parseMinecraftProgressDocuments, mergeMinecraftAdvancement, validateMinecraftImportActor } from "../lib/minecraft-progress.ts";

// Criterion keys/done flags extracted from the attached saves; private dates replaced.
const saves = JSON.parse(readFileSync(new URL("./fixtures/minecraft-category-a.json", import.meta.url)));
const milestoneIds = [...new Set(MINECRAFT_CATEGORY_A.map((rule) => rule.milestoneId))];
const eyes = ["old", "nether", "cold", "rogue", "black", "magical", "lost", "corrupted", "wither", "guardian", "witch", "cursed"].map((eye) => ({ id: `progression:810:${eye}-eye` }));
const milestones = milestoneIds.map((id) => ({ id, subitens: id === "progression:810" ? eyes : [{ id: `${id}:wider-goal` }] }));
const parse = (data) => parseMinecraftProgressDocuments([{ name: "advancements.json", data }], []);
const plan = (data) => categoryASyncPlan(parse(data), MINECRAFT_CATEGORY_A, milestones);

test("canário contém exatamente os 25 sinais aprovados, cinco desativados e nenhum marco novo", () => {
  assert.equal(MINECRAFT_CATEGORY_A.length, 25);
  assert.equal(MINECRAFT_CATEGORY_A.filter((rule) => !rule.enabled).length, 5);
  assert.equal(new Set(MINECRAFT_CATEGORY_A.map((rule) => rule.advancementId)).size, 25);
  assert.ok(MINECRAFT_CATEGORY_A.every((rule) => /^progression:\d+$/.test(rule.milestoneId)));
});

test("os dois saves alimentam apenas Lost Eye, deduplicando root + lost_eye", () => {
  for (const actor of ["gr1d", "benamu"]) {
    const result = plan(saves[actor]);
    assert.deepEqual([...new Set(result.flatMap((item) => item.completions))], ["progression:810:lost-eye"]);
    assert.ok(result.filter((item) => item.kind === "partial").every((item) => item.completions.length === 0));
    assert.ok(result.filter((item) => !item.enabled).every((item) => item.completions.length === 0));
    assert.ok(!result.some((item) => item.completions.includes("progression:810")));
  }
});

test("evidências done=false preservam os critérios e denominadores sem concluir o marco", () => {
  const result = plan(saves.gr1d);
  const dungeon = result.find((item) => item.advancementId === "betterdungeons:all_dungeons");
  assert.equal(dungeon.done, false);
  assert.equal(Object.keys(dungeon.criteria).length, 3);
  assert.equal(dungeon.total, 4);
  assert.deepEqual(dungeon.completions, []);
  const crops = result.find((item) => item.advancementId === "farmersdelight:main/plant_all_crops");
  assert.equal(crops.total, 19);
  assert.equal(Object.keys(crops.criteria).length, 2);
  assert.deepEqual(crops.completions, []);
});

test("nem done=true em um sinal parcial nem a soma de parciais marca pais/subitens", () => {
  const data = Object.fromEntries(MINECRAFT_CATEGORY_A.filter((r) => r.kind === "partial").map((r) => [r.advancementId, { done: true, criteria: { anything: "2026-01-01 00:00:00 +0000" } }]));
  assert.deepEqual(plan(data).flatMap((item) => item.completions), []);
});

test("root End Remastered usa critérios, não done global ou 16/16; ignora olhos fora dos 12 IDs atuais", () => {
  const result = plan({ "endrem:main/root": { done: true, criteria: { lost_eye: "stamp", trial_eye: "stamp", exotic_eye: "stamp" } } });
  assert.deepEqual(result[0].completions, ["progression:810:lost-eye"]);
  assert.equal(result[0].total, 16);
  assert.deepEqual(plan({ "endrem:main/root": { done: true, criteria: {} } })[0].completions, []);
  assert.deepEqual(plan({ "endrem:main/lost_eye": { done: false, criteria: { lost_eye: "stamp" } } })[0].completions, []);
});

test("sinais desativados não são promovidos e IDs ausentes não recebem marcação", () => {
  const disabled = MINECRAFT_CATEGORY_A.filter((r) => !r.enabled);
  assert.equal(disabled.length, 5);
  const summary = parse(Object.fromEntries(disabled.map((r) => [r.advancementId, { done: true, criteria: {} }])));
  assert.ok(categoryASyncPlan(summary, MINECRAFT_CATEGORY_A, milestones).every((item) => !item.enabled && item.completions.length === 0));
  assert.deepEqual(categoryASyncPlan(parse(saves.gr1d), MINECRAFT_CATEGORY_A, []), []);
});

test("merge com save antigo não perde done nem critérios/timestamps já registrados", () => {
  const old = { done: true, criteria: { first: "original", second: "keep" } };
  const merged = mergeMinecraftAdvancement(old, { done: false, criteria: { first: "older-import", third: "new" } });
  assert.deepEqual(merged, { done: true, criteria: { first: "original", second: "keep", third: "new" } });
  assert.deepEqual(mergeMinecraftAdvancement(merged, { done: false, criteria: {} }), merged);
});

test("UUID trocado e dois jogadores na mesma importação são recusados", () => {
  const gr = "8665c085-fd1e-410f-80b1-277175791399(1).json";
  const be = "f6b62653-46b8-4328-b701-ec6a178f2718.json";
  assert.throws(() => validateMinecraftImportActor([gr], "benamu"), /pertence a gr1d/);
  assert.throws(() => validateMinecraftImportActor([gr, be], "gr1d"), /apenas um jogador/);
  assert.doesNotThrow(() => validateMinecraftImportActor([gr, gr], "gr1d"));
  assert.doesNotThrow(() => validateMinecraftImportActor([be], "benamu"));
});

test("receitas/metadados são excluídos; categorias b/c não geram plano de Progressão", () => {
  const summary = parse({ DataVersion: 3955, "minecraft:recipes/test": { done: true }, "mod:anyrecipes/test": { done: true }, "supplementaries:recipe/test": { done: true }, "quark:recipes": { done: true }, "explorerscompass:explorers_compass": { done: true, criteria: { has_recipe: "stamp" } }, "minecraft:story/mine_diamond": { done: true }, "cataclysm:root": { done: true } });
  assert.deepEqual(Object.keys(summary.advancements).sort(), ["cataclysm:root", "minecraft:story/mine_diamond"]);
  assert.deepEqual(categoryASyncPlan(summary, MINECRAFT_CATEGORY_A, milestones), []);
});
