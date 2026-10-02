/* Section transitions in 3D, driven by scroll (no library).
   - [data-depth]          the section's content arrives from depth as it enters:
       "z" (default)  rises out of the screen, tilting back to flat
       "x"            slides in from the right, turning to face you
       "y"            lifts up into place
   - [data-hero]           the hero photo drifts slower than the page and the
                           copy lifts away as you scroll past (parallax exit)
   Call update() once per animation frame. Framework-free so the artifact
   preview can reuse it. */

type DepthItem = { el: HTMLElement; target: HTMLElement; mode: string };

export function createDepth(doc: Document = document) {
  const items: DepthItem[] = Array.from(doc.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
    el,
    target: (el.matches(".wrap") ? el : el.querySelector<HTMLElement>(":scope > .wrap")) || el,
    mode: el.dataset.depth || "z",
  }));
  items.forEach((i) => (i.target.style.willChange = "transform, opacity"));
  const hero = doc.querySelector<HTMLElement>("[data-hero]");
  const heroMedia = hero?.querySelector<HTMLElement>(".hero__media") ?? null;
  const heroCopy = hero?.querySelector<HTMLElement>(".hero__inner") ?? null;

  function update() {
    const vh = window.innerHeight;
    const k = Math.min(1, window.innerWidth / 1200); // gentler on phones
    for (const i of items) {
      if (i.el.closest("[hidden]")) continue;
      const top = i.el.getBoundingClientRect().top;
      const e = clamp((vh - top) / (vh * 0.65), 0, 1);
      const t = 1 - easeOut(e);
      let transform: string;
      if (i.mode === "x") transform = `perspective(1400px) translate3d(${120 * k * t}px, 0, ${-120 * k * t}px) rotateY(${-10 * t}deg)`;
      else if (i.mode === "y") transform = `translate3d(0, ${90 * t}px, 0)`;
      else transform = `perspective(1400px) translate3d(0, ${70 * t}px, ${-220 * k * t}px) rotateX(${9 * t}deg)`;
      i.target.style.transform = t < 0.001 ? "" : transform;
      i.target.style.opacity = t < 0.001 ? "" : String(0.35 + 0.65 * easeOut(e));
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
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
