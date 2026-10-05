/* =====================================================================
   RATE CARD — prices and packages.
   ---------------------------------------------------------------------
   ⚠  The prices below are SAMPLE numbers so the page can be designed.
      Replace them with Oluwatosin's real rates, then set
      `ratesAreSamples` to false — that removes the "Sample rate"
      badges from the website.

   How prices work:
   - `price` is a plain number in Naira with NO commas: 1500000
     The site adds the ₦ sign and commas for you (₦1,500,000).
   - For "price on request", write:  price: null
   - `id` is used by the booking form and links. Use lowercase-with-dashes
     and do not change an id once the site is live.
   - `category` must be one of the ids in `rateCategories` below.

   Anything you add here automatically appears on the Rates page, in the
   estimate calculator, AND in the booking form's dropdown.
   ===================================================================== */

export const ratesAreSamples = true;

export const rateCategories = [
  { id: "corporate", label: "Corporate", blurb: "Conferences, summits, galas, retreats and AGMs." },
  { id: "weddings", label: "Weddings", blurb: "Traditional, engagement and white-wedding receptions." },
  { id: "launches", label: "Launches & Awards", blurb: "Product launches, brand activations and award nights." },
  { id: "international", label: "International", blurb: "Events outside Nigeria, quoted per brief." },
] as const;

export type RateCategoryId = (typeof rateCategories)[number]["id"];

export type RatePackage = {
  id: string;
  category: RateCategoryId;
  name: string;
  price: number | null;
  /** Shown after the price, e.g. "per event" or "per day". */
  per: string;
  summary: string;
  includes: string[];
  /** Puts a "Most booked" ribbon on the card. Use on one package per category at most. */
  featured?: boolean;
};

export const packages: RatePackage[] = [
  // ---------------- CORPORATE ----------------
  {
    id: "conference-half-day",
    category: "corporate",
    name: "Conference — half day",
    price: 1500000,
    per: "up to 5 hours",
    summary: "Summits, town halls, panels and AGMs that need to run on time.",
    includes: ["Pre-event brief call", "Script & transition notes", "Panel moderation", "Speaker introductions"],
  },
  {
    id: "conference-full-day",
    category: "corporate",
    name: "Conference — full day",
    price: 2500000,
    per: "up to 10 hours",
    summary: "Multi-session programmes where energy has to survive the 3 pm slump.",
    includes: ["Everything in half day", "Run-of-show review with your planner", "Audience engagement segments", "Q&A management"],
    featured: true,
  },
  {
    id: "gala-dinner",
    category: "corporate",
    name: "Gala, dinner or end-of-year party",
    price: 2000000,
    per: "per evening",
    summary: "Black-tie evenings, awards within the dinner, staff celebrations.",
    includes: ["Pre-event brief call", "Custom script", "Award & raffle segments", "Coordination with DJ/band"],
  },
  {
    id: "retreat",
    category: "corporate",
    name: "Retreat or offsite",
    price: 1800000,
    per: "per day",
    summary: "Team retreats and leadership offsites — facilitation as much as hosting.",
    includes: ["Icebreakers & team games", "Session transitions", "Evening social hosting"],
  },

  // ---------------- WEDDINGS ----------------
  {
    id: "wedding-traditional",
    category: "weddings",
    name: "Traditional / engagement",
    price: 1200000,
    per: "per ceremony",
    summary: "Working alongside the families' alaga for a seamless day.",
    includes: ["Planning call with the couple", "Family & guest protocol", "Coordination with alaga and planner"],
  },
  {
    id: "wedding-reception",
    category: "weddings",
    name: "White wedding reception",
    price: 1500000,
    per: "per reception",
    summary: "From the grand entrance to the last dance — on schedule and full of life.",
    includes: ["Planning call with the couple", "Custom programme", "Games & audience moments", "Vendor coordination"],
    featured: true,
  },
  {
    id: "wedding-both-days",
    category: "weddings",
    name: "Both days",
    price: 2500000,
    per: "two events",
    summary: "Traditional and white wedding — one voice across the whole celebration.",
    includes: ["Everything in both packages", "One planning session for both days", "Priority date hold"],
  },

  // ---------------- LAUNCHES & AWARDS ----------------
  {
    id: "product-launch",
    category: "launches",
    name: "Product launch or activation",
    price: 1500000,
    per: "per event",
    summary: "Brand-safe hosting that keeps the product — not the MC — at the centre.",
    includes: ["Brand & key-message briefing", "Reveal moment scripting", "Media & influencer segments"],
  },
  {
    id: "award-ceremony",
    category: "launches",
    name: "Award ceremony",
    price: 2000000,
    per: "per ceremony",
    summary: "Long category lists, live broadcast cues and nominees who must hear their names right.",
    includes: ["Name pronunciation check", "Category & cue scripting", "Cue run-through on a call"],
    featured: true,
  },

  // ---------------- INTERNATIONAL ----------------
  {
    id: "international",
    category: "international",
    name: "International event",
    price: null,
    per: "quoted per brief",
    summary: "Conferences, diaspora galas and destination weddings outside Nigeria.",
    includes: ["Quote in USD, GBP or EUR", "Travel & visa planning", "Remote pre-event rehearsal"],
  },
];

