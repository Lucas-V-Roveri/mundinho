import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {isDeepStrictEqual} from 'node:util';
import {techniqueProgress} from '../lib/minecraft-techniques.ts';
const patch=JSON.parse(readFileSync('data/minecraft-techniques-2026-10-19.json','utf8'));
const guide=patch['guide:minecraft-tecnicas'];
const snapshotText=readFileSync('data/content-snapshot.generated.ts','utf8');
const currentRows=JSON.parse(snapshotText.split('export const CONTENT_SNAPSHOT_ROWS = ')[1].split(' as const satisfies')[0]);
const progression=currentRows.find(r=>r.key==='page:progression').payload.items;
const section=n=>guide.sections.find(s=>s.minecraft.milestoneId===`progression:${n}`).minecraft;
const observation=(n,actor,criteria,done=false)=>({world_id:'mundinho-pra-sempre',actor,milestone_id:`progression:${n}`,advancement_id:section(n).advancementId,criteria:Object.fromEntries(criteria.map(c=>[c,'2026-09-30T00:00:00Z'])),done,criteria_total:section(n).criteria.length,rule_version:'test',imported_at:'2026-10-13T23:36:40Z'});
test('all sixteen existing milestones link to unique how-to sections with criteria and sources',()=>{
 const ids=[12,13,14,15,16,17,18,46,155,166,225,226,227,228,231,990];
 assert.equal(guide.sections.length,16);assert.deepEqual(guide.checklist,[]);
 for(const n of ids){const s=guide.sections.find(s=>s.id===`vanilla-${n}`);assert.ok(s.body.length>150);assert.ok(s.list.some(x=>x.startsWith('Confiança:')));assert.ok(guide.sources.some(([,href])=>href.endsWith(s.minecraft.advancementId.replace('minecraft:','')+'.json')));assert.ok(progression.find(i=>i.id===`progression:${n}`).guideLinks.some(l=>l.href===`/mods#guide-${guide.id}-${s.id}`));}
});
test('links are the sole changes to all 143 original milestones and their subitems',()=>{
 const previous=JSON.parse(readFileSync('data/destination-howto-2026-10-14.json','utf8'))['page:progression'].items;
 const next=progression;assert.equal(next.length,143);assert.deepEqual(next.map(x=>x.id),previous.map(x=>x.id));
 let changed=0;
 for(const old of previous){const now=next.find(x=>x.id===old.id);const {guideLinks:oldLinks,...oldRest}=old;const {guideLinks:newLinks,...newRest}=now;assert.deepEqual(newRest,oldRest,old.id);if(!isDeepStrictEqual(oldLinks,newLinks)){changed++;assert.deepEqual(newLinks.slice(0,-1),oldLinks??[]);}}
 assert.equal(changed,16);
});
test('partial archaeology requires sherd AND any excavation, never all seven',()=>{
 const a=techniqueProgress(section(14),'gr1d',[observation(14,'gr1d',['has_sherd'])],{});
 assert.deepEqual(a.requirementGroups.map(g=>g.met),[false,true]);assert.equal(a.siteDone,false);
 const b=techniqueProgress(section(14),'gr1d',[observation(14,'gr1d',['has_sherd','trail_ruins_common'])],{});
 assert.ok(b.requirementGroups.every(g=>g.met));assert.equal(b.registered.length,2);assert.equal(b.siteDone,false);
});
test('new upload updates only that player; companion evidence never fills missing criteria',()=>{
 const c=section(990).criteria;const rows=[observation(990,'gr1d',c.slice(0,10)),observation(990,'benamu',c.slice(0,7))];const original=structuredClone(rows);
 assert.equal(techniqueProgress(section(990),'gr1d',rows,{}).missing.length,26);
 assert.equal(techniqueProgress(section(990),'benamu',rows,{}).missing.length,29);
 const updated=[observation(990,'gr1d',c.slice(0,11)),rows[1]];
 assert.equal(techniqueProgress(section(990),'gr1d',updated,{}).missing.length,25);
 assert.equal(techniqueProgress(section(990),'benamu',updated,{}).missing.length,29);
 assert.deepEqual(rows,original);
});
test('manual Whole Pack completion survives an older partial upload without inventing criteria',()=>{
 const states={'benamu:progression:166':{completed:true}};const old=structuredClone(states);
 const p=techniqueProgress(section(166),'benamu',[observation(166,'benamu',['minecraft:pale'])],states);
 assert.equal(p.siteDone,true);assert.equal(p.registered.length,1);assert.equal(p.missing.length,8);assert.deepEqual(states,old);
});
test('catalogs retain all required targets and practical routes; future upload can remove pending rows',()=>{
 for(const n of [14,46,155,166,990]){const d=section(n);const keys=d.rows.flatMap(r=>r.criteria);assert.deepEqual([...keys].sort(),[...d.criteria].sort());assert.ok(d.rows.every(r=>r.technique.length>30));}
 assert.equal(section(46).criteria.length,40);assert.equal(section(155).criteria.length,53);assert.equal(section(990).criteria.length,36);
 const d=section(155);const p=techniqueProgress(d,'gr1d',[observation(155,'gr1d',d.criteria,true)],{});assert.equal(p.missing.length,0);assert.equal(p.siteDone,false);
});
