# BOMD — canário da integração da calibração

Base da main verificada antes de editar: cb0f3c94873280df281f6d83de0cef80e1edb93e.

Quatro IDs existentes preservados: bomd-night-lich, bomd-nether-gauntlet, bomd-void-blossom e bomd-obsidilith. O catálogo do site permanece com431entradas;430é a contagem do inventário auditado. Nenhum card anterior foi removido.

| Card | Linhas de mecanismos/recompensas | Imagem |
| --- | ---: | --- |
| Night Lich | 28 | Render técnico separado |
| Nether Gauntlet | 3 | Render técnico separado |
| Void Blossom | 3 | Render técnico separado |
| Obsidilith | 29 | Render técnico separado |

Os14campos da calibração são preservados literalmente em data/bestiary-bomd-audit.json (BestiaryAuditRow). A apresentação usa o contrato BestiaryEntry: localização, mecanismo, quantidade/condição, Para que serve, confiança detalhada, origem de imagem, fontes e links de crafting. Sete receitas confirmadas da build1.3.3 estão no próprio Bestiário. Baús independentes da morte e contêineres/blocos pós-boss ficam separados do drop nativo; integração Blossom Eye requer addon, não é garantida no pack.

## Reconciliação do inventário

~436 era estimativa, não um inventário nominal comprovado. Não há evidência para afirmar seis exclusões exatas por existência não confirmada. Documentação do Lote5D registra quatro candidatos extras de Spider Overhaul excluídos do escopo survival. A diferença nominal entre431cards do site e430auditados é mca-villager-revive-tombstone: entrada conceitual de ressurreição que permanece publicada e com ID/progresso intactos. Não remover para ajustar um contador. O histórico435(263+172),431e~436 usa bases diferentes; a parte adicional da estimativa permanece não confirmada até inventário nominal.

## Corrupção

Varredura de61CSVs (171043células) e recursos JSON/MD/TS/TXT do consolidado. Oito ocorrências em sete arquivos eram cópias da mesma frase de fonte de Blossom Eye, explodida caractere por caractere. Recuperada por reversão exata do join; após correção, zero ocorrências. A frase é “JAR NeoForge End Remastered Additions 1.1.2 kpk4g0ld; também confirmado em 1.1.0 e 1.0.0.”. Os demais grupos não foram reescritos nem integrados neste canário.

## Persistência e validação

Sem migração SQL, inserts, upserts ou deletes por esta integração. lib/bestiary-state.ts e lib/supabase/browser.ts continuam byte-idênticos à base. IDs, registryIds, track flags, atores gr1d/benamu e todos os cards fora do BOMD preservados. Snapshot somente leitura da tabela de progresso obtido antes da publicação; comparação após publicação registra eventual alteração concorrente separadamente.

Mostrar tudo inicia ligado inclusive quando storage indisponível; preferência explícita de ocultar continua respeitada. Accordion por mod mantém montagem lazy. Mapeamento de encounters BOMD adicionado à função compartilhada de cross-link; nenhuma cópia das utilidades de drops adicionada em Mods/Progressão.

Checks: node --test tests/bestiary-bomd-canary.test.mjs; typecheck; lint; build; testes existentes de mídia/progressão; smoke visual desktop/mobile sem clicar flags de progresso. Publicação exclusivamente pela main via GitHub, deploy automático Vercel. Próximos21grupos aguardam validação explícita deste canário.

Resultado antes do commit: typecheck/lint/build e15testes existentes passaram;3testes específicos passaram. Smoke Chromium1280px e390px:4cards,63usos,4imagens carregadas,7receitas por seção,âncoras de crafting válidas, montagem lazy e zero erros de página/overflow. Cinco linhas existentes do Supabase comparadas sem alteração antes do push.
