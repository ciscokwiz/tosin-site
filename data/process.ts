/* =====================================================================
   HOW A BOOKING RUNS — shown on the home page as an event programme.
   `time` is decorative (it makes the list read like a run-of-show).
   ===================================================================== */

export const process = [
  { time: "60 days out", title: "Enquiry", body: "Send your date, venue and event type on WhatsApp or the booking form." },
  { time: "45 days out", title: "Hold the date", body: "Confirm your package. A deposit secures the date." },
  { time: "2 weeks out", title: "Brief call", body: "We go through your audience, key messages, VIPs and names." },
  { time: "3 days out", title: "Script & run-sheet", body: "I send back my transitions and notes on your run-of-show." },
  { time: "The night", title: "Showtime", body: "Call time an hour before start for the sound check, then the room is in safe hands." },
] as const;
