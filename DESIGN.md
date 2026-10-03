# The Corporate Emcee — Style Reference
> A black-tie room at 6:58 pm: house lights dimming to aubergine, one gold spotlight, and a voice about to say "Ladies and gentlemen…"

**Theme:** dual. Reading sections flip between lilac-white and aubergine-black. Stage sections (hero, credibility band, CTA band, footer) are always deep purple — the "stage" never turns the lights on.
**Signature:** Tosin's own mark (`brand/thecorporatemc-tux-mark.svg`) — a **Yoruba fila floating above a tuxedo and bow tie**, no face. The fila is to Tosin what the fedora is to Theo Olayanju: the one object that is unmistakably him. It is split into parts (fila, lapels, bow, studs) in `components/MarkSprite.tsx` so it can be recoloured and animated, and it appears as:
1. **Logo** — full mark beside the wordmark; the fila tips on hover
2. **First-visit loader** — the curtain *is* the mark at screen scale: the panels are his lapels, the fila drops onto the tuxedo, the bow tie pops, then the lapels part
3. **Page transitions** — same lapels close, "Up next: The rate card", the fila tips as they open
4. **Home hero** — the mark as the cover subject: "The Corporate" behind it, the fila overlapping the masthead, "Emcee" crossing the lapels
5. **Client marquee** — the fila separates client names
6. **Range rail** — the bow tie is the knob on the boardroom→dance-floor meter
7. **Run of Show programme card, booking invitation** — the mark as the printed seal
8. **Rates** — the bow tie marks "Most booked"; the mark watermarks the page headers
9. **Theme toggle ("house lights")** — the fila tips as the lights change
10. **Section rule** — the fila between two hairlines
11. **Footer** — the full mark tips its fila as a farewell; also the favicon, share image and 404 page
It is never tiled as a pattern, never distorted, and its proportions are never changed.
**Lineage:** Entertainment/creator lane (bold type, motion as an asset) held back by fintech restraint, because his buyers are corporate event planners at Coca-Cola, KPMG and USAID — they book the person who looks like he already runs on time.

Rejected first idea: a black-and-gold "luxury events" template (black canvas, gold script font, champagne glitter). Every Lagos MC and planner site already wears it, and it reads wedding-first. Tosin's name is literally *The Corporate Emcee*, so the brand's purple (#412D63) leads, gold is demoted to an accent you earn, and the typography is a black-tie Bodoni rather than a script — formalwear, not party wear.

## Intake
| Variable | Value | Note |
|---|---|---|
| Craft / sector | Professional MC / event host: corporate galas, conferences, retreats, product launches, brand activations, award ceremonies, weddings, international hosting | From thecorporatemcee.com (via search summaries; site itself blocked from this build environment) |
| Audience | 1) HR/brand/comms leads and event planners at Nigerian corporates and NGOs; 2) couples and families planning weddings; 3) international event organisers | Buyers first, fans second |
| Personality | **Premium** + **Warm** | Not "fun party MC"; not stiff either — a psychologist who reads the room |
| Tier | Premium, mid-to-upper Lagos market | Restraint over ornament |
| Device mix | Mobile majority (Android mid-tier, planners on WhatsApp); desktop for corporate procurement | Built 360px first |
| Register | Formal-but-warm English. No Pidgin in UI copy | Corporate buyers |
| Geography | Lagos-based, Nigeria-wide, 3+ countries | ₦ primary, "on request" for international |
| Must-avoid | Black+gold party template, Ankara/Kente wallpaper, microphone clip-art, stock confetti | |
| References | theoolayanju.com (signature-object system — the fedora), thecorporatemcee.com (content source) | Both blocked by network policy during this build; facts taken from public search summaries of thecorporatemcee.com |

