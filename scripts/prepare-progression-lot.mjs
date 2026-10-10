import fs from 'node:fs';
import assert from 'node:assert/strict';
const lot = Number(process.argv[2]);
assert.ok([1,2,3].includes(lot));
const file = fs.readFileSync('data/content-snapshot.generated.ts','utf8');
const rows = JSON.parse(file.slice(file.indexOf('export const CONTENT_SNAPSHOT_ROWS = ') + 'export const CONTENT_SNAPSHOT_ROWS = '.length, file.lastIndexOf(' as const satisfies')));
const patch = JSON.parse(fs.readFileSync(`data/progression-lot-${lot}.json`));
const row = rows.find(x=>x.key==='page:progression');
const before = row.payload.items;
const byId = new Map(before.map(x=>[x.id,x]));
for (const item of patch) byId.set(item.id,item);
row.payload.items = [...byId.values()].sort((a,b)=>a.order-b.order);
assert.ok(before.every(x=>byId.has(x.id)), 'No IDs may be removed');
fs.writeFileSync('../progressao-helpers/content-next.json',JSON.stringify(rows,null,2));
const oldTotals = fs.readFileSync('lib/static-totals.ts','utf8');
const oldCount = oldTotals.match(/progression: (\d+)/)[1];
for (const file of ['.github/workflows/production-smoke.yml','.github/workflows/migration-final-acceptance.yml','.github/workflows/etapa2-visual-regression.yml']) {
 const text=fs.readFileSync(file,'utf8');
 fs.writeFileSync(file,text.replace(new RegExp(`\\b${oldCount}\\b`,'g'),String(row.payload.items.length)));
}
const totals = oldTotals.replace(/progression: \d+/,`progression: ${row.payload.items.length}`);
fs.writeFileSync('lib/static-totals.ts',totals);
console.log({lot,total:row.payload.items.length,subitems:row.payload.items.reduce((n,x)=>n+(x.subitens?.length??0),0)});
