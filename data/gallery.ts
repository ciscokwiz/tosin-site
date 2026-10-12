/* =====================================================================
   GALLERY — photos from real events.
   ---------------------------------------------------------------------
   The "On stage" spread on the home page: photos laid out like a fanned
   deck of cards, the middle one on top. It hides itself if this list is
   empty. Put the original in /assets, run `npm run images`, and list the
   -800.webp file below. Portrait photos work best; mark a landscape one
   `wide: true` (best in the middle). Five cards fit every screen.

   Example (remove the // to use):
   // { src: "/images/gallery/kpmg-summit.webp", alt: "The Corporate Emcee moderating a panel at a Lagos summit", event: "Leadership Summit, Lagos" },
   ===================================================================== */

export const gallery: { src: string; alt: string; event?: string; wide?: boolean; focus?: string }[] = [
  { src: "/images/gallery-world-class-1-800.webp", alt: "The Corporate Emcee raising his microphone in front of the World Class Nigeria 2026 backdrop", event: "World Class Nigeria 2026" },
  { src: "/images/gallery-black-tie-800.webp", alt: "The Corporate Emcee in a white shirt and bow tie beside a wall of framed portraits at a celebration", event: "Black-tie celebration" },
  { src: "/images/gallery-world-class-trio-800.webp", alt: "The Corporate Emcee smiling with two guests at World Class Nigeria 2026", event: "World Class Nigeria 2026", wide: true },
  { src: "/images/gallery-world-class-2-800.webp", alt: "The Corporate Emcee in a pinstripe suit and fila, smiling at the World Class Nigeria 2026 backdrop", event: "World Class Nigeria 2026" },
  // also the Rates page photo, so it sits last in the spread
  { src: "/images/gallery-berger-800.webp", alt: "The Corporate Emcee in a black textured suit on the Berger Paints red carpet", event: "Berger Paints", focus: "50% 30%" },
];
