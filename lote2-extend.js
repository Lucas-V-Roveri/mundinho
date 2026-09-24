import { guides, siteMeta } from './content.js';
import { lote2Part1 } from './lote2-part1.js';
import { lote2Part2 } from './lote2-part2.js';
import { lote2Part3 } from './lote2-part3.js';
import { lote2Part4 } from './lote2-part4.js';
import { lote2Part5 } from './lote2-part5.js';
import { lote2Part6 } from './lote2-part6.js';
import { lote2Part7 } from './lote2-part7.js';
import { lote2Part8 } from './lote2-part8.js';

const additions = [
  ...lote2Part1,
  ...lote2Part2,
  ...lote2Part3,
  ...lote2Part4,
  ...lote2Part5,
  ...lote2Part6,
  ...lote2Part7,
  ...lote2Part8,
];

if (!guides.some((guide) => guide.id === 'aether')) {
  guides.push(...additions);
}

siteMeta.lote = 'Lote 2 — Dimensões e chefes completo';
