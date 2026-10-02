import Link from "next/link";
import { site } from "@/data/site";
import { process as steps } from "@/data/process";
import { faq } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { whatsappLink } from "@/lib/format";
import { faqLd } from "@/lib/seo";
import { Portrait } from "@/components/Portrait";
import { Clients } from "@/components/Clients";
import { RangeSwitcher } from "@/components/RangeSwitcher";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/Icons";

export default function Home() {
  const [events, countries, satisfaction] = site.stats;

  return (
    <>
      <JsonLd data={faqLd(faq)} />

      {/* ---------------- HERO ---------------- */}
      <section className="hero stage" aria-labelledby="hero-title">
        <div className="wrap hero__grid">
          <div className="hero__copy hero-in">
            <p className="status"><i aria-hidden="true" /> {site.bookingSeason} &middot; {site.city}</p>
            <h1 id="hero-title">
              <span className="hero__who">{site.person} &mdash; Event Host &amp; MC, {site.city}</span>
              <span className="h-display">The Corporate <em>Emcee</em></span>
            </h1>
            <p className="hero__bio lead">{site.bio}</p>
            <div className="btn-row">
              <Link href="/booking/" className="btn">Check your date</Link>
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
          <div className="hero-in">
            <Portrait src={site.images.hero || undefined} alt={site.images.heroAlt} priority>
              <div className="portrait__badge">
                <b className="num">{events.value}{events.suffix}</b>
                <span>{events.label.toLowerCase()}</span>
              </div>
            </Portrait>
          </div>
        </div>
      </section>

      <Clients />

      {/* ---------------- STATS BENTO ---------------- */}
      <section className="section" aria-labelledby="proof-title">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <p className="eyebrow">The numbers behind the mic</p>
            <h2 id="proof-title" className="h2">A safe pair of hands for <em>the</em> room that matters.</h2>
          </div>
          <div className="bento">
            {[events, countries, satisfaction].map((s, i) => (
              <div className="tile" key={s.label} data-reveal={String(i + 1)}>
                <p className="tile__num"><span data-count={s.value}>{s.value}</span><sup>{s.suffix}</sup></p>
                <p className="tile__label">{s.label}</p>
              </div>
            ))}
            <div className="tile tile--wide" data-reveal="4">
              <h3 className="h4">More than charisma.</h3>
              <ul className="creds">
                <li><b>Degree</b><span>Psychology, Obafemi Awolowo University (OAU)</span></li>
                <li><b>Trained</b><span>Emotional intelligence</span></li>
                <li><b>Trained</b><span>Product management</span></li>
                <li><b>Known as</b><span>&ldquo;{site.nickname}&rdquo;</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- RANGE MASTER ---------------- */}
      <section className="section section--surface" aria-labelledby="range-title">
        <div className="wrap">
          <div className="split-head" data-reveal>
            <div style={{ display: "grid", gap: 16 }}>
              <p className="eyebrow">{site.nickname}</p>
              <h2 id="range-title" className="h2">From the summit stage to the <em>dance</em> floor.</h2>
            </div>
            <p className="lead">
              The nickname comes from range: the same host moderates a high-level summit on Thursday and
              energises a student crowd on Saturday &mdash; with versatility and finesse at both.
            </p>
          </div>
          <div data-reveal="2">
            <RangeSwitcher />
          </div>
        </div>
      </section>

      {/* ---------------- WHY A PSYCHOLOGIST ---------------- */}
      <section className="section" aria-labelledby="why-title">
        <div className="wrap feature">
          <div data-reveal>
            <Portrait src={site.images.about || undefined} alt={site.images.aboutAlt} />
          </div>
          <div style={{ display: "grid", gap: 32 }}>
            <div className="section-head" style={{ marginBottom: 0 }} data-reveal>
              <p className="eyebrow">Why it works</p>
              <h2 id="why-title" className="h2">A psychologist <em>holds</em> the mic.</h2>
              <p>
                Hosting is applied psychology: reading two hundred faces at once and deciding, in real time,
                whether the room needs energy, calm or a laugh.
              </p>
            </div>
            <div className="pillars" data-reveal="2">
              <div className="pillar">
                <h3 className="h4">Reads the room</h3>
                <p>Emotional-intelligence training means he notices the restless back row before your MD does &mdash; and adjusts.</p>
              </div>
              <div className="pillar">
                <h3 className="h4">Runs the clock</h3>
                <p>Product-management discipline turns your run-of-show into a plan with owners, cues and buffers. Sessions start and end when you said they would.</p>
              </div>
              <div className="pillar">
                <h3 className="h4">Carries the message</h3>
                <p>Your key messages, sponsors and VIPs land the way you briefed them. The event is about your brand, not the host.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- RUN OF SHOW ---------------- */}
      <section className="section stage" aria-labelledby="process-title">
        <div className="wrap">
          <div className="split-head" data-reveal>
            <div style={{ display: "grid", gap: 16 }}>
              <p className="eyebrow">Run of show</p>
              <h2 id="process-title" className="h2">How a booking <em>runs.</em></h2>
            </div>
            <p className="lead">No surprises on the night. Here is the programme from first message to final applause.</p>
          </div>
          <ol className="programme">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal={String((i % 3) + 1)}>
                <time className="num">{s.time}</time>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="btn-row" style={{ marginTop: 40 }} data-reveal>
            <Link href="/booking/" className="btn">Start with an enquiry</Link>
            <Link href="/rates/" className="btn btn--ghost">See the rate card</Link>
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS (only when real ones exist) ---------------- */}
      {testimonials.length > 0 && (
        <section className="section" aria-labelledby="quotes-title">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <p className="eyebrow">Kind words</p>
              <h2 id="quotes-title" className="h2">From the people who <em>booked</em> him.</h2>
            </div>
            <div className="quotes">
              {testimonials.map((t, i) => (
                <figure className="quote" key={t.name + i} data-reveal={String((i % 2) + 1)}>
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
        <div className="wrap faq-layout">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Questions</p>
            <h2 id="faq-title" className="h2">Before you <em>book.</em></h2>
            <p>Still unsure? Ask on WhatsApp &mdash; it&rsquo;s the fastest way to reach Tosin.</p>
          </div>
          <div data-reveal="2">
            <Faq items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
