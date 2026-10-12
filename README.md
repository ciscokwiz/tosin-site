# The Corporate Emcee — website

The website for **The Corporate Emcee**: three pages (Home, Rates, Booking), built to turn visitors into WhatsApp enquiries.

- **Home** — hero, client names, stats, "The Range Master" event formats, why a psychologist holds the mic, how a booking runs, FAQ
- **Rates** — rate card by category, extras, an estimate builder that sends the quote to WhatsApp, booking terms
- **Booking** — an enquiry form that writes the WhatsApp/email message for the visitor, with a live "invitation" preview
- **Footer, "Closing Remarks"** — the MC's sign-off: an Order of Proceedings (the site menu as a programme), a Vote of Thanks (contact), and the name set edge to edge

The design reasoning is in [`DESIGN.md`](./DESIGN.md).

---

## Editing the content (no coding needed)

Everything you'd normally change lives in the **`data/`** folder. Open a file, change the words between the quotes, save.

| What to change | File |
|---|---|
| Phone, WhatsApp, email, Instagram, bio, stats, client names | `data/site.ts` |
| Event photos for the "On stage" gallery (hidden until added) | `data/gallery.ts` |
| Prices, packages, extras, booking terms | `data/rates.ts` |
| Event formats in "The Range Master" section | `data/range.ts` |
| Booking steps ("How a booking runs") | `data/process.ts` |
| Frequently asked questions | `data/faq.ts` |
| Hero photo and the three "Meet the host" photos | `data/photos.ts` |
| Video testimonials (YouTube links or MP4s) | `data/videos.ts` |

### Prices
In `data/rates.ts`, write prices as plain numbers with no commas: `price: 1500000` shows as **₦1,500,000**. For "price on request" write `price: null`.
**The current prices are samples.** When the real ones are in, set `ratesAreSamples = false` at the top of the file. That removes every "Sample rate" badge.

Three clauses are written once in `data/rates.ts`: payment upfront, call time and extra hosts (`paymentClause`, `callTimeClause`, `extraHostClause`). They appear in the booking terms and inside every estimate and booking message sent from the site, so editing them there updates every copy. There is deliberately no co-host extra, because additional hosts are always quoted separately.

### Link-preview image
`public/og.png` is the picture WhatsApp, LinkedIn and X show when someone shares the site. After changing the name, city, stats or web address in `data/site.ts`, run `npm run og` to redraw it. Like the rate card, it needs Playwright's Chromium, or `CHROMIUM_PATH` set to an installed Chrome.

### PDF rate card
`public/rate-card.pdf` is a two-page A4 rate card in the style of the "Run of Show" card. It lists every package, the extras, the booking terms and the contact details, all taken from `data/rates.ts` and `data/site.ts`. After changing prices or terms, run `npm run ratecard` to rebuild it. It always fits on two pages: categories flow onto page 2 and the type shrinks a little if needed. If it ever can't fit, the command stops and says which text to shorten. This needs Playwright's Chromium (`npx playwright install chromium` once), or set `CHROMIUM_PATH` to an installed Chrome.

### The fila & tuxedo mark
Tosin's mark lives in `brand/thecorporatemc-tux-mark.svg`. The site uses it in eleven places: logo, loader, page transitions, hero, client band, Range rail, programme card, booking invitation, theme toggle, footer and favicon. `DESIGN.md` lists them all.

If the artwork changes:
1. Replace `brand/thecorporatemc-tux-mark.svg` and `public/mark.svg`.
2. Regenerate `components/MarkSprite.tsx` from it, or ask a developer to. Each part (fila, lapels, bow tie, studs) is a separate group so it can be recoloured and animated.
3. Update the browser-tab icons `app/icon.svg` and `app/apple-icon.png`, and the share image `public/og.png`.

### Photos
1. Put the original photo in `assets/`. Any size of JPG or PNG is fine.
2. Run `npm run images`. This writes web-sized copies to `public/images/` (`<name>-800.webp` and `<name>-1600.webp`, plus `-2400.webp` for the hero).
3. In `data/photos.ts`, point the hero or a "Meet the host" slot at `"/images/<name>"`. Set `focus` to keep his face in frame when the photo is cropped.

The original hero photo was only 1280px wide. `assets/hero1.jpg` is now a 2560px version made with an AI super-resolution model (EDSR), which looks noticeably sharper on phones and Retina screens. A larger original from the photographer would still be better: drop it in as `assets/hero1.jpg` and run `npm run images`.

The "On stage" gallery (`data/gallery.ts`) stays hidden until you add photos to it.

### Video testimonials
`data/videos.ts` holds the two real clips (`public/videos/testimony-1.mp4` and `testimony-2.mp4`). Their captions are placeholders ("From the guest list", "From the stage"): add each guest's name, role and a one-line quote once they have given permission.

To add another clip, convert it to a web MP4 first. Phone `.mov` files are large and often use a variable frame rate that stutters on the web. This is the treatment used for the current two (it needs ffmpeg):

