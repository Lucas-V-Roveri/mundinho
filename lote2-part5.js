const src = {
  aether:'https://aether.wiki.gg/wiki/The_Aether/The_Aether',
  bronze:'https://aether.wiki.gg/wiki/The_Aether/Bronze_Dungeon',
  slider:'https://aether.wiki.gg/wiki/The_Aether/Slider',
  queen:'https://aether.wiki.gg/wiki/The_Aether/Valkyrie_Queen',
  gold:'https://aether.wiki.gg/wiki/The_Aether/Gold_Dungeon',
  deep:'https://aether.wiki.gg/wiki/Deep_Aether',
  brass:'https://aether.wiki.gg/wiki/Deep_Aether/Brass_Dungeon',
  eots:'https://aether.wiki.gg/wiki/Deep_Aether/eots',
  under:'https://modrinth.com/mod/the-undergarden',
  bumble:'https://www.curseforge.com/minecraft/mc-mods/the-bumblezone-forge',
  bumbleItems:'https://github-wiki-see.page/m/TelepathicGrunt/Bumblezone/wiki/Items-%F0%9F%9B%A0%EF%B8%8F',
  bumbleStruct:'https://github-wiki-see.page/m/TelepathicGrunt/Bumblezone/wiki/Structures-%F0%9F%8F%B0',
  starlight:'https://modrinth.com/mod/eternal-starlight',
  deeper:'https://modrinth.com/mod/deeperdarker',
  deeperRel:'https://github.com/KyaniteMods/DeeperAndDarker/releases',
  grave:'https://github.com/finallion/The-Graveyard-FORGE',
  mowzie:'https://modrinth.com/mod/mowzies-mobs',
  bomd:'https://modrinth.com/mod/bosses-of-mass-destruction-forge',
  endrem:'https://github.com/Jack-Bagel/End-Remastered',
  endadd:'https://modrinth.com/mod/end-remastered-additions',
  nullscape:'https://www.curseforge.com/minecraft/mc-mods/nullscape',
  lost:'https://modrinth.com/mod/the-lost-castle',
  incendium:'https://www.curseforge.com/minecraft/mc-mods/incendium',
  caves:'https://alexscaves.wiki.gg/wiki/Alex%27s_Caves',
  caveBiomes:'https://alexscaves.wiki.gg/wiki/Biomes',
  lux:'https://alexscaves.wiki.gg/wiki/Luxtructosaurus',
  hull:'https://alexscaves.wiki.gg/wiki/Hullbreaker',
  cat:'https://lendercataclysm.wiki.gg/wiki/Bosses',
  monster:'https://lendercataclysm.wiki.gg/wiki/Netherite_Monstrosity',
  guardian:'https://lendercataclysm.wiki.gg/wiki/Ender_Guardian',
  factory:'https://lendercataclysm.wiki.gg/wiki/Ancient_Factory',
  remnant:'https://lendercataclysm.wiki.gg/wiki/Ancient_Remnant',
  integrated:'https://www.curseforge.com/minecraft/mc-mods/integrated-cataclysm',
  mowCat:'https://www.curseforge.com/minecraft/mc-mods/mowzies-cataclysm'
};
const s=(title,html)=>[title,html];
const ck=(...rows)=>rows;
const noRecipe=(title,body,confidence='Alta')=>({title,confidence,body});
const guide=(o)=>({craftings:[],sources:[],...o});

