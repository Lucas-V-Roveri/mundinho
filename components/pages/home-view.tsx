"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentIcon, iconKindForType } from "@/components/media/content-icon";
import { useMundinho } from "@/components/app-providers";
import { dependencyReady, flatPlayerKey, sortProgression } from "@/lib/progression-model";
import type { Actor, ProgressionItem, ProgressionSubitem } from "@/types/content";

export function HomeView() {
  const { actor, content, states, playerStates, customItems, mode } = useMundinho();
  const ids = new Set<string>();
  content.guides.forEach((guide) => guide.checklist.forEach(([id]) => ids.add(id)));
  content.progression.forEach((item) => ids.add(item.id));
  content.extras?.items.forEach((item) => ids.add(item.id));
  customItems.filter((item) => new Date(item.created_at).getTime() >= new Date("2026-09-24T20:00:00Z").getTime()).forEach((item) => ids.add(`custom:${item.id}`));
  const total = ids.size;
  const completed = [...ids].filter((id) => states[id]?.completed).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const sorted = sortProgression(content.progression);
  const next = sorted.find((item) => !playerStates[flatPlayerKey(actor, item.id)]?.completed && dependencyReady(item, (id) => Boolean(playerStates[flatPlayerKey(actor, id)]?.completed)));
  const last = Object.values(states).filter((item) => item.completed && item.completed_at).sort((a, b) => String(b.completed_at).localeCompare(String(a.completed_at)))[0];
  const trophies = buildTrophies(content.progression);

  return (
    <div className="space-y-6 page-enter">
      <section className="grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
        <Card surface="paper" className="relative overflow-hidden">
          <CardHeader><p className="font-label text-2xl text-wood-700">nosso mundo</p><CardTitle className="text-base sm:text-xl">Mundinho · pra sempre</CardTitle></CardHeader>
          <CardContent>
            <p className="max-w-2xl text-base leading-7">Um canto para lembrar o que já fizemos, decidir o próximo desafio e não esquecer aquela receita que a gente jurou que ia lembrar.</p>
            <div className="mt-6 border-4 border-night-950 bg-night-900 p-3 text-paper-50 shadow-inset"><div className="flex justify-between gap-3 font-label text-xl"><span>XP do mundinho</span><span>{completed}/{total} · {percent}%</span></div><div className="mt-2 h-5 border-4 border-night-950 bg-stone-700"><div className="xp-fill h-full bg-grass-500" style={{ width: `${percent}%` }} /></div></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="border-4 border-night-950 bg-torch-100 p-4 shadow-pixel-sm"><span className="font-label text-xl">Próximo sugerido para {actor}</span>{next ? <><strong className="mt-1 block">#{String(next.order).padStart(3, "0")} · {next.title}</strong><p className="mt-1 text-sm">{next.entry} · {next.phase} · risco {next.risk}</p><Link className="mt-3 inline-block font-label text-xl underline" href={`/progressao#${next.id}` as Route}>ver na progressão</Link></> : <p className="mt-2">Tudo elegível já foi marcado. Aí sim dá para escolher por vontade.</p>}</div>
              <div className="border-4 border-night-950 bg-stone-100 p-4 shadow-pixel-sm"><span className="font-label text-xl">Última marcação do mundinho</span>{last ? <><strong className="mt-1 block">{last.item_id}</strong><p className="mt-1 text-sm">{last.completed_by} · {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(last.completed_at!))}</p></> : <p className="mt-2">Ainda sem marcações nesta base.</p>}</div>
            </div>
          </CardContent>
        </Card>
        <figure className="polaroid-card rotate-[-1deg] border-4 border-night-950 bg-paper-50 p-3 pb-5 shadow-pixel"><div className="relative aspect-[4/3] overflow-hidden border-4 border-night-950 bg-stone-300"><Image src="/memories/selfie.jpg" alt="Lembrança do Mundinho" fill className="object-cover image-pixel-soft" sizes="(max-width: 1024px) 100vw, 35vw" /></div><figcaption className="mt-3 text-center font-label text-2xl text-ink-900">A fogueira fica. A gente já volta.</figcaption></figure>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat title="Guias" value={String(content.guides.length)} /><Stat title="Marcos" value={String(content.progression.length)} /><Stat title="Ideias extras" value={String(content.extras?.items.length ?? 0)} /><Stat title="Sincronização" value={mode === "supabase" ? "online" : "local"} /></section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card surface="wood"><CardHeader><CardTitle>gr1d + benamu</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><PlayerPanel actor="gr1d" src="/skins/gr1d.png" progression={content.progression} /><PlayerPanel actor="benamu" src="/skins/benamu.png" progression={content.progression} /></CardContent></Card>
        <Card surface="paper"><CardHeader><div className="flex flex-wrap items-center justify-between gap-2"><CardTitle>Prateleira de troféus</CardTitle><Link href={"/extras#extra-museum" as Route} className="font-label text-lg underline">Construir um museu de troféus ↗</Link></div></CardHeader><CardContent><p className="text-sm leading-6">Cada boss fica em sombra até alguém marcar o marco correspondente. Sem pressa: a prateleira cresce junto com o mundo.</p><div className="trophy-shelf mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{trophies.map((trophy) => { const state = states[trophy.stateId]; const done = Boolean(state?.completed); return <Link key={trophy.stateId} href={`/progressao#${trophy.parent.id}` as Route} className="trophy-slot border-4 border-night-950 bg-stone-100 p-2 text-center text-ink-900 shadow-pixel-sm"><ContentIcon src={trophy.subitem?.imagem?.src ?? trophy.subitem?.icone ?? trophy.parent.imagem?.src ?? trophy.parent.icone} alt={`Troféu: ${trophy.title}`} kind="boss" locked={!done} className="mx-auto size-14" /><strong className="mt-2 block text-xs leading-4">{trophy.title}</strong><span className="mt-1 block text-[10px] leading-4">{done ? `${state?.completed_by ?? "?"} · ${state?.completed_at ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(state.completed_at)) : "feito"}` : "a descobrir"}</span></Link>; })}</div></CardContent></Card>
      </section>
    </div>
  );
}