## Colour palette
| Name | Hex | Role | Text on it | Contrast |
|---|---|---|---|---|
| Brand Purple | `#412D63` | Stage background (light theme); primary action on light canvas | `#FFFFFF` / `#F3EEF8` | 11.80 / 10.33 |
| Night Aubergine | `#110B1A` | Canvas (dark theme) and stage (dark theme) | `#F3EEF8` | 16.93 |
| Aubergine Surface | `#1B1328` | Cards in dark theme | `#A99BC0` muted | 6.95 |
| Lilac Paper | `#F5F2F8` | Canvas (light theme) — cool, not cream | `#1A1226` ink | 16.35 |
| Ink | `#1A1226` | Headings, light theme | — | — |
| Body Plum | `#3D3350` | Body text, light theme | on Lilac Paper | 10.59 |
| Muted Plum | `#6A5F7C` | Captions, light theme | on Lilac Paper | 5.35 |
| Antique Gold (deep) | `#7A5A14` | Gold *text* on light canvas (labels, numerals) | on Lilac Paper | 5.74 |
| Stage Gold | `#D8B25C` | Gold accent on purple/aubergine; primary action on stage | `#1A1226` on it | 9.01 |
| Bow-tie Gold | `#C9A04A` | Bow tie fill, hairlines, focus rings on stage | `#1A1226` on it | 7.43 |
| Lavender | `#B79AE8` | Dark-theme link/accent only | on `#110B1A` | 8.10 |

Rules:
- **One action colour per layer.** Reading layer: purple (light) / stage gold (dark). Stage layer: stage gold. Never two filled buttons side by side — the second is always a ghost.
- Gold is never a section background. It is a bow tie, a numeral, a hairline, a button.
- Gold text on light canvas is always the deep `#7A5A14` — bright gold on white fails.

## Typography
Two families, site-wide (revision 4, chosen by the client from a shortlist of Inter, IBM Plex Sans, Source Serif 4 and Plus Jakarta Sans):
- **Headings:** Plus Jakarta Sans Variable, weights 600 to 800, with tight tracking (−0.03 to −0.045em) on large sizes. It is geometric but warm, so it reads as a person rather than a corporation. Its italic, set in gold, carries the one emphasised phrase in a headline.
- **Body and UI:** Inter Variable, weights 400 to 600. It is built for screens and stays legible at 13px on phones. Labels are set uppercase with 0.08–0.1em tracking.
- Both are self-hosted through Fontsource, as Latin variable woff2 files.

Body text is 17px and does not shrink on phones. The scale is a major third (1.25), with display sizes fluid between 360px and 1440px:

| Token | Size | Use |
|---|---|---|
| `--step--2` | 13px | Labels, eyebrows |
| `--step--1` | 15px | Captions, small UI |
| `--step-0` | 17px | Body |
| `--step-1` | 18→21px | Lead paragraphs |
| `--step-2` | 20→26px | Small headings |
| `--step-3` | 24→32px | H3, prices |
| `--step-4` | 30→48px | H2 |
| `--step-5` | 36→68px | Page H1, footer statement |
| Hero H1 | 34→60px (capped at 8vh) | "Every room has a rhythm." |

## Spacing and shape
- Base 8px; scale 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Section padding: `clamp(64px, 10vw, 144px)` block; 16px gutters at 360px, 32px ≥768px.
- Max width 1280px; measure 65ch for prose, 32ch for cards.
- Radius vocabulary: `--r-pill` 999px (buttons, nav, tags) · `--r-card` 28px (bento, rate cards) · `--r-input` 14px · `--r-mark` 6px (small chips).
- Elevation: none by default — hairline borders (`--line`). One glow allowed: the gold spotlight on stage sections.

