/* =====================================================================
   VIDEO TESTIMONIALS — clients on camera.
   ---------------------------------------------------------------------
   Each entry is one card. Give it EITHER:
     youtube: "dQw4w9WgXcQ"        the id after "watch?v=" in a YouTube link
     file:    "/videos/ada.mp4"    a short MP4 placed in /public/videos
   poster:   a photo from /public/images (no size, no extension), shown
             before the video plays — see data/photos.ts for how to add one.

   duration: optional length shown on the card, e.g. "0:14".
   ratio:    the video's width / height, e.g. "696 / 960", so the player
             opens at the right shape (portrait phone clips are fine).

   The two clips below were cleaned up for the web (denoised, sharpened,
   steady 30fps, levelled audio) and live in /public/videos. Fill in each
   guest's NAME, ROLE and a one-line QUOTE from what they say — only with
   their permission. Add `sample: true` to any card that is a placeholder.
   ===================================================================== */

export type VideoTestimonial = {
  youtube?: string;
  file?: string;
  poster: string;
  name: string;
  role?: string;
  quote?: string;
  sample?: boolean;
  duration?: string;
  ratio?: string;
};

export const videos: VideoTestimonial[] = [
  {
    file: "/videos/testimony-1.mp4",
    poster: "/images/testimony-1",
    ratio: "696 / 960",
    duration: "0:06",
    name: "From the guest list",
    role: "Brand showcase",
  },
  {
    file: "/videos/testimony-2.mp4",
    poster: "/images/testimony-2",
    ratio: "840 / 960",
    duration: "0:14",
    name: "From the stage",
    role: "Celebration",
  },
];
