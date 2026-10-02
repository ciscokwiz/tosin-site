/* =====================================================================
   PHOTOS used on the home page.
   ---------------------------------------------------------------------
   1. Put the original photo in /assets (any size, JPG/PNG).
   2. Run `npm run images` — it writes web-sized copies to /public/images
      named <file>-800.webp and <file>-1600.webp.
   3. Point `src` below at "/images/<file>" (no size, no extension).

   `focus` is the CSS object-position: which part of the photo must stay
   in frame when it is cropped ("50% 50%" = centre, "70% 40%" = right of
   centre, a little high). `alt` describes the photo for screen readers.
   ===================================================================== */

export type Photo = { src: string; alt: string; focus: string };

/* Full-screen hero. Best as a wide shot with the subject off-centre. */
export const heroPhoto: Photo = {
  src: "/images/hero1",
  alt: "Tosin on stage in agbada and fila, microphone in hand, facing a full banquet hall",
  focus: "68% 45%",
};

/* "Meet the host" — three photos, revealed one after another as the
   sentence on the right is read. Order matters: photo 1 shows while the
   first part of the sentence is read, photo 2 for the middle, photo 3
   for the end. Shapes: 1 = tall, 2 = wide, 3 = wide-short. */
export const meetPhotos: [Photo, Photo, Photo] = [
  {
    src: "/images/meet-host1",
    alt: "Tosin in a cream suit hosting The Naked Truth talk show, TNT 2024",
    focus: "50% 40%",
  },
  {
    src: "/images/meet-host2",
    alt: "Tosin in a pinstripe suit and beaded fila speaking at Omoi's Neuroscience & Giggles",
    focus: "32% 40%",
  },
  {
    src: "/images/meet-host3",
    alt: "Tosin interviewing a laughing guest on stage at TNT 2024",
    focus: "45% 45%",
  },
];
