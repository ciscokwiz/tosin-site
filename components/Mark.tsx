/* <Mark/> — every placement of Oluwatosin's fila & tuxedo goes through here.
   The artwork itself lives once in <MarkSprite/> (components/MarkSprite.tsx).

   Variants (each is a crop of the same artwork, same coordinates):
     full  fila + tuxedo           logo, hero, loader, footer, invitation seal
     fila  just the fila (cap)     dividers, marquee separators, theme toggle, favicon
     bow   just the bow tie        "Most booked" markers, small accents

   Recolour per placement with CSS variables on the element:
     --m-cloth --m-stripe --m-line --m-tux --m-bow --m-stud */

type Variant = "full" | "fila" | "bow";

const VIEWBOX: Record<Variant, string> = {
  full: "10 6 144 276",
  fila: "24 8 104 94",
  bow: "53 97 58 34",
};

export function Mark({
  variant = "full",
  className,
  title,
}: {
  variant?: Variant;
  className?: string;
  /** Accessible name. Omit when the mark is decorative. */
  title?: string;
}) {
  return (
    <svg
      className={["mark", `mark--${variant}`, className].filter(Boolean).join(" ")}
      viewBox={VIEWBOX[variant]}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {variant === "full" && <use href="#m-lapels" className="mark__lapels" />}
      {variant === "full" && <use href="#m-studs" className="mark__studs" />}
      {variant !== "fila" && <use href="#m-bow" className="mark__bow" />}
      {variant !== "bow" && <use href="#m-fila" className="mark__fila" />}
    </svg>
  );
}

/** A thin rule with the fila at its centre — the section divider. */
export function FilaRule({ className }: { className?: string }) {
  return (
    <div className={["fila-rule", className].filter(Boolean).join(" ")} aria-hidden="true">
      <span />
      <Mark variant="fila" />
      <span />
    </div>
  );
}
