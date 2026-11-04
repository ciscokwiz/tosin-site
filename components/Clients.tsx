import fs from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

/* Credibility band directly under the hero: each brand's logo in its own
   colours, with the name beside it. MotionEngine speeds the band up with
   scroll.

   Logos live in /public/logos, named after the brand in lowercase with
   dashes: "Coca-Cola" → coca-cola.svg, "Alat by WEMA" → alat-by-wema.webp.
   SVG, WebP or PNG all work. A logo with dark ink that disappears on the
   dark theme can have a reversed twin beside it: cadbury.dark.webp.
   A brand with no file yet shows its name only, so nobody's logo is ever
   made up. Only use a logo the brand has approved. */
const LOGO_DIR = path.join(process.cwd(), "public", "logos");
const EXTENSIONS = [".svg", ".webp", ".png"];
const HEIGHT = 28; // matches the CSS display height, so nothing shifts on load

type Logo = { src: string; dark: string | null; width: number; height: number };

function slug(name: string) {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// intrinsic size from the file header (SVG viewBox, WebP or PNG)
function sizeOf(file: string): [number, number] | null {
  const buf = fs.readFileSync(file);
  if (file.endsWith(".svg")) {
    const vb = /viewBox="\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(buf.toString("utf8"));
    return vb ? [Number(vb[1]), Number(vb[2])] : null;
  }
  if (file.endsWith(".png")) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8X") return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
  if (chunk === "VP8L") {
    const b = buf.readUInt32LE(21);
    return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
  }
  if (chunk === "VP8 ") return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  return null;
}

function logoFor(name: string): Logo | null {
  for (const ext of EXTENSIONS) {
    const file = `${slug(name)}${ext}`;
    const full = path.join(LOGO_DIR, file);
    if (!fs.existsSync(full)) continue;
    const [w, h] = sizeOf(full) ?? [1, 1];
    const darkFile = `${slug(name)}.dark${ext}`;
    return {
      src: `/logos/${file}`,
      dark: fs.existsSync(path.join(LOGO_DIR, darkFile)) ? `/logos/${darkFile}` : null,
      width: Math.round((HEIGHT * w) / h),
      height: HEIGHT,
    };
  }
  return null;
}

export function Clients() {
  const brands = site.clients.map((name) => ({ name, logo: logoFor(name) }));
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {brands.map(({ name, logo }) => (
        <li key={name}>
          {/* the name follows, so the logo itself is decorative */}
          {logo && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className={logo.dark ? "logo-light" : undefined}
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
            />
          )}
          {logo?.dark && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className="logo-dark" src={logo.dark} alt="" width={logo.width} height={logo.height} loading="lazy" decoding="async" />
          )}
          <span>{name}</span>
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
