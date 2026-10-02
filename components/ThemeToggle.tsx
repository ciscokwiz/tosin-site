"use client";

import { useEffect, useState } from "react";
import { BowTie } from "./TuxMark";

/* The bow tie flips when the theme changes. The real theme is applied by
   the inline script in app/layout.tsx before the first paint. */
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("tce-theme", next); } catch { /* private mode */ }
    setDark(next === "dark");
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={dark ?? undefined}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Lights up" : "Lights down"}
    >
      <BowTie />
    </button>
  );
}
