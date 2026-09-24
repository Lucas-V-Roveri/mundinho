"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useMundinho } from "@/components/app-providers";

export function ActorSelector() {
  const { actor, setActor, soundEnabled, setSoundEnabled, mode, exportData, importData, legacyAvailable, migrateLegacy } = useMundinho();
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <section aria-label="Preferências do diário" className="grid gap-3 border-4 border-night-950 bg-paper-100 p-3 shadow-pixel-sm sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_auto_auto_auto_auto] lg:items-center">
      <label className="flex items-center gap-2 font-label text-lg">
        <span>Quem está marcando?</span>
        <Select value={actor} onChange={(event) => setActor(event.target.value as "gr1d" | "benamu")} aria-label="Quem está marcando">
          <option value="gr1d">gr1d</option>
          <option value="benamu">benamu</option>
        </Select>
      </label>
      <span className="font-label text-lg text-ink-700">sincronização: {mode === "supabase" ? "Supabase compartilhado" : "Prévia local"}</span>
      <Button variant="ghost" size="sm" onClick={() => setSoundEnabled(!soundEnabled)} aria-pressed={soundEnabled}>
        Som: {soundEnabled ? "ligado" : "desligado"}
      </Button>
      <Button variant="ghost" size="sm" onClick={() => void exportData()}>Exportar JSON</Button>
      <div className="flex flex-wrap gap-2">
        <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) void importData(file); event.currentTarget.value = ""; }} />
        <Button variant="ghost" size="sm" onClick={() => fileRef.current?.click()}>Importar</Button>
        {legacyAvailable ? <Button variant="secondary" size="sm" onClick={() => void migrateLegacy()}>Migrar progresso antigo</Button> : null}
      </div>
    </section>
  );
}
