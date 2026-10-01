"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useMundinho } from "@/components/app-providers";
import { captureCheckbox, CELEBRATION_EVENT, clearCelebrationSession, reconcileConfirmations, setCelebrationsEnabled, type CelebrationEvent } from "./celebration-bus";
import { createCelebrationRenderer } from "./renderer";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function CelebrationOverlay() {
  const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ReturnType<typeof createCelebrationRenderer> | null>(null);
  const context = useMundinho();
  const contextRef = useRef(context);
  const pathname = usePathname();
  useEffect(() => { contextRef.current = context; reconcileConfirmations(context); }, [context]);
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    // Optional independent preference; default on. No new progress/state contract.
    setCelebrationsEnabled(localStorage.getItem("mundinho.celebrations") !== "0");
    const renderer = createCelebrationRenderer(canvasRef.current, matchMedia("(prefers-reduced-motion: reduce)"));
    rendererRef.current = renderer;
    const capture = (event: Event) => captureCheckbox(event, contextRef.current);
    const celebrate = (event: Event) => renderer.accept((event as CustomEvent<CelebrationEvent>).detail);
    document.addEventListener("change", capture, true);
    window.addEventListener(CELEBRATION_EVENT, celebrate);
    return () => {
      document.removeEventListener("change", capture, true);
      window.removeEventListener(CELEBRATION_EVENT, celebrate);
      renderer.dispose(); rendererRef.current = null; clearCelebrationSession();
    };
  }, [mounted]);
  useEffect(() => { rendererRef.current?.clear(); clearCelebrationSession(); }, [pathname]);
  return mounted ? createPortal(<canvas ref={canvasRef} aria-hidden="true" data-celebration-overlay="" style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 80, pointerEvents: "none", imageRendering: "pixelated" }} />, document.body) : null;
}
