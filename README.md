# The Corporate Emcee — website

The website for **Oluwatosin Aina, The Corporate Emcee**: three pages (Home, Rates, Booking), built to turn visitors into WhatsApp enquiries.

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
| Phone, WhatsApp, email, Instagram, bio, stats, client names, photos | `data/site.ts` |
| Prices, packages, extras, booking terms | `data/rates.ts` |
| Event formats in "The Range Master" section | `data/range.ts` |
| Booking steps ("How a booking runs") | `data/process.ts` |
| Frequently asked questions | `data/faq.ts` |
| Testimonials (hidden until you add one) | `data/testimonials.ts` |

### Prices
In `data/rates.ts`, write prices as plain numbers with no commas: `price: 1500000` shows as **₦1,500,000**. For "price on request" write `price: null`.
**The current prices are samples.** When the real ones are in, set `ratesAreSamples = false` at the top of the file. That removes every "Sample rate" badge.

### Photos
1. Put the photo in `public/images/` (for example `public/images/tosin-hero.webp`). Use a **portrait 3:4** crop, about **840 × 1120 px**, saved as WebP or JPG.
2. In `data/site.ts`, set `images.hero: "/images/tosin-hero.webp"`. Do the same for `images.about`.
3. Until a photo is set, the site shows a labelled "Photo placeholder" frame.

### The tux-mark
The tux-mark is drawn in `components/TuxMark.tsx`. **I couldn't find the tux-mark .svg you mentioned in the repository** (it was empty when the build started), so this is an original stand-in drawn in the same spirit. To use your file:
1. Open your `.svg` in a text editor and copy its `<path …/>` elements.
2. Paste them into `components/TuxMark.tsx`, replacing the shapes there. Add `className="tux-jacket"` to the jacket shape and `className="tux-tie"` to the bow tie so the colours and animations still work. If your viewBox isn't `0 0 64 64`, update `TUX_VIEWBOX`.
3. Replace `public/tux-mark.svg` and `app/icon.svg` (the browser-tab icon) with your file.

---

## Running it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install        # once
npm run dev        # opens a live preview at http://localhost:3000
```

## Publishing it

The site builds to plain files with no server, so hosting is free.

**Vercel (recommended):**
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com), choose **Add New → Project**, and import the repository. Accept the defaults and click **Deploy**.
3. Under **Settings → Domains**, add `thecorporatemcee.com` and follow the DNS instructions.

**Anywhere else (Netlify, cPanel, etc.):** run `npm run build` and upload the contents of the `out/` folder.

If the domain ever changes, update `url` in `data/site.ts` so Google and link previews point to the right place.

### Optional environment variables
| Name | What it does |
|---|---|
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console verification code |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster verification code |

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

- **Tux-mark**: an original stand-in until your `.svg` is added (see above).
- **Photos**: there are none yet; the site shows labelled placeholder frames.
- **Prices and booking terms**: these are samples and are marked "Sample" on the site.
- **Client names, stats (500+ events, 3+ countries, 98%), bio and contact details**: taken from public search listings of thecorporatemcee.com. The original site couldn't be opened from the build environment, so please confirm every client name before launch.
- **Testimonials**: none were available, so the section stays hidden until real quotes are added.
- **Copy** (headlines, section text): drafted from Tosin's own bio. Edit freely.

## Tech notes for a developer

Next.js 16 (App Router), TypeScript and plain CSS custom properties, exported as a static site (`output: "export"`). Fonts are self-hosted through Fontsource: Bodoni Moda Variable and Instrument Sans Variable. The site has no backend and no third-party scripts. Design tokens are in `app/globals.css`, and the two theme layers (reading and stage) are explained in `DESIGN.md`.
