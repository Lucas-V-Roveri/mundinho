import type { Actor, ContentSection, ContentStore, CustomItem, GuideTheme, PlayerItemState } from "../../types/content.ts";

export type Sprite = "spark" | "leaf" | "firefly" | "feather" | "cloud" | "bee" | "star" | "rune" | "shard" | "bubble" | "eye" | "bone" | "candy" | "gear" | "heart" | "food" | "seed" | "moon" | "note" | "lantern" | "pack" | "gem" | "snow" | "drop" | "paw" | "web" | "banner" | "coin" | "block" | "xp" | "trophy" | "mask" | "bolt" | "paper";
export type Motion = "rise" | "fall" | "burst" | "spiral" | "zigzag";
export type Effect = { sprites: Sprite[]; colors: string[]; motion: Motion; rain?: boolean };
const effect = (sprites: Sprite[], colors: string[], motion: Motion, rain = false): Effect => ({ sprites, colors, motion, rain });
export const EFFECTS = {
  fire: effect(["spark", "shard"], ["#ffa044", "#ffd36a", "#49382b"], "rise"),
  fireBurst: effect(["spark", "shard"], ["#ff7544", "#ffd36a", "#30253f"], "burst"),
  forest: effect(["firefly", "leaf"], ["#ffd966", "#5e9d45"], "rise"),
  leaves: effect(["leaf", "seed"], ["#80ad5a", "#d79c4e", "#dea0be"], "fall", true),
  ice: effect(["snow", "shard"], ["#f2faff", "#a5dff5"], "fall", true),
  sky: effect(["feather", "cloud"], ["#fffdf2", "#b8e4ff"], "fall"),
  deepSky: effect(["feather", "gem"], ["#74cdb8", "#eef8ff"], "fall"),
  storm: effect(["cloud", "bolt"], ["#a5d9f0", "#ffe58a"], "spiral"),
  sun: effect(["star", "mask", "spark"], ["#ffd365", "#f99a43"], "burst"),
  bees: effect(["bee", "seed"], ["#f4c542", "#fff2c2"], "zigzag"),
  starlight: effect(["star", "moon"], ["#8fd9ff", "#b9a1ee"], "rise"),
  garden: effect(["seed", "leaf", "gem"], ["#7fa66b", "#82719a"], "rise"),
  sculk: effect(["rune", "spark"], ["#39c6cb", "#153d49"], "burst"),
  eyes: effect(["eye", "rune"], ["#83c98a", "#a66ce0"], "burst"),
  ender: effect(["rune", "shard"], ["#b36be8", "#30253f"], "rise"),
  tablets: effect(["paper", "rune"], ["#a99475", "#e4d3a2"], "burst"),
  magnetic: effect(["bolt", "shard"], ["#db5954", "#6399d9", "#aab5bd"], "spiral"),
  primordial: effect(["leaf", "bone"], ["#76a34f", "#e9dcb8"], "fall", true),
  toxic: effect(["bubble", "rune"], ["#a7e83b", "#54b947"], "rise"),
  ocean: effect(["bubble", "spark"], ["#386bbd", "#71e0e3"], "rise"),
  shadow: effect(["eye", "shard"], ["#795c9e", "#625e70"], "rise"),
  candy: effect(["candy", "gem"], ["#f18bbe", "#8be0c2", "#ffe1a1"], "burst"),
  ancient: effect(["shard", "rune"], ["#322b40", "#dca95b"], "burst"),
  metal: effect(["shard", "spark"], ["#a2abb4", "#e75d56"], "burst"),
  sand: effect(["seed", "bone"], ["#d8b976", "#efe0b5"], "burst"),
  soul: effect(["spark", "bone"], ["#67cfc3", "#dad4bd"], "rise"),
  blossom: effect(["leaf", "seed"], ["#c77ccb", "#6eaa79"], "spiral"),
  lich: effect(["star", "spark"], ["#82bceb", "#dceeff"], "rise"),
  masks: effect(["mask", "spark"], ["#d9b55a", "#7f9a55"], "burst"),
  raid: effect(["banner", "spark"], ["#a34b50", "#96999f"], "burst"),
  gold: effect(["coin", "star"], ["#f5cb58", "#8d6348"], "burst"),
  spiders: effect(["web", "eye"], ["#dddcd2", "#cc625e"], "fall"),
  rest: effect(["moon", "star"], ["#d6a34d", "#7296c3"], "rise"),
  create: effect(["gear", "spark"], ["#b58a56", "#939c9e", "#d5b15a"], "fall"),
  kitchen: effect(["food", "heart"], ["#d7a766", "#7eb44e", "#e87364"], "burst"),
  crops: effect(["seed", "leaf"], ["#77ac4d", "#e6c46b"], "burst"),
  apples: effect(["food", "star"], ["#e15b4f", "#ffd768"], "burst"),
  social: effect(["heart", "gem"], ["#ec7f99", "#62cb85"], "rise"),
  decor: effect(["block", "leaf"], ["#b88452", "#e4c99c", "#78a75f"], "burst"),
  lanterns: effect(["lantern", "block"], ["#f4c366", "#aa784d"], "rise"),
  potions: effect(["bubble", "cloud"], ["#89cedb", "#ae85ca"], "rise"),
  writing: effect(["feather", "paper"], ["#eee5c8", "#555064"], "fall"),
  music: effect(["note"], ["#82bd70", "#ab83d0"], "rise"),
  packs: effect(["pack", "shard"], ["#ad744b", "#bac2c6", "#eac35d"], "burst"),
  relics: effect(["gem", "star"], ["#f3cc65", "#73c8bf", "#a18add"], "burst"),
  redstone: effect(["block", "spark"], ["#a3a09a", "#d85c52"], "burst"),
  teleport: effect(["rune", "spark"], ["#a67ce6", "#d1a8f0"], "spiral"),
  water: effect(["drop", "bubble"], ["#6fb9e7", "#c1ebf7"], "rise"),
  survival: effect(["drop", "leaf"], ["#83c9e7", "#92b76d"], "burst"),
  stone: effect(["shard", "gem"], ["#a3a49b", "#92704d", "#85bdd0"], "burst"),
  fauna: effect(["paw", "feather"], ["#a77c54", "#e3d1ae"], "burst"),
  friends: effect(["leaf", "heart"], ["#e899b9", "#83ad64"], "rise"),
  variants: effect(["eye", "block"], ["#78ad68", "#a5a499"], "burst"),
  structures: effect(["block", "coin"], ["#aaa79b", "#c9a260"], "burst"),
  love: effect(["heart"], ["#f28ba8", "#e46b77", "#ffe2ca"], "rise"),
  xp: effect(["xp"], ["#8bdd55", "#b4ec70"], "rise"),
  confetti: effect(["block"], ["#80ad5a", "#f6d16e", "#83bedA", "#e87364"], "fall", true),
  magic: effect(["rune"], ["#9acceB", "#c5a0e4"], "rise"),
  achievement: effect(["star"], ["#f6d16e", "#fff0c4"], "burst"),
} satisfies Record<string, Effect>;
export type EffectKey = keyof typeof EFFECTS;
export function normalize(text: string) { return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, ""); }
type Rule = { family: string; match: RegExp; effect: EffectKey; variants?: [RegExp, EffectKey][] };
// Semantic aliases only. No milestone, checklist or guide IDs select an effect.
export const FAMILY_RULES: Rule[] = [
  { family: "butterflies", match: /\b(borboletas|mariposas|butterflies|butterfly mod)\b/, effect: "forest" },
  { family: "relics", match: /\b(relics|reliquified|reliquias|artefatos|artifacts)\b/, effect: "relics" },
  { family: "cataclysm", match: /\b(cataclysm|ignis)\b/, effect: "ancient", variants: [[/\b(ignis|ignited|burning|ignitium|netherite monstrosity|lava)\b/, "fireBurst"], [/\b(ender guardian|void runes?)\b/, "ender"], [/\bharbinger\b/, "metal"], [/\bancient remnant\b/, "sand"], [/\bleviathan\b/, "ocean"], [/\bscylla\b/, "storm"], [/\bmaledictus\b/, "soul"]] },
  { family: "twilight", match: /\b(twilight|floresta crepuscular)\b/, effect: "forest", variants: [[/\b(alpha yeti|snow queen|snowy|glacier)\b/, "ice"], [/\b(hydra|fire swamp|lamp of cinders|brasas)\b/, "fire"]] },
  { family: "deep-aether", match: /\bdeep aether\b/, effect: "deepSky", variants: [[/\b(eye of the storm|tempestade)\b/, "storm"]] },
  { family: "aether", match: /\baether\b/, effect: "sky", variants: [[/\beye of the storm\b/, "storm"], [/\b(sun spirit|gold dungeon)\b/, "sun"], [/\b(deep aether|brass dungeon)\b/, "deepSky"]] },
  { family: "caves", match: /\balexs caves\b/, effect: "tablets", variants: [[/\b(magnetic|magneticas)\b/, "magnetic"], [/\bluxtructosaurus\b/, "fire"], [/\b(primordial|primordiais)\b/, "primordial"], [/\b(toxic|brainiac|tremorzilla)\b/, "toxic"], [/\b(abyssal|hullbreaker)\b/, "ocean"], [/\b(forlorn|watcher|forsaken)\b/, "shadow"], [/\b(candy|licowitch)\b/, "candy"]] },
  { family: "bumblezone", match: /\b(bumblezone|bee queen|queens desire|essence of the bees|sempiternal sanctum)\b/, effect: "bees" },
  { family: "starlight", match: /\b(eternal starlight|gatekeeper|lunar monstrosity|starlight golem|tangled hatred)\b/, effect: "starlight" },
  { family: "undergarden", match: /\b(undergarden|cloggrum|froststeel|utherium|regalium|forgotten guardian)\b/, effect: "garden" },
  { family: "sculk", match: /\b(deeper and darker|deeper.*darker|otherside|deep dark|sculk)\b/, effect: "sculk" },
  { family: "graveyard", match: /\b(graveyard|corrupted champion|ominous bone staff|lich prison)\b/, effect: "soul" },
  { family: "bomd", match: /\b(bosses of mass destruction|void blossom|night lich|nether gauntlet|obsidilith)\b/, effect: "magic", variants: [[/\bvoid blossom\b/, "blossom"], [/\bnight lich\b/, "lich"], [/\bnether gauntlet\b/, "fire"], [/\bobsidilith\b/, "ender"]] },
  { family: "mowzies", match: /\b(mowzies|ferrous wroughtnaut|frostmaw|umvuthi|sol visage)\b/, effect: "masks", variants: [[/\b(ferrous wroughtnaut|thousand metals)\b/, "metal"], [/\b(frostmaw|ice crystal)\b/, "ice"], [/\b(umvuthi|sol visage)\b/, "sun"]] },
  { family: "archeology", match: /\b(better archeology|arqueologia)\b/, effect: "ancient" },
  { family: "golems", match: /\b(golem overhaul|straw golem|golems)\b/, effect: "metal" },
  { family: "incendium", match: /\bincendium\b/, effect: "fire" },
  { family: "end-eyes", match: /\bend remastered\b/, effect: "eyes" },
  { family: "end", match: /\b(end reformulado|nullscape|savage ender dragon|dragonfight|outer end|ender dragon)\b/, effect: "ender" },
  { family: "packs", match: /\b(sophisticated backpacks|mochila|mochilas)\b/, effect: "packs" },
  { family: "kitchen", match: /\b(cozinha|farmers delight|more delight|yeons|comidas|macas)\b/, effect: "kitchen", variants: [[/\b(maca|apple)\b/, "apples"], [/\b(colheita|plantar|sementes|farming)\b/, "crops"]] },
  { family: "camp", match: /\b(acampamento|comfortable campfires|comforts|campfire|fogueira|descanso)\b/, effect: "fire", variants: [[/\b(dormir|rede|sleeping|hammock|saco de dormir)\b/, "rest"]] },
  { family: "decor", match: /\b(construcao|decoracao|moveis|handcrafted|mrcrayfish|voxelized|take a seat)\b/, effect: "decor" },
  { family: "amendments", match: /\bamendments\b/, effect: "lanterns", variants: [[/\b(caldeirao|cauldron|pocoes)\b/, "potions"], [/\b(lectern|escrita|livro)\b/, "writing"], [/\b(jukebox|musica|disco)\b/, "music"]] },
  { family: "supplementaries", match: /\bsupplementaries\b/, effect: "lanterns" },
  { family: "create", match: /\bcreate\b/, effect: "create" },
  { family: "mca", match: /\b(mca|minecraft comes alive|social expansion)\b/, effect: "social" },
  { family: "waystones", match: /\b(waystone|waystones|teleporte)\b/, effect: "teleport" },
  { family: "survival", match: /\b(sobrevivencia|cold sweat|serene seasons|seasonal integration|thirst|snow!|clima|estacoes)\b/, effect: "survival", variants: [[/\btemperatura\b.*\b(agua|sede)\b|\b(agua|sede)\b.*\btemperatura\b/, "survival"], [/\b(frio|neve|inverno|snow|congel|ice)\b/, "ice"], [/\b(calor|aquec|verao)\b/, "fire"], [/\b(agua|canteen|sede|purific)\b/, "water"], [/\b(outono|primavera|estacoes|season sensor)\b/, "leaves"]] },
  { family: "trees", match: /\b(fallingtree|derrubada de arvores)\b/, effect: "leaves" },
  { family: "living-world", match: /\b(overworld vivo|ecologics|immersive weathering)\b/, effect: "leaves" },
  { family: "terrain", match: /\b(terreno|tectonic|terralith|better caves|cave biomes)\b/, effect: "stone" },
  { family: "fauna", match: /\b(alexs mobs|fauna|void worm)\b/, effect: "fauna", variants: [[/\bvoid worm\b/, "ender"]] },
  { family: "friends", match: /\b(friends\s*&?\s*foes|friends-foes)\b/, effect: "friends", variants: [[/\biceologer\b/, "ice"], [/\bwildfire\b/, "fire"]] },
  { family: "spiders", match: /\b(spider overhaul|aranhas)\b/, effect: "spiders" },
  { family: "illagers", match: /\billager invasion\b/, effect: "raid" },
  { family: "piglins", match: /\bpiglin proliferation\b/, effect: "gold" },
  { family: "variants", match: /\b(variacoes de mobs|creeper overhaul|enderman overhaul|enhanced mob variants|variants\s*&\s*ventures)\b/, effect: "variants", variants: [[/\benderman\b/, "ender"]] },
  { family: "quark", match: /\bquark\b/, effect: "redstone" },
  { family: "structures", match: /\b(masmorras|estruturas|assentamentos|yungs|dungeons|better village|lost castle|seven seas)\b/, effect: "structures", variants: [[/\b(ocean monument|seven seas|maritimo)\b/, "ocean"], [/\bnether fortress\b/, "fire"]] },
];

