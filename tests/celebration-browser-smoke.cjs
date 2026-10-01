/* Run against an isolated local server: BASE_URL=http://127.0.0.1:3000 node tests/celebration-browser-smoke.cjs */
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS browser runner; no app bundle imports. */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.BASE_URL || "http://127.0.0.1:3000";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base)) throw new Error("Mutation tests only run on an isolated local server.");
const source = fs.readFileSync(path.join(__dirname, "../data/content-snapshot.generated.ts"), "utf8");
const rows = JSON.parse(source.slice(source.indexOf("[\n"), source.indexOf("] as const") + 1));
const progression = rows.find((r) => r.key === "page:progression").payload.items;
const output = process.env.EVIDENCE_DIR || "/tmp/mundinho-celebration-evidence";
fs.mkdirSync(output, { recursive: true });
const errors = [], results = [];
let browser;

async function pageFor(options = {}, seed = {}, disabled = false) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...options });
  await context.addInitScript(({ seed, disabled }) => {
    localStorage.setItem("mundinho.progression.showCompleted", "true");
    for (const [key, value] of Object.entries(seed)) localStorage.setItem(key, JSON.stringify(value));
    if (disabled) localStorage.setItem("mundinho.celebrations", "0");
    window.celebrationEvents = [];
    window.addEventListener("mundinho:celebration", (e) => window.celebrationEvents.push(e.detail.celebration));
  }, { seed, disabled });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(`${base}/progressao`);
  await page.locator("canvas[data-celebration-overlay]").waitFor({ state: "attached" });
  await page.locator('article[id="progression:50"] input[type=checkbox]').waitFor({ state: "attached" });
  return { page, context };
}
async function mark(page, id, index = 0, keyboard = false) {
  const article = page.locator(`article[id="${id}"]`);
  await article.locator("details").first().evaluate((d) => { d.open = true; });
  const input = article.locator("input[type=checkbox]:not(:disabled)").nth(index);
  const label = input.locator("..");
  await label.scrollIntoViewIfNeeded();
  if (keyboard) { await input.focus(); await input.press("Space"); } else await label.click();
  try { await page.waitForFunction(() => window.celebrationEvents.length > 0, null, { timeout: 5000 }); }
  catch (error) { console.log(await page.evaluate(() => ({ checked: document.querySelector('article[id="progression:50"] input')?.checked, canvas: document.querySelector("canvas[data-celebration-overlay]")?.dataset, keys: Object.keys(localStorage), events: window.celebrationEvents, text: document.body.innerText.slice(-1500) }))); await page.screenshot({ path: `${output}/failure.png` }); throw error; }
  return input;
}
async function canvasState(page) { return page.locator("canvas[data-celebration-overlay]").evaluate((c) => ({ ...c.dataset, pixels: c.getContext("2d").getImageData(0, 0, c.width, c.height).data.some((v, i) => i % 4 === 3 && v > 0) })); }