## Components
- **Nav:** floating pill, top 12px, blurred translucent stage purple, tux-mark + wordmark left, three links + "Book" gold pill right. On ≤768px: mark + Book + menu button that opens a full-screen "programme" sheet.
- **Primary button:** pill, 52px min height, `--action` fill, `--on-action` text, 600 weight, 16px; hover lifts 2px (transition, not keyframes); focus ring 3px Bow-tie Gold offset 3px.
- **Ghost button:** pill, 1px `--line-strong` border, transparent, same type.
- **WhatsApp button:** ghost with WhatsApp glyph; always sits next to the primary CTA, never buried.
- **Credibility band:** stage layer, client names set in condensed, tracked Instrument Sans (wdth 75) in muted lavender, looping marquee (CSS -50% translate), pauses on hover/focus; names exposed as a real list for screen readers.
- **Stat tile:** bento card, numeral in Bodoni at `--step-5` with gold suffix (+/%), label below in `--step--1`.
- **Range switcher ("The Range Master"):** tablist of event formats → panel with what he brings and a "Rates for this →" link. Real `role=tablist`, arrow-key navigation.
- **Run-of-show timeline:** booking process presented as an event programme — times in tabular gold numerals, items in serif.
- **Rate card:** surface card, category tag, package name (serif step-3), "From ₦X" (opsz 10, tabular), includes list with hairline checks, "Sample rate" badge visible while prices are placeholders.
- **Estimate builder:** package select + add-on checkboxes → live total → "Send this estimate on WhatsApp".
- **Invitation preview (booking):** a card styled as an event invitation that fills live as the form is typed: "The Corporate Emcee is requested at…" with tux-mark seal. Purely presentational; the form is the source of truth.
- **Loader:** first visit per session only, about 2.7s. The left front swings on, then the right; the fila settles, the bow tie and studs follow, and the fronts part one after the other. Skipped entirely with reduced motion.
- **Page curtain:** two lapel-shaped panels close from left/right to a V, mark + "Up next: {page}" in the gap, ~640ms close (right front 120ms behind the left) / ~760ms open.
- **Theme toggle:** button with the bow tie; it flips 180° on toggle; `aria-pressed`, label states the action.
- **Footer ("Closing Remarks"):** see Layout.

## Do / Don't
**Do**
- Use the tux-mark only in the six placements listed above.
- Put WhatsApp next to every primary booking CTA.
- Show prices in ₦ with comma thousands and tabular lining figures.
- Use italic Bodoni for one emphasised word per headline, max.
- Mark every placeholder (photos, sample rates) visibly in the UI.
- Keep stage sections purple in both themes.

**Don't**
- Don't use gold as a background fill or on light canvas at the bright hex.
- Don't add confetti, sparkles, microphone icons, champagne or script fonts.
- Don't autoplay anything; motion waits for scroll reveal or pointer intent.
- Don't invent testimonials, awards or clients — the testimonials block stays hidden until real quotes are added to `data/testimonials.ts`.
- Don't use more than one filled button per group.
- Don't animate layout properties; transform and opacity only.

## Imagery
- Real event photography of Tosin on stage, with the audience in frame (proof of the room), and tight 3:4 portraits in the tux. Warm stage light, not flash.
- Ratios: 3:4 portraits (hero, about), 4:5 event stills.
- **Current state:** no photos were available to this build. Every image slot renders a labelled "Photo placeholder" frame built from the brand gradient and tux-mark. Swap via `data/site.ts`.
- Never: stock "business people clapping", confetti, generic microphones.

## Layout
**Home:** hero on stage (eyebrow with city + booking season, H1 "The Corporate Emcee", his own bio line, CTAs, 3:4 portrait frame with a "500+ events" seal, cursor spotlight on desktop) → credibility marquee directly under hero → stats bento (500+ events · 3+ countries · 98% satisfaction · Psychology, OAU) → "The Range Master" switcher → "Why a psychologist holds the mic" three-column → run-of-show booking timeline → testimonials (hidden until real) → FAQ → stage CTA band → footer.
**Rates:** page H1 + note → category tabs (Corporate / Weddings / Launches & Awards / International) → rate cards → add-ons → estimate builder → terms (sample) → FAQ subset → CTA.
**Booking:** H1 + 3 ways to reach him (WhatsApp, call, email) → two-column: form (left) + sticky invitation preview (right; above on mobile, collapsed to a slim summary) → after-submit guidance.
**Footer — "Closing Remarks":** stays on stage purple. Top row: "And that's a wrap." in huge Bodoni with a gold italic word, and the primary CTA. Middle: an "Order of Proceedings" programme card — the site nav as numbered programme items with times (18:00 Arrival — Home, 18:30 The Rate Card, 19:00 Booking, 21:45 Vote of Thanks — contact), plus contact channels. Behind it, a giant cropped tux-mark lapel silhouette in 6% gold. Bottom: full-bleed wordmark "THE CORPORATE EMCEE" set edge to edge in Bodoni, a ticking "Doors open in Lagos" local-time clock, credits line. Unmistakably an MC's sign-off.

