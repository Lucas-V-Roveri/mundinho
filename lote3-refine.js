import { guides } from './content.js';

const byId = (id) => guides.find((guide) => guide.id === id);

const create = byId('create');
if (create) {
  create.craftings = [
    {
      title:'Andesite Alloy', confidence:'Alta', result:'1 × Andesite Alloy',
      grid:['Iron Nugget','Andesite','', 'Andesite','Iron Nugget','', '','',''],
      body:'Receita shaped atual da branch mc1.21.1 do Create: padrão BA / AB. Há alternativa equivalente com Zinc Nugget. Também existe mixing de 1 Andesite + 1 Iron Nugget (ou Zinc Nugget) → 1 Alloy.'
    },
    {
      title:'Water Wheel', confidence:'Alta', result:'1 × Water Wheel',
      grid:['Plank','Plank','Plank','Plank','Shaft','Plank','Plank','Plank','Plank'],
      body:'Receita confirmada no data generator mc1.21.1.'
    },
    {
      title:'Mechanical Press', confidence:'Alta', result:'1 × Mechanical Press',
      grid:['','Shaft','', '','Andesite Casing','', '','Iron Block',''],
      body:'Receita vertical confirmada no data generator mc1.21.1. Guias antigos mostram receitas de versões anteriores; esta página usa a branch da versão alvo.'
    },
    {
      title:'Brass Ingot', confidence:'Alta', result:'2 × Brass Ingot',
      ingredients:['1 × Copper Ingot','1 × Zinc Ingot'],
      body:'Heated Mixing. Requer a receita em Mixer/Basin sob condição HEATED.'
    },
    {
      title:'Precision Mechanism', confidence:'Alta', result:'Precision Mechanism',
      ingredients:['Base: 1 × Golden Sheet','Por loop: 1 × Cogwheel','Por loop: 1 × Large Cogwheel','Por loop: 1 × Iron Nugget','5 loops de Sequenced Assembly'],
      body:'A versão mc1.21.1 confirma cinco ciclos nessa ordem de deployers. Não é crafting 3×3.'
    }
  ];
  create.sources = [
    ['Create — recipes mc1.21.1','https://github.com/Creators-of-Create/Create/blob/mc1.21.1/dev/src/main/java/com/simibubi/create/foundation/data/recipe/CreateStandardRecipeGen.java'],
    ['Create — mixing mc1.21.1','https://github.com/Creators-of-Create/Create/blob/mc1.21.1/dev/src/main/java/com/simibubi/create/foundation/data/recipe/CreateMixingRecipeGen.java'],
    ['Create — Sequenced Assembly mc1.21.1','https://github.com/Creators-of-Create/Create/blob/mc1.21.1/dev/src/main/java/com/simibubi/create/foundation/data/recipe/CreateSequencedAssemblyRecipeGen.java']
  ];
}

const waystones = byId('waystones');
if (waystones) {
  waystones.craftings.unshift({
    title:'Warp Stone', confidence:'Alta', result:'1 × Warp Stone',
    grid:['Amethyst Shard','Ender Pearl','Amethyst Shard','Ender Pearl','Emerald','Ender Pearl','Amethyst Shard','Ender Pearl','Amethyst Shard'],
    body:'Recipe data atual do projeto Waystones: padrão DED / EGE / DED.'
  });
  waystones.sources.unshift(['Waystones — recipe data do Warp Stone','https://github.com/TwelveIterationMods/docs/blob/main/src/content/recipes/mc/waystones/warp_stone.json']);
}

const supplementaries = byId('supplementaries');
if (supplementaries) {
  supplementaries.craftings.unshift({
    title:'Flax Block', confidence:'Alta', result:'1 × Flax Block',
    grid:Array(9).fill('Flax'),
    body:'Receita 3×3 confirmada na branch 1.21.1. A feature é condicionada à flag flax_block do Supplementaries.'
  });
  supplementaries.sources.unshift(['Supplementaries — Flax Block 1.21.1','https://github.com/MehVahdJukaar/Supplementaries/blob/1.21.1/common/src/main/resources/data/supplementaries/recipe/flax_block.json']);
}

const cozinha = byId('cozinha');
if (cozinha) {
  cozinha.craftings.unshift({
    title:'Fried Rice — Cooking Pot', confidence:'Alta', result:'1 × Fried Rice',
    ingredients:['1 × Rice crop','1 × Egg','1 × Carrot','1 × Onion'],
    body:'Receita de Cooking Pot confirmada no generated recipe data 1.21 do Farmer’s Delight; rende também 1.0 XP.'
  });
  cozinha.sources.unshift(['Farmer’s Delight — Fried Rice recipe data','https://github.com/vectorwing/FarmersDelight/blob/1.21/src/generated/resources/data/farmersdelight/recipe/cooking/fried_rice.json']);
}
