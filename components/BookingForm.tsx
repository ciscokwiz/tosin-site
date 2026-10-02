"use client";

import { useEffect, useRef, useState } from "react";
import { packages, rateCategories } from "@/data/rates";
import { site } from "@/data/site";
import { formatNaira, mailtoLink, whatsappLink } from "@/lib/format";
import { TuxMark } from "./TuxMark";
import { WhatsAppIcon } from "./Icons";

/* Booking enquiry. Nothing is stored: the form writes a tidy message and
   opens WhatsApp (or email) with it, ready to send. The invitation card
   on the right fills in live as the visitor types. */

const GUESTS = ["Under 100", "100–300", "300–600", "600+"] as const;

type Form = {
  name: string;
  org: string;
  phone: string;
  email: string;
  pkg: string;
  eventName: string;
  date: string;
  time: string;
  venue: string;
  guests: string;
  notes: string;
};

const EMPTY: Form = { name: "", org: "", phone: "", email: "", pkg: "", eventName: "", date: "", time: "", venue: "", guests: "", notes: "" };

const REQUIRED: { key: keyof Form; message: string }[] = [
  { key: "name", message: "Please add your name." },
  { key: "phone", message: "Please add a phone or WhatsApp number." },
  { key: "pkg", message: "Please choose the type of event." },
  { key: "date", message: "Please choose the event date." },
  { key: "venue", message: "Please add the venue or city." },
];

