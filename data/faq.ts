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
    a: "Every kind: conferences and summits, galas, product launches, award ceremonies, retreats, weddings and campus events. Over 1,500 so far, each prepared for its own audience.",
    home: true,
  },
  {
    q: "Where is Oluwatosin based? Does he travel?",
    a: "Oluwatosin is based in Lagos and hosts across Nigeria and internationally. Travel outside Lagos is quoted separately.",
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
    q: "Is a co-host included in the packages?",
    a: "No. Every package covers Oluwatosin as your one host. If you need a co-host or another MC, that is quoted and billed separately.",
    rates: true,
  },
  {
    q: "What is call time, and when is it billed?",
    a: "Call time is when Oluwatosin arrives for the sound check and final brief. Up to 1 hour before the event starts is included; an earlier call time is billed separately, per extra hour.",
    rates: true,
  },
  {
    q: "Will Oluwatosin work with our planner's run-of-show?",
    a: "Yes. Every booking includes a brief call, and Oluwatosin returns his notes and transitions before the event.",
  },
];
