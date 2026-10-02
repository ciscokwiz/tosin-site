import Link from "next/link";
import { nav, site } from "@/data/site";
import { telLink, whatsappLink } from "@/lib/format";
import { Mark } from "./Mark";
import { LagosClock } from "./LagosClock";
import { InstagramIcon, LinkedInIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "./Icons";

/* "Closing Remarks" — the footer is the emcee's sign-off:
   a wrap line, the site as an Order of Proceedings, a vote of thanks
   (contact), and the name set edge to edge. */
export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { href: site.social.instagram, label: "Instagram", icon: <InstagramIcon /> },
    { href: site.social.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
    { href: site.social.youtube, label: "YouTube", icon: <YouTubeIcon /> },
    { href: site.social.tiktok, label: "TikTok", icon: <TikTokIcon /> },
  ].filter((s) => s.href);

  return (
    <footer className="footer stage" aria-labelledby="footer-title">
      <div className="wrap">
        <figure className="footer__figure" aria-hidden="true">
          <Mark />
        </figure>
        <div className="footer__wrap-head">
          <div className="footer__headline">
            <p className="eyebrow">Closing remarks</p>
            <h2 id="footer-title">
              And that&rsquo;s a <em>wrap.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gap: 24 }}>
            <p>
              Thank you for your time. If your event deserves a host who has read the programme
              before he picks up the mic, the floor is yours.
            </p>
            <div className="btn-row">
              <Link href="/booking/" className="btn">Check availability</Link>
              <a
                className="btn btn--ghost"
                href={whatsappLink(`Hello ${site.brand}, I'd like to check your availability.`)}
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer__grid">
          <section className="order" aria-labelledby="order-title">
            <div className="order__head">
              <h3 id="order-title">Order of Proceedings</h3>
              <span className="small muted">Tonight&rsquo;s programme</span>
            </div>
            <ol>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <time className="num">{item.time}</time>
                    <strong>{item.label}</strong>
                    <span className="leader" />
                    <small>{item.programme}</small>
                  </Link>
                </li>
              ))}
              <li>
                <a href="#vote-of-thanks">
                  <time className="num">21:45</time>
                  <strong>Vote of thanks</strong>
                  <span className="leader" />
                  <small>Contact &amp; socials</small>
                </a>
              </li>
            </ol>
          </section>

          <section className="contact-card" id="vote-of-thanks" aria-labelledby="vot-title">
            <h3 id="vot-title">Vote of thanks</h3>
            <dl>
              <div>
                <dt>WhatsApp &amp; calls</dt>
                <dd><a href={telLink}>{site.contact.phoneDisplay}</a></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{site.city}, {site.country} &middot; hosting worldwide</dd>
              </div>
              {site.social.instagram && (
                <div>
                  <dt>Instagram</dt>
                  <dd><a href={site.social.instagram} target="_blank" rel="noopener">@{site.social.instagram.replace(/\/$/, "").split("/").pop()}</a></dd>
                </div>
              )}
            </dl>
            <div className="btn-row">
              <a className="btn" href={whatsappLink()} target="_blank" rel="noopener"><WhatsAppIcon /> Message Tosin</a>
            </div>
          </section>
        </div>

        <div className="wordmark" aria-hidden="true">
          <svg viewBox="0 0 1200 132" preserveAspectRatio="xMidYMid meet">
            <text x="600" y="112" fontSize="138" textAnchor="middle" textLength="1196" lengthAdjust="spacing">
              The Corporate <tspan className="gold">Emcee</tspan>
            </text>
          </svg>
        </div>

        <div className="footer__base">
          <span>&copy; {year} {site.brand} &middot; {site.person}</span>
          <LagosClock />
          {socials.length > 0 && (
            <div className="socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={`${site.brand} on ${s.label}`}>
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
