"use client";

import { SkinFace } from "@/components/media/skin-face";
import { Select } from "@/components/ui/select";
import { SyncStatus } from "@/components/shell/sync-status";
import { useMundinho } from "@/components/app-providers";

export function ActorSelector() {
  const { actor, setActor } = useMundinho();
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
      <SyncStatus compact className="hidden min-[1180px]:inline-flex" />
    </section>
  );
}
