"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { range } from "@/data/range";

/* "The Range Master": a tablist of event formats. The dial underneath
   slides from boardroom to dance floor as you move through the range. */
export function RangeSwitcher() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = range[index];
  const pct = range.length > 1 ? (index / (range.length - 1)) * 100 : 0;

  function select(i: number, focus = false) {
    setIndex(i);
    if (focus) tabs.current[i]?.focus();
  }

  function onKey(e: React.KeyboardEvent) {
    const last = range.length - 1;
    const map: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  }

  return (
    <div className="range">
      <div className="range__tabs" role="tablist" aria-label="Event formats" onKeyDown={onKey}>
        {range.map((r, i) => (
          <button
            key={r.id}
            ref={(el) => { tabs.current[i] = el; }}
            id={`tab-${r.id}`}
            role="tab"
            type="button"
            className="range__tab"
            aria-selected={i === index}
            aria-controls="range-panel"
            tabIndex={i === index ? 0 : -1}
            onClick={() => select(i)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div
        id="range-panel"
        className="range__panel"
        role="tabpanel"
        aria-labelledby={`tab-${item.id}`}
      >
        <div className="range__body" key={item.id}>
          <h3 className="h3">{item.title}</h3>
          <p className="prose">{item.body}</p>
          <ul aria-label="What this includes">
            {item.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p>
            <Link href={`/rates/#${item.rates}`}>See {item.label.toLowerCase()} rates</Link>
          </p>
        </div>
        <div className="dial" aria-hidden="true">
          <div className="dial__track">
            <div className="dial__fill" style={{ width: `${pct}%` }} />
            <svg className="dial__knob" style={{ left: `${pct}%` }} viewBox="20 7 24 12"><BowTiePaths /></svg>
          </div>
          <div className="dial__ends"><span>Boardroom</span><span>Dance floor</span></div>
        </div>
      </div>
    </div>
  );
}

function BowTiePaths() {
  return (
    <>
      <path d="M30 12.6 22.6 8.3c-.9-.5-1.6 0-1.6 1v7.4c0 1 .7 1.5 1.6 1L30 13.4z" />
      <path d="M34 12.6l7.4-4.3c.9-.5 1.6 0 1.6 1v7.4c0 1-.7 1.5-1.6 1L34 13.4z" />
      <rect x="29.4" y="10.4" width="5.2" height="5.2" rx="1.4" />
    </>
  );
}
