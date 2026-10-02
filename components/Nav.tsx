"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { whatsappLink } from "@/lib/format";
import { Mark } from "./Mark";
import { ThemeToggle } from "./ThemeToggle";
import { WhatsAppIcon } from "./Icons";
import { lockScroll } from "./SmoothScroll";

function isCurrent(pathname: string, href: string) {
  const clean = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  return clean(pathname) === clean(href);
}

export function Nav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    lockScroll(true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lockScroll(false);
    };
  }, [open]);

  return (
    <>
      <header className="nav">
        <div className="nav__bar">
          <Link href="/" className="brand" aria-label={`${site.brand} — home`}>
            <Mark className="brand__mark" />
            <span className="brand__name">
              {site.brand}
              <small>{site.person}</small>
            </span>
          </Link>
          {/* House lights sit in the centre of the bar */}
          <div className="nav__center"><ThemeToggle /></div>
          <div className="nav__end">
            <nav aria-label="Main">
              <ul className="nav__links">
                {nav.filter((item) => item.href !== "/booking/" && item.href !== "/").map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link href="/booking/" className="btn btn--sm nav__book" aria-current={isCurrent(pathname, "/booking/") ? "page" : undefined}>Book Tosin</Link>
            <button
              type="button"
              className="nav__menu"
              aria-expanded={open}
              aria-controls="programme-sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="programme-sheet" className="sheet" data-open={open} aria-hidden={!open} inert={!open}>
        <p className="eyebrow sheet__label">Tonight&rsquo;s programme</p>
        <nav aria-label="Mobile">
          <ol>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
                  <span className="num">{item.time}</span>
                  <strong>{item.label}</strong>
                  <small>{item.programme}</small>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="btn-row">
          <a className="btn" href={whatsappLink(`Hello ${site.brand}, I'd like to check your availability.`)} target="_blank" rel="noopener">
            <WhatsAppIcon /> WhatsApp
          </a>
          <a className="btn btn--ghost" href={`mailto:${site.contact.email}`}>Email</a>
        </div>
      </div>
    </>
  );
}
