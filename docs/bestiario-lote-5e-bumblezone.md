# Bestiário — Lote 5E · The Bumblezone

## Escopo publicado

Versão instalada e auditada: `the_bumblezone-7.15.3+1.21.1-neoforge.jar` / `mod_version=7.15.3`.

A revisão primária usada para fechar o registry é `78c52256e38a537a31839b264e6058138e6cb4e8`, que contém o version bump para 7.15.3.

Entram 6 criaturas:

- `the_bumblezone:variant_bee` — compact
- `the_bumblezone:honey_slime` — compact
- `the_bumblezone:beehemoth` — full
- `the_bumblezone:bee_queen` — full
- `the_bumblezone:rootmin` — compact
- `the_bumblezone:cosmic_crystal_entity` — full

Total do sub-lote: **6 cards = 3 full + 3 compact**.

## Critério de inclusão

`BzEntities.java` registra cinco mobs convencionais em `MobCategory.CREATURE`/`MONSTER`: Variant Bee, Honey Slime, Beehemoth, Bee Queen e Rootmin.

`Cosmic Crystal Entity` aparece em `MobCategory.MISC`, mas entra porque `CosmicCrystalEntity` estende `LivingEntity`, recebe atributos próprios e implementa combate de arena/Essence Event. Portanto não é projétil, efeito visual ou parte técnica de outro mob.

Ficam fora deste lote as entidades não-vivas registradas para projéteis/efeitos e `Sentry Watcher`, cuja classe está no pacote `entities.nonliving` e não recebe atributos de criatura no `registerEntityAttributes`.

## Profundidade

### Full

- **Beehemoth**: domesticação, amizade, sela e montaria voadora são mecânicas centrais e diretamente documentadas no código.
- **Bee Queen**: núcleo da linha `Queen's Desire`, sistema de trades e entrega da `Essence of the Bees`.
- **Cosmic Crystal Entity**: combate de Essence Event com estados de esmagamento/giro, múltiplos lasers, shield e escala de dificuldade.

### Compact

- Variant Bee
- Honey Slime
- Rootmin

Os compactos mantêm registry, nome, comportamento, perigo, tracking e somente detalhes finos que a revisão 7.15.3 sustenta diretamente.

## Fontes primárias

- `common/src/main/java/com/telepathicgrunt/the_bumblezone/modinit/BzEntities.java`: registry, categorias e conjunto de entidades com atributos.
- `common/src/main/resources/assets/the_bumblezone/lang/en_us.json`: chaves literais e nomes em inglês.
- `common/src/main/resources/assets/the_bumblezone/lang/pt_br.json`: traduções oficiais dos nomes.
- `gradle.properties`: `mod_version=7.15.3`.
- Classes individuais de Beehemoth, Bee Queen, Honey Slime, Rootmin, Variant Bee e Cosmic Crystal para mecânicas publicadas.
- `BzGeneralConfigs.java`: `cosmicCrystalHealth=60` por padrão e parâmetros relacionados.

## Integração no Mundinho

- Bee Queen aponta para `/progressao#progression:450`.
- Cosmic Crystal aponta para `/progressao#progression:470`.
- Os 6 cards apontam para `/mods#guide-bumblezone`.
- O cabeçalho do Bestiário passa de 317 para **323 cards auditados de 431**.

Nenhum dado de `Dream Relics` ou `Twilight Eye` foi alterado.
