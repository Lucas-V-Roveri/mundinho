/* eslint-disable @next/next/no-img-element -- raw local pixel assets need exact browser rendering and a simple onError fallback */
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

const neutralFallback = "/icons/minecraft/paper.png";
const fallbacks = {
  boss: neutralFallback,
  dimension: neutralFallback,
  structure: neutralFallback,
  apple: neutralFallback,
  item: neutralFallback,
  cube: neutralFallback,
} as const;

type Kind = keyof typeof fallbacks;

export function ContentIcon({ src, alt, kind = "cube", className, locked = false }: { src?: string | null; alt: string; kind?: Kind; className?: string; locked?: boolean }) {
  const [failed, setFailed] = React.useState(false);
  const fallback = fallbacks[kind];
  const resolved = failed || !src ? fallback : src;
  return <img src={resolved} alt={alt} loading="eager" decoding="async" onError={() => setFailed(true)} className={cn("content-pixel-image object-contain", locked && "content-pixel-image-locked", className)} />;
}

export function iconKindForType(type: string): Kind {
  const value = type.toLocaleLowerCase("pt-BR");
  if (value.includes("boss") || value.includes("miniboss")) return "boss";
  if (value.includes("dimensão") || value.includes("acesso")) return "dimension";
  if (value.includes("estrutura") || value.includes("dungeon") || value.includes("stronghold")) return "structure";
  return "cube";
}
