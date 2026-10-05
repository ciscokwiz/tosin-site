/* =====================================================================
   SITE DETAILS — the file you will edit most.
   ---------------------------------------------------------------------
   Everything here is plain text inside quotes. Change the words between
   the quotes, save, and the whole site updates (header, footer, booking
   form, Google search data). Do not delete the commas at line ends.
   ===================================================================== */

export const site = {
  // The live web address, without a trailing slash. Used for Google and
  // link previews (WhatsApp/LinkedIn cards). Change when the domain is live.
  url: "https://thecorporatemcee.com",

  // Brand name as it appears in the logo and page titles.
  brand: "The Corporate Emcee",
  // Short handle used in small places (social, footer credit).
  shortBrand: "TheCorporateMC",
  // His full name.
  person: "Oluwatosin Aina",
  // The nickname people use for him. Shown in the "Range" section.
  nickname: "The Range Master",

  // One-line description used by Google and link previews.
  description:
    "Oluwatosin Aina, The Corporate Emcee: a versatile Master of Ceremonies in Lagos for conferences, galas, product launches, award nights, weddings and campus events across Nigeria and beyond.",

  // His own words, from thecorporatemcee.com. Shown in the home hero.
  bio: "A master communicator, event host and convener of unforgettable moments. With a degree in Psychology from OAU and training in emotional intelligence and product management, Oluwatosin brings more than charisma — he delivers impact.",

  city: "Lagos",
  country: "Nigeria",
  // Season shown in the hero badge. Update once a year.
  bookingSeason: "Now booking 2026 / 27",

  contact: {
    // Number exactly as it should be DIALLED, with country code, no spaces.
    phone: "+2348034064395",
    // Same number, written the way people read it.
    phoneDisplay: "+234 803 406 4395",
    // WhatsApp number: digits only, country code first, no "+" or spaces.
    whatsapp: "2348034064395",
    email: "thecorporateemcee00@gmail.com",
  },

  // Social profiles. Leave a value as "" to hide that icon everywhere.
  social: {
    instagram: "https://www.instagram.com/thecorporatemc/",
    linkedin: "",
    youtube: "",
    tiktok: "",
  },

  // Headline numbers in the hero. Keep them true:
  // - events hosted: from Oluwatosin (October 2026)
  // - brands: the number of names in `clients` below, rounded down to a ten
  // - event formats: the cards in "The Range Master" (data/range.ts)
  stats: [
    { value: 1500, suffix: "+", label: "Events hosted" },
    { value: 30, suffix: "+", label: "Brands on the mic" },
    { value: 6, suffix: "", label: "Event formats, one host" },
  ],

  // Brands Oluwatosin has hosted for. ONLY list brands he confirms — a wrong
  // name is a legal problem. The band scrolls in this order; well-known
  // names are spread out so each pass of the marquee carries a few.
  clients: [
    "McLaren",
    "Coca-Cola",
    "Glovo",
    "MTN",
    "Shell",
    "Monster Energy",
    "Cadbury",
    "Guinness",
    "Lafarge",
    "KPMG",
    "BBA Motors",
    "Alat by WEMA",
    "USAID",
    "The Omuti Club",
    "First Bank",
    "Prestmit",
    "JCI",
    "Cowrywise",
    "TSL Logistics",
    "Seven-Up",
    "SI-UK",
    "NFS",
    "Chapel Hill Denham",
    "Terra Developers",
    "The Zone",
    "Oraimo",
    "Redwire",
    "First Ally",
    "Aniwe",
    "Creative Bloc",
  ],
} as const;

/* Main navigation. `time` is the programme time shown in the footer's
   "Order of Proceedings" — purely decorative, change freely. */
export const nav = [
  { href: "/", label: "Home", programme: "Arrival & welcome", time: "18:00" },
  { href: "/rates/", label: "Rates", programme: "The rate card", time: "18:30" },
  { href: "/booking/", label: "Booking", programme: "Hold the date", time: "19:00" },
] as const;
