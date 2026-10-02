import Link from "next/link";
import { nav, site } from "@/data/site";
import { telLink, whatsappLink } from "@/lib/format";
import { Mark } from "./Mark";
import { LagosClock } from "./LagosClock";
import { InstagramIcon, LinkedInIcon, TikTokIcon, WhatsAppIcon, YouTubeIcon } from "./Icons";

/* One statement, one button, one tidy row of links. */
export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { href: whatsappLink(), label: "WhatsApp", icon: <WhatsAppIcon /> },
    { href: site.social.instagram, label: "Instagram", icon: <InstagramIcon /> },
    { href: site.social.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
    { href: site.social.youtube, label: "YouTube", icon: <YouTubeIcon /> },
    { href: site.social.tiktok, label: "TikTok", icon: <TikTokIcon /> },
  ].filter((s) => s.href);

  return (
    <footer className="footer stage" aria-labelledby="footer-title">
      <div className="wrap footer__cta" data-depth>
        <h2 id="footer-title" className="footer__title">
          Let&rsquo;s make your event <em>one to remember.</em>
        </h2>
        <Link href="/booking/" className="btn" data-magnetic>Book Tosin</Link>
      </div>

      <div className="wrap">
        <div className="footer__bar">
          <Link href="/" className="footer__brand" aria-label={`${site.brand} — home`}>
            <Mark className="footer__mark" />
            <span>
              <strong>{site.brand}</strong>
              <small>MC &amp; event host, {site.city}</small>
            </span>
          </Link>
          <nav aria-label="Footer" className="footer__links">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>
          <div className="footer__contact">
            <a href={telLink}>{site.contact.phoneDisplay}</a>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
          <div className="socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={`${site.brand} on ${s.label}`}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__base">
          <span>&copy; {year} {site.brand} &middot; {site.person}</span>
          <LagosClock />
        </div>
      </div>
    </footer>
  );
}
