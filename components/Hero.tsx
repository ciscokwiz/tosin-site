import Link from "next/link";
import { site } from "@/data/site";
import { heroPhoto } from "@/data/photos";
import { Photo } from "./Photo";

/* The hero is the photo: Tosin facing a full hall. Exactly one screen tall. */
export function Hero() {
  return (
    <section className="hero stage" aria-labelledby="hero-title" data-hero>
      <div className="hero__media">
        <Photo photo={heroPhoto} sizes="100vw" priority className="hero__img" />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="wrap hero__inner">
        <div className="hero__copy hero-in">
          <p className="hero__kicker">{site.brand} &middot; Corporate MC &amp; Event Host in {site.city}</p>
          <h1 id="hero-title" className="hero__title">
            Every room has a rhythm. <em>I know how to lead it.</em>
          </h1>
          <p className="hero__lede">
            From boardrooms to ballrooms, live stages to once-in-a-lifetime celebrations, I bring the presence,
            instinct and personality that make your event one to remember.
          </p>
          <div className="btn-row">
            <Link href="/booking/" className="btn" data-magnetic>Book</Link>
            <a href="#meet" className="btn btn--ghost">Explore my world</a>
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
