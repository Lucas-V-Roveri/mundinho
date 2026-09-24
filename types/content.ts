export type Actor = "gr1d" | "benamu";
export type ContentSection = "mods" | "progression" | "extras";
export type Confidence = "Alta" | "Média" | "Baixa-conferir" | string;

export type Crafting = {
  title: string;
  confidence: Confidence;
  body?: string;
  ingredients?: string[];
  grid?: string[];
  result?: string;
};

export type GuideSection = {
  title: string;
  body?: string;
  list?: string[];
  steps?: string[];
};

export type Guide = {
  id: string;
  title: string;
  subtitle: string;
  type: "chefe" | "dimensão" | "utilidade" | string;
  color?: string;
  difficulty: string;
  risk: string;
  phase: string;
  equivalent: string;
  complexity: string;
  confidence: Confidence;
  intro: string;
  sections: GuideSection[];
  craftings: Crafting[];
  checklist: [string, string, string][];
  sources: [string, string][];
  notes?: string[];
};

export type ProgressionItem = {
  id: string;
  order: number;
  entry: string;
  mods: string;
  title: string;
  type: string;
  equipment: string;
  required: string;
  soft: string;
  risk: string;
  unprepared: string;
  complexity: string;
  reversibility: string;
  vanilla: string;
  phase: string;
  dependency: string;
  confidence: Confidence;
  source: string;
  notes?: string;
};

export type AmendmentsPayload = {
  intro: string;
  groups: { title: string; items: string[] }[];
  sources: [string, string][];
};

export type ExtraItem = { id: string; title: string; description: string };
export type ExtrasPayload = { items: ExtraItem[] };
export type BackstageItem = { name: string; version: string; fn: string };
export type BackstagePayload = {
  note: string;
  items: BackstageItem[];
  to_check: { name: string; fn: string }[];
};

export type ContentStore = {
  guides: Guide[];
  progression: ProgressionItem[];
  amendments: AmendmentsPayload | null;
  extras: ExtrasPayload | null;
  backstage: BackstagePayload | null;
};

export type ItemState = {
  world_id: string;
  item_id: string;
  section: ContentSection;
  entry_key: string;
  completed: boolean;
  completed_by: Actor | null;
  completed_at: string | null;
  updated_at: string;
  deleted?: boolean;
  deleted_by?: Actor | null;
  deleted_at?: string | null;
};

export type CustomItem = {
  id: string;
  world_id: string;
  section: ContentSection;
  entry_key: string;
  title: string;
  description: string;
  difficulty: string | null;
  phase: string | null;
  created_by: Actor;
  created_at: string;
  deleted: boolean;
  deleted_by: Actor | null;
  deleted_at: string | null;
  updated_at?: string;
};

export type BackupPayload = {
  world_id: string;
  exported_at: string;
  item_state: Record<string, ItemState>;
  custom_items: CustomItem[];
};
