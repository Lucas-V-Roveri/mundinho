import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import {catalog} from './helpers/bestiary-catalog.mjs';
const manifest=JSON.parse(fs.readFileSync('data/progression-reconciliation-2026-10-10.json'));
const patches=[1,2,3].flatMap(n=>JSON.parse(fs.readFileSync(`data/progression-lot-${n}.json`)));
const mobIds=new Set(catalog().map(x=>x.id));
test('published snapshot preserves every original milestone and existing child ID',()=>{
  const baseline=JSON.parse(fs.readFileSync('data/progression-baseline-2026-10-10.json')).items;
  const file=fs.readFileSync('data/content-snapshot.generated.ts','utf8');
  const marker='export const CONTENT_SNAPSHOT_ROWS = ';
  const rows=JSON.parse(file.slice(file.indexOf(marker)+marker.length,file.lastIndexOf(' as const satisfies')));
  const current=rows.find(x=>x.key==='page:progression').payload.items;
  const map=new Map(current.map(x=>[x.id,x]));
  assert.equal(map.size,current.length);
  for(const item of baseline){
    assert.ok(map.has(item.id),item.id);
    assert.equal(map.get(item.id).order,item.order);
    if(item.subitens?.length)assert.deepEqual(map.get(item.id).subitens,item.subitens,item.id);
  }
});
test('all additions have calibrated fields and unique IDs, without embedded completion',()=>{
  const required=['phase','risk','equipment','required','soft','dependency','unprepared','complexity','reversibility','vanilla','confidence','source'];
  const newItems=patches.filter(x=>manifest.newIds.includes(x.id));
  assert.equal(newItems.length,12);
  for(const x of newItems){assert.ok(!manifest.baselineIds.includes(x.id));for(const f of required)assert.ok(typeof x[f]==='string'&&x[f].trim(),`${x.id}.${f}`);}
  const ids=patches.flatMap(x=>[x.id,...(x.subitens??[]).map(s=>s.id)]);
  assert.equal(ids.length,new Set(ids).size);
  for(const x of patches)for(const s of x.subitens??[])assert.equal('completed' in s,false);
});
test('every new bestiary cross-link resolves to a real creature',()=>{
  for(const x of patches)for(const s of x.subitens??[])for(const id of [...(s.bestiaryId?[s.bestiaryId]:[]),...(s.bestiaryIds??[])])assert.ok(mobIds.has(id),`${s.id}: ${id}`);
});
test('transversal keeps #980 without a post-boss gate; split exploration keeps both original IDs',()=>{
  const byId=new Map(patches.map(x=>[x.id,x]));
  assert.equal(byId.get('progression:980').transversal,true);
  assert.deepEqual(byId.get('progression:980').gate.depends_on,[]);
  assert.equal(byId.get('progression:270').mods,"YUNG's Better Ocean Monuments");
  assert.ok(byId.get('progression:275').mods.includes('Integrated Seven Seas'));
});
