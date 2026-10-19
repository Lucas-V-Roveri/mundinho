# Técnicas e catálogos vanilla · 19/10/2026

Conteúdo aprovado pelo usuário: um card `minecraft-tecnicas`, 16 seções e links nos 16 marcos existentes. Nenhum ID novo, mudança de regra, subitem, checklist ou escrita de progresso. Main de partida: `4a67c0490dcd56da6ac3247a845c93c7f6ae4926`.

|Marco|Seção em `/mods#guide-minecraft-tecnicas-…`|
|---|---|
|12|vanilla-12|
|13|vanilla-13|
|14|vanilla-14|
|15|vanilla-15|
|16|vanilla-16|
|17|vanilla-17|
|18|vanilla-18|
|46|vanilla-46|
|155|vanilla-155|
|166|vanilla-166|
|225|vanilla-225|
|226|vanilla-226|
|227|vanilla-227|
|228|vanilla-228|
|231|vanilla-231|
|990|vanilla-990|

## Dados e comportamento

Snapshot anterior: 143 marcos, 36 guias, 110 registros pessoais, 52 compartilhados, 20 personalizados, 90 evidências, 53 regras, 11 estados do Bestiário e zero eventos do Bestiário. A consulta das evidências reutiliza o hook existente, uma vez na página Mods; a projeção é somente leitura e separa os jogadores. Catálogos são calculados do upload atual, não de contadores congelados. Ausência no upload não é prova de ausência atual no mundo.

As quatro tabelas de apoio ficam nas seções #14, #155, #46 e #990. Arqueologia conserva os dois grupos AND (fragmento E qualquer escavação), sem exigir 7/7. A tabela de #166 é consulta opcional, preservando a marcação manual de ambos apesar do upload antigo 1/9. Critérios não viram subitens e nunca alteram conclusão só por contagem.

Conteúdo canônico em `data/minecraft-techniques-2026-10-19.json`; links em `data/minecraft-techniques-links-2026-10-19.json`. Publicação de dados é transacional: bloqueia somente a linha editorial da Progressão, confere os 143 IDs, insere o guia e acrescenta somente `guideLinks` aos 16 objetos atuais. Não substitui marcos por versões antigas nem executa DML em tabelas pessoais. Os 36 guias anteriores são preservados.

Testes locais: 13 testes de guias (incluindo isolamento, atualização dos critérios, arqueologia alternativa, manual #166 e preservação dos 143 objetos exceto links), 22 de sincronização Minecraft, quatro de destinos, typecheck, lint e build de produção. Verificação de publicação e comparação pós-Supabase registradas no relatório da entrega após a gravação.
