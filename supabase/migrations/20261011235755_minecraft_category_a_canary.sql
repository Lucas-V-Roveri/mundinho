-- Canary A: new evidence storage; no editorial content, existing IDs or state is recreated.
create table public.mundinho_minecraft_sync_rules (
  advancement_id text primary key,
  milestone_id text not null,
  enabled boolean not null,
  kind text not null check (kind in ('partial','completion','criteria')),
  criteria_total integer check (criteria_total > 0),
  confidence text not null,
  rule_version text not null,
  rule text not null
);
alter table public.mundinho_minecraft_sync_rules enable row level security;
create policy "minecraft rules read" on public.mundinho_minecraft_sync_rules for select to anon using (true);
revoke all on public.mundinho_minecraft_sync_rules from anon, authenticated;
grant select on public.mundinho_minecraft_sync_rules to anon;

-- Approved rules are inserted below by the checked-in seed, not from import files.
insert into public.mundinho_minecraft_sync_rules (advancement_id,milestone_id,enabled,kind,criteria_total,confidence,rule_version,rule)
select "advancementId","milestoneId",enabled,kind,total,confidence,'category-a-2026-10-11-v1',rule
from jsonb_to_recordset($approved$[{"advancementId": "alexscaves:alexscaves/cave_tablet", "milestoneId": "progression:630", "confidence": "Média", "enabled": true, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: critério cave_tablet observado; não comprova Cave Codex nem localizar bioma.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "alexsmobs:alexsmobs/root", "milestoneId": "progression:210", "confidence": "Baixa-conferir", "enabled": false, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial candidato: useitem; validar o item/trigger no JAR antes de associar ao Animal Dictionary.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "artifacts:amateur_archaeologist", "milestoneId": "progression:140", "confidence": "Alta", "enabled": true, "total": 1, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: comprova obter um artefato; não comprova testar sua utilidade.", "source": "https://raw.githubusercontent.com/ochotonida/artifacts/1.21.1/common/src/generated/resources/data/artifacts/advancement/amateur_archaeologist.json"}, {"advancementId": "betterdeserttemples:temple_entry", "milestoneId": "progression:250", "confidence": "Alta", "enabled": true, "total": 1, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: entrar no templo não comprova explorar/verificar armadilhas do subitem desert.", "source": "https://raw.githubusercontent.com/YUNG-GANG/YUNGs-Better-Desert-Temples/1.21.1/Common/src/main/resources/data/betterdeserttemples/advancement/temple_entry.json"}, {"advancementId": "betterdungeons:all_dungeons", "milestoneId": "progression:250", "confidence": "Média", "enabled": true, "total": 4, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: contador de 4 tipos de dungeon dentro de #250; visitar não comprova os cinco subobjetivos do marco.", "source": "https://raw.githubusercontent.com/YUNG-GANG/YUNGs-Better-Dungeons/1.21.1/Common/src/main/resources/data/betterdungeons/advancement/all_dungeons.json"}, {"advancementId": "betterdungeons:small_dungeon", "milestoneId": "progression:250", "confidence": "Alta", "enabled": true, "total": 1, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: localização em monster room; não comprova concluir a dungeon.", "source": "https://raw.githubusercontent.com/YUNG-GANG/YUNGs-Better-Dungeons/1.21.1/Common/src/main/resources/data/betterdungeons/advancement/small_dungeon.json"}, {"advancementId": "betterdungeons:spider_dungeon", "milestoneId": "progression:250", "confidence": "Alta", "enabled": true, "total": 1, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: localização; não comprova concluir a dungeon.", "source": "https://raw.githubusercontent.com/YUNG-GANG/YUNGs-Better-Dungeons/1.21.1/Common/src/main/resources/data/betterdungeons/advancement/spider_dungeon.json"}, {"advancementId": "betterdungeons:zombie_dungeon", "milestoneId": "progression:250", "confidence": "Alta", "enabled": true, "total": 1, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: localização; não comprova concluir a dungeon.", "source": "https://raw.githubusercontent.com/YUNG-GANG/YUNGs-Better-Dungeons/1.21.1/Common/src/main/resources/data/betterdungeons/advancement/zombie_dungeon.json"}, {"advancementId": "cold_sweat:insulate_armor", "milestoneId": "progression:10", "confidence": "Baixa-conferir", "enabled": false, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial candidato: isolamento; validar trigger no JAR, não comprova água segura/estabilidade térmica.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "cold_sweat:use_hearth", "milestoneId": "progression:10", "confidence": "Baixa-conferir", "enabled": false, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: has_warmth observado com done=false; Y instalado a conferir. Não concluir a partir da presença.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "cold_sweat:use_smokestack", "milestoneId": "progression:10", "confidence": "Média", "enabled": true, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: critérios placed_smokestack e has_warmth; não comprova todo o preparo de sobrevivência.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "dungeons_arise:find_greenwood_pub", "milestoneId": "progression:240", "confidence": "Média", "enabled": true, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: descoberta de estrutura passiva; não conclui objetivos hostis #260/#265.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "endrem:main/lost_eye", "milestoneId": "progression:810", "confidence": "Alta", "enabled": true, "total": 1, "kind": "completion", "rule": "done===true → progression:810:lost-eye. Não altera os outros 11 subitens; pai só se completa pela regra existente.", "reason": "Integral para o subitem EXISTENTE progression:810:lost-eye, somente done=true. Nunca concluir #810 inteiro.", "source": "https://raw.githubusercontent.com/Jack-Bagel/End-Remastered/1.21.1/common/src/main/resources/data/endrem/advancement/main/lost_eye.json"}, {"advancementId": "endrem:main/root", "milestoneId": "progression:810", "confidence": "Alta", "enabled": true, "total": 16, "kind": "criteria", "rule": "Mapear critérios observados aos 12 IDs já existentes em #810. Neste arquivo lost_eye → progression:810:lost-eye. Nunca usar done do root para completar #810. Deduplicar lost_eye.", "reason": "Por critério: os olhos presentes alimentam seus subitens equivalentes de #810; neste save apenas lost_eye. done=true do root significa UM entre 16, nunca 12 olhos.", "source": "https://raw.githubusercontent.com/Jack-Bagel/End-Remastered/1.21.1/common/src/main/resources/data/endrem/advancement/main/root.json"}, {"advancementId": "farmersdelight:main/eat_nourishing_food", "milestoneId": "progression:40", "confidence": "Alta", "enabled": true, "total": 1, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: comprova efeito Nourishment; não comprova produção estável de refeições.", "source": "https://raw.githubusercontent.com/vectorwing/FarmersDelight/1.21/src/generated/resources/data/farmersdelight/advancement/main/eat_nourishing_food.json"}, {"advancementId": "farmersdelight:main/place_cooking_pot", "milestoneId": "progression:40", "confidence": "Alta", "enabled": true, "total": 1, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: comprova colocar Cooking Pot; não comprova fonte estável de refeições.", "source": "https://raw.githubusercontent.com/vectorwing/FarmersDelight/1.21/src/generated/resources/data/farmersdelight/advancement/main/place_cooking_pot.json"}, {"advancementId": "farmersdelight:main/plant_all_crops", "milestoneId": "progression:40", "confidence": "Média", "enabled": true, "total": 19, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: catálogo agrícola X/19 no próprio marco, sem 19 subitens; coleção opcional, não gate para refeições.", "source": "https://raw.githubusercontent.com/vectorwing/FarmersDelight/1.21/src/generated/resources/data/farmersdelight/advancement/main/plant_all_crops.json"}, {"advancementId": "graveyard:graveyard/large_graveyard", "milestoneId": "progression:600", "confidence": "Média", "enabled": true, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: descoberta do Graveyard; não comprova explorar Crypt e Ruins.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "graveyard:graveyard/root", "milestoneId": "progression:600", "confidence": "Baixa-conferir", "enabled": false, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial candidato: root com grave_03; validar condição de localização no JAR, não usar como instalação nem conclusão do marco.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "mca:marriage", "milestoneId": "progression:110", "confidence": "Baixa-conferir", "enabled": false, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: marriage/critério iron; validar trigger no JAR; não conclui toda a rotina social.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "mca:root", "milestoneId": "progression:110", "confidence": "Média", "enabled": true, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: critério village; não comprova relações e rotina social estabilizadas.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "minecraft:adventure/sleep_in_bed", "milestoneId": "progression:50", "confidence": "Alta", "enabled": true, "total": 1, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: comprova dormir numa cama; não comprova saco de dormir e campfire do kit.", "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/adventure/sleep_in_bed.json"}, {"advancementId": "minecraft:story/follow_ender_eye", "milestoneId": "progression:290", "confidence": "Alta", "enabled": true, "total": 1, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: comprova estar em minecraft:stronghold; não comprova explorar a estrutura reformulada.", "source": "https://raw.githubusercontent.com/misode/mcmeta/1.21.1-data/data/minecraft/advancement/story/follow_ender_eye.json"}, {"advancementId": "nova_structures:adventure/find_tavern", "milestoneId": "progression:240", "confidence": "Média", "enabled": true, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: critério de tavern observado; não comprova todas as atividades da entrada.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}, {"advancementId": "nova_structures:root", "milestoneId": "progression:240", "confidence": "Média", "enabled": true, "total": null, "kind": "partial", "rule": "Evidência parcial no marco; NÃO marcar pai nem subitem amplo como feito. Sem novo marco. Sinais Baixa-conferir ficam desativados até validar definição.", "reason": "Parcial: root referencia find_tavern, não é mera instalação; deduplicar com find_tavern.", "source": "Save anexado: critérios e done. Definição exata do JAR/datapack não fornecida."}]$approved$::jsonb) as x("advancementId" text,"milestoneId" text,enabled boolean,kind text,total integer,confidence text,rule text);

create table public.mundinho_minecraft_evidence (
  world_id text not null check (world_id = 'mundinho-pra-sempre'),
  actor text not null check (actor in ('gr1d','benamu')),
  advancement_id text not null references public.mundinho_minecraft_sync_rules(advancement_id),
  milestone_id text not null,
  done boolean not null default false,
  criteria jsonb not null default '{}'::jsonb check (jsonb_typeof(criteria) = 'object'),
  criteria_total integer check (criteria_total > 0),
  rule_version text not null,
  imported_at timestamptz not null default now(),
  primary key (world_id,actor,advancement_id)
);
alter table public.mundinho_minecraft_evidence enable row level security;
create index mundinho_minecraft_evidence_advancement_idx on public.mundinho_minecraft_evidence(advancement_id);
create policy "minecraft evidence read" on public.mundinho_minecraft_evidence for select to anon using (world_id = 'mundinho-pra-sempre');
create policy "minecraft evidence insert" on public.mundinho_minecraft_evidence for insert to anon with check (
  world_id = 'mundinho-pra-sempre' and exists (
    select 1 from public.mundinho_minecraft_sync_rules r where r.advancement_id = mundinho_minecraft_evidence.advancement_id
      and r.enabled and r.milestone_id = mundinho_minecraft_evidence.milestone_id and r.rule_version = mundinho_minecraft_evidence.rule_version
  )
);
create policy "minecraft evidence update" on public.mundinho_minecraft_evidence for update to anon using (world_id = 'mundinho-pra-sempre') with check (
  world_id = 'mundinho-pra-sempre' and exists (
    select 1 from public.mundinho_minecraft_sync_rules r where r.advancement_id = mundinho_minecraft_evidence.advancement_id
      and r.enabled and r.milestone_id = mundinho_minecraft_evidence.milestone_id and r.rule_version = mundinho_minecraft_evidence.rule_version
  )
);
revoke all on public.mundinho_minecraft_evidence from anon, authenticated;
grant select, insert, update on public.mundinho_minecraft_evidence to anon;

create function public.mundinho_keep_minecraft_evidence()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  if (new.world_id,new.actor,new.advancement_id,new.milestone_id) is distinct from (old.world_id,old.actor,old.advancement_id,old.milestone_id) then
    raise exception 'A identidade de uma evidência não pode ser alterada';
  end if;
  new.done := old.done or new.done;
  new.criteria := new.criteria || old.criteria;
  return new;
end;
$$;
revoke execute on function public.mundinho_keep_minecraft_evidence() from public, anon, authenticated;
create trigger mundinho_minecraft_evidence_monotonic before update on public.mundinho_minecraft_evidence for each row execute function public.mundinho_keep_minecraft_evidence();

create function public.mundinho_sync_minecraft_category_a(p_world_id text, p_actor text, p_observations jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  observation jsonb;
  rule_row public.mundinho_minecraft_sync_rules%rowtype;
  merged public.mundinho_minecraft_evidence%rowtype;
  crit jsonb;
  criterion text;
  stamp text;
  target text;
  targets jsonb;
  entry_name text;
  parent jsonb;
  target_stamp timestamptz;
  n integer;
  evidence_changed integer := 0;
  completions_changed integer := 0;
  eyes_observed boolean := false;
begin
  if p_world_id is distinct from 'mundinho-pra-sempre' or p_actor is null or p_actor not in ('gr1d','benamu') then raise exception 'Mundo/jogador inválido'; end if;
  if p_observations is null or jsonb_typeof(p_observations) <> 'array' or jsonb_array_length(p_observations) > 25 then raise exception 'Lote inválido'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_world_id || ':' || p_actor,0));
  for observation in select value from jsonb_array_elements(p_observations) loop
    select * into rule_row from public.mundinho_minecraft_sync_rules where advancement_id = observation->>'advancementId' and enabled;
    if not found then raise exception 'Sinal não aprovado ou desativado: %',observation->>'advancementId'; end if;
    if jsonb_typeof(observation->'done') is distinct from 'boolean' then raise exception 'done deve ser booleano'; end if;
    crit := observation->'criteria';
    if jsonb_typeof(crit) is distinct from 'object' then raise exception 'Critérios inválidos'; end if;
    if (select count(*) from jsonb_object_keys(crit)) > 64 then raise exception 'Critérios excedem o limite'; end if;
    for criterion,stamp in select key,value from jsonb_each_text(crit) loop
      if jsonb_typeof(crit->criterion) <> 'string' or length(criterion) > 160 or length(stamp) > 64 or stamp !~ '^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2} [+-]\d{4}$' then raise exception 'Timestamp de critério inválido'; end if;
      perform stamp::timestamptz;
    end loop;
    select i into parent from public.mundinho_content c cross join lateral jsonb_array_elements(c.payload->'items') i where c.key='page:progression' and i->>'id'=rule_row.milestone_id;
    if not found then raise exception 'Marco aprovado ausente: %',rule_row.milestone_id; end if;
    entry_name := parent->>'entry';

    insert into public.mundinho_minecraft_evidence as old (world_id,actor,advancement_id,milestone_id,done,criteria,criteria_total,rule_version)
    values (p_world_id,p_actor,rule_row.advancement_id,rule_row.milestone_id,(observation->>'done')::boolean,crit,rule_row.criteria_total,rule_row.rule_version)
    on conflict (world_id,actor,advancement_id) do update set done = old.done or excluded.done, criteria = excluded.criteria || old.criteria,
      criteria_total = excluded.criteria_total, rule_version = excluded.rule_version, imported_at = now()
    where (old.done,old.criteria,old.criteria_total,old.rule_version) is distinct from (old.done or excluded.done,excluded.criteria || old.criteria,excluded.criteria_total,excluded.rule_version);
    get diagnostics n = row_count;
    evidence_changed := evidence_changed+n;
    select * into merged from public.mundinho_minecraft_evidence where world_id=p_world_id and actor=p_actor and advancement_id=rule_row.advancement_id;
    targets := '{}'::jsonb;
    if rule_row.advancement_id='endrem:main/lost_eye' and merged.done then
      targets := jsonb_build_object('lost_eye',coalesce(merged.criteria->>'lost_eye',now()::text));
    elsif rule_row.advancement_id='endrem:main/root' then
      targets := merged.criteria;
    end if;
    -- All partial rules have an empty targets object. Neither done nor X/Y can complete them.
    for criterion,stamp in select key,value from jsonb_each_text(targets) where key in ('old_eye','nether_eye','cold_eye','rogue_eye','black_eye','magical_eye','lost_eye','corrupted_eye','wither_eye','guardian_eye','witch_eye','cursed_eye') loop
      target := 'progression:810:' || replace(criterion,'_','-');
      if rule_row.milestone_id <> 'progression:810' or not exists (select 1 from jsonb_array_elements(parent->'subitens') s where s->>'id'=target) then raise exception 'Subitem não aprovado: %',target; end if;
      eyes_observed := true;
      target_stamp := stamp::timestamptz;
      insert into public.mundinho_player_item_state as old (world_id,item_id,actor,section,entry_key,completed,completed_at,updated_at)
      values (p_world_id,target,p_actor,'progression',entry_name,true,target_stamp,now())
      on conflict (world_id,item_id,actor) do update set completed=true,completed_at=coalesce(old.completed_at,excluded.completed_at),updated_at=now() where not old.completed;
      get diagnostics n = row_count;
      completions_changed := completions_changed+n;
      insert into public.mundinho_item_state as old (world_id,item_id,section,entry_key,completed,completed_by,completed_at,updated_at,deleted)
      values (p_world_id,target,'progression',entry_name,true,p_actor,target_stamp,now(),false)
      on conflict (world_id,item_id) do update set completed=true,completed_by=coalesce(old.completed_by,excluded.completed_by),completed_at=coalesce(old.completed_at,excluded.completed_at),updated_at=now() where not old.completed;
    end loop;
  end loop;
  if eyes_observed then
    select i into parent from public.mundinho_content c cross join lateral jsonb_array_elements(c.payload->'items') i where c.key='page:progression' and i->>'id'='progression:810';
    if jsonb_array_length(parent->'subitens')=12 and not exists (
      select 1 from jsonb_array_elements(parent->'subitens') s where not exists (
        select 1 from public.mundinho_player_item_state t where t.world_id=p_world_id and t.actor=p_actor and t.item_id=s->>'id' and t.completed
      )
    ) then
      select max(t.completed_at) into target_stamp from public.mundinho_player_item_state t where t.world_id=p_world_id and t.actor=p_actor and t.completed and t.item_id in (select s->>'id' from jsonb_array_elements(parent->'subitens') s);
      insert into public.mundinho_player_item_state as old (world_id,item_id,actor,section,entry_key,completed,completed_at,updated_at)
      values (p_world_id,'progression:810',p_actor,'progression',parent->>'entry',true,target_stamp,now())
      on conflict (world_id,item_id,actor) do update set completed=true,completed_at=coalesce(old.completed_at,excluded.completed_at),updated_at=now() where not old.completed;
      get diagnostics n = row_count;
      completions_changed := completions_changed+n;
      insert into public.mundinho_item_state as old (world_id,item_id,section,entry_key,completed,completed_by,completed_at,updated_at,deleted)
      values (p_world_id,'progression:810','progression',parent->>'entry',true,p_actor,target_stamp,now(),false)
      on conflict (world_id,item_id) do update set completed=true,completed_by=coalesce(old.completed_by,excluded.completed_by),completed_at=coalesce(old.completed_at,excluded.completed_at),updated_at=now() where not old.completed;
    end if;
  end if;
  return jsonb_build_object('evidence_changed',evidence_changed,'completions_changed',completions_changed);
end;
$$;
revoke execute on function public.mundinho_sync_minecraft_category_a(text,text,jsonb) from public, authenticated;
grant execute on function public.mundinho_sync_minecraft_category_a(text,text,jsonb) to anon;

do $$ begin
  alter publication supabase_realtime add table public.mundinho_minecraft_evidence;
exception when duplicate_object then null;
end $$;
notify pgrst, 'reload schema';
