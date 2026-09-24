"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMundinho } from "@/components/app-providers";

export function HomeView() {
  const { content, states, customItems, mode } = useMundinho();
  const ids = new Set<string>();
  content.guides.forEach((guide) => guide.checklist.forEach(([id]) => ids.add(id)));
  content.progression.forEach((item) => ids.add(item.id));
  content.extras?.items.forEach((item) => ids.add(item.id));
  customItems.forEach((item) => ids.add(`custom:${item.id}`));
  const total = ids.size;
  const completed = [...ids].filter((id) => states[id]?.completed).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const next = content.progression.find((item) => !states[item.id]?.completed);
  const last = Object.values(states).filter((item) => item.completed && item.completed_at).sort((a, b) => String(b.completed_at).localeCompare(String(a.completed_at)))[0];

  return (
    <div className="space-y-6 page-enter">
      <section className="grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
        <Card surface="paper" className="relative overflow-hidden">
          <CardHeader><p className="font-label text-2xl text-wood-700">nosso mundo</p><CardTitle className="text-base sm:text-xl">Mundinho · pra sempre</CardTitle></CardHeader>
          <CardContent>
            <p className="max-w-2xl text-base leading-7">Um canto para lembrar o que já fizemos, decidir o próximo desafio e não esquecer aquela receita que a gente jurou que ia lembrar.</p>
            <div className="mt-6 border-4 border-night-950 bg-night-900 p-3 text-paper-50 shadow-inset">
              <div className="flex justify-between gap-3 font-label text-xl"><span>XP do mundinho</span><span>{completed}/{total} · {percent}%</span></div>
              <div className="mt-2 h-5 border-4 border-night-950 bg-stone-700"><div className="xp-fill h-full bg-grass-500" style={{ width: `${percent}%` }} /></div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="border-4 border-night-950 bg-torch-100 p-4 shadow-pixel-sm"><span className="font-label text-xl">Próximo sugerido</span>{next ? <><strong className="mt-1 block">{next.title}</strong><p className="mt-1 text-sm">{next.entry} · {next.phase}</p><Link className="mt-3 inline-block font-label text-xl underline" href={`/progressao#${encodeURIComponent(next.id)}` as Route}>ver na progressão</Link></> : <p className="mt-2">Tudo marcado. Isso parece suspeito.</p>}</div>
              <div className="border-4 border-night-950 bg-stone-100 p-4 shadow-pixel-sm"><span className="font-label text-xl">Última marcação</span>{last ? <><strong className="mt-1 block">{last.item_id}</strong><p className="mt-1 text-sm">{last.completed_by} · {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(last.completed_at!))}</p></> : <p className="mt-2">Ainda sem marcações nesta base.</p>}</div>
            </div>
          </CardContent>
        </Card>

        <figure className="polaroid-card rotate-[-1deg] border-4 border-night-950 bg-paper-50 p-3 pb-5 shadow-pixel">
          <div className="relative aspect-[4/3] overflow-hidden border-4 border-night-950 bg-stone-300"><Image src="/memories/selfie.jpg" alt="Lembrança do Mundinho" fill className="object-cover image-pixel-soft" sizes="(max-width: 1024px) 100vw, 35vw" /></div>
          <figcaption className="mt-3 text-center font-label text-2xl text-ink-900">A fogueira fica. A gente já volta.</figcaption>
        </figure>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat title="Guias" value={String(content.guides.length)} /><Stat title="Marcos" value={String(content.progression.length)} /><Stat title="Ideias extras" value={String(content.extras?.items.length ?? 0)} /><Stat title="Sincronização" value={mode === "supabase" ? "online" : "local"} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card surface="wood"><CardHeader><CardTitle>gr1d + benamu</CardTitle></CardHeader><CardContent className="flex items-end justify-center gap-8"><Skin src="/skins/gr1d.png" name="gr1d" /><Skin src="/skins/benamu.png" name="benamu" /></CardContent></Card>
        <Card surface="paper"><CardHeader><CardTitle>Prateleira de troféus</CardTitle></CardHeader><CardContent><p className="text-sm leading-6">Os bosses marcados vão ganhando história aqui. Por enquanto, a prateleira usa o progresso real dos guias.</p><div className="mt-4 flex flex-wrap gap-2">{content.guides.filter((guide) => guide.type === "chefe" && guide.checklist.some(([id]) => states[id]?.completed)).slice(0, 10).map((guide) => <span key={guide.id} className="border-4 border-night-950 bg-torch-100 px-3 py-2 font-label text-lg shadow-pixel-sm">{guide.title}</span>)}</div></CardContent></Card>
      </section>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) { return <Card surface="stone"><CardContent><span className="font-label text-xl text-wood-700">{title}</span><strong className="mt-2 block font-display text-lg">{value}</strong></CardContent></Card>; }
function Skin({ src, name }: { src: string; name: string }) { return <figure className="text-center"><div className="skin-preview relative h-40 w-24 overflow-hidden" style={{ backgroundImage: `url(${src})` }} aria-label={`Skin de ${name}`} /><figcaption className="mt-2 font-label text-xl">{name}</figcaption></figure>; }
