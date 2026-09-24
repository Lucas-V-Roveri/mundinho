import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  AmendmentsPayload,
  BackstagePayload,
  ContentStore,
  ExtrasPayload,
  Guide,
  ProgressionItem,
} from "@/types/content";

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
    if (row.key.startsWith("guide:")) guides.push(row.payload as unknown as Guide);
    else if (row.key === "page:progression") {
      progression = ((row.payload as { items?: ProgressionItem[] })?.items ?? []).sort((a, b) => a.order - b.order);
    } else if (row.key === "page:amendments") amendments = row.payload as unknown as AmendmentsPayload;
    else if (row.key === "page:extras") extras = row.payload as unknown as ExtrasPayload;
    else if (row.key === "page:backstage") backstage = row.payload as unknown as BackstagePayload;
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
