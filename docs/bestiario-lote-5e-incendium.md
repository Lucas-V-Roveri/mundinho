# Bestiário · Lote 5E — Incendium

## Alvo fechado

Versão-alvo: **Incendium 5.4.4 · Minecraft 1.21.1**.

Inventário aprovado: **5 cards**.

- Hovering Inferno — full; tipo-base `minecraft:blaze`
- Pipeline Sentry — compact; tipo-base `minecraft:blaze`
- Sanctum Cultist — compact; tipo-base `minecraft:pillager`
- Sanctum Inferno — compact; encounter/variante sobre tipo vanilla, sem EntityType `incendium:*` inventado
- Nether Reactor — compact; encounter/estrutura `incendium:nether_reactor`

## Regra de modelagem

Incendium é datapack e cria grande parte de seus mobs especiais usando entidades vanilla + tags/NBT/functions. O Bestiário portanto registra o **tipo-base real** quando verificável, em vez de fabricar IDs como `incendium:pipeline_sentry`.

A fonte oficial confirma, entre outros pontos, que Hovering Inferno é invocado como Blaze; Pipeline Sentry é processado como Blaze com `in.sentry`; Sanctum Cultist é um Pillager com `in.sanctum_cultist`; e Nether Reactor é uma estrutura real do worldgen com mobs especiais próprios.

Fonte principal: https://github.com/Stardust-Labs-MC/Incendium/tree/fedbebcef160c47aca4e8bdfa82fc7473b7eabee

Resultado: **5/5**.
