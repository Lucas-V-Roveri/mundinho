"use client";

import { SkinFace } from "@/components/media/skin-face";
import { Select } from "@/components/ui/select";
import { useMundinho } from "@/components/app-providers";

export function ActorSelector() {
  const { actor, setActor, mode } = useMundinho();
  const skin = actor === "gr1d" ? "/skins/gr1d.png" : "/skins/benamu.png";

  return (
    <section aria-label="Jogador ativo" className="flex shrink-0 items-center gap-2 text-paper-100">
      <SkinFace src={skin} name={actor} size="sm" />
      <label className="grid min-w-28 gap-0.5">
        <span className="font-label text-base leading-none text-paper-100">quem está marcando?</span>
        <Select
          value={actor}
          onChange={(event) => setActor(event.target.value as "gr1d" | "benamu")}
          aria-label="Quem está marcando"
          className="min-h-8 min-w-28 border-2 px-2 py-1 text-lg"
        >
          <option value="gr1d">gr1d</option>
          <option value="benamu">benamu</option>
        </Select>
      </label>
      <span
        className={`size-2.5 shrink-0 border border-night-950 ${mode === "supabase" ? "bg-grass-500" : "bg-torch-500"}`}
        title={mode === "supabase" ? "Supabase compartilhado" : "Prévia local"}
        aria-label={mode === "supabase" ? "Sincronização Supabase compartilhado" : "Prévia local"}
      />
    </section>
  );
}
