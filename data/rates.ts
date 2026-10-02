/* =====================================================================
   RATE CARD — prices and packages.
   ---------------------------------------------------------------------
   ⚠  The prices below are SAMPLE numbers so the page can be designed.
      Replace them with Tosin's real rates, then set
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
    includes: ["Name pronunciation check", "Category & cue scripting", "Rehearsal walk-through"],
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

/* Optional extras. Same rules as above — price in Naira, or null. */
export const addOns: { id: string; name: string; price: number | null; note: string }[] = [
  { id: "rehearsal", name: "Rehearsal or venue walk-through", price: 150000, note: "Recommended for awards and launches" },
  { id: "script", name: "Full script & run-sheet writing", price: 250000, note: "Delivered 72 hours before the event" },
  { id: "cohost", name: "Co-host (second MC)", price: 500000, note: "For bilingual or very long programmes" },
  { id: "hybrid", name: "Virtual / hybrid audience hosting", price: 300000, note: "Engaging the online audience live" },
  { id: "travel", name: "Event outside Lagos", price: null, note: "Travel & accommodation at cost" },
];

/* Booking terms shown on the Rates page. SAMPLE — confirm with Tosin. */
export const terms = [
  "A deposit secures the date; dates are not held without one.",
  "The balance is due before the event day.",
  "Prices cover hosting in Lagos. Other states and countries add travel and accommodation.",
  "Overtime beyond the package hours is billed per extra hour.",
];
