import { ContentIcon } from "@/components/media/content-icon";
import { CraftingGrid, CraftingSlot } from "@/components/ui/crafting-slot";
import { Tag } from "@/components/ui/tag";
import type { Crafting, RecipeIngredient } from "@/types/content";

function ingredientFromLegacy(name: string): RecipeIngredient { return { namePt: name, nameEn: name, icon: "/icons/item.svg" }; }
function ItemChip({ item }: { item: RecipeIngredient }) {
  const tooltip = `PT: ${item.namePt} · EN: ${item.nameEn || item.namePt}`;
  return <span title={tooltip} className="inline-flex items-center gap-2 border border-stone-500 bg-paper-50 px-2 py-1 text-xs text-ink-900"><ContentIcon src={item.icon} alt={`Ícone de ${item.namePt}`} kind="item" className="size-7" /><span>{item.namePt}</span></span>;
}
function SlotItem({ item }: { item: RecipeIngredient | null }) { return item ? <span title={`PT: ${item.namePt} · EN: ${item.nameEn || item.namePt}`} className="grid place-items-center"><ContentIcon src={item.icon} alt={`Ingrediente: ${item.namePt}`} kind="item" className="size-8" /><span className="mt-1 max-w-14 truncate text-[9px]">{item.namePt}</span></span> : null; }

export function RecipeDisplay({ craft }: { craft: Crafting }) {
  const recipe = craft.receita;
  const utility = (craft.utilidade || "conferir in-game").slice(0, 140);
  const legacyGrid = craft.grid?.map((name) => name ? ingredientFromLegacy(name) : null);
  const grid = recipe?.grid ?? legacyGrid;
  const ingredients = recipe?.ingredients ?? craft.ingredients?.map(ingredientFromLegacy) ?? [];
  const result = recipe?.result ?? ingredientFromLegacy(craft.result || craft.title);
  const type = recipe?.type ?? (grid ? "crafting" : ingredients.length ? "ingredients" : "none");

  return <section className="border border-stone-500 bg-stone-100 p-4 text-ink-900">
    <div className="flex flex-wrap items-center justify-between gap-3"><ItemChip item={{ namePt: craft.title, nameEn: craft.nameEn || craft.title, icon: craft.icone || "/icons/item.svg" }} /><Tag tone={String(craft.confidence).startsWith("Alta") ? "success" : "neutral"}>confiança: {craft.confidence}</Tag></div>
    <p className="mt-3 text-sm leading-6"><strong>Para que serve:</strong> {utility}</p>
    {grid ? <div className="mt-3 overflow-x-auto"><p className="mb-2 font-label text-lg">{recipe?.station || "Crafting 3×3"}</p><CraftingGrid slots={grid.map((slot, index) => <SlotItem key={index} item={slot} />)} result={<SlotItem item={result} />} resultLabel={`Resultado: ${result.namePt}`} /></div> : null}
    {!grid && ingredients.length ? <div className="mt-3"><p className="font-label text-lg">{type === "furnace" || type === "smelting" || type === "blasting" || type === "create" ? recipe?.station || type : "Ingredientes / obtenção"}</p><div className="mt-2 flex flex-wrap items-center gap-2">{ingredients.map((item, index) => <ItemChip key={`${item.namePt}-${index}`} item={item} />)}<span aria-hidden="true">→</span><CraftingSlot label={`Resultado: ${result.namePt}`} className="size-16 bg-paper-50"><SlotItem item={result} /></CraftingSlot></div></div> : null}
    {!grid && !ingredients.length ? <p className="mt-3 border-l-4 border-torch-500 pl-3 text-sm">Receita/formato não confirmado nesta versão: conferir in-game.</p> : null}
    {craft.body ? <p className="mt-3 text-sm leading-6 text-ink-700">{craft.body}</p> : null}
  </section>;
}
