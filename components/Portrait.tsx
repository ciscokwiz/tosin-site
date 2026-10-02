import { TuxMark } from "./TuxMark";

/* A 3:4 photo frame. With no `src` it shows a clearly labelled branded
   placeholder, so nobody mistakes it for a finished site. */
export function Portrait({
  src,
  alt,
  children,
  priority,
}: {
  src?: string;
  alt: string;
  children?: React.ReactNode;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className="portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={840} height={1120} loading={priority ? "eager" : "lazy"} decoding="async" fetchPriority={priority ? "high" : undefined} />
        {children}
      </div>
    );
  }
  return (
    <div className="portrait portrait--placeholder" role="img" aria-label={`Photo placeholder: ${alt}`}>
      <TuxMark />
      <span className="placeholder-tag">Photo placeholder &middot; add a 3:4 portrait in data/site.ts</span>
      {children}
    </div>
  );
}
