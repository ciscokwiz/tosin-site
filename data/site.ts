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
    "Oluwatosin Aina — The Corporate Emcee — is a Lagos-based event host and MC for corporate galas, conferences, product launches, award ceremonies, retreats and weddings across Nigeria and internationally.",

  // His own words, from thecorporatemcee.com. Shown in the home hero.
  bio: "A master communicator, event host and convener of unforgettable moments. With a degree in Psychology from OAU and training in emotional intelligence and product management, Tosin brings more than charisma — he delivers impact.",

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

  // Headline numbers, from thecorporatemcee.com. Keep them true.
  stats: [
    { value: 500, suffix: "+", label: "Events hosted" },
    { value: 3, suffix: "+", label: "Countries on the mic" },
    { value: 98, suffix: "%", label: "Client satisfaction" },
  ],

  // Brands listed on thecorporatemcee.com as clients. ONLY list brands
  // Tosin confirms he has hosted for — a wrong name is a legal problem.
  clients: [
    "Coca-Cola",
    "MTN",
    "Guinness",
    "KPMG",
    "USAID",
    "First Bank",
    "Cowrywise",
    "Seven-Up",
    "Chapel Hill Denham",
    "Oraimo",
  ],

  // PHOTOS. Put image files in /public/images and write their path here,
  // e.g. "/images/tosin-hero.webp". Leave "" to show the branded
  // "Photo placeholder" frame. Best size: 840 x 1120 (portrait 3:4), WebP.
  images: {
    hero: "",
    heroAlt: "Oluwatosin Aina, The Corporate Emcee, on stage in a tuxedo",
    about: "",
    aboutAlt: "Tosin hosting a corporate conference in Lagos",
  },
} as const;

/* Main navigation. `time` is the programme time shown in the footer's
   "Order of Proceedings" — purely decorative, change freely. */
export const nav = [
  { href: "/", label: "Home", programme: "Arrival & welcome", time: "18:00" },
  { href: "/rates/", label: "Rates", programme: "The rate card", time: "18:30" },
  { href: "/booking/", label: "Booking", programme: "Hold the date", time: "19:00" },
] as const;
