const CFG = window.MUNDINHO_CONFIG || {};
const WORLD_ID = CFG.worldId || 'mundinho-pra-sempre';
const LEGACY_KEYS = ['mundinho.progress','mundinhoProgress','mundinho.progress.v1','mundinho.custom.v1','mundinho-state','mundinho.checklists'];
const nowIso = () => new Date().toISOString();
const safeJson = (value, fallback) => { try { return JSON.parse(value); } catch { return fallback; } };

class LocalPreviewStore {
  constructor() {
    this.mode = 'preview-local';
    this.statesKey = `mundinho.preview.states.${WORLD_ID}`;
    this.customKey = `mundinho.preview.custom.${WORLD_ID}`;
    this.listeners = new Set();
  }
  async init(){ return this; }
  _states(){ return safeJson(localStorage.getItem(this.statesKey), {}); }
  _custom(){ return safeJson(localStorage.getItem(this.customKey), []); }
  _emit(){ this.listeners.forEach(fn => fn()); }
  async getStates(){ return this._states(); }
  async getCustomItems(){ return this._custom().filter(x => !x.deleted_at); }
  async setCompleted(itemId, completed, actor, entryKey='') {
    const states = this._states();
    states[itemId] = { ...(states[itemId]||{}), item_id:itemId, entry_key:entryKey, completed, completed_by: completed ? actor : null, completed_at: completed ? nowIso() : null, updated_at: nowIso() };
    localStorage.setItem(this.statesKey, JSON.stringify(states)); this._emit(); return states[itemId];
  }
  async addCustomItem(item, actor){
    const custom=this._custom();
    const row={ id:crypto.randomUUID(), world_id:WORLD_ID, ...item, created_by:actor, created_at:nowIso(), deleted:false, deleted_at:null };
    custom.push(row); localStorage.setItem(this.customKey,JSON.stringify(custom)); this._emit(); return row;
  }
  async deleteCustomItem(id, actor){
    const custom=this._custom(); const row=custom.find(x=>x.id===id);
    if(row){ row.deleted=true; row.deleted_by=actor; row.deleted_at=nowIso(); }
    localStorage.setItem(this.customKey,JSON.stringify(custom)); this._emit();
  }
  subscribe(fn){ this.listeners.add(fn); return ()=>this.listeners.delete(fn); }
  async exportAll(){ return { world_id:WORLD_ID, exported_at:nowIso(), item_state:this._states(), custom_items:this._custom() }; }
  async importAll(payload, actor){
    const states=payload?.item_state||payload?.states||{}; const custom=payload?.custom_items||payload?.custom||[];
    if(Array.isArray(states)){
      const mapped={}; states.forEach(id=>mapped[id]={item_id:id,completed:true,completed_by:actor,completed_at:nowIso()});
      localStorage.setItem(this.statesKey,JSON.stringify(mapped));
    } else localStorage.setItem(this.statesKey,JSON.stringify(states));
    if(Array.isArray(custom)) localStorage.setItem(this.customKey,JSON.stringify(custom));
    this._emit();
  }
  async migrateLegacy(actor){
    const normalized=normalizeLegacy(actor); if(!normalized.found) return {found:false,migrated:0};
    await this.importAll(normalized.payload,actor); localStorage.setItem('mundinho.legacyMigrationDone','1');
    return {found:true,migrated:normalized.count};
  }
}

