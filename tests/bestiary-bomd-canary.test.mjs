import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { catalog, CANARY_REF } from './helpers/bestiary-catalog.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const entries = catalog();
const prior = catalog(CANARY_REF);
const bomd = entries.filter(e => e.mod === 'Bosses of Mass Destruction');
test('MCA keeps the unconfirmed Raider and distinguishes resurrection, inventory and unconfirmed native loot', () => {
  const raider = entries.find(e => e.id === 'mca-raider');
  const tombstone = entries.find(e => e.id === 'mca-villager-revive-tombstone');
  if (!tombstone.audit) return;
  assert.equal(raider.status, 'não documentado');
  assert.equal(raider.imageUrl, undefined);
  assert.ok(tombstone.imageAlt.includes('Exemplo masculino'));
  assert.ok(tombstone.drops.some(d => d.condition.includes('Tipo final vem do NBT')));
  assert.ok(tombstone.drops.some(d => d.namePt.includes('preexistentes')));
  assert.ok(tombstone.drops.some(d => d.namePt.includes('drop ativo não confirmado') && d.confidenceDetail.includes('Exceção')));
});
test('each integrated group covers every audited mob and row without duplicate associations', () => {
  assert.equal(entries.filter(e => e.audit).length, 431);
  assert.equal(entries.reduce((n, e) => n + e.audit.rows.length, 0), 2715);
  const coverage = JSON.parse(fs.readFileSync(path.join(root, 'data/bestiary-audit-coverage.json'), 'utf8'));
  const groups = new Map();
  for (const e of entries.filter(e => e.audit)) {
    const mod = e.audit.rows[0].Mod;
    if (!groups.has(mod)) groups.set(mod, []);
    groups.get(mod).push(e);
  }
  for (const [mod, cards] of groups) {
    assert.equal(cards.length, coverage[mod].cards, mod);
    assert.equal(cards.reduce((n, e) => n + e.audit.rows.length, 0), coverage[mod].rows, mod);
    assert.deepEqual(cards.map(e => e.audit.rows[0].Mob).sort(), coverage[mod].mobs, mod);
  }
});
test('all published audit groups have valid images or documented exceptions and functioning recipe anchors', () => {
  const corrupt = /(?:[^;\s];\s*){8,}[^;\s]/;
  for (const e of entries.filter(e => e.audit)) {
    assert.ok(!corrupt.test(JSON.stringify(e.audit)));
    assert.ok(e.audit.rows.every(r => Object.keys(r).length === 14 && Object.values(r).every(v => typeof v === 'string' && v.trim())));
    assert.ok(e.drops.every(d => d.use && d.mechanism && d.confidenceDetail && d.sourceDetail));
    if (e.imageUrl) {
      assert.ok(e.imageUrl.startsWith('/images/bestiary/audited/'));
      const b = fs.readFileSync(path.join(root, 'public', e.imageUrl));
      assert.equal(b.subarray(1, 4).toString(), 'PNG');
      assert.ok(b.readUInt32BE(16) > 64 && b.readUInt32BE(20) > 64);
    } else assert.match(e.audit.rows[0].Imagem, /não confirmad|exceção/i);
    for (const drop of e.drops) if (drop.guideHref?.startsWith('/bestiary/receitas/')) {
      const [file, anchor] = drop.guideHref.split('#');
      const page = fs.readFileSync(path.join(root, 'public', file), 'utf8');
      assert.ok(page.includes(`id="${anchor}"`), `${e.id}: ${drop.guideHref}`);
      assert.equal(page.split(`id="${anchor}"`).length - 1, 1);
    }
  }
});
test('each integrated audit preserves its fourteen fields, reward uses and faithful local images', () => {
  const integrated = JSON.parse(fs.readFileSync(path.join(root, 'data/bestiary-integrated-audits.json'), 'utf8'));
  assert.equal(Object.keys(integrated).length, 8);
  assert.equal(Object.values(integrated).reduce((n, a) => n + a.rows.length, 0), 85);
  const corrupt = /(?:[^;\s];\s*){8,}[^;\s]/;
  for (const [id, audit] of Object.entries(integrated)) {
    const e = entries.find(e => e.id === id);
    assert.ok(e);
    assert.deepEqual(e.audit.rows, audit.rows);
    assert.equal(e.drops.length, audit.rows.length);
    assert.ok(!corrupt.test(JSON.stringify(e.audit)));
    for (const row of audit.rows) {
      assert.equal(Object.keys(row).length, 14);
      assert.ok(Object.values(row).every(v => typeof v === 'string' && v.trim()));
    }
    assert.ok(e.drops.every(d => d.use && d.mechanism && d.confidenceDetail && d.sourceDetail));
    assert.ok(e.imageUrl.startsWith('/images/bestiary/audited/'));
    assert.ok(!e.imageUrl.includes('/textures/'));
    const b = fs.readFileSync(path.join(root, 'public', e.imageUrl));
    assert.equal(b.subarray(1, 4).toString(), 'PNG');
    assert.ok(b.readUInt32BE(16) > 64 && b.readUInt32BE(20) > 64);
    assert.ok(fs.existsSync(path.join(root, 'public', e.imageSourceUrl)));
    for (const drop of e.drops) if (drop.guideHref) assert.ok(drop.guideHref.startsWith('https://minecraft.wiki/'));
  }
});
test('migration preserves all 431 IDs, registry IDs, tracking flags and unaudited cards', () => {
  assert.equal(entries.length, 431);
  assert.deepEqual(entries.map(e=>e.id), prior.map(e=>e.id));
  for (const e of entries) { const old = prior.find(x=>x.id===e.id); assert.equal(e.registryId, old.registryId); assert.deepEqual(e.track, old.track); if (!e.audit) assert.deepEqual(e, old); }
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
  for(const name of ['lib/bestiary-state.ts','lib/supabase/browser.ts','types/content.ts']) assert.equal(fs.readFileSync(path.join(root,name),'utf8'),cp.execFileSync('git',['show',`${CANARY_REF}:${name}`],{cwd:root,encoding:'utf8'}));
});
