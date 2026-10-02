/* =====================================================================
   HOW A BOOKING RUNS — shown on the home page as an event programme.
   `time` is decorative (it makes the list read like a run-of-show).
   ===================================================================== */

export const process = [
  { time: "T–60d", title: "Enquiry", body: "Send the date, venue and type of event on WhatsApp or through the booking form. You get a reply on availability." },
  { time: "T–45d", title: "Hold the date", body: "Confirm the package. A deposit secures the date on the calendar." },
  { time: "T–14d", title: "Brief call", body: "A call with you or your planner: audience, key messages, VIPs, names to pronounce, what success looks like." },
  { time: "T–3d", title: "Script & run-sheet", body: "Tosin works from your run-of-show and returns his transitions and notes so nothing on the night is a surprise." },
  { time: "T–0", title: "On the night", body: "Early arrival, sound check, a word with the stage manager — then the room is in safe hands." },
] as const;
