// Polimento visual: não altera dados, rotas ou conteúdo dos guias.
const app = document.querySelector('#app');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

// Carrega por último para vencer apenas a camada visual injetada pelos lotes anteriores.
if (!document.querySelector('link[data-visual-polish]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './visual-polish.css';
  link.dataset.visualPolish = '1';
  document.head.appendChild(link);
}

const PHOTO = './assets/memory-selfie.jpg';
const esc=(v='')=>String(v).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]||c));
const route=()=>((location.hash||'#inicio').slice(1));

function themeRoute(){
  const r=['inicio','progressao','mods','amendments','extras','bastidores'].includes(route())?route():'inicio';
  [...document.body.classList].filter(c=>c.startsWith('theme-')).forEach(c=>document.body.classList.remove(c));
  document.body.classList.add(`theme-${r}`);
}

function pixelIcon(category){
  const common=`viewBox="0 0 32 32" aria-hidden="true" focusable="false"`;
  const svgs={
    dimension:`<svg ${common}><rect x="4" y="2" width="24" height="28" fill="#3a2c3f"/><rect x="8" y="6" width="16" height="20" fill="#7e5aa6"/><rect x="12" y="10" width="8" height="12" fill="#c290e8"/><rect x="4" y="2" width="4" height="4" fill="#d2b3ef"/><rect x="24" y="26" width="4" height="4" fill="#51376b"/></svg>`,
    boss:`<svg ${common}><rect x="6" y="8" width="20" height="16" fill="#9a493f"/><rect x="3" y="5" width="7" height="7" fill="#c66b55"/><rect x="22" y="5" width="7" height="7" fill="#c66b55"/><rect x="9" y="12" width="5" height="5" fill="#f1d365"/><rect x="18" y="12" width="5" height="5" fill="#f1d365"/><rect x="13" y="20" width="6" height="4" fill="#4b1e1b"/><rect x="1" y="1" width="5" height="3" fill="#6e2b27"/><rect x="26" y="1" width="5" height="3" fill="#6e2b27"/></svg>`,
    structure:`<svg ${common}><rect x="4" y="12" width="24" height="17" fill="#9b7857"/><rect x="4" y="8" width="6" height="6" fill="#c39b70"/><rect x="13" y="6" width="6" height="8" fill="#c39b70"/><rect x="22" y="8" width="6" height="6" fill="#c39b70"/><rect x="8" y="18" width="5" height="5" fill="#4e3c2e"/><rect x="19" y="18" width="5" height="5" fill="#4e3c2e"/><rect x="14" y="21" width="4" height="8" fill="#5f4938"/></svg>`,
    utility:`<svg ${common}><rect x="5" y="9" width="22" height="18" fill="#6e543d"/><rect x="8" y="6" width="16" height="6" fill="#8a6a4c"/><rect x="5" y="15" width="22" height="4" fill="#b58a50"/><rect x="13" y="15" width="6" height="7" fill="#e0b75e"/><rect x="7" y="25" width="6" height="4" fill="#3e3025"/><rect x="19" y="25" width="6" height="4" fill="#3e3025"/></svg>`,
    decoration:`<svg ${common}><rect x="14" y="3" width="4" height="13" fill="#6f944c"/><rect x="7" y="7" width="7" height="7" fill="#c97587"/><rect x="18" y="7" width="7" height="7" fill="#e19aac"/><rect x="11" y="12" width="10" height="7" fill="#d58a92"/><rect x="9" y="18" width="14" height="4" fill="#9a633f"/><rect x="11" y="22" width="10" height="7" fill="#74462f"/></svg>`,
    automation:`<svg ${common}><rect x="12" y="3" width="8" height="26" fill="#787875"/><rect x="3" y="12" width="26" height="8" fill="#787875"/><rect x="6" y="6" width="20" height="20" fill="#a7a39a"/><rect x="10" y="10" width="12" height="12" fill="#5c5a55"/><rect x="14" y="14" width="4" height="4" fill="#d48b42"/><rect x="2" y="14" width="4" height="4" fill="#d48b42"/><rect x="26" y="14" width="4" height="4" fill="#d48b42"/></svg>`
  };
  return svgs[category]||svgs.utility;
}

