import { guides, siteMeta } from './content.js';
import { lote3Part1 } from './lote3-part1.js';
import { lote3Part2 } from './lote3-part2.js';
import { lote3Part3 } from './lote3-part3.js';
import { lote3Part4 } from './lote3-part4.js';

const additions = [...lote3Part1, ...lote3Part2, ...lote3Part3, ...lote3Part4];

if (!guides.some((guide) => guide.id === 'camp-rest')) {
  guides.push(...additions);
}

siteMeta.lote = 'Lote 3 — Utilidade, sobrevivência, decoração e automação';
