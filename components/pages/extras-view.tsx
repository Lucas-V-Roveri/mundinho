"use client";

import Image from "next/image";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { CustomItemPanel } from "@/components/checklist/custom-item-panel";
import { useMundinho } from "@/components/app-providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";

export function ExtrasView() {
  const { content } = useMundinho();
  const items = content.extras?.items ?? [];
  return <div className="space-y-6 page-enter">
    <header className="grid gap-5 lg:grid-cols-[1fr_20rem]">
      <div className="pixel-surface panel-paper p-5 text-ink-900"><p className="font-label text-2xl text-wood-700">coisas que não dão XP</p><h1 className="mt-2 font-display text-lg leading-relaxed text-ink-900 sm:text-2xl">Extras</h1><p className="mt-3 max-w-3xl leading-7 text-ink-900">Objetivos que existem porque o mundo é de vocês dois. Não são gates e não entram na progressão de dificuldade.</p></div>
      <figure className="polaroid-card rotate-[1deg] border-2 border-night-950 bg-paper-50 p-3 pb-5 shadow-soft"><div className="relative aspect-[4/3] overflow-hidden border border-night-950"><Image src="/memories/selfie.jpg" alt="Lembrança dos dois no Mundinho" fill className="object-cover" sizes="320px" /></div><figcaption className="mt-3 text-center font-label text-xl text-ink-900">guardar um pouco do mundo também conta.</figcaption></figure>
    </header>
    <div className="grid gap-4 md:grid-cols-2">{items.map((item) => <Card key={item.id} id={item.id} surface="paper" interactive className="scroll-mt-40"><CardHeader><div className="flex items-center gap-3"><span className="grid size-9 place-items-center border border-torch-700 bg-torch-100 text-torch-700"><PixelIcon name={iconForExtra(item.title)} size={20} /></span><CardTitle className="text-ink-900">{item.title}</CardTitle></div></CardHeader><CardContent className="text-ink-900"><p className="mb-4 text-sm leading-6">{item.description}</p><ChecklistItem itemId={item.id} label={item.title} phase="carinho" section="extras" entryKey="extras" /></CardContent></Card>)}</div>
    <CustomItemPanel section="extras" entryKey="extras" allowPhase={false} />
  </div>;
}

function iconForExtra(title: string): PixelIconName {
  const value = title.toLocaleLowerCase("pt-BR");
  if (value.includes("museu") || value.includes("baú") || value.includes("bau")) return "chest";
  if (value.includes("explor") || value.includes("viaj") || value.includes("map")) return "compass";
  if (value.includes("livro") || value.includes("biblioteca") || value.includes("diário") || value.includes("diario")) return "book";
  if (value.includes("mina") || value.includes("caverna") || value.includes("escavar")) return "pickaxe";
  return "heart";
}
