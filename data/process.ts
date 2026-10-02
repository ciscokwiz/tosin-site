/* =====================================================================
   HOW A BOOKING RUNS — shown on the home page as an event programme.
   `time` is decorative (it makes the list read like a run-of-show).
   ===================================================================== */

export const process = [
  { time: "60 days out", title: "Enquiry", body: "Send the date, venue and type of event on WhatsApp or through the booking form. You get a reply on availability." },
  { time: "45 days out", title: "Hold the date", body: "Confirm the package. A deposit secures the date on the calendar." },
  { time: "2 weeks out", title: "Brief call", body: "A call with you or your planner: audience, key messages, VIPs, names to pronounce, what success looks like." },
  { time: "3 days out", title: "Script & run-sheet", body: "Tosin works from your run-of-show and returns his transitions and notes so nothing on the night is a surprise." },
  { time: "The night", title: "On the night", body: "Early arrival, sound check, a word with the stage manager — then the room is in safe hands." },
] as const;
