"use client";

import * as React from "react";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChecklistCheckbox } from "@/components/ui/checklist-checkbox";
import { CraftingGrid } from "@/components/ui/crafting-slot";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ToastProvider, useToast } from "@/components/ui/toast";

function PreviewContent() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const { toast } = useToast();

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <Card surface="paper" className="overflow-hidden">
        <CardHeader className="bg-wood-700 text-paper-50">
          <p className="font-label text-2xl text-torch-300">migração Next.js · etapa 2</p>
          <CardTitle className="text-lg sm:text-2xl">Design system Cozy Minecraft</CardTitle>
          <CardDescription className="max-w-3xl text-paper-100">
            Primitivos reutilizáveis com borda grossa, bevel de inventário, tokens quentes e estados de
            foco acessíveis. Nenhuma lógica do mundo foi conectada ainda.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <section aria-labelledby="surfaces-title">
            <h2 id="surfaces-title" className="font-display text-sm leading-relaxed text-ink-900">
              Superfícies
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Card surface="wood" interactive>
                <CardContent>
                  <strong className="font-label text-2xl">Madeira</strong>
                  <p className="mt-2 text-sm leading-6">Painéis principais, cabeçalhos e ações quentes.</p>
                </CardContent>
              </Card>
              <Card surface="stone" interactive>
                <CardContent>
                  <strong className="font-label text-2xl">Pedra</strong>
                  <p className="mt-2 text-sm leading-6">Dados, slots, crafting e áreas técnicas.</p>
                </CardContent>
              </Card>
              <Card surface="night" interactive>
                <CardContent>
                  <strong className="font-label text-2xl text-torch-300">Noite</strong>
                  <p className="mt-2 text-sm leading-6">Chefes, perigo e blocos de contraste forte.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section aria-labelledby="controls-title" className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 id="controls-title" className="font-display text-sm leading-relaxed text-ink-900">
                Controles
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="preview-input" className="mb-1 block font-label text-xl text-ink-700">
                    Nome do objetivo
                  </label>
                  <Input id="preview-input" placeholder="ex.: montar o primeiro acampamento" />
                </div>
                <div>
                  <label htmlFor="preview-select" className="mb-1 block font-label text-xl text-ink-700">
                    Quem está marcando?
                  </label>
                  <Select id="preview-select" defaultValue="gr1d">
                    <option value="gr1d">gr1d</option>
                    <option value="benamu">benamu</option>
                  </Select>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() =>
                      toast({
                        title: "Advancement Made!",
                        description: "O toast dourado está pronto para receber as conquistas reais.",
                      })
                    }
                  >
                    Testar toast
                  </Button>
                  <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                    Abrir diálogo
                  </Button>
                  <Button variant="ghost">Ação neutra</Button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-sm leading-relaxed text-ink-900">Checklist</h2>
              <div className="mt-4 space-y-3">
                <ChecklistCheckbox
                  checked={checked}
                  onCheckedChange={setChecked}
                  label="Preparar comida antes da dungeon"
                  meta={checked ? "Marcado nesta prévia visual." : "Estado ainda não conectado ao Supabase."}
                />
                <ChecklistCheckbox
                  label="Levar blocos e tochas"
                  meta="Exemplo de item com autoria/timestamp entrando na Etapa 5."
                />
              </div>
            </div>
          </section>

          <section aria-labelledby="accordion-title">
            <h2 id="accordion-title" className="font-display text-sm leading-relaxed text-ink-900">
              Accordion de guia
            </h2>
            <Accordion className="mt-4">
              <AccordionItem title="Antes de sair" defaultOpen>
                <p className="text-sm leading-6">
                  O trigger usa botão nativo, <code>aria-expanded</code>, região nomeada e mantém foco visível.
                </p>
              </AccordionItem>
              <AccordionItem title="Craftings confirmados">
                <div className="overflow-x-auto pb-2">
                  <CraftingGrid
                    slots={["A", null, "B", null, "C", null, null, null, null]}
                    result="Item"
                    resultLabel="Item de exemplo"
                  />
                </div>
              </AccordionItem>
            </Accordion>
          </section>
        </CardContent>

        <CardFooter className="bg-paper-200">
          <span className="font-label text-xl text-wood-700">Etapa 2 isolada em next-migration</span>
        </CardFooter>
      </Card>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Excluir objetivo?"
        description="Exemplo do diálogo que será usado pelo soft delete dos itens personalizados."
        footer={
          <>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => setDialogOpen(false)}>
              Excluir
            </Button>
          </>
        }
      >
        <p className="text-sm leading-6">
          O componente usa o elemento <code>&lt;dialog&gt;</code> nativo, fecha com Escape e preserva a
          semântica modal sem dependência de Radix.
        </p>
      </Dialog>
    </main>
  );
}

export function DesignSystemPreview() {
  return (
    <ToastProvider>
      <PreviewContent />
    </ToastProvider>
  );
}
