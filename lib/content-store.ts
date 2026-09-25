import type { SupabaseClient } from "@supabase/supabase-js";
import { EXPECTED_GUIDE_THEME_COUNT, guideThemeForId } from "@/data/guide-themes";
import { DEFAULT_GUIDE_THEME } from "@/lib/guide-theme";
import type {
  AmendmentsPayload,
  BackstagePayload,
  ContentStore,
  ExtrasPayload,
  Guide,
  ProgressionItem,
} from "@/types/content";

type RawGuide = Omit<Guide, "theme"> & { theme?: Guide["theme"] };

export async function loadContentStore(client: SupabaseClient): Promise<ContentStore> {
  const { data, error } = await client
    .from("mundinho_content")
    .select("key,lot,payload")
    .order("lot", { ascending: true })
    .order("key", { ascending: true });

  if (error) throw error;

  const guides: Guide[] = [];
  let progression: ProgressionItem[] = [];
  let amendments: AmendmentsPayload | null = null;
  let extras: ExtrasPayload | null = null;
  let backstage: BackstagePayload | null = null;

  for (const row of data ?? []) {
    if (row.key.startsWith("guide:")) {
      const raw = row.payload as unknown as RawGuide;
      const assigned = guideThemeForId(raw.id);
      if (!assigned) {
        console.warn(`[mundinho] Guia sem theme explícito: ${raw.id}. Aplicando fallback stone.`);
      }
      guides.push({ ...raw, theme: assigned ?? raw.theme ?? DEFAULT_GUIDE_THEME });
    } else if (row.key === "page:progression") {
      progression = ((row.payload as { items?: ProgressionItem[] })?.items ?? []).sort((a, b) => a.order - b.order);
    } else if (row.key === "page:amendments") amendments = row.payload as unknown as AmendmentsPayload;
    else if (row.key === "page:extras") extras = row.payload as unknown as ExtrasPayload;
    else if (row.key === "page:backstage") backstage = row.payload as unknown as BackstagePayload;
  }

  if (guides.length === EXPECTED_GUIDE_THEME_COUNT && guides.some((guide) => guide.theme === DEFAULT_GUIDE_THEME && !guideThemeForId(guide.id))) {
    console.warn("[mundinho] Pelo menos um dos 35 guias atuais caiu no fallback visual.");
  }

  guides.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  return { guides, progression, amendments, extras, backstage };
}

export const emptyContentStore: ContentStore = {
  guides: [],
  progression: [],
  amendments: null,
  extras: null,
  backstage: null,
};
