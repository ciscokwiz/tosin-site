// Turns the originals in /assets into web-sized WebP files in /public/images.
// Run with:  npm run images
// Each photo gets a small (800px) and a large (1600px) version; a source
// smaller than that is never upscaled. Full-screen photos listed in XL also
// get a 2400px version (phones show a landscape hero ~3.5x wider than the
// screen). Originals in /assets are untouched.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets";
const OUT = "public/images";
const WIDTHS = [800, 1600];
const XL = new Set(["hero1"]); // names (no extension) that also get -2400

fs.mkdirSync(OUT, { recursive: true });
for (const file of fs.readdirSync(SRC)) {
  if (!/\.(jpe?g|png|webp|heic|tiff?)$/i.test(file)) continue;
  const name = path.parse(file).name;
  const img = sharp(path.join(SRC, file)).rotate();
  const { width = 0 } = await img.metadata();
  const xl = XL.has(name);
  for (const w of xl ? [...WIDTHS, 2400] : WIDTHS) {
    const target = Math.min(w, width);
    const out = path.join(OUT, `${name}-${w}.webp`);
    // the hero is the first thing anyone sees: a touch more quality and a
    // light sharpen after downscaling keep it crisp on high-density screens
    let pipe = img.clone().resize({ width: target, withoutEnlargement: true, kernel: "lanczos3" });
    if (xl) pipe = pipe.sharpen({ sigma: 0.6 });
    await pipe.webp({ quality: xl ? 84 : 78, smartSubsample: xl }).toFile(out);
    console.log(`${out}  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
  }
}
