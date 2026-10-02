"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";
import { MARK_GEOMETRY } from "./MarkSprite";
import { jumpTo } from "./SmoothScroll";

type State = "idle" | "closing" | "closed" | "opening";

const CLOSE_MS = 640;
const OPEN_MS = 760;
const HOLD_MS = 220; // long enough to read "Up next: …"
const SAFETY_MS = 1600;

function normalise(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}

function labelFor(path: string) {
  const item = nav.find((n) => normalise(n.href) === normalise(path));
  return item ? item.programme : site.brand;
}

/* The jacket-front curtain.
   - First visit in a session: plays once as the intro (pure CSS, see
     globals.css → "first-visit intro"); the inline script in layout.tsx
     decides whether it runs.
   - Every internal link after that: the lapels close, the emcee
     announces "Up next: …", the new page loads, the lapels part. */
export function Curtain() {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<State>("idle");
  const [label, setLabel] = useState<{ kicker: string; title: string }>({ kicker: "Ladies and gentlemen", title: site.brand });
  const stateRef = useRef<State>("idle");
  const timers = useRef<number[]>([]);
  const closedAt = useRef(0);
  const pendingHash = useRef("");

  const set = (s: State) => {
    stateRef.current = s;
    setState(s);
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const open = () => {
    if (stateRef.current !== "closed" && stateRef.current !== "closing") return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    set("opening");
    later(() => set("idle"), OPEN_MS);
  };

  // End the intro so the curtain can be reused for page transitions.
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro")) return;
    const t = window.setTimeout(() => root.classList.add("intro-over"), 2750);
    return () => clearTimeout(t);
  }, []);

  // Intercept internal link clicks (capture phase, before next/link).
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (normalise(url.pathname) === normalise(window.location.pathname)) return;
      if (reduce.matches || stateRef.current !== "idle") return;
      if (!document.documentElement.classList.contains("intro-over") && document.documentElement.classList.contains("intro")) return;

      e.preventDefault();
      setLabel({ kicker: "Up next", title: labelFor(url.pathname) });
      set("closing");
      later(() => {
        set("closed");
        closedAt.current = performance.now();
        // the first-visit intro is long over: new pages enter without its delay
        document.documentElement.classList.remove("intro");
        pendingHash.current = url.hash.slice(1);
        // We scroll ourselves while the lapels are closed (see below).
        router.push(url.pathname + url.search + url.hash, { scroll: false });
        later(open, SAFETY_MS);
      }, CLOSE_MS);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // New page rendered → part the lapels.
  useEffect(() => {
    if (stateRef.current === "closed") {
      const target = pendingHash.current && document.getElementById(pendingHash.current);
      jumpTo(target || 0);
      const wait = Math.max(0, HOLD_MS - (performance.now() - closedAt.current));
      later(() => requestAnimationFrame(open), wait);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <div className="curtain" data-state={state} aria-hidden="true">
      <div className="curtain__shirt" />
      {/* The two halves of the curtain are Tosin's lapels at screen scale.
          Both use the artwork's own coordinates, centred on the seam (x = 82).
          Texture: a fine twill on the cloth, light falling off toward the
          outer edges, satin sheen and a stitched edge on the lapels. */}
      <svg className="curtain__panel curtain__panel--l" viewBox="-400 0 482 290" preserveAspectRatio="xMaxYMid slice">
        <defs>
          <pattern id="cur-twill" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
            <rect width="0.9" height="2.4" fill="rgba(255,255,255,0.055)" />
          </pattern>
          <linearGradient id="cur-falloff-l" gradientUnits="userSpaceOnUse" x1="-400" y1="0" x2="82" y2="0">
            <stop offset="0" stopColor="#120a20" stopOpacity="0.55" />
            <stop offset="0.75" stopColor="#120a20" stopOpacity="0.05" />
            <stop offset="1" stopColor="#120a20" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="cur-falloff-r" gradientUnits="userSpaceOnUse" x1="564" y1="0" x2="82" y2="0">
            <stop offset="0" stopColor="#120a20" stopOpacity="0.55" />
            <stop offset="0.75" stopColor="#120a20" stopOpacity="0.05" />
            <stop offset="1" stopColor="#120a20" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="cur-satin-l" gradientUnits="userSpaceOnUse" x1="14" y1="110" x2="82" y2="270">
            <stop offset="0" stopColor="#24173b" />
            <stop offset="0.42" stopColor="#4a3672" />
            <stop offset="0.55" stopColor="#2f2049" />
            <stop offset="1" stopColor="#1d1230" />
          </linearGradient>
          <linearGradient id="cur-satin-r" gradientUnits="userSpaceOnUse" x1="150" y1="110" x2="82" y2="270">
            <stop offset="0" stopColor="#24173b" />
            <stop offset="0.42" stopColor="#4a3672" />
            <stop offset="0.55" stopColor="#2f2049" />
            <stop offset="1" stopColor="#1d1230" />
          </linearGradient>
        </defs>
        <path className="curtain__cloth" d="M-400 0H82V112H48C54 165 68 212 82 240V290H-400Z" />
        <path fill="url(#cur-twill)" d="M-400 0H82V112H48C54 165 68 212 82 240V290H-400Z" />
        <path fill="url(#cur-falloff-l)" d="M-400 0H82V112H48C54 165 68 212 82 240V290H-400Z" />
        <path fill="url(#cur-satin-l)" d={MARK_GEOMETRY.LAPEL_L} />
        <path className="curtain__stitch" d={MARK_GEOMETRY.LAPEL_L} />
      </svg>
      <svg className="curtain__panel curtain__panel--r" viewBox="82 0 482 290" preserveAspectRatio="xMinYMid slice">
        <path className="curtain__cloth" d="M82 0H564V290H82V240C96 212 110 165 116 112H82Z" />
        <path fill="url(#cur-twill)" d="M82 0H564V290H82V240C96 212 110 165 116 112H82Z" />
        <path fill="url(#cur-falloff-r)" d="M82 0H564V290H82V240C96 212 110 165 116 112H82Z" />
        <path fill="url(#cur-satin-r)" d={MARK_GEOMETRY.LAPEL_R} />
        <path className="curtain__stitch" d={MARK_GEOMETRY.LAPEL_R} />
      </svg>
      <svg className="curtain__ornaments" viewBox="-400 0 964 290" preserveAspectRatio="xMidYMid slice">
        <use href="#m-studs" className="c-studs" />
        <use href="#m-bow" className="c-bow" />
        <use href="#m-fila" className="c-fila" />
      </svg>
      <div className="curtain__text">
        <span className="curtain__kicker">{label.kicker}</span>
        <span className="curtain__title">{label.title}</span>
      </div>
    </div>
  );
}
