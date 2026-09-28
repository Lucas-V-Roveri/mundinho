import type { SupabaseClient } from "@supabase/supabase-js";
import { CONTENT_SNAPSHOT_GENERATED_AT, CONTENT_SNAPSHOT_ROWS } from "@/data/content-snapshot.generated";
import { EXPECTED_GUIDE_THEME_COUNT, guideThemeForId } from "@/data/guide-themes";
import { DEFAULT_GUIDE_THEME } from "@/lib/guide-theme";
import {
  parseAmendments,
  parseBackstage,
  parseExtras,
  parseGuide,
  parseProgression,
} from "@/lib/content-validation";
import type {
  AmendmentsPayload,
  BackstagePayload,
  ContentSnapshotRow,
  ContentStore,
  ExtrasPayload,
  Guide,
  ProgressionItem,
} from "@/types/content";

function withoutTwilightEyeSource(source: string): string {
  return source
    .split("\n")
    .filter((line) => !line.toLowerCase().includes("twilight-eye"))
    .join("\n");
}

/**
 * Regras de continuidade aprovadas depois do snapshot/Supabase atual.
 * Mantemos os IDs e a ordem intactos para não quebrar progresso já salvo.
 */
function applyApprovedContinuityRules(items: ProgressionItem[]): ProgressionItem[] {
  return items.map((item) => {
    if (item.id === "progression:350") {
      return {
        ...item,
        mods: "Spiced Twilight, The Twilight Forest",
        notes:
          "Twilight Eye continua a conferir in-game. Não presumir origem, chance, receita, função nem dependência até confirmação explícita.",
        source: withoutTwilightEyeSource(item.source),
      };
    }

    if (item.id === "progression:810") {
      return {
        ...item,
        mods: "End Remastered, End Remastered Additions",
        notes:
          "End Remastered exige 12 Eyes distintos. End Remastered Additions amplia o pool confirmado. Twilight Eye continua a conferir in-game e não é contado, presumido como alternativa nem usado como pré-requisito até confirmação explícita.",
        source: withoutTwilightEyeSource(item.source),
      };
    }

    return item;
  });
}

function buildContentStore(rows: readonly ContentSnapshotRow[], source: string): ContentStore {
  const guides: Guide[] = [];
  let progression: ProgressionItem[] = [];
  let amendments: AmendmentsPayload | null = null;
  let extras: ExtrasPayload | null = null;
  let backstage: BackstagePayload | null = null;

  for (const row of rows) {
    if (row.key.startsWith("guide:")) {
      const raw = parseGuide(row.payload, row.key);
      const assigned = guideThemeForId(raw.id);
      if (!assigned) console.warn(`[mundinho] ${source}: guia sem theme explícito: ${raw.id}; fallback stone aplicado.`);
      guides.push({ ...raw, theme: assigned ?? raw.theme ?? DEFAULT_GUIDE_THEME });
    } else if (row.key === "page:progression") {
      progression = applyApprovedContinuityRules(parseProgression(row.payload)).sort((a, b) => a.order - b.order);
    } else if (row.key === "page:amendments") {
      amendments = parseAmendments(row.payload);
    } else if (row.key === "page:extras") {
      extras = parseExtras(row.payload);
    } else if (row.key === "page:backstage") {
      backstage = parseBackstage(row.payload);
    }
  }

  if (guides.length !== EXPECTED_GUIDE_THEME_COUNT) {
    throw new Error(`${source}: esperados ${EXPECTED_GUIDE_THEME_COUNT} guias, recebidos ${guides.length}`);
  }
  if (!progression.length) throw new Error(`${source}: progressão vazia`);
  if (!amendments || !extras || !backstage) throw new Error(`${source}: páginas estruturadas incompletas`);

  const themeFallbacks = guides.filter((guide) => !guideThemeForId(guide.id));
  if (themeFallbacks.length) {
    console.warn(`[mundinho] ${source}: ${themeFallbacks.length} guia(s) no fallback visual: ${themeFallbacks.map((guide) => guide.id).join(", ")}`);
  }

  guides.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  return { guides, progression, amendments, extras, backstage };
}

export async function loadContentStore(client: SupabaseClient): Promise<ContentStore> {
  const { data, error } = await client
    .from("mundinho_content")
    .select("key,lot,payload")
    .order("lot", { ascending: true })
    .order("key", { ascending: true });

  if (error) throw error;
  return buildContentStore((data ?? []) as ContentSnapshotRow[], "Supabase mundinho_content");
}

export function loadBundledContentStore(): ContentStore {
  return buildContentStore(CONTENT_SNAPSHOT_ROWS, `snapshot ${CONTENT_SNAPSHOT_GENERATED_AT}`);
}

export const bundledContentStore = loadBundledContentStore();

export const emptyContentStore: ContentStore = {
  guides: [],
  progression: [],
  amendments: null,
  extras: null,
  backstage: null,
};
