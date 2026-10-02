/* =====================================================================
   FREQUENTLY ASKED QUESTIONS
   ---------------------------------------------------------------------
   Shown on the home page and sent to Google as FAQ data. Answer the
   questions people actually ask on WhatsApp. Keep answers factual.
   `home: true` shows it on the home page (keep it to about four);
   `rates: true` shows it on the Rates page.
   ===================================================================== */

export const faq: { q: string; a: string; home?: boolean; rates?: boolean }[] = [
  {
    q: "What events does The Corporate Emcee host?",
    a: "Corporate conferences and summits, galas, product launches, award ceremonies, retreats and weddings — over 500 events so far.",
    home: true,
  },
  {
    q: "Where is Tosin based? Does he travel?",
    a: "Tosin is based in Lagos and hosts across Nigeria and internationally. Travel outside Lagos is quoted separately.",
    home: true,
    rates: true,
  },
  {
    q: "How much does it cost to book an MC in Lagos?",
    a: "It depends on the event, its length and the location. The Rates page shows starting prices; send your date for an exact quote.",
    home: true,
    rates: true,
  },
  {
    q: "How do I check if my date is available?",
    a: "Send your date, venue and event type on WhatsApp or through the booking form. You get a quick reply.",
    home: true,
  },
  {
    q: "Will Tosin work with our planner's run-of-show?",
    a: "Yes. Every booking includes a brief call, and Tosin returns his notes and transitions before the event.",
  },
];
