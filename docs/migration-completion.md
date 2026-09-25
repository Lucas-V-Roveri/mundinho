# Migração Next.js — conclusão das Etapas 1–7

Este documento registra o estado técnico da migração do **Mundinho · pra sempre**. O objetivo é evitar que uma futura manutenção precise reconstruir as decisões da migração a partir do histórico do Git.

## Status

- [x] **Etapa 1 — Setup**: Next.js App Router, TypeScript strict, Tailwind, fontes, `/api/config`, CI.
- [x] **Etapa 2 — Design system**: Cozy Minecraft v2, tokens semânticos, superfícies, componentes reutilizáveis, header único, ícones pixel, 35 identidades visuais de guia.
- [x] **Etapa 3 — Shell**: seis rotas, seletor `gr1d/benamu`, chunk loader, footer de ferramentas, sound opt-in e busca no shell.
- [x] **Etapa 4 — Conteúdo estruturado**: conteúdo renderizado por tipos/componentes; `mundinho_content` validado em runtime; snapshot tipado local para as 35 entradas e páginas estruturadas.
- [x] **Etapa 5 — Estado**: adapter isolado, Supabase + Realtime, fallback localStorage quando o Supabase não está configurado, estado individual por jogador, estado agregado, soft delete, import/export e migração legado/subitens.
- [x] **Etapa 6 — Interações**: busca `/` e `Ctrl/Cmd+K`, dialogs, accordions, toasts, XP, checklists, itens personalizados e som opt-in.
- [x] **Etapa 7 — Polimento/cutover**: responsive, `prefers-reduced-motion`, manifest, suite browser de regressão/aceite, Vercel zero-config e smoke de produção.

## Fonte de conteúdo e snapshot tipado

O conteúdo editorial principal continua tendo como fonte autoritativa a tabela `mundinho_content` do Supabase. Para evitar uma wiki vazia no modo intencional de **Prévia local**, existe também `data/content-snapshot.generated.ts`.

O snapshot:

- é gerado de `mundinho_content` por `npm run sync:content`;
- exige exatamente **35 guias** e as páginas `progression`, `amendments`, `extras` e `backstage`;
- passa pela mesma validação runtime do conteúdo vindo do Supabase;
- não contém estado de progresso dos jogadores;
- não substitui o Supabase quando ele está configurado.

O workflow **Sync typed content snapshot** é manual. Deve ser executado após uma mudança editorial persistida no Supabase que também precise ficar disponível no fallback local.

## Contrato de fallback

Há três estados distintos e deliberados:

1. **Supabase configurado e saudável** → `Supabase compartilhado`; conteúdo e progresso compartilhados, Realtime ativo.
2. **Supabase explicitamente não configurado** → `Prévia local`; snapshot tipado completo + progresso deste navegador via localStorage.
3. **Supabase configurado, mas com configuração inválida ou falha de rede/runtime** → erro explícito com botão de tentar novamente. Não ocorre downgrade silencioso para localStorage, evitando divergência de progresso.

## Compatibilidade de progresso

- `mundinho_player_item_state` é a verdade individual de `gr1d` e `benamu`.
- `mundinho_item_state` é a visão agregada para XP/histórico/compatibilidade.
- Um marco com subitens vale uma única unidade de XP.
- Ao importar/migrar um backup antigo no qual um marco-pai já estava concluído, todos os subitens conhecidos desse marco são herdados como concluídos pelo mesmo jogador.
- Importação é merge: progresso existente não deve ser apagado por ausência de campos no arquivo antigo.
- Itens personalizados usam soft delete e mantêm tombstone/histórico.

## Segurança Supabase

- O frontend usa apenas URL + publishable key.
- Nunca colocar `service_role` no browser ou em `NEXT_PUBLIC_*`.
- RLS permanece ativo nas tabelas públicas usadas pelo app.
- Estado e custom items ficam limitados ao `world_id = 'mundinho-pra-sempre'` para o papel `anon`.
- `mundinho_content` é leitura pública.
- `mundinho_item_state`, `mundinho_player_item_state` e `mundinho_custom_items` participam da publicação Realtime.

## PWA

O projeto possui `manifest.webmanifest`, metadata e modo `standalone`, mas **não possui service worker de cache offline**. A ausência é intencional: conteúdo editorial, schema e progresso compartilhado mudam e um cache agressivo poderia apresentar versão obsoleta após deploy/migração.

## Verificação antes de publicar

Validação estática:

```bash
npm ci
npm run verify
```

`verify` executa TypeScript, ESLint e `next build`.

Na CI, além dos testes da Etapa 2, o workflow **Migration final acceptance** valida:

- shell e persistência do seletor de autor;
- busca global e preferência de som;
- fallback local completo (35 guias, 101 marcos e seis rotas);
- importação de backup antigo + herança de subitens;
- migração das antigas chaves de localStorage;
- exportação moderna;
- custom item + soft delete;
- manifest;
- viewport de 680px;
- reduced motion;
- conexão Supabase saudável e abertura do WebSocket de Realtime sem escrever dados de teste no banco de produção.

Depois do merge em `main`, **Production browser smoke** valida o deploy real da Vercel.

## Totais editoriais atuais

- 35 guias
- 101 marcos de progressão
- 45 subitens internos
- 18 Extras curados
- 87 mods em Bastidores
- XP fixo: 308 IDs de alto nível; itens personalizados ativos podem elevar o denominador exibido

## Pontos que continuam dependendo de confirmação in-game

Não transformar estes pontos em gate confirmado sem teste no pack instalado:

- Dream Relics
- Twilight Eye
- Castle Keeper
- Maledictus
- Ancient Remnant
- Scylla
- Candy Cavity
- maçã especial do grupo (#045)
- coexistência dos JARs duplicados de Ferrite Core, ImmediatelyFast e ModernFix
- receitas cuja grade/formato permanece marcada como `conferir in-game`
