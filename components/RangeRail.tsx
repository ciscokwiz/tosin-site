import Link from "next/link";
import { range } from "@/data/range";
import { site } from "@/data/site";
import { Mark } from "./Mark";

/* "The Range Master": event formats on a horizontal rail, ordered from
   boardroom to dance floor. On wide screens the rail is pinned and scrolls
   sideways as you scroll down (MotionEngine); on phones it is a native
   swipe. The bow tie on the meter shows where on the range you are. */
export function RangeRail() {
  return (
    <section className="rail" data-rail aria-labelledby="range-title">
      <div className="rail__sticky">
        <div className="wrap rail__head">
          <div style={{ display: "grid", gap: 16 }}>
            <p className="eyebrow">{site.nickname}</p>
            <h2 id="range-title" className="h2">From the summit stage to the <em>dance</em> floor.</h2>
          </div>
          <p className="lead">
            The same host moderates a high-level summit on Thursday and energises a student crowd on Saturday.
            That range is where the nickname comes from.
          </p>
        </div>
        <div className="rail__viewport" data-rail-viewport tabIndex={0} aria-label="Event formats, scroll sideways">
          <ol className="rail__track" data-rail-track>
            {range.map((r) => (
              <li className="rail__card" key={r.id}>
                <p className="rail__label">{r.label}</p>
                <h3 className="rail__title">{r.title}</h3>
                <p className="rail__body">{r.body}</p>
                <p className="rail__points">{r.points.join(" · ")}</p>
                <Link className="rail__link" href={`/rates/#${r.rates}`}>
                  See rates<span className="visually-hidden"> for {r.label.toLowerCase()}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div className="wrap rail__meter" aria-hidden="true">
          <span>Boardroom</span>
          <div className="meter">
            <i className="meter__fill" data-rail-fill />
            <span className="meter__knob" data-rail-knob><Mark variant="bow" /></span>
          </div>
          <span>Dance floor</span>
        </div>
      </div>
    </section>
  );
}
