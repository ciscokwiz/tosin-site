// Turns the originals in /assets into web-sized WebP files in /public/images.
// Run with:  npm run images
// Each photo gets a small (800px) and a large (1600px) version; a source
// smaller than that is never upscaled. Originals in /assets are untouched.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets";
const OUT = "public/images";
const WIDTHS = [800, 1600];

fs.mkdirSync(OUT, { recursive: true });
for (const file of fs.readdirSync(SRC)) {
  if (!/\.(jpe?g|png|webp|heic|tiff?)$/i.test(file)) continue;
  const name = path.parse(file).name;
  const img = sharp(path.join(SRC, file)).rotate();
  const { width = 0 } = await img.metadata();
  for (const w of WIDTHS) {
    const target = Math.min(w, width);
    const out = path.join(OUT, `${name}-${w}.webp`);
    await img.clone().resize({ width: target, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    console.log(`${out}  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
  }
}
