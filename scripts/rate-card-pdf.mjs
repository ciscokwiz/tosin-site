// Prints the rate card on the website as a PDF, styled like the "Run of
// Show" programme card: paper, gold rule, the fila & tux mark, dotted leaders.
// Run with:  npm run ratecard   → public/rate-card.pdf
// Prices, extras and terms come straight from data/rates.ts, so the PDF
// always matches the Rates page. Needs Playwright's Chromium
// (once: npx playwright install chromium), or point CHROMIUM_PATH at any
// Chrome / Chromium already on the machine.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const ROOT = process.cwd();
const require = createRequire(path.join(ROOT, "package.json"));
const ts = require("typescript");

// load a data/*.ts file without a build step
function loadTs(file) {
  const src = fs.readFileSync(path.join(ROOT, file), "utf8");
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const mod = { exports: {} };
  new Function("module", "exports", "require", js)(mod, mod.exports, () => ({}));
  return mod.exports;
}
const { packages, addOns, rateCategories, terms, ratesAreSamples } = loadTs("data/rates.ts");
const { site } = loadTs("data/site.ts");

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const naira = (n) => (n === null ? "On request" : `₦${new Intl.NumberFormat("en-NG").format(n)}`);
const font = (p) => pathToFileURL(path.join(ROOT, "node_modules/@fontsource-variable", p)).href;
const mark = fs.readFileSync(path.join(ROOT, "public/mark.svg"), "utf8").replace(/<title>[\s\S]*?<\/title>/, "");

const row = (name, price, sub) => `
  <li>
    <div class="row"><span class="item">${esc(name)}</span><span class="leader"></span><span class="price">${esc(price)}</span></div>
    ${sub ? `<p>${esc(sub)}</p>` : ""}
  </li>`;

const categories = rateCategories
  .map((c) => {
    const list = packages.filter((p) => p.category === c.id);
    if (!list.length) return "";
    return `<section class="cat">
      <h2>${esc(c.label)}</h2>
      <ul>${list.map((p) => row(p.name, p.price === null ? "On request" : naira(p.price), `${p.per} · ${p.summary}`)).join("")}</ul>
    </section>`;
  })
  .join("");