## Market layer
- **Currency & numerals:** ₦ with comma thousands (`Intl.NumberFormat('en-NG')`), tabular lining figures; international = "On request" (quoted in USD/GBP on enquiry).
- **Contact channels:** WhatsApp primary (+234 803 406 4395) surfaced in nav sheet, hero, every rate card, booking page and footer; phone and email (thecorporateemcee00@gmail.com) secondary. Booking form composes a WhatsApp message (or email fallback) — no backend.
- **Trust signals:** named corporate clients directly under the hero; 500+ events / 3+ countries / 98% satisfaction; OAU Psychology degree + emotional-intelligence and product-management training; a clear process timeline (planners fear the MC who shows up without the run-sheet).
- **Connectivity:** static export, ~2 font files, no third-party scripts, images lazy and sized, motion CSS-first. Works on throttled 3G; the loader runs once per session (about 2.7s) and is skipped after that.
- **Wedding structure:** booking form distinguishes Traditional/Engagement vs. White Wedding reception vs. both days — these are different days in Nigeria.
- **Register:** formal-but-warm English.

## Revision 2 — client feedback

The first build was rated 1/10 by the client: a stand-in clip-art tux, pill-and-rounded-card UI everywhere, a bento of big-number tiles and visible "photo placeholder" frames read as a template, not as a premium host. Kept: the purple/gold palette and the loader motion. Changed:
- Every graphic now comes from the client's fila & tuxedo artwork (eleven placements above).
- Home became a magazine cover (masthead behind the subject), a scroll-lit manifesto, a pinned horizontal rail, a printed Run of Show card — editorial devices instead of SaaS cards.
- Radii dropped from 28px to 2–4px; cards gave way to hairline rules; the rate card is set like a printed menu with dotted leaders.
- No visible placeholders: the gallery and testimonials stay hidden until real content exists; sample prices carry one notice instead of a badge on every card.
- Motion follows the Theo playbook: one rAF engine, pinned rail, scroll-velocity marquee, word-by-word reveal, magnetic buttons (mouse only), all off under reduced motion.

## Revision 3 — home page, client feedback

Kept as they were: the Run of Show section, the word-by-word reveal and the Range rail.
- **Hero:** the photo leads. Tosin faces a full banquet hall in his fila. The hero is exactly one screen tall (`100svh`). The title is set at roughly a third of its previous size and left-aligned over the darker side of the photo. The buttons are normal size, and the stats sit bottom-right.
- **Nav:** there is one booking route, the gold "Book Tosin" button. The "Booking" link is gone. The house-lights toggle sits in the exact centre of the bar.
- **Meet the host:** the section is pinned while you scroll. The sentence is in three parts, and each part reveals its own photo in a three-photo grid (tall, near-square, wide). Earlier photos step back so the current one is in focus. Each part gets an equal share of the scroll, however many words it has. The text is set in Instrument Sans with gold Bodoni italic accents.
- **Range cards:** 28px radius. On hover a card lifts out of the deck.
- **Why it works → Video testimonials:** dark cards. Mouse users get a muted preview after resting on a card for 450ms. A click opens the player, and nothing loads from YouTube until then.
- **Footer:** cut down to the brand and a call to action, three short columns, and the base line.

## Revision 4 — copy, typography and motion

- **Typography:** Plus Jakarta Sans for headings and Inter for body text (see Typography above). Bodoni and Instrument Sans are removed, along with the glyph workaround that existed only because of Bodoni's hairlines.
- **Copy:** the hero is the client's own: "Every room has a rhythm. I know how to lead it." The H1 is that line, and the label above it carries the search phrase "Corporate MC & Event Host in Lagos". All home-page copy is shorter, and section ledes name the event types people search for. The page title is "Corporate MC & Event Host in Lagos, Nigeria". The home FAQ is trimmed to four questions, and only those are sent as FAQ structured data.
- **Nav:** a 50px bar with 36–38px controls. The current page is no longer highlighted.
- **Client band and video testimonials:** both use the lighter lilac surface, and the client band is about half its previous height.
- **Hero:** the mouse-following gold spotlight is removed.
- **Range rail:** the travel now accounts for the viewport's padding, so the last card always ends fully in view.
- **Run of Show card:** on hover it pivots from its bottom edge and the top floats left (−14px, −4.5°).
- **FAQ:** rounded accordion cards that animate open where the browser supports it.
- **Footer:** one statement, one button, and one row of brand, pages, contact and socials.
- **Motion:**
  - Lenis smooth scrolling for wheel and trackpad; touch keeps native scrolling.
  - 3D section entrances: "How booking works" rises from depth on z, the video section turns in on x, and the FAQ lifts on y.
  - The hero photo parallaxes away as you scroll past it.
  - A three.js "stage dust" field of gold and lilac light runs on the home page only. The camera flies forward through it (z) as the page scrolls, drifting in x and y. It loads lazily after the page is idle and is skipped for reduced motion, data-saver mode or browsers without WebGL.

