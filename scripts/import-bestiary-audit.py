"""Relocate definitive audit artifacts onto existing cards. No re-audit or DB writes."""
import csv, json, re, shutil, sys, html
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
AUDIT = ROOT.parent / 'auditoria/originais-extraidos'
ROWS = list(csv.DictReader((ROOT.parent/'auditoria/bestiario-todos-430-cards-2026-10-06.csv').open(encoding='utf-8-sig')))
ENTRIES = json.loads((ROOT.parent/'catalog-before.json').read_text())
CONFIG = {
 'inc': ('Incendium','Incendium','lote-5-mods-2026-10-06/inc-cards-2026-10-06.md','lote-5-mods-2026-10-06/output-inc'),
 'so': ('Spider Overhaul','Spider Overhaul',None,'spider-overhaul-6-cards-2026-10-05'),
 'bz': ('The Bumblezone','The Bumblezone','lote-5-mods-2026-10-06/bz-cards-2026-10-06.md','lote-5-mods-2026-10-06/output-bz'),
 'ff': ('Friends and Foes','Friends&Foes','lote-8-mods-2026-10-06/ff-cards-2026-10-06.md','lote-8-mods-2026-10-06/output-ff'),
 'ii': ('Illager Invasion','Illager Invasion','lote-8-mods-2026-10-06/ii-cards-2026-10-06.md','lote-8-mods-2026-10-06/output-ii'),
 'dd': ('Deeper and Darker','Deeper and Darker','lote-8-mods-2026-10-06/dd-cards-2026-10-06.md','lote-8-mods-2026-10-06/output-dd'),
 'gy': ('The Graveyard','The Graveyard','lote-8-mods-2026-10-06/gy-cards-2026-10-06.md','lote-8-mods-2026-10-06/output-gy'),
 'co': ('Creeper Overhaul','Creeper Overhaul','lote-8-mods-2026-10-06/co-cards-2026-10-06.md','lote-8-mods-2026-10-06/output-co'),
 'eo': ('Enderman Overhaul','Enderman Overhaul','lote-8-mods-2026-10-06/eo-cards-2026-10-06.md','lote-8-mods-2026-10-06/output-eo'),
 'mm': ('Mowzie’s Mobs',"Mowzie's Mobs",'lote-5-mods-2026-10-06/mm-cards-2026-10-06.md','lote-5-mods-2026-10-06/output-mm'),
 'aether': ('The Aether','The Aether','lote-final-2026-10-06/aether-cards-2026-10-06.md','lote-final-2026-10-06/output-aether'),
 'ug': ('The Undergarden','The Undergarden','lote-5-mods-2026-10-06/ug-cards-2026-10-06.md','lote-5-mods-2026-10-06/output-ug'),
 'es': ('Eternal Starlight','Eternal Starlight','lote-final-2026-10-06/es-cards-2026-10-06.md','lote-final-2026-10-06/output-es'),
 'cat': ('Cataclysm',"L_Ender's Cataclysm",'lote-5-mods-2026-10-06/cat-cards-2026-10-06.md','lote-5-mods-2026-10-06/output-cat'),
 'ac': ('Alex’s Caves',"Alex's Caves",'lote-final-2026-10-06/ac-cards-2026-10-06.md','lote-final-2026-10-06/output-ac'),
 'am': ('Alex’s Mobs Continued',"Alex's Mobs Continued",'lote-final-2026-10-06/am-cards-2026-10-06.md','lote-final-2026-10-06/output-am'),
 'tf': ('Twilight Forest','The Twilight Forest','lote-final-2026-10-06/tf-cards-2026-10-06.md','lote-final-2026-10-06/output-tf'),
}
ALIASES = {'bumblezone-variant-bee':'Variant Bee','alexsmobs-cave-centipede':'Centipede Head','mowzies-mobs-umvuthi':'Umvuthi','mowzies-mobs-sculptor':'Sculptor','mowzies-mobs-elokosa-follower-howler':'Elokosa Follower Howler','mowzies-mobs-umvuthana-follower-raptor':'Umvuthana Follower Raptor','mowzies-mobs-umvuthana-follower-player':'Umvuthana Follower Player','mowzies-mobs-umvuthana-crane-player':'Umvuthana Crane Player','graveyard-corrupted-champion':'Lich','undergarden-minion':'Minion','undergarden-smog-mog':'Smog Mog','twilightforest-rising_zombie':'Zombie'}
def norm(x): return re.sub('[^a-z0-9]','',x.lower())
def recipe_page(slug, mod, md):
 if not md: return None, set()
 text=(AUDIT/md).read_text(); recipes=[]
 for match in re.finditer(r'```json\s*(.*?)```',text,re.S):
  raw=match.group(1); d=json.loads(raw)
  if not isinstance(d,dict) or 'type' not in d:continue
  previous=text[:match.start()]; headers=re.findall(r'^### (.+)$',previous,re.M)
  if not headers:continue
  heading=headers[-1]; paths=re.findall(r'`([^`]+)`', previous[previous.rfind('### '):]);path=paths[-1] if paths else heading
  anchors=re.findall(r'<a id="(receita-[^"]+)"',previous[previous.rfind('\n## '):])
  name=heading.removeprefix('Receita ').strip('`');anchor=anchors[-1] if anchors else 'receita-'+name.lower().replace('_','-').replace(' ','-')
  recipes.append({'anchor':anchor,'name':name,'source':path,'recipe':d})
 if not recipes:return None,set()
 dst=ROOT/'public/bestiary/receitas';dst.mkdir(parents=True,exist_ok=True)
 (dst/f'{slug}.json').write_text(json.dumps(recipes,ensure_ascii=False,indent=2)+'\n')
 esc=html.escape; blocks=[]; rendered=set()
 for r in recipes:
  d=r['recipe'];pattern=d.get('pattern',[]);key=d.get('key',{});grid=''
  if pattern:
   grid='<div class="grid">'+''.join('<span title="'+esc(json.dumps(key.get(s,'vazio'),ensure_ascii=False))+'">'+esc(s if s!=' ' else '·')+'</span>' for line in pattern for s in line.ljust(3))+'</div>'
  section_id=' id="'+esc(r['anchor'])+'"' if r['anchor'] not in rendered else ''
  rendered.add(r['anchor'])
  blocks.append('<section'+section_id+'><h2>'+esc(r['name'])+'</h2><p>'+esc(d['type'])+'</p><p class="source">'+esc(r['source'])+'</p>'+grid+'<pre>'+esc(json.dumps(d,ensure_ascii=False,indent=2))+'</pre></section>')
 page='<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Receitas auditadas — '+esc(mod)+'</title><style>body{font:16px system-ui;background:#faf5e8;color:#302416;max-width:1000px;margin:auto;padding:24px}a{color:#165590}section{border:2px solid #8b7355;padding:16px;margin:20px 0;scroll-margin-top:16px}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#eee6d7;padding:16px}.source{overflow-wrap:anywhere;font-size:13px}.grid{display:grid;grid-template-columns:repeat(3,48px);gap:4px}.grid span{display:grid;place-items:center;height:48px;background:#eee;border:2px solid #777}</style><a href="/bestiario">← Bestiário</a><h1>Receitas auditadas — '+esc(mod)+'</h1><p>JSONs preservados das fontes auditadas. O caminho identifica a versão, datapack de compatibilidade ou overlay; variantes condicionais não são receitas universais da instância.</p><a href="'+slug+'.json">Baixar JSONs e caminhos de origem</a>'+''.join(blocks)+'</html>'
 (dst/f'{slug}.html').write_text(page)
 return f'/bestiary/receitas/{slug}.html',{r['anchor']for r in recipes}
