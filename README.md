# Mundinho · pra sempre

Wiki e diário do foreverworld Minecraft Java 1.21.1 / NeoForge de **gr1d + benamu**.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 com design system próprio “Cozy Minecraft”
- Supabase via `@supabase/ssr`, sem login
- Vercel via integração Git: push em `main` publica automaticamente

## Rotas

- `/` — início, progresso real, próximo marco e troféus
- `/progressao` — 98 marcos com filtros persistentes
- `/mods` — wiki dos guias aprovados
- `/amendments` — consulta fixa organizada por tema
- `/extras` — 18 objetivos de carinho + itens de vocês
- `/bastidores` — 87 mods de biblioteca/performance/compat/cosméticos

## Funcionalidades preservadas

- seletor local `gr1d` / `benamu`
- checklists com autoria + timestamp
- itens personalizados em Mods/Progressão/Extras com soft delete
- Realtime do Supabase
- fallback de `localStorage` em modo “Prévia local”
- migração defensiva de chaves legadas de progresso
- export/import JSON
- busca global com `/` e `Ctrl/Cmd + K`
- accordions acessíveis
- toast “Advancement Made!”
- barra de XP
- chunk loader
- som opt-in, desligado por padrão
- filtros persistentes por dispositivo
- `prefers-reduced-motion`
- skins e foto reais, sem arte de personagem gerada

## Supabase

Projeto: `mundinho-pra-sempre` — `sa-east-1` — Free/Nano.

Runtime principal:

- `mundinho_item_state`
- `mundinho_custom_items`
- `mundinho_content`

`mundinho_item_state` e `mundinho_custom_items` fazem parte da publicação Realtime. RLS permite ao papel `anon` ler/gravar apenas o `world_id = 'mundinho-pra-sempre'`. `mundinho_content` é leitura pública.

A publishable key pode chegar ao navegador. **Nunca use `service_role` no frontend.**

## Variáveis de ambiente

Na Vercel ou em `.env.local`:

```text
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

O Route Handler `app/api/config/route.ts` expõe somente URL, publishable key e `worldId` para o browser.

## Desenvolvimento

```bash
npm ci
npm run dev
```

Validações:

```bash
npm run typecheck
npm run lint
npm run build
```

Sem configuração válida em `/api/config`, a interface entra em **Prévia local** em vez de travar.

## Estrutura

```text
app/                 App Router, páginas, Route Handler e estilos
components/ui/       primitives reutilizáveis do design system
components/shell/    navegação, seletor, chunk loader e shell
components/pages/    renderizadores das seis páginas
components/guides/   renderização tipada dos guias/craftings
components/checklist estado visual + custom items
components/search/   busca global
lib/                 Supabase, adapter DB, conteúdo, migração legado
types/               contratos TypeScript
public/              skins, lembranças, favicon e manifest
supabase/migrations/ schema versionado
```

O conteúdo aprovado não vive mais em strings HTML do frontend. Os 39 registros de conteúdo tipado ficam em `mundinho_content` e são renderizados por componentes TypeScript.

## Publicação

O projeto Vercel está ligado a este repositório. `main` é produção; branches geram previews. Não usar a antiga ação `deploy_to_vercel` do conector.

O workflow `CI` executa install, typecheck, lint e build. Depois de um push em `main`, `Production browser smoke` aguarda o Git deploy e valida as seis rotas, `/api/config`, Supabase compartilhado, busca, persistência local do autor e carregamento da interface.

## Itens a conferir in-game

- **Dream Relics** — continua “a conferir”; não é pré-requisito de nada.
- **Twilight Eye** — continua “a conferir”; não é pré-requisito de nada.
- **Castle Keeper** — conferir gatilho exato na versão instalada.
- **Maledictus** — conferir o gatilho fino do encontro na 3.33.
- **Ancient Remnant** — conferir detalhe fino de ativação/spawn.
- coexistência dos JARs duplicados listados de Ferrite Core, ImmediatelyFast e ModernFix.
- craftings marcados Média/Baixa-conferir continuam usando JEI só como último recurso.

## PWA

Há `manifest.webmanifest` e metadados de instalação, mas **não há service worker/offline cache**. Isso foi intencional para não criar risco de conteúdo/progresso desatualizado durante a migração.
