/* The Range rail when it is a swipe row: phones, tablets, and on desktop
   once the pinned rail has been passed. Two things follow the swipe:
   - the bow tie on the Boardroom → Dance floor meter
   - the card that has snapped into view lifts up out of the deck (touch
     screens and narrow windows; a mouse lifts cards by hovering instead)
   This is feedback for the visitor's own gesture, not decoration, so it
   runs with reduced motion too (the lift is then instant, not animated).
   Framework-free so the artifact preview can share it. */

export function setMeter(fill: HTMLElement | null, knob: HTMLElement | null, p: number) {
  if (fill) fill.style.transform = `scaleX(${p.toFixed(4)})`;
  // the knob travels inside the track, never past its ends (34px = knob width)
  if (knob) knob.style.left = `calc(${p.toFixed(4)} * (100% - 34px))`;
}

export function bindRailSwipe(rail: HTMLElement) {
  const viewport = rail.querySelector<HTMLElement>("[data-rail-viewport]");
  if (!viewport) return () => {};
  const vp = viewport;
  const fill = rail.querySelector<HTMLElement>("[data-rail-fill]");
  const knob = rail.querySelector<HTMLElement>("[data-rail-knob]");
  const cards = Array.from(vp.querySelectorAll<HTMLElement>(".rail__card"));
  const autoLift = window.matchMedia("(hover: none), (max-width: 899px)");
  let up: HTMLElement | null = null;
  let raf = 0;

  function setUp(card: HTMLElement | null) {
    if (card === up) return;
    up?.classList.remove("is-up");
    card?.classList.add("is-up");
    up = card;
  }

  function update() {
    raf = 0;
    // while pinned, the page scroll drives the rail (MotionEngine)
    if (rail.classList.contains("is-pinned")) return setUp(null);
    const range = vp.scrollWidth - vp.clientWidth;
    const p = range > 1 ? Math.min(1, Math.max(0, vp.scrollLeft / range)) : 0;
    setMeter(fill, knob, p);
    if (!autoLift.matches || !cards.length) return setUp(null);
    // the card nearest the snap line (the viewport's left padding) is in view;
    // at the end of the row that is always the last card
    if (p > 0.98) return setUp(cards[cards.length - 1]);
    const line = vp.getBoundingClientRect().left + (parseFloat(getComputedStyle(vp).paddingLeft) || 0);
    let best = cards[0];
    let bestD = Infinity;
    for (const c of cards) {
      const d = Math.abs(c.getBoundingClientRect().left - line);
      if (d < bestD) { bestD = d; best = c; }
    }
    setUp(best);
  }

  const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
  vp.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  autoLift.addEventListener?.("change", schedule);
  schedule();

  return () => {
    cancelAnimationFrame(raf);
    vp.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    autoLift.removeEventListener?.("change", schedule);
    setUp(null);
  };
}
