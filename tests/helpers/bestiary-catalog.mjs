import fs from 'node:fs';
import path from 'node:path';
import cp from 'node:child_process';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const loadPackage = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const CANARY_REF = '0b01cddb7fbcbcb9cecabf7a54754eb79ed98ad5';
export function catalog(ref = null) {
  const cache = new Map();
  function load(spec) {
    let file = path.resolve(root, spec.replace(/^@\//, ''));
    if (!path.extname(file)) file += '.ts';
    if (cache.has(file)) return cache.get(file).exports;
    const relative = path.relative(root, file);
    const text = ref ? cp.execFileSync('git', ['show', `${ref}:${relative}`], { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }) : fs.readFileSync(file, 'utf8');
    if (file.endsWith('.json')) return JSON.parse(text);
    const loaded = { exports: {} }; cache.set(file, loaded);
    const js = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
    new Function('require', 'module', 'exports', js)((id) => id.startsWith('@/') ? load(id) : loadPackage(id), loaded, loaded.exports);
    return loaded.exports;
  }
  return load('@/data/bestiary-catalog').BESTIARY_ENTRIES;
}
