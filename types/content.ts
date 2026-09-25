export type Actor = "gr1d" | "benamu";
export type ContentSection = "mods" | "progression" | "extras";
export type Confidence = "Alta" | "Média" | "Baixa-conferir" | string;

export type GuideThemeAccent = "stone" | "torch" | "wood" | "grass" | "redstone" | "gold" | "blue" | "ice";
export type GuideThemeTexture = "fire" | "leather" | "ice" | "leaf" | "stone" | "none";
export type GuideTheme = {
  accent: GuideThemeAccent;
  texture: GuideThemeTexture;
};

export type MediaRef = {
  src: string;
  alt: string;
  source?: string;
};

export type RecipeIngredient = {
  namePt: string;
  nameEn?: string;
  icon?: string;
};

export type RecipeDefinition = {
  type: "crafting" | "furnace" | "smelting" | "blasting" | "create" | "ingredients" | "none" | string;
  station?: string;
  grid?: Array<RecipeIngredient | null>;
  ingredients?: RecipeIngredient[];
  result?: RecipeIngredient;
};

export type Crafting = {
  title: string;
  confidence: Confidence;
  body?: string;
  ingredients?: string[];
  grid?: string[];
  result?: string;
  icone?: string;
  imagem?: MediaRef;
  utilidade?: string;
  receita?: RecipeDefinition;
  nameEn?: string;
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
  theme: GuideTheme;
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
  icone?: string;
  imagem?: MediaRef;
  utilidade?: string;
};

export type GateDefinition = {
  confirmed: boolean;
  depends_on?: string[];
  note?: string;
};

export type ProgressionSubitem = {
  id: string;
  title: string;
  phase?: string;
  equipment?: string;
  confidence?: Confidence;
  gate?: string;
  icone?: string;
  imagem?: MediaRef;
  trophy?: boolean;
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
  icone?: string;
  imagem?: MediaRef;
  utilidade?: string;
  receita?: RecipeDefinition;
  subitens?: ProgressionSubitem[];
  gate?: GateDefinition;
};

export type AmendmentsPayload = {
  intro: string;
  groups: { title: string; items: string[] }[];
  sources: [string, string][];
};

export type ExtraItem = { id: string; title: string; description: string; icone?: string; imagem?: MediaRef };
export type ExtrasPayload = { items: ExtraItem[] };
export type BackstageItem = { name: string; version: string; fn: string };
export type ImageSource = { label: string; source: string; note?: string };
export type BackstagePayload = {
  note: string;
  items: BackstageItem[];
  to_check: { name: string; fn: string }[];
  image_sources?: ImageSource[];
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

export type PlayerItemState = {
  world_id: string;
  item_id: string;
  actor: Actor;
  section: ContentSection;
  entry_key: string;
  completed: boolean;
  completed_at: string | null;
  updated_at: string;
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
  player_item_state?: Record<string, PlayerItemState>;
  custom_items: CustomItem[];
};
