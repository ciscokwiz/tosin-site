import { site } from "@/data/site";

const naira = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 });

/** 1500000 → "₦1,500,000". null → "On request". */
export function formatNaira(value: number | null): string {
  return value === null ? "On request" : `₦${naira.format(value)}`;
}

/** Digits only, e.g. "1,500,000" — for when the ₦ sign is styled separately. */
export function formatNumber(value: number): string {
  return naira.format(value);
}

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoLink(subject: string, body: string): string {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const telLink = `tel:${site.contact.phone}`;
