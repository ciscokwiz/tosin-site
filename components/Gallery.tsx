import { gallery } from "@/data/gallery";

/* "On stage" — photos spread like a fanned deck of cards: each card tilts
   out from the centre, the middle card sits on top, and hovering a card
   lifts it straight. Renders only when real photos exist in data/gallery.ts. */
export function Gallery() {
  if (!gallery.length) return null;
  const mid = (gallery.length - 1) / 2;
  return (
    <section className="section gallery-section" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">On stage</p>
          <h2 id="gallery-title" className="h2">Rooms he has <em>held.</em></h2>
          <p className="lead">A few moments from recent events.</p>
        </div>
        <ul className="spread">
          {gallery.map((g, i) => {
            const off = i - mid;
            return (
              <li
                key={g.src}
                className={`spread__card${g.wide ? " spread__card--wide" : ""}`}
                style={{ "--off": off, "--z": 10 - Math.abs(off) * 2 } as React.CSSProperties}
              >
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" style={g.focus ? { objectPosition: g.focus } : undefined} />
                  {g.event && <figcaption>{g.event}</figcaption>}
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
