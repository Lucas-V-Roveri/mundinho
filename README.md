# Mundinho · pra sempre

Wiki e diário de progressão do foreverworld de Minecraft Java 1.21.1 / NeoForge de **gr1d + benamu**.

## Estado atual

**Fase 4 · Lote 1**

- 6 páginas: Início, Progressão, Mods, Amendments, Extras e Bastidores.
- Persistência compartilhada em Supabase, sem login.
- Seletor local `gr1d` / `benamu` por dispositivo.
- Checklists com autoria e timestamp.
- Itens personalizados com soft delete.
- Realtime, export/import JSON e migração de progresso legado.
- Busca global `/`, accordions, toasts estilo advancement, barra de XP e chunk loading.
- `prefers-reduced-motion` respeitado; som opt-in.
- Skins reais de gr1d e benamu.
- 3 guias de calibração aprovados: **Ignis**, **Twilight Forest** e **Sophisticated Backpacks**.

## Supabase

Projeto usado em produção: `mundinho-pra-sempre`, região `sa-east-1` (São Paulo), plano Free / Nano.

O schema versionado está em `supabase/migrations/001_initial_schema.sql`.

## Variáveis no Vercel

Configure no projeto Vercel:

```text
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

A aplicação lê essas variáveis por `/api/config`. A publishable key pode chegar ao navegador; **não** use `service_role` no frontend.

## Desenvolvimento local

Para o fluxo completo, use a CLI do Vercel com as variáveis acima configuradas. Sem `/api/config`, o site entra em **Prévia local** e usa `localStorage` apenas para testar a interface.

## Estrutura

- `index.html` — shell, dialogs e navegação.
- `bootstrap.js` — carrega a configuração e inicia a aplicação.
- `api/config.js` — Vercel Function que expõe somente URL + publishable key.
- `styles.css` — identidade visual Minecraft/diário feito à mão.
- `content.js` — os 3 guias aprovados e checklists.
- `app.js` — SPA, UI, busca, accordions, progresso, export/import, ações.
- `db.js` — adapter Supabase + modo local de prévia.
- `supabase/migrations/001_initial_schema.sql` — tabelas, RLS e Realtime.
- `assets/` — skins reais.
- `vercel.json` — configuração/headers para deploy.

## Próximos lotes

- Lote 2: dimensões e chefes restantes.
- Lote 3: utilidade, sobrevivência, decoração e automação.
- Lote 4: Amendments, Extras e Bastidores completos.

`Dream Relics` e `Twilight Eye` permanecem **a conferir** e não devem virar pré-requisito até teste in-game.
