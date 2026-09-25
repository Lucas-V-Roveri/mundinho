"use client";

import { Select } from "@/components/ui/select";
import { useMundinho } from "@/components/app-providers";

export function ActorSelector() {
  const { actor, setActor, mode } = useMundinho();

  return (
    <section aria-label="Jogador ativo" className="flex shrink-0 items-center gap-2">
      <label className="flex items-center gap-2 font-label text-lg text-paper-100">
        <span className="hidden min-[680px]:inline">marcando como</span>
        <Select
          value={actor}
          onChange={(event) => setActor(event.target.value as "gr1d" | "benamu")}
          aria-label="Quem está marcando"
          className="min-w-28"
        >
          <option value="gr1d">gr1d</option>
          <option value="benamu">benamu</option>
        </Select>
      </label>
      <span
        className={`size-2.5 border border-night-950 ${mode === "supabase" ? "bg-grass-500" : "bg-torch-500"}`}
        title={mode === "supabase" ? "Supabase compartilhado" : "Prévia local"}
        aria-label={mode === "supabase" ? "Sincronização Supabase compartilhado" : "Prévia local"}
      />
    </section>
  );
}
