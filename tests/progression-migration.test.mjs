import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { createRequire } from 'node:module';
const requirePackage = createRequire(import.meta.url);
function load(spec) {
  const file = path.resolve(spec.replace(/^@\//, '') + '.ts');
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const loaded = { exports: {} };
  new Function('require', 'module', 'exports', js)((id) => id.startsWith('@/') ? load(id) : requirePackage(id), loaded, loaded.exports);
  return loaded.exports;
}
const { createDataStore } = load('@/lib/db');
test('enriching a completed milestone preserves it without completing new children', async () => {
  const storage = new Map();
  globalThis.localStorage = { getItem: (k) => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v) };
  const parent = { world_id: 'test', item_id: 'progression:200', actor: 'gr1d', section: 'progression', entry_key: 'Spider Overhaul', completed: true, completed_at: '2026-10-02T00:00:00Z', updated_at: '2026-10-02T00:00:00Z' };
  storage.set('mundinho.preview.playerStates.test', JSON.stringify({ 'gr1d:progression:200': parent }));
  const store = createDataStore(null, 'test');
  const children = ['progression:200:encounter', 'progression:200:structure'];
  store.configureSubitems({ 'progression:200': children });
  await store.ensureCompatibility('gr1d');
  assert.deepEqual(await store.getPlayerStates(), { 'gr1d:progression:200': parent });
  await store.setCompleted({ itemId: children[0], completed: true, actor: 'gr1d', section: 'progression', entryKey: parent.entry_key });
  const players = await store.getPlayerStates();
  assert.deepEqual(players['gr1d:progression:200'], parent);
  assert.equal(players['gr1d:'+children[1]], undefined);
});
test('new milestones still aggregate completed children normally', async () => {
  const storage = new Map();
  globalThis.localStorage = { getItem: (k) => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v) };
  const store = createDataStore(null, 'new');
  const children = ['progression:175:one', 'progression:175:two'];
  store.configureSubitems({ 'progression:175': children });
  await store.ensureCompatibility('gr1d');
  assert.deepEqual(await store.getPlayerStates(), {});
  for (const itemId of children) await store.setCompleted({ itemId, completed: true, actor: 'gr1d', section: 'progression', entryKey: 'Golems' });
  assert.equal((await store.getPlayerStates())['gr1d:progression:175'].completed, true);
});
