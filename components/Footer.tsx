import Link from "next/link";
import { nav, site } from "@/data/site";
import { telLink, whatsappLink } from "@/lib/format";
import { Mark } from "./Mark";
import { LagosClock } from "./LagosClock";
import { InstagramIcon, LinkedInIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "./Icons";

/* A short sign-off: who, one call to action, three tidy columns, the base line. */
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
      <div className="wrap footer__top">
        <div className="footer__brand">
          <Mark className="footer__mark" />
          <div>
            <h2 id="footer-title" className="footer__name">The Corporate <em>Emcee</em></h2>
            <p className="footer__tag">And that&rsquo;s a wrap. Thank you for your time.</p>
          </div>
        </div>
        <div className="btn-row">
          <Link href="/booking/" className="btn" data-magnetic>Check your date</Link>
          <a className="btn btn--ghost" href={whatsappLink(`Hello ${site.brand}, I'd like to check your availability.`)} target="_blank" rel="noopener">
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
      </div>

      <div className="wrap footer__cols">
        <nav aria-label="Footer">
          <h3>Pages</h3>
          <ul>
            {nav.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a href={telLink}>{site.contact.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li>{site.city}, {site.country} &middot; hosting worldwide</li>
          </ul>
        </div>
        {socials.length > 0 && (
          <div>
            <h3>Follow</h3>
            <div className="socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={`${site.brand} on ${s.label}`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="wrap">
        <div className="footer__base">
          <span>&copy; {year} {site.brand} &middot; {site.person}</span>
          <LagosClock />
        </div>
      </div>
    </footer>
  );
}
