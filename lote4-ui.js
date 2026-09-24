import { createStore } from './db.js';
import { siteMeta } from './content.js';
import { amendmentsSections, amendmentsSources, backstageGroups, extraSuggestionPool } from './lote4-content.js';
import { extrasGoals, pendingInGame } from './lote4-extras.js';

const app=document.querySelector('#app');
const actorSelect=document.querySelector('#actor-select');
const itemDialog=document.querySelector('#item-dialog');
const confirmDialog=document.querySelector('#confirm-dialog');
const toastRegion=document.querySelector('#toast-region');
const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const fmt=iso=>iso?new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(new Date(iso)):'';
const route=()=>((location.hash||'#inicio').slice(1));
const actor=()=>localStorage.getItem('mundinho.actor')||actorSelect?.value||'gr1d';
const skin=(name,small=false)=>`<span class="skin-face ${name} ${small?'small':''}" aria-label="skin de ${name}"></span>`;
const header=(title,subtitle)=>`<div class="page-header"><div><h1 class="page-title">${esc(title)}</h1><p class="page-subtitle">${esc(subtitle)}</p></div><div class="skin-row">${skin('gr1d')}${skin('benamu')}</div></div>`;

siteMeta.lote='Lote 4 — Amendments, Extras e Bastidores';

const style=document.createElement('style');
style.textContent=`
.l4-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}.l4-card{background:#2b2622;border:2px solid #51463c;box-shadow:4px 4px 0 #171411;padding:18px}.l4-card h2,.l4-card h3{margin-top:0}.l4-card ul{padding-left:20px}.l4-card li+li{margin-top:8px}.l4-note{background:#342d26;border-left:4px solid #b98b50;padding:13px 15px;margin:16px 0}.l4-source-list{display:flex;flex-wrap:wrap;gap:8px;padding:0;list-style:none}.l4-source-list a{display:inline-block;border:1px solid #76614e;background:#211d19;padding:8px 10px;text-decoration:none}.extras-tools{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px}.suggestion-card{background:#302b24;border:2px dashed #a27a4d;padding:16px;margin-bottom:18px}.suggestion-card[hidden]{display:none}.backstage-group{margin:0 0 14px;border:2px solid #51463c;background:#28231f}.backstage-group summary{cursor:pointer;padding:14px 16px;font-weight:700}.backstage-list{border-top:1px solid #51463c}.backstage-row{display:grid;grid-template-columns:minmax(190px,32%) 1fr;gap:12px;padding:10px 14px;border-bottom:1px solid #3f3730}.backstage-row:last-child{border-bottom:0}.backstage-row strong{color:#e4d5bc}.pending-card{border-color:#9d6c4c}.extras-count{font-family:'Press Start 2P',monospace;font-size:10px;color:#c9b58e}.l4-check{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:start;padding:12px 0;border-bottom:1px solid #463d35}.l4-check.done .check-title{text-decoration:line-through;opacity:.7}.l4-check:last-child{border-bottom:0}@media(max-width:700px){.backstage-row{grid-template-columns:1fr;gap:4px}}`;
document.head.appendChild(style);

const l4Store=await createStore();
let states=await l4Store.getStates();
let custom=await l4Store.getCustomItems();
let suggestionIndex=-1;
let busy=false;

function toast(title,copy=''){
  const el=document.createElement('div');el.className='toast';
  el.innerHTML=`<strong>Advancement Made!</strong><b>${esc(title)}</b>${copy?`<small>${esc(copy)}</small>`:''}`;
  toastRegion?.appendChild(el);setTimeout(()=>el.remove(),3800);
}

function amendmentsPage(){
  const themes=amendmentsSections.map(s=>`<article class="l4-card"><h2>${esc(s.title)}</h2><ul>${s.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul></article>`).join('');
  const sources=amendmentsSources.map(([n,u])=>`<li><a href="${esc(u)}" target="_blank" rel="noreferrer">${esc(n)}</a></li>`).join('');
  return `<section class="page" data-lote4-page="amendments">${header('Amendments','Consulta fixa das interações vanilla ampliadas. Não é uma campanha e não vira gate.')}
  <div class="l4-note"><strong>Versão do pack:</strong> 1.21-2.1.10 NeoForge. O próprio projeto define Amendments como um mod altamente configurável focado em melhorar funcionalidade e visual de blocos vanilla existentes.</div>
  <div class="l4-grid">${themes}</div>
  <section class="guide-section"><h2>Como usar esta página</h2><p>Se uma interação não aparecer no mundo, a primeira suspeita é configuração da feature — não um pré-requisito inventado. Supplementaries continua no guia próprio; aqui ficam apenas as mudanças do Amendments.</p></section>
  <ul class="l4-source-list">${sources}</ul></section>`;
}

function extraRow(id,title,description,phase,{customItem=null}={}){
  const s=states[id]||{};const done=!!s.completed;
  return `<div class="l4-check ${done?'done':''}"><button class="check-box" role="checkbox" aria-checked="${done}" data-l4-check="${esc(id)}" data-l4-entry="${customItem?'geral':'carinho'}">${done?'✓':''}</button><div><div class="check-title">${esc(title)}</div><div class="check-desc">${esc(description||'')}</div>${phase?`<div class="check-meta">${esc(phase)}</div>`:''}${done?`<div class="check-meta">marcado por ${esc(s.completed_by||'?')} · ${fmt(s.completed_at)}</div>`:''}</div>${customItem?`<button class="delete-item" data-l4-delete="${esc(customItem.id)}">apagar</button>`:''}</div>`;
}

