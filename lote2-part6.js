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

export const lote2Part6=[
  guide({
    id:'cataclysm-remnant',title:'Ancient Remnant',subtitle:"L_Ender's Cataclysm · Cursed Pyramid",type:'chefe',color:'#b08a56',difficulty:'Muito difícil',risk:'Severo',phase:'Pós-jogo',equivalent:'pós-Dragão / endgame',complexity:'Complexa',confidence:'Média',
    intro:'Um boss dinossauro undead de 450 HP dentro da Cursed Pyramid. A localização é confirmada; o próprio wiki ainda marca a seção de spawn do boss como TBA, então este guia não inventa um item de invocação.',
    sections:[s('Onde encontrar',`<p>Procure a <strong>Cursed Pyramid</strong>. O Ancient Remnant é documentado como boss dessa estrutura.</p>`),s('Preparo',`<p>Netherite/diamante extremamente encantado, cura, ranged e mobilidade. É conteúdo Cataclysm endgame, e a arena/estrutura faz parte do custo de uma morte.</p>`),s('O que não vou inventar',`<div class="warning-block">O wiki do Cataclysm ainda mostra <strong>Spawn: TBA</strong> para Ancient Remnant. Até existir documentação melhor ou teste in-game, não vou afirmar um item/ritual exato para acordá-lo.</div>`) ],
    craftings:[noRecipe('Invocação do Ancient Remnant','A conferir in-game / documentação futura. Último recurso aplicado porque a própria fonte do boss ainda não documenta Spawn.')],
    checklist:ck(['remnant-pyramid','Encontrar a Cursed Pyramid','Pós-jogo'],['remnant-clear','Explorar a Pyramid e preparar retorno','Pós-jogo'],['remnant-spawn','Conferir in-game o gatilho de spawn/invocação','Pós-jogo'],['remnant-kill','Derrotar Ancient Remnant','Pós-jogo']),
    sources:[['Ancient Remnant',src.remnant],['Cataclysm bosses',src.cat]]
  }),
  guide({
    id:'cataclysm-leviathan',title:'The Leviathan',subtitle:"L_Ender's Cataclysm · Sunken City",type:'chefe',color:'#2f6670',difficulty:'Muito difícil',risk:'Severo',phase:'Pós-jogo',equivalent:'pós-Dragão / endgame',complexity:'Complexa',confidence:'Média',
    intro:'A linha aquática do Cataclysm. O Sunken City foi adicionado junto do Leviathan e funciona como palco da luta. O preparo muda: água, mobilidade e visão são parte do boss.',
    sections:[s('Onde começar',`<p>Localize a <strong>Sunken City</strong>. A relação estrutura → Leviathan é documentada pelo conteúdo oficial do Cataclysm.</p>`),s('Preparo',`<p>Netherite/diamante extremamente encantado, Water Breathing, Respiration/Aqua Affinity ou equivalente, ranged e cura. O boss é endgame e a recuperação acontece dentro de uma dungeon aquática.</p>`),s('Ordem',`<div class="soft-block">Trilha paralela depois do primeiro contato com Cataclysm. Não há dependência rígida confirmada que obrigue Leviathan antes/depois de Ender Guardian, Harbinger, Remnant ou Scylla.</div>`) ],
    craftings:[noRecipe('Linha do Leviathan','Sem receita central reproduzida: o foco é localizar Sunken City e vencer o boss. Itens específicos serão mostrados somente quando houver recipe data confiável para a versão do pack.')],
    checklist:ck(['lev-city','Encontrar Sunken City','Pós-jogo'],['lev-water','Preparar kit aquático','Pós-jogo'],['lev-kill','Derrotar The Leviathan','Pós-jogo']),
    sources:[['Bosses do Cataclysm',src.cat],['Cataclysm 1.13 — Leviathan + Sunken City','https://www.curseforge.com/minecraft/mc-mods/lendercataclysm/files/4637140']]
  }),
  guide({
    id:'cataclysm-scylla',title:'Scylla',subtitle:"L_Ender's Cataclysm · Acropolis",type:'chefe',color:'#5f6f8d',difficulty:'Muito difícil',risk:'Severo',phase:'Pós-jogo',equivalent:'pós-Dragão / endgame',complexity:'Complexa',confidence:'Média',
    intro:'Scylla é um dos oito bosses formais do Cataclysm e faz parte da linha endgame do pack. O guia fica conservador onde a documentação pública do wiki ainda é incompleta.',
    sections:[s('Onde começar',`<p>Procure a <strong>Acropolis</strong>, estrutura associada à linha da Scylla no conjunto de estruturas/bosses do Cataclysm.</p>`),s('Preparo',`<p>Netherite/diamante extremamente encantado, cura, ranged e backup gear. Como os demais bosses Cataclysm tardios, o custo de morrer não é só a luta: é voltar à estrutura.</p>`),s('Ordem',`<div class="soft-block">Trilha paralela. A planilha aprovada não estabelece ordem rígida entre Scylla e os outros bosses pós-jogo.</div>`) ],
    craftings:[noRecipe('Linha da Scylla','Nenhuma receita central afirmada sem recipe data da versão 3.33. O guia mantém localização/preparo e deixa crafting específico para dados confirmados.')],
    checklist:ck(['scylla-acropolis','Encontrar a Acropolis','Pós-jogo'],['scylla-ready','Preparar kit endgame + backup','Pós-jogo'],['scylla-kill','Derrotar Scylla','Pós-jogo']),
    sources:[['Cataclysm bosses',src.cat],['Cataclysm wiki', 'https://lendercataclysm.wiki.gg/']]
  })
];
