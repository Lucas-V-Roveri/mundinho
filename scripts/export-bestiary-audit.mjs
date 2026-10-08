import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const root = process.cwd();
const req = createRequire(import.meta.url);
const cache = new Map();
function load(spec) {
  let file = path.resolve(root, spec.replace(/^@\//, ''));
  if (!path.extname(file)) file += '.ts';
  if (cache.has(file)) return cache.get(file).exports;
  const source = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.json')) return JSON.parse(source);
  const loaded = { exports: {} };
  cache.set(file, loaded);
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
  new Function('require', 'module', 'exports', code)(id => id.startsWith('@/') ? load(id) : req(id), loaded, loaded.exports);
  return loaded.exports;
}
const entries = load('@/data/bestiary-catalog').BESTIARY_ENTRIES;
if (entries.length !== 431 || entries.some(e => !e.audit)) throw Error('Incomplete audit coverage');
const rows = entries.flatMap(e => e.audit.rows);
const fields = Object.keys(rows[0]);
const cell = value => `"${value.replaceAll('"', '""')}"`;
fs.writeFileSync('public/bestiary/auditoria/bestiario-431-cards.csv', '\ufeff' + [fields, ...rows.map(r => fields.map(f => r[f]))].map(r => r.map(cell).join(',')).join('\r\n') + '\r\n');
const groups = [...new Set(entries.map(e => e.mod))].map(mod => {
  const cards = entries.filter(e => e.mod === mod);
  return { mod, cards: cards.length, rows: cards.reduce((n, e) => n + e.audit.rows.length, 0), missingImages: cards.filter(e => !e.imageUrl).map(e => e.id), exceptions: cards.filter(e => e.audit.rows.some(r => Object.values(r).some(v => /exceção/i.test(v.replaceAll(/exceção criativa/gi, ""))))).map(e => e.id) };
});
const report = { cards: entries.length, rows: rows.length, groups, missingImages: groups.reduce((n, g) => n + g.missingImages.length, 0), cardsWithExceptions: groups.reduce((n, g) => n + g.exceptions.length, 0) };
fs.writeFileSync('public/bestiary/auditoria/integracao-431-cards.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report));
