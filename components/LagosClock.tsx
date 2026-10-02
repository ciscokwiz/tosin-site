"use client";

import { useEffect, useState } from "react";

/* Live Lagos time in the footer — "the doors are open". */
export function LagosClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="clock">
      <i aria-hidden="true" />
      Lagos{time ? <> &middot; <span className="num">{time}</span> WAT</> : null}
    </span>
  );
}
