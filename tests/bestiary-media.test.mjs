import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isUnsafeBestiaryImage, sanitizeBestiaryMedia } from "../lib/bestiary-media.ts";
import { bestiaryHrefForCatalogItem, bestiaryHrefForEncounter } from "../lib/bestiary-links.ts";
import { enrichBestiaryEntries } from "../data/bestiary-drop-uses.ts";
import { ENCOUNTER_CATALOG, itemById } from "../data/wiki-catalog.ts";

import { catalog } from "./helpers/bestiary-catalog.mjs";

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

test("todo drop sem uso recebe fallback e confiança explícita", () => {
  const [entry] = enrichBestiaryEntries([{ ...base, drops: [{ namePt: "Drop desconhecido" }] }]);
  assert.match(entry.drops[0].use, /conferir no JEI/i);
  assert.equal(entry.drops[0].useConfidence, "Baixa-conferir");
});

test("drop com uso próprio nunca fica sem hierarquia de confiança", () => {
  const [entry] = enrichBestiaryEntries([{ ...base, drops: [{ namePt: "Drop auditado", use: "Uso conhecido." }] }]);
  assert.equal(entry.drops[0].use, "Uso conhecido.");
  assert.equal(entry.drops[0].useConfidence, "Baixa-conferir");
});

test("drop com crafting documentado em Mods ganha link sem duplicar receita", () => {
  const [entry] = enrichBestiaryEntries([{
    ...base,
    drops: [{ namePt: "Troféu da Naga", nameEn: "Naga Trophy", use: "Resumo de uma linha.", useConfidence: "Alta" }],
  }]);
  assert.equal(entry.drops[0].guideHref, "/mods#twilight-crafting-tf-naga-trophy");
  assert.equal(entry.drops[0].use, "Resumo de uma linha.");
});

test("catálogo publicado mantém enriquecimento global de drops", () => {
  const entries = catalog();
  assert.equal(entries.length, 431);
  for (const entry of entries) {
    for (const drop of entry.drops) {
      assert.ok(drop.use?.trim(), `${entry.id}: uso ausente`);
      assert.ok(drop.useConfidence, `${entry.id}: confiança ausente`);
    }
  }
});

test("renderer compacto exibe uso, confiança e link de crafting", () => {
  const compact = readFileSync(new URL("../components/bestiary/bestiary-compact-card.tsx", import.meta.url), "utf8");
  assert.match(compact, /Para que serve:/);
  assert.match(compact, /drop\.useConfidence/);
  assert.match(compact, /drop\.guideHref/);
});

test("todos os drops atuais da Progressão apontam para o Bestiário", () => {
  const encountersWithDrops = ENCOUNTER_CATALOG.filter((encounter) => encounter.drops.length > 0);
  const totalDrops = encountersWithDrops.reduce((total, encounter) => total + encounter.drops.length, 0);
  assert.equal(totalDrops, 22);

  for (const encounter of encountersWithDrops) {
    const encounterHref = bestiaryHrefForEncounter(encounter.id);
    assert.match(encounterHref ?? "", /^\/bestiario#mob-/);

    for (const drop of encounter.drops) {
      const item = itemById.get(drop.itemId);
      assert.ok(item, `item ${drop.itemId} precisa existir no catálogo`);
      assert.equal(bestiaryHrefForCatalogItem(item), encounterHref, `${drop.itemId} deve apontar para ${encounter.nameEn}`);
    }
  }
});

test("Progressão e Mods não reabrem a ficha antiga de utilidade dos drops", () => {
  const wiki = readFileSync(new URL("../components/wiki/wiki-catalog.tsx", import.meta.url), "utf8");
  assert.match(wiki, /A explicação de cada drop vive no card da criatura no Bestiário/);
  assert.match(wiki, /Origem e utilidade dos drops ficam no Bestiário/);
  assert.doesNotMatch(wiki, /Clique para ver origem, utilidade, receita quando documentada/);
});