## Revision 5: themes, one-way pins, Rates and Booking

- **Light by default.** The site opens in light mode for everyone, and dark appears only when a visitor chooses it.
- **Dark mode is a rich royal purple, not near-black.** The canvas is `#2a1a4d`, surfaces `#34225e`, stage `#46307a` and footer `#2b1b52`, with gold `#e0bd6a`. All text pairs pass AA.
- **One-way pins.** "Meet the host" and the Range rail pin on the way down. Once you have passed one, or as soon as you scroll up inside it, it releases into a finished, normal-height section: every photo shown, every word lit, and the rail becomes a swipe row. The scroll position is adjusted so nothing jumps, and the way back to the hero is short.
- **Inner-page header (`PageHero`).** It sits close under the nav and has a slow aurora of purple and gold light behind it, plus its own pocket of three.js stage dust. A photo card tilts toward the mouse, floating glass chips surround it, and the fila seal sits on the card.
- **Rates.** A sticky segmented control jumps between categories. Each category is a rounded panel of package cards with the price as the hero number and inclusions as tags. Each card has a "Book this" button plus a WhatsApp icon button, and lifts on hover. Extras are compact cards. The estimator sits in rounded glass panels. "Got a date in mind?" is now a single slim pill. Panels arrive with the y-axis depth motion.
- **Booking.** Contact details are three small glass pills (WhatsApp, phone, email). The form is a rounded card of compact fields (46px tall, 14px radius). The invitation card sets its grand lines in an Old English blackletter, loaded only on the Booking page (Grenze Gotisch since revision 6).

## Revision 6: loader, mobile fixes, legibility

- **Loader with texture.** The blazer fronts carry a fine twill weave, a soft fall-off of light and a satin sheen on the lapels, outlined by a gold pick-stitch. The shirt behind them has thin vertical pleats. The fronts arrive like a blazer being put on: left first, then right, eased in and out rather than snapped. The fila is drawn smaller, at 74% of the artwork. The first-visit intro now runs about 2.7s, and page transitions close in about 640ms and open in about 760ms.
- **Mobile "Meet the host".** The credentials list is hidden on phones, so the sentence and photos carry the section.
- **Range meter.** The bow tie travels inside the track and stops at its end, clear of the "Dance floor" label.
- **Rates reveals.** Package cards glide in. Each card eases toward its scroll position instead of tracking it frame by frame, and neighbouring cards are staggered slightly.
- **Nav.** The bar shows only Rates and "Book Tosin". Home is the logo, and the mobile menu still lists every page.
- **Invitation font.** Grenze Gotisch replaces UnifrakturMaguntia. It is still Old English in character but far easier to read at small sizes.
- **Form.** The date and time icons are drawn in brand purple (gold in dark mode) at full opacity.

## Revision 7: real video testimonials, a longer client list

- **Two real clips** replace the sample cards. Both were phone recordings: 400–500px wide, at a variable frame rate. Each was denoised, upscaled to 960px tall with lanczos and contrast-adaptive sharpening, given a light colour lift and locked to 30fps. A mouse pointer burned into the second clip was masked out. Audio was cleaned with a rumble cut, FFT noise reduction and gentle compression, and normalised to -16 LUFS. The clips are 1.2MB and 3.9MB as H.264 MP4s with fast start.
- **Nothing heavy on load.** Posters are lazy WebP stills of about 35KB. Clips are `preload="none"` and load only when hovered (desktop) or opened. The player takes the clip's own portrait shape, the backdrop no longer blurs, and the three.js dust stops drawing while the player is open (the `tce:media` event).
- **The third slot is an invitation**, "Your guests could be next", with the full mark and a Book button, so two clips never leave a gap.
- **Trusted by** now lists 29 names. Household names are spread through the list, and the CSS fallback loop was slowed so the longer band keeps the same pace.

