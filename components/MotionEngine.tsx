"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* One place for scroll/pointer motion:
   - [data-reveal]  fades/rises in when scrolled into view
   - [data-count]   counts up to its number once revealed
   - .hero          a gold spotlight follows a mouse (never on touch)
   Everything is skipped when the visitor prefers reduced motion. */
export function MotionEngine() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as { __tceMotion: boolean }).__tceMotion = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    // Spotlight on the hero, pointer devices only.
    const hero = document.querySelector<HTMLElement>(".hero");
    let raf = 0;
    const fine = window.matchMedia("(pointer: fine)").matches;
    function onMove(e: PointerEvent) {
      if (!hero || e.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
        hero.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    }
    if (hero && fine) hero.addEventListener("pointermove", onMove);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      if (hero) hero.removeEventListener("pointermove", onMove);
    };
  }, [pathname]);

  return null;
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || el.dataset.counted) return;
  el.dataset.counted = "1";
  const start = performance.now();
  const dur = 1300;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = String(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
