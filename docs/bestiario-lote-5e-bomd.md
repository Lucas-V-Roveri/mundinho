# Bestiário — Lote 5E · Bosses of Mass Destruction

## Fonte de verdade

Versão instalada no pack: `BOMD-NeoForge-1.21-1.3.3.jar`.

A página oficial do port NeoForge confirma a build 1.3.3 para Minecraft 1.21/1.21.1. O código auditado usa a revisão `CERBON-MODS/Bosses-of-Mass-Destruction-FORGE@1a7bd955d201d1b4d066157b8335cd967677e209`, cujo `gradle.properties` fixa `mod_version=1.3.3` e inclui 1.21.1 nos game versions publicados.

## Reconciliação do alvo 4

`BMDEntities.java` registra quatro bosses como `MobCategory.MONSTER`:

- `bosses_of_mass_destruction:lich` → Night Lich
- `bosses_of_mass_destruction:obsidilith` → Obsidilith
- `bosses_of_mass_destruction:gauntlet` → Nether Gauntlet
- `bosses_of_mass_destruction:void_blossom` → Void Blossom

As outras entidades do registry são projéteis/auxiliares `MISC` — Blue Fireball, Comet, Soul Star, Charged Ender Pearl, Spore Ball e Petal Blade — e não viram cards.

Resultado: **4 cards full, 0 compact**.

## Localização e Progressão

- Void Blossom → cavernas raras no fundo do Overworld; Void Lilies apontam o caminho → `progression:860`.
- Night Lich → torres raras em biomas frios; Soul Stars localizam as torres → `progression:870`.
- Nether Gauntlet → estrutura rara do Nether → `progression:880`.
- Obsidilith → estrutura rara nas ilhas do End → `progression:890`.

A Progressão existente já trata os quatro encontros como endgame independentes. Nenhum marco novo foi criado.

## Dados configuráveis

A build 1.3.3 possui arquivos específicos de configuração para os quatro bosses (`LichConfig`, `ObsidilithConfig`, `GauntletConfig`, `VoidBlossomConfig`). Vida, armadura, ataque/efeitos e parâmetros de geração podem ser alterados pelo pack.

Por isso os cards não congelam números default como se fossem invariantes; registram as mecânicas e localizações confirmadas e apontam para a configuração versionada.

## Idioma

A revisão 1.3.3 possui `en_us.json`, mas não `pt_br.json`. Para não inventar traduções oficiais, os quatro cards preservam os nomes em inglês: Night Lich, Obsidilith, Nether Gauntlet e Void Blossom.

## Integração

- Todos os cards apontam para `/mods#guide-bomd`.
- Progressão: `860`, `870`, `880`, `890`.
- O total auditado sobe de **404 para 408/431**.
- Restam **23** alvos aprovados do Lote 5E após este sub-lote.

## Fontes principais

- CurseForge — build `BOMD-NeoForge-1.21-1.3.3.jar`.
- `gradle.properties` da revisão auditada.
- `BMDEntities.java` para os IDs e o corte MONSTER × MISC.
- `en_us.json` para nomes oficiais, advancements e pistas de mecânica.
- arquivos `*Config.java` dos quatro bosses para registrar que números e geração são configuráveis.
