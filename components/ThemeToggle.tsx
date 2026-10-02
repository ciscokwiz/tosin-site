"use client";

import { useEffect, useState } from "react";
import { Mark } from "./Mark";

/* House lights. The fila tips as the lights change. The theme itself is
   applied by the inline script in app/layout.tsx before the first paint. */
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggle() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("tce-theme", next); } catch { /* private mode */ }
    setDark(next === "dark");
    setTip((t) => t + 1);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={dark ?? undefined}
      aria-label={dark ? "Turn the house lights up (light theme)" : "Dim the house lights (dark theme)"}
      title={dark ? "Lights up" : "Lights down"}
      data-tip={tip ? (tip % 2 ? "a" : "b") : undefined}
    >
      <Mark variant="fila" />
    </button>
  );
}
