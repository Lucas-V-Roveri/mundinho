"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { SyncStatus } from "@/components/shell/sync-status";
import { useMundinho } from "@/components/app-providers";

export function FooterTools() {
  const { soundEnabled, setSoundEnabled, exportData, importData, legacyAvailable, migrateLegacy, dataStatus } = useMundinho();
  const fileRef = useRef<HTMLInputElement>(null);
  const disabled = dataStatus !== "ready";

  return (
    <section aria-label="Ferramentas do diário" className="flex flex-wrap items-center gap-2">
      <div className="mr-auto flex flex-wrap items-center gap-2">
        <span className="font-label text-lg text-paper-100">sincronização:</span>
        <SyncStatus compact />
      </div>
      <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)} aria-pressed={soundEnabled}>
        <PixelIcon name="heart" size={16} /> Som: {soundEnabled ? "ligado" : "desligado"}
      </Button>
      <Button variant="ghost" size="sm" disabled={disabled} onClick={() => void exportData()}>
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
      <Button variant="ghost" size="sm" disabled={disabled} onClick={() => fileRef.current?.click()}>
        <PixelIcon name="chest" size={16} /> Importar
      </Button>
      {legacyAvailable ? (
        <Button variant="secondary" size="sm" disabled={disabled} onClick={() => void migrateLegacy()}>
          Migrar progresso antigo
        </Button>
      ) : null}
    </section>
  );
}
