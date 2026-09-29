# Bestiário — Lote 5D

Data de auditoria: 2026-09-29. Base: `main`/`feat/bestiario-lote5d` em `b98237e7` (Lote 5C).

## Resultado

O Lote 5D adiciona **104 cards confirmados**, levando o catálogo detalhado de **155 para 259 cards**. O checksum bruto anterior previa 108 candidatos; ele não foi tratado como meta de cards. A diferença de 4 vem integralmente do Spider Overhaul: o inventário antigo esperava 10 adições, enquanto a versão 0.0.6 registra 11 variantes no código mas documenta apenas 6 como implementadas em survival.

| Grupo | Cards no 5D | Regra aplicada |
| --- | ---: | --- |
| L_Ender's Cataclysm 3.33 | 38 | Ignis já está no 5A; `MISC`, projéteis, efeitos e partes técnicas excluídos |
| Creeper Overhaul 4.0.6 | 15 | Bamboo Creeper já está no 5A |
| Friends&Foes 4.0.27 | 10 | `ice_chunk` e `player_illusion` excluídos como entidades técnicas |
| Enderman Overhaul 2.0.3 | 18 | apenas variantes jogáveis; pets/summons/auxiliares excluídos |
| Variants&Ventures 1.0.26 | 4 | Gelid, Murk, Thicket e Verdant |
| Illager Invasion 21.1.6 | 11 | onze entidades com chaves/Spawn Eggs próprios |
| Piglin Proliferation 2.0.15 | 2 | Piglin Alchemist e Piglin Traveler |
| Spider Overhaul 0.0.6 | 6 | somente variantes declaradas como implementadas em survival |

## Política de dados

Este lote prioriza **cobertura factual do registry**. Nome, mod, versão, registry ID e classificação de entidade entram quando confirmados. Habitat é usado quando existe um vínculo direto e verificável com o nome/biome modifier; vida, dano, drops, tame e gatilhos de encontro não são preenchidos por inferência. Cards sem auditoria mecânica individual mantêm esses campos ausentes e registram a limitação em `notes`.

Todos os drops deste lote permanecem vazios até validação específica; portanto a regra permanente “todo drop listado precisa de `Para que serve`” continua preservada sem criar receitas ou usos especulativos.

## Spider Overhaul — divergência do checksum

A fonte oficial do projeto diz que há 11 criaturas registradas, mas só 6 fazem parte de survival na versão atual: Birch Spider, Desert Spider, Swamp Spider, Cavern Spider, Jungle Spider e Ice Spider. Sculk, Mushroom, Ocean, Taiga e Savanna permanecem fora até o próprio mod promovê-las ao fluxo jogável.

## Fora do escopo deste lote

O total `263` continua sendo um checksum histórico, não o total final do Bestiário. O Lote 5E ainda deve reconciliar conteúdo fora desse checksum (por exemplo Twilight Forest, Bumblezone, Eternal Starlight, Deeper and Darker, Undergarden, Mowzie's Mobs/Mowzie's Cataclysm, Integrated Cataclysm e outros já previstos no checkpoint). Dream Relics e Twilight Eye continuam **a conferir**, sem pesquisa ou presunção.
