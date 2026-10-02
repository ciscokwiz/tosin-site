"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* All scroll and pointer motion, driven by ONE requestAnimationFrame loop:
   - [data-reveal]   fades/rises in when scrolled into view
   - [data-count]    counts up to its number once visible
   - [data-words]    words light up as the paragraph crosses the screen
   - [data-rail]     pinned horizontal rail (wide screens); meter on phones
   - [data-marquee]  client band drifts, and speeds up with scroll
   - .hero           gold spotlight follows the mouse
   - [data-magnetic] buttons lean toward a mouse pointer
   Reduced motion: everything is shown still, the rail is a native swipe. */
export function MotionEngine() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as { __tceMotion: boolean }).__tceMotion = true;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const counts = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
      root.classList.add("still");
      return;
    }
    root.classList.remove("still");

    // ---- reveals + counters ----
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.dataset.count) countUp(el);
          else el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
    );
    reveals.forEach((el) => io.observe(el));
    counts.forEach((el) => io.observe(el));

    // ---- elements for the frame loop ----
    const words = Array.from(document.querySelectorAll<HTMLElement>("[data-words]"));
    const rails = Array.from(document.querySelectorAll<HTMLElement>("[data-rail]")).map((rail) => ({
      rail,
      viewport: rail.querySelector<HTMLElement>("[data-rail-viewport]")!,
      track: rail.querySelector<HTMLElement>("[data-rail-track]")!,
      fill: rail.querySelector<HTMLElement>("[data-rail-fill]"),
      knob: rail.querySelector<HTMLElement>("[data-rail-knob]"),
      overflow: 0,
      pinned: false,
    }));
    const marquees = Array.from(document.querySelectorAll<HTMLElement>("[data-marquee]")).map((el) => ({ el, x: 0, paused: false }));
    marquees.forEach((m) => {
      m.el.classList.add("is-driven");
      m.el.addEventListener("pointerenter", () => (m.paused = true));
      m.el.addEventListener("pointerleave", () => (m.paused = false));
      m.el.addEventListener("focusin", () => (m.paused = true));
      m.el.addEventListener("focusout", () => (m.paused = false));
    });

    function measure() {
      const wide = window.innerWidth >= 900;
      for (const r of rails) {
        r.track.style.transform = "";
        r.overflow = Math.max(0, r.track.scrollWidth - r.viewport.clientWidth);
        r.pinned = wide && r.overflow > 0;
        r.rail.classList.toggle("is-pinned", r.pinned);
        r.rail.style.height = r.pinned ? `${window.innerHeight + r.overflow}px` : "";
      }
    }
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    let lastY = window.scrollY;
    let velocity = 0;
    let raf = 0;
    let last = performance.now();

    function frame(now: number) {
      const dt = Math.min(64, now - last);
      last = now;
      const y = window.scrollY;
      const vh = window.innerHeight;
      velocity = velocity * 0.9 + (y - lastY) * 0.1;
      lastY = y;

      // words light up between 85% and 35% of the viewport
      for (const el of words) {
        const r = el.getBoundingClientRect();
        const p = clamp((vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.6), 0, 1);
        el.style.setProperty("--p", p.toFixed(3));
      }

      // pinned rail
      for (const r of rails) {
        let p: number;
        if (r.pinned) {
          const top = r.rail.getBoundingClientRect().top;
          p = clamp(-top / Math.max(1, r.overflow), 0, 1);
          r.track.style.transform = `translate3d(${-p * r.overflow}px,0,0)`;
        } else {
          p = r.overflow ? r.viewport.scrollLeft / r.overflow : 0;
        }
        if (r.fill) r.fill.style.transform = `scaleX(${p.toFixed(4)})`;
        if (r.knob) r.knob.style.left = `${(p * 100).toFixed(2)}%`;
      }

      // marquee: base drift + scroll velocity, direction follows scroll
      for (const m of marquees) {
        if (m.paused) continue;
        const half = m.el.scrollWidth / 2;
        const speed = 0.045 * dt + Math.abs(velocity) * 0.35;
        m.x = (m.x + (velocity < -0.5 ? -speed : speed)) % half;
        if (m.x < 0) m.x += half;
        m.el.style.transform = `translate3d(${-m.x}px,0,0)`;
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    // ---- hero spotlight + magnetic buttons (mouse only) ----
    const hero = document.querySelector<HTMLElement>(".hero");
    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      if (hero) {
        const r = hero.getBoundingClientRect();
        if (e.clientY < r.bottom) {
          hero.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
          hero.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
        }
      }
      const btn = (e.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]");
      document.querySelectorAll<HTMLElement>("[data-magnetic].is-pulled").forEach((b) => {
        if (b !== btn) { b.classList.remove("is-pulled"); b.style.transform = ""; }
      });
      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
        btn.classList.add("is-pulled");
        btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      }
    }
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      document.removeEventListener("pointermove", onMove);
      rails.forEach((r) => { r.rail.style.height = ""; r.track.style.transform = ""; });
    };
  }, [pathname]);

  return null;
}

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v));
}

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target) || el.dataset.counted) return;
  el.dataset.counted = "1";
  const start = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / 1400);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
