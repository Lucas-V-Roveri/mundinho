# Bestiário — Lote 5E · Eternal Starlight

## Fonte de verdade

Versão instalada no pack: `eternalstarlight-0.9.0+1.21.1+neoforge.jar`.

Revisão histórica oficial: `LeoMinecraftModding/eternal-starlight@e412e1e144137889125b7d2885f2598a936ec7b6` (`bump to 0.9.0`). O `gradle.properties` dessa revisão confirma `mod_version=0.9.0`, `minecraft_version=1.21.1` e NeoForge 21.1.248.

## Reconciliação do alvo 30

O registry contém mais entidades vivas e auxiliares, mas o conjunto de itens da build registra **32 Spawn Eggs**. O próprio `wip.json` 0.9.0 marca dois desses ovos como conteúdo WIP:

- `eternal_starlight:boarwarf_spawn_egg`
- `eternal_starlight:astral_golem_spawn_egg`

Logo, o conjunto publicado neste sub-lote é **32 − 2 WIP = 30 mobs**. `solar_creeper` existe no registry, mas não possui Spawn Egg no conjunto 0.9.0 auditado e não entra no alvo aprovado. Entidades MISC de ataques, projéteis, partes de boss e efeitos também ficam fora.

## Profundidade

### Full — 4

- `eternal_starlight:the_gatekeeper` — NPC/Merchant + desafio de boss e gate de acesso; `progression:530`.
- `eternal_starlight:lunar_monstrosity` — boss do Cursed Garden; `progression:540`.
- `eternal_starlight:starlight_golem` — boss/puzzle da Golem Forge; `progression:550`.
- `eternal_starlight:tangled` — criatura central de Tangled Hatred; `progression:560`.

### Compact — 26

Gleech, Lonestar Skeleton, Nightfall Spider, Seeker, Thirst Walker, Creteor, Tiny Creteor, Stranghoul, Ent, Ratlin, Zombified Ratlin, Shadow Snail, Yeti, Aurora Deer, Crystallized Moth, Shimmer Lacewing, Starfire Bird, Grimstone Golem, Aethersent Golem, Rookfish, Luminofish, Luminaris, Twilight Gaze, Freeze, Permafrost e Tangled Skull.

## Traduções

Os nomes PT-BR vêm do `pt_br.json` da própria revisão 0.9.0, incluindo Sanguessuga Luminosa, Esqueleto da Estrela Solitária, Aranha do Anoitecer, Andarilho Sedento, Carniçal Estranho, Ratoide, Cervo Aurora, Mariposa Cristalizada, Crisopídeo Cintilante, Pássaro de Fogo Estelar, Golem de Pedra Sombria, Peixe Torre, Olhar do Crepúsculo, O Guardião do Portal, Golem da Starlight, Gelo Eterno, Monstruosidade Lunar, Emaranhado e Crânio Emaranhado.

## Integração com o Mundinho

- Todos os cards apontam para `/mods#guide-eternal-starlight`.
- Gatekeeper → `/progressao#progression:530`.
- Lunar Monstrosity → `/progressao#progression:540`.
- Starlight Golem → `/progressao#progression:550`.
- Tangled → `/progressao#progression:560`.
- Nenhum marco novo foi inventado.
- O total auditado sobe de 345 para **375/431**.

## Fontes principais

- `gradle.properties` na revisão `e412e1e…`.
- `ESEntities.java` para IDs e MobCategory.
- `ESItems.java` para os 32 Spawn Eggs.
- `wip.json` para a exclusão explícita dos dois ovos WIP.
- `en_us.json` e `pt_br.json` históricos para nomenclatura.
- Classes específicas de The Gatekeeper, Starlight Golem, Lunar Monstrosity e Tangled para os cards full.