function prettyDate(value: string) {
  if (!value) return "";
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function prettyTime(value: string) {
  if (!value) return "";
  const [h, m] = value.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}${m ? `:${String(m).padStart(2, "0")}` : ""}${suffix}`;
}

function pkgLabel(id: string) {
  if (id === "unsure") return "Not sure yet";
  const p = packages.find((x) => x.id === id);
  return p ? p.name : "";
}

export function BookingForm() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);
  const [copied, setCopied] = useState(false);
  const [minDate, setMinDate] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  // Pre-select a package from ?package=… (links on the Rates page).
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("package");
    if (id && packages.some((p) => p.id === id)) setForm((f) => ({ ...f, pkg: id }));
    const now = new Date();
    setMinDate(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (sent) sentRef.current?.focus();
  }, [sent]);

  const update = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function message() {
    const p = packages.find((x) => x.id === form.pkg);
    const opt = (cond: string, line: string) => (cond ? line : null);
    const lines: (string | null)[] = [
      `Hello ${site.brand}, I'd like to book you for an event.`,
      "",
      `• Name: ${form.name}`,
      opt(form.org, `• Organisation / family: ${form.org}`),
      `• Event type: ${pkgLabel(form.pkg)}${p && p.price !== null ? ` (from ${formatNaira(p.price)})` : ""}`,
      opt(form.eventName, `• Event: ${form.eventName}`),
      `• Date: ${prettyDate(form.date)}${form.time ? `, ${prettyTime(form.time)}` : ""}`,
      `• Venue / city: ${form.venue}`,
      opt(form.guests, `• Guests: ${form.guests}`),
      `• Phone: ${form.phone}`,
      opt(form.email, `• Email: ${form.email}`),
      opt(form.notes, ""),
      opt(form.notes, `Notes: ${form.notes}`),
      "",
      "Is this date available?",
    ];
    return lines.filter((l): l is string => l !== null).join("\n");
  }

  function validate() {
    const next: Partial<Record<keyof Form, string>> = {};
    for (const r of REQUIRED) if (!form[r.key].trim()) next[r.key] = r.message;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "That email doesn't look right.";
    if (form.phone && form.phone.replace(/\D/g, "").length < 7) next.phone = "That number looks too short.";
    setErrors(next);
    const first = REQUIRED.map((r) => r.key).concat("email").find((k) => next[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  }

  function send(channel: "whatsapp" | "email") {
    if (!validate()) return;
    if (channel === "whatsapp") {
      const url = whatsappLink(message());
      // No "noopener" feature here: with it, window.open always returns null
      // and we could not tell a blocked pop-up from a successful one.
      const win = window.open(url, "_blank");
      if (win) win.opener = null;
      else window.location.href = url;
    } else {
      window.location.href = mailtoLink(`Booking enquiry — ${pkgLabel(form.pkg)} on ${prettyDate(form.date)}`, message());
    }
    setSent(channel);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const err = (k: keyof Form) =>
    errors[k] ? <span className="error" id={`${k}-error`} role="alert">{errors[k]}</span> : null;
  const a11y = (k: keyof Form) => ({
    name: k,
    id: `f-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  const host = form.org || form.name;

  return (
    <div className="booking">
      <div style={{ display: "grid", gap: 24 }}>
        {sent && (
          <div className="sent" ref={sentRef} tabIndex={-1}>
            <h2>Your message is ready.</h2>
            <p>
              {sent === "whatsapp"
                ? "WhatsApp should have opened with your enquiry written out — just press send."
                : "Your email app should have opened with your enquiry written out — just press send."}{" "}
              If nothing opened, copy the message and send it to {site.contact.phoneDisplay} or {site.contact.email}.
            </p>
            <div className="btn-row">
              <button type="button" className="btn btn--sm" onClick={copy}>{copied ? "Copied" : "Copy message"}</button>
              <button type="button" className="btn btn--sm btn--ghost" onClick={() => setSent(null)}>Edit details</button>
            </div>
          </div>
        )}

        <form
          ref={formRef}
          className="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            send("whatsapp");
          }}
          aria-labelledby="form-title"
        >
          <h2 id="form-title" className="h3">Tell Tosin about your event</h2>
          <p className="small muted">Fields marked <span className="req">*</span> are required. Nothing is stored on this website &mdash; your details go straight into a WhatsApp or email message you send yourself.</p>

          <div className="form__row">
            <div className="field">
              <label htmlFor="f-name">Your name <span className="req">*</span></label>
              <input className="input" type="text" autoComplete="name" value={form.name} onChange={update("name")} {...a11y("name")} />
              {err("name")}
            </div>
            <div className="field">
              <label htmlFor="f-org">Company or family <span className="hint">(optional)</span></label>
              <input className="input" type="text" autoComplete="organization" value={form.org} onChange={update("org")} {...a11y("org")} />
            </div>
          </div>

          <div className="form__row">
            <div className="field">
              <label htmlFor="f-phone">Phone / WhatsApp <span className="req">*</span></label>
              <input className="input" type="tel" inputMode="tel" autoComplete="tel" placeholder="+234…" value={form.phone} onChange={update("phone")} {...a11y("phone")} />
              {err("phone")}
            </div>
            <div className="field">
              <label htmlFor="f-email">Email <span className="hint">(optional)</span></label>
              <input className="input" type="email" autoComplete="email" value={form.email} onChange={update("email")} {...a11y("email")} />
              {err("email")}
            </div>
          </div>

          <div className="field">
            <label htmlFor="f-pkg">Type of event <span className="req">*</span></label>
            <select className="select" value={form.pkg} onChange={update("pkg")} {...a11y("pkg")}>
              <option value="">Choose one…</option>
              {rateCategories.map((c) => (
                <optgroup key={c.id} label={c.label}>
                  {packages.filter((p) => p.category === c.id).map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </optgroup>
              ))}
              <option value="unsure">Not sure yet</option>
            </select>
            {err("pkg")}
          </div>

          <div className="field">
            <label htmlFor="f-eventName">Event name <span className="hint">(optional — e.g. &ldquo;Annual Leadership Summit&rdquo;)</span></label>
            <input className="input" type="text" value={form.eventName} onChange={update("eventName")} {...a11y("eventName")} />
          </div>

          <div className="form__row">
            <div className="field">
              <label htmlFor="f-date">Date <span className="req">*</span></label>
              <input className="input" type="date" min={minDate} value={form.date} onChange={update("date")} {...a11y("date")} />
              {err("date")}
            </div>
            <div className="field">
              <label htmlFor="f-time">Start time <span className="hint">(optional)</span></label>
              <input className="input" type="time" value={form.time} onChange={update("time")} {...a11y("time")} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="f-venue">Venue or city <span className="req">*</span></label>
            <input className="input" type="text" autoComplete="address-level2" placeholder="e.g. Eko Hotel, Victoria Island" value={form.venue} onChange={update("venue")} {...a11y("venue")} />
            {err("venue")}
          </div>

          <fieldset className="field">
            <legend>Expected guests <span className="hint">(optional)</span></legend>
            <div className="chips">
              {GUESTS.map((g) => (
                <label className="chip" key={g}>
                  <input type="radio" name="guests" value={g} checked={form.guests === g} onChange={update("guests")} />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="f-notes">Anything else? <span className="hint">(optional — audience, dress code, VIPs, languages)</span></label>
            <textarea className="textarea" value={form.notes} onChange={update("notes")} {...a11y("notes")} />
          </div>

          <div className="form__actions">
            <button type="submit" className="btn"><WhatsAppIcon /> Send on WhatsApp</button>
            <button type="button" className="btn btn--ghost" onClick={() => send("email")}>Send by email</button>
          </div>
        </form>
      </div>

      <aside className="invite-wrap" aria-label="Preview of your booking">
        <p className="small muted">Your booking, as an invitation</p>
        <div className="invite">
          <TuxMark />
          <p className="invite__small">The pleasure of the company of</p>
          <p className="invite__name">The Corporate <em>Emcee</em></p>
          <p className="invite__small">is requested to host</p>
          <p className="invite__field" data-empty={!(form.eventName || form.pkg)}>
            {form.eventName || pkgLabel(form.pkg) || "your event"}
          </p>
          <span className="invite__rule" aria-hidden="true" />
          <p className="invite__field" data-empty={!form.date}>
            {form.date ? <>on {prettyDate(form.date)}{form.time && <span className="t">from {prettyTime(form.time)}</span>}</> : "on a date to be chosen"}
          </p>
          <p className="invite__field" data-empty={!form.venue}>{form.venue ? `at ${form.venue}` : "at your venue"}</p>
          <span className="invite__rule" aria-hidden="true" />
          <p className="invite__small">hosted by</p>
          <p className="invite__field" data-empty={!host}>{host || "you"}</p>
          {form.guests && <p className="invite__rsvp">{form.guests} guests</p>}
        </div>
      </aside>
    </div>
  );
}
