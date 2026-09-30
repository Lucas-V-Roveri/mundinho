import test from "node:test";
import assert from "node:assert/strict";
import { bestiarySyncPlan, parseMinecraftProgressDocuments } from "../lib/minecraft-progress.ts";

const entries = [
  { id: "alexscaves-grottoceratops", registryId: "alexscaves:grottoceratops", track: ["seen", "defeated"] },
  { id: "aether-phyg", registryId: "aether:phyg", track: ["seen"] },
];

test("lê kills, mortes e advancements concluídos", () => {
  const summary = parseMinecraftProgressDocuments([
    {
      name: "stats.json",
      data: {
        stats: {
          "minecraft:killed": { "alexscaves:grottoceratops": 2, "minecraft:zombie": 4 },
          "minecraft:killed_by": { "aether:phyg": 1 },
        },
      },
    },
    {
      name: "advancements.json",
      data: {
        "minecraft:story/mine_stone": { done: true, criteria: { get_stone: "2026-09-30 00:00:00 +0000" } },
        "minecraft:end/kill_dragon": { done: false, criteria: {} },
      },
    },
  ], entries);

  assert.equal(summary.killed["alexscaves:grottoceratops"], 2);
  assert.equal(summary.killedBy["aether:phyg"], 1);
  assert.deepEqual(summary.completedAdvancements, ["minecraft:story/mine_stone"]);
  assert.deepEqual(summary.recognizedMobIds, ["aether:phyg", "alexscaves:grottoceratops"]);
  assert.deepEqual(summary.unmatchedMobIds, ["minecraft:zombie"]);
});

test("kill vira derrotado quando o card permite e morte só vira visto", () => {
  const summary = parseMinecraftProgressDocuments([
    {
      name: "stats.json",
      data: {
        stats: {
          "minecraft:killed": { "alexscaves:grottoceratops": 1 },
          "minecraft:killed_by": { "aether:phyg": 3 },
        },
      },
    },
  ], entries);

  const plan = bestiarySyncPlan(summary, entries);
  assert.deepEqual(plan, [
    {
      mobId: "alexscaves-grottoceratops",
      registryId: "alexscaves:grottoceratops",
      defeated: true,
      seen: true,
      kills: 1,
      deaths: 0,
    },
    {
      mobId: "aether-phyg",
      registryId: "aether:phyg",
      defeated: false,
      seen: true,
      kills: 0,
      deaths: 3,
    },
  ]);
});
