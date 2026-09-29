# Bestiário — Lote 5E · Deeper and Darker

## Fonte de verdade

Versão instalada no pack: `deeperdarker-neoforge-1.21.1-1.4.1.jar`.

Revisão oficial auditada: `KyaniteMods/DeeperAndDarker@f7ba235d078411a1165a8cac184adfe0ccc8cebe`.

O commit é especialmente útil porque altera o advancement `kill_all_sculk_mobs` e registra explicitamente que os três gloomslate/Overcast Pots foram removidos desse desafio **temporariamente**. O advancement é usado apenas como evidência auxiliar; a reconciliação do inventário parte do registry e dos Spawn Eggs da mesma revisão.

## Reconciliação do alvo 11

`DDEntities.java` registra 13 `EntityType` nesta revisão:

- 2 veículos técnicos: `boat` e `chest_boat`;
- 11 criaturas: `angler_fish`, `anger_pot`, `fear_pot`, `sorrow_pot`, `sculk_centipede`, `sculk_leech`, `sculk_snapper`, `shattered`, `shriek_worm`, `sludge` e `stalker`.

`DDItems.java` registra **11 Spawn Eggs**, um para cada uma dessas 11 criaturas. Assim, a interseção registry + Spawn Eggs fecha o alvo aprovado sem depender do advancement.

Os três pots permanecem no Bestiário porque `OvercastPot` estende `Monster`, persegue `Player` e usa ataque corpo a corpo. O commit `f7ba235d…` apenas os retira temporariamente do critério `kill_all_sculk_mobs`; ele não remove suas entidades nem seus Spawn Eggs.

`sludge` também permanece: está no registry e possui Spawn Egg, embora não apareça no critério `kill_all_sculk_mobs` dessa revisão.

## Profundidade

### Full — 1

- `deeperdarker:stalker` — boss/encontro central do Ancient Temple; `progression:590`.

A classe `Stalker` usa boss bar, possui 200 HP, ataque base 22, escuta vibrações e executa um ataque em área que pode invocar Sculk Leeches. A Progressão já existente coloca o Ancient Temple → Stalker depois da entrada no Otherside, portanto o card usa `/progressao#progression:590` sem criar marco novo.

### Compact — 10

- Angler Fish
- Anger Pot
- Fear Pot
- Sorrow Pot
- Sculk Centipede
- Sculk Leech
- Sculk Snapper
- Shattered
- Shriek Worm
- Sludge

## Idiomas

A revisão não possui `en_us.json`; o arquivo inglês disponível é `en_gb.json`.

O `pt_br.json` oficial fornece:

- `Peixe-pescador cru` para `angler_fish` — tradução preservada literalmente, apesar da formulação incomum;
- `Centopeia de sculk`;
- `Sanguessuga de sculk`;
- `Agarrador de sculk`;
- `Estilhaçado`;
- `Minhoca sonora`;
- `Gosma`;
- `Stalker`.

Anger Pot, Fear Pot e Sorrow Pot não possuem chave de entidade nos arquivos `pt_br.json`/`en_gb.json` auditados. Para não inventar tradução, os cards preservam os nomes canônicos derivados dos IDs do registry.

## Integração com o Mundinho

- Todos os 11 cards apontam para `/mods#guide-deeper-darker`.
- Stalker → `/progressao#progression:590`.
- Nenhum marco novo foi criado.
- O cabeçalho textual grande do Bestiário não foi reescrito neste sub-lote; o total publicado continua derivado de `BESTIARY_ENTRIES.length`.
- O total auditado sobe de 375 para **386/431**.

## Fontes principais

- `DDEntities.java` na revisão `f7ba235d…` para registry e `MobCategory`.
- `DDItems.java` da mesma revisão para os 11 Spawn Eggs.
- `kill_all_sculk_mobs.json` e o diff do commit para a remoção temporária dos três pots do advancement.
- `pt_br.json` e `en_gb.json` da mesma revisão para nomes versionados.
- `AnglerFish.java`, `OvercastPot.java` e `Stalker.java` para comportamento/atributos afirmados nos cards.
