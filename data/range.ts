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
    label: "Summits & conferences",
    title: "High-level rooms, held to time.",
    body: "Ministers, MDs and keynote speakers expect a host who has read the programme, can pronounce every name and will protect the schedule without making anyone feel rushed.",
    points: ["Panel moderation", "Speaker introductions", "Time-keeping without friction"],
    rates: "corporate",
  },
  {
    id: "galas",
    label: "Galas & dinners",
    title: "Black tie, warm room.",
    body: "End-of-year dinners and corporate galas run on rhythm: when to lift the room, when to let the food land, when to hand over to the band.",
    points: ["Award segments inside the dinner", "Raffles & games", "DJ and band cues"],
    rates: "corporate",
  },
  {
    id: "launches",
    label: "Product launches",
    title: "The product is the star.",
    body: "Brand activations need an MC who learns the key messages, lands the reveal and keeps media, influencers and guests pointed at the brand.",
    points: ["Key-message briefing", "Reveal-moment scripting", "Brand-safe humour"],
    rates: "launches",
  },
  {
    id: "awards",
    label: "Award ceremonies",
    title: "Every name, said right.",
    body: "Long category lists and live cues reward preparation. Nominees remember the host who got their name right on the biggest night of their year.",
    points: ["Pronunciation checks", "Broadcast & stage-manager cues", "Rehearsal walk-through"],
    rates: "launches",
  },
  {
    id: "weddings",
    label: "Weddings",
    title: "Two families, one programme.",
    body: "From the traditional ceremony beside the alaga to the white-wedding reception, Tosin keeps the day joyful, on schedule and respectful of both families.",
    points: ["Family & guest protocol", "Grand entrance & first dance", "Vendor coordination"],
    rates: "weddings",
  },
  {
    id: "students",
    label: "Youth & campus",
    title: "And yes — the student crowd.",
    body: "The same host who moderates a summit can energise a hall of students. That range is where the nickname comes from.",
    points: ["Convocations & orientation", "Campus festivals", "Youth summits"],
    rates: "corporate",
  },
];
