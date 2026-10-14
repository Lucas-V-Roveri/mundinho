import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>JSON.parse(readFileSync(p,'utf8'));
const patch=read('data/destination-howto-2026-10-14.json');
const coverage=read('data/destination-guide-coverage-2026-10-14.json');
const items=patch['page:progression'].items;
const guides=Object.entries(patch).filter(([key])=>key.startsWith('guide:')).map(([,g])=>g);
test('all 36 destination/ritual links resolve to useful sections, not just guide headings',()=>{
 assert.equal(coverage.length,36);
 for(const row of coverage){
  const [guide,section]=guides.flatMap(g=>g.sections.filter(s=>s.id && row.guide===`/mods#guide-${g.id}-${s.id}`).map(s=>[g,s]))[0]??[];
  assert.ok(guide,row.id);assert.ok(section.body?.trim(),row.id);assert.ok(section.steps?.length>=2,row.id);assert.ok(section.list?.some(x=>x.startsWith('Levar:')),row.id);
  const sub=items.flatMap(i=>i.subitens??[]).find(s=>s.id===row.id);
  assert.ok(sub.guideLinks.some(l=>l.href===row.guide),row.id);
 }
});
test('same-guide crosslinks resolve and all generated anchors are unique',()=>{
 const ids=guides.flatMap(g=>g.sections.filter(s=>s.id).map(s=>`guide-${g.id}-${s.id}`));assert.equal(new Set(ids).size,ids.length);
 for(const g of guides)for(const s of g.sections)for(const l of s.links??[])if(l.href.startsWith('/mods#'))assert.ok(ids.includes(l.href.split('#')[1]),l.href);
});
test('Friends&Foes keeps all three existing IDs and distinguishes Nether access from soft preparation',()=>{
 const i=items.find(i=>i.order===190);assert.deepEqual(i.subitens.map(s=>s.id),['progression:190:iceologer','progression:190:illusioner','progression:190:wildfire']);
 assert.equal(i.subitens[2].phase,'Avançado');assert.equal(i.subitens[2].risk,'Alto');assert.ok(i.subitens[2].gate.includes('Nether'));assert.ok(!i.gate?.confirmed);
});
test('coverage does not create checklist steps, alter archived IDs or add vanilla milestones',()=>{
 const old=read('data/progression-destinations-2026-10-13.json');
 for(const i of old){const next=items.find(n=>n.id===i.id);assert.deepEqual(next.subitens.map(s=>s.id),i.subitens.map(s=>s.id));assert.deepEqual(next.archivedSubitems,i.archivedSubitems);}
 assert.equal(items.length,143);assert.equal(new Set(items.map(i=>i.id)).size,143);
});
