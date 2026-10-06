import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const loadPackage = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function catalog(before = false) {
  const cache = new Map();
  function load(spec) {
    let file = path.resolve(root, spec.replace(/^@\//, ''));
    if (!path.extname(file)) file += '.ts';
    if (cache.has(file)) return cache.get(file).exports;
    const relative = path.relative(root, file);
    const text = before ? cp.execFileSync('git', ['show', `HEAD:${relative}`], { cwd: root, encoding: 'utf8' }) : fs.readFileSync(file, 'utf8');
    if (file.endsWith('.json')) return JSON.parse(text);
    const loaded = { exports: {} }; cache.set(file, loaded);
    const js = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
    new Function('require', 'module', 'exports', js)((id) => id.startsWith('@/') ? load(id) : loadPackage(id), loaded, loaded.exports);
    return loaded.exports;
  }
  return load('@/data/bestiary-catalog').BESTIARY_ENTRIES;
}
const entries = catalog();
const prior = catalog(true);
const bomd = entries.filter(e => e.mod === 'Bosses of Mass Destruction');
test('the canary enriches existing IDs without recreating the catalog or changing other groups', () => {
  assert.equal(entries.length, 431);
  assert.deepEqual(entries.map(e=>e.id), prior.map(e=>e.id));
  assert.deepEqual(entries.filter(e=>e.mod!=='Bosses of Mass Destruction'), prior.filter(e=>e.mod!=='Bosses of Mass Destruction'));
  assert.equal(bomd.length,4);
  for (const e of bomd) {
    const old = prior.find(x=>x.id===e.id);
    assert.equal(e.registryId,old.registryId); assert.deepEqual(e.track,old.track);
    assert.ok(e.audit.rows.every(r=>Object.keys(r).length===14 && Object.values(r).every(v=>typeof v==='string'&&v.trim())));
    assert.ok(e.drops.every(d=>d.use?.trim() && d.mechanism && d.confidenceDetail && d.sourceDetail));
    assert.equal(e.drops.length,e.audit.rows.length);
  }
  assert.equal(bomd.reduce((n,e)=>n+e.drops.length,0),63);
});
test('all new rewards have usable local crafting anchors and honest mechanism/source data',()=>{
  const corrupt=/(?:[^;\s];\s*){8,}[^;\s]/;
  for(const e of bomd){
    assert.ok(!corrupt.test(JSON.stringify(e)));
    for(const d of e.drops) assert.equal(d.guideHref,`/bestiario#mob-${e.id}-recipes`);
    assert.equal(e.audit.recipes.length,7);
    for(const r of e.audit.recipes){assert.ok(r.result&&r.source.startsWith('https://')); for(const line of r.pattern) for(const symbol of line) if(symbol!==' ')assert.equal(typeof r.key[symbol],'string');}
  }
  assert.ok(bomd.find(e=>e.id==='bomd-night-lich').drops.some(d=>d.mechanism.includes('independente da morte')));
  assert.ok(bomd.find(e=>e.id==='bomd-obsidilith').drops.some(d=>d.mechanism.includes('Shulker')));
});
test('images are separate render PNGs and persistence implementation remains byte-identical',()=>{
  assert.equal(new Set(bomd.map(e=>e.imageUrl)).size,4);
  for(const e of bomd){assert.ok(!e.imageUrl.includes('/textures/'));const b=fs.readFileSync(path.join(root,'public',e.imageUrl));assert.equal(b.subarray(1,4).toString(),'PNG');assert.ok(b.readUInt32BE(16)>64&&b.readUInt32BE(20)>64);}
  for(const name of ['lib/bestiary-state.ts','lib/supabase/browser.ts','types/content.ts']) assert.equal(fs.readFileSync(path.join(root,name),'utf8'),cp.execFileSync('git',['show',`HEAD:${name}`],{cwd:root,encoding:'utf8'}));
});
