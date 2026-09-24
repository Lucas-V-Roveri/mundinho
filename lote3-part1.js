export const lote3Part1 = [
  {
    "id": "camp-rest",
    "title": "Acampamento & descanso",
    "subtitle": "Comforts + Comfortable Campfires",
    "type": "utilidade",
    "color": "#9a6944",
    "difficulty": "Tranquilo",
    "risk": "Baixo",
    "phase": "Início",
    "equivalent": "pré-Nether",
    "complexity": "Simples",
    "confidence": "Alta",
    "intro": "Descanso portátil sem mexer no spawn da base, mais um motivo real para montar acampamentos em expedições.",
    "sections": [["Sleeping Bag","Sleeping Bags funcionam como cama portátil sem mudar o spawn. Use para pular a noite durante exploração."],["Hammock","Hammocks fazem o inverso: permitem avançar o dia para a noite. Também não substituem o ponto de spawn."],["Campfire confortável","Lit campfires do Comfortable Campfires dão Regeneration por padrão na versão 2.0.1 do pack; é uma pausa curta de recuperação, não cura infinita de boss."]],
    "craftings": [{"title":"Sleeping Bag","confidence":"Alta","body":"Receita completa confirmada: três lãs da mesma cor em uma linha horizontal.","grid":["","","","Wool","Wool","Wool","","",""],"result":"Sleeping Bag"},{"title":"Hammock Cloth","confidence":"Alta","body":"Centro com lã colorida; sticks em cima/baixo; demais slots preenchidos com string.","ingredients":["1 × Wool","2 × Stick","6 × String"]}],
    "checklist": [["camp-bag","Fazer um Sleeping Bag","Início"],["camp-hammock","Fazer/testar um Hammock","Início"],["camp-fire","Montar um acampamento com campfire","Início"]],
    "sources": [["Comforts","https://www.curseforge.com/minecraft/mc-mods/comforts"],["Comfortable Campfires","https://www.curseforge.com/minecraft/mc-mods/comfortable-campfires"]]
  },
  {
    "id":"decoracao","title":"Construção, móveis & decoração","subtitle":"Handcrafted + Refurbished Furniture + Take a Seat + Voxelized Furniture","type":"construção","color":"#9b7256","difficulty":"Tranquilo","risk":"Baixo","phase":"Início","equivalent":"pré-Nether","complexity":"Simples","confidence":"Alta","intro":"Este grupo existe para a base parecer habitada, não para criar um grind paralelo. Faça móveis quando surgir um cômodo que pede por eles.",
    "sections":[["Handcrafted","Use como kit de móveis vanilla-friendly para mesas, cadeiras, prateleiras e detalhes. Prioridade: sala, cozinha e quartos."],["Refurbished Furniture","Além de decoração, possui blocos funcionais e sistema de eletricidade para eletrodomésticos. Comece pelos móveis simples; energia só quando vocês realmente quiserem os aparelhos."],["Take a Seat + Voxelized Furniture","Complementam assentos e peças decorativas. Não existe ordem de progressão entre eles."]],
    "craftings":[{"title":"Receitas de móveis","confidence":"Média","body":"As famílias de móveis variam por madeira/material e usam receitas próprias. A fonte oficial confirma centenas de blocos; para uma peça específica, mostrar a receita somente quando o recipe data daquela peça estiver confirmado. Até lá, JEI é último recurso por item, não regra do guia."}],
    "checklist":[["decor-first-room","Mobiliar um cômodo da base","Início"],["decor-sit","Criar pelo menos dois assentos utilizáveis","Início"],["decor-functional","Testar um móvel funcional do Refurbished","Intermediário"]],
    "sources":[["Handcrafted","https://modrinth.com/mod/handcrafted"],["Refurbished Furniture","https://dashboard.mrcrayfish.com/mods/refurbished_furniture"]]
  },
  {
    "id":"cozinha","title":"Cozinha, comidas & maçãs","subtitle":"Farmer's Delight + More Delight + Yeon's Bites & Sips + maçãs","type":"culinária","color":"#a36d38","difficulty":"Tranquilo","risk":"Baixo","phase":"Início → Intermediário","equivalent":"pré-Nether","complexity":"Moderada","confidence":"Alta","intro":"Farmer's Delight é o eixo. Os add-ons entram em volta: novas refeições, bebidas e maçãs. O objetivo é transformar comida em sistema útil, não colecionar 80 pratos antes do Nether.",
    "sections":[["Começo","Faça Cutting Board e Knife, depois Cooking Pot quando ferro permitir. Isso abre a maior parte do loop de preparo."],["Cozinhar para explorar","Use refeições com boa saturação e bowls/plates apropriados. No pack de sede, soups/stews/drinks também podem ajudar na hidratação conforme a integração."],["Add-ons","More Delight e Yeon's Bites & Sips expandem receitas; more_apples e Enchanted Golden Apple Addition ficam como coleção/recurso tardio, não gate."]],
    "craftings":[{"title":"Cutting Board","confidence":"Média-alta","body":"Receita base conhecida usa madeira + sticks; a grade exata pode variar por port. Não reproduzida sem recipe JSON 1.21.1."},{"title":"Cooking Pot","confidence":"Média-alta","body":"Componente central do Farmer's Delight. Ingredientes exatos não reproduzidos sem recipe data da versão instalada."},{"title":"Enchanted Golden Apple","confidence":"Baixa-conferir","body":"O addon do pack altera/adiciona obtenção; não vou afirmar a grade sem receita da versão instalada. Conferir no JEI somente para este item específico."}],
    "checklist":[["food-board","Fazer Cutting Board + Knife","Início"],["food-pot","Montar Cooking Pot","Início"],["food-meal","Preparar uma refeição completa para uma expedição","Intermediário"],["food-addon","Cozinhar uma receita de addon","Intermediário"],["food-apple","Obter uma maçã especial do grupo","Avançado"]],
    "sources":[["Farmer's Delight","https://www.curseforge.com/minecraft/mc-mods/farmers-delight"]]
  },
  {
    "id":"create","title":"Create","subtitle":"idade do andesito → brass → precision mechanisms","type":"automação","color":"#8a6540","difficulty":"Moderada","risk":"Baixo","phase":"Início → Avançado","equivalent":"pré-Nether → pré-Ender Dragon","complexity":"Complexa","confidence":"Alta","intro":"Create é infraestrutura. A progressão aprovada tem três degraus: máquinas básicas de andesito, Brass com Blaze Burner aquecido, e depois sequenced assembly/trens.",
    "sections":[["1. Idade do Andesito","Comece por fonte cinética simples, Shafts/Cogwheels, Water Wheel, Mechanical Press/Millstone e Engineer's Goggles."],["2. Brass","Acesse o Nether, capture/use Blaze Burner e aqueça o Mechanical Mixer. Brass abre logística mais avançada."],["3. Precision Mechanisms","Sequenced Assembly libera componentes avançados; só então vale pensar em rede grande de trens e automação mais sofisticada."],["Regra prática","Se uma máquina está overstressed, corrija capacidade/velocidade antes de acrescentar mais engrenagens. Create pune arquitetura ruim com fábrica parada, não com morte."]],
    "craftings":[{"title":"Andesite Alloy","confidence":"Alta","body":"Receita documentada usa Andesite + Iron/Zinc Nuggets; em 1.21.1 o recipe foi atualizado. Use Ponder/JEI para a combinação exata se o pack divergir.","ingredients":["Andesite","Iron Nugget ou Zinc Nugget"]},{"title":"Brass Ingot","confidence":"Alta","body":"Heated Mixing: 1 Copper Ingot + 1 Zinc → 2 Brass Ingots.","ingredients":["1 × Copper Ingot","1 × Zinc"],"result":"2 × Brass Ingot"},{"title":"Precision Mechanism","confidence":"Alta","body":"Sequenced Assembly sobre Golden Sheet. É processo de linha, não receita 3×3; siga o Ponder da própria versão 6.0.10."}],
    "checklist":[["create-power","Gerar força cinética estável","Início"],["create-press","Montar Press/Millstone","Início"],["create-burner","Capturar e aquecer Blaze Burner","Intermediário"],["create-brass","Produzir Brass","Intermediário"],["create-precision","Produzir Precision Mechanism","Avançado"],["create-train","Montar o primeiro trecho ferroviário útil","Avançado"]],
    "sources":[["Create Wiki","https://wiki.createmod.net/"]]
  },
  {
    "id":"fallingtree","title":"FallingTree","subtitle":"derrubada de árvore como QoL","type":"utilidade","color":"#6d7b4e","difficulty":"Tranquilo","risk":"Baixo","phase":"Início","equivalent":"pré-Nether","complexity":"Simples","confidence":"Alta","intro":"FallingTree entra no loop normal de madeira. Não é uma campanha: é uma regra de coleta que economiza clique e pode gastar a ferramenta de uma vez.",
    "sections":[["Uso","Corte o tronco com uma ferramenta válida e deixe o mod derrubar a árvore conforme a configuração ativa."],["Durabilidade","Árvores grandes podem cobrar bastante da ferramenta. Antes de derrubar uma gigante, confira a durabilidade; eficiência não ajuda se o machado vira lembrança."]],
    "craftings":[{"title":"Crafting","confidence":"Alta","body":"Não adiciona uma receita obrigatória para usar o sistema. Use os machados/ferramentas normais compatíveis."}],
    "checklist":[["tree-use","Derrubar uma árvore completa com FallingTree","Início"],["tree-big","Derrubar uma árvore grande sem quebrar a ferramenta","Início"]],
    "sources":[["FallingTree","https://www.curseforge.com/minecraft/mc-mods/falling-tree"]]
  }
];
