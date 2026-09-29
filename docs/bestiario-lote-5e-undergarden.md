# Bestiário — Lote 5E · The Undergarden

## Escopo publicado

Versão instalada: `The_Undergarden-1.21.1-0.9.6.jar`.

Fonte histórica auditada: branch oficial `1.21`, commit `6d7f02deab3e2ad44692f7edf2dea1cca3ba747f`. O `gradle.properties` dessa revisão fixa `minecraft_version=1.21.1` e `mod_version=0.9.6`.

O registry `UGEntityTypes.java` fecha o alvo aprovado em **22 criaturas**:

- 21 entidades vivas no bloco normal/bosses;
- `undergarden:minion`, que fica em `MobCategory.MISC`, mas é `AbstractGolem`, recebe atributos e participa do gameplay como criatura aliada.

Ficam fora `boomgourd`, pebbles, goo ball, rotten blisterberry, blisterbomb, gronglets utilitários, spear, minion projectile e rotbelcher projectile.

## Profundidade

### Full — 4

- `undergarden:dweller` — montaria selável, reprodução com Underbeans e controle com Underbean on a Stick.
- `undergarden:stoneborn` — NPC neutro/merchant, trades próprios e comportamento especial fora da dimensão.
- `undergarden:minion` — Forgotten Minion/Máquina Esquecida, golem ranged criado pelo jogador e reparável com Forgotten Nugget.
- `undergarden:forgotten_guardian` — boss/guardião de Catacombs, 80 HP, alta defesa, imunidade a projéteis e efeitos e block breaking condicionado a mob griefing.

### Compact — 18

Rotling, Rotwalker, Rotbeast, Rotbelcher, Greater Dweller, Gwibling, Brute, Scintling, Gloomper, Nargoyle, Muncher, Sploogie, Gwib, Mog, S'Mog, Forgotten, Denizen e Mysterious Pot.

## Nomes e traduções

Os registry IDs vêm literalmente de `UGEntityTypes.java`. Os nomes em inglês vêm do `en_us.json` gerado da mesma revisão e as traduções usadas pelo card vêm do `pt_br.json` 0.9.6.

Exemplos confirmados: Brute → Bárbaro, Denizen → Cidadão, Dweller → Andarilho, Greater Dweller → Andarilho Maior, Gwibling → Boixinho, Forgotten Minion → Máquina Esquecida, Rotbeast → Podrão, Rotbelcher → Podrômito, Rotling → Podrito, Rotwalker → Podreiro, Scintling → Cintilinho, S'Mog → Fu-Musso, Sploogie → Cuspor e Stoneborn → Pedrudo.

`Mysterious Pot` tem chave no `en_us.json`, mas não no `pt_br.json` histórico 0.9.6; por isso o Bestiário preserva o nome inglês em vez de criar tradução própria.

## Integração com o Mundinho

- Todos os cards apontam para `/mods#guide-undergarden`.
- Forgotten Guardian aponta também para `/progressao#progression:430`, o marco existente “Catacombs → Forgotten Guardian”.
- `progression:410` e `progression:420` continuam representando acesso à dimensão e progressão de materiais; nenhum link artificial foi criado para mobs sem marco próprio.
- O total auditado sobe de 323 para **345/431**.

## Fontes principais

- `gradle.properties` da revisão histórica 0.9.6.
- `src/main/java/quek/undergarden/registry/UGEntityTypes.java`.
- `src/generated/resources/assets/undergarden/lang/en_us.json`.
- `src/main/resources/assets/undergarden/lang/pt_br.json`.
- Classes 0.9.6 de Dweller, Stoneborn, Minion, Forgotten Guardian, Mysterious Pot, Denizen e Gloomper para mecânicas específicas.

Nenhum dado de Dream Relics ou Twilight Eye foi alterado.
