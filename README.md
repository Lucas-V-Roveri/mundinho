# Mundinho · pra sempre

Wiki e diário de progressão do foreverworld de Minecraft Java 1.21.1 / NeoForge de **gr1d + benamu**.

## Estado atual

**Fase 4 concluída — Lotes 1 a 4**

- 6 páginas: Início, Progressão, Mods, Amendments, Extras e Bastidores.
- Persistência compartilhada em Supabase, sem login.
- Seletor local `gr1d` / `benamu` por dispositivo.
- Checklists com autoria e timestamp.
- Itens personalizados com soft delete.
- Realtime, export/import JSON e migração de progresso legado.
- Busca global `/`, accordions, toasts estilo advancement, barra de XP e chunk loading.
- `prefers-reduced-motion` respeitado; som opt-in.
- Skins reais de gr1d e benamu.
- Guias de dimensões, chefes, utilidade, sobrevivência, decoração e automação baseados na fonte de verdade das Fases 1 e 2.
- Página fixa de Amendments organizada por tema.
- Extras com 18 objetivos de carinho já cadastrados e botão de sugestão de novas ideias.
- Bastidores com os 87 mods classificados nessa categoria e a função curta de cada um.

## Supabase

Projeto usado em produção: `mundinho-pra-sempre`, região `sa-east-1` (São Paulo), plano Free / Nano.

A aplicação usa `mundinho_item_state` e `mundinho_custom_items` para estado/checklists e itens adicionados. O schema inicial versionado está em `supabase/migrations/001_initial_schema.sql`; migrations adicionais aplicadas no projeto alinham o schema de runtime e Realtime.

## Variáveis no Vercel

Configure no projeto Vercel:

```text
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

A aplicação lê essas variáveis por `/api/config`. A publishable key pode chegar ao navegador; **não** use `service_role` no frontend.

## Publicação

O repositório está ligado ao Vercel pelo Git. Cada push em `main` dispara o deploy automaticamente. O fluxo não depende mais da ação `deploy_to_vercel` do conector.

## Desenvolvimento local

Para o fluxo completo, use a CLI do Vercel com as variáveis acima configuradas. Sem `/api/config`, o site entra em **Prévia local** e usa `localStorage` apenas para testar a interface.

## Estrutura

- `index.html` — shell, dialogs e navegação.
- `bootstrap.js` — carrega configuração e os lotes antes/depois da aplicação.
- `api/config.js` — Vercel Function que expõe somente URL + publishable key.
- `styles.css` — identidade visual Minecraft/diário feito à mão.
- `content.js` — guias de calibração da Fase 3.
- `lote2-*.js` — dimensões e chefes.
- `lote3-*.js` — utilidade, sobrevivência, decoração e automação; `lote3-refine.js` refina receitas confirmadas.
- `lote4-content.js` / `lote4-runtime.js` — Amendments, Extras e Bastidores.
- `app.js` — SPA, UI, busca, accordions, progresso, export/import e ações.
- `db.js` — adapter Supabase + modo local de prévia.
- `supabase/migrations/` — schema versionado.
- `assets/` — skins reais.
- `vercel.json` — configuração/headers para deploy.

## Itens ainda a conferir

- `Dream Relics` — não classificar nem usar como pré-requisito até teste in-game.
- `Twilight Eye` — não classificar nem usar como pré-requisito até teste in-game.
- Coexistência dos dois JARs listados de `Ferrite Core`, `ImmediatelyFast` e `ModernFix` — apenas conferir a pasta/modpack; não foi presumido conflito.
- Alguns craftings de mods cuja versão pública não expõe recipe data suficiente permanecem marcados como `Média` ou `Baixa-conferir` e apontam para JEI apenas como último recurso por item.