// two short lines: how to reach him, then where to see more
const contactLines = [
  [`WhatsApp / call ${esc(site.contact.phoneDisplay)}`, esc(site.contact.email)],
  [esc(site.url.replace(/^https?:\/\//, "")), site.social.instagram ? `Instagram @${esc(site.social.instagram.replace(/\/$/, "").split("/").pop())}` : ""].filter(Boolean),
];

const page = (inner, n) => `<div class="page"><div class="frame">${inner}<p class="folio">${n} / 2</p></div></div>`;

const html = `<!doctype html><html lang="en-NG"><head><meta charset="utf-8"><title>${esc(site.brand)} — Rate Card</title>
<style>
@font-face { font-family: "Jakarta"; src: url(${font("plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2")}) format("woff2"); font-weight: 200 800; }
@font-face { font-family: "Jakarta"; font-style: italic; src: url(${font("plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-italic.woff2")}) format("woff2"); font-weight: 200 800; }
@font-face { font-family: "Inter"; src: url(${font("inter/files/inter-latin-wght-normal.woff2")}) format("woff2"); font-weight: 100 900; }
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "Inter", sans-serif; color: #3d3350; background: #fbf9fd; }
.page { width: 210mm; height: 297mm; padding: 10mm; page-break-after: always; background: #fbf9fd; }
.page:last-child { page-break-after: auto; }
/* the programme card's gold rule, doubled for print */
.frame { position: relative; height: 100%; border: 1px solid rgba(201,160,74,.75); outline: 1px solid rgba(201,160,74,.35); outline-offset: 3px; padding: 14mm 15mm 12mm; display: flex; flex-direction: column; }
.head { display: grid; justify-items: center; text-align: center; gap: 2.2mm; margin-bottom: 8mm; }
.head svg { height: 30mm; width: auto; }
.kicker { font-size: 8.5pt; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: #7a5a14; }
h1 { font-family: "Jakarta"; font-weight: 800; font-size: 34pt; letter-spacing: -.04em; line-height: 1; color: #1a1226; }
.byline { font-size: 9.5pt; color: #6a5f7c; }
.cat { margin-top: 5.5mm; }
.cat:first-of-type { margin-top: 0; }
h2 { font-size: 8.5pt; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #7a5a14; padding-bottom: 1.6mm; margin-bottom: 2mm; border-bottom: .6pt solid rgba(201,160,74,.55); }
ul, ol { list-style: none; display: grid; gap: 2.6mm; }
.row { display: flex; align-items: baseline; gap: 2.5mm; }
.item { font-family: "Jakarta"; font-weight: 700; font-size: 11.5pt; letter-spacing: -.015em; color: #1a1226; }
.leader { flex: 1; min-width: 8mm; border-bottom: 1.2pt dotted #3d3350; opacity: .4; transform: translateY(-1mm); }
.price { font-family: "Jakarta"; font-weight: 800; font-size: 11.5pt; color: #412d63; white-space: nowrap; font-variant-numeric: tabular-nums; }
li p { font-size: 8.8pt; line-height: 1.45; color: #5a4f6c; margin-top: .6mm; }
ol { counter-reset: t; gap: 2.4mm; }
ol li { display: grid; grid-template-columns: 8mm 1fr; font-size: 9.6pt; line-height: 1.5; color: #3d3350; }
ol li::before { counter-increment: t; content: counter(t, decimal-leading-zero); color: #7a5a14; font-weight: 700; }
.spacer { flex: 1; }
.contact { display: grid; justify-items: center; gap: 2mm; text-align: center; padding-top: 6mm; border-top: .6pt solid rgba(201,160,74,.55); }
.contact .cta { font-family: "Jakarta"; font-weight: 800; font-size: 15pt; letter-spacing: -.03em; color: #1a1226; }
.contact .cta em { font-style: italic; font-weight: 700; color: #7a5a14; margin-left: .14em; }
.contact p { font-size: 9.5pt; color: #3d3350; }
.contact p span { white-space: nowrap; }
.contact p span + span::before { content: "·"; margin: 0 2.4mm; color: #c9a04a; }
.foot { margin-top: 4mm; text-align: center; font-style: italic; font-size: 8.5pt; color: #6a5f7c; }
.folio { position: absolute; right: 6mm; bottom: 4mm; font-size: 7.5pt; color: #9a90aa; }
</style></head><body>
${page(`
  <header class="head">
    ${mark}
    <p class="kicker">The Corporate Emcee presents</p>
    <h1>Rate Card</h1>
    <p class="byline">${esc(site.person)} · Master of Ceremonies · ${esc(site.city)} · ${esc(site.bookingSeason.replace(/^Now booking\s*/i, ""))}</p>
  </header>
  ${categories}
  <div class="spacer"></div>
  <p class="foot">Starting prices for hosting in ${esc(site.city)}.${ratesAreSamples ? " Sample rates, to be confirmed." : ""} Your quote is confirmed on WhatsApp.</p>
`, 1)}
${page(`
  <section class="cat">
    <h2>Extras</h2>
    <ul>${addOns.map((a) => row(a.name, a.price === null ? "At cost" : `+${naira(a.price)}`, a.note)).join("")}</ul>
  </section>
  <section class="cat" style="margin-top:9mm">
    <h2>Booking terms</h2>
    <ol>${terms.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>
  </section>
  <div class="spacer"></div>
  <footer class="contact">
    ${mark.replace("<svg ", '<svg style="height:16mm;width:auto" ')}
    <p class="cta">Let&rsquo;s hold <em>your date.</em></p>
    ${contactLines.map((l) => `<p>${l.map((c) => `<span>${c}</span>`).join("")}</p>`).join("")}
  </footer>
  <p class="foot">Programme subject to the MC&rsquo;s discretion.</p>
`, 2)}
</body></html>`;

const tmp = path.join(ROOT, ".rate-card.html");
fs.writeFileSync(tmp, html);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
try {
  const p = await browser.newPage();
  await p.goto(pathToFileURL(tmp).href);
  await p.evaluate(() => document.fonts.ready);
  const out = path.join(ROOT, "public/rate-card.pdf");
  await p.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
  if (process.argv.includes("--png")) {
    await p.setViewportSize({ width: 794, height: 1123 });
    await p.screenshot({ path: path.join(ROOT, ".rate-card.png"), fullPage: true });
  }
  console.log(`${path.relative(ROOT, out)}  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
} finally {
  await browser.close();
  fs.rmSync(tmp, { force: true });
}