function extrasPage(){
  const curated=extrasGoals.map(([raw,title,desc,phase])=>extraRow(`extras:carinho:${raw}`,title,desc,phase)).join('');
  const customExtras=custom.filter(x=>!x.deleted_at&&x.section==='extras').map(x=>extraRow(`custom:${x.id}`,x.title,x.description,x.phase,{customItem:x})).join('');
  return `<section class="page" data-lote4-page="extras">${header('Extras','18 objetivos de carinho específicos do pack. Não contam como gate de progressão; contam como história do mundo.')}
  <div class="extras-tools"><button class="button primary" id="suggest-extra" type="button">sugerir mais uma ideia</button><button class="add-item" id="add-extra" type="button">+ adicionar objetivo nosso</button><span class="extras-count">18 objetivos curados</span></div>
  <div class="suggestion-card" id="suggestion-card" hidden></div>
  <div class="checklist-shell"><div class="checklist-head"><h3>coisas que queremos fazer juntos</h3></div><div class="checklist">${curated}${customExtras}</div></div>
  <div class="l4-note"><strong>Regra:</strong> objetivo de carinho pode ser pequeno. Nem tudo precisa terminar com um boss morto ou uma fábrica produzindo 900 itens por minuto.</div></section>`;
}

function backstagePage(){
  const total=backstageGroups.reduce((n,g)=>n+g.mods.length,0);
  const groups=backstageGroups.map((g,i)=>`<details class="backstage-group" ${i<2?'open':''}><summary>${esc(g.title)} · ${g.mods.length}</summary><div class="backstage-list">${g.mods.map(([name,fn])=>`<div class="backstage-row"><strong>${esc(name)}</strong><span>${esc(fn)}</span></div>`).join('')}</div></details>`).join('');
  const pending=pendingInGame.map(([name,note])=>`<div class="backstage-row"><strong>${esc(name)}</strong><span>${esc(note)}</span></div>`).join('');
  return `<section class="page" data-lote4-page="bastidores">${header('Bastidores','O que mantém, integra, otimiza ou apresenta o pack — sem virar conteúdo de progressão.')}
  <div class="l4-note"><strong>${total} mods classificados como Bastidores</strong> na fonte de verdade. Ferrite Core, ImmediatelyFast e ModernFix continuam com duas versões/JARs listadas no anexo: é um ponto de conferência, não uma conclusão automática de conflito.</div>
  ${groups}
  <details class="backstage-group pending-card" open><summary>A conferir in-game · fora da classificação Bastidores</summary><div class="backstage-list">${pending}</div></details></section>`;
}

function openAdd(prefill=null){
  document.querySelector('#item-scope-type').value='extras';
  document.querySelector('#item-scope-key').value='geral';
  document.querySelector('#item-title').value=prefill?.title||'';
  document.querySelector('#item-description').value=prefill?.description||'';
  document.querySelector('#item-difficulty').value='';
  document.querySelector('#item-phase').value=prefill?.phase||'';
  itemDialog.showModal();
  setTimeout(()=>document.querySelector('#item-title')?.focus(),10);
}

function askDelete(id){
  const row=custom.find(x=>x.id===id);
  document.querySelector('#confirm-copy').textContent=`“${row?.title||'este item'}” vai sumir da interface, mas continua no histórico do banco.`;
  confirmDialog.showModal();
  confirmDialog.addEventListener('close',async function once(){
    confirmDialog.removeEventListener('close',once);
    if(confirmDialog.returnValue!=='confirm')return;
    try{await l4Store.deleteCustomItem(id,actor());await reload();toast('Objetivo guardado no histórico','soft delete');}catch(e){toast('Não deu para excluir',e.message);}
  });
}

function bindExtras(){
  document.querySelectorAll('[data-l4-check]').forEach(btn=>btn.onclick=async()=>{
    const id=btn.dataset.l4Check;const was=!!states[id]?.completed;
    try{await l4Store.setCompleted(id,!was,actor(),btn.dataset.l4Entry);await reload();if(!was)toast('Objetivo marcado',actor());}catch(e){toast('Não deu para salvar',e.message);}
  });
  document.querySelectorAll('[data-l4-delete]').forEach(btn=>btn.onclick=()=>askDelete(btn.dataset.l4Delete));
  document.querySelector('#add-extra')?.addEventListener('click',()=>openAdd());
  document.querySelector('#suggest-extra')?.addEventListener('click',()=>{
    suggestionIndex=(suggestionIndex+1)%extraSuggestionPool.length;
    const s=extraSuggestionPool[suggestionIndex];const card=document.querySelector('#suggestion-card');
    card.hidden=false;card.innerHTML=`<h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><button class="button secondary" id="use-suggestion" type="button">adicionar esta ideia</button>`;
    document.querySelector('#use-suggestion').onclick=()=>openAdd({...s,phase:'Intermediário'});
  });
}

async function reload(){
  [states,custom]=await Promise.all([l4Store.getStates(),l4Store.getCustomItems()]);
  if(route()==='extras'){app.innerHTML=extrasPage();bindExtras();}
}

async function syncRoute(){
  if(busy)return;busy=true;
  try{
    const r=route();
    if(r==='amendments'&&!app.querySelector('[data-lote4-page="amendments"]')) app.innerHTML=amendmentsPage();
    if(r==='bastidores'&&!app.querySelector('[data-lote4-page="bastidores"]')) app.innerHTML=backstagePage();
    if(r==='extras'&&!app.querySelector('[data-lote4-page="extras"]')){[states,custom]=await Promise.all([l4Store.getStates(),l4Store.getCustomItems()]);app.innerHTML=extrasPage();bindExtras();}
  } finally {busy=false;}
}

const observer=new MutationObserver(()=>queueMicrotask(syncRoute));
observer.observe(app,{childList:true});
window.addEventListener('hashchange',()=>setTimeout(syncRoute,0));
l4Store.subscribe(()=>{if(route()==='extras')reload().catch(console.error);});
await syncRoute();
