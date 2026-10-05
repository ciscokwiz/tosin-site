import type { Metadata } from "next";
import Link from "next/link";
import { addOns, packages, rateCategories, ratesAreSamples, terms } from "@/data/rates";
import { faq } from "@/data/faq";
import { site } from "@/data/site";
import { meetPhotos } from "@/data/photos";
import { formatNumber, whatsappLink } from "@/lib/format";
import { breadcrumbLd } from "@/lib/seo";
import { Estimator } from "@/components/Estimator";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/Icons";
import { Mark } from "@/components/Mark";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "MC Rates & Packages in Lagos — Corporate, Wedding & Launch Hosting",
  description:
    "Rate card for The Corporate Emcee: conferences, galas, retreats, weddings, product launches and award ceremonies in Lagos and across Nigeria. Build an estimate and send it on WhatsApp.",
  alternates: { canonical: "/rates/" },
  keywords: ["MC rates Lagos", "how much does an MC cost in Nigeria", "wedding MC price Lagos", "corporate event host rates"],
};

export default function RatesPage() {
  const rateFaq = faq.filter((f) => f.rates);

  return (
    <>
      <JsonLd data={breadcrumbLd("Rates", "/rates/")} />

      <PageHero
        id="rates-title"
        eyebrow="Rate card · 2026 / 27"
        title={<>Rates for <em>every room.</em></>}
        lede={<>One host, priced for every room: conferences, galas, launches, award nights and weddings in {site.city}. Build an estimate, then send it on WhatsApp for a confirmed quote.</>}
        photo={meetPhotos[1]}
        chips={["Conferences", "Galas & awards", "Weddings"]}
      >
        <div className="btn-row">
          <a href="#estimate" className="btn btn--sm" data-magnetic>Build an estimate</a>
          <Link href="/booking/" className="btn btn--sm btn--ghost">Book Oluwatosin</Link>
        </div>
        {ratesAreSamples && <p className="phero__note">Sample prices until Oluwatosin confirms his rate card.</p>}
      </PageHero>

      <section className="section rates" aria-label="Packages">
        <div className="wrap">
          <nav className="seg" aria-label="Rate categories">
            {rateCategories.map((c) => (
              <a key={c.id} href={`#${c.id}`}>{c.label}</a>
            ))}
            <a href="#estimate">Estimate</a>
          </nav>

          <div className="rates__list">
            {rateCategories.map((c) => {
              const list = packages.filter((p) => p.category === c.id);
              if (!list.length) return null;
              return (
                <section key={c.id} id={c.id} className="rpanel" aria-labelledby={`${c.id}-title`}>
                  <header className="rpanel__head">
                    <h2 id={`${c.id}-title`} className="rpanel__title">{c.label}</h2>
                    <p>{c.blurb}</p>
                  </header>
                  <ul className="rpanel__grid">
                    {list.map((p, i) => (
                      <li key={p.id} data-depth="y" data-depth-lag={i % 3}>
                      <article className={`pkg${p.featured ? " pkg--featured" : ""}`}>
                        {p.featured && <span className="pkg__badge"><Mark variant="bow" /> Most booked</span>}
                        <h3 className="pkg__name">{p.name}</h3>
                        <p className="pkg__price">
                          {p.price === null ? (
                            <span className="pkg__amount">On request</span>
                          ) : (
                            <>
                              <span className="pkg__from">from</span>
                              <span className="pkg__amount"><span className="cur">₦</span>{formatNumber(p.price)}</span>
                            </>
                          )}
                          <span className="pkg__per">{p.per}</span>
                        </p>
                        <p className="pkg__summary">{p.summary}</p>
                        <ul className="pkg__tags">
                          {p.includes.map((x) => <li key={x}>{x}</li>)}
                        </ul>
                        <div className="pkg__actions">
                          <Link className="btn btn--sm" href={`/booking/?package=${p.id}`}>Book this</Link>
                          <a
                            className="icon-btn"
                            href={whatsappLink(`Hello ${site.brand}, I'm interested in the "${p.name}" package. Is my date available?`)}
                            target="_blank"
                            rel="noopener"
                            aria-label={`Ask about ${p.name} on WhatsApp`}
                          >
                            <WhatsAppIcon />
                          </a>
                        </div>
                      </article>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            <section className="rpanel" aria-labelledby="addons-title">
              <header className="rpanel__head">
                <h2 id="addons-title" className="rpanel__title">Extras</h2>
                <p>Add to any package.</p>
              </header>
              <ul className="extras">
                {addOns.map((a, i) => (
                  <li key={a.id} data-depth="y" data-depth-lag={i % 3}>
                    <strong>{a.name}</strong>
                    <span className="extras__price">{a.price === null ? "At cost" : `+₦${formatNumber(a.price)}`}</span>
                    <small>{a.note}</small>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section id="estimate" className="section estimate stage" aria-labelledby="estimate-title" data-depth>
        <div className="wrap">
          <div className="split-head">
            <div style={{ display: "grid", gap: 14 }}>
              <p className="eyebrow">Estimate builder</p>
              <h2 id="estimate-title" className="h2">Build your <em>quote.</em></h2>
            </div>
            <p className="lead">Pick a package and extras, then send the estimate on WhatsApp. Oluwatosin confirms availability and the final price.</p>
          </div>
          <Estimator />
        </div>
      </section>

      <section className="section" aria-labelledby="terms-title" data-depth="y">
        <div className="wrap faq-layout">
          <div className="section-head">
            <p className="eyebrow">Good to know</p>
            <h2 id="terms-title" className="h2">Booking <em>terms.</em></h2>
          </div>
          <div style={{ display: "grid", gap: 28 }}>
            <ol className="terms">
              {terms.map((t) => <li key={t}>{t}</li>)}
            </ol>
            <Faq items={rateFaq} />
            <div className="date-cta">
              <span>Got a date in mind?</span>
              <Link className="btn btn--sm" href="/booking/">Check availability</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
