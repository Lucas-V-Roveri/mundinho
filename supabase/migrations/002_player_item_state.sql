create table if not exists public.mundinho_player_item_state (
  world_id text not null,
  item_id text not null,
  actor text not null check (actor in ('gr1d','benamu')),
  section text not null check (section in ('mods','progression','extras')),
  entry_key text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (world_id, item_id, actor)
);

alter table public.mundinho_player_item_state enable row level security;

drop policy if exists "mundinho player read" on public.mundinho_player_item_state;
drop policy if exists "mundinho player insert" on public.mundinho_player_item_state;
drop policy if exists "mundinho player update" on public.mundinho_player_item_state;
create policy "mundinho player read" on public.mundinho_player_item_state for select to anon using (world_id = 'mundinho-pra-sempre');
create policy "mundinho player insert" on public.mundinho_player_item_state for insert to anon with check (world_id = 'mundinho-pra-sempre');
create policy "mundinho player update" on public.mundinho_player_item_state for update to anon using (world_id = 'mundinho-pra-sempre') with check (world_id = 'mundinho-pra-sempre');
grant select, insert, update on public.mundinho_player_item_state to anon;
create index if not exists mundinho_player_item_state_world_actor_idx on public.mundinho_player_item_state(world_id, actor);

insert into public.mundinho_player_item_state (world_id,item_id,actor,section,entry_key,completed,completed_at,updated_at)
select world_id,item_id,coalesce(completed_by,'gr1d'),section,entry_key,true,completed_at,now()
from public.mundinho_item_state
where completed = true and world_id = 'mundinho-pra-sempre'
on conflict (world_id,item_id,actor) do nothing;

do $$ begin
  alter publication supabase_realtime add table public.mundinho_player_item_state;
exception when duplicate_object then null;
end $$;
