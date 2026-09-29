# Bestiário — Lote 5E · Mowzie's Mobs

## Fonte de verdade

Versão instalada no pack: `mowziesmobs-1.21.1-1.8.2.jar`.

Revisão oficial auditada: `BobMowzie/MowziesMobs-Public@7aa17309337cbd4102efc418cba12a4983b1540c`, commit `1.8.2 update`.

O próprio `gradle.properties` dessa revisão fixa `mod_version=1.8.2`, `minecraft_version=1.21.1` e NeoForge. O inventário usa `EntityHandler.java` como fonte primária e cruza os nomes com `en_us.json` e `pt_br.json`.

## Reconciliação do alvo 18

O início do registry registra exatamente 18 entidades vivas de gameplay antes de entrar no bloco de entidades de efeito, projéteis e auxiliares:

- `foliaath`
- `baby_foliaath`
- `ferrous_wroughtnaut`
- `umvuthana_follower_raptor`
- `umvuthana_follower_player`
- `umvuthana_crane_player`
- `umvuthana`
- `umvuthana_raptor`
- `umvuthana_crane`
- `umvuthi`
- `frostmaw`
- `grottol`
- `lantern`
- `naga`
- `sculptor`
- `bluff`
- `elokosa_follower_howler`
- `elokosa_howler`

Depois desse conjunto, `EntityHandler.java` passa a registrar `sunstrike`, `solar_beam`, boulders/projéteis/plataformas, pillars, `axe_attack`, `ice_breath`, `ice_ball`, `frozen_controller` e outros auxiliares. Eles **não** viram cards.

Seguidores Umvuthana/Elokosa permanecem no alvo porque são entidades vivas distintas usadas pelo gameplay, não efeitos visuais/projéteis. Tongbi (`sculptor`) também permanece mesmo em `MobCategory.MISC`, pois é o NPC/encontro do teste de Geomancy.

## Profundidade

### Full — 3

- `mowziesmobs:ferrous_wroughtnaut` → `progression:770`
- `mowziesmobs:frostmaw` → `progression:780`
- `mowziesmobs:umvuthi` → `progression:790`

A Progressão existente já define os três encontros como uma trilha paralela de dificuldade alta, sem dependência rígida entre eles. Nenhum marco novo foi criado.

Valores-base confirmados no código 1.8.2:

- Ferrous Wroughtnaut: 40 HP, atributo de ataque 30, estado próprio de vulnerabilidade.
- Frostmaw: 250 HP, atributo de ataque 10, ataques físicos/gelo e estado ligado ao Ice Crystal.
- Umvuthi: `MAX_HEALTH = 150`, boss abilities para Sunstrike, Solar Beam, Supernova e invocação de seguidores.

Os cards registram esses valores como base e deixam explícito que configurações do mod podem alterar multiplicadores em runtime.

### Compact — 15

- Foliaath
- Baby Foliaath
- Umvuthana Follower (Raptor)
- Umvuthana Follower (Player)
- Umvuthana Crane (Player)
- Umvuthana
- Umvuthana Raptor
- Umvuthana Crane
- Grottol
- Lantern
- Naga
- Tongbi, the Sculptor
- Bluff
- Elokosa
- Elokosa Howler

## Idiomas

O `pt_br.json` 1.8.2 fornece traduções como:

- Foliata
- Foliata Filhote
- Forjonauta Férreo
- Falcão Umvuthana
- Garça Umvuthana
- Umvuthi, o Pássaro do Sol
- Congedíbula
- Grutáceo
- Lanterno
- Tongbi, o Escultor
- Rochedo

A linha Elokosa foi adicionada recentemente e o `en_us.json` possui `Elokosa` e `Elokosa Howler`, mas o `pt_br.json` da mesma revisão ainda não traz essas chaves. Para não inventar tradução, os cards preservam os nomes ingleses.

## Integração com o Mundinho

- Todos os 18 cards apontam para `/mods#guide-mowzies-mobs`.
- Ferrous Wroughtnaut → `/progressao#progression:770`.
- Frostmaw → `/progressao#progression:780`.
- Umvuthi → `/progressao#progression:790`.
- Nenhum marco ou ID existente foi alterado.
- O total auditado sobe de **386 para 404/431**.
- Restam 27 alvos do Lote 5E após este sub-lote.

## Fontes principais

- `gradle.properties` na revisão `7aa1730…` para versão exata.
- `EntityHandler.java` para registry, `MobCategory` e corte entre criaturas e auxiliares.
- `en_us.json` e `pt_br.json` para nomes oficiais.
- `EntityWroughtnaut.java`, `EntityFrostmaw.java` e `EntityUmvuthi.java` para atributos e mecânicas afirmadas nos cards full.
- Página oficial do Mowzie's Mobs no CurseForge para descrição dos encontros, ambientes e recompensas principais.