function categoryFor(article){
  const type=(article.querySelector('.guide-meta .tag')?.textContent||'').trim().toLowerCase();
  const text=(article.textContent||'').toLowerCase();
  if(type.includes('dimensão')) return 'dimension';
  if(type.includes('chefe')||type.includes('boss')) return 'boss';
  if(type.includes('estrutura')) return 'structure';
  if(type.includes('automação')) return 'automation';
  if(type.includes('decoração')) return 'decoration';
  if(/aether|twilight forest|undergarden|bumblezone|eternal starlight|deeper and darker|end reformulado/.test(text)) return 'dimension';
  if(/ignis|cataclysm|mowzie|bosses of mass destruction|void worm|leviathan|remnant|scylla|harbinger/.test(text)) return 'boss';
  if(/estrutura|masmorra|dungeon|templo|fortress|village|incendium|graveyard/.test(text)) return 'structure';
  if(/create|automação|máquina|maquina|engenhoca/.test(text)) return 'automation';
  if(/decoração|furniture|handcrafted|take a seat|amendments|supplementaries/.test(text)) return 'decoration';
  return 'utility';
}

function polishGuides(root=document){
  root.querySelectorAll('.accordion').forEach((article,index)=>{
    const head=article.querySelector('.accordion-head');
    if(!head || head.querySelector('.guide-category-icon')) return;
    const category=categoryFor(article);
    const icon=document.createElement('span');
    icon.className=`guide-category-icon category-${category}`;
    icon.title={dimension:'Dimensão',boss:'Chefe',structure:'Estrutura',utility:'Utilidade',decoration:'Decoração',automation:'Automação'}[category];
    icon.innerHTML=pixelIcon(category);
    head.prepend(icon);
    const inner=article.querySelector('.guide-inner');
    if(inner && !inner.querySelector('.guide-character-stamp')){
      const stamp=document.createElement('div');
      stamp.className='guide-character-stamp';
      const who=index%2===0?'gr1d':'benamu';
      stamp.innerHTML=`<span class="skin-face ${who} small" aria-label="skin de ${who}"></span>`;
      inner.prepend(stamp);
    }
  });
}

function photoPolaroid(caption, extraClass=''){
  const f=document.createElement('figure');
  f.className=`memory-polaroid ${extraClass}`.trim();
  f.innerHTML=`<span class="memory-pin" aria-hidden="true"></span><img src="${PHOTO}" alt="${esc(caption)}"><figcaption>${esc(caption)}</figcaption>`;
  return f;
}

function skinPolaroid(caption, kind='pair'){
  const f=document.createElement('figure');
  f.className='memory-polaroid skin-polaroid';
  const inner=kind==='pair'
    ? `<div class="scrap-skins"><span class="skin-face gr1d"></span><span class="scrap-heart">♥</span><span class="skin-face benamu"></span></div>`
    : `<div class="scrap-icon-set">${pixelIcon('dimension')}${pixelIcon('boss')}${pixelIcon('structure')}</div>`;
  f.innerHTML=`<span class="memory-pin" aria-hidden="true"></span>${inner}<figcaption>${esc(caption)}</figcaption>`;
  return f;
}

function polishHome(){
  if(route()!=='inicio') return;
  const page=app?.querySelector('.page'); if(!page) return;
  const hero=page.querySelector('.hero-photo');
  if(hero && !hero.dataset.realPhoto){
    hero.dataset.realPhoto='1';
    hero.innerHTML=`<img src="${PHOTO}" alt="gr1d e benamu no mundinho"><figcaption>um pedaço do nosso mundo</figcaption>`;
  }
  if(!page.querySelector('.memory-strip')){
    const strip=document.createElement('div');
    strip.className='memory-strip';
    strip.setAttribute('aria-label','colagem do nosso mundinho');
    strip.append(
      skinPolaroid('duas skins, um save'),
      photoPolaroid('foto guardada no diário','memory-crop'),
      skinPolaroid('dimensões, bosses e histórias', 'icons')
    );
    page.querySelector('.hero-grid')?.insertAdjacentElement('afterend',strip);
  }
}

function polishExtras(){
  if(route()!=='extras') return;
  const page=app?.querySelector('[data-lote4-page="extras"]');
  if(!page || page.querySelector('.extras-memory-board')) return;
  const board=document.createElement('div');
  board.className='extras-memory-board';
  board.setAttribute('aria-label','colagem de memórias');
  board.append(photoPolaroid('um mundo feito a dois'),skinPolaroid('objetivos pequenos também viram memória'));
  page.querySelector('.extras-tools')?.insertAdjacentElement('afterend',board);
}

function animateProgress(root=document){
  root.querySelectorAll('.xp-fill:not([data-polish-xp])').forEach(fill=>{
    fill.dataset.polishXp='1';
    if(reduced.matches) return;
    const target=fill.style.width||'0%';
    fill.style.width='0%';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{fill.style.width=target;}));
  });
}

let scheduled=false;
function polish(){scheduled=false;themeRoute();polishGuides(app||document);polishHome();polishExtras();animateProgress(app||document)}
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(polish)}
const observer=new MutationObserver(schedule);
if(app) observer.observe(app,{childList:true,subtree:true});
window.addEventListener('hashchange',schedule);
window.addEventListener('pageshow',schedule);
schedule();
