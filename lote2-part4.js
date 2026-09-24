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

export const lote2Part4=[
  guide({
    id:'alex-caves',title:"Alex's Caves",subtitle:'6 biomas raros · conteúdo extremo do Overworld',type:'exploração / chefes',color:'#657769',difficulty:'Difícil → Extremo',risk:'Severo',phase:'Intermediário → Pós-jogo',equivalent:'pré-Ender Dragon → endgame',complexity:'Complexa',confidence:'Alta',
    intro:'Alex’s Caves não é uma dimensão: são seis biomas de caverna raros no Overworld, cada um com perigos e ecossistema próprios. A entrada correta é usar o sistema Cave Tablet/Cave Codex e tratar os biomas como trilhas paralelas.',
    sections:[
      s('Descoberta: Cave Tablets → Cave Codex',`<p>Antes de “cavar aleatoriamente até achar”, use o sistema de descoberta do mod. Cave Tablets e Cave Codex existem justamente para localizar/indicar os biomas raros.</p>`),
      s('Seis biomas — ordem paralela',`<p><strong>Magnetic Caves:</strong> médio, ótimo primeiro contato.</p><p><strong>Primordial Caves:</strong> alto; abriga a linha do Luxtructosaurus.</p><p><strong>Toxic Caves:</strong> alto; ácido/radiação mudam o preparo.</p><p><strong>Abyssal Chasm:</strong> severo; ambiente aquático + Hullbreaker.</p><p><strong>Forlorn Hollows:</strong> alto; controle de luz e emboscada.</p><p><strong>Candy Cavity:</strong> alto; inclui Licowitch Tower.</p><div class="soft-block">Sem gate entre biomas: trilha paralela — ordem indiferente, escolhida pelo preparo e mapa encontrado.</div>`),
      s('Luxtructosaurus — Primordial Caves',`<p>Boss de <strong>600 HP</strong>. A ativação confirmada usa <strong>Ominous Catalyst no Volcanic Core</strong>. É conteúdo de pós-jogo: Netherite ou diamante fortemente encantado, fire resistance, ranged e arena preparada.</p>`),
      s('Hullbreaker — Abyssal Chasm',`<p>Não é boss formal; é criatura extrema. É atraído/interessado por alvos muito luminosos, incluindo iluminação de submarino. Respiração aquática e mobilidade importam mais que “armor check”.</p>`),
      s('Toxic / Forlorn / Candy',`<p><strong>Brainiac/Tremorzilla:</strong> trate como conteúdo extremo do Toxic Caves; não rotular como bosses formais quando a fonte não o faz. <strong>Watcher/Forsaken:</strong> conteúdo extremo de Forlorn Hollows. <strong>Licowitch Tower:</strong> estrutura de combate em Candy Cavity, não boss formal.</p>`),
      s('Para não perder o inventário',`<div class="warning-block">Todos os biomas ficam fundo no Overworld. Morreu? A volta já é uma dungeon. Faça staging acima da caverna, leve waypoint e não carregue os Cave Codices/loot raro sem necessidade.</div>`)
    ],
    craftings:[
      noRecipe('Cave Tablet / Cave Codex','Sistema de pesquisa/localização confirmado. Receitas não copiadas sem recipe JSON da versão 2.0.10.'),
      noRecipe('Ominous Catalyst','Item usado no Volcanic Core para iniciar o Luxtructosaurus. Uso confirmado; receita não afirmada.'),
      noRecipe('Loot do Luxtructosaurus','Tectonic Shards são recompensa importante do boss; quantidade pode variar e não é tratada como crafting.')
    ],
    checklist:ck(['caves-research','Começar o sistema Cave Tablet/Cave Codex','Intermediário'],['caves-magnetic','Explorar Magnetic Caves','Avançado'],['caves-primordial','Explorar Primordial Caves','Avançado'],['caves-toxic','Explorar Toxic Caves','Avançado'],['caves-abyssal','Explorar Abyssal Chasm','Pós-jogo'],['caves-forlorn','Explorar Forlorn Hollows','Avançado'],['caves-candy','Explorar Candy Cavity','Avançado'],['caves-lux','Derrotar Luxtructosaurus','Pós-jogo'],['caves-hull','Sobreviver a um encontro com Hullbreaker','Pós-jogo'],['caves-toxic-extreme','Completar um encontro extremo de Toxic Caves','Pós-jogo'],['caves-forlorn-extreme','Completar um encontro extremo de Forlorn Hollows','Pós-jogo'],['caves-licowitch','Limpar uma Licowitch Tower','Avançado']),
    sources:[["Alex's Caves Wiki",src.caves],['Biomes',src.caveBiomes],['Luxtructosaurus',src.lux],['Hullbreaker',src.hull]]
  }),
  guide({
    id:'incendium',title:'Incendium',subtitle:'Nether reformulado · exploração e estruturas',type:'dimensão / worldgen',color:'#9b4d31',difficulty:'Difícil',risk:'Severo',phase:'Intermediário → Avançado',equivalent:'Nether',complexity:'Moderada',confidence:'Média-alta',
    intro:'Incendium muda o Nether sem exigir uma campanha linear. O objetivo do guia é não transformar estruturas grandes em “obrigatórias” só porque estão no caminho: primeiro dominar deslocamento e retorno, depois escolher as estruturas que fazem sentido.',
    sections:[
      s('Primeira exploração',`<p>Entre com diamante parcial, pelo menos uma peça de ouro, Fire Resistance quando possível, blocos não inflamáveis e waypoint no portal. O worldgen aumenta verticalidade e torna lava/rotas longas uma parte maior do risco.</p>`),
      s('Estruturas mais perigosas',`<p>Depois de dominar o deslocamento, vá com diamante completo encantado, ranged e backup de blocos. <strong>Não existe ordem obrigatória aprovada entre as estruturas</strong>: elas são trilha paralela.</p>`),
      s('Para não perder o inventário',`<div class="warning-block">A regra é simples: nenhuma estrutura vale cruzar um lago de lava sem rota de volta. Faça pontes protegidas, marque interseções e mantenha o portal num lugar impossível de confundir.</div>`)
    ],
    craftings:[noRecipe('Acesso ao Incendium','Não há item de portal próprio: é o Nether vanilla com worldgen/conteúdo do Incendium. O gate é o portal do Nether normal.')],
    checklist:ck(['incendium-enter','Fazer uma primeira exploração segura do Nether reformulado','Intermediário'],['incendium-route','Estabelecer uma rota segura a partir do portal','Intermediário'],['incendium-structure','Limpar uma estrutura perigosa do Incendium','Avançado'],['incendium-second','Limpar uma segunda estrutura por uma rota diferente','Avançado']),
    sources:[['Incendium — CurseForge',src.incendium]]
  }),
  guide({
    id:'graveyard',title:'The Graveyard',subtitle:'estruturas · ritual · Corrupted Champion',type:'chefe / exploração',color:'#60605a',difficulty:'Difícil → Muito difícil',risk:'Severo',phase:'Intermediário → Pós-jogo',equivalent:'pré-Ender Dragon → endgame',complexity:'Complexa',confidence:'Alta',
    intro:'The Graveyard começa como exploração de estruturas e termina num ritual intencional para o Corrupted Champion. É uma ótima linha para fazer aos poucos: juntar fragmentos enquanto o mundo avança e só montar o ritual quando os dois estiverem prontos.',
    sections:[
      s('Explorar antes do ritual',`<p>Graveyards, Crypts e Ruins já são conteúdo por si só. Explore de dia quando fizer sentido, junte loot e reconheça os mobs. A horde noturna existe no mod e pode ser configurada.</p>`),
      s('Os três Ominous Bone Staff Fragments',`<p>Cada Ruin tem uma peça única: broken tower (head), bloody hill (middle) e campsite (lower). As três também podem, às vezes, ser compradas do Nameless Hanged por Corruption.</p>`),
      s('Vial of Blood + Lich Prison',`<p>Obtenha Bone Dagger (drop de Acolyte ou crafting), segure uma glass bottle na offhand e use a adaga para preencher o <strong>Vial of Blood</strong>. Depois encontre a <strong>Lich Prison</strong>, uma grande ilha flutuante sobre oceanos.</p>`),
      s('Ritual',`<p>À noite, coloque os três fragmentos da staff, de cima para baixo, nos blocos escuros de corrupted deepslate em frente ao altar. Depois despeje o Vial of Blood no altar.</p>`),
      s('Corrupted Champion',`<p><strong>Fase 1:</strong> magia e janelas de imunidade com disco ao redor do boss. <strong>Fase 2:</strong> hunt — invulnerável, aplica blindness e teleporta; sobreviver é o objetivo. <strong>Fase 3:</strong> está quase derrotado, mas ainda é perigoso. Não gaste cura tentando causar dano durante invulnerabilidade.</p>`)
    ],
    craftings:[
      noRecipe('Ominous Bone Staff Fragments','Obtidos nas três Ruins ou, às vezes, por comércio com Nameless Hanged. Não são tratados como uma receita única.'),
      noRecipe('Bone Dagger','Pode dropar de Acolyte ou ser craftada. A existência da receita é confirmada, mas a grade/quantidades não são reproduzidas sem recipe data da versão 2.6.2.'),
      noRecipe('Vial of Blood','Gerado/enchido usando Bone Dagger + glass bottle na offhand durante as ações descritas pelo mod. Não é receita de bancada.')
    ],
    checklist:ck(['grave-explore','Explorar Graveyards/Crypt/Ruins','Intermediário'],['grave-frag1','Obter o fragmento superior','Avançado'],['grave-frag2','Obter o fragmento do meio','Avançado'],['grave-frag3','Obter o fragmento inferior','Avançado'],['grave-dagger','Obter uma Bone Dagger','Avançado'],['grave-blood','Encher um Vial of Blood','Avançado'],['grave-prison','Encontrar a Lich Prison','Avançado'],['grave-ritual','Executar o ritual à noite','Pós-jogo'],['grave-champion','Derrotar o Corrupted Champion','Pós-jogo']),
    sources:[['The Graveyard — GitHub',src.grave]]
  })
];
