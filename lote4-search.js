import { amendmentsSections, backstageGroups } from './lote4-content.js';
import { extrasGoals } from './lote4-extras.js';

const input=document.querySelector('#global-search');
const results=document.querySelector('#search-results');
const dialog=document.querySelector('#search-dialog');
const open=document.querySelector('#search-open');
const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

const pool=[
  ...amendmentsSections.map(s=>({type:'Amendments',title:s.title,copy:s.items.join(' '),route:'#amendments'})),
  ...extrasGoals.map(([,title,description])=>({type:'Extra',title,copy:description,route:'#extras'})),
  ...backstageGroups.flatMap(g=>g.mods.map(([name,role])=>({type:`Bastidores · ${g.title}`,title:name,copy:role,route:'#bastidores'})))
];

function appendLote4(query=''){
  if(!results)return;
  results.querySelectorAll('[data-l4-search]').forEach(el=>el.remove());
  const term=query.trim().toLowerCase();
  if(!term)return;
  const matches=pool.filter(x=>`${x.title} ${x.copy} ${x.type}`.toLowerCase().includes(term)).slice(0,20);
  for(const item of matches){
    const button=document.createElement('button');
    button.type='button';button.className='search-result';button.dataset.l4Search='1';
    button.innerHTML=`<strong>${esc(item.title)}</strong><small>${esc(item.type)} · ${esc(item.copy.slice(0,120))}</small>`;
    button.onclick=()=>{location.hash=item.route;dialog?.close();};
    results.appendChild(button);
  }
}

input?.addEventListener('input',()=>queueMicrotask(()=>appendLote4(input.value)));
open?.addEventListener('click',()=>setTimeout(()=>appendLote4(input?.value||''),0));
