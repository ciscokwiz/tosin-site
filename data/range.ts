/* =====================================================================
   "THE RANGE MASTER" — the event formats shown on the home page.
   ---------------------------------------------------------------------
   Each entry becomes one tab. `rates` links the tab to a category on the
   Rates page (must match an id in data/rates.ts → rateCategories).
   ===================================================================== */

import type { RateCategoryId } from "./rates";

export const range: {
  id: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  rates: RateCategoryId;
}[] = [
  {
    id: "summits",
    label: "Conferences & summits",
    title: "High-level rooms, held to time.",
    body: "Panels, keynotes and AGMs hosted with every name said right and every session on schedule.",
    points: ["Panel moderation", "Speaker intros", "Time-keeping"],
    rates: "corporate",
  },
  {
    id: "galas",
    label: "Galas & dinners",
    title: "Black tie, warm room.",
    body: "Corporate galas and end-of-year dinners that flow from the welcome toast to the last dance.",
    points: ["Award segments", "Raffles & games", "Band cues"],
    rates: "corporate",
  },
  {
    id: "launches",
    label: "Product launches",
    title: "The product is the star.",
    body: "Brand activations hosted on-message, with a reveal moment your guests will want to film.",
    points: ["Key messages", "Reveal scripting", "Media moments"],
    rates: "launches",
  },
  {
    id: "awards",
    label: "Award ceremonies",
    title: "Every name, said right.",
    body: "Long category lists, live cues and nominees who deserve their moment on the biggest night of the year.",
    points: ["Name checks", "Stage cues", "Live broadcast cues"],
    rates: "launches",
  },
  {
    id: "weddings",
    label: "Weddings",
    title: "Two families, one programme.",
    body: "Traditional and white weddings in Lagos, hosted alongside your alaga — on time and full of joy.",
    points: ["Family protocol", "Grand entrance", "Vendor cues"],
    rates: "weddings",
  },
  {
    id: "students",
    label: "Youth & campus",
    title: "And the student crowd, too.",
    body: "Convocations, campus festivals and youth summits. That range is where the nickname comes from.",
    points: ["Convocations", "Festivals", "Youth summits"],
    rates: "corporate",
  },
];
