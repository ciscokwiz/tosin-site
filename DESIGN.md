# The Corporate Emcee — Style Reference
> A black-tie room at 6:58 pm: house lights dimming to aubergine, one gold spotlight, and a voice about to say "Ladies and gentlemen…"

**Theme:** dual. Reading sections flip between lilac-white and aubergine-black. Stage sections (hero, credibility band, CTA band, footer) are always deep purple — the "stage" never turns the lights on.
**Signature:** the **tux-mark** — a tuxedo front with a gold bow tie. It appears as: logo mark, first-visit loader, page-transition curtain ("Up next: Rates"), theme toggle (the bow tie flips), section seal on the booking invitation card, and the footer's oversized lapel silhouette. Nowhere else. It is never used as a background pattern or bullet.
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
- **Display:** Bodoni Moda Variable (400–900, opsz 6–96). A didone is the typeface equivalent of a dinner jacket: high stroke contrast, vertical stress, formal. Self-hosted via Fontsource.
- **UI / body:** Instrument Sans Variable (400–700, wdth 75–100). A clean contemporary grotesque that contrasts structurally (monoline vs. high-contrast), with a width axis used for condensed, tracked labels — the 2026 detail.
- Budget: 2 variable woff2 files (Latin subset), ~95KB. `font-display: swap`.

Base **18px**, ratio **1.25** (major third); display steps fluid between 360px and 1440px.

| Token | Size | Weight | LH | Tracking | Use |
|---|---|---|---|---|---|
| `--step--2` | 14px | 500 | 1.45 | +0.06em (labels) | Eyebrows, tags, meta |
| `--step--1` | 16px | 400 | 1.5 | +0.01em | Captions, form help |
| `--step-0` | 18px | 400 | 1.6 | 0 | Body |
| `--step-1` | 20→23px | 500 | 1.4 | -0.005em | Lead paragraphs |
| `--step-2` | 22→28px | 500 | 1.3 | -0.01em | Card titles (serif, opsz 16) |
| `--step-3` | 26→35px | 500 | 1.2 | -0.015em | H3, prices |
| `--step-4` | 32→55px | 500 | 1.08 | -0.02em | H2 |
| `--step-5` | 40→88px | 500 | 1.0 | -0.025em | Page H1 |
| `--step-6` | 52→150px | 500 | 0.9 | -0.035em | Home hero, footer wordmark |

Optical sizing: display/H1/H2 `auto` in light theme; pinned `"opsz" 52` for big headings in dark theme (hairlines survive light-on-dark). Prices pinned to `"opsz" 10` with `lining-nums tabular-nums` so ₦1,500,000's commas never read as decimals. Italic Bodoni is reserved for one emphasised word per headline.

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
- **Loader:** first visit per session only, ≤1.1s, tux-mark draws in, bow tie drops, lights up. Skipped entirely with reduced motion.
- **Page curtain:** two lapel-shaped panels close from left/right to a V, mark + "Up next: {page}" in the gap, ~450ms close / ~350ms open; safety timeout 1.6s.
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
- **Connectivity:** static export, ~2 font files, no third-party scripts, images lazy and sized, motion CSS-first. Works on throttled 3G; loader never blocks content longer than 1.1s and is skipped after first view.
- **Wedding structure:** booking form distinguishes Traditional/Engagement vs. White Wedding reception vs. both days — these are different days in Nigeria.
- **Register:** formal-but-warm English.

## Critic loop
| Axis | Round 1 | Reason | Fix | Round 2 |
|---|---|---|---|---|
| Distinctiveness | 3 | Draft 1 was black canvas + gold + Bodoni — indistinguishable from every luxury-events site in Lagos | Brand purple becomes the stage colour; gold demoted to bow tie/numerals; footer reframed as an event programme ("Closing Remarks", "Order of Proceedings"); page curtain announces "Up next" like an MC | 4 |
| Authenticity | 4 | Signature comes from his own name/mark (tux), not a borrowed textile; cultural specificity from WhatsApp-first and wedding-day structure | — | 4 |
| Accessibility | 4 | All pairs measured (table above); bright gold quarantined to dark surfaces | Added deep gold token for light canvas | 5 |
| Feasibility | 3 | Draft relied on event photos and client logo files that don't exist in this build | Credibility band uses typeset names (honest, theme-proof); image slots are labelled branded placeholders driven from one data file | 4 |
| Brief fit | 4 | Home/Rates/Booking all covered; "2026 feel" via variable width axis, bento grid, floating pill nav, spotlight, view-curtain; MC identity via programme/run-of-show language | Kept mark usage to six placements per "don't overdo it" | 4 |

Gate passed: every axis ≥ 4.

## Quick start — CSS custom properties
See `app/globals.css` — the `:root` block there is the single source of truth and mirrors every token above.
