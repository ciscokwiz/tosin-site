import Link from "next/link";
import { site } from "@/data/site";
import { heroPhoto } from "@/data/photos";
import { whatsappLink } from "@/lib/format";
import { Photo } from "./Photo";
import { WhatsAppIcon } from "./Icons";

/* The hero is the photo: Tosin facing a full hall. Exactly one screen tall. */
export function Hero() {
  return (
    <section className="hero stage" aria-labelledby="hero-title">
      <div className="hero__media">
        <Photo photo={heroPhoto} sizes="100vw" priority className="hero__img" />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="wrap hero__inner">
        <div className="hero__copy hero-in">
          <p className="status"><i aria-hidden="true" /> {site.bookingSeason} &middot; {site.city}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__who">{site.person}</span>
            The Corporate <em>Emcee</em>
          </h1>
          <p className="hero__lede">
            Event host &amp; MC for corporate galas, conferences, launches, award nights and weddings &mdash;
            in Lagos and beyond.
          </p>
          <div className="btn-row">
            <Link href="/booking/" className="btn" data-magnetic>Check your date</Link>
            <a className="btn btn--ghost" href={whatsappLink(`Hello ${site.brand}, I'd like to check your availability.`)} target="_blank" rel="noopener">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
        <dl className="hero__stats hero-in">
          {site.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd className="num"><span data-count={s.value}>{s.value}</span><span className="suffix">{s.suffix}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
