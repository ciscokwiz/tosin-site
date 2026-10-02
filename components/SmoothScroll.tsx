"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type W = Window & { __lenis?: Lenis };

/* Smooth, weighted scrolling (Lenis) for mouse wheels and trackpads.
   Touch keeps the phone's native scrolling. Off for reduced motion.
   Exposed as window.__lenis so the menu, video player and page curtain
   can pause it or jump instantly. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: 0, duration: 1.4 }, smoothWheel: true });
    (window as W).__lenis = lenis;
    return () => {
      lenis.destroy();
      delete (window as W).__lenis;
    };
  }, []);
  return null;
}

/** Pause/resume smooth scrolling (e.g. while a menu or dialog is open). */
export function lockScroll(locked: boolean) {
  const lenis = (window as W).__lenis;
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/** Jump instantly (no smoothing) — used by page transitions. */
export function jumpTo(target: number | HTMLElement) {
  const lenis = (window as W).__lenis;
  if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
  else if (typeof target === "number") window.scrollTo({ top: target, left: 0, behavior: "instant" as ScrollBehavior });
  else target.scrollIntoView({ behavior: "instant" as ScrollBehavior });
}
