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

export const lote2Part3=[
  guide({
    id:'end-reformulado',title:'End reformulado',subtitle:'End Remastered + Additions + Nullscape + The Lost Castle + dragonfight',type:'progressão / dimensão',color:'#6b5a86',difficulty:'Difícil → Muito difícil',risk:'Severo',phase:'Avançado → Pós-jogo',equivalent:'End',complexity:'Complexa',confidence:'Alta',
    intro:'Aqui o End deixa de ser “duas blaze rods, pérola e stronghold”. End Remastered força exploração real: 12 olhos distintos para abrir o portal. O pack ainda soma novos olhos, The Lost Castle, Nullscape e uma luta de dragão mais agressiva.',
    sections:[
      s('Gate obrigatório: 12 Eyes distintos',`<p>End Remastered adiciona 16 olhos no mod base e exige <strong>12 olhos distintos</strong> no portal. Eles vêm de exploração, combate e mineração; não são uma receita substituta para Eye of Ender.</p><p>O Additions 1.1.2 acrescenta fontes como Fishing Eye, Trial Eye, Sculk Eye, Potato Eye e integrações com BOMD/Aether quando presentes.</p>`),
      s('The Lost Castle',`<p>Megaestrutura do Overworld e trilha paralela. É rara, distante e pode ser localizada por mapa de cartógrafo journeyman quando disponível. Não é gate do End só porque está no mesmo grupo temático.</p>`),
      s('Ativar o portal',`<p>Depois de reunir 12 olhos distintos, instale-os nos frames e entre. Faça staging no stronghold antes: cama/waystone, blocos, ranged e recuperação de queda.</p>`),
      s('Dragão do pack',`<p>A luta está calibrada acima do Ender Dragon vanilla. Trate como boss de risco severo: arco forte, slow falling quando possível, cura e muita atenção ao void.</p><div class="note-block">O arquivo aprovado chama o componente de <strong>dragonfight mod</strong>. Não estou atribuindo mecânicas específicas além da calibração aprovada sem uma fonte pública do JAR.</div>`),
      s('Nullscape / Outer End',`<p>Depois do Dragão, explore o Outer End remodelado pelo Nullscape. Elytra ajuda muito, mas Ender Pearls, blocos e rockets precisam de plano de contingência: o void continua sendo o cobrador de imposto do End.</p>`)
    ],
    craftings:[
      noRecipe('12 Eyes de End Remastered','Não há uma receita única. Cada olho possui fonte própria; o requisito é diversidade de 12 olhos, não 12 cópias do mesmo item.'),
      noRecipe('Eyes do Additions','Fishing Eye: pesca; Trial Eye: Ominous Vault de Trial Chambers; Sculk Eye: chests de Ancient City; Potato Eye: drop raro de batata madura; integrações adicionais dependem dos mods presentes. Confiança alta para a versão 1.1.2.'),
      noRecipe('Portal do End','Ativado ao instalar os 12 olhos customizados. Não é crafting.')
    ],
    checklist:ck(['end-eyes-start','Começar a coleção dos Eyes','Intermediário'],['end-eyes-12','Reunir 12 Eyes distintos','Avançado'],['end-castle','Explorar The Lost Castle','Avançado'],['end-stronghold','Preparar staging no Stronghold','Avançado'],['end-open','Ativar o End Portal com 12 Eyes','Avançado'],['end-dragon','Derrotar o Dragão do pack','Avançado'],['end-nullscape','Explorar Nullscape / Outer End','Pós-jogo']),
    sources:[['End Remastered',src.endrem],['End Remastered Additions',src.endadd],['Nullscape',src.nullscape],['The Lost Castle',src.lost]]
  }),
  guide({
    id:'bomd',title:'Bosses of Mass Destruction',subtitle:'4 bosses endgame · trilhas paralelas',type:'chefes',color:'#7b3e48',difficulty:'Muito difícil',risk:'Severo',phase:'Pós-jogo',equivalent:'pós-Dragão / endgame',complexity:'Complexa',confidence:'Alta',
    intro:'Quatro encontros endgame. Não há uma campanha linear confirmada entre eles; o gate real é encontrar cada estrutura e estar equipado para o ambiente em que o boss vive.',
    sections:[
      s('Void Blossom',`<p>Aparece em cavernas raras no fundo do Overworld. <strong>Void Lilies</strong> ajudam a apontar o caminho. É o encontro menos punitivo do conjunto na nossa calibração, mas continua endgame.</p>`),
      s('Night Lich',`<p>Torres raras em biomas frios. <strong>Soul Stars</strong> guiam até a torre. Ranged e cura ajudam porque a luta acontece longe de uma base típica.</p>`),
      s('Nether Gauntlet',`<p>Estrutura rara do Nether. Fire Resistance, ranged e mobilidade são preparo, não gate. A combinação arena + Nether faz qualquer wipe custar caro.</p>`),
      s('Obsidilith',`<p>Estruturas raras nas ilhas do End. Elytra/slow falling entram como segurança prática; o risco real é perder a luta e o inventário para o void.</p>`),
      s('Ordem',`<div class="soft-block"><strong>Trilha paralela — ordem indiferente.</strong> Faça o boss que vocês encontrarem e estiverem preparados para enfrentar; não há dependência rígida aprovada entre os quatro.</div>`)
    ],
    craftings:[
      noRecipe('Soul Stars','Item de localização do Night Lich. O guia registra a função confirmada; receita não reproduzida sem recipe JSON da porta NeoForge 1.3.3.'),
      noRecipe('Void Lilies','Servem como pista/localização para Void Blossom. A receita mudou entre versões antigas; por isso não transplantamos uma grade histórica para 1.21.1.')
    ],
    checklist:ck(['bomd-blossom','Derrotar Void Blossom','Pós-jogo'],['bomd-lich','Derrotar Night Lich','Pós-jogo'],['bomd-gauntlet','Derrotar Nether Gauntlet','Pós-jogo'],['bomd-obsidilith','Derrotar Obsidilith','Pós-jogo']),
    sources:[['Bosses of Mass Destruction NeoForge',src.bomd]]
  }),
  guide({
    id:'mowzies-mobs',title:"Mowzie's Mobs",subtitle:'Ferrous Wroughtnaut · Frostmaw · Umvuthi',type:'chefes',color:'#96734f',difficulty:'Difícil',risk:'Alto',phase:'Avançado',equivalent:'pré-Ender Dragon',complexity:'Complexa',confidence:'Média-alta',
    intro:'Os três encontros principais desta entrada não formam uma fila. Cada um é um puzzle de combate próprio: armadura quase total, gelo e controle de distância/área.',
    sections:[
      s('Ferrous Wroughtnaut',`<p>Encontrado em <strong>Wrought Chambers</strong> subterrâneas. Só existe uma maneira correta de causar dano: é preciso descobrir/explorar a janela de fraqueza, em vez de trocar hit de frente. Ao vencer, deixa Wrought Helm e Axe of a Thousand Metals.</p>`),
      s('Frostmaw',`<p>Raro em biomas nevados, normalmente dormindo e protegendo um <strong>Ice Crystal</strong>. Mobilidade e ranged ajudam, mas o gelo pode anular justamente mobilidade; não conte com velocidade como única defesa.</p>`),
      s('Umvuthi, the Sunbird',`<p>Fica em uma grove de savana e luta à distância com sunstrikes, beam, flare e summons. Ficar parado sob um teto resolve um ataque e cria problema para outro; a luta foi desenhada para punir camping.</p>`),
      s('Compat: Mowzie’s Cataclysm',`<p>O addon 1.2.2 conecta Mowzie’s Mobs e Cataclysm adicionando <strong>4 olhos</strong> para localizar bosses do Mowzie’s. Isso é utilidade de localização; não muda a regra de que os três encontros aqui são paralelos.</p>`)
    ],
    craftings:[
      noRecipe('Boss-locating eyes — Mowzie’s Cataclysm','O addon 1.2.2 confirma quatro olhos de localização. As receitas individuais não são reproduzidas sem recipe data da versão alvo.'),
      noRecipe('Axe of a Thousand Metals','Drop do Ferrous Wroughtnaut; não é receita.'),
      noRecipe('Ice Crystal','Recompensa/objeto guardado pelo Frostmaw; não é tratado como crafting no guia.')
    ],
    checklist:ck(['mowzie-wrought','Encontrar e derrotar Ferrous Wroughtnaut','Avançado'],['mowzie-frost','Encontrar e vencer/roubar a recompensa do Frostmaw','Avançado'],['mowzie-umvuthi','Encontrar e derrotar Umvuthi','Avançado']),
    sources:[["Mowzie's Mobs",src.mowzie],["Mowzie's Cataclysm",src.mowCat]]
  })
];
