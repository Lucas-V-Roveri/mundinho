import test from "node:test";
import assert from "node:assert/strict";
import { isUnsafeBestiaryImage, sanitizeBestiaryMedia } from "../lib/bestiary-media.ts";

const base = {
  id: "test-mob",
  namePt: "Mob",
  nameEn: "Mob",
  mod: "Test Mod",
  version: "1.0",
  registryId: "test:mob",
  category: "Criatura",
  behavior: "Passivo",
  danger: "Baixo",
  summary: "Teste",
  dimensions: ["Overworld"],
  locations: [],
  howToFind: "Teste",
  drops: [],
  track: ["seen"],
  status: "confirmado (1 fonte)",
  sources: [],
};

test("bloqueia textura crua por caminho técnico", () => {
  const entry = {
    ...base,
    imageUrl: "https://raw.githubusercontent.com/example/mod/main/assets/example/textures/entity/mob.png",
    imageAlt: "Mob",
    imageSourceUrl: "https://github.com/example/mod",
  };

  assert.equal(isUnsafeBestiaryImage(entry), true);
  const safe = sanitizeBestiaryMedia(entry);
  assert.equal(safe.imageUrl, undefined);
  assert.equal(safe.imageAlt, undefined);
  assert.equal(safe.imageSourceUrl, undefined);
});

test("bloqueia mídia rotulada explicitamente como textura", () => {
  assert.equal(isUnsafeBestiaryImage({ imageUrl: "https://example.com/mob.png", imageAlt: "Textura oficial de Mob" }), true);
});

test("preserva render ou screenshot real", () => {
  const entry = {
    ...base,
    imageUrl: "https://example.com/gallery/mob-render.png",
    imageAlt: "Render oficial de Mob",
    imageSourceUrl: "https://example.com/gallery",
  };

  assert.equal(isUnsafeBestiaryImage(entry), false);
  assert.equal(sanitizeBestiaryMedia(entry), entry);
});