## Revision 8: phones, Reduce Motion, sharper hero, security

- **Reduce Motion is respected without breaking anything.** With the phone's Reduce Motion setting on, the site had switched off everything, including feedback the visitor triggers. Now:
  - The client band stays a single moving row, at a slower 180s loop with no scroll boost. It pauses on touch, hover or focus.
  - The Range meter's bow tie and the card lift follow the swipe in every mode (`lib/motion/railSwipe.ts`).
- **Range cards on touch screens** lift when they snap into view, not when tapped. Hover lifts are limited to mouse users, as are the video card, Run-of-Show and package hovers. A tap no longer leaves a card stuck in its "hovered" state. Swipe mode leaves room for the lifted card's shadow.
- **Run of Show** sits straight on phones and tablets, with a compact layout below 600px. Its section skips the scroll-in motion on phones (`data-depth-sm="off"`).
- **Gentler depth motion on phones.** Below 768px every `data-depth` mode is a short 28px lift. 3D tilts warped tall sections on small screens.
- **Hero.** On phones the headline, kicker, intro, buttons and stats are smaller, so the photo leads. The photo was upscaled 2× with EDSR super-resolution and gets a 2400px file. The `sizes` hint now reflects that a landscape photo with `object-fit: cover` is drawn about 165vh wide on portrait screens, so phones fetch the sharp file.
- **Meet the host.** Photos that haven't been revealed yet show as soft frames with the fila, so the grid never looks broken. Tablets get the two-column layout from 700px. The phone pin is shorter (230vh).
- **Estimator on phones.** Each extra's price sits under its name.
- **Security.**
  - Added a CSP and other security headers (`vercel.json`, `public/_headers`); every page was tested under the policy with no violations.
  - Booking fields are capped in length and stripped of control characters.
  - JSON-LD output escapes `<`.
  - `npm audit` reports 0 vulnerabilities.

## Critic loop
| Axis | Round 1 | Reason | Fix | Round 2 |
|---|---|---|---|---|
| Distinctiveness | 3 | Draft 1 was black canvas + gold + Bodoni — indistinguishable from every luxury-events site in Lagos | Brand purple becomes the stage colour; gold demoted to bow tie/numerals; footer reframed as an event programme ("Closing Remarks", "Order of Proceedings"); page curtain announces "Up next" like an MC | 4 |
| Authenticity | 4 | Signature comes from his own name/mark (tux), not a borrowed textile; cultural specificity from WhatsApp-first and wedding-day structure | — | 4 |
| Accessibility | 4 | All pairs measured (table above); bright gold quarantined to dark surfaces | Added deep gold token for light canvas | 5 |
| Feasibility | 3 | Draft relied on event photos and client logo files that don't exist in this build | Credibility band uses typeset names (honest, theme-proof); image slots are labelled branded placeholders driven from one data file | 4 |
| Brief fit | 4 | Home/Rates/Booking all covered; "2026 feel" via variable width axis, bento grid, floating pill nav, spotlight, view-curtain; MC identity via programme/run-of-show language | Kept mark usage to six placements per "don't overdo it" | 4 |

Gate passed: every axis ≥ 4.

Round 3 (after client feedback):
| Axis | Score | Reason |
|---|---|---|
| Distinctiveness | 5 | The fila-and-tux mark is the cover, the curtain and the seal; no other Lagos MC site can look like this |
| Authenticity | 5 | The fila is his own symbol, drawn by him — cultural specificity from the client, not borrowed textile |
| Accessibility | 4 | Contrast measured; motion has a full reduced-motion mode; the black tuxedo is lifted a shade on the night canvas |
| Feasibility | 4 | Static export; the mark is one inline sprite reused by `<use>`, so 30KB of trace is sent once |
| Brief fit | 4 | Real photos and confirmed prices are still the gap between this and 10/10 |

## Quick start — CSS custom properties
See `app/globals.css` — the `:root` block there is the single source of truth and mirrors every token above.
