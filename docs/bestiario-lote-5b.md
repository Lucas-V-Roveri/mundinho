# Bestiário — Lote 5B · The Aether

## Escopo

O Lote 5B completa o recorte de **mobs vivos registrados pelo The Aether 1.5.10 para Minecraft 1.21.1 NeoForge**.

O arquivo `AetherEntityTypes.java` da tag `1.21.1-1.5.10-neoforge` registra 20 criaturas vivas. O Zephyr já havia sido detalhado no 5A; o 5B adiciona as 19 restantes:

- Phyg
- Flying Cow
- Sheepuff
- Moa
- Aerbunny
- Aerwhale
- Blue Swet
- Golden Swet
- Whirlwind
- Evil Whirlwind
- Aechor Plant
- Cockatrice
- Mimic
- Sentry
- Slider
- Valkyrie
- Valkyrie Queen
- Fire Minion
- Sun Spirit

Total detalhado após o lote: **24 cards** (5 do 5A + 19 do 5B).

## Limite do inventário

Não entram como mobs:

- Skyroot Boat / Chest Boat;
- Cloud Minion técnico;
- parachutes;
- Floating Block e TNT Present;
- Zephyr Snowball, crystals, darts, Poison Needle e outros projéteis.

Essas entidades existem no registry, mas não representam criaturas do Bestiário. O inventário-base de 263 candidatos do pack continua sendo um inventário de trabalho; o 5B não declara que todos estão verificados.

## Método

Prioridade aplicada:

1. registry e classes da tag exata `1.21.1-1.5.10-neoforge`;
2. loot tables geradas na mesma tag;
3. Official Aether Project Wiki para comportamento, spawn, interação e bosses;
4. ausência de informação não é preenchida por inferência.

Números de chance/quantidade só entram quando aparecem explicitamente na fonte. Pesos de loot são apresentados como pesos, sem conversão automática para porcentagem.

## Pontos confirmados no 5B

### Fauna Skyroot

Phyg, Flying Cow, Sheepuff, Moa, Aerbunny e Aerwhale usam o conjunto de biomas Skyroot documentado pela wiki oficial. O card do Moa registra a cadeia ovo → incubação → três Aechor Petals → Saddle, sem confundir isso com reprodução comum.

### Swets

`Swet.java` confirma a base compartilhada de 12 HP, spawn de superfície, repelentes de spawn e dissolução em água. As loot tables separam os resultados:

- Blue Swet: Swet Ball + Blue Aercloud;
- Golden Swet: Glowstone.

### Aechor Plant

A classe exata confirma 15 HP, ataque à distância com Poison Needle, regra de spawn, tamanho variável e duas cargas iniciais de veneno coletáveis com Skyroot Bucket. A loot table adiciona Aechor Petal.

### Whirlwinds e Fire Minion

As loot tables existem, porém não possuem pools de itens. O site registra isso de forma precisa em vez de inventar drops.

### Dungeons

- Mimic: Chest + 1–3 rolagens de um pool secundário documentado;
- Sentry: pool ponderado 4:1 entre Carved Stone e Sentry Stone, sem converter o peso em porcentagem;
- Valkyrie: 1 Victory Medal;
- 10 Victory Medals iniciam a luta da Valkyrie Queen.

### Bosses

- Slider: Bronze Dungeon, 400 HP, só recebe dano de Pickaxe; Bronze Key + 8 Carved Stone + 4 níveis de XP;
- Valkyrie Queen: Silver Dungeon, 500 HP, iniciada com 10 Victory Medals; Silver Key + Golden Sword + 4 níveis de XP;
- Sun Spirit: Gold Dungeon, 500 HP; Fire/Ice Crystals e Fire Minions; Gold Key + Sun Altar + 4 níveis de XP.

## Fontes principais

- Registry 1.5.10: https://github.com/The-Aether-Team/The-Aether/blob/1.21.1-1.5.10-neoforge/src/main/java/com/aetherteam/aether/entity/AetherEntityTypes.java
- Entidades oficiais: https://aether.wiki.gg/wiki/The_Aether/Entity
- Phyg: https://aether.wiki.gg/wiki/The_Aether/Phyg
- Flying Cow: https://aether.wiki.gg/wiki/The_Aether/Flying_Cow
- Sheepuff: https://aether.wiki.gg/wiki/The_Aether/Sheepuff
- Moa: https://aether.wiki.gg/wiki/The_Aether/Moa
- Aerbunny: https://aether.wiki.gg/wiki/The_Aether/Aerbunny
- Aerwhale: https://aether.wiki.gg/wiki/The_Aether/Aerwhale
- Slider: https://aether.wiki.gg/wiki/The_Aether/Slider
- Valkyrie Queen: https://aether.wiki.gg/wiki/The_Aether/Valkyrie_Queen
- Sun Spirit: https://aether.wiki.gg/wiki/The_Aether/Sun_Spirit
- Victory Medal: https://aether.wiki.gg/wiki/The_Aether/Victory_Medal
- Keys: https://aether.wiki.gg/wiki/The_Aether/Key
- Loot tables: https://github.com/The-Aether-Team/The-Aether/tree/1.21.1-1.5.10-neoforge/src/generated/resources/data/aether/loot_table/entities

## Compatibilidade

O 5B não altera:

- IDs de Progressão;
- total de 101 milestones;
- XP;
- 35 guias;
- 18 Extras;
- checklist compartilhado;
- formato de backup/import/export;
- schema do Supabase.

Os 19 novos IDs de mob reutilizam `mundinho_bestiary_state`, que já aceita qualquer `mob_id` e mantém o progresso separado por `gr1d` e `benamu`.
