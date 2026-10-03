import type { Photo as PhotoData } from "@/data/photos";

/* Responsive photo from /public/images (<src>-800.webp, <src>-1600.webp,
   and <src>-2400.webp for `xl` photos — see scripts/optimize-images.mjs). */
export function Photo({
  photo,
  sizes,
  priority,
  className,
  xl,
}: {
  photo: PhotoData;
  sizes: string;
  priority?: boolean;
  className?: string;
  xl?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`${photo.src}-1600.webp`}
      srcSet={`${photo.src}-800.webp 800w, ${photo.src}-1600.webp 1600w${xl ? `, ${photo.src}-2400.webp 2400w` : ""}`}
      sizes={sizes}
      alt={photo.alt}
      style={{ objectPosition: photo.focus }}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
