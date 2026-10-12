import { packages } from "@/data/rates";

/* Booking log. The booking form still opens WhatsApp or email for the
   visitor to send; alongside that it posts the same details here, and we
   add them as a new row in The Corporate Emcee's Notion bookings database.

   Needs two environment variables (set them in Vercel, never in the repo):
     NOTION_API_KEY               the integration's secret
     NOTION_BOOKINGS_DATABASE_ID  the database the integration is shared with

   Column names don't have to match exactly: each detail goes into the first
   column whose name appears in COLUMNS below and whose type fits. Every
   detail is also written into the page body, so nothing is lost if a column
   is missing. A "Status" column (status or select) is set to NEW_STATUS. */

const NOTION_VERSION = "2022-06-28";

/* Every new enquiry starts here; must match an option in the Status column. */
const NEW_STATUS = "New Inquiry";

type Booking = {
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
  budget: string;
  notes: string;
  channel: string;
};

/* Longest answer each field accepts, matching the form's own limits. */
const LIMITS: Record<keyof Booking, number> = {
  name: 80, org: 120, phone: 24, email: 120, pkg: 60, eventName: 120,
  date: 10, time: 5, venue: 160, guests: 20, budget: 40, notes: 1000, channel: 10,
};

/* Candidate column names for each detail, compared case-insensitively. */
const COLUMNS: Record<string, string[]> = {
  org: ["organisation", "organization", "company", "company or family", "family", "client"],
  phone: ["phone", "phone / whatsapp", "whatsapp", "phone number"],
  email: ["email", "e-mail"],
  pkg: ["package", "event type", "type of event", "type"],
  eventName: ["event", "event name"],
  date: ["date", "event date"],
  venue: ["venue", "venue or city", "location", "city"],
  guests: ["guests", "expected guests", "guest count"],
  notes: ["notes", "anything else", "details"],
  price: ["price", "from price", "rate"],
  budget: ["budget", "client budget"],
  channel: ["channel", "sent via", "source"],
};

type Property = { id: string; type: string };
let schema: { title: string; props: Record<string, Property & { name: string }> } | null = null;

function notion(path: string, init?: RequestInit) {
  return fetch(`https://api.notion.com/v1/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
  });
}

async function loadSchema(databaseId: string) {
  if (schema) return schema;
  const res = await notion(`databases/${databaseId}`);
  if (!res.ok) throw new Error(`Notion database lookup failed (${res.status})`);
  const db = (await res.json()) as { properties: Record<string, Property> };
  const props: Record<string, Property & { name: string }> = {};
  let title = "Name";
  for (const [name, p] of Object.entries(db.properties)) {
    props[name.trim().toLowerCase()] = { ...p, name };
    if (p.type === "title") title = name;
  }
  schema = { title, props };
  return schema;
}

const text = (content: string) => [{ type: "text", text: { content } }];

/* The Notion value for `value` in a column of type `type`, or null if the
   column's type can't hold it. */
function cell(type: string, value: string | number, kind: string) {
  if (typeof value === "number") return type === "number" ? { number: value } : null;
  if (kind === "budget" && type === "number") {
    // "₦2.5m" or "2,500,000" → 2500000; anything vaguer stays in the page body
    const m = value.replace(/[,\s₦]/g, "").match(/^(\d+(?:\.\d+)?)(k|m)?$/i);
    if (!m) return null;
    const mult = { k: 1e3, m: 1e6 }[m[2]?.toLowerCase() as "k" | "m"] ?? 1;
    return { number: Math.round(Number(m[1]) * mult) };
  }
  switch (type) {
    case "rich_text": return { rich_text: text(value) };
    case "phone_number": return kind === "phone" ? { phone_number: value } : null;
    case "email": return kind === "email" ? { email: value } : null;
    case "select": return { select: { name: value.replace(/,/g, " ") } };
    case "date": return kind === "date" ? { date: { start: value } } : null;
    default: return null;
  }
}

function clean(raw: unknown): Booking | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const b = {} as Booking;
  for (const key of Object.keys(LIMITS) as (keyof Booking)[]) {
    const v = typeof r[key] === "string" ? (r[key] as string) : "";
    b[key] = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, LIMITS[key]);
  }
  if (!b.name || !b.phone || !b.pkg || !b.venue || !/^\d{4}-\d{2}-\d{2}$/.test(b.date)) return null;
  if (b.time && !/^\d{2}:\d{2}$/.test(b.time)) b.time = "";
  return b;
}

export async function POST(request: Request) {
  const databaseId = process.env.NOTION_BOOKINGS_DATABASE_ID;
  if (!process.env.NOTION_API_KEY || !databaseId) return new Response(null, { status: 503 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  // Hidden field that people never see; bots that fill it in are ignored.
  if ((raw as { website?: string })?.website) return new Response(null, { status: 204 });
  const b = clean(raw);
  if (!b) return new Response(null, { status: 400 });

  const p = packages.find((x) => x.id === b.pkg);
  const pkgName = p ? p.name : "Not sure yet";
  const values: Record<string, string | number> = {
    org: b.org,
    phone: b.phone,
    email: b.email,
    pkg: pkgName,
    eventName: b.eventName,
    // Lagos is UTC+1 all year.
    date: b.time ? `${b.date}T${b.time}:00+01:00` : b.date,
    venue: b.venue,
    guests: b.guests,
    budget: b.budget,
    notes: b.notes,
    price: p && p.price !== null ? p.price : "",
    channel: b.channel === "email" ? "Email" : b.channel === "whatsapp" ? "WhatsApp" : "",
  };

  try {
    const s = await loadSchema(databaseId);
    const properties: Record<string, unknown> = { [s.title]: { title: text(b.name) } };
    const status = s.props["status"];
    if (status?.type === "status") properties[status.name] = { status: { name: NEW_STATUS } };
    else if (status?.type === "select") properties[status.name] = { select: { name: NEW_STATUS } };
    for (const [kind, names] of Object.entries(COLUMNS)) {
      const value = values[kind];
      if (value === "" || value === undefined) continue;
      for (const n of names) {
        const col = s.props[n];
        if (!col || col.type === "title" || properties[col.name]) continue;
        const v = cell(col.type, value, kind);
        if (v) {
          properties[col.name] = v;
          break;
        }
      }
    }

    const lines = [
      `Name: ${b.name}`,
      b.org && `Organisation / family: ${b.org}`,
      `Event type: ${pkgName}${typeof values.price === "number" ? ` (from ₦${values.price.toLocaleString("en-NG")})` : ""}`,
      b.eventName && `Event: ${b.eventName}`,
      `Date: ${b.date}${b.time ? ` ${b.time}` : ""}`,
      `Venue / city: ${b.venue}`,
      b.guests && `Guests: ${b.guests}`,
      b.budget && `Budget: ${b.budget}`,
      `Phone: ${b.phone}`,
      b.email && `Email: ${b.email}`,
      b.notes && `Notes: ${b.notes}`,
      values.channel && `Sent via: ${values.channel}`,
    ].filter(Boolean) as string[];

    const res = await notion("pages", {
      method: "POST",
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
        children: lines.map((l) => ({ object: "block", type: "paragraph", paragraph: { rich_text: text(l) } })),
      }),
    });
    if (!res.ok) {
      console.error("Notion page create failed", res.status, await res.text());
      schema = null; // the database may have changed; look it up again next time
      return new Response(null, { status: 502 });
    }
    return new Response(null, { status: 204 });
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 502 });
  }
}
