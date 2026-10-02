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

### The fila & tuxedo mark
Tosin's mark lives in `brand/thecorporatemc-tux-mark.svg`. The site uses it in eleven places: logo, loader, page transitions, hero, client band, Range rail, programme card, booking invitation, theme toggle, footer and favicon. `DESIGN.md` lists them all.

If the artwork changes:
1. Replace `brand/thecorporatemc-tux-mark.svg` and `public/mark.svg`.
2. Regenerate `components/MarkSprite.tsx` from it, or ask a developer to. Each part (fila, lapels, bow tie, studs) is a separate group so it can be recoloured and animated.
3. Update the browser-tab icons `app/icon.svg` and `app/apple-icon.png`, and the share image `public/og.png`.

### Photos
1. Put the original photo in `assets/`. Any size of JPG or PNG is fine.
2. Run `npm run images`. This writes web-sized copies to `public/images/` (`<name>-800.webp` and `<name>-1600.webp`).
3. In `data/photos.ts`, point the hero or a "Meet the host" slot at `"/images/<name>"`. Set `focus` to keep his face in frame when the photo is cropped.

The hero photo currently on the site (`hero1.jpg`) is only 1280px wide, so a larger original will look sharper on big screens.

The "On stage" gallery (`data/gallery.ts`) stays hidden until you add photos to it.

### Video testimonials
`data/videos.ts` holds three **sample** cards, labelled "Sample" on the site. For each real testimonial, add either a YouTube id or an MP4 placed in `public/videos/`, a poster photo, and the client's name and role. Then delete `sample: true`. Get the client's permission before publishing their name or video.

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

- **Photos**: none yet. The gallery stays hidden until `data/gallery.ts` has entries.
- **Prices and booking terms**: these are samples, flagged by a single notice on the Rates page.
- **Client names, stats (500+ events, 3+ countries, 98%), bio and contact details**: taken from public search listings of thecorporatemcee.com. The original site couldn't be opened from the build environment, so please confirm every client name before launch.
- **Video testimonials**: the three cards are samples until real videos are added in `data/videos.ts`.
- **Copy** (headlines, section text): drafted from Tosin's own bio. Edit freely.

## Tech notes for a developer

Next.js 16 (App Router), TypeScript and plain CSS custom properties, exported as a static site (`output: "export"`). Fonts are self-hosted through Fontsource: Plus Jakarta Sans for headings and Inter for body text. The booking invitation also uses UnifrakturMaguntia, an Old English blackletter that loads on that page only. The site opens in light mode, and dark mode appears only when a visitor chooses it. Motion comes from Lenis (smooth scrolling) and three.js (the home page "stage dust", loaded lazily), with the framework-free motion code in `lib/motion/`. The site has no backend and no third-party scripts. Design tokens are in `app/globals.css`, and the two theme layers (reading and stage) are explained in `DESIGN.md`.
