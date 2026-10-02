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
                <span aria-hidden="true">✎</span>
                <span><b>Sample rates.</b> These prices are placeholders for the new site and will be replaced with Tosin&rsquo;s confirmed rates.</span>
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
                <div className="rate-cat__head" data-reveal>
                  <h2 id={`${c.id}-title`} className="h2">{c.label}</h2>
                  <p>{c.blurb}</p>
                </div>
                <div className="rate-grid">
                  {list.map((p, i) => (
                    <article key={p.id} className={`rate${p.featured ? " rate--featured" : ""}`} data-reveal={String((i % 3) + 1)} aria-labelledby={`${p.id}-name`}>
                      <div className="rate__top">
                        <h3 id={`${p.id}-name`} className="h4">{p.name}</h3>
                        {p.featured && <span className="rate__ribbon">Most booked</span>}
                      </div>
                      <div className="rate__price">
                        {p.price === null ? (
                          <p className="price price--text">On request</p>
                        ) : (
                          <>
                            <span className="from">From</span>
                            <p className="price" aria-label={`From ${formatNaira(p.price)}`}>
                              <span className="cur">₦</span>{formatNumber(p.price)}
                            </p>
                          </>
                        )}
                        <span className="rate__per">{p.per}</span>
                        {ratesAreSamples && p.price !== null && <span className="badge-sample" style={{ width: "fit-content", marginTop: 6 }}>Sample rate</span>}
                      </div>
                      <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
                        <p className="rate__summary">{p.summary}</p>
                        <ul className="checks">
                          {p.includes.map((x) => <li key={x}>{x}</li>)}
                        </ul>
                      </div>
                      <div className="rate__actions">
                        <Link className="btn btn--sm" href={`/booking/?package=${p.id}`}>Book this</Link>
                        <a
                          className="btn btn--sm btn--ghost"
                          href={whatsappLink(`Hello ${site.brand}, I'm interested in the "${p.name}" package. Is my date available?`)}
                          target="_blank"
                          rel="noopener"
                          aria-label={`Ask about ${p.name} on WhatsApp`}
                        >
                          <WhatsAppIcon /> Ask
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}

          <section className="rate-cat" aria-labelledby="addons-title">
            <div className="rate-cat__head" data-reveal>
              <h2 id="addons-title" className="h2">Extras</h2>
              <p>Add to any package.</p>
            </div>
            <div className="addons" data-reveal>
              {addOns.map((a) => (
                <div className="addon" key={a.id}>
                  <b>{a.name}</b>
                  <span>{a.note}</span>
                  <span className="num">{a.price === null ? "At cost" : `+${formatNaira(a.price)}`}</span>
                </div>
              ))}
            </div>
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
            {ratesAreSamples && <span className="badge-sample" style={{ width: "fit-content" }}>Sample terms &middot; to be confirmed</span>}
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
