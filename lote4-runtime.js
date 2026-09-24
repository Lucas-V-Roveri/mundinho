import { siteMeta } from './content.js';
import { amendmentsSections, amendmentsSources, backstageGroups, extraSuggestionPool } from './lote4-content.js';

siteMeta.lote='Lote 4 — Amendments, Extras e Bastidores';

const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const skin=(name)=>`<span class="skin-face ${name}" aria-label="skin de ${name}"></span>`;
const header=(title,subtitle)=>`<div class="page-header"><div><h1 class="page-title">${esc(title)}</h1><p class="page-subtitle">${esc(subtitle)}</p></div><div class="skin-row">${skin('gr1d')}${skin('benamu')}</div></div>`;

function amendmentsPage(){
  const sections=amendmentsSections.map((s,i)=>`<details class="panel lote4-detail" ${i===0?'open':''}><summary><strong>${esc(s.title)}</strong></summary><ul>${s.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>`).join('');
  const sources=amendmentsSources.map(([name,url])=>`<li><a href="${url}" target="_blank" rel="noreferrer">${esc(name)}</a></li>`).join('');
  return `<section class="page" data-lote4-route="amendments">${header('Amendments','Página fixa por tema. É uma coleção de pequenas mudanças vanilla+; não uma campanha separada.')}
  <div class="panel"><h2>como usar esta página</h2><p>Quando um bloco vanilla parecer ter um comportamento extra, procure aqui primeiro. A versão do pack é <strong>2.1.10 para 1.21.1 NeoForge</strong>.</p><p>Não há ordem obrigatória. São interações que aparecem no caminho.</p></div>
  <div class="lote4-stack">${sections}</div>
  <div class="panel"><h2>craftings</h2><p><strong>Confiança alta:</strong> o mod possui receitas próprias de <em>cauldron crafting</em> e Dragon Charges craftáveis. Como não há uma única receita central para “começar Amendments”, esta página não inventa grades 3×3. Receita específica só entra quando o recipe data daquele item estiver confirmado.</p></div>
  <div class="panel"><h2>fontes desta página</h2><ul class="source-list">${sources}</ul></div>
  </section>`;
}

function backstagePage(){
  const count=backstageGroups.reduce((n,g)=>n+g.mods.length,0);
  const groups=backstageGroups.map((g,i)=>`<details class="panel lote4-detail" ${i===0?'open':''}><summary><strong>${esc(g.title)}</strong><span class="lote4-count">${g.mods.length}</span></summary><div class="backstage-list">${g.mods.map(([name,role])=>`<div class="backstage-row"><strong>${esc(name)}</strong><span>${esc(role)}</span></div>`).join('')}</div></details>`).join('');
  return `<section class="page" data-lote4-route="bastidores">${header('Bastidores','O que mantém o pack de pé sem virar objetivo de progressão.')}
  <div class="panel"><h2>${count} mods de bastidores</h2><p>Esta lista segue a classificação aprovada da Fase 1. Bibliotecas, compatibilidades, performance, HUD, mapas e efeitos não viraram guias só para inflar a wiki.</p><p><strong>Pack:</strong> ${esc(siteMeta.version)} · <strong>sincronização:</strong> Supabase compartilhado quando a configuração da Vercel está ativa.</p></div>
  <div class="lote4-stack">${groups}</div>
  <div class="panel warning-block"><h2>a conferir no jogo — sem reclassificar</h2><p><strong>Dream Relics</strong> e <strong>Twilight Eye</strong> continuam fora da progressão até o teste de vocês.</p><p>Também continuam marcadas para conferência as coexistências de duas versões/JARs de <strong>Ferrite Core</strong>, <strong>ImmediatelyFast</strong> e <strong>ModernFix</strong>. A planilha não presume conflito.</p></div>
  </section>`;
}

function enhanceExtras(){
  const page=document.querySelector('#app .page');
  if(!page || page.dataset.lote4Extras==='1') return;
  page.dataset.lote4Extras='1';
  const sub=page.querySelector('.page-subtitle');
  if(sub) sub.textContent='Objetivos de carinho do nosso mundo. Não são gates; são desculpas boas para continuar voltando para casa.';
  const head=page.querySelector('.checklist-head');
  if(!head) return;
  const btn=document.createElement('button');
  btn.id='lote4-suggest';
  btn.className='add-item';
  btn.type='button';
  btn.textContent='sugerir mais uma ideia';
  btn.addEventListener('click',()=>{
    const existing=new Set([...page.querySelectorAll('.check-title')].map(x=>x.textContent.trim()));
    const pool=extraSuggestionPool.filter(x=>!existing.has(x.title));
    const pick=(pool.length?pool:extraSuggestionPool)[Math.floor(Math.random()*(pool.length?pool.length:extraSuggestionPool.length))];
    document.querySelector('#item-scope-type').value='extras';
    document.querySelector('#item-scope-key').value='geral';
    document.querySelector('#item-title').value=pick.title;
    document.querySelector('#item-description').value=pick.description;
    document.querySelector('#item-difficulty').value='';
    document.querySelector('#item-phase').value='';
    document.querySelector('#item-dialog').showModal();
  });
  head.appendChild(btn);
  const intro=document.createElement('div');
  intro.className='panel lote4-extra-intro';
  intro.innerHTML='<h2>18 ideias iniciais</h2><p>A lista veio pronta para o mundinho: builds, viagens, comida, screenshots e pequenas lembranças. Vocês podem marcar, apagar com soft delete ou adicionar outras.</p>';
  const shell=page.querySelector('.checklist-shell');
  if(shell) shell.before(intro);
}

function injectStyles(){
  if(document.querySelector('#lote4-styles')) return;
  const style=document.createElement('style');
  style.id='lote4-styles';
  style.textContent=`
    .lote4-stack{display:grid;gap:12px;margin-top:16px}.lote4-detail{padding:0;overflow:hidden}.lote4-detail summary{cursor:pointer;list-style:none;padding:16px 18px;display:flex;justify-content:space-between;gap:12px;align-items:center}.lote4-detail summary::-webkit-details-marker{display:none}.lote4-detail[open] summary{border-bottom:2px solid rgba(117,94,67,.35)}.lote4-detail>ul,.lote4-detail>.backstage-list{margin:0;padding:16px 22px 18px}.lote4-detail li+li{margin-top:8px}.lote4-count{font-size:.8rem;opacity:.7}.backstage-list{display:grid;gap:0}.backstage-row{display:grid;grid-template-columns:minmax(190px,.7fr) 1.3fr;gap:16px;padding:10px 0;border-bottom:1px dashed rgba(117,94,67,.3)}.backstage-row:last-child{border-bottom:0}.backstage-row span{opacity:.86}.lote4-extra-intro{margin-bottom:16px}@media(max-width:720px){.backstage-row{grid-template-columns:1fr;gap:4px}}
  `;
  document.head.appendChild(style);
}

function enhance(){
  injectStyles();
  const route=(location.hash||'#inicio').slice(1);
  const app=document.querySelector('#app');
  if(!app) return;
  if(route==='amendments'){
    if(!app.querySelector('[data-lote4-route="amendments"]')) app.innerHTML=amendmentsPage();
  }else if(route==='bastidores'){
    if(!app.querySelector('[data-lote4-route="bastidores"]')) app.innerHTML=backstagePage();
  }else if(route==='extras') enhanceExtras();
}

window.addEventListener('hashchange',()=>queueMicrotask(enhance));
queueMicrotask(enhance);