class SupabaseStore {
  constructor(client){ this.client=client; this.mode='supabase'; this.channels=[]; }
  async init(){ return this; }
  async getStates(){
    const {data,error}=await this.client.from('mundinho_item_state').select('*').eq('world_id',WORLD_ID);
    if(error) throw error; return Object.fromEntries((data||[]).map(row=>[row.item_id,row]));
  }
  async getCustomItems(){
    const {data,error}=await this.client.from('mundinho_custom_items').select('*').eq('world_id',WORLD_ID).is('deleted_at',null).order('created_at');
    if(error) throw error; return data||[];
  }
  async setCompleted(itemId, completed, actor, entryKey=''){
    const payload={ world_id:WORLD_ID,item_id:itemId,entry_key:entryKey||null,completed,completed_by:completed?actor:null,completed_at:completed?nowIso():null,updated_at:nowIso() };
    const {data,error}=await this.client.from('mundinho_item_state').upsert(payload,{onConflict:'world_id,item_id'}).select().single();
    if(error) throw error; return data;
  }
  async addCustomItem(item, actor){
    const payload={ world_id:WORLD_ID, section:item.section, entry_key:item.entry_key, title:item.title, description:item.description||'', difficulty:item.difficulty||null, phase:item.phase||null, created_by:actor };
    const {data,error}=await this.client.from('mundinho_custom_items').insert(payload).select().single();
    if(error) throw error; return data;
  }
  async deleteCustomItem(id, actor){
    const {error}=await this.client.from('mundinho_custom_items').update({deleted:true,deleted_by:actor,deleted_at:nowIso(),updated_at:nowIso()}).eq('world_id',WORLD_ID).eq('id',id);
    if(error) throw error;
  }
  subscribe(fn){
    const channel=this.client.channel(`mundinho:${crypto.randomUUID()}`)
      .on('postgres_changes',{event:'*',schema:'public',table:'mundinho_item_state',filter:`world_id=eq.${WORLD_ID}`},fn)
      .on('postgres_changes',{event:'*',schema:'public',table:'mundinho_custom_items',filter:`world_id=eq.${WORLD_ID}`},fn)
      .subscribe();
    this.channels.push(channel); return ()=>this.client.removeChannel(channel);
  }
  async exportAll(){ const [states,custom]=await Promise.all([this.getStates(),this.getCustomItems()]); return {world_id:WORLD_ID,exported_at:nowIso(),item_state:states,custom_items:custom}; }
  async importAll(payload,actor){
    const source=payload?.item_state||payload?.states||{}; const rows=[];
    if(Array.isArray(source)) source.forEach(itemId=>rows.push({world_id:WORLD_ID,item_id:itemId,completed:true,completed_by:actor,completed_at:nowIso(),updated_at:nowIso()}));
    else Object.entries(source).forEach(([itemId,state])=>rows.push({world_id:WORLD_ID,item_id:itemId,entry_key:state.entry_key||null,completed:!!state.completed,completed_by:state.completed_by||(state.completed?actor:null),completed_at:state.completed_at||(state.completed?nowIso():null),updated_at:nowIso()}));
    if(rows.length){ const {error}=await this.client.from('mundinho_item_state').upsert(rows,{onConflict:'world_id,item_id'}); if(error) throw error; }
    const custom=payload?.custom_items||payload?.custom||[];
    for(const item of custom){
      const clean={world_id:WORLD_ID,section:item.section||item.scope_type||'extras',entry_key:item.entry_key||item.scope_key||'custom',title:item.title||item.text||'Item importado',description:item.description||'',difficulty:item.difficulty||null,phase:item.phase||null,created_by:item.created_by||item.added_by||actor};
      const {error}=await this.client.from('mundinho_custom_items').insert(clean); if(error) throw error;
    }
  }
  async migrateLegacy(actor){ const normalized=normalizeLegacy(actor); if(!normalized.found) return {found:false,migrated:0}; await this.importAll(normalized.payload,actor); localStorage.setItem('mundinho.legacyMigrationDone','1'); return {found:true,migrated:normalized.count}; }
}

function normalizeLegacy(actor){
  const state={}; const custom=[]; let count=0,found=false;
  for(const key of LEGACY_KEYS){
    const raw=localStorage.getItem(key); if(!raw) continue; const parsed=safeJson(raw,null); if(!parsed) continue; found=true;
    if(Array.isArray(parsed)) parsed.forEach(entry=>{ if(typeof entry==='string'){state[entry]={completed:true,completed_by:actor,completed_at:nowIso()};count++;} else if(entry?.title){custom.push({...entry,section:entry.section||entry.scope_type||'extras',entry_key:entry.entry_key||entry.scope_key||'legacy',created_by:actor});count++;} });
    else if(typeof parsed==='object'){
      const src=parsed.progress||parsed.states||parsed.completed||parsed;
      Object.entries(src).forEach(([id,value])=>{ if(['custom','items'].includes(id)) return; const completed=typeof value==='boolean'?value:!!value?.completed; if(completed){state[id]={completed:true,completed_by:value?.completed_by||actor,completed_at:value?.completed_at||nowIso()};count++;} });
      const c=parsed.custom||parsed.items; if(Array.isArray(c)) c.forEach(item=>{ if(item?.title){custom.push({...item,section:item.section||item.scope_type||'extras',entry_key:item.entry_key||item.scope_key||'legacy',created_by:item.created_by||actor});count++;} });
    }
  }
  return {found,count,payload:{item_state:state,custom_items:custom}};
}

export function hasLegacyData(){ return !localStorage.getItem('mundinho.legacyMigrationDone') && LEGACY_KEYS.some(k=>!!localStorage.getItem(k)); }
export async function createStore(){
  if(CFG.supabaseUrl && CFG.supabaseAnonKey){
    try{
      const {createClient}=await import('https://esm.sh/@supabase/supabase-js@2');
      const client=createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
      return await new SupabaseStore(client).init();
    } catch(error){ console.error('Falha ao iniciar Supabase; usando prévia local.',error); }
  }
  return await new LocalPreviewStore().init();
}
export { WORLD_ID };
