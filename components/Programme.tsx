import { process as steps } from "@/data/process";
import { Mark } from "./Mark";

/* How a booking runs, printed as a real event programme: item, dotted
   leader, time. */
export function Programme() {
  return (
    <article className="programme-card" aria-labelledby="programme-title">
      <Mark className="programme-card__mark" />
      <p className="programme-card__kicker">The Corporate Emcee presents</p>
      <h3 id="programme-title" className="programme-card__title">Run of Show</h3>
      <ol className="programme-card__list">
        {steps.map((s) => (
          <li key={s.title}>
            <div className="programme-card__row">
              <span className="programme-card__item">{s.title}</span>
              <span className="leader" aria-hidden="true" />
              <time>{s.time}</time>
            </div>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="programme-card__foot">Programme subject to the MC&rsquo;s discretion</p>
    </article>
  );
}