export type CelebrationInput = { itemId: string; completed: boolean; section: ContentSection; entryKey: string; label: string };
export type CelebrationContext = { content: ContentStore; playerStates: Record<string, PlayerItemState>; customItems: CustomItem[]; actor: Actor };
export type Celebration = { family: string; effect: EffectKey; count: number; duration: number; trophy: boolean; level: "item" | "milestone" | "phase" };
export function matchFamily(familyText: string, title: string, theme?: GuideTheme, extras = false): Pick<Celebration, "family" | "effect"> {
  if (extras) return { family: "love", effect: "love" };
  const titleText = normalize(title);
  // The primary semantic context precedes title matching. Variants remain scoped.
  const rule = FAMILY_RULES.find((r) => r.match.test(normalize(familyText))) ?? FAMILY_RULES.find((r) => r.match.test(titleText));
  if (rule) return { family: rule.family, effect: rule.variants?.find(([pattern]) => pattern.test(titleText))?.[1] ?? rule.effect };
  if (theme?.accent === "ice") return { family: "fallback", effect: "ice" };
  if (theme?.texture === "fire") return { family: "fallback", effect: "fire" };
  if (theme?.accent === "gold") return { family: "fallback", effect: "achievement" };
  if (theme?.accent === "blue") return { family: "fallback", effect: "magic" };
  if (/\b(fogo|brasas|tocha)\b/.test(titleText)) return { family: "fallback", effect: "fire" };
  if (/\b(frio|neve|inverno)\b/.test(titleText)) return { family: "fallback", effect: "ice" };
  return { family: "fallback", effect: "xp" };
}

