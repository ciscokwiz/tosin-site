import type { Metadata } from "next";
import Link from "next/link";
import { addOns, packages, rateCategories, ratesAreSamples, terms } from "@/data/rates";
import { faq } from "@/data/faq";
import { site } from "@/data/site";
import { formatNaira, formatNumber, whatsappLink } from "@/lib/format";
import { breadcrumbLd } from "@/lib/seo";
import { Estimator } from "@/components/Estimator";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/Icons";
import { Mark } from "@/components/Mark";

export const metadata: Metadata = {
  title: "MC Rates & Packages in Lagos — Corporate, Wedding & Launch Hosting",
  description:
    "Rate card for The Corporate Emcee: corporate conferences, galas, retreats, weddings, product launches and award ceremonies in Lagos and across Nigeria. Build an estimate and send it on WhatsApp.",
  alternates: { canonical: "/rates/" },
  keywords: ["MC rates Lagos", "how much does an MC cost in Nigeria", "wedding MC price Lagos", "corporate event host rates"],
};

export default function RatesPage() {
  const rateFaq = faq.filter((f) => f.rates);

  return (
    <>
      <JsonLd data={breadcrumbLd("Rates", "/rates/")} />

      <section className="page-hero stage" aria-labelledby="rates-title">
        <Mark className="page-hero__mark" />
        <div className="wrap page-hero__grid hero-in">
          <div style={{ display: "grid", gap: 22 }}>
            <p className="eyebrow">The rate card &middot; 2026 / 27</p>
            <h1 id="rates-title" className="h1">Rates for <em>every</em> room.</h1>
          </div>
          <div style={{ display: "grid", gap: 22 }}>
            <p className="lead">
              Starting prices for hosting in {site.city}. Every event is different &mdash; use the estimate
              builder below, then send it on WhatsApp for a confirmed quote.
            </p>
            {ratesAreSamples && (
              <p className="notice">
                <span><b>Sample rates.</b> Placeholder prices until Tosin confirms his rate card.</span>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 16 }} aria-label="Packages">
        <div className="wrap">
          <nav className="cat-nav" aria-label="Rate categories">
            {rateCategories.map((c) => (
              <a key={c.id} href={`#${c.id}`}>{c.label}</a>
            ))}
            <a href="#estimate">Estimate</a>
          </nav>

          {rateCategories.map((c) => {
            const list = packages.filter((p) => p.category === c.id);
            if (!list.length) return null;
            return (
              <section key={c.id} id={c.id} className="rate-cat" aria-labelledby={`${c.id}-title`}>
                <div className="rate-cat__head">
                  <h2 id={`${c.id}-title`} className="h2">{c.label}</h2>
                  <p>{c.blurb}</p>
                </div>
                <ul className="menu">
                  {list.map((p) => (
                    <li key={p.id} className="menu__item">
                      <div className="menu__row">
                        <h3 className="menu__name">{p.name}</h3>
                        <span className="leader" aria-hidden="true" />
                        <div className="menu__price">
                          {p.price === null ? (
                            <span className="price">On request</span>
                          ) : (
                            <span className="price" aria-label={`From ${formatNaira(p.price)}`}>
                              <span className="from">from</span><span className="cur">₦</span>{formatNumber(p.price)}
                            </span>
                          )}
                          <span className="menu__per">{p.per}</span>
                        </div>
                      </div>
                      <p className="menu__summary">{p.summary}</p>
                      <p className="menu__includes">Includes: {p.includes.join(" · ")}</p>
                      <div className="menu__actions">
                        {p.featured && (
                          <span className="menu__featured"><Mark variant="bow" /> Most booked</span>
                        )}
                        <Link className="text-link" href={`/booking/?package=${p.id}`}>Book this</Link>
                        <a
                          className="text-link"
                          href={whatsappLink(`Hello ${site.brand}, I'm interested in the "${p.name}" package. Is my date available?`)}
                          target="_blank"
                          rel="noopener"
                        >
                          Ask on WhatsApp<span className="visually-hidden"> about {p.name}</span>
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <section className="rate-cat" aria-labelledby="addons-title">
            <div className="rate-cat__head">
              <h2 id="addons-title" className="h2">Extras</h2>
              <p>Add to any package.</p>
            </div>
            <ul className="menu">
              {addOns.map((a) => (
                <li className="menu__item" key={a.id}>
                  <div className="menu__row">
                    <h3 className="menu__name">{a.name}</h3>
                    <span className="leader" aria-hidden="true" />
                    <div className="menu__price">
                      <span className="price">{a.price === null ? "At cost" : <><span className="cur">+₦</span>{formatNumber(a.price)}</>}</span>
                    </div>
                  </div>
                  <p className="menu__includes">{a.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section id="estimate" className="section stage" aria-labelledby="estimate-title">
        <div className="wrap">
          <div className="split-head" data-reveal>
            <div style={{ display: "grid", gap: 16 }}>
              <p className="eyebrow">Estimate builder</p>
              <h2 id="estimate-title" className="h2">Build your <em>quote.</em></h2>
            </div>
            <p className="lead">Choose a package and extras. Send the estimate on WhatsApp and Tosin will confirm availability and the final price.</p>
          </div>
          <div data-reveal="2">
            <Estimator />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="terms-title">
        <div className="wrap faq-layout">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Good to know</p>
            <h2 id="terms-title" className="h2">Booking <em>terms.</em></h2>
            {ratesAreSamples && <p className="small muted">Sample terms, to be confirmed by Tosin.</p>}
          </div>
          <div style={{ display: "grid", gap: 48 }} data-reveal="2">
            <ol className="terms">
              {terms.map((t) => <li key={t}>{t}</li>)}
            </ol>
            <Faq items={rateFaq} />
            <div className="cta-band stage">
              <div style={{ display: "grid", gap: 10 }}>
                <h3 className="h3">Got a date in mind?</h3>
                <p>December dates in Lagos go early &mdash; ask sooner rather than later.</p>
              </div>
              <div className="btn-row">
                <Link className="btn" href="/booking/">Hold the date</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
