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

export const lote2Part2=[
  guide({
    id:'bumblezone',title:'The Bumblezone',subtitle:'dimensão · Bee Queen · Sempiternal Sanctum',type:'dimensão',color:'#d4a83d',difficulty:'Moderada → Muito difícil',risk:'Severo',phase:'Intermediário → Pós-jogo',equivalent:'Nether-pré-Fortress → endgame',complexity:'Moderada → Complexa',confidence:'Alta',
    intro:'A Bumblezone começa fofa e termina em estrutura endgame. O gate mais importante não é armadura: é a linha de progressão da Bee Queen e o Essence of the Bees.',
    sections:[
      s('Como entrar e sair',`<p>Jogue uma <strong>Ender Pearl</strong> em qualquer Bee Nest/Beehive para entrar. Também é possível empurrar jogador/mob para dentro com piston.</p><p>Para sair, atravesse os limites verticais da dimensão: abaixo de Y=0 ou acima de Y=256; o mod tenta devolver vocês ao ponto original.</p>`),
      s('Bee Queen → Queen’s Desire',`<p>Encontre uma <strong>Throne Pillar</strong> e negocie com a Bee Queen. A primeira troca libera a linha <strong>The Queen’s Desires</strong>. Cada objetivo rende Royal Jelly Bottle; completar toda a linha entrega o <strong>Essence of the Bees</strong>.</p>`),
      s('Essence of the Bees',`<p>Consuma o item. O bônus é permanente e libera interações seguras importantes: Cell Maze sem Wrath of the Hive, Throne Pillar sem Mining Fatigue perto da Queen, coleta de certos honey blocks e outras permissões da dimensão.</p>`),
      s('Sempiternal Sanctum',`<p>É conteúdo endgame. O próprio guia do mod recomenda entrar somente depois de completar Queen’s Desire e consumir a Essence. Sem isso, o jogador recebe Mining Fatigue fortíssima, mais dano de Sentry Watchers e não dispara os eventos de coração da estrutura.</p>`),
      s('Para não perder o inventário',`<div class="warning-block">Não transforme a colmeia em inimiga cedo. Evite roubo/agressão até entender Wrath of the Hive e deixe o Sanctum para depois da Essence.</div>`)
    ],
    craftings:[
      noRecipe('Entrada na Bumblezone','Não é crafting: Ender Pearl em Bee Nest/Beehive. Confiança alta.'),
      noRecipe('Essence of the Bees','Recompensa por completar toda a linha The Queen’s Desires; não é receita de bancada.'),
      noRecipe('Royal Jelly Bottle','Recompensa dos objetivos de Queen’s Desire; não é tratada como crafting no guia.')
    ],
    checklist:ck(['bee-enter','Entrar na Bumblezone com Ender Pearl','Intermediário'],['bee-exit','Testar uma saída segura e entender o retorno','Intermediário'],['bee-throne','Encontrar uma Throne Pillar','Avançado'],['bee-trade','Fazer a primeira troca com a Bee Queen','Avançado'],['bee-desires','Completar The Queen’s Desires','Avançado'],['bee-essence','Consumir Essence of the Bees','Avançado'],['bee-sanctum','Encontrar um Sempiternal Sanctum','Pós-jogo'],['bee-heart','Completar os eventos do coração do Sanctum','Pós-jogo']),
    sources:[['Bumblezone — acesso/saída',src.bumble],['Itens / Essence of the Bees',src.bumbleItems],['Estruturas / Sempiternal Sanctum',src.bumbleStruct]]
  }),
  guide({
    id:'eternal-starlight',title:'Eternal Starlight',subtitle:'dimensão · Gatekeeper · bosses internos',type:'dimensão',color:'#756aa8',difficulty:'Difícil',risk:'Severo',phase:'Avançado → Pós-jogo',equivalent:'pré-Ender Dragon → endgame',complexity:'Complexa',confidence:'Média-alta',
    intro:'A jornada começa no Overworld: encontrar Starlight Portal Ruins e vencer o Gatekeeper. Depois disso, os bosses internos são localizados com Seeking Eye e pistas do Glimmering Tablet. A ordem rígida entre eles não foi assumida.',
    sections:[
      s('Gate de entrada',`<p>Encontre <strong>Starlight Portal Ruins</strong> e enfrente <strong>The Gatekeeper</strong>. Este é o gate real de acesso da dimensão.</p><div class="soft-block">Diamante e ranged são recomendados. O portal depois é reutilizável, então vale montar staging perto da ruína.</div>`),
      s('Como localizar os bosses',`<p>Use o <strong>Seeking Eye</strong> para localizar bosses e siga as instruções do <strong>Glimmering Tablet</strong>. Não vou substituir esse sistema por coordenadas ou uma sequência inventada.</p>`),
      s('Lunar Monstrosity — Cursed Garden',`<p>Boss de pós-jogo. A recomendação aprovada é entrar com diamante encantado, cura e recurso de fogo/controle. Ordem rígida em relação aos outros bosses: <strong>não confirmada</strong>.</p>`),
      s('Starlight Golem — Golem Forge',`<p>Boss com componente de puzzle. O objetivo é entender/desligar as fontes de energia para criar janela de dano; bater na armadura fora da janela só transforma recursos em barulho.</p>`),
      s('Tangled Hatred e encontros secundários',`<p>Existem encontros secundários e minibosses, mas a fonte consultada não estabelece uma campanha linear completa. Eles ficam como <strong>trilha paralela</strong>.</p><div class="warning-block">Detalhes finos de alguns secundários: confiança baixa-conferir. Não virarão gate até haver evidência/in-game.</div>`)
    ],
    craftings:[
      noRecipe('Seeking Eye','Ferramenta oficial para localizar bosses. A função está confirmada; receita exata não foi reproduzida sem dados suficientes da versão 0.9.0.'),
      noRecipe('Glimmering Tablet','Fonte de pistas para os encontros. Uso confirmado; receita não afirmada.'),
      noRecipe('Portal de Starlight','É desbloqueado via Portal Ruins + Gatekeeper; não é tratado como craft livre no guia.')
    ],
    checklist:ck(['star-ruins','Encontrar Starlight Portal Ruins','Avançado'],['star-gatekeeper','Derrotar The Gatekeeper','Avançado'],['star-enter','Entrar na dimensão Starlight','Avançado'],['star-seeking','Obter/usar o Seeking Eye','Avançado'],['star-lunar','Derrotar Lunar Monstrosity','Pós-jogo'],['star-golem','Derrotar Starlight Golem','Pós-jogo'],['star-secondary','Completar pelo menos um encontro secundário documentado','Pós-jogo']),
    sources:[['Eternal Starlight — Modrinth',src.starlight],['Eternal Starlight — CurseForge','https://www.curseforge.com/minecraft/mc-mods/eternal-starlight']]
  }),
  guide({
    id:'deeper-darker',title:'Deeper and Darker',subtitle:'Ancient City → Otherside → Ancient Temple',type:'dimensão',color:'#31566b',difficulty:'Muito difícil',risk:'Severo',phase:'Avançado → Pós-jogo',equivalent:'pós-Dragão / endgame',complexity:'Complexa',confidence:'Alta',
    intro:'No nosso pack, a porta do Otherside é uma recompensa de encarar o Deep Dark de verdade: Ancient City, Warden, Heart of the Deep e só então o portal. O Stalker vem depois, dentro do conteúdo próprio da dimensão.',
    sections:[
      s('Gate: Warden → Heart of the Deep',`<p><strong>Obrigatório na progressão aprovada:</strong> localizar Ancient City, derrotar o Warden e obter <strong>Heart of the Deep</strong>.</p><div class="warning-block">Não existe “tier que trivializa Warden”. Netherite/diamante encantado, lã, cura e rota de fuga são preparação; a mecânica de stealth continua valendo.</div>`),
      s('Ativar o portal e entrar no Otherside',`<p>Use o Heart of the Deep no portal da Ancient City e faça a primeira travessia. Marque retorno, leve blocos e não transforme a estreia em expedição longa.</p>`),
      s('Ancient Temple → Stalker',`<p>Use a exploração da dimensão para encontrar o <strong>Ancient Temple</strong>. A versão 1.4.x também reforça ferramentas de localização como Ancient Compass/Heart behavior. O Stalker é o encontro interno mais perigoso desta linha.</p>`),
      s('Materiais úteis',`<p>Resonarium entra numa cadeia própria de equipamentos. Na linha 1.21.x, <strong>4 Resonarium + 4 Scutes</strong> formam Resonarium Plates, usadas para upgrade de equipamentos de ferro na Smithing Table.</p>`),
      s('Para não perder o inventário',`<div class="warning-block">Faça duas viagens: uma para abrir/validar o portal, outra para explorar. Warden + dimensão nova + inventário cheio é uma combinação que não precisa acontecer no mesmo dia.</div>`)
    ],
    craftings:[
      noRecipe('Heart of the Deep','Drop do Warden nesta linha do mod/pack e chave para o portal. Não é crafting.'),
      {title:'Resonarium Plate',confidence:'Alta',ingredients:['4 × Resonarium','4 × Scute'],body:'Ingredientes confirmados nas notas de release 1.21.x. A disposição exata não é reproduzida aqui.'},
      noRecipe('Sonorous Staff','Craftado usando Heart of the Deep, Soul Crystals e Bones; ingredientes-categoria confirmados nas release notes, mas quantidades/grade não reproduzidas sem recipe JSON.')
    ],
    checklist:ck(['dd-city','Localizar uma Ancient City','Avançado'],['dd-warden','Derrotar o Warden','Avançado'],['dd-heart','Obter Heart of the Deep','Avançado'],['dd-portal','Ativar o portal da Ancient City','Avançado'],['dd-otherside','Entrar no Otherside e garantir retorno','Avançado'],['dd-temple','Encontrar um Ancient Temple','Pós-jogo'],['dd-stalker','Enfrentar e derrotar o Stalker','Pós-jogo']),
    sources:[['Deeper and Darker',src.deeper],['Release notes',src.deeperRel]]
  })
];