export const lote2Part5=[
  guide({
    id:'cataclysm-monstrosity',title:'Netherite Monstrosity',subtitle:"L_Ender's Cataclysm · Soul Forge",type:'chefe',color:'#7f4335',difficulty:'Muito difícil',risk:'Severo',phase:'Pós-jogo',equivalent:'pós-Dragão / endgame',complexity:'Complexa',confidence:'Alta',
    intro:'O próprio material do Cataclysm o trata como um dos primeiros bosses do mod, mas ainda pensado para depois do Ender Dragon. É um golem de 600 HP que usa lava como arma e como cura.',
    sections:[
      s('Onde começa',`<p>Encontre uma <strong>Soul Forge</strong>. Há um Netherite Monstrosity dormente no salão principal; ele acorda quando o jogador se aproxima.</p>`),
      s('O que preparar',`<p>Fire Resistance, buckets para remover lava, um ou dois shields, cura e ranged. Netherite ou diamante extremamente encantado é recomendação do nosso balanceamento.</p>`),
      s('Mecânicas',`<p>Slams, charge, bombas de lava, flame jets e earth wave. O detalhe mais importante é <strong>Regeneration</strong>: ele suga lava ao redor para recuperar vida. Aos 25% entra em fase 2/berserk e passa a incendiar nos ataques.</p>`),
      s('Drops úteis',`<p>Drop garantido: <strong>Infernal Forge</strong>, <strong>Monstrous Horn</strong> e 16–24 Lava Power Cells. O Infernal Forge também vira material para Void Forge via Mechanical Fusion Anvil.</p>`)
    ],
    craftings:[noRecipe('Void Forge','Uso confirmado: Infernal Forge + Void Core na Mechanical Fusion Anvil. É uma fusão especial, não grade de crafting comum.'),noRecipe('Infernal Forge','Drop garantido do Netherite Monstrosity; não craftado.')],
    checklist:ck(['nm-forge','Encontrar a Soul Forge','Pós-jogo'],['nm-ready','Preparar Fire Resistance + buckets + shields','Pós-jogo'],['nm-kill','Derrotar Netherite Monstrosity','Pós-jogo'],['nm-forge-drop','Guardar Infernal Forge e Monstrous Horn','Pós-jogo']),
    sources:[['Netherite Monstrosity',src.monster],['Bosses do Cataclysm',src.cat]]
  }),
  guide({
    id:'cataclysm-guardian',title:'Ender Guardian',subtitle:"L_Ender's Cataclysm · Ruined Citadel",type:'chefe',color:'#684b7d',difficulty:'Muito difícil',risk:'Severo',phase:'Pós-jogo',equivalent:'pós-Dragão / endgame',complexity:'Complexa',confidence:'Alta',
    intro:'Boss da Ruined Citadel. A luta começa ao se aproximar do Altar of Void no terceiro andar. O kit mistura runes, shulker bullets, tornado e ground slam.',
    sections:[s('Acesso',`<p>Explore a <strong>Ruined Citadel</strong> até o terceiro andar e se aproxime do <strong>Altar of Void</strong>. Esse é o gatilho documentado.</p>`),s('Mecânicas',`<p>333 HP. Void Runes pressionam o chão, Bullet Missiles aplicam Levitation e Ender Tornado prende o alvo. Abaixo de ~50% de vida, o Ground Slam entra na luta e o boss perde parte da armadura.</p>`),s('Preparo',`<p>Feather Falling/mobilidade, cura, ranged e espaço para recuperar de Levitation. Não empilhe todo o inventário perto de borda/void só porque o boss está dentro de uma estrutura.</p>`) ],
    craftings:[noRecipe('Gauntlet of Guard','Drop garantido do Ender Guardian; não é receita de crafting.')],
    checklist:ck(['eg-citadel','Encontrar/explorar Ruined Citadel','Pós-jogo'],['eg-altar','Chegar ao Altar of Void','Pós-jogo'],['eg-kill','Derrotar Ender Guardian','Pós-jogo'],['eg-drop','Guardar Gauntlet of Guard','Pós-jogo']),
    sources:[['Ender Guardian',src.guardian],['Bosses do Cataclysm',src.cat]]
  }),
  guide({
    id:'cataclysm-harbinger',title:'The Harbinger',subtitle:"L_Ender's Cataclysm · Ancient Factory",type:'chefe',color:'#5a595a',difficulty:'Muito difícil',risk:'Severo',phase:'Pós-jogo',equivalent:'pós-Dragão / endgame',complexity:'Complexa',confidence:'Alta',
    intro:'Uma fábrica enterrada, robôs e um Wither mecânico dormente. Este encontro recompensa preparação: localizar a estrutura com Eye of Mech e só acordar a máquina quando todo mundo estiver pronto.',
    sections:[s('Localização',`<p>A <strong>Ancient Factory</strong> gera rara e profunda no Overworld. O <strong>Eye of Mech</strong> pode localizar a estrutura.</p>`),s('Invocação',`<p>A fonte oficial confirma a estrutura/boss; fontes de dados da versão atual descrevem o Harbinger dormente. Para o ritual de despertar, use o comportamento documentado da versão: <strong>Nether Star</strong> no boss dormente. Prepare tudo antes de interagir.</p>`),s('Luta',`<p>Mísseis, lasers e pressão de arena. EMP blocks da Factory fazem parte do ambiente e podem ser usados de forma estratégica. Ranged forte, resistência a fogo/wither quando disponível e cura são preparo, não gate.</p>`),s('Loot',`<p>A linha do Harbinger entrega <strong>Witherite</strong>, base de armas e do Mechanical Fusion Anvil.</p>`) ],
    craftings:[{title:'Eye of Mech',confidence:'Média-alta',ingredients:['4 × Iron Ingot','4 × Redstone Block','1 × Eye of Ender'],body:'Ingredientes confirmados em documentação atual da Ancient Factory; grade simétrica não é reproduzida aqui sem recipe JSON oficial.'},noRecipe('Witherite','Block of Witherite pode ser decomposto em 9 Witherite Ingots. Uso como crafting material confirmado.')],
    checklist:ck(['harb-eye','Obter/usar Eye of Mech','Pós-jogo'],['harb-factory','Encontrar Ancient Factory','Pós-jogo'],['harb-clear','Limpar a Factory e entender EMPs','Pós-jogo'],['harb-star','Levar Nether Star e preparar a arena','Pós-jogo'],['harb-kill','Derrotar The Harbinger','Pós-jogo']),
    sources:[['Ancient Factory',src.factory],['Cataclysm bosses',src.cat],['Integrated Cataclysm',src.integrated]]
  })
];
