/* eslint-disable @next/next/no-img-element -- raw local pixel assets need exact browser rendering and a simple onError fallback */
"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

const fallbacks = {
  boss: "/icons/boss.svg",
  dimension: "/icons/dimension.svg",
  structure: "/icons/structure.svg",
  apple: "/icons/apple.svg",
  item: "/icons/item.svg",
  cube: "/icons/cube.svg",
} as const;

type Kind = keyof typeof fallbacks;

export function ContentIcon({ src, alt, kind = "cube", className, locked = false }: { src?: string | null; alt: string; kind?: Kind; className?: string; locked?: boolean }) {
  const [failed, setFailed] = React.useState(false);
  const fallback = fallbacks[kind];
  const resolved = failed || !src ? fallback : src;
  return <img src={resolved} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={cn("content-pixel-image object-contain", locked && "content-pixel-image-locked", className)} />;
}

export function iconKindForType(type: string): Kind {
  const value = type.toLocaleLowerCase("pt-BR");
  if (value.includes("boss") || value.includes("miniboss")) return "boss";
  if (value.includes("dimensão") || value.includes("acesso")) return "dimension";
  if (value.includes("estrutura") || value.includes("dungeon") || value.includes("stronghold")) return "structure";
  return "cube";
}
