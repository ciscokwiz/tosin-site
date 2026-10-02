import { site } from "@/data/site";
import { Mark } from "./Mark";

/* Credibility band directly under the hero. Names are set in type (not
   scraped logos) so the claim is honest, readable and theme-proof. The
   fila separates the names; MotionEngine speeds the band up with scroll. */
export function Clients() {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {site.clients.map((c) => (
        <li key={c}>
          <span>{c}</span>
          <Mark variant="fila" />
        </li>
      ))}
    </ul>
  );
  return (
    <section className="clients" aria-labelledby="clients-title">
      <h2 id="clients-title" className="clients__label">Trusted by teams at</h2>
      <div className="clients__fade">
        <div className="marquee" data-marquee>
          {row()}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
