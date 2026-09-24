# Mundinho · pra sempre

Wiki e diário do foreverworld Minecraft Java 1.21.1 / NeoForge de **gr1d + benamu**.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4 com design system próprio “Cozy Minecraft”
- Supabase via `@supabase/ssr`, sem login
- Vercel via integração Git: push em `main` publica automaticamente

## Rotas

- `/` — início, progresso real, próximo marco elegível e prateleira de troféus
- `/progressao` — 101 marcos, 45 subitens internos e filtros persistentes
- `/mods` — wiki dos 35 guias aprovados com craftings e marcos relacionados
- `/amendments` — consulta fixa organizada por tema
- `/extras` — 18 objetivos de carinho + itens de vocês
- `/bastidores` — 87 mods de biblioteca/performance/compat/cosméticos + fontes de imagem

## Progresso e XP

O XP do mundinho conta IDs de alto nível uma única vez: checklist dos guias + marcos de Progressão + Extras + itens personalizados atuais. Subitens de um marco **não entram no denominador do XP**; servem apenas para mostrar o progresso interno `x/y`.

Com os três marcos reincluídos nesta revisão, o denominador passou de **305 para 308**. A Progressão passou de 98 para **101 marcos** e ganhou **45 subitens**.

A marcação agora tem estado individual para `gr1d` e `benamu` em `mundinho_player_item_state`, enquanto `mundinho_item_state` continua sendo o estado agregado do mundo para XP, histórico e compatibilidade. Um marco com subitens só conclui para um jogador quando todos os seus subitens forem concluídos por ele.

## Funcionalidades preservadas

- seletor local `gr1d` / `benamu`
- checklists individuais com timestamp + estado agregado do mundo
- itens personalizados em Mods/Progressão/Extras com soft delete
- Realtime do Supabase
- fallback de `localStorage` em modo “Prévia local”
- migração defensiva de chaves legadas de progresso
- export/import JSON, inclusive backups antigos sem `player_item_state`
- ao importar progresso antigo de um marco que ganhou subitens, os subitens são herdados automaticamente
- busca global com `/` e `Ctrl/Cmd + K`
- cards de Progressão colapsáveis e organizados por fase/risco/dependência
- toast “Advancement Made!”
- barra de XP sem inflação por subitens
- chunk loader
- som opt-in, desligado por padrão
- filtros persistentes por dispositivo
- `prefers-reduced-motion`
- skins e foto reais, sem arte de personagem gerada
- ícones locais com fallback; sem hotlink obrigatório para a interface funcionar

## Supabase

Projeto: `mundinho-pra-sempre` — `sa-east-1` — Free/Nano.

Runtime principal:

- `mundinho_item_state` — agregado do mundo
- `mundinho_player_item_state` — estado individual por `gr1d` / `benamu`
- `mundinho_custom_items`
- `mundinho_content`

As tabelas de estado e custom items participam do Realtime. RLS limita o papel `anon` ao `world_id = 'mundinho-pra-sempre'`. `mundinho_content` é leitura pública.

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
components/media/    imagens/ícones com fallback local e lazy loading
components/shell/    navegação, seletor, chunk loader e shell
components/pages/    renderizadores das seis páginas
components/guides/   guias, chips de itens e receitas pesquisadas
components/checklist estado visual + custom items
components/search/   busca global
lib/                 Supabase, adapter DB, conteúdo, migração legado e modelo de progressão
types/               contratos TypeScript
public/              skins, lembranças, ícones, favicon e manifest
supabase/migrations/ schema versionado
```

O conteúdo aprovado vive em `mundinho_content` e é renderizado por componentes TypeScript. Campos visuais e de progressão ricos (`icone`, `imagem`, `utilidade`, `receita`, `subitens`, `gate`) são opcionais para manter compatibilidade com registros antigos.

## Publicação

O projeto Vercel está ligado a este repositório. `main` é produção; branches geram previews. O workflow `CI` executa install, typecheck, lint e build. Depois de um push em `main`, `Production browser smoke` aguarda o Git deploy e valida as seis rotas, `/api/config`, Supabase compartilhado, busca, persistência local do autor e carregamento da interface.

## Itens a conferir in-game

- **Dream Relics** e **Twilight Eye** continuam fora de gates.
- **Castle Keeper** — gatilho exato do addon Final Boss.
- **Maledictus** — gatilho fino do encontro.
- **Ancient Remnant** — detalhe fino de ativação/spawn.
- **Scylla** — padrões finos da versão instalada.
- **Candy Cavity** — detalhe fino dos encontros com Licowitch nesta versão.
- **maçã especial do grupo (#045)** — variante e receita exatas antes de gastar recurso raro.
- coexistência dos JARs duplicados listados de Ferrite Core, ImmediatelyFast e ModernFix.
- craftings cujo dado não confirma formato/grade continuam explicitamente como `conferir in-game`; JEI permanece último recurso por item.

## PWA

Há `manifest.webmanifest` e metadados de instalação, mas **não há service worker/offline cache**. Isso evita conteúdo/progresso desatualizado durante mudanças de schema e conteúdo.
