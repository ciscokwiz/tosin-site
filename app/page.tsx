import Link from "next/link";
import { site } from "@/data/site";
import { faq } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { whatsappLink } from "@/lib/format";
import { faqLd } from "@/lib/seo";
import { Mark, FilaRule } from "@/components/Mark";
import { Clients } from "@/components/Clients";
import { Words } from "@/components/Words";
import { RangeRail } from "@/components/RangeRail";
import { Programme } from "@/components/Programme";
import { Gallery } from "@/components/Gallery";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/Icons";

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(faq)} />

      {/* ---------------- HERO: the cover ---------------- */}
      <section className="hero stage" aria-labelledby="hero-title">
        <div className="wrap hero__inner">
          <div className="hero__top hero-in">
            <p className="hero__who">
              {site.person}
              <span>Event host &amp; MC &middot; {site.city}</span>
            </p>
            <p className="status"><i aria-hidden="true" /> {site.bookingSeason}</p>
          </div>

          <div className="hero__stack">
            <h1 id="hero-title" className="hero__title">
              <span className="visually-hidden">{site.person}, </span>
              <span className="hero__the hero-in">The Corporate</span>
              <span className="hero__emcee hero-in"><em>Emcee</em></span>
            </h1>
            <figure className="hero__figure hero-in" data-magnetic-area>
              <Mark className="hero__mark" title="Tosin's signature: a fila above a tuxedo and bow tie" />
              <span className="hero__floor" aria-hidden="true" />
            </figure>
          </div>

          <div className="hero__foot hero-in">
            <div className="hero__intro">
              <p>Corporate galas, conferences, launches, award nights and weddings. Hosted on time and on brief, in Lagos and beyond.</p>
              <div className="btn-row">
                <Link href="/booking/" className="btn" data-magnetic>Check your date</Link>
                <a
                  className="btn btn--ghost"
                  href={whatsappLink(`Hello ${site.brand}, I'd like to check your availability.`)}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsAppIcon /> WhatsApp Tosin
                </a>
              </div>
            </div>
            <dl className="hero__stats">
              {site.stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd className="num"><span data-count={s.value}>{s.value}</span><span className="suffix">{s.suffix}</span></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Clients />

      {/* ---------------- MEET THE HOST ---------------- */}
      <section className="section manifesto" aria-labelledby="meet-title">
        <div className="wrap manifesto__grid">
          <h2 id="meet-title" className="eyebrow">Meet the host</h2>
          <Words
            className="manifesto__text"
            text={`${site.person} is a master communicator, event host and convener of *unforgettable moments.* A psychologist by training, he reads a room before he speaks to it, and brings more than charisma. He delivers *impact.*`}
          />
          <dl className="creds">
            <div><dt>Degree</dt><dd>Psychology, Obafemi Awolowo University</dd></div>
            <div><dt>Trained in</dt><dd>Emotional intelligence</dd></div>
            <div><dt>Trained in</dt><dd>Product management</dd></div>
            <div><dt>Known as</dt><dd>&ldquo;{site.nickname}&rdquo;</dd></div>
          </dl>
        </div>
      </section>

      <RangeRail />

      {/* ---------------- WHY A PSYCHOLOGIST ---------------- */}
      <section className="section why" aria-labelledby="why-title">
        <div className="wrap why__grid">
          <div className="why__head">
            <p className="eyebrow">Why it works</p>
            <h2 id="why-title" className="h2">A psychologist <em>holds</em> the mic.</h2>
            <p className="why__lede">
              Hosting is applied psychology: reading two hundred faces at once and deciding, in real time,
              whether the room needs energy, calm or a laugh.
            </p>
          </div>
          <div className="why__list">
            <article className="why__item">
              <h3 className="h3">Reads the room</h3>
              <p>Emotional-intelligence training means he notices the restless back row before your MD does, and adjusts.</p>
            </article>
            <article className="why__item">
              <h3 className="h3">Runs the clock</h3>
              <p>Product-management discipline turns your run-of-show into a plan with owners, cues and buffers. Sessions start and end when you said they would.</p>
            </article>
            <article className="why__item">
              <h3 className="h3">Carries the message</h3>
              <p>Your key messages, sponsors and VIPs land the way you briefed them. The event is about your brand, not the host.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ---------------- RUN OF SHOW ---------------- */}
      <section className="section stage show" aria-labelledby="show-title">
        <div className="wrap show__grid">
          <div className="show__head">
            <p className="eyebrow">From first message to final applause</p>
            <h2 id="show-title" className="h2">How a booking <em>runs.</em></h2>
            <p className="lead">No surprises on the night. Every booking follows the same programme, so your planner always knows what happens next.</p>
            <div className="btn-row">
              <Link href="/booking/" className="btn" data-magnetic>Start with an enquiry</Link>
              <Link href="/rates/" className="btn btn--ghost">See the rate card</Link>
            </div>
          </div>
          <Programme />
        </div>
      </section>

      <Gallery />

      {testimonials.length > 0 && (
        <section className="section" aria-labelledby="quotes-title">
          <div className="wrap">
            <div className="section-head">
              <p className="eyebrow">Kind words</p>
              <h2 id="quotes-title" className="h2">From the people who <em>booked</em> him.</h2>
            </div>
            <div className="quotes">
              {testimonials.map((t, i) => (
                <figure className="quote" key={t.name + i}>
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption>
                    <b>{t.name}</b>
                    {[t.role, t.org, t.event].filter(Boolean).join(" · ")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- FAQ ---------------- */}
      <section className="section" aria-labelledby="faq-title">
        <div className="wrap">
          <FilaRule />
          <div className="faq-layout">
            <div className="section-head">
              <p className="eyebrow">Questions</p>
              <h2 id="faq-title" className="h2">Before you <em>book.</em></h2>
              <p>Still unsure? Ask on WhatsApp. It&rsquo;s the fastest way to reach Tosin.</p>
            </div>
            <Faq items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
