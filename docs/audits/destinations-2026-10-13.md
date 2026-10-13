# Destinos — lote autorizado de 13/10/2026

Base: main f89e9cf, 127 marcos. Apenas #240/#250/#260/#265/#600/#610.

| Marco | Subitens antes | Ativos depois | Novos IDs | IDs arquivados |
|---|---:|---:|---:|---:|
| 240 | 0 | 3 | 3 | 0 |
| 250 | 5 | 9 | 5 | 1 |
| 260 | 3 | 3 | 3 | 3 |
| 265 | 4 | 6 | 6 | 4 |
| 600 | 3 | 7 | 6 | 2 |
| 610 | 5 | 5 | 0 | 0 |

Os 127 IDs de marco são preservados. #610 perde o gate hard em #600, que vira recomendação soft; os cinco subitens do ritual continuam idênticos.

Os IDs substituídos ficam em `archivedSubitems`, fora do cálculo dos objetivos ativos e disponíveis na interface como histórico. Nenhum registro pessoal/compartilhado é apagado, convertido ou criado pela migração. #240 já concluído não completa seus três destinos novos.

Lista integral dos IDs, campos e textos: `data/progression-destinations-2026-10-13.json`; relação antes/depois: `data/progression-destinations-manifest.json`.

Validação: testes de preservação dos 127 IDs e dos IDs de subitem; isolamento por jogador; evidência genérica não promovida; #610 disponível sem catálogo #600 completo; typecheck, lint e build. Migração usa hash/lock da Progressão para abortar em caso de alteração concorrente.

Fora do escopo: Alex’s Caves; #190; #360–390; estruturas condicionais WDA/D&T; novos cards do Bestiário. Nenhuma conclusão é inferida a partir de subitem legado.
