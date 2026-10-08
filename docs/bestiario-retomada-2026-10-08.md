# Revisão da retomada — 2026-10-08

A main em `88ad0069d3be9dd9b80c61996649569b4bddd585` já contém todos os 21 grupos posteriores ao canário BOMD. Não há lote de dados restante: 431 cards em 22 grupos, 2.715 linhas, 429 cards com imagem e duas ausências explícitas (Raider/MCA e Sanctum Inferno/Incendium). Permanecem 18 cards com exceções documentadas.

## Evidências revistas

- CSV integral regenerado a partir do catálogo: byte a byte idêntico ao publicado, 431 pares Mob/Mod únicos, 2.715 linhas e 14 campos não vazios por linha.
- Suite de auditoria: cobertura por grupo, associação de mobs, varredura de corrupção, mecanismo/uso/confiança/fontes, PNGs e âncoras específicas de crafting.
- IDs, registryIds e flags comparados com o canário aprovado `0b01cddb7fbcbcb9cecabf7a54754eb79ed98ad5`, e não com o próprio HEAD.
- `lib/bestiary-state.ts`, `lib/supabase/browser.ts` e `types/content.ts` permanecem byte a byte iguais ao canário. Nenhuma escrita de progresso foi executada nesta retomada.
- Página publicada: 22 contadores somam 431; mostrar tudo ativo por padrão, Supabase compartilhado carregado. Grim Reaper apresenta Scythe por `dropCustomDeathLoot`, uso explícito e link específico para Staff of Life, com guia separado de todas as receitas MCA.
- Deploy Vercel e Production browser smoke de `88ad006` passaram. O CI falhou no guard de mídia: uma regex exigia o formato antigo `BESTIARY_ENTRIES = enrichBestiaryEntries([` e rejeitava a integração `integrateBestiaryAudits(...)`.

## Correções desta retomada

O teste de enriquecimento agora carrega o catálogo publicado e verifica uso/confiança de cada recompensa, sem depender do formato da expressão. A suite dos 431 cards foi incluída no CI e em `npm run verify`; a comparação de preservação usa o commit fixo do canário, com histórico disponível no checkout do CI. O carregador TypeScript é compartilhado entre as duas suites.

A nota geral de MCA na seção de auditoria foi alinhada aos próprios cards: Raider não confirmado e Tombstone restaurando o tipo/NBT salvo, sem prometer sempre zombie villager. Nenhuma linha de dados, mídia, ID, flag, receita ou lógica de persistência foi alterada.

Validação local: 22 testes (3 progressão, 10 mídia, 7 auditoria, 2 sincronização Minecraft), typecheck, lint e build aprovados.

[Tabela integral dos 431 cards](../public/bestiary/auditoria/bestiario-431-cards.csv) · [Cobertura e exceções](../public/bestiary/auditoria/integracao-431-cards.json) · [Integração original](bestiario-integracao-431-2026-10-08.md)