```bash
ffmpeg -i input.mov \
  -vf "fps=30,hqdn3d=1.5:1.5:4:4,scale=-2:960:flags=lanczos,cas=0.45,eq=contrast=1.03:saturation=1.06,format=yuv420p" \
  -af "highpass=f=80,lowpass=f=14000,afftdn=nf=-38:nr=10:tn=1,acompressor=threshold=-22dB:ratio=2.5:attack=8:release=220:makeup=2,loudnorm=I=-16:TP=-1.5:LRA=9" \
  -c:v libx264 -preset slower -crf 23 -c:a aac -b:a 112k -movflags +faststart public/videos/name.mp4
```

Then save a still as `assets/name.jpg`, run `npm run images`, and add an entry with `file`, `poster`, `ratio` (the width / height) and `duration`. The page loads no video until someone presses play.

---

## Running it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install        # once
npm run dev        # opens a live preview at http://localhost:3000
```

## Publishing it

The site is hosted on Vercel (the free Hobby plan is enough). Every page is pre-rendered; the only server code is the booking log (`app/api/booking`), which needs Vercel or another host that runs Next.js, so a plain file upload to cPanel no longer works.

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com), choose **Add New → Project**, and import the repository. Accept the defaults and click **Deploy**.
3. Under **Settings → Domains**, add `thecorporatemcee.com` and follow the DNS instructions.
4. Under **Settings → Environment Variables**, add the two Notion values below, then redeploy.

### Booking log in Notion
Every enquiry sent from the booking page is also added as a row in a Notion database, so none get lost in WhatsApp. The visitor's WhatsApp or email message still goes out exactly as before, and if Notion is unreachable or not set up the form works as normal.

1. In Notion, open **Settings → Connections → Develop or manage integrations**, create an internal integration for the workspace, and copy its secret.
2. Open the bookings database, choose **⋯ → Connections**, and add that integration.
3. Copy the database ID: the 32-character code in the database's link, before `?v=`.
4. Add both to Vercel (step 4 above) as `NOTION_API_KEY` and `NOTION_BOOKINGS_DATABASE_ID`.

The visitor's name goes in the database's title column. Other details go into any column with a matching name and type: Phone, Email, Package (or Event type), Event, Date, Venue, Guests, Budget, Notes, Price and Channel; the full list of accepted names is `COLUMNS` in `app/api/booking/route.ts`. Missing columns are fine, because every detail is also written into the page itself. If the database has a **Status** column (status or select type), every new enquiry is set to **New Inquiry**, so that option must exist with exactly that spelling (it is `NEW_STATUS` in the same file).

**Security headers.** These are set by `vercel.json` (Vercel) and `public/_headers` (Netlify and Cloudflare Pages); keep the two in step:
- a Content Security Policy that allows only the site's own files plus the YouTube player
- HTTPS-only (HSTS)
- no framing by other sites
- no camera, microphone or location access
- a one-week cache for photos and videos

On cPanel or another host, ask for the same headers to be added in the server settings.

If the domain ever changes, update `url` in `data/site.ts` so Google and link previews point to the right place.

### Optional environment variables
| Name | What it does |
|---|---|
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console verification code |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster verification code |
| `NOTION_API_KEY` | Notion integration secret for the booking log |
| `NOTION_BOOKINGS_DATABASE_ID` | The Notion bookings database the integration can write to |

---

## After launch: search engines (off-page work)

The site handles the technical side: page titles written the way people search ("MC in Lagos"), descriptions, a sitemap, FAQ data, and person and service data for Google. Nobody can guarantee a ranking. These steps help the most:

1. **Google Search Console**: add the site and submit `https://thecorporatemcee.com/sitemap.xml`.
2. **Google Business Profile**: create or claim "The Corporate Emcee" in Lagos and link it to the site.
3. Put the website link in the Instagram, LinkedIn and YouTube bios.
4. Ask planners, venues and past clients to link to the site from their vendor pages.
5. Ask happy clients for a short written testimonial, and add it to `data/testimonials.ts`.

---

## What's still placeholder or unverified

- **Photos**: none yet. The gallery stays hidden until `data/gallery.ts` has entries.
- **Prices and booking terms**: these are samples, flagged by a single notice on the Rates page.
- **Client names**: the newer names came from Tosin's team, and the first ten came from public listings. **Stats**: 1,500+ events comes from Tosin. "30+ brands" counts the client list and "6 event formats" counts the Range cards, so update them if those lists change. **Bio and contact details**: taken from public search listings of thecorporatemcee.com. The original site couldn't be opened from the build environment, so please confirm every client name before launch.
- **Video testimonials**: the two clips are real, but the guests' names, roles and quotes still need to be added in `data/videos.ts`.
- **Copy** (headlines, section text): drafted from Tosin's own bio. Edit freely.

## Tech notes for a developer

Next.js 16 (App Router), TypeScript and plain CSS custom properties, hosted on Vercel with every page pre-rendered. Fonts are self-hosted through Fontsource: Plus Jakarta Sans for headings and Inter for body text. The booking invitation also uses Grenze Gotisch, a legible Old English blackletter that loads on that page only. The site opens in light mode, and dark mode appears only when a visitor chooses it. Motion comes from Lenis (smooth scrolling) and three.js (the home page "stage dust", loaded lazily), with the framework-free motion code in `lib/motion/`. The only server code is the Notion booking log, and there are no third-party scripts. Design tokens are in `app/globals.css`, and the two theme layers (reading and stage) are explained in `DESIGN.md`.
