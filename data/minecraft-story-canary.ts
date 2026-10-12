export const MINECRAFT_STORY_VERSION = "story-canary-2026-10-12-v1";
export const MINECRAFT_STORY_CANARY = [
  {
    "advancementId": "minecraft:story/root",
    "milestoneId": "progression:1",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "Trabalhe em local protegido.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/root.json",
    "parent": null,
    "criteria": [
      "crafting_table"
    ],
    "requirements": [
      [
        "crafting_table"
      ]
    ]
  },
  {
    "advancementId": "minecraft:story/mine_stone",
    "milestoneId": "progression:2",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "Evite escavar diretamente para baixo.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/mine_stone.json",
    "parent": "minecraft:story/root",
    "criteria": [
      "get_stone"
    ],
    "requirements": [
      [
        "get_stone"
      ]
    ]
  },
  {
    "advancementId": "minecraft:story/upgrade_tools",
    "milestoneId": "progression:3",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "Prepare iluminação antes de aprofundar a mineração.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/upgrade_tools.json",
    "parent": "minecraft:story/mine_stone",
    "criteria": [
      "stone_pickaxe"
    ],
    "requirements": [
      [
        "stone_pickaxe"
      ]
    ]
  },
  {
    "advancementId": "minecraft:story/smelt_iron",
    "milestoneId": "progression:4",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "A evidência comprova obter o lingote, não fundi-lo pessoalmente.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/smelt_iron.json",
    "parent": "minecraft:story/upgrade_tools",
    "criteria": [
      "iron"
    ],
    "requirements": [
      [
        "iron"
      ]
    ]
  },
  {
    "advancementId": "minecraft:story/obtain_armor",
    "milestoneId": "progression:5",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 4,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "Uma peça atende ao objetivo; não exige conjunto completo.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/obtain_armor.json",
    "parent": "minecraft:story/smelt_iron",
    "criteria": [
      "iron_boots",
      "iron_chestplate",
      "iron_helmet",
      "iron_leggings"
    ],
    "requirements": [
      [
        "iron_helmet",
        "iron_chestplate",
        "iron_leggings",
        "iron_boots"
      ]
    ]
  },
  {
    "advancementId": "minecraft:story/iron_tools",
    "milestoneId": "progression:6",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "Guarde uma ferramenta de reserva.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/iron_tools.json",
    "parent": "minecraft:story/smelt_iron",
    "criteria": [
      "iron_pickaxe"
    ],
    "requirements": [
      [
        "iron_pickaxe"
      ]
    ]
  },
  {
    "advancementId": "minecraft:story/deflect_arrow",
    "milestoneId": "progression:7",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "Um projétil basta; procure uma situação controlada e tenha rota de saída.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/deflect_arrow.json",
    "parent": "minecraft:story/obtain_armor",
    "criteria": [
      "deflected_projectile"
    ],
    "requirements": [
      [
        "deflected_projectile"
      ]
    ]
  },
  {
    "advancementId": "minecraft:story/mine_diamond",
    "milestoneId": "progression:8",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "A evidência comprova obter o diamante, não minerá-lo pessoalmente.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/mine_diamond.json",
    "parent": "minecraft:story/iron_tools",
    "criteria": [
      "diamond"
    ],
    "requirements": [
      [
        "diamond"
      ]
    ]
  },
  {
    "advancementId": "minecraft:story/shiny_gear",
    "milestoneId": "progression:9",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 4,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "Uma peça atende ao objetivo; não exige conjunto completo.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/shiny_gear.json",
    "parent": "minecraft:story/mine_diamond",
    "criteria": [
      "diamond_boots",
      "diamond_chestplate",
      "diamond_helmet",
      "diamond_leggings"
    ],
    "requirements": [
      [
        "diamond_helmet",
        "diamond_chestplate",
        "diamond_leggings",
        "diamond_boots"
      ]
    ]
  },
  {
    "advancementId": "minecraft:story/form_obsidian",
    "milestoneId": "progression:11",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui somente este marco para o jogador selecionado; done=false registra X/Y sem concluir. Critérios alternativos não exigem todos os itens.",
    "reason": "A evidência comprova obter obsidiana, não formar ou minerar o bloco pessoalmente.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/form_obsidian.json",
    "parent": "minecraft:story/lava_bucket",
    "criteria": [
      "obsidian"
    ],
    "requirements": [
      [
        "obsidian"
      ]
    ]
  }
] as const;
