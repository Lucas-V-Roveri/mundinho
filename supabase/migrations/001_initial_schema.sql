-- Mundinho · pra sempre — persistência compartilhada sem login.
-- O seletor gr1d/benamu declara autoria; não é autenticação.

create extension if not exists pgcrypto;

create table if not exists public.mundinho_item_state (
  world_id text not null,
  item_id text not null,
  section text null,
  entry_key text null,
  completed boolean not null default false,
  completed_by text null check (completed_by in ('gr1d','benamu')),
  completed_at timestamptz null,
  updated_at timestamptz not null default now(),
  deleted boolean not null default false,
  deleted_by text null check (deleted_by in ('gr1d','benamu')),
  deleted_at timestamptz null,
  primary key (world_id, item_id)
);

create table if not exists public.mundinho_custom_items (
  id uuid primary key default gen_random_uuid(),
  world_id text not null,
  section text not null check (section in ('mods','progression','extras')),
  entry_key text not null,
  title text not null check (char_length(title) between 1 and 100),
  description text not null default '' check (char_length(description) <= 400),
  difficulty text null,
  phase text null,
  created_by text not null check (created_by in ('gr1d','benamu')),
  created_at timestamptz not null default now(),
  deleted boolean not null default false,
  deleted_by text null check (deleted_by in ('gr1d','benamu')),
  deleted_at timestamptz null,
  updated_at timestamptz not null default now()
);

create index if not exists mundinho_custom_scope_idx
  on public.mundinho_custom_items (world_id, section, entry_key)
  where deleted_at is null;

alter table public.mundinho_item_state enable row level security;
alter table public.mundinho_custom_items enable row level security;

drop policy if exists "mundinho state read" on public.mundinho_item_state;
create policy "mundinho state read" on public.mundinho_item_state
for select to anon using (world_id = 'mundinho-pra-sempre');

drop policy if exists "mundinho state insert" on public.mundinho_item_state;
create policy "mundinho state insert" on public.mundinho_item_state
for insert to anon with check (world_id = 'mundinho-pra-sempre');

drop policy if exists "mundinho state update" on public.mundinho_item_state;
create policy "mundinho state update" on public.mundinho_item_state
for update to anon using (world_id = 'mundinho-pra-sempre') with check (world_id = 'mundinho-pra-sempre');

drop policy if exists "mundinho custom read" on public.mundinho_custom_items;
create policy "mundinho custom read" on public.mundinho_custom_items
for select to anon using (world_id = 'mundinho-pra-sempre');

drop policy if exists "mundinho custom insert" on public.mundinho_custom_items;
create policy "mundinho custom insert" on public.mundinho_custom_items
for insert to anon with check (world_id = 'mundinho-pra-sempre');

drop policy if exists "mundinho custom update" on public.mundinho_custom_items;
create policy "mundinho custom update" on public.mundinho_custom_items
for update to anon using (world_id = 'mundinho-pra-sempre') with check (world_id = 'mundinho-pra-sempre');

-- Ative as duas tabelas na publicação supabase_realtime uma vez.
-- No projeto atual isso já está habilitado.
