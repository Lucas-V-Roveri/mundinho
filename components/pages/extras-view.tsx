"use client";

import Image from "next/image";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { CustomItemPanel } from "@/components/checklist/custom-item-panel";
import { useMundinho } from "@/components/app-providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ExtrasView() {
  const { content } = useMundinho();
  const items = content.extras?.items ?? [];
  return <div className="space-y-6 page-enter">
    <header className="grid gap-5 lg:grid-cols-[1fr_20rem]">
      <div className="pixel-surface panel-paper p-5"><p className="font-label text-2xl text-wood-700">coisas que não dão XP</p><h1 className="mt-2 font-display text-lg leading-relaxed sm:text-2xl">Extras</h1><p className="mt-3 max-w-3xl leading-7">Objetivos que existem porque o mundo é de vocês dois. Não são gates e não entram na progressão de dificuldade.</p></div>
      <figure className="rotate-[1deg] border-4 border-night-950 bg-paper-50 p-3 pb-5 shadow-pixel"><div className="relative aspect-[4/3] overflow-hidden border-4 border-night-950"><Image src="/memories/selfie.jpg" alt="Lembrança dos dois no Mundinho" fill className="object-cover" sizes="320px" /></div><figcaption className="mt-3 text-center font-label text-xl">guardar um pouco do mundo também conta.</figcaption></figure>
    </header>
    <div className="grid gap-4 md:grid-cols-2">{items.map((item, index) => <Card key={item.id} id={item.id} surface={index % 3 === 0 ? "paper" : index % 3 === 1 ? "wood" : "stone"} interactive className="scroll-mt-64"><CardHeader><CardTitle>{item.title}</CardTitle></CardHeader><CardContent><p className="mb-4 text-sm leading-6">{item.description}</p><ChecklistItem itemId={item.id} label={item.title} phase="carinho" section="extras" entryKey="extras" /></CardContent></Card>)}</div>
    <CustomItemPanel section="extras" entryKey="extras" allowPhase={false} />
  </div>;
}
