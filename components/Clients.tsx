import { site } from "@/data/site";

/* Credibility band directly under the hero. Names are set in type (not
   scraped logos) so the claim is honest, readable and theme-proof. */
export function Clients() {
  const list = site.clients;
  return (
    <section className="clients stage" aria-labelledby="clients-title">
      <h2 id="clients-title" className="clients__label">Trusted on stage by teams at</h2>
      <div className="clients__fade">
        <div className="marquee">
          <ul>
            {list.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <ul aria-hidden="true">
            {list.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
