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
test('Supabase compatibility never backfills added children or revokes saved parent state', async () => {
  const parent = { world_id:'test', item_id:'progression:200', actor:'gr1d', section:'progression', entry_key:'Spider Overhaul', completed:true, completed_at:'2026-10-02T00:00:00Z', updated_at:'2026-10-02T00:00:00Z' };
  const tables = { mundinho_player_item_state:[parent], mundinho_item_state:[{...parent,completed_by:'gr1d'}] };
  const writes=[];
  const client={from(table) {
    let selected=[...tables[table]];
    let value=null;
    const query={select(){return query},eq(k,v){selected=selected.filter(x=>x[k]===v);return query},in(k,vs){selected=selected.filter(x=>vs.includes(x[k]));return query},order(){return query},limit(n){selected=selected.slice(0,n);return query},maybeSingle(){value=selected[0]??null;return query},single(){value=selected[0];return query},upsert(rows){rows=Array.isArray(rows)?rows:[rows];writes.push({table,rows});for(const row of rows){const i=tables[table].findIndex(x=>x.item_id===row.item_id&&x.actor===row.actor);if(i<0)tables[table].push(row);else tables[table][i]=row;}selected=rows;return query},then(resolve){return Promise.resolve({data:value??selected,error:null}).then(resolve)}};
    return query;
  }};
  const store=createDataStore(client,'test');
  store.configureSubitems({'progression:200':['progression:200:one','progression:200:two']});
  await store.ensureCompatibility('gr1d');
  assert.equal(writes.length,0);
  await store.setCompleted({itemId:'progression:200:one',completed:true,actor:'gr1d',section:'progression',entryKey:parent.entry_key});
  assert.deepEqual(tables.mundinho_player_item_state.find(x=>x.item_id===parent.item_id),parent);
  assert.equal(writes.some(w=>w.rows.some(x=>x.item_id===parent.item_id)),false);
});
