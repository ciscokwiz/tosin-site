/* =====================================================================
   FREQUENTLY ASKED QUESTIONS
   ---------------------------------------------------------------------
   Shown on the home page and sent to Google as FAQ data. Answer the
   questions people actually ask on WhatsApp. Keep answers factual.
   `rates: true` also shows that question on the Rates page.
   ===================================================================== */

export const faq: { q: string; a: string; rates?: boolean }[] = [
  {
    q: "Where is The Corporate Emcee based?",
    a: "Tosin is based in Lagos, Nigeria, and hosts events across Nigeria and internationally — over 500 events in more than three countries so far.",
  },
  {
    q: "What kinds of events does Tosin host?",
    a: "Corporate conferences and summits, galas and end-of-year dinners, retreats, product launches and brand activations, award ceremonies, and weddings — both traditional and white-wedding receptions.",
  },
  {
    q: "How do I check if my date is available?",
    a: "Send the date, city and type of event on WhatsApp, or fill in the booking form on this site. The form writes the message for you, so it takes about a minute.",
  },
  {
    q: "How much does it cost to book Tosin as MC?",
    a: "It depends on the type of event, its length and the location. The Rates page lists starting prices for each package and lets you build an estimate you can send straight to WhatsApp.",
    rates: true,
  },
  {
    q: "Do you travel outside Lagos and Nigeria?",
    a: "Yes. Events in other Nigerian states add travel and accommodation at cost. International events are quoted per brief.",
    rates: true,
  },
  {
    q: "Will Tosin work with our event planner and run-of-show?",
    a: "Yes. Every booking includes a brief call, and Tosin works from your planner's run-of-show, returning his transitions and notes before the event.",
  },
  {
    q: "What makes a psychology background useful for an MC?",
    a: "Tosin holds a degree in Psychology from Obafemi Awolowo University (OAU) and has trained in emotional intelligence. Reading a room — when to lift it, when to slow it down — is the job.",
  },
];
