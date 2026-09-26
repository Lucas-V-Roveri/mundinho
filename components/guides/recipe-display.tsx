import { ContentIcon } from "@/components/media/content-icon";
import { CraftingGrid, CraftingSlot } from "@/components/ui/crafting-slot";
import { Tag } from "@/components/ui/tag";
import type { Confidence, Crafting, RecipeIngredient, RecipeOrigin } from "@/types/content";

function ingredientFromLegacy(name: string): RecipeIngredient {
  return { namePt: name, nameEn: name, icon: "/icons/item.svg" };
}

function confidenceTone(confidence: Confidence): "success" | "focus" | "danger" | "neutral" {
  const value = String(confidence);
  if (value.startsWith("Alta")) return "success";
  if (value.startsWith("Média")) return "focus";
  if (value.startsWith("Baixa")) return "danger";
  return "neutral";
}

function ItemChip({ item }: { item: RecipeIngredient }) {
  const tooltip = `PT: ${item.namePt} · EN: ${item.nameEn || item.namePt}`;
  return (
    <span title={tooltip} className="inline-flex items-center gap-2 border border-stone-500 bg-paper-50 px-2 py-1 text-xs text-ink-900">
      <ContentIcon src={item.icon} alt={`Ícone de ${item.namePt}`} kind="item" className="size-7" />
      <span>{item.namePt}</span>
    </span>
  );
}

function SlotItem({ item }: { item: RecipeIngredient | null }) {
  return item ? (
    <span title={`PT: ${item.namePt} · EN: ${item.nameEn || item.namePt}`} className="grid place-items-center">
      <ContentIcon src={item.icon} alt={`Ingrediente: ${item.namePt}`} kind="item" className="size-8" />
      <span className="mt-1 max-w-14 truncate text-[9px]">{item.namePt}</span>
    </span>
  ) : null;
}

function OriginRow({ origin }: { origin: RecipeOrigin }) {
  const detail = [origin.chance, origin.condition].filter(Boolean).join(" · ");
  return (
    <div className="flex flex-wrap items-center gap-2 border border-stone-400 bg-paper-50 p-2">
      <ItemChip item={origin.source} />
      {detail ? <span className="text-xs leading-5 text-ink-700">{detail}</span> : null}
    </div>
  );
}

function typeLabel(type: string, station?: string) {
  if (station) return station;
  if (type === "drop") return "Drop de mob";
  if (type === "loot") return "Loot / recompensa";
  if (type === "activation") return "Ativação / uso";
  if (type === "construction") return "Construção";
  if (type === "furnace" || type === "smelting") return "Fornalha";
  if (type === "blasting") return "Alto-forno";
  if (type === "create") return "Processamento Create";
  if (type === "crafting") return "Crafting 3×3";
  return "Obtenção";
}

export function RecipeDisplay({ craft }: { craft: Crafting }) {
  const recipe = craft.receita;
  const legacyGrid = craft.grid?.map((name) => (name ? ingredientFromLegacy(name) : null));
  const grid = recipe?.grid ?? legacyGrid;
  const ingredients = recipe?.ingredients ?? craft.ingredients?.map(ingredientFromLegacy) ?? [];
  const result = recipe?.result ?? ingredientFromLegacy(craft.result || craft.title);
  const origins = recipe?.origins ?? [];
  const type = recipe?.type ?? (grid ? "crafting" : ingredients.length ? "ingredients" : "none");
  const utility = craft.utilidade?.trim();

  return (
    <section className="border border-stone-500 bg-stone-100 p-4 text-ink-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ItemChip item={{ namePt: craft.title, nameEn: craft.nameEn || craft.title, icon: craft.icone || recipe?.result?.icon || "/icons/item.svg" }} />
        <Tag tone={confidenceTone(craft.confidence)}>confiança: {craft.confidence}</Tag>
      </div>

      {utility ? <p className="mt-3 text-sm leading-6"><strong>Para que serve:</strong> {utility.slice(0, 140)}</p> : null}

      {grid ? (
        <div className="mt-3 overflow-x-auto">
          <p className="mb-2 font-label text-lg">{typeLabel(type, recipe?.station)}</p>
          <CraftingGrid slots={grid.map((slot, index) => <SlotItem key={index} item={slot} />)} result={<SlotItem item={result} />} resultLabel={`Resultado: ${result.namePt}`} />
        </div>
      ) : null}

      {!grid && ingredients.length ? (
        <div className="mt-3">
          <p className="font-label text-lg">{typeLabel(type, recipe?.station)}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {ingredients.map((item, index) => <ItemChip key={`${item.namePt}-${index}`} item={item} />)}
            <span aria-hidden="true">→</span>
            <CraftingSlot label={`Resultado: ${result.namePt}`} className="size-16 bg-paper-50"><SlotItem item={result} /></CraftingSlot>
          </div>
        </div>
      ) : null}

      {origins.length ? (
        <div className="mt-3">
          <p className="mb-2 font-label text-lg">{typeLabel(type, recipe?.station)}</p>
          <div className="grid gap-2">{origins.map((origin, index) => <OriginRow key={`${origin.source.namePt}-${index}`} origin={origin} />)}</div>
          {recipe?.result ? <div className="mt-2 flex items-center gap-2"><span className="text-xs text-ink-700">Resultado:</span><ItemChip item={recipe.result} /></div> : null}
        </div>
      ) : null}

      {!grid && !ingredients.length && !origins.length && recipe?.note ? (
        <p className="mt-3 border-l-4 border-blue-600 pl-3 text-sm leading-6">{recipe.note}</p>
      ) : null}

      {craft.body ? <p className="mt-3 text-sm leading-6 text-ink-700">{craft.body}</p> : null}

      {craft.source ? (
        <p className="mt-3 text-xs text-ink-700">
          <strong>Fonte:</strong>{" "}
          <a className="semantic-link" href={craft.source.href} target="_blank" rel="noreferrer">{craft.source.label}</a>
        </p>
      ) : null}
    </section>
  );
}
