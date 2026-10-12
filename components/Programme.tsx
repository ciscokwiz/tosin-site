import { process as steps } from "@/data/process";
import { site } from "@/data/site";
import { Mark } from "./Mark";

/* How a booking runs, printed as a real event programme: each step and
   what happens at it (no dates, so the steps read as a sequence). */
export function Programme() {
  return (
    <article className="programme-card" aria-labelledby="programme-title">
      <Mark className="programme-card__mark" />
      <p className="programme-card__kicker">{site.brand} presents</p>
      <h3 id="programme-title" className="programme-card__title">Run of Show</h3>
      <ol className="programme-card__list">
        {steps.map((s) => (
          <li key={s.title}>
            <p className="programme-card__item">{s.title}</p>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="programme-card__foot">Programme subject to the MC&rsquo;s discretion</p>
    </article>
  );
}
