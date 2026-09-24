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

export const lote2Part1=[
  guide({
    id:'aether',title:'The Aether',subtitle:'dimensão · dungeons Bronze, Silver e Gold',type:'dimensão',color:'#91b9d9',difficulty:'Moderada → Difícil',risk:'Alto',phase:'Intermediário → Avançado',equivalent:'Nether-pré-Fortress → pré-Ender Dragon',complexity:'Moderada',confidence:'Alta',
    intro:'A entrada é simples; o perigo é achar que ilhas flutuantes também são simples. O Aether base tem três grandes dungeons e três bosses com mecânicas bem diferentes. A ordem abaixo é a curva sugerida do nosso pack; quando não existe gate rígido documentado, eu deixo isso explícito.',
    sections:[
      s('Como entrar',`<p><strong>Obrigatório:</strong> frame de <strong>Glowstone</strong> e água para ativar o portal. Glowstone é o gate material; ir ao Nether é a fonte padrão, não uma dependência lógica única.</p><div class="soft-block"><strong>Recomendado:</strong> ferro completo, escudo, comida, blocos e uma forma de lidar com quedas. O maior “mob” da primeira visita é o vazio.</div>`),
      s('Antes de sair',`<ul><li>Comida e blocos em quantidade.</li><li>Arco ou outra opção de alcance.</li><li>Pickaxe boa + uma reserva para o Slider.</li><li>Marcador/waypoint no portal.</li><li>Inventário com espaço: as dungeons têm chaves e loot próprio.</li></ul>`),
      s('Progressão sugerida',`<h4>1. Bronze Dungeon → Slider</h4><p>Primeiro grande boss sugerido. O Slider só recebe dano de <strong>pickaxe</strong>; não é uma luta para descobrir isso depois de gastar a durabilidade de três espadas.</p><p><strong>Risco:</strong> Alto · <strong>Fase:</strong> Intermediário.</p><h4>2. Silver Dungeon → Valkyrie Queen</h4><p>Para iniciar a luta, ofereça <strong>10 Victory Medals</strong> à Queen. A dungeon e a luta são mais longas; diamante é o ponto confortável.</p><h4>3. Gold Dungeon → Sun Spirit</h4><p>Boss de mecânica, não só DPS. Vá com cura e pronto para usar a mecânica de cristais em vez de insistir em dano bruto.</p><div class="note-block">Bronze → Silver → Gold é a ordem sugerida para a curva de dificuldade. Não estou transformando isso em gate rígido entre dungeons sem evidência de bloqueio.</div>`),
      s('Para não perder o inventário',`<div class="warning-block">Queda no vazio é a punição mais cara da dimensão. Em ponte, dungeon alta ou fuga de boss, blocos e posicionamento valem mais do que alguns pontos extras de dano.</div>`)
    ],
    craftings:[
      noRecipe('Portal do Aether','Não é crafting de bancada. Frame de Glowstone + água como ativador. Confiança alta para acesso; dimensões do frame seguem o formato padrão de portal.'),
      noRecipe('Bronze Key','Drop do Slider. Usada no treasure chest da Bronze Dungeon; não é item de crafting.'),
      noRecipe('Silver Key','Drop da Valkyrie Queen. Abre o treasure chest da Silver Dungeon; não é item de crafting.'),
      noRecipe('Gold Key','Recompensa da linha do Sun Spirit/Gold Dungeon. Trate como chave de dungeon, não como receita.')
    ],
    checklist:ck(['aether-portal','Construir e ativar o portal do Aether','Intermediário'],['aether-safe-entry','Marcar o portal e fazer uma primeira volta segura','Intermediário'],['aether-bronze','Encontrar uma Bronze Dungeon','Intermediário'],['aether-slider','Derrotar o Slider usando pickaxe','Intermediário'],['aether-silver','Encontrar uma Silver Dungeon','Avançado'],['aether-medals','Reunir 10 Victory Medals','Avançado'],['aether-queen','Derrotar a Valkyrie Queen','Avançado'],['aether-gold','Encontrar uma Gold Dungeon','Avançado'],['aether-sun','Derrotar o Sun Spirit','Avançado'],['aether-loot','Abrir os três treasure chests de dungeon','Avançado']),
    sources:[['Aether Project Wiki',src.aether],['Bronze Dungeon',src.bronze],['Slider',src.slider],['Valkyrie Queen',src.queen],['Gold Dungeon',src.gold]]
  }),
  guide({
    id:'deep-aether',title:'Deep Aether',subtitle:'expansão do Aether · Brass Dungeon',type:'dimensão / expansão',color:'#6ea7c4',difficulty:'Difícil',risk:'Severo',phase:'Pós-jogo',equivalent:'pós-Dragão / endgame',complexity:'Complexa',confidence:'Média',
    intro:'No pack, Deep Aether é continuação do Aether, não uma dimensão separada que precisa ser “zerada” antes de todo o resto. A curva aprovada coloca o Brass Dungeon e o Eye of the Storm depois dos bosses base como recomendação de balanceamento, sem inventar um gate duro que não foi confirmado.',
    sections:[
      s('Quando começar',`<p><strong>Obrigatório:</strong> acesso ao Aether e encontrar o conteúdo do Deep Aether.</p><div class="soft-block"><strong>Recomendado:</strong> concluir Slider, Valkyrie Queen e Sun Spirit antes. Isso é curva de dificuldade, não requisito mecânico confirmado.</div>`),
      s('Brass Dungeon',`<p>A Brass Dungeon é uma estrutura aberta em torno de um grande pátio. O centro abriga o <strong>Eye of the Storm</strong>. Há blocos locked/trapped e uma treasure area própria.</p>`),
      s('Eye of the Storm',`<p>O boss tem <strong>400 HP</strong> e fica dormente até ser <strong>interagido</strong>. O corpo é segmentado: destruir segmentos pode separar partes em entidades menores, então a luta muda conforme você desmonta o boss.</p><p>Ao morrer, ele entrega <strong>1 Brass Key</strong>, usada para abrir o treasure chest da dungeon.</p>`),
      s('Para não perder o inventário',`<div class="warning-block">É uma luta aérea/aberta dentro de uma dimensão de ilhas. Leve recuperação de queda e não comece o boss com o inventário já cheio de loot da Aether base.</div>`)
    ],
    craftings:[noRecipe('Brass Key','Drop garantido do Eye of the Storm; é consumida ao abrir o treasure chest da Brass Dungeon. Sem receita.')],
    checklist:ck(['deep-find','Encontrar uma Brass Dungeon','Pós-jogo'],['deep-clear','Explorar a Brass Dungeon antes de iniciar o boss','Pós-jogo'],['deep-eots','Derrotar o Eye of the Storm','Pós-jogo'],['deep-key','Usar a Brass Key no treasure chest','Pós-jogo']),
    sources:[['Deep Aether',src.deep],['Brass Dungeon',src.brass],['Eye of the Storm',src.eots]]
  }),
  guide({
    id:'undergarden',title:'The Undergarden',subtitle:'dimensão subterrânea · Catacombs',type:'dimensão',color:'#6f7551',difficulty:'Difícil',risk:'Alto',phase:'Intermediário → Avançado',equivalent:'pré-Ender Dragon',complexity:'Moderada',confidence:'Média',
    intro:'O Undergarden é escuro, vertical e feito para exploração longa. A prioridade é estabelecer um portal seguro, aprender os materiais locais e só depois transformar a visita em uma expedição às Catacombs.',
    sections:[
      s('Como entrar',`<p><strong>Obrigatório:</strong> criar um <strong>Catalyst</strong>, montar um frame no formato de portal com <strong>Stone Bricks ou Deepslate Bricks</strong> e usar o Catalyst na parte interna inferior.</p><div class="soft-block">Diamante completo é recomendação prática, não tier mecânico do portal.</div>`),
      s('Primeira incursão',`<p>Entre, confirme a rota de retorno e marque o portal antes de explorar. A vegetação não depende de luz e a dimensão possui fauna própria + Rotspawn; perder direção pesa mais que uma luta isolada.</p>`),
      s('Materiais locais',`<p>A progressão de recursos do pack passa por <strong>Cloggrum, Froststeel, Utherium e Regalium</strong>. Trate como trilha flexível: melhore equipamento conforme encontra os materiais, em vez de inventar uma fila rígida.</p>`),
      s('Catacombs → Forgotten Guardian',`<p>Conteúdo mais perigoso da dimensão. Vá de diamante encantado ou gear local equivalente, limpe as salas e não dependa só de ranged. A Catacomb é o ponto em que o Undergarden deixa de ser passeio esquisito e vira dungeon de verdade.</p>`),
      s('Para não perder o inventário',`<div class="warning-block">Antes de aprofundar, garanta que os dois sabem voltar ao portal. Waypoint, blocos de marcação e um kit de emergência perto da entrada economizam uma expedição de resgate bem pouco romântica.</div>`)
    ],
    craftings:[
      {title:'Catalyst',confidence:'Média-alta',ingredients:['Gold Ingot','Iron Ingot','Diamond'],body:'Ingredientes confirmados em documentação comunitária + página oficial confirma que o Catalyst é craftado e ativa o portal. A disposição exata da grade não é reproduzida sem fonte equivalente.'},
      noRecipe('Portal do Undergarden','Frame de Stone Bricks ou Deepslate Bricks + Catalyst. Não é receita de bancada.')
    ],
    checklist:ck(['under-catalyst','Criar um Catalyst','Intermediário'],['under-portal','Montar e ativar o portal','Intermediário'],['under-safe','Fazer a primeira incursão e marcar retorno','Intermediário'],['under-cloggrum','Obter Cloggrum','Avançado'],['under-froststeel','Obter Froststeel','Avançado'],['under-utherium','Obter Utherium','Avançado'],['under-regalium','Obter Regalium','Avançado'],['under-catacombs','Encontrar as Catacombs','Avançado'],['under-guardian','Derrotar o Forgotten Guardian','Avançado']),
    sources:[['The Undergarden — Modrinth',src.under],['Catalyst — referência de receita','https://the-undergarden-mod.fandom.com/wiki/Catalyst']]
  })
];
