"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { addOns, callTimeClause, clauseNotes, extraHostClause, packages, rateCategories, ratesAreSamples } from "@/data/rates";
import { site } from "@/data/site";
import { formatNaira, formatNumber, whatsappLink } from "@/lib/format";
import { WhatsAppIcon } from "./Icons";

/* Pick a package and extras → a running estimate you can send on WhatsApp. */
export function Estimator() {
  const [pkgId, setPkgId] = useState(packages.find((p) => p.featured)?.id ?? packages[0].id);
  const [extras, setExtras] = useState<string[]>([]);
  const pkg = packages.find((p) => p.id === pkgId) ?? packages[0];
  const chosen = addOns.filter((a) => extras.includes(a.id));

  const { total, onRequest } = useMemo(() => {
    let sum = 0;
    let req = pkg.price === null;
    sum += pkg.price ?? 0;
    for (const a of chosen) {
      if (a.price === null) req = true;
      else sum += a.price;
    }
    return { total: sum, onRequest: req };
  }, [pkg, chosen]);

  const message = [
    `Hello ${site.brand}, I'd like a quote.`,
    ``,
    `Package: ${pkg.name} (${formatNaira(pkg.price)})`,
    chosen.length ? `Extras: ${chosen.map((a) => `${a.name} (${formatNaira(a.price)})`).join(", ")}` : `Extras: none`,
    `Estimate on the site: ${total ? formatNaira(total) : "on request"}${onRequest ? " + items on request" : ""}`,
    ``,
    `Event date: `,
    `Venue / city: `,
    ``,
    `Noted: ${callTimeClause} ${extraHostClause}`,
  ].join("\n");

  return (
    <div className="estimator__grid">
      <div style={{ display: "grid", gap: 24 }}>
        <div className="field">
          <label htmlFor="est-package">Package</label>
          <select id="est-package" className="select" value={pkgId} onChange={(e) => setPkgId(e.target.value)}>
            {rateCategories.map((c) => (
              <optgroup key={c.id} label={c.label}>
                {packages.filter((p) => p.category === c.id).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatNaira(p.price)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <fieldset className="field">
          <legend>Extras</legend>
          <div>
            {addOns.map((a) => (
              <label className="checkrow" key={a.id}>
                <input
                  type="checkbox"
                  checked={extras.includes(a.id)}
                  onChange={(e) =>
                    setExtras((xs) => (e.target.checked ? [...xs, a.id] : xs.filter((x) => x !== a.id)))
                  }
                />
                <span>
                  {a.name}
                  <small>{a.note}</small>
                </span>
                <b className="num">{a.price === null ? "At cost" : `+${formatNaira(a.price)}`}</b>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="total" aria-live="polite">
        <span className="small muted">Your estimate{ratesAreSamples ? " (sample rates)" : ""}</span>
        <p className="price">
          {total > 0 ? (<><span className="cur">₦</span>{formatNumber(total)}</>) : "On request"}
        </p>
        <dl>
          <div><dt>{pkg.name}</dt><dd className="num">{formatNaira(pkg.price)}</dd></div>
          {chosen.map((a) => (
            <div key={a.id}><dt>{a.name}</dt><dd className="num">{a.price === null ? "At cost" : formatNaira(a.price)}</dd></div>
          ))}
        </dl>
        {onRequest && <p className="small muted">Some items are quoted on request and are not in the total.</p>}
        <ul className="total__notes">
          {clauseNotes.map((n) => <li key={n}>{n}</li>)}
        </ul>
        <div className="btn-row">
          <a className="btn" href={whatsappLink(message)} target="_blank" rel="noopener">
            <WhatsAppIcon /> Send this estimate
          </a>
          <Link className="btn btn--ghost" href={`/booking/?package=${pkg.id}`}>Book this</Link>
        </div>
      </div>
    </div>
  );
}
