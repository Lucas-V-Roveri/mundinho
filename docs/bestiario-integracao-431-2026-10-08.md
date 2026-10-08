# Integração Bestiário — 2026-10-08

431 cards, 22 grupos e 2.715 linhas no esquema de 14 campos. 429 cards têm imagem auditada vinculada; 2 têm ausência explícita. Os 431 IDs, registryIds e flags existentes foram preservados. Nenhuma escrita Supabase foi executada; cinco registros consultados permaneceram idênticos. Mostrar tudo continua ligado por padrão; accordion e renderização lazy preservados.

[Tabela integral](../public/bestiary/auditoria/bestiario-431-cards.csv) · [Índice de cobertura e exceções](../public/bestiary/auditoria/integracao-431-cards.json)

| Grupo | Cards | Linhas | Cards com exceções de pesquisa/compatibilidade |
|---|---:|---:|---:|
| L_Ender's Cataclysm | 39 | 105 | 1 |
| Alex's Mobs Continued | 90 | 286 | 1 |
| The Aether | 20 | 242 | 0 |
| Creeper Overhaul | 16 | 70 | 0 |
| Alex's Caves | 43 | 163 | 0 |
| Friends&Foes | 10 | 29 | 0 |
| Enderman Overhaul | 18 | 62 | 0 |
| Variants&Ventures | 4 | 26 | 0 |
| Illager Invasion | 11 | 43 | 1 |
| Piglin Proliferation | 2 | 50 | 0 |
| Spider Overhaul | 6 | 25 | 0 |
| The Twilight Forest | 58 | 248 | 4 |
| The Bumblezone | 6 | 781 | 1 |
| Eternal Starlight | 30 | 154 | 2 |
| The Undergarden | 22 | 60 | 0 |
| Deeper and Darker | 11 | 37 | 3 |
| Mowzie's Mobs | 18 | 79 | 0 |
| Bosses of Mass Destruction | 4 | 63 | 0 |
| The Graveyard | 13 | 93 | 0 |
| Minecraft Comes Alive Reborn | 3 | 7 | 2 |
| Ecologics | 2 | 9 | 0 |
| Incendium | 5 | 83 | 3 |

18 cards têm exceções de pesquisa/compatibilidade explícitas em pelo menos um campo, incluindo as de localização e de lotes anteriores. Condicionais normais de gameplay, como a exceção de consumo em Creative, não entram nessa contagem. As condições originais permanecem na tabela. Raider e Sanctum Inferno são os dois cards sem imagem; não foi usada textura UV como substituto.

## Reconciliação de 430 e 431

O consolidado definitivo tinha 430 pares Mob/Mod e 2.711 linhas. O catálogo publicado já tinha 431 IDs porque incluía Villager Revive Tombstone como encounter conceitual auxiliar. Todos os IDs preexistentes foram mantidos. Esse card recebeu quatro linhas suplementares em 2026-10-08, separadas do consolidado original: Scythe, Staff of Life, devolução de inventário preexistente e a exceção de resolução de loot legado em 1.21.1. Total publicado: 2.715 linhas.

## Ajustes de representação

- MCA: Raider permanece sem identidade/imagem confirmadas; status legado corrigido para não documentado. Tombstone recria a entidade salva, sem prometer sempre zombie villager; imagem é exemplo masculino explícito. Função/pasta de loot legadas não foram promovidas a drops ativos confirmados. Código da tag 80bfe7d0 e decompilado da Scythe/JAR sustentam o suplemento.
- Graveyard: o ID legado Corrupted Champion aponta para graveyard:lich e recebeu os dados do Lich, sem mudança de ID nem duplicação de Corrupted Vindicator.
- Mowzie: variantes seguidoras que compartilhavam nome exibido foram mapeadas separadamente aos registros auditados.
- Outros rótulos reconciliados sem alteração de ID: Bee Variant/Variant Bee, Cave Centipede/Centipede Head, Forgotten Minion/Minion, S’Mog/Smog Mog, Rising Zombie/Zombie.
- Twilight: os dados definitivos dos lotes 1 e 2 foram importados do consolidado sem reauditoria.

Crafting de cada recompensa leva à receita específica; um link separado abre todas as receitas auditadas do mod. JSONs, caminhos, overlays e compatibilidades ficam explícitos, sem interpretar toda variante como receita universal do pack. As receitas originais de BOMD foram preservadas.

Validação por lote: testes de cobertura e preservação de IDs/flags/persistência, schema de 14 campos, uso em todas as recompensas, corrupção de células, imagem PNG ou exceção explícita, âncoras de receitas, typecheck, lint e build.
