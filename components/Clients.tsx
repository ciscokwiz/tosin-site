import fs from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

/* Credibility band directly under the hero: each brand's logo in its own
   colours, with the name beside it. MotionEngine speeds the band up with
   scroll.

   Logos live in /public/logos, named after the brand in lowercase with
   dashes: "Coca-Cola" → coca-cola.svg, "Alat by WEMA" → alat-by-wema.png.
   SVG, PNG or WebP all work. A brand with no file yet shows its name only,
   so nobody's logo is ever made up. Only use a logo the brand has approved. */
const LOGO_DIR = path.join(process.cwd(), "public", "logos");
const EXTENSIONS = [".svg", ".png", ".webp"];

function slug(name: string) {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function logoFor(name: string): string | null {
  for (const ext of EXTENSIONS) {
    const file = `${slug(name)}${ext}`;
    if (fs.existsSync(path.join(LOGO_DIR, file))) return `/logos/${file}`;
  }
  return null;
}

export function Clients() {
  const brands = site.clients.map((name) => ({ name, logo: logoFor(name) }));
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {brands.map((b) => (
        <li key={b.name} className={b.logo ? "has-logo" : undefined}>
          {/* the name follows, so the logo itself is decorative */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {b.logo && <img src={b.logo} alt="" width={28} height={28} loading="lazy" decoding="async" />}
          <span>{b.name}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section className="clients" aria-labelledby="clients-title">
      <h2 id="clients-title" className="clients__label">Trusted by</h2>
      <div className="clients__fade">
        <div className="marquee" data-marquee>
          {row()}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
