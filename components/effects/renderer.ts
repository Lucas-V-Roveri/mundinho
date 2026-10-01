import { EFFECTS, type Motion, type Sprite } from "./taxonomy";
import { createSpriteAtlas, drawSprite, PNG_FOR_SPRITE } from "./sprites";
import type { CelebrationEvent } from "./celebration-bus.ts";

export const PARTICLE_CAP = 40;
export const QUEUE_CAP = 12;
type Particle = { x: number; y: number; vx: number; vy: number; age: number; duration: number; size: number; sprite: Sprite; effect: string; color: string; motion: Motion; rotation: number; seed: number };
type Flash = { anchor: CelebrationEvent["anchor"]; age: number };

export function createCelebrationRenderer(canvas: HTMLCanvasElement, reduced: MediaQueryList) {
  const ctx = canvas.getContext("2d");
  const atlas = createSpriteAtlas();
  const images = new Map<string, HTMLImageElement>();
  const pendingImages: HTMLImageElement[] = [];
  let particles: Particle[] = [], flashes: Flash[] = [];
  const queue: { event: CelebrationEvent; at: number }[] = [];
  let frame = 0, last = 0, width = 0, height = 0, dpr = 1, disposed = false;
  for (const [sprite, path] of Object.entries(PNG_FOR_SPRITE)) {
    const image = new Image(); pendingImages.push(image);
    image.onload = () => { if (!disposed) images.set(sprite, image); };
    image.onerror = () => { /* Inline pixel silhouette remains available. */ };
    image.src = path;
  }
  function resize() {
    width = window.innerWidth; height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    if (ctx) { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = false; }
  }
  function diagnostics() {
    canvas.dataset.particles = String(particles.length);
    canvas.dataset.queued = String(queue.length);
    canvas.dataset.mode = reduced.matches ? "reduced-motion" : "particles";
  }
  function emit(event: CelebrationEvent) {
    const { celebration, anchor } = event;
    canvas.dataset.family = celebration.family; canvas.dataset.effect = celebration.effect; canvas.dataset.level = celebration.level;
    if (reduced.matches) { flashes.push({ anchor, age: 0 }); flashes = flashes.slice(-8); diagnostics(); return; }
    const preset = EFFECTS[celebration.effect];
    const rect = anchor.element.isConnected ? anchor.element.getBoundingClientRect() : shiftedRect(anchor.rect, anchor);
    const card = anchor.card.isConnected ? anchor.card.getBoundingClientRect() : shiftedRect(anchor.cardRect, anchor);
    const source = rect.width && rect.height ? rect : card;
    if (!source.width || source.bottom < 0 || source.top > height) return;
    const count = Math.min(celebration.count, PARTICLE_CAP - particles.length);
    for (let i = 0; i < count; i++) {
      const sprite = celebration.trophy && i === 0 ? "trophy" : preset.sprites[i % preset.sprites.length];
      const rain = Boolean(("rain" in preset && preset.rain) || celebration.effect === "forest" && sprite === "leaf");
      const motion = sprite === "heart" || sprite === "bubble" || sprite === "firefly" ? "rise" : rain ? "fall" : sprite === "trophy" ? "rise" : preset.motion;
      const angle = Math.random() * Math.PI * 2;
      const speed = 35 + Math.random() * 65;
      const x = rain ? Math.random() * width : source.left + source.width / 2 + (celebration.effect === "love" ? (i % 2 ? 10 : -10) : 0);
      particles.push({ x, y: rain ? -Math.random() * 20 : source.top + source.height / 2, vx: motion === "burst" ? Math.cos(angle) * speed : (Math.random() - .5) * 35, vy: motion === "burst" ? Math.sin(angle) * speed - 25 : motion === "fall" ? 55 + Math.random() * 45 : -40 - Math.random() * 40, age: 0, duration: celebration.duration, size: sprite === "trophy" ? 22 : sprite === "bee" || sprite === "gear" ? 16 : 6 + Math.floor(Math.random() * 5) * 2, sprite, effect: celebration.effect, color: sprite === "trophy" ? "#ffd56b" : preset.colors[i % preset.colors.length], motion, rotation: 0, seed: Math.random() * Math.PI * 2 });
    }
    diagnostics();
  }
  function tick(now: number) {
    frame = 0;
    if (disposed || document.hidden || !ctx) return;
    const elapsed = last ? Math.min(now - last, 50) : 16.67; last = now;
    const dt = elapsed / 1000;
    ctx.clearRect(0, 0, width, height);
    particles = particles.filter((p) => p.age < p.duration);
    flashes = flashes.filter((f) => f.age < 300);
    while (queue.length && particles.length + queue[0].event.celebration.count <= PARTICLE_CAP) {
      const next = queue.shift()!;
      if (now - next.at < 3000) emit(next.event);
    }
    for (const p of particles) {
      p.age += elapsed;
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.motion === "burst" || p.motion === "fall") p.vy += 35 * dt;
      if (p.motion === "spiral" || p.motion === "zigzag") p.x += Math.sin(p.age / (p.motion === "zigzag" ? 90 : 180) + p.seed) * 60 * dt;
      if (p.motion === "fall" || p.motion === "burst") p.rotation = Math.floor(p.age / 180) % 3 * Math.PI / 2;
      ctx.save(); ctx.translate(Math.round(p.x), Math.round(p.y)); ctx.rotate(p.rotation);
      // Discrete final fade and two-frame twinkle, without blur or soft gradients.
      ctx.globalAlpha = p.age > p.duration - 250 ? .5 : 1;
      if (p.sprite !== "star" && p.sprite !== "firefly" || Math.floor(p.age / 240) % 2 === 0) drawSprite(ctx, atlas, images, p.sprite, p.color, p.size, Math.floor(p.age / 120), p.effect);
      ctx.restore();
    }
    for (const flash of flashes) {
      flash.age += elapsed;
      const rect = flash.anchor.card.isConnected ? flash.anchor.card.getBoundingClientRect() : shiftedRect(flash.anchor.cardRect, flash.anchor);
      ctx.strokeStyle = "#d6a34d"; ctx.lineWidth = 2;
      ctx.strokeRect(Math.round(rect.left) + 1, Math.round(rect.top) + 1, Math.round(rect.width) - 2, Math.round(rect.height) - 2);
    }
    diagnostics();
    if (particles.length || flashes.length || queue.length) frame = requestAnimationFrame(tick);
    else { last = 0; ctx.clearRect(0, 0, width, height); }
  }
  function start() { if (!frame && !disposed && !document.hidden && ctx) frame = requestAnimationFrame(tick); }
  function shiftedRect(rect: DOMRect, anchor: CelebrationEvent["anchor"]) {
    return { left: rect.left + anchor.scrollX - window.scrollX, top: rect.top + anchor.scrollY - window.scrollY, width: rect.width, height: rect.height, bottom: rect.bottom + anchor.scrollY - window.scrollY };
  }
  function accept(event: CelebrationEvent) {
    if (disposed || document.hidden || !ctx) return;
    if (reduced.matches || particles.length + event.celebration.count <= PARTICLE_CAP) emit(event);
    else if (queue.length < QUEUE_CAP) queue.push({ event, at: performance.now() });
    diagnostics(); start();
  }
  function clear() {
    cancelAnimationFrame(frame); frame = 0; last = 0;
    particles = []; flashes = []; queue.length = 0;
    ctx?.clearRect(0, 0, width, height); diagnostics();
  }
  function visibility() {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; last = 0; }
    else { queue.length = 0; start(); }
  }
  function motionChanged() { clear(); }
  resize(); diagnostics();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", visibility);
  reduced.addEventListener("change", motionChanged);
  return { accept, clear, dispose() {
    disposed = true; clear();
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", visibility);
    reduced.removeEventListener("change", motionChanged);
    for (const image of pendingImages) { image.onload = null; image.onerror = null; }
    images.clear(); atlas.clear();
  } };
}
