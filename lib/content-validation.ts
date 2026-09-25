import type {
  AmendmentsPayload,
  BackstagePayload,
  ExtrasPayload,
  Guide,
  ProgressionItem,
} from "@/types/content";

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} precisa ser um objeto`);
  }
  return value as Record<string, unknown>;
}

function stringField(value: unknown, label: string): string {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} precisa ser texto não vazio`);
  return value;
}

function arrayField(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`${label} precisa ser uma lista`);
  return value;
}

export type RawGuide = Omit<Guide, "theme"> & { theme?: Guide["theme"] };

export function parseGuide(payload: unknown, key: string): RawGuide {
  const value = record(payload, key);
  stringField(value.id, `${key}.id`);
  stringField(value.title, `${key}.title`);
  stringField(value.subtitle, `${key}.subtitle`);
  stringField(value.type, `${key}.type`);
  stringField(value.phase, `${key}.phase`);
  arrayField(value.sections, `${key}.sections`);
  arrayField(value.craftings, `${key}.craftings`);
  arrayField(value.checklist, `${key}.checklist`);
  arrayField(value.sources, `${key}.sources`);
  return value as unknown as RawGuide;
}

export function parseProgression(payload: unknown): ProgressionItem[] {
  const root = record(payload, "page:progression");
  const items = arrayField(root.items, "page:progression.items");
  return items.map((item, index) => {
    const value = record(item, `page:progression.items[${index}]`);
    stringField(value.id, `progression[${index}].id`);
    stringField(value.entry, `progression[${index}].entry`);
    stringField(value.title, `progression[${index}].title`);
    stringField(value.phase, `progression[${index}].phase`);
    if (typeof value.order !== "number" || !Number.isFinite(value.order)) {
      throw new Error(`progression[${index}].order precisa ser número`);
    }
    if (value.subitens !== undefined) arrayField(value.subitens, `progression[${index}].subitens`);
    return value as unknown as ProgressionItem;
  });
}

export function parseAmendments(payload: unknown): AmendmentsPayload {
  const value = record(payload, "page:amendments");
  stringField(value.intro, "page:amendments.intro");
  arrayField(value.groups, "page:amendments.groups");
  arrayField(value.sources, "page:amendments.sources");
  return value as unknown as AmendmentsPayload;
}

export function parseExtras(payload: unknown): ExtrasPayload {
  const value = record(payload, "page:extras");
  const items = arrayField(value.items, "page:extras.items");
  items.forEach((item, index) => {
    const row = record(item, `page:extras.items[${index}]`);
    stringField(row.id, `extras[${index}].id`);
    stringField(row.title, `extras[${index}].title`);
    stringField(row.description, `extras[${index}].description`);
  });
  return value as unknown as ExtrasPayload;
}

export function parseBackstage(payload: unknown): BackstagePayload {
  const value = record(payload, "page:backstage");
  stringField(value.note, "page:backstage.note");
  arrayField(value.items, "page:backstage.items");
  arrayField(value.to_check, "page:backstage.to_check");
  return value as unknown as BackstagePayload;
}
