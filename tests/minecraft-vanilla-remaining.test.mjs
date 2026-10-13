import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {MINECRAFT_VANILLA_REMAINING as rules} from '../data/minecraft-vanilla-remaining.ts';
import {MINECRAFT_STORY_CANARY} from '../data/minecraft-story-canary.ts';
import {MINECRAFT_CATEGORY_A} from '../data/minecraft-category-a.ts';
import {categoryASyncPlan,parseMinecraftProgressDocuments,validateMinecraftImportActor} from '../lib/minecraft-progress.ts';
const items=JSON.parse(readFileSync('data/progression-vanilla-remaining.json'));
const plan=data=>categoryASyncPlan(parseMinecraftProgressDocuments([{name:'synthetic.json',data}],[]),rules,items);
const stamp='2026-01-01 00:00:00 +0000';
test('16 independent milestones, 18 signals, no collision with either approved canary',()=>{
 assert.equal(items.length,16);assert.equal(rules.length,18);
 assert.equal(new Set(items.map(x=>x.id)).size,16);
 for(const r of rules){assert.ok(r.enabled);assert.equal(r.confidence,'Alta');assert.ok(items.some(i=>i.id===r.milestoneId));assert.ok(![...MINECRAFT_STORY_CANARY,...MINECRAFT_CATEGORY_A].some(a=>a.advancementId===r.advancementId));}
 assert.ok(items.every(i=>!(i.subitens?.length)&&!i.gate.confirmed));
});
test('opening roots never finish first victory or complete diet',()=>{
 const p=plan({'minecraft:adventure/root':{done:true,criteria:{killed_by_something:stamp}},'minecraft:husbandry/root':{done:true,criteria:{consumed_item:stamp}}});
 assert.equal(p.length,2);assert.deepEqual(p.flatMap(r=>r.completions),[]);
});
test('partial multi-criterion advancement stays one counter and never completes with done=false',()=>{
 for(const [name,total] of [['adventure/adventuring_time',53],['adventure/kill_all_mobs',36],['husbandry/balanced_diet',40],['husbandry/whole_pack',9]]){
  const r=rules.find(x=>x.advancementId==='minecraft:'+name);assert.equal(r.total,total);assert.equal(r.requirements.length,total);
  const data={['minecraft:'+name]:{done:false,criteria:Object.fromEntries(r.criteria.map(c=>[c,stamp]))}};
  assert.deepEqual(plan(data)[0].completions,[]);
  data['minecraft:'+name].done=true;assert.deepEqual(plan(data)[0].completions,[r.milestoneId]);
 }
});
test('archaeology preserves two AND groups and alternative locations; parent is not inferred',()=>{
 const r=rules.find(x=>x.advancementId==='minecraft:adventure/salvage_sherd');assert.equal(r.total,7);assert.equal(r.requirements.length,2);
 assert.deepEqual(plan({[r.advancementId]:{done:false,criteria:{has_sherd:stamp}}})[0].completions,[]);
 const valid=Object.fromEntries(r.requirements.map(g=>[g[0],stamp]));
 assert.deepEqual(plan({[r.advancementId]:{done:true,criteria:valid}}).flatMap(r=>r.completions),[r.milestoneId]);
});
test('native parent order is respected where both objectives are in this lot',()=>{
 for(const r of rules.filter(x=>x.kind==='milestone')){const parent=rules.find(p=>p.advancementId===r.parent&&p.kind==='milestone');if(parent)assert.ok(Number(parent.milestoneId.split(':')[1])<Number(r.milestoneId.split(':')[1]));}
});
test('recipe and category c entries do not enter the plan; actor binding still rejects wrong save',()=>{
 assert.deepEqual(plan({'minecraft:recipes/tools/iron_pickaxe':{done:true},'cataclysm:root':{done:true}}),[]);
 assert.throws(()=>validateMinecraftImportActor(['f6b62653-46b8-4328-b701-ec6a178f2718.json'],'gr1d'),/benamu/);
});
