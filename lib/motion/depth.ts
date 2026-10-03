/* Section transitions in 3D, driven by scroll (no library).
   - [data-depth]          the section's content arrives from depth as it enters:
       "z" (default)  rises out of the screen, tilting back to flat
       "x"            slides in from the right, turning to face you
       "y"            lifts up into place
     On phones (< 768px) every mode becomes a short, gentle lift — 3D tilts
     distort tall sections on a small screen — and a section marked
     data-depth-sm="off" does not move at all there.
   - [data-hero]           the hero photo drifts slower than the page and the
                           copy lifts away as you scroll past (parallax exit)
   Call update() once per animation frame. Framework-free so the artifact
   preview can reuse it. */

type DepthItem = { el: HTMLElement; target: HTMLElement; mode: string; lag: number; cur: number; smOff: boolean };

export function createDepth(doc: Document = document) {
  const items: DepthItem[] = Array.from(doc.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
    el,
    target: (el.matches(".wrap") ? el : el.querySelector<HTMLElement>(":scope > .wrap")) || el,
    mode: el.dataset.depth || "z",
    lag: Number(el.dataset.depthLag || 0), // stagger siblings in a row
    cur: -1,
    smOff: el.dataset.depthSm === "off",
  }));
  items.forEach((i) => (i.target.style.willChange = "transform, opacity"));
  const hero = doc.querySelector<HTMLElement>("[data-hero]");
  const heroMedia = hero?.querySelector<HTMLElement>(".hero__media") ?? null;
  const heroCopy = hero?.querySelector<HTMLElement>(".hero__inner") ?? null;

  function update() {
    const vh = window.innerHeight;
    const k = Math.min(1, window.innerWidth / 1200); // gentler on smaller screens
    const small = window.innerWidth < 768;
    for (const i of items) {
      if (i.el.closest("[hidden]")) continue;
      if (small && i.smOff) {
        if (i.cur !== 1) { i.cur = 1; i.target.style.transform = ""; i.target.style.opacity = ""; }
        continue;
      }
      const top = i.el.getBoundingClientRect().top + i.lag * 48;
      const goal = clamp((vh - top) / (vh * 0.6), 0, 1);
      // ease toward the scroll position instead of snapping to it: fluid,
      // even when the finger or wheel moves in bursts
      i.cur = i.cur < 0 ? goal : i.cur + (goal - i.cur) * 0.12;
      if (Math.abs(goal - i.cur) < 0.0005) i.cur = goal;
      const e = easeInOut(i.cur);
      const t = 1 - e;
      let transform: string;
      if (small) transform = `translate3d(0, ${28 * t}px, 0)`;
      else if (i.mode === "x") transform = `perspective(1400px) translate3d(${120 * k * t}px, 0, ${-120 * k * t}px) rotateY(${-10 * t}deg)`;
      else if (i.mode === "y") transform = `translate3d(0, ${56 * t}px, 0) scale(${1 - 0.03 * t})`;
      else transform = `perspective(1400px) translate3d(0, ${70 * t}px, ${-220 * k * t}px) rotateX(${9 * t}deg)`;
      i.target.style.transform = t < 0.001 ? "" : transform;
      i.target.style.opacity = t < 0.001 ? "" : String((small ? 0.45 : 0.25) + (small ? 0.55 : 0.75) * e);
    }
    if (hero && heroMedia && heroCopy) {
      const y = Math.max(0, -hero.getBoundingClientRect().top);
      const p = Math.min(1, y / vh);
      heroMedia.style.transform = p ? `translate3d(0, ${y * 0.35}px, 0) scale(${1 + p * 0.08})` : "";
      heroCopy.style.transform = p ? `translate3d(0, ${-y * 0.18}px, 0)` : "";
      heroCopy.style.opacity = p ? String(Math.max(0, 1 - p * 1.4)) : "";
    }
  }

  function reset() {
    items.forEach((i) => { i.target.style.transform = ""; i.target.style.opacity = ""; i.target.style.willChange = ""; });
    if (heroMedia) heroMedia.style.transform = "";
    if (heroCopy) { heroCopy.style.transform = ""; heroCopy.style.opacity = ""; }
  }

  return { update, reset };
}

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v));
}
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
