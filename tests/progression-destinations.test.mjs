import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {personalSubitemProgress,buildSubitemMap,dependencyReady} from '../lib/progression-model.ts';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const manifest=read('data/progression-destinations-manifest.json');
const patch=read('data/progression-destinations-2026-10-13.json');
const file=readFileSync('data/content-snapshot.generated.ts','utf8');
const marker='export const CONTENT_SNAPSHOT_ROWS = ';
const rows=JSON.parse(file.slice(file.indexOf(marker)+marker.length,file.lastIndexOf(' as const satisfies')));
const items=rows.find(x=>x.key==='page:progression').payload.items;
test('all 127 pre-existing milestone IDs remain, and all replaced child IDs stay in history',()=>{
 for(const id of manifest.baselineIds)assert.ok(items.some(x=>x.id===id),id);
 assert.deepEqual(patch.map(i=>i.id),['progression:240','progression:250','progression:260','progression:265','progression:600','progression:610']);
 for(const old of manifest.before){const next=items.find(x=>x.id===old.id);for(const sub of old.subitens??[])assert.ok([...next.subitens,...next.archivedSubitems??[]].some(x=>x.id===sub.id),sub.id);}
});
test('completed legacy parent does not mark new destinations or mix players',()=>{
 const item=patch.find(x=>x.order===240);
 const states={'gr1d:progression:240':{completed:true},'benamu:progression:240':{completed:true}};
 for(const who of ['gr1d','benamu'])assert.deepEqual(personalSubitemProgress(states,who,item),{completed:0,total:3});
 states['gr1d:progression:240:tavern']={completed:true};
 assert.equal(personalSubitemProgress(states,'gr1d',item).completed,1);
 assert.equal(personalSubitemProgress(states,'benamu',item).completed,0);
});
test('retired generic IDs never count as any of the specific new destinations',()=>{
 const map=buildSubitemMap(items);
 for(const id of manifest.archivedSubitemIds)assert.ok(!Object.values(map).flat().includes(id));
 for(const n of [250,600]){const item=patch.find(x=>x.order===n);const states=Object.fromEntries(item.archivedSubitems.map(s=>['gr1d:'+s.id,{completed:true}]));assert.equal(personalSubitemProgress(states,'gr1d',item).completed,0);}
});
test('ritual is not blocked by the exploration catalogue and its five existing subitems are unchanged',()=>{
 const item=patch.find(x=>x.order===610);assert.equal(dependencyReady(item,()=>false),true);
 assert.deepEqual(item.subitens,manifest.before.find(x=>x.order===610).subitens);
});
