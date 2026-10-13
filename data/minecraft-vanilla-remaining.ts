export const MINECRAFT_VANILLA_REMAINING_VERSION = "vanilla-remaining-2026-10-13-v1";
export const MINECRAFT_VANILLA_REMAINING = [
  {
    "advancementId": "minecraft:adventure/kill_a_mob",
    "milestoneId": "progression:12",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 36,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/kill_a_mob.json",
    "parent": "minecraft:adventure/root",
    "criteria": [
      "minecraft:blaze",
      "minecraft:bogged",
      "minecraft:breeze",
      "minecraft:cave_spider",
      "minecraft:creeper",
      "minecraft:drowned",
      "minecraft:elder_guardian",
      "minecraft:ender_dragon",
      "minecraft:enderman",
      "minecraft:endermite",
      "minecraft:evoker",
      "minecraft:ghast",
      "minecraft:guardian",
      "minecraft:hoglin",
      "minecraft:husk",
      "minecraft:magma_cube",
      "minecraft:phantom",
      "minecraft:piglin",
      "minecraft:piglin_brute",
      "minecraft:pillager",
      "minecraft:ravager",
      "minecraft:shulker",
      "minecraft:silverfish",
      "minecraft:skeleton",
      "minecraft:slime",
      "minecraft:spider",
      "minecraft:stray",
      "minecraft:vex",
      "minecraft:vindicator",
      "minecraft:witch",
      "minecraft:wither",
      "minecraft:wither_skeleton",
      "minecraft:zoglin",
      "minecraft:zombie",
      "minecraft:zombie_villager",
      "minecraft:zombified_piglin"
    ],
    "requirements": [
      [
        "minecraft:blaze",
        "minecraft:bogged",
        "minecraft:breeze",
        "minecraft:cave_spider",
        "minecraft:creeper",
        "minecraft:drowned",
        "minecraft:elder_guardian",
        "minecraft:ender_dragon",
        "minecraft:enderman",
        "minecraft:endermite",
        "minecraft:evoker",
        "minecraft:ghast",
        "minecraft:guardian",
        "minecraft:hoglin",
        "minecraft:husk",
        "minecraft:magma_cube",
        "minecraft:phantom",
        "minecraft:piglin",
        "minecraft:piglin_brute",
        "minecraft:pillager",
        "minecraft:ravager",
        "minecraft:shulker",
        "minecraft:silverfish",
        "minecraft:skeleton",
        "minecraft:slime",
        "minecraft:spider",
        "minecraft:stray",
        "minecraft:vex",
        "minecraft:vindicator",
        "minecraft:witch",
        "minecraft:wither_skeleton",
        "minecraft:wither",
        "minecraft:zoglin",
        "minecraft:zombie_villager",
        "minecraft:zombie",
        "minecraft:zombified_piglin"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/root",
    "milestoneId": "progression:12",
    "enabled": true,
    "confidence": "Alta",
    "kind": "partial",
    "total": 2,
    "rule": "Sinal de abertura; concluir somente por kill_a_mob.done===true.",
    "reason": "Agrupar com kill_a_mob num único novo marco. root também pode vir de morte do jogador, portanto só abre a trilha; não conclui o objetivo.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/root.json",
    "parent": null,
    "criteria": [
      "killed_by_something",
      "killed_something"
    ],
    "requirements": [
      [
        "killed_something",
        "killed_by_something"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/shoot_arrow",
    "milestoneId": "progression:13",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/shoot_arrow.json",
    "parent": "minecraft:adventure/kill_a_mob",
    "criteria": [
      "shot_arrow"
    ],
    "requirements": [
      [
        "shot_arrow"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/salvage_sherd",
    "milestoneId": "progression:14",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 7,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true. São 7 critérios brutos, em 2 grupos obrigatórios: um local de arqueologia E has_sherd. Não se conclui ao atingir 7/7 nem com has_sherd sozinho.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/salvage_sherd.json",
    "parent": "minecraft:adventure/root",
    "criteria": [
      "desert_pyramid",
      "desert_well",
      "has_sherd",
      "ocean_ruin_cold",
      "ocean_ruin_warm",
      "trail_ruins_common",
      "trail_ruins_rare"
    ],
    "requirements": [
      [
        "desert_pyramid",
        "desert_well",
        "ocean_ruin_cold",
        "ocean_ruin_warm",
        "trail_ruins_rare",
        "trail_ruins_common"
      ],
      [
        "has_sherd"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/trade",
    "milestoneId": "progression:15",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/trade.json",
    "parent": "minecraft:adventure/root",
    "criteria": [
      "traded"
    ],
    "requirements": [
      [
        "traded"
      ]
    ]
  },
  {
    "advancementId": "minecraft:husbandry/breed_an_animal",
    "milestoneId": "progression:16",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/husbandry/breed_an_animal.json",
    "parent": "minecraft:husbandry/root",
    "criteria": [
      "bred"
    ],
    "requirements": [
      [
        "bred"
      ]
    ]
  },
  {
    "advancementId": "minecraft:husbandry/tame_an_animal",
    "milestoneId": "progression:17",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true. Não equivale a converter/treinar cão Doggy #115 nem equipar armadura #185.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/husbandry/tame_an_animal.json",
    "parent": "minecraft:husbandry/root",
    "criteria": [
      "tamed_animal"
    ],
    "requirements": [
      [
        "tamed_animal"
      ]
    ]
  },
  {
    "advancementId": "minecraft:husbandry/axolotl_in_a_bucket",
    "milestoneId": "progression:18",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/husbandry/axolotl_in_a_bucket.json",
    "parent": "minecraft:husbandry/tactical_fishing",
    "criteria": [
      "axolotl_bucket"
    ],
    "requirements": [
      [
        "axolotl_bucket"
      ]
    ]
  },
  {
    "advancementId": "minecraft:husbandry/balanced_diet",
    "milestoneId": "progression:46",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 40,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/husbandry/balanced_diet.json",
    "parent": "minecraft:husbandry/plant_seed",
    "criteria": [
      "apple",
      "baked_potato",
      "beef",
      "beetroot",
      "beetroot_soup",
      "bread",
      "carrot",
      "chicken",
      "chorus_fruit",
      "cod",
      "cooked_beef",
      "cooked_chicken",
      "cooked_cod",
      "cooked_mutton",
      "cooked_porkchop",
      "cooked_rabbit",
      "cooked_salmon",
      "cookie",
      "dried_kelp",
      "enchanted_golden_apple",
      "glow_berries",
      "golden_apple",
      "golden_carrot",
      "honey_bottle",
      "melon_slice",
      "mushroom_stew",
      "mutton",
      "poisonous_potato",
      "porkchop",
      "potato",
      "pufferfish",
      "pumpkin_pie",
      "rabbit",
      "rabbit_stew",
      "rotten_flesh",
      "salmon",
      "spider_eye",
      "suspicious_stew",
      "sweet_berries",
      "tropical_fish"
    ],
    "requirements": [
      [
        "apple"
      ],
      [
        "mushroom_stew"
      ],
      [
        "bread"
      ],
      [
        "porkchop"
      ],
      [
        "cooked_porkchop"
      ],
      [
        "golden_apple"
      ],
      [
        "enchanted_golden_apple"
      ],
      [
        "cod"
      ],
      [
        "salmon"
      ],
      [
        "tropical_fish"
      ],
      [
        "pufferfish"
      ],
      [
        "cooked_cod"
      ],
      [
        "cooked_salmon"
      ],
      [
        "cookie"
      ],
      [
        "melon_slice"
      ],
      [
        "beef"
      ],
      [
        "cooked_beef"
      ],
      [
        "chicken"
      ],
      [
        "cooked_chicken"
      ],
      [
        "rotten_flesh"
      ],
      [
        "spider_eye"
      ],
      [
        "carrot"
      ],
      [
        "potato"
      ],
      [
        "baked_potato"
      ],
      [
        "poisonous_potato"
      ],
      [
        "golden_carrot"
      ],
      [
        "pumpkin_pie"
      ],
      [
        "rabbit"
      ],
      [
        "cooked_rabbit"
      ],
      [
        "rabbit_stew"
      ],
      [
        "mutton"
      ],
      [
        "cooked_mutton"
      ],
      [
        "chorus_fruit"
      ],
      [
        "beetroot"
      ],
      [
        "beetroot_soup"
      ],
      [
        "dried_kelp"
      ],
      [
        "suspicious_stew"
      ],
      [
        "sweet_berries"
      ],
      [
        "honey_bottle"
      ],
      [
        "glow_berries"
      ]
    ]
  },
  {
    "advancementId": "minecraft:husbandry/root",
    "milestoneId": "progression:46",
    "enabled": true,
    "confidence": "Alta",
    "kind": "partial",
    "total": 1,
    "rule": "Sinal de abertura; concluir apenas por balanced_diet.done===true.",
    "reason": "Agrupar com balanced_diet. consume_item inclui consumíveis; root apenas abre a trilha, não comprova dieta completa nem justifica um marco adicional.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/husbandry/root.json",
    "parent": null,
    "criteria": [
      "consumed_item"
    ],
    "requirements": [
      [
        "consumed_item"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/adventuring_time",
    "milestoneId": "progression:155",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 53,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/adventuring_time.json",
    "parent": "minecraft:adventure/sleep_in_bed",
    "criteria": [
      "minecraft:badlands",
      "minecraft:bamboo_jungle",
      "minecraft:beach",
      "minecraft:birch_forest",
      "minecraft:cherry_grove",
      "minecraft:cold_ocean",
      "minecraft:dark_forest",
      "minecraft:deep_cold_ocean",
      "minecraft:deep_dark",
      "minecraft:deep_frozen_ocean",
      "minecraft:deep_lukewarm_ocean",
      "minecraft:deep_ocean",
      "minecraft:desert",
      "minecraft:dripstone_caves",
      "minecraft:eroded_badlands",
      "minecraft:flower_forest",
      "minecraft:forest",
      "minecraft:frozen_ocean",
      "minecraft:frozen_peaks",
      "minecraft:frozen_river",
      "minecraft:grove",
      "minecraft:ice_spikes",
      "minecraft:jagged_peaks",
      "minecraft:jungle",
      "minecraft:lukewarm_ocean",
      "minecraft:lush_caves",
      "minecraft:mangrove_swamp",
      "minecraft:meadow",
      "minecraft:mushroom_fields",
      "minecraft:ocean",
      "minecraft:old_growth_birch_forest",
      "minecraft:old_growth_pine_taiga",
      "minecraft:old_growth_spruce_taiga",
      "minecraft:plains",
      "minecraft:river",
      "minecraft:savanna",
      "minecraft:savanna_plateau",
      "minecraft:snowy_beach",
      "minecraft:snowy_plains",
      "minecraft:snowy_slopes",
      "minecraft:snowy_taiga",
      "minecraft:sparse_jungle",
      "minecraft:stony_peaks",
      "minecraft:stony_shore",
      "minecraft:sunflower_plains",
      "minecraft:swamp",
      "minecraft:taiga",
      "minecraft:warm_ocean",
      "minecraft:windswept_forest",
      "minecraft:windswept_gravelly_hills",
      "minecraft:windswept_hills",
      "minecraft:windswept_savanna",
      "minecraft:wooded_badlands"
    ],
    "requirements": [
      [
        "minecraft:mushroom_fields"
      ],
      [
        "minecraft:deep_frozen_ocean"
      ],
      [
        "minecraft:frozen_ocean"
      ],
      [
        "minecraft:deep_cold_ocean"
      ],
      [
        "minecraft:cold_ocean"
      ],
      [
        "minecraft:deep_ocean"
      ],
      [
        "minecraft:ocean"
      ],
      [
        "minecraft:deep_lukewarm_ocean"
      ],
      [
        "minecraft:lukewarm_ocean"
      ],
      [
        "minecraft:warm_ocean"
      ],
      [
        "minecraft:stony_shore"
      ],
      [
        "minecraft:swamp"
      ],
      [
        "minecraft:mangrove_swamp"
      ],
      [
        "minecraft:snowy_slopes"
      ],
      [
        "minecraft:snowy_plains"
      ],
      [
        "minecraft:snowy_beach"
      ],
      [
        "minecraft:windswept_gravelly_hills"
      ],
      [
        "minecraft:grove"
      ],
      [
        "minecraft:windswept_hills"
      ],
      [
        "minecraft:snowy_taiga"
      ],
      [
        "minecraft:windswept_forest"
      ],
      [
        "minecraft:taiga"
      ],
      [
        "minecraft:plains"
      ],
      [
        "minecraft:meadow"
      ],
      [
        "minecraft:beach"
      ],
      [
        "minecraft:forest"
      ],
      [
        "minecraft:old_growth_spruce_taiga"
      ],
      [
        "minecraft:flower_forest"
      ],
      [
        "minecraft:birch_forest"
      ],
      [
        "minecraft:dark_forest"
      ],
      [
        "minecraft:savanna_plateau"
      ],
      [
        "minecraft:savanna"
      ],
      [
        "minecraft:jungle"
      ],
      [
        "minecraft:badlands"
      ],
      [
        "minecraft:desert"
      ],
      [
        "minecraft:wooded_badlands"
      ],
      [
        "minecraft:jagged_peaks"
      ],
      [
        "minecraft:stony_peaks"
      ],
      [
        "minecraft:frozen_river"
      ],
      [
        "minecraft:river"
      ],
      [
        "minecraft:ice_spikes"
      ],
      [
        "minecraft:old_growth_pine_taiga"
      ],
      [
        "minecraft:sunflower_plains"
      ],
      [
        "minecraft:old_growth_birch_forest"
      ],
      [
        "minecraft:sparse_jungle"
      ],
      [
        "minecraft:bamboo_jungle"
      ],
      [
        "minecraft:eroded_badlands"
      ],
      [
        "minecraft:windswept_savanna"
      ],
      [
        "minecraft:cherry_grove"
      ],
      [
        "minecraft:frozen_peaks"
      ],
      [
        "minecraft:dripstone_caves"
      ],
      [
        "minecraft:lush_caves"
      ],
      [
        "minecraft:deep_dark"
      ]
    ]
  },
  {
    "advancementId": "minecraft:husbandry/whole_pack",
    "milestoneId": "progression:166",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 9,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/husbandry/whole_pack.json",
    "parent": "minecraft:husbandry/tame_an_animal",
    "criteria": [
      "minecraft:ashen",
      "minecraft:black",
      "minecraft:chestnut",
      "minecraft:pale",
      "minecraft:rusty",
      "minecraft:snowy",
      "minecraft:spotted",
      "minecraft:striped",
      "minecraft:woods"
    ],
    "requirements": [
      [
        "minecraft:ashen"
      ],
      [
        "minecraft:black"
      ],
      [
        "minecraft:chestnut"
      ],
      [
        "minecraft:pale"
      ],
      [
        "minecraft:rusty"
      ],
      [
        "minecraft:snowy"
      ],
      [
        "minecraft:spotted"
      ],
      [
        "minecraft:striped"
      ],
      [
        "minecraft:woods"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/minecraft_trials_edition",
    "milestoneId": "progression:225",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/minecraft_trials_edition.json",
    "parent": "minecraft:adventure/root",
    "criteria": [
      "minecraft_trials_edition"
    ],
    "requirements": [
      [
        "minecraft_trials_edition"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/blowback",
    "milestoneId": "progression:226",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/blowback.json",
    "parent": "minecraft:adventure/minecraft_trials_edition",
    "criteria": [
      "blowback"
    ],
    "requirements": [
      [
        "blowback"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/under_lock_and_key",
    "milestoneId": "progression:227",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/under_lock_and_key.json",
    "parent": "minecraft:adventure/minecraft_trials_edition",
    "criteria": [
      "under_lock_and_key"
    ],
    "requirements": [
      [
        "under_lock_and_key"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/revaulting",
    "milestoneId": "progression:228",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/revaulting.json",
    "parent": "minecraft:adventure/under_lock_and_key",
    "criteria": [
      "revaulting"
    ],
    "requirements": [
      [
        "revaulting"
      ]
    ]
  },
  {
    "advancementId": "minecraft:nether/obtain_ancient_debris",
    "milestoneId": "progression:231",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 1,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true. Prova POSSE do recurso; não pressupor método de mineração.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/nether/obtain_ancient_debris.json",
    "parent": "minecraft:nether/root",
    "criteria": [
      "ancient_debris"
    ],
    "requirements": [
      [
        "ancient_debris"
      ]
    ]
  },
  {
    "advancementId": "minecraft:adventure/kill_all_mobs",
    "milestoneId": "progression:990",
    "enabled": true,
    "confidence": "Alta",
    "kind": "milestone",
    "total": 36,
    "rule": "done===true conclui o novo marco correspondente, apenas para o jogador selecionado. Contador de critérios fica dentro do marco.",
    "reason": "Objetivo vanilla sem equivalente integral nos marcos atuais. Ordem guiada pelo parent nativo; conclusão somente done=true.",
    "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/kill_all_mobs.json",
    "parent": "minecraft:adventure/kill_a_mob",
    "criteria": [
      "minecraft:blaze",
      "minecraft:bogged",
      "minecraft:breeze",
      "minecraft:cave_spider",
      "minecraft:creeper",
      "minecraft:drowned",
      "minecraft:elder_guardian",
      "minecraft:ender_dragon",
      "minecraft:enderman",
      "minecraft:endermite",
      "minecraft:evoker",
      "minecraft:ghast",
      "minecraft:guardian",
      "minecraft:hoglin",
      "minecraft:husk",
      "minecraft:magma_cube",
      "minecraft:phantom",
      "minecraft:piglin",
      "minecraft:piglin_brute",
      "minecraft:pillager",
      "minecraft:ravager",
      "minecraft:shulker",
      "minecraft:silverfish",
      "minecraft:skeleton",
      "minecraft:slime",
      "minecraft:spider",
      "minecraft:stray",
      "minecraft:vex",
      "minecraft:vindicator",
      "minecraft:witch",
      "minecraft:wither",
      "minecraft:wither_skeleton",
      "minecraft:zoglin",
      "minecraft:zombie",
      "minecraft:zombie_villager",
      "minecraft:zombified_piglin"
    ],
    "requirements": [
      [
        "minecraft:blaze"
      ],
      [
        "minecraft:bogged"
      ],
      [
        "minecraft:breeze"
      ],
      [
        "minecraft:cave_spider"
      ],
      [
        "minecraft:creeper"
      ],
      [
        "minecraft:drowned"
      ],
      [
        "minecraft:elder_guardian"
      ],
      [
        "minecraft:ender_dragon"
      ],
      [
        "minecraft:enderman"
      ],
      [
        "minecraft:endermite"
      ],
      [
        "minecraft:evoker"
      ],
      [
        "minecraft:ghast"
      ],
      [
        "minecraft:guardian"
      ],
      [
        "minecraft:hoglin"
      ],
      [
        "minecraft:husk"
      ],
      [
        "minecraft:magma_cube"
      ],
      [
        "minecraft:phantom"
      ],
      [
        "minecraft:piglin"
      ],
      [
        "minecraft:piglin_brute"
      ],
      [
        "minecraft:pillager"
      ],
      [
        "minecraft:ravager"
      ],
      [
        "minecraft:shulker"
      ],
      [
        "minecraft:silverfish"
      ],
      [
        "minecraft:skeleton"
      ],
      [
        "minecraft:slime"
      ],
      [
        "minecraft:spider"
      ],
      [
        "minecraft:stray"
      ],
      [
        "minecraft:vex"
      ],
      [
        "minecraft:vindicator"
      ],
      [
        "minecraft:witch"
      ],
      [
        "minecraft:wither_skeleton"
      ],
      [
        "minecraft:wither"
      ],
      [
        "minecraft:zoglin"
      ],
      [
        "minecraft:zombie_villager"
      ],
      [
        "minecraft:zombie"
      ],
      [
        "minecraft:zombified_piglin"
      ]
    ]
  }
] as const;
