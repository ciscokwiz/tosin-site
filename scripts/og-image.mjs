// Draws the link-preview image (public/og.png, 1200 × 630) that WhatsApp,
// LinkedIn and X show when someone shares the site. Name, city, stats and web
// address come from data/site.ts, so re-run after changing them:
//   npm run og
// Needs Playwright's Chromium, or CHROMIUM_PATH pointing at an installed Chrome.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const ROOT = process.cwd();
const require = createRequire(path.join(ROOT, "package.json"));
const ts = require("typescript");
function loadTs(file) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", "require", js)(mod, mod.exports, () => ({}));
  return mod.exports;
}
const { site } = loadTs("data/site.ts");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const font = (p) => pathToFileURL(path.join(ROOT, "node_modules/@fontsource-variable", p)).href;
const mark = fs.readFileSync(path.join(ROOT, "public/mark.svg"), "utf8").replace(/<title>[\s\S]*?<\/title>/, "");

// "The Corporate MC" → "The Corporate" + gold italic "MC"
const words = site.brand.split(" ");
const last = words.pop();
const events = site.stats.find((s) => /event/i.test(s.label));
const footer = [events && `${events.value.toLocaleString("en-NG")}${events.suffix} events hosted`, `${site.city} & beyond`, site.url.replace(/^https?:\/\//, "")].filter(Boolean);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Jakarta"; src: url(${font("plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2")}) format("woff2"); font-weight: 200 800; }
@font-face { font-family: "Jakarta"; font-style: italic; src: url(${font("plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-italic.woff2")}) format("woff2"); font-weight: 200 800; }
@font-face { font-family: "Inter"; src: url(${font("inter/files/inter-latin-wght-normal.woff2")}) format("woff2"); font-weight: 100 900; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: "Inter", sans-serif; color: #f3eef8;
  background: radial-gradient(70% 90% at 82% 18%, rgba(216,178,92,.22), transparent 60%), radial-gradient(60% 80% at 10% 100%, rgba(150,70,210,.28), transparent 65%), #412d63; }
.c { position: absolute; left: 72px; top: 72px; bottom: 60px; width: 700px; display: flex; flex-direction: column; }
.k { display: flex; align-items: center; gap: 16px; font-size: 20px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: #d8b25c; }
.k::before { content: ""; width: 44px; height: 2px; background: #d8b25c; }
h1 { margin-top: 30px; font-family: "Jakarta"; font-weight: 800; font-size: 108px; line-height: .98; letter-spacing: -.045em; }
h1 em { display: block; font-style: italic; font-weight: 700; color: #d8b25c; }
p { margin-top: 30px; font-size: 27px; line-height: 1.45; color: #d9cfe8; max-width: 640px; }
.f { margin-top: auto; font-size: 21px; color: #b8a9cf; }
.f span + span::before { content: "·"; margin: 0 12px; color: #d8b25c; }
.m { position: absolute; right: 70px; top: 50%; transform: translateY(-50%); height: 520px; filter: drop-shadow(0 30px 50px rgba(17,11,26,.55)); }
.m svg { height: 100%; width: auto; }
</style></head><body>
<div class="c">
  <div class="k">${esc(site.person)} · Master of Ceremonies</div>
  <h1>${esc(words.join(" "))} <em>${esc(last)}</em></h1>
  <p>One host for every room: conferences, galas, launches, award nights, weddings and celebrations.</p>
  <div class="f">${footer.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
</div>
<div class="m">${mark}</div>
</body></html>`;

const tmp = path.join(ROOT, ".og.html");
fs.writeFileSync(tmp, html);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
try {
  const p = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto(pathToFileURL(tmp).href);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(ROOT, "public/og.png") });
  console.log("public/og.png  1200×630");
} finally {
  await browser.close();
  fs.rmSync(tmp, { force: true });
}
