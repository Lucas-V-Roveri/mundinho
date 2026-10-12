create or replace function public.mundinho_sync_minecraft_canary(p_world_id text,p_actor text,p_observations jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $fn$
declare
 observation jsonb; spec jsonb; r public.mundinho_minecraft_sync_rules%rowtype;
 merged public.mundinho_minecraft_evidence%rowtype; crit jsonb; criterion text; stamp text;
 parent jsonb; stamp_at timestamptz; n int; a_result jsonb; a_observations jsonb;
 evidence_changed int:=0;completions_changed int:=0;
 specs jsonb := $specs$[{"advancementId":"minecraft:story/root","milestoneId":"progression:1","criteria":["crafting_table"]},{"advancementId":"minecraft:story/mine_stone","milestoneId":"progression:2","criteria":["get_stone"]},{"advancementId":"minecraft:story/upgrade_tools","milestoneId":"progression:3","criteria":["stone_pickaxe"]},{"advancementId":"minecraft:story/smelt_iron","milestoneId":"progression:4","criteria":["iron"]},{"advancementId":"minecraft:story/obtain_armor","milestoneId":"progression:5","criteria":["iron_boots","iron_chestplate","iron_helmet","iron_leggings"]},{"advancementId":"minecraft:story/iron_tools","milestoneId":"progression:6","criteria":["iron_pickaxe"]},{"advancementId":"minecraft:story/deflect_arrow","milestoneId":"progression:7","criteria":["deflected_projectile"]},{"advancementId":"minecraft:story/mine_diamond","milestoneId":"progression:8","criteria":["diamond"]},{"advancementId":"minecraft:story/shiny_gear","milestoneId":"progression:9","criteria":["diamond_boots","diamond_chestplate","diamond_helmet","diamond_leggings"]},{"advancementId":"minecraft:story/form_obsidian","milestoneId":"progression:11","criteria":["obsidian"]}]$specs$::jsonb;
begin
 if p_world_id is distinct from 'mundinho-pra-sempre' or p_actor is null or p_actor not in ('gr1d','benamu') then raise exception 'Mundo/jogador inválido'; end if;
 if p_observations is null or jsonb_typeof(p_observations)<>'array' or jsonb_array_length(p_observations)>35 then raise exception 'Lote inválido';end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_world_id||':'||p_actor,0));
 select coalesce(jsonb_agg(o),'[]'::jsonb) into a_observations from jsonb_array_elements(p_observations) o
 where not exists(select 1 from jsonb_array_elements(specs) s where s->>'advancementId'=o->>'advancementId');
 -- A remains unchanged, including its no-parent-completion behavior.
 if exists(select 1 from jsonb_array_elements(a_observations) o where not exists(select 1 from public.mundinho_minecraft_sync_rules approved where approved.advancement_id=o->>'advancementId' and approved.rule_version='category-a-2026-10-11-v1')) then raise exception 'Sinal fora do canário';end if;
 a_result:=public.mundinho_sync_minecraft_category_a(p_world_id,p_actor,a_observations);
 evidence_changed:=(a_result->>'evidence_changed')::int;completions_changed:=(a_result->>'completions_changed')::int;
 for observation in select value from jsonb_array_elements(p_observations) loop
  select s into spec from jsonb_array_elements(specs) s where s->>'advancementId'=observation->>'advancementId';
  if not found then continue;end if;
  select * into r from public.mundinho_minecraft_sync_rules where advancement_id=spec->>'advancementId' and enabled and rule_version='story-canary-2026-10-12-v1' and milestone_id=spec->>'milestoneId';
  if not found then raise exception 'Sinal story desativado ou alterado';end if;
  if jsonb_typeof(observation->'done') is distinct from 'boolean' then raise exception 'done deve ser booleano';end if;
  crit:=observation->'criteria';if jsonb_typeof(crit) is distinct from 'object' then raise exception 'Critérios inválidos';end if;
  for criterion,stamp in select key,value from jsonb_each_text(crit) loop
   if not (spec->'criteria' ? criterion) then raise exception 'Critério story desconhecido';end if;
   if jsonb_typeof(crit->criterion)<>'string' or length(stamp)>64 or stamp !~ '^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2} [+-]\d{4}$' then raise exception 'Timestamp inválido';end if;
   perform stamp::timestamptz;
  end loop;
  if (observation->>'done')::boolean and not exists(select 1 from jsonb_object_keys(crit)) then raise exception 'Conclusão sem critério real';end if;
  select i into parent from public.mundinho_content c cross join lateral jsonb_array_elements(c.payload->'items') i where c.key='page:progression' and i->>'id'=r.milestone_id;
  if not found then raise exception 'Marco story ausente';end if;
  insert into public.mundinho_minecraft_evidence as old(world_id,actor,advancement_id,milestone_id,done,criteria,criteria_total,rule_version)
  values(p_world_id,p_actor,r.advancement_id,r.milestone_id,(observation->>'done')::boolean,crit,r.criteria_total,r.rule_version)
  on conflict(world_id,actor,advancement_id) do update set done=old.done or excluded.done,criteria=excluded.criteria||old.criteria,criteria_total=excluded.criteria_total,rule_version=excluded.rule_version,imported_at=now()
  where (old.done,old.criteria,old.criteria_total,old.rule_version) is distinct from (old.done or excluded.done,excluded.criteria||old.criteria,excluded.criteria_total,excluded.rule_version);
  get diagnostics n=row_count;evidence_changed:=evidence_changed+n;
  select * into merged from public.mundinho_minecraft_evidence where world_id=p_world_id and actor=p_actor and advancement_id=r.advancement_id;
  if merged.done then
   -- All ten advancements have one required group; armor alternatives are OR, not 4/4.
   select min(value::timestamptz) into stamp_at from jsonb_each_text(merged.criteria);
   insert into public.mundinho_player_item_state as old(world_id,item_id,actor,section,entry_key,completed,completed_at,updated_at)
   values(p_world_id,r.milestone_id,p_actor,'progression',parent->>'entry',true,stamp_at,now())
   on conflict(world_id,item_id,actor) do update set completed=true,completed_at=coalesce(old.completed_at,excluded.completed_at),updated_at=now() where not old.completed;
   get diagnostics n=row_count;completions_changed:=completions_changed+n;
   insert into public.mundinho_item_state as old(world_id,item_id,section,entry_key,completed,completed_by,completed_at,updated_at,deleted)
   values(p_world_id,r.milestone_id,'progression',parent->>'entry',true,p_actor,stamp_at,now(),false)
   on conflict(world_id,item_id) do update set completed=true,completed_by=coalesce(old.completed_by,excluded.completed_by),completed_at=coalesce(old.completed_at,excluded.completed_at),updated_at=now() where not old.completed;
  end if;
 end loop;
 return jsonb_build_object('evidence_changed',evidence_changed,'completions_changed',completions_changed);
end $fn$;
revoke execute on function public.mundinho_sync_minecraft_canary(text,text,jsonb) from public,authenticated;
grant execute on function public.mundinho_sync_minecraft_canary(text,text,jsonb) to anon;
notify pgrst,'reload schema';
