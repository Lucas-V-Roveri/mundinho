import test from 'node:test';
import assert from 'node:assert/strict';
import {findBestiaryHashTarget} from '../lib/bestiary-deep-link.ts';
const entries=[{id:'friendsfoes-wildfire',registryId:'friendsandfoes:wildfire'},{id:'graveyard-corrupted-champion',registryId:'graveyard:lich'}];
test('card and recipe hashes resolve to the exact creature, including encoded anchors',()=>{
 assert.equal(findBestiaryHashTarget(entries,'#mob-friendsfoes-wildfire'),entries[0]);
 assert.equal(findBestiaryHashTarget(entries,'#mob-graveyard-corrupted-champion-recipes'),entries[1]);
 assert.equal(findBestiaryHashTarget(entries,'#mob%2Dfriendsfoes-wildfire'),entries[0]);
});
test('unknown or malformed hashes cannot select a different creature or mutate entries',()=>{
 const before=JSON.stringify(entries);
 for(const hash of ['#mob-friendsfoes','%ZZ','#mob-friendsfoes-wildfire-other','#other'])assert.equal(findBestiaryHashTarget(entries,hash),undefined);
 assert.equal(JSON.stringify(entries),before);
});