export function describeCelebration(input: CelebrationInput, context: CelebrationContext, confirmed: ReadonlyMap<string, boolean> = new Map()): Celebration {
  const { content, actor, playerStates } = context;
  const item = content.progression.find((p) => p.id === input.itemId || p.subitens?.some((s) => s.id === input.itemId));
  const subitem = item?.subitens?.find((s) => s.id === input.itemId);
  const guide = input.section === "mods" ? content.guides.find((g) => g.id === input.entryKey) : undefined;
  const custom = context.customItems.find((c) => `custom:${c.id}` === input.itemId);
  const familyText = guide?.title.split("+")[0] ?? (item ? item.entry : custom?.entry_key ?? input.entryKey);
  const family = matchFamily(familyText, subitem?.title ?? custom?.title ?? input.label, guide?.theme, input.section === "extras");
  // Only fall back to mods when the entry did not identify a semantic family.
  const modFamily = item ? matchFamily(item.mods, subitem?.title ?? input.label) : undefined;
  const resolved = modFamily && (family.family === "fallback" || family.family === "end" && modFamily.family !== "fallback") ? modFamily : family;
  const completed = (id: string): boolean => id === input.itemId ? input.completed : confirmed.get(`${actor}:${id}`) ?? Boolean(playerStates[`${actor}:${id}`]?.completed);
  const parentComplete = (p: ContentStore["progression"][number]) => p.subitens?.length ? p.subitens.every((s) => completed(s.id)) : completed(p.id);
  const previouslyComplete = item ? item.subitens?.length ? item.subitens.every((s) => s.id !== input.itemId && completed(s.id)) : Boolean(playerStates[`${actor}:${item.id}`]?.completed) : false;
  const milestone = input.section === "progression" && (!subitem || (Boolean(item && parentComplete(item)) && !previouslyComplete));
  const phaseItems = item ? content.progression.filter((p) => p.phase === item.phase) : [];
  const phase = milestone && phaseItems.length > 0 && phaseItems.every(parentComplete);
  const title = normalize(subitem?.title ?? custom?.title ?? input.label);
  const victory = Boolean(subitem?.trophy) || (!custom && input.section === "progression" && item?.type.toLowerCase().includes("boss") && !subitem && !/\b(encontrar|invocar|arena|preparar|obter|criar|fase [123]|altar)\b/.test(title)) || /\b(derrotar|vencer|trofeu|trofeus)\b/.test(title) && !/\b(preparar|antes|para derrotar)\b/.test(title);
  return { ...resolved, effect: phase && resolved.family === "fallback" ? "confetti" : resolved.effect, count: phase ? 34 : milestone ? 22 : 12, duration: phase ? 2500 : milestone ? 2200 : 1800, trophy: victory, level: phase ? "phase" : milestone ? "milestone" : "item" };
}
