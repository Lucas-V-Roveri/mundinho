import assert from "node:assert/strict";
import test from "node:test";
import { matchFamily, describeCelebration } from "../components/effects/taxonomy.ts";
import { CONTENT_SNAPSHOT_ROWS } from "../data/content-snapshot.generated.ts";

const guides = CONTENT_SNAPSHOT_ROWS.filter((r) => r.key.startsWith("guide:")).map((r) => r.payload);
const progression = CONTENT_SNAPSHOT_ROWS.find((r) => r.key === "page:progression").payload.items;
const content = { guides, progression, extras: { items: [] }, amendments: null, backstage: null };
const context = { content, actor: "gr1d", playerStates: {}, customItems: [] };
const inputFor = (p) => ({ itemId: p.id, completed: true, section: "progression", entryKey: p.entry, label: p.title });

test("every current guide and milestone resolves a semantic family", () => {
  assert.equal(guides.length, 35);
  assert.equal(progression.length, 101);
  for (const guide of guides) assert.notEqual(matchFamily(guide.title.split("+")[0], guide.title).family, "fallback", guide.title);
  for (const item of progression) assert.notEqual(describeCelebration(inputFor(item), context).family, "fallback", item.title);
});

test("specific identity overrides shared colors and ambiguous generic words", () => {
  assert.equal(matchFamily("The Aether", "Construir portal", { accent: "gold", texture: "stone" }).effect, "sky");
  assert.equal(matchFamily("The Bumblezone", "Entrar", { accent: "gold", texture: "stone" }).effect, "bees");
  assert.equal(matchFamily("", "Queen Eye Guardian Gold Caves").effect, "xp");
  assert.equal(matchFamily("", "Outro objetivo", { accent: "blue", texture: "ice" }).effect, "magic");
});

test("variants are scoped, Extras and relics retain their own families", () => {
  assert.equal(matchFamily("Mowzie’s Mobs", "Frostmaw").effect, "ice");
  assert.equal(matchFamily("Cataclysm", "Harbinger").effect, "metal");
  assert.equal(matchFamily("Cataclysm", "Ignis").effect, "fireBurst");
  assert.equal(matchFamily("Extras", "Piquenique na Twilight Forest", undefined, true).effect, "love");
  assert.equal(matchFamily("Relics · Reliquified Twilight Forest", "Relíquia").effect, "relics");
});

test("effect is invariant under milestone IDs and uses actual mod for Lost Castle", () => {
  const castle = progression.find((p) => p.title === "The Lost Castle");
  const original = describeCelebration(inputFor(castle), context);
  const renamed = { ...castle, id: "anything", order: 123456 };
  const changed = describeCelebration(inputFor(renamed), { ...context, content: { ...content, progression: [renamed] } });
  assert.equal(original.effect, "structures");
  assert.equal(original.effect, changed.effect);
});

test("last subitem upgrades one event to milestone or phase; confirmed rapid writes count", () => {
  const parent = { id: "parent", entry: "Acampamento", mods: "Comfortable Campfires", title: "Acampamento", phase: "Início", type: "utilidade", subitens: [{ id: "a", title: "Fogueira" }, { id: "b", title: "Descanso" }] };
  const pending = { id: "other", entry: "Create", mods: "Create", title: "Create", phase: "Início", type: "utilidade" };
  const local = { ...context, content: { ...content, progression: [parent, pending] } };
  const first = { itemId: "a", label: "Fogueira", section: "progression", entryKey: "Acampamento", completed: true };
  const last = { ...first, itemId: "b", label: "Descanso" };
  assert.equal(describeCelebration(first, local).level, "item");
  const writes = new Map([["gr1d:a", true]]);
  assert.equal(describeCelebration(last, local, writes).level, "milestone");
  writes.set("gr1d:other", true);
  assert.equal(describeCelebration(last, local, writes).level, "phase");
  assert.equal(describeCelebration(last, local, writes).count, 34);
});

test("boss preparation and summoning do not award trophy; victory does", () => {
  const ignis = guides.find((g) => g.title === "Ignis");
  const base = { itemId: "arbitrary", completed: true, section: "mods", entryKey: ignis.id };
  for (const label of ["Set principal reparado", "Encontrar a Burning Arena", "Invocar Ignis", "Obter Ignitium", "Preparar para derrotar Ignis"]) assert.equal(describeCelebration({ ...base, label }, context).trophy, false, label);
  assert.equal(describeCelebration({ ...base, label: "Derrotar Ignis" }, context).trophy, true);
});
