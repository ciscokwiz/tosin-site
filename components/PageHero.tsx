import type { ReactNode } from "react";
import type { Photo as PhotoData } from "@/data/photos";
import { Photo } from "./Photo";
import { Mark } from "./Mark";
import { StageDust } from "./StageDust";

/* Header for inner pages (Rates, Booking): a living stage — a slow aurora of
   purple and gold light, its own pocket of three.js stage dust, a photo card
   that tilts toward the mouse, and a few floating glass chips. */
export function PageHero({
  id,
  eyebrow,
  title,
  lede,
  photo,
  chips,
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  photo: PhotoData;
  chips: string[];
  children?: ReactNode;
}) {
  return (
    <section className="phero stage" aria-labelledby={id}>
      <div className="phero__aurora" aria-hidden="true"><i /><i /><i /></div>
      <StageDust contained />
      <div className="wrap phero__grid">
        <div className="phero__copy hero-in">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={id} className="phero__title">{title}</h1>
          <p className="phero__lede">{lede}</p>
          {children}
        </div>
        <div className="phero__visual hero-in" data-tilt aria-hidden="true">
          <figure className="phero__photo">
            <Photo photo={photo} sizes="(min-width: 900px) 34vw, 70vw" priority />
          </figure>
          <span className="phero__seal"><Mark /></span>
          {chips.map((c, i) => (
            <span key={c} className={`phero__chip phero__chip--${i + 1}`}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