for slug in sys.argv[1:]:
 amod,mod,md,assets=CONFIG[slug];entries=[e for e in ENTRIES if e['mod']==mod];out={};count=0;nulls=[];guide,anchors=recipe_page(slug,mod,md)
 assets=AUDIT/assets;provenance=assets/'proveniencia.json';assert provenance.exists(),provenance
 target=ROOT/'public/bestiary/auditoria'/f'{slug}-proveniencia.json';shutil.copy2(provenance,target)
 for e in entries:
  name=ALIASES.get(e['id'],e['nameEn']);rr=[dict(r)for r in ROWS if r['Mod']==amod and norm(r['Mob'])==norm(name)];assert rr,(slug,e['id'],name)
  for r in rr:
   images=re.findall(r'[^;\s]+\.png',r['Imagem'])
   if images:
    paths=[assets/Path(p).name for p in images];assert all(p.exists()for p in paths),paths
    dst=ROOT/'public/images/bestiary/audited'/slug;dst.mkdir(parents=True,exist_ok=True)
    for p in paths:shutil.copy2(p,dst/p.name)
    r['Imagem']=f'/images/bestiary/audited/{slug}/{paths[0].name}'
   local=re.findall(r'#(receita-[^)\s]+)',r['Crafting'])
   if local:
    assert guide and set(local)<=anchors,(slug,name,set(local)-anchors)
    r['Crafting']=guide+'#'+local[0]+' | '+r['Crafting']
  if not rr[0]['Imagem'].startswith('/images/'):nulls.append(e['id'])
  out[e['id']]={'rows':rr,'recipes':[],'imageSourceUrl':f'/bestiary/auditoria/{slug}-proveniencia.json',**({'recipeGuideHref':guide}if guide else {})};count+=len(rr)
 (ROOT/'data'/f'bestiary-audit-{slug}.json').write_text(json.dumps(out,ensure_ascii=False,separators=(',',':'))+'\n')
 assert count==sum(1 for r in ROWS if r['Mod']==amod),(slug,'missing/duplicated audited rows',count)
 assert len({norm(a['rows'][0]['Mob']) for a in out.values()})==len(entries),(slug,'duplicate mob association')
 export=ROOT/'public/bestiary/auditoria'/f'{slug}-cards.csv'
 with export.open('w',encoding='utf-8-sig',newline='')as f:
  writer=csv.DictWriter(f,fieldnames=ROWS[0]);writer.writeheader();writer.writerows(r for a in out.values()for r in a['rows'])
 p=ROOT/'data/bestiary-audit-registry.ts';text=p.read_text();name='audit_'+slug
 text=text.replace(f'import {name} from "@/data/bestiary-audit-{slug}.json";\n','').replace('\n  ...'+name+',','')
 text=f'import {name} from "@/data/bestiary-audit-{slug}.json";\n'+text
 text=text.replace('...initial,','...initial,\n  ...'+name+',');p.write_text(text)
 print(json.dumps({'group':mod,'cards':len(out),'rows':count,'nullImages':nulls,'recipeGuide':guide},ensure_ascii=False))