function PlayerPanel({ actor, src, progression }: { actor: Actor; src: string; progression: ProgressionItem[] }) {
  const { playerStates } = useMundinho();
  const completed = progression.filter((item) => playerStates[flatPlayerKey(actor, item.id)]?.completed).length;
  return <article className="smooth-text-panel border-4 border-night-950 bg-paper-50 p-3 text-center text-ink-900 shadow-pixel-sm"><div className="skin-head mx-auto grid size-20 place-items-center border-4 border-night-950 bg-stone-300 font-display text-xl uppercase" style={{ backgroundImage: `url(${src})` }}>{actor.slice(0, 1)}</div><strong className="mt-2 block font-label text-2xl">{actor}</strong><p className="mt-1 text-sm">{completed}/{progression.length} marcos concluídos</p><div className="mt-2 h-3 border-2 border-night-950 bg-stone-300"><div className="h-full bg-grass-500" style={{ width: `${progression.length ? Math.round((completed / progression.length) * 100) : 0}%` }} /></div></article>;
}

function buildTrophies(items: ProgressionItem[]) {
  const result: { stateId: string; title: string; parent: ProgressionItem; subitem?: ProgressionSubitem }[] = [];
  for (const item of items) {
    const trophySubitems = item.subitens?.filter((subitem) => subitem.trophy) ?? [];
    if (trophySubitems.length) { trophySubitems.forEach((subitem) => result.push({ stateId: subitem.id, title: subitem.title, parent: item, subitem })); continue; }
    const type = item.type.toLocaleLowerCase("pt-BR");
    if (type.includes("boss") || type.includes("miniboss") || item.order === 530 || item.order === 570) result.push({ stateId: item.id, title: item.title, parent: item });
  }
  return result;
}

function Stat({ title, value }: { title: string; value: string }) { return <Card surface="stone"><CardContent><span className="font-label text-xl text-wood-700">{title}</span><strong className="mt-2 block font-display text-lg">{value}</strong></CardContent></Card>; }
