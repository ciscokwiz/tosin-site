/* The tux-mark — the brand's signature object.
   ---------------------------------------------------------------------
   To swap in a different tux-mark artwork, replace the <path>/<circle>
   elements below with the ones from your .svg file (keep viewBox 0 0 64 64
   or update it to match). Keep the class names so the colours and
   animations still apply:
     .tux-jacket  the jacket body (uses the current text colour)
     .tux-lapel   the satin lapels (slightly lighter/darker tone)
     .tux-tie     the bow tie + button (always gold)
     .tux-stud    the shirt studs
   Also update /public/tux-mark.svg and /app/icon.svg. */

type Props = {
  className?: string;
  /** Accessible name. Omit for a decorative mark (it is then hidden from screen readers). */
  title?: string;
};

export const TUX_VIEWBOX = "0 0 64 64";

export function TuxMark({ className, title }: Props) {
  return (
    <svg
      className={["tux", className].filter(Boolean).join(" ")}
      viewBox={TUX_VIEWBOX}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path
        className="tux-jacket"
        pathLength={1}
        d="M4 60V31c0-10 5-17.5 14-21l7.2-4L32 43l6.8-37 7.2 4c9 3.5 14 11 14 21v29H35.2L32 55.6 28.8 60z"
      />
      <path className="tux-lapel" d="M25.2 6 32 43l-3.4 3.6-8.4-19.8 4.4-4.2-5.4-2.8L21 9z" />
      <path className="tux-lapel" d="M38.8 6 32 43l3.4 3.6 8.4-19.8-4.4-4.2 5.4-2.8L43 9z" />
      <g className="tux-tie">
        <path d="M30 12.6 22.6 8.3c-.9-.5-1.6 0-1.6 1v7.4c0 1 .7 1.5 1.6 1L30 13.4z" />
        <path d="M34 12.6l7.4-4.3c.9-.5 1.6 0 1.6 1v7.4c0 1-.7 1.5-1.6 1L34 13.4z" />
        <rect x="29.4" y="10.4" width="5.2" height="5.2" rx="1.4" />
        <circle cx="32" cy="50" r="1.9" />
      </g>
      <g className="tux-stud">
        <circle cx="32" cy="24" r="1.5" />
        <circle cx="32" cy="31" r="1.5" />
      </g>
    </svg>
  );
}

/** Just the bow tie — used by the theme toggle. */
export function BowTie({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="20 7 24 12" aria-hidden="true" focusable="false">
      <path d="M30 12.6 22.6 8.3c-.9-.5-1.6 0-1.6 1v7.4c0 1 .7 1.5 1.6 1L30 13.4z" />
      <path d="M34 12.6l7.4-4.3c.9-.5 1.6 0 1.6 1v7.4c0 1-.7 1.5-1.6 1L34 13.4z" />
      <rect x="29.4" y="10.4" width="5.2" height="5.2" rx="1.4" />
    </svg>
  );
}
