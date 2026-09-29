# Bestiário — Lote 5E · Twilight Forest

## Escopo publicado

- Mod: The Twilight Forest
- Minecraft: 1.21.1
- Loader: NeoForge
- Build do pack: 4.8.3345
- Cards adicionados: 58
- Profundidade: 9 `full` e 49 `compact`

## Fontes primárias

A lista foi fechada contra a revisão histórica oficial `008085c660f1f9fc9aad6376ea0dc8080b3c0629`, datada de 22/03/2026, no mesmo dia da build 4.8.3345.

- `src/main/java/twilightforest/init/TFEntities.java`: registry e `MobCategory`.
- `src/generated/resources/assets/twilightforest/lang/en_us.json`: IDs literais `entity.twilightforest.<id>` e nomes publicados.
- CurseForge file `7797302`: artefato oficial `twilightforest-1.21.1-4.8.3345-universal.jar`.

## Reconciliação do registry

O registry contém 59 entidades em `MobCategory.MONSTER` ou `MobCategory.CREATURE`.

- `PlateauBoss` foi excluído do Bestiário: permanece como placeholder do Final Castle, não como encontro jogável publicado nesta build.
- `RisingZombie` foi mantido: é uma entidade `MONSTER` real e registrada, embora use `buildNoEgg` e não possua Spawn Egg.
- Entidades `MISC`, projéteis, efeitos, armadilhas e objetos auxiliares não entram como cards de criatura.

Resultado: **58 cards**.

## Profundidade

O Lote 5E introduz `BestiaryEntry.depth` de forma retrocompatível:

- ausência do campo = renderer legado completo, preservando os 259 cards anteriores;
- `compact` = card enxuto para criatura comum;
- `full` = card completo para chefe ou mecânica própria relevante.

Cards `full` neste sub-lote:

- Naga
- Twilight Lich
- Minoshroom
- Hydra
- Knight Phantom
- Ur-Ghast
- Alpha Yeti
- Snow Queen
- Questing Ram

Os oito encontros de progressão reutilizam apenas localização, progressão e drops/utilidades que já estavam auditados em `data/wiki-catalog.ts`. O Questing Ram recebe card completo porque a própria advancement da build confirma uma interação especial; itens/quantidades não são presumidos.

## Lacunas deliberadas

Para os cards compactos, localização fina, HP, dano, drops e mecânicas ficam omitidos quando não foram auditados individualmente. O Lote 5E prioriza cobertura correta do registry sem inventar detalhes para preencher o card.

`Dream Relics` e `Twilight Eye` não foram alterados.