/* Optional extras. Same rules as above — price in Naira, or null.
   A rehearsal or walk-through means Oluwatosin is physically at the venue on
   another day, so it costs more than script writing, which is desk work.
   There is deliberately no co-host extra: packages cover one host, and any
   additional MC is quoted separately (see `extraHostClause`). Red carpet and
   podcast hosting took the co-host's place in the list. */
export const addOns: { id: string; name: string; price: number | null; note: string }[] = [
  { id: "rehearsal", name: "Dry run or venue walk-through", price: 250000, note: "In person, at the venue, before the event day" },
  { id: "script", name: "Full script & run-sheet writing", price: 150000, note: "Delivered 72 hours before the event" },
  { id: "redcarpet", name: "Red carpet or podcast host", price: 500000, note: "Arrival interviews, or a recorded podcast episode" },
  { id: "hybrid", name: "Virtual / hybrid audience hosting", price: 300000, note: "Engaging the online audience live" },
  { id: "travel", name: "Event outside Lagos", price: null, note: "Travel & accommodation at cost" },
];

/* Clauses that also travel inside every estimate and booking message sent
   from the site (and the PDF rate card), so they are written once here. */
export const paymentClause = "Full payment upfront secures the date; dates are not held without it.";
export const callTimeClause =
  "Call time up to 1 hour before the event starts is included. An earlier call time is billed separately, per extra hour.";
export const extraHostClause =
  "Every package covers one host. A co-host or any additional MC is quoted and billed separately.";
/* Added to the end of every WhatsApp / email message the site writes. */
export const messageTerms = `Noted: ${paymentClause} ${callTimeClause} ${extraHostClause}`;
/* Short versions for the estimate panel. */
export const clauseNotes = [
  "Full payment upfront secures your date",
  "Call time over 1 hour before start: billed per hour",
  "One host per package; extra MCs quoted separately",
];

/* Booking terms shown on the Rates page and the PDF rate card. Keep to 8 or
   fewer, one or two short lines each. */
export const terms = [
  paymentClause,
  "Prices cover hosting in Lagos. Other states and countries add travel and accommodation.",
  "Overtime beyond the agreed hours adds 20%, if Oluwatosin has no other booking.",
  callTimeClause,
  extraHostClause,
  "Postponing? Tell us at once to confirm the new date. Within a month of the original date, add 30%; if Oluwatosin isn't free, payment isn't refunded.",
  "Cancellations aren't refunded, except on the death of a major stakeholder, when part of the fee is returned.",
];
