"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContentIcon } from "@/components/media/content-icon";
import { SkinFace } from "@/components/media/skin-face";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";
import { SyncStatus } from "@/components/shell/sync-status";
import { useMundinho } from "@/components/app-providers";
import { dependencyReady, flatPlayerKey, sortProgression } from "@/lib/progression-model";
import { findGuideForText, guideThemeClasses } from "@/lib/guide-theme";
import { STATIC_TOTALS } from "@/lib/static-totals";
import { cn } from "@/lib/cn";
import type { Actor, ContentStore, CustomItem, ProgressionItem, ProgressionSubitem } from "@/types/content";

export function HomeView() {
  const { actor, content, states, playerStates, customItems, dataStatus, dataError, syncStatus, retry } = useMundinho();
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
  const nextGuide = next ? findGuideForText(content.guides, `${next.entry} ${next.mods} ${next.title}`) : undefined;
  const nextTheme = guideThemeClasses(nextGuide?.theme);
  const last = Object.values(states).filter((item) => item.completed && item.completed_at).sort((a, b) => String(b.completed_at).localeCompare(String(a.completed_at)))[0];
  const lastLabel = last ? resolveStateLabel(content, customItems, last.item_id) : null;
  const trophies = buildTrophies(content.progression);
  const unlockedTrophies = trophies.filter((trophy) => states[trophy.stateId]?.completed || (["gr1d", "benamu"] as const).some((who) => playerStates[flatPlayerKey(who, trophy.stateId)]?.completed));
  const syncValue = syncStatus === "supabase" ? "ONLINE" : syncStatus === "preview-local" ? "LOCAL" : syncStatus === "connecting" ? "..." : "ERRO";

  return (
    <div className="space-y-6 page-enter">
      <section className="grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
        <Card surface="paper" className="relative overflow-hidden text-ink-900">
          <CardHeader className="border-t-2 border-t-torch-500 text-ink-900">
            <p className="font-label text-2xl text-wood-700">nosso mundo</p>
            <CardTitle display className="text-ink-900">Mundinho · pra sempre</CardTitle>
          </CardHeader>
          <CardContent className="text-ink-900">
            <p className="max-w-2xl text-base leading-7">Um canto para lembrar o que já fizemos, decidir o próximo desafio e não esquecer aquela receita que a gente jurou que ia lembrar.</p>

            <div className="mt-6 border border-night-950 bg-night-900 p-3 text-paper-50" aria-live="polite">
              <div className="flex justify-between gap-3 font-label text-xl">
                <span>XP do mundinho</span>
                {dataStatus === "ready" ? <span>{completed}/{total} · {percent}%</span> : <span>{dataStatus === "loading" ? "acendendo..." : "indisponível"}</span>}
              </div>
              {dataStatus === "ready" ? (
                <div className="mt-2 h-5 border-2 border-night-950 bg-stone-700"><div className="xp-fill h-full bg-grass-500" style={{ width: `${percent}%` }} /></div>
              ) : dataStatus === "loading" ? (
                <div className="mt-2 h-5 animate-pulse border-2 border-night-950 bg-stone-700" aria-label="Carregando XP" />
              ) : (
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-redstone-100"><span>Falha ao carregar progresso.</span><Button variant="danger" size="sm" onClick={retry}>tentar novamente</Button></div>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className={cn("border border-torch-700 bg-torch-100 p-4 text-ink-900", dataStatus === "ready" && next && nextTheme.frame)}>
                <span className="flex items-center gap-2 font-label text-xl"><PixelIcon name="compass" size={18} /> Próximo sugerido para {actor}</span>
                {dataStatus === "loading" ? (
                  <p className="mt-2 font-label text-xl">acendendo as tochas...</p>
                ) : dataStatus === "error" ? (
                  <div className="mt-2"><p className="text-sm text-redstone-900">Não deu para ler a progressão agora.</p><Button variant="danger" size="sm" className="mt-2" onClick={retry}>tentar novamente</Button></div>
                ) : next ? (
                  <><strong className="mt-1 block">#{String(next.order).padStart(3, "0")} · {next.title}</strong><p className="mt-1 text-sm">{next.entry} · {next.phase} · risco {next.risk}</p><Link className="semantic-link mt-3 inline-block font-label text-xl" href={`/progressao#${next.id}` as Route}>ver na progressão</Link></>
                ) : (
                  <p className="mt-2">Tudo elegível já foi marcado. Aí sim dá para escolher por vontade.</p>
                )}
              </div>

              <div className="border border-stone-500 bg-stone-100 p-4 text-ink-900">
                <span className="flex items-center gap-2 font-label text-xl"><PixelIcon name="book" size={18} /> Última marcação</span>
                {dataStatus === "loading" ? <p className="mt-2 font-label text-xl">lendo o diário...</p> : dataStatus === "error" ? <p className="mt-2 text-sm text-redstone-900">Falha ao ler as marcações.</p> : last ? <><strong className="mt-1 block">{lastLabel}</strong><p className="mt-1 text-sm">{last.completed_by} · {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(last.completed_at!))}</p></> : <p className="mt-2">Ainda sem marcações nesta base.</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <figure className="polaroid-card rotate-[-1deg] border-4 border-night-950 bg-paper-50 p-3 pb-5 shadow-pixel">
          <div className="relative aspect-[4/3] overflow-hidden border-2 border-night-950 bg-stone-300"><Image src="/memories/selfie.jpg" alt="Lembrança do Mundinho" fill className="object-cover image-pixel-soft" sizes="(max-width: 1024px) 100vw, 35vw" /></div>
          <figcaption className="mt-3 text-center font-label text-2xl text-ink-900">A fogueira fica. A gente já volta.</figcaption>
        </figure>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Resumo do Mundinho">
        <Stat icon="book" title="Guias" value={String(STATIC_TOTALS.guides)} />
        <Stat icon="compass" title="Marcos" value={String(STATIC_TOTALS.progression)} />
        <Stat icon="heart" title="Ideias extras" value={String(STATIC_TOTALS.extras)} />
        <Card surface="stone" className="bg-stone-100 text-ink-900"><CardContent className="min-h-32"><span className="flex items-center gap-2 font-label text-xl text-ink-700"><PixelIcon name="torch" size={18} /> Sincronização</span><strong className="mt-3 block break-words font-display text-xl leading-relaxed text-night-950 sm:text-2xl">{syncValue}</strong><div className="mt-2"><SyncStatus compact /></div></CardContent></Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card surface="paper" className="text-ink-900">
          <CardHeader tone="wood"><CardTitle>gr1d + benamu</CardTitle></CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2"><PlayerPanel actor="gr1d" src="/skins/gr1d.png" progression={content.progression} dataStatus={dataStatus} /><PlayerPanel actor="benamu" src="/skins/benamu.png" progression={content.progression} dataStatus={dataStatus} /></CardContent>
        </Card>

        <Card surface="paper" className="text-ink-900">
          <CardHeader tone="wood"><div className="flex flex-wrap items-center justify-between gap-2"><CardTitle>Prateleira de troféus</CardTitle><Link href={"/extras#extra-museum" as Route} className="semantic-link font-label text-lg">Construir um museu de troféus ↗</Link></div></CardHeader>
          <CardContent>
            <p className="text-sm leading-6">Cada boss fica em sombra até alguém marcar o marco correspondente. Sem pressa: a prateleira cresce junto com o mundo.</p>
            {dataStatus === "loading" ? (
              <div className="my-4 border border-stone-500 bg-stone-100 p-4 font-label text-xl" role="status">montando a prateleira...</div>
            ) : dataStatus === "error" ? (
              <div className="my-4 border border-redstone-700 bg-redstone-100 p-4 text-redstone-900"><p>{dataError || "Falha ao carregar os troféus."}</p><Button variant="danger" size="sm" className="mt-2" onClick={retry}>tentar novamente</Button></div>
            ) : (
              <>
                {unlockedTrophies.length === 0 ? <div className="my-4 flex items-center gap-3 border border-gold-700 bg-gold-100 p-3 text-gold-900"><PixelIcon name="chest" size={30} /><p className="font-label text-xl">os troféus de vocês vão morar aqui</p></div> : null}
                {trophies.length ? <div className="trophy-shelf mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{trophies.map((trophy) => {
                  const state = states[trophy.stateId];
                  const personal = (["gr1d", "benamu"] as const).map((who) => playerStates[flatPlayerKey(who, trophy.stateId)]).find((row) => row?.completed);
                  const done = Boolean(state?.completed || personal?.completed);
                  const markedBy = state?.completed_by ?? personal?.actor ?? "?";
                  const markedAt = state?.completed_at ?? personal?.completed_at;
                  return <Link key={trophy.stateId} href={`/progressao#${trophy.parent.id}` as Route} title={done ? trophy.title : `derrote ${trophy.title} para desbloquear`} className={cn("trophy-slot pixel-card-interactive bg-stone-100 p-2 text-center text-ink-900", done ? "border-gold-700" : "border-stone-700")}><TrophyArt trophy={trophy} unlocked={done} /><strong className="mt-2 block text-xs leading-4">{trophy.title}</strong><span className={cn("mt-1 block font-label text-base leading-4", done ? "text-gold-900" : "text-stone-700")}>{done ? `${markedBy} · ${markedAt ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(markedAt)) : "feito"}` : "a descobrir"}</span></Link>;
                })}</div> : <p className="mt-4 text-sm">Nenhum troféu foi carregado para esta base.</p>}
              </>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function PlayerPanel({ actor, src, progression, dataStatus }: { actor: Actor; src: string; progression: ProgressionItem[]; dataStatus: "loading" | "ready" | "error" }) {
  const { playerStates } = useMundinho();
  const completed = progression.filter((item) => playerStates[flatPlayerKey(actor, item.id)]?.completed).length;
  return <article className="border border-stone-500 bg-paper-50 p-3 text-center text-ink-900"><SkinFace src={src} name={actor} size="lg" className="mx-auto" /><strong className="mt-2 block font-label text-2xl">{actor}</strong>{dataStatus === "ready" ? <><p className="mt-1 text-sm">{completed}/{STATIC_TOTALS.progression} marcos concluídos</p><div className="mt-2 h-3 border border-night-950 bg-stone-300"><div className="h-full bg-grass-500" style={{ width: `${Math.round((completed / STATIC_TOTALS.progression) * 100)}%` }} /></div></> : <p className="mt-2 font-label text-lg">{dataStatus === "loading" ? "carregando progresso..." : "progresso indisponível"}</p>}</article>;
}

function TrophyArt({ trophy, unlocked }: { trophy: Trophy; unlocked: boolean }) {
  const source = trophy.subitem?.imagem?.src ?? trophy.subitem?.icone ?? trophy.parent.imagem?.src ?? trophy.parent.icone;
  if (source) return <ContentIcon src={source} alt={`Troféu: ${trophy.title}`} kind="boss" locked={!unlocked} className="mx-auto size-14" />;
  return <span className={cn("mx-auto grid size-14 place-items-center", unlocked ? "trophy-placeholder-unlocked" : "trophy-placeholder-locked")}><PixelIcon name="pickaxe" size={38} title={`Símbolo de troféu: ${trophy.title}`} /></span>;
}

type Trophy = { stateId: string; title: string; parent: ProgressionItem; subitem?: ProgressionSubitem };
function buildTrophies(items: ProgressionItem[]): Trophy[] {
  const result: Trophy[] = [];
  for (const item of items) {
    const trophySubitems = item.subitens?.filter((subitem) => subitem.trophy) ?? [];
    if (trophySubitems.length) { trophySubitems.forEach((subitem) => result.push({ stateId: subitem.id, title: subitem.title, parent: item, subitem })); continue; }
    const type = item.type.toLocaleLowerCase("pt-BR");
    const isPreparationOnly = type.includes("preparação") || type.includes("preparacao");
    if (!isPreparationOnly && (type.includes("boss") || type.includes("miniboss") || item.order === 530 || item.order === 570)) result.push({ stateId: item.id, title: item.title, parent: item });
  }
  return result;
}

function resolveStateLabel(content: ContentStore, customItems: CustomItem[], id: string) {
  const progression = content.progression.find((item) => item.id === id);
  if (progression) return `#${String(progression.order).padStart(3, "0")} · ${progression.title}`;
  for (const item of content.progression) {
    const subitem = item.subitens?.find((candidate) => candidate.id === id);
    if (subitem) return `#${String(item.order).padStart(3, "0")} · ${item.title} — ${subitem.title}`;
  }
  for (const guide of content.guides) {
    const row = guide.checklist.find(([itemId]) => itemId === id);
    if (row) return `${guide.title} · ${row[1]}`;
  }
  const extra = content.extras?.items.find((item) => item.id === id);
  if (extra) return `Extra · ${extra.title}`;
  const customId = id.startsWith("custom:") ? id.slice("custom:".length) : id;
  const custom = customItems.find((item) => item.id === customId);
  if (custom) return `Objetivo de ${custom.created_by} · ${custom.title}`;
  return "Marcação registrada";
}

function Stat({ icon, title, value }: { icon: PixelIconName; title: string; value: string }) {
  return <Card surface="stone" className="bg-stone-100 text-ink-900"><CardContent className="min-h-32"><span className="flex items-center gap-2 font-label text-xl text-ink-700"><PixelIcon name={icon} size={18} /> {title}</span><strong className="mt-3 block break-words font-display text-xl leading-relaxed text-night-950 sm:text-2xl">{value}</strong></CardContent></Card>;
}
