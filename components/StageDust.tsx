"use client";

import { useEffect, useRef } from "react";
import { startStageDust } from "@/lib/motion/stageDust";

/* Home page only: the three.js "stage dust" layer (see lib/motion/stageDust).
   Loaded lazily after the page is idle; skipped for reduced motion,
   data-saver mode, or browsers without WebGL. */
export function StageDust({ contained = false }: { contained?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    let dust: ReturnType<typeof startStageDust> | null = null;
    let cancelled = false;
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      // contained: progress through its own section; otherwise the whole page
      const max = contained
        ? Math.max(1, canvas!.parentElement?.getBoundingClientRect().height ?? window.innerHeight)
        : Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      dust?.setScroll(Math.min(1, y / max), y - lastY);
      lastY = y;
    }

    const idle = (cb: () => void) => {
      const w = window as Window & { requestIdleCallback?: (f: () => void) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(cb);
      else setTimeout(cb, 600);
    };

    idle(async () => {
      try {
        const THREE = await import("three");
        if (cancelled) return;
        dust = startStageDust(THREE, canvas, { contained });
        canvas.classList.add("is-on");
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
      } catch {
        /* no WebGL: the page simply has no dust */
      }
    });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      dust?.stop();
    };
  }, []);

  return <canvas ref={ref} className={contained ? "stage-dust stage-dust--contained" : "stage-dust"} aria-hidden="true" />;
}
