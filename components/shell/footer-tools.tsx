"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { useMundinho } from "@/components/app-providers";

export function FooterTools() {
  const { soundEnabled, setSoundEnabled, mode, exportData, importData, legacyAvailable, migrateLegacy } = useMundinho();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <section aria-label="Ferramentas do diário" className="flex flex-wrap items-center gap-2">
      <span className="mr-auto font-label text-lg text-paper-100">
        sincronização: {mode === "supabase" ? "Supabase compartilhado" : "Prévia local"}
      </span>
      <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)} aria-pressed={soundEnabled}>
        <PixelIcon name="heart" size={16} /> Som: {soundEnabled ? "ligado" : "desligado"}
      </Button>
      <Button variant="ghost" size="sm" onClick={() => void exportData()}>
        <PixelIcon name="book" size={16} /> Exportar JSON
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void importData(file);
          event.currentTarget.value = "";
        }}
      />
      <Button variant="ghost" size="sm" onClick={() => fileRef.current?.click()}>
        <PixelIcon name="chest" size={16} /> Importar
      </Button>
      {legacyAvailable ? (
        <Button variant="secondary" size="sm" onClick={() => void migrateLegacy()}>
          Migrar progresso antigo
        </Button>
      ) : null}
    </section>
  );
}
