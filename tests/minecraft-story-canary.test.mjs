import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {MINECRAFT_STORY_CANARY} from '../data/minecraft-story-canary.ts';
import {MINECRAFT_CATEGORY_A} from '../data/minecraft-category-a.ts';
import {categoryASyncPlan,parseMinecraftProgressDocuments} from '../lib/minecraft-progress.ts';
const saves=JSON.parse(readFileSync(new URL('./fixtures/minecraft-story-canary.json',import.meta.url)));
const milestones=MINECRAFT_STORY_CANARY.map(r=>({id:r.milestoneId}));
const plan=data=>categoryASyncPlan(parseMinecraftProgressDocuments([{name:'save.json',data}],[]),MINECRAFT_STORY_CANARY,milestones);
test('only ten authorized story keys, unique IDs and exact native parent ordering',()=>{
 assert.equal(MINECRAFT_STORY_CANARY.length,10);
 assert.equal(new Set(milestones.map(m=>m.id)).size,10);
 assert.ok(MINECRAFT_STORY_CANARY.every(r=>r.confidence==='Alta' && r.enabled));
 assert.ok(MINECRAFT_STORY_CANARY.every(r=>!MINECRAFT_CATEGORY_A.some(a=>a.milestoneId===r.milestoneId)));
 for(const r of MINECRAFT_STORY_CANARY){const p=MINECRAFT_STORY_CANARY.find(a=>a.advancementId===r.parent);if(p)assert.ok(Number(p.milestoneId.split(':')[1])<Number(r.milestoneId.split(':')[1]));}
 assert.equal(MINECRAFT_STORY_CANARY.find(r=>r.advancementId.endsWith('/form_obsidian')).parent,'minecraft:story/lava_bucket');
 assert.ok(!MINECRAFT_STORY_CANARY.some(r=>r.advancementId.endsWith('/lava_bucket')));
});
test('both attached saves prove all ten separate matching milestones',()=>{for(const actor of ['gr1d','benamu']){const p=plan(saves[actor]);assert.equal(p.length,10);assert.deepEqual(p.flatMap(r=>r.completions).sort(),milestones.map(m=>m.id).sort());}});
test('done=false never completes even with all observed criteria; no parent inferred',()=>{const data=structuredClone(saves.gr1d);for(const value of Object.values(data))value.done=false;assert.deepEqual(plan(data).flatMap(r=>r.completions),[]);assert.deepEqual(plan({'minecraft:story/mine_diamond':saves.gr1d['minecraft:story/mine_diamond']}).flatMap(r=>r.completions),['progression:8']);});
test('armor alternatives show X/4 inside card; one criterion and done=true suffice',()=>{for(const key of ['obtain_armor','shiny_gear']){const r=MINECRAFT_STORY_CANARY.find(r=>r.advancementId.endsWith('/'+key));assert.equal(r.total,4);assert.equal(r.requirements.length,1);assert.equal(r.requirements[0].length,4);const p=plan({[r.advancementId]:{done:true,criteria:{[r.criteria[0]]:'2026-01-01 00:00:00 +0000'}}});assert.deepEqual(p[0].completions,[r.milestoneId]);assert.equal(Object.keys(p[0].criteria).length,1);}});
test('remaining category b/c keys cannot create observations or completions',()=>{assert.deepEqual(plan({'minecraft:adventure/root':{done:true},'minecraft:husbandry/root':{done:true},'minecraft:nether/root':{done:true},'cataclysm:root':{done:true}}),[]);});
