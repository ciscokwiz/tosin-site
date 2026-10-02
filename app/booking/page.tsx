import type { Metadata } from "next";
import { site } from "@/data/site";
import { mailtoLink, telLink, whatsappLink } from "@/lib/format";
import { breadcrumbLd } from "@/lib/seo";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import { Mark } from "@/components/Mark";

export const metadata: Metadata = {
  title: "Book an MC in Lagos — Check The Corporate Emcee's Availability",
  description:
    "Book Oluwatosin Aina, The Corporate Emcee, for your conference, gala, product launch, award ceremony or wedding. Send your date and venue on WhatsApp in under a minute.",
  alternates: { canonical: "/booking/" },
  keywords: ["book an MC Lagos", "hire event host Nigeria", "wedding MC booking Lagos", "corporate MC availability"],
};

export default function BookingPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd("Booking", "/booking/")} />

      <section className="page-hero stage" aria-labelledby="booking-title">
        <Mark className="page-hero__mark" />
        <div className="wrap" style={{ display: "grid", gap: 40 }}>
          <div className="page-hero__grid hero-in">
            <div style={{ display: "grid", gap: 22 }}>
              <p className="eyebrow">Hold the date</p>
              <h1 id="booking-title" className="h1">Book The Corporate <em>Emcee.</em></h1>
            </div>
            <p className="lead">
              Share the date, venue and type of event. The form writes the message for you &mdash; you send it
              on WhatsApp or by email, and Tosin replies with availability.
            </p>
          </div>
          <div className="channels hero-in">
            <a className="channel" href={whatsappLink(`Hello ${site.brand}, I'd like to check your availability.`)} target="_blank" rel="noopener">
              <small>Fastest &middot; WhatsApp</small>
              <b>{site.contact.phoneDisplay}</b>
            </a>
            <a className="channel" href={telLink}>
              <small>Call</small>
              <b>{site.contact.phoneDisplay}</b>
            </a>
            <a className="channel" href={mailtoLink("Booking enquiry", `Hello ${site.brand},\n\n`)}>
              <small>Email</small>
              <b>{site.contact.email}</b>
            </a>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Booking form">
        <div className="wrap">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
