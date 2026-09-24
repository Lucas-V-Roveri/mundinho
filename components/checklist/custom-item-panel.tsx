"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ChecklistItem } from "@/components/checklist/checklist-item";
import { useMundinho } from "@/components/app-providers";
import type { ContentSection, CustomItem } from "@/types/content";

export function CustomItemPanel({ section, entryKey, allowPhase = true }: { section: ContentSection; entryKey: string; allowPhase?: boolean }) {
  const { customItems, addCustomItem, deleteCustomItem } = useMundinho();
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [phase, setPhase] = React.useState("Início");
  const [difficulty, setDifficulty] = React.useState("Tranquilo");
  const items = customItems.filter((item) => item.section === section && item.entry_key === entryKey);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    await addCustomItem({ section, entry_key: entryKey, title: title.trim(), description: description.trim(), phase: allowPhase ? phase : null, difficulty: allowPhase ? difficulty : null });
    setTitle(""); setDescription(""); setOpen(false);
  }

  return (
    <section className="mt-5 border-t-4 border-dashed border-wood-500 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3"><h4 className="font-label text-2xl text-wood-700">Itens de vocês</h4><Button variant="secondary" size="sm" onClick={() => setOpen(true)}>+ adicionar item</Button></div>
      {items.length ? <div className="mt-3 grid gap-3">{items.map((item) => <HandmadeItem key={item.id} item={item} section={section} onDelete={() => setDeleteId(item.id)} />)}</div> : <p className="mt-2 text-sm text-ink-700">Nada acrescentado aqui ainda.</p>}

      <Dialog open={open} onOpenChange={setOpen} title="Adicionar ao diário" description="Um objetivo escrito por vocês, sem virar item do sistema.">
        <form onSubmit={submit} className="space-y-4">
          <label className="block font-label text-xl">Título<Input className="mt-1" value={title} maxLength={100} onChange={(event) => setTitle(event.target.value)} required /></label>
          <label className="block font-label text-xl">Descrição opcional<Input className="mt-1" value={description} maxLength={400} onChange={(event) => setDescription(event.target.value)} /></label>
          {allowPhase ? <div className="grid gap-3 sm:grid-cols-2"><label className="font-label text-xl">Fase<Select className="mt-1" value={phase} onChange={(event) => setPhase(event.target.value)}><option>Início</option><option>Intermediário</option><option>Avançado</option><option>Pós-jogo</option></Select></label><label className="font-label text-xl">Dificuldade<Select className="mt-1" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>Tranquilo</option><option>Exige preparo</option><option>Difícil</option><option>Muito difícil</option></Select></label></div> : null}
          <div className="flex justify-end gap-2"><Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button><Button type="submit">Adicionar</Button></div>
        </form>
      </Dialog>

      <Dialog open={Boolean(deleteId)} onOpenChange={(value) => { if (!value) setDeleteId(null); }} title="Arquivar este item?" description="Ele some da interface, mas o histórico fica no banco." footer={<><Button variant="ghost" onClick={() => setDeleteId(null)}>Cancelar</Button><Button variant="danger" onClick={() => { if (deleteId) void deleteCustomItem(deleteId); setDeleteId(null); }}>Arquivar</Button></>}><p className="text-sm leading-6">Soft delete: nada é apagado de verdade por acidente.</p></Dialog>
    </section>
  );
}

function HandmadeItem({ item, section, onDelete }: { item: CustomItem; section: ContentSection; onDelete: () => void }) {
  return <article className="handmade-note relative border-4 border-night-950 bg-torch-100 p-3 shadow-pixel-sm"><span aria-hidden="true" className="absolute -top-2 left-5 h-4 w-14 bg-paper-200/80" /><ChecklistItem itemId={`custom:${item.id}`} label={item.title} phase={`feito à mão por ${item.created_by}${item.phase ? ` · ${item.phase}` : ""}`} section={section} entryKey={item.entry_key} />{item.description ? <p className="mt-2 px-1 text-sm leading-5">{item.description}</p> : null}<Button variant="ghost" size="sm" className="mt-2" onClick={onDelete}>arquivar</Button></article>;
}
