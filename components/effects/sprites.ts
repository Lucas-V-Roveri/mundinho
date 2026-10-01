import type { Sprite } from "./taxonomy.ts";

// Original hard-edged silhouettes. Vanilla item sprites use local PNGs first.
const ART: Record<Sprite, string[]> = {
  spark: ["..x..", ".xxx.", "xxxxx", ".xxx.", "..x.."],
  leaf: ["...xx", "..xxx", ".xxxx", "xxxx.", ".x..."],
  firefly: ["x...x", ".xxx.", "..x..", ".xxx.", "x...x"],
  feather: ["....xx", "...xxx", "..xxx.", ".xxx..", "xxx...", "x....."],
  cloud: ["..xx....", ".xxxxxx.", "xxxxxxxx", ".xxxxxx."],
  bee: [".ww.ww..", "..yykk..", ".kyykyk.", "..yykk..", "...k.k.."],
  star: ["...x...", "...x...", "..xxx..", "xxxxxxx", "..xxx..", "...x...", "...x..."],
  rune: ["..xxx..", ".x...x.", "x..x..x", "x.xxx.x", "x..x..x", ".x...x.", "..xxx.."],
  shard: ["..xx.", ".xxxx", "xxxx.", ".xxx.", "..x.."],
  bubble: [".xxx.", "x...x", "x...x", "x...x", ".xxx."],
  eye: ["..xxx..", ".xxxxx.", "xxxkxxx", ".xxxxx.", "..xxx.."],
  bone: ["xx....", "xxx...", ".xxx..", "..xxx.", "...xxx", "....xx"],
  candy: ["x.....x", "xx.xxx.", ".xxxxx.", "xx.xxx.", "x.....x"],
  gear: ["..x.x..", ".xxxxx.", "xxxxxxx", ".xxkxx.", "xxxxxxx", ".xxxxx.", "..x.x.."],
  heart: [".xx.xx.", "xxxxxxx", "xxxxxxx", ".xxxxx.", "..xxx..", "...x..."],
  food: [".xxxxx.", "xxxxxxx", "xx.x.xx", ".xxxxx."],
  seed: [".xx.", "xxxx", ".xx.", "..x."],
  moon: ["..xxx", ".xx..", "xx...", "xx...", ".xx..", "..xxx"],
  note: ["..xxxx", "..x..x", "..x..x", "xxx.xx", "xx..xx"],
  lantern: ["..xx..", ".xxxx.", ".xwwx.", ".xwwx.", ".xxxx.", "..xx.."],
  pack: ["..xxx..", ".xxxxx.", "xxwwwxx", "xxxxxxx", "xxwwwxx", ".xxxxx."],
  gem: ["..xx..", ".xxxx.", "xxwwxx", ".xxxx.", "..xx.."],
  snow: ["x..x..x", ".x.x.x.", "..xxx..", "xxxxxxx", "..xxx..", ".x.x.x.", "x..x..x"],
  drop: ["..x..", "..x..", ".xxx.", "xxxxx", "xxwxx", ".xxx."],
  paw: ["x.x.x", ".x.x.", "..x..", ".xxx.", "xxxxx"],
  web: ["x..x..x", ".x.x.x.", "..xxx..", "xxxxxxx", "..xxx..", ".x.x.x.", "x..x..x"],
  banner: ["xxxxxx", "x....x", "x.xx.x", "x.xx.x", "x....x", "xxxx.x", "x....."],
  coin: [".xxx.", "xxwxx", "xxwxx", "xxwxx", ".xxx."],
  block: ["xxxx", "xwxx", "xxxx", "xxxx"],
  xp: [".xxx.", "xxwxx", "xwwxx", "xxxxx", ".xxx."],
  trophy: ["xx...xx", "xxxxxxx", ".xxxxx.", "..xxx..", "...x...", "..xxx..", ".xxxxx."],
  mask: [".xxxxx.", "xxxxxxx", "xkxxxkx", "xxxxxxx", ".xkkkx.", "..xxx.."],
  bolt: ["..xx", ".xx.", "xxxx", "..x.", ".x.."],
  paper: ["xxxxx", "xwwwx", "xwxwx", "xwwwx", "xxxxx"],
};
export const PNG_FOR_SPRITE: Record<string, string> = {
  heart: "/icons/celebrations/heart.png",
  feather: "/icons/celebrations/feather.png",
  bone: "/icons/minecraft/bone.png",
  food: "/icons/minecraft/bread.png",
  gem: "/icons/minecraft/amethyst_shard.png",
  coin: "/icons/minecraft/gold_ingot.png",
  lantern: "/icons/minecraft/lantern.png",
  paper: "/icons/minecraft/paper.png",
  "apples:food": "/icons/minecraft/enchanted_golden_apple.png",
  "social:gem": "/icons/minecraft/emerald.png",
  "eyes:eye": "/icons/minecraft/ender_eye.png",
};
export type SpriteAtlas = Map<string, HTMLCanvasElement>;
export function createSpriteAtlas(): SpriteAtlas { return new Map(); }
export function drawSprite(ctx: CanvasRenderingContext2D, atlas: SpriteAtlas, images: Map<string, HTMLImageElement>, sprite: Sprite, color: string, size: number, frame: number, effect = "") {
  const image = images.get(`${effect}:${sprite}`) ?? images.get(sprite);
  if (image?.complete && image.naturalWidth > 0) {
    // Block/item textures can be vertical animations: use one square frame.
    const side = Math.min(image.naturalWidth, image.naturalHeight);
    ctx.drawImage(image, 0, 0, side, side, -size / 2, -size / 2, size, size);
    return;
  }
  const key = `${sprite}:${color}:${sprite === "bee" ? frame % 2 : 0}`;
  let canvas = atlas.get(key);
  if (!canvas) {
    const art = ART[sprite];
    canvas = document.createElement("canvas");
    canvas.width = Math.max(...art.map((r) => r.length)); canvas.height = art.length;
    const pixel = canvas.getContext("2d")!;
    art.forEach((row, y) => [...row].forEach((char, x) => {
      if (char === "." || sprite === "bee" && char === "w" && frame % 2 === 1) return;
      pixel.fillStyle = char === "k" ? "#302b32" : char === "w" ? "#f7f1d8" : char === "y" ? "#f4c542" : color;
      pixel.fillRect(x, y, 1, 1);
    }));
    atlas.set(key, canvas);
  }
  ctx.drawImage(canvas, -size / 2, -size / 2, size, size);
}