(async () => {
  browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE || undefined, headless: true, args: ["--no-sandbox"] });
  {
    const { page, context } = await pageFor();
    const before = await page.locator('article[id="progression:750"]').boundingBox();
    await mark(page, "progression:750");
    await page.waitForTimeout(120);
    const state = await canvasState(page);
    assert.equal(state.effect, "fire"); assert.ok(+state.particles > 0); assert.ok(state.pixels);
    assert.equal(await page.locator("canvas[data-celebration-overlay]").count(), 1);
    assert.equal(await page.locator("canvas[data-celebration-overlay]").evaluate((c) => getComputedStyle(c).pointerEvents), "none");
    const after = await page.locator('article[id="progression:750"]').boundingBox();
    assert.equal(Math.round(before.width), Math.round(after.width));
    await page.screenshot({ path: `${output}/fire.png` });
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("mundinho.preview.playerStates.mundinho-pra-sempre")));
    assert.equal(stored["gr1d:progression:750"].completed, true); assert.equal(stored["benamu:progression:750"].completed, true);
    const input = page.locator('article[id="progression:750"] input[type=checkbox]');
    await input.locator("..").click();
    assert.equal(await page.evaluate(() => window.celebrationEvents.length), 1);
    await page.waitForTimeout(2500); assert.equal((await canvasState(page)).particles, "0");
    results.push("fire, shared progress, uncheck suppression, idle cleanup, unchanged width");
    await context.close();
  }
  {
    const { page, context } = await pageFor({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await mark(page, "progression:780", 0, true);
    await page.waitForTimeout(140);
    const state = await canvasState(page); assert.equal(state.effect, "ice"); assert.ok(state.pixels);
    assert.equal(await page.locator("canvas[data-celebration-overlay]").evaluate((c) => c.width), 780);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path: `${output}/snow-mobile.png` });
    results.push("keyboard, snow rain, mobile width, DPR capped at 2");
    await context.close();
  }
  {
    const players = {}, states = {};
    for (const item of progression.filter((p) => p.phase === "Início" && p.id !== "progression:50")) {
      for (const id of [item.id, ...(item.subitens || []).map((s) => s.id)]) {
        for (const actor of ["gr1d", "benamu"]) players[`${actor}:${id}`] = { item_id: id, actor, section: "progression", entry_key: item.entry, completed: true };
        states[id] = { item_id: id, section: "progression", entry_key: item.entry, completed: true, completed_by: "gr1d" };
      }
    }
    const { page, context } = await pageFor({}, { "mundinho.preview.playerStates.mundinho-pra-sempre": players, "mundinho.preview.states.mundinho-pra-sempre": states });
    await mark(page, "progression:50");
    const event = await page.evaluate(() => window.celebrationEvents[0]);
    assert.equal(event.level, "phase"); assert.equal(event.count, 34);
    await page.waitForTimeout(150); await page.screenshot({ path: `${output}/phase.png` });
    results.push("full phase emits one amplified celebration with 34 particles");
    await context.close();
  }
  {
    const { page, context } = await pageFor({ reducedMotion: "reduce" });
    await mark(page, "progression:50");
    await page.waitForTimeout(80);
    const state = await canvasState(page); assert.equal(state.mode, "reduced-motion"); assert.equal(state.particles, "0"); assert.ok(state.pixels);
    await page.screenshot({ path: `${output}/reduced-motion.png` });
    await page.waitForTimeout(400); assert.equal((await canvasState(page)).pixels, false);
    results.push("reduced-motion: no particles, amber outline removed after 300ms");
    await context.close();
  }
  {
    const { page, context } = await pageFor();
    await page.goto(`${base}/extras`);
    await page.locator('input[type="checkbox"]').first().waitFor({ state: "attached" });
    // Legitimate checkbox change events in a rapid batch; all writes remain local.
    await page.locator('input[type="checkbox"]').evaluateAll((inputs) => inputs.slice(0, 10).forEach((input) => input.click()));
    await page.waitForTimeout(100);
    const state = await canvasState(page); assert.equal(state.effect, "love"); assert.ok(+state.particles <= 40); assert.ok(+state.queued > 0);
    await page.getByRole("link", { name: "Progressão", exact: true }).first().click();
    await page.waitForTimeout(200); assert.equal((await canvasState(page)).particles, "0"); assert.equal((await canvasState(page)).queued, "0");
    results.push("rapid batch respects cap, queues, and clears on route change");
    await context.close();
  }
  {
    const { page, context } = await pageFor();
    const other = await context.newPage();
    await other.goto(`${base}/progressao`); await other.locator('article[id="progression:50"] input[type=checkbox]').waitFor({ state: "attached" });
    await page.bringToFront(); await mark(page, "progression:50");
    await other.waitForFunction(() => document.querySelector('article[id="progression:50"] input[type=checkbox]')?.checked === true);
    assert.equal(await other.locator("canvas[data-celebration-overlay]").getAttribute("data-effect"), null);
    results.push("cross-tab updates progress without replaying effects");
    await context.close();
  }
  {
    const { page, context } = await pageFor();
    await page.evaluate(() => { const original = Storage.prototype.setItem; Storage.prototype.setItem = function(key, value) { if (key.startsWith("mundinho.preview.playerStates")) throw new Error("simulated write failure"); return original.call(this, key, value); }; });
    const article = page.locator('article[id="progression:50"]'); await article.locator("details").evaluate((d) => { d.open = true; });
    await article.locator("input[type=checkbox]").locator("..").click();
    await page.waitForTimeout(200); assert.equal(await page.evaluate(() => window.celebrationEvents.length), 0);
    assert.equal((await canvasState(page)).particles, "0"); results.push("failed mutation emits no celebration");
    await context.close();
  }
  {
    const { page, context } = await pageFor({}, {}, true);
    const article = page.locator('article[id="progression:50"]'); await article.locator("details").evaluate((d) => { d.open = true; });
    await article.locator("input[type=checkbox]").locator("..").click();
    await page.waitForTimeout(200); assert.equal(await page.evaluate(() => window.celebrationEvents.length), 0);
    assert.equal((await canvasState(page)).pixels, false); results.push("disabled feature leaves empty overlay and unchanged progress flow");
    await context.close();
  }
  {
    const { page, context } = await pageFor({}, { "mundinho.progression.showCompleted": false });
    await mark(page, "progression:750");
    await page.waitForTimeout(120);
    const state = await canvasState(page); assert.equal(state.effect, "fire"); assert.ok(state.pixels);
    results.push("captured card origin survives hiding completed cards");
    await context.close();
  }
  {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.route("**/icons/**/*.png", (route) => route.abort());
    await context.addInitScript(() => { localStorage.setItem("mundinho.progression.showCompleted", "true"); window.celebrationEvents = []; window.addEventListener("mundinho:celebration", (e) => window.celebrationEvents.push(e.detail.celebration)); });
    const page = await context.newPage(); page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`${base}/progressao`); await page.locator("canvas[data-celebration-overlay]").waitFor({ state: "attached" });
    const skyId = progression.find((p) => /aether/i.test(p.title) && !p.subitens?.length).id;
    await mark(page, skyId); await page.waitForTimeout(120);
    assert.ok((await canvasState(page)).pixels);
    results.push("failed Minecraft PNG loads use inline pixel sprites");
    await context.close();
  }
  assert.deepEqual(errors, []);
  fs.writeFileSync(`${output}/results.json`, JSON.stringify({ results, pageErrors: errors }, null, 2));
  console.log(JSON.stringify({ status: "PASS", results, evidence: output }, null, 2));
})().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => { await browser?.close(); });
