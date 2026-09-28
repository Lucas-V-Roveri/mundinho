# Bestiário — Lote 5A

## Escopo

O Lote 5A cria a infraestrutura do Bestiário e calibra cinco perfis propositalmente diferentes antes da expansão em massa:

- Ignis — boss com invocação, fases e atributos configuráveis.
- Bone Serpent — hostil comum de dimensão, com loot table e regras ambientais.
- Crow — fauna domesticável, com chance de tame e comportamento utilitário.
- Zephyr — hostil voador da Aether, com regra de spawn e drop documentado.
- Bamboo Creeper — variante de mob vanilla implementada como entidade própria.

A auditoria preliminar encontrou **263 candidatos a criatura/entidade** nos mods de conteúdo do pack. Esse total é um inventário de trabalho, não uma declaração de que 263 cards estão plenamente verificados. Neste commit, **5 cards** têm detalhamento factual e rastreável.

## Regras de dado

- Nenhuma estatística numérica entra sem fonte explícita.
- Configurações que podem alterar comportamento aparecem como condição, não como verdade absoluta.
- Textura/imagem externa só aparece quando há origem atribuível; antes de marcar “visto”, a mesma imagem é exibida como silhueta.
- Cada card armazena suas fontes e status de confirmação.
- Os estados `seen`, `defeated` e `tamed` são registrados por jogador (`gr1d`/`benamu`) e não alteram XP, milestones ou checklists existentes.

## Persistência

Tabela: `public.mundinho_bestiary_state`.

Chave: `(world_id, mob_id, actor)`.

Campos rastreados por jogador: visto, derrotado e domesticado, com timestamps individuais. `defeated=true` ou `tamed=true` implica `seen=true`. Desmarcar “visto” limpa os estados derivados daquele card para não manter progresso impossível.

O modo sem Supabase usa armazenamento local separado em `mundinho.preview.bestiary.<worldId>`; em Supabase, o Bestiário usa Realtime em sua própria tabela.

## Fontes de calibração

### L_Ender's Cataclysm 3.33 — Ignis

- https://lendercataclysm.wiki.gg/wiki/Ignis
- https://github.com/lender544/new1.20.1/blob/6dd12cb6b44965ef5157091b6962d9d13d7fc099/src/main/java/com/github/L_Ender/cataclysm/entity/AnimationMonster/BossMonsters/Ignis_Entity.java

Nota: o repositório público usado como segunda fonte de implementação é da linha 1.20.1; o card sinaliza multiplicadores/configuração e não apresenta esse código como snapshot exato do JAR 3.33.

### Alex's Mobs Continued 2.1.14 — Bone Serpent / Crow

- https://github.com/Codx-org/AlexsMobsContinued/blob/ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021/src/main/java/com/github/alexthe666/alexsmobs/entity/EntityBoneSerpent.java
- https://github.com/Codx-org/AlexsMobsContinued/blob/ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021/src/main/resources/data/alexsmobs/loot_tables/entities/bone_serpent.json
- https://github.com/Codx-org/AlexsMobsContinued/blob/ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021/src/main/java/com/github/alexthe666/alexsmobs/entity/EntityCrow.java
- https://github.com/Codx-org/AlexsMobsContinued/blob/ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021/src/main/resources/data/alexsmobs/tags/items/crow_tameables.json
- https://github.com/Codx-org/AlexsMobsContinued/blob/ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021/src/main/resources/data/alexsmobs/loot_tables/entities/crow.json

### The Aether 1.5.10 — Zephyr

- https://aether.wiki.gg/wiki/The_Aether/Zephyr
- https://github.com/The-Aether-Team/The-Aether/blob/e07d30e16fbd0f09cc067b39594035e395dcf996/src/main/java/com/aetherteam/aether/entity/monster/Zephyr.java

### Creeper Overhaul 4.0.6 — Bamboo Creeper

- https://github.com/bonsaistudi0s/Creeper-Overhaul/blob/4403fba63e7503c7b99d2419c6264fdf1c696f9e/common/src/main/java/tech/thatgravyboat/creeperoverhaul/common/entity/CreeperTypes.java
- https://github.com/bonsaistudi0s/Creeper-Overhaul/blob/4403fba63e7503c7b99d2419c6264fdf1c696f9e/neoforge/src/main/resources/data/creeperoverhaul/neoforge/biome_modifier/bamboo.json
- https://github.com/bonsaistudi0s/Creeper-Overhaul/blob/4403fba63e7503c7b99d2419c6264fdf1c696f9e/common/src/main/resources/data/creeperoverhaul/loot_table/entities/bamboo_creeper.json

## Aceite do 5A

- rota `/bestiario` e item na navegação;
- busca global indexa os cinco mobs;
- filtros persistem no navegador;
- estado por jogador salva em Supabase e atualiza via Realtime;
- modo local continua funcional sem Supabase;
- nenhuma mudança nos IDs, total de milestones, XP, Supabase de checklist ou import/export existente;
- 5B–5D podem aumentar apenas `BESTIARY_ENTRIES`/auditoria, reutilizando a infraestrutura criada aqui.
