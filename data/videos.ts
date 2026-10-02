/* =====================================================================
   VIDEO TESTIMONIALS — clients on camera.
   ---------------------------------------------------------------------
   Each entry is one card. Give it EITHER:
     youtube: "dQw4w9WgXcQ"        the id after "watch?v=" in a YouTube link
     file:    "/videos/ada.mp4"    a short MP4 placed in /public/videos
   poster:   a photo from /public/images (no size, no extension), shown
             before the video plays — see data/photos.ts for how to add one.

   The three entries below are SAMPLES (sample: true) so the design can be
   seen. They show a "Sample" label on the site. Replace them with real
   testimonials (and delete `sample: true`), or remove them.
   Only publish a client's name and words with their permission.
   ===================================================================== */

export type VideoTestimonial = {
  youtube?: string;
  file?: string;
  poster: string;
  name: string;
  role?: string;
  quote?: string;
  sample?: boolean;
};

export const videos: VideoTestimonial[] = [
  { poster: "/images/meet-host1", name: "Client testimonial", role: "Name, role · Company", quote: "A one-line highlight from the video goes here.", sample: true },
  { poster: "/images/meet-host2", name: "Client testimonial", role: "Name, role · Company", quote: "A one-line highlight from the video goes here.", sample: true },
  { poster: "/images/meet-host3", name: "Client testimonial", role: "Name, role · Company", quote: "A one-line highlight from the video goes here.", sample: true },
];
