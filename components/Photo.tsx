import type { Photo as PhotoData } from "@/data/photos";

/* Responsive photo from /public/images (<src>-800.webp, <src>-1600.webp). */
export function Photo({
  photo,
  sizes,
  priority,
  className,
}: {
  photo: PhotoData;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`${photo.src}-1600.webp`}
      srcSet={`${photo.src}-800.webp 800w, ${photo.src}-1600.webp 1600w`}
      sizes={sizes}
      alt={photo.alt}
      style={{ objectPosition: photo.focus }}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
