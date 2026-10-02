import Link from "next/link";
import { Mark } from "@/components/Mark";

export default function NotFound() {
  return (
    <section className="stage not-found">
      <div className="wrap" style={{ display: "grid", gap: 24, justifyItems: "center" }}>
        <Mark title="The Corporate Emcee" />
        <p className="eyebrow">Error 404</p>
        <h1 className="h2">This seat isn&rsquo;t on the <em>seating chart.</em></h1>
        <p className="lead">The page you were looking for has left the hall. The programme continues on the home page.</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link className="btn" href="/">Back to the programme</Link>
          <Link className="btn btn--ghost" href="/booking/">Book Tosin</Link>
        </div>
      </div>
    </section>
  );
}
