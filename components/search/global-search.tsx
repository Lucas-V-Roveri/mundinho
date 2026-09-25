"use client";

import * as React from "react";
import type { Route } from "next";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { useMundinho } from "@/components/app-providers";
import { guideThemeClasses } from "@/lib/guide-theme";
import { cn } from "@/lib/cn";
import type { GuideTheme } from "@/types/content";

type SearchRow = { id: string; title: string; subtitle: string; href: string; group: string; theme?: GuideTheme };

export function GlobalSearch() {
  const { content, dataStatus, dataError, retry } = useMundinho();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches("input,textarea,select,[contenteditable='true']");
      if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const rows = React.useMemo<SearchRow[]>(() => {
    const result: SearchRow[] = [];
    content.guides.forEach((guide) => result.push({ id: `guide-${guide.id}`, title: guide.title, subtitle: `${guide.subtitle} · ${guide.phase}`, href: `/mods#guide-${guide.id}`, group: "Mods", theme: guide.theme }));
    content.progression.forEach((item) => result.push({ id: item.id, title: item.title, subtitle: `${item.entry} · ${item.phase}`, href: `/progressao#${encodeURIComponent(item.id)}`, group: "Progressão" }));
    content.extras?.items.forEach((item) => result.push({ id: item.id, title: item.title, subtitle: item.description, href: `/extras#${item.id}`, group: "Extras" }));
    content.backstage?.items.forEach((item) => result.push({ id: `backstage-${item.name}`, title: item.name, subtitle: `${item.fn} · ${item.version}`, href: `/bastidores#${encodeURIComponent(item.name)}`, group: "Bastidores" }));
    content.amendments?.groups.forEach((group) => result.push({ id: `amendments-${group.title}`, title: group.title, subtitle: group.items.slice(0, 2).join(" "), href: `/amendments#${encodeURIComponent(group.title)}`, group: "Amendments" }));
    return result;
  }, [content]);

  const filtered = React.useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return rows.slice(0, 18);
    return rows.filter((row) => `${row.title} ${row.subtitle} ${row.group}`.toLocaleLowerCase("pt-BR").includes(normalized)).slice(0, 40);
  }, [query, rows]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="pixel-control inline-flex min-h-9 items-center gap-1.5 border-2 border-night-950 bg-torch-500 px-2 py-1 font-label text-lg leading-none text-night-950" aria-label="Abrir busca global">
        <PixelIcon name="compass" size={16} />
        <span className="hidden min-[980px]:inline">Buscar</span>
        <kbd className="border border-night-950/70 bg-paper-100 px-1 text-sm">/</kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen} title="Busca global" description="Mods, progressão, Extras, Amendments e Bastidores." className="w-[min(94vw,46rem)]">
        <Input disabled={dataStatus !== "ready"} autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: Twilight, Hydra, Waystones..." aria-label="Pesquisar no Mundinho" />
        <div className="mt-4 max-h-[55vh] space-y-2 overflow-auto pr-1">
          {dataStatus === "loading" ? <p role="status" className="border border-stone-500 bg-stone-100 p-4 font-label text-xl text-ink-900">acendendo as tochas da busca...</p> : dataStatus === "error" ? <div role="alert" className="border border-redstone-700 bg-redstone-100 p-4 text-redstone-900"><p className="font-label text-xl">falha ao carregar o índice</p><p className="mt-1 text-sm">{dataError || "A fonte de dados não respondeu."}</p><Button variant="danger" size="sm" className="mt-3" onClick={retry}>tentar novamente</Button></div> : filtered.length ? filtered.map((row) => {
            const theme = guideThemeClasses(row.theme);
            return <Link key={`${row.group}-${row.id}`} href={row.href as Route} onClick={() => { setOpen(false); setQuery(""); }} className={cn("pixel-card-interactive block border-4 border-night-950 bg-paper-50 p-3 text-ink-900", row.group === "Mods" && theme.frame)}><span className="font-label text-xl text-blue-700">{row.group}</span><strong className="mt-1 block text-sm">{row.title}</strong><span className="mt-1 block text-xs leading-5 text-ink-700">{row.subtitle}</span></Link>;
          }) : <p className="border border-stone-500 bg-stone-100 p-4 text-sm text-ink-900">Nada encontrado.</p>}
        </div>
      </Dialog>
    </>
  );
}
