# Bestiário — Lote 5E · The Graveyard

## Fonte de verdade

Arquivo instalado/publicado para o alvo: `graveyard-2.6.2 NeoForge 1.21.1.jar` (Minecraft 1.21.1, NeoForge).

Revisão pública auditada do port: `SmartStreamLabs/The-Graveyard-Unofficial-Port-@8fb0cd3f4ed556eb53336ed03ba6000d997b858d`.

### Divergência documentada

O JAR 1.21.1 2.6.2 existe e é publicado oficialmente pelo port. Porém, o `gradle.properties` da revisão pública 2.6.2 já aponta `minecraft_version=26.1`, embora mantenha `mod_version=2.6.2`.

Portanto:

- o **arquivo do pack** é a fonte para versão/plataforma;
- `TGEntities.java` da revisão 2.6.2 é usado para reconciliar o registry;
- o Bestiário **não** trata esse source tree como snapshot byte-a-byte do JAR 1.21.1;
- qualquer afirmação mais específica que dependa dessa diferença é omitida.

## Reconciliação do alvo 13

`TGEntities.java` registra 14 entity types. Treze são criaturas vivas de gameplay e uma é um projétil:

### Entram — 13

- `graveyard:skeleton_creeper`
- `graveyard:acolyte`
- `graveyard:reaper`
- `graveyard:ghoul`
- `graveyard:nightmare`
- `graveyard:revenant`
- `graveyard:falling_corpse`
- `graveyard:lich` → Corrupted Champion
- `graveyard:wraith`
- `graveyard:corrupted_pillager`
- `graveyard:corrupted_vindicator`
- `graveyard:ghouling`
- `graveyard:nameless_hanged`

### Fica fora

- `graveyard:skull` — `MobCategory.MISC`, projétil do Corrupted Champion.

Resultado: **13 cards = 1 full + 12 compact**.

## Card full

### Corrupted Champion

- Registry ID: `graveyard:lich`.
- Nome exibido oficial: `Corrupted Champion`.
- Boss bar confirmada no código.
- O código e os subtitles confirmam três fases e transições, além de skulls, corpse spell, summon, levitation e healing.
- O próprio código usa valores vindos de `GraveyardConfig`, então o card não congela números como invariantes.
- Progressão existente: `progression:620`.
- Guia existente: `/mods#guide-graveyard`.

O advancement oficial descreve a invocação no altar do Lich à noite usando um vial de sangue cheio e os três fragmentos do Bone Staff.

## Ghouling

O README do port confirma que Ghouling:

- é invocado pelo Bone Staff;
- é leal ao jogador que o invocou;
- segue e teleporta até o mestre;
- pode ser re-invocado pelo mestre após morrer.

Por isso o card usa também o tracker `tamed`, representando o vínculo de dono já existente no gameplay.

## Idioma

A revisão auditada possui `en_us.json`, mas não `pt_br.json`. Os nomes oficiais ingleses são preservados em vez de inventar traduções.

## Integração

- Todos os cards apontam para `/mods#guide-graveyard`.
- Corrupted Champion aponta para `/progressao#progression:620`.
- Nenhum ID ou marco existente foi alterado.
- O total auditado sobe de **408 para 421/431**.
- Restam **10** alvos aprovados do Lote 5E: MCA 3 + Ecologics 2 + Incendium 5.

## Fontes principais

- CurseForge — arquivo `graveyard-2.6.2 NeoForge 1.21.1.jar`.
- `TGEntities.java` — registry e corte criatura × projétil.
- `en_us.json` — nomes, subtitles e advancements.
- `LichEntity.java` — fases, boss bar e mecânicas afirmadas no card full.
- `README.txt` — comportamento documentado do Ghouling.
