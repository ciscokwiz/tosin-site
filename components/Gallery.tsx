import { gallery } from "@/data/gallery";

/* "On stage" — renders only when real photos exist in data/gallery.ts. */
export function Gallery() {
  if (!gallery.length) return null;
  return (
    <section className="section" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">On stage</p>
          <h2 id="gallery-title" className="h2">Rooms he has <em>held.</em></h2>
        </div>
        <ul className="gallery">
          {gallery.map((g) => (
            <li key={g.src}>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} width={1000} height={1250} loading="lazy" decoding="async" />
                {g.event && <figcaption>{g.event}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
