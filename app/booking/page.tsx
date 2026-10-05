import type { Metadata } from "next";
import "@fontsource-variable/grenze-gotisch/wght.css";
import { site } from "@/data/site";
import { meetPhotos } from "@/data/photos";
import { mailtoLink, telLink, whatsappLink } from "@/lib/format";
import { breadcrumbLd } from "@/lib/seo";
import { BookingForm } from "@/components/BookingForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { WhatsAppIcon } from "@/components/Icons";

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

      <PageHero
        id="booking-title"
        eyebrow="Booking"
        title={<>Let&rsquo;s hold <em>your date.</em></>}
        lede="Tell me about your event. The form writes the message for you; send it on WhatsApp or email and I’ll reply with availability."
        photo={meetPhotos[2]}
        chips={["1,500+ events hosted", "Lagos & worldwide", "WhatsApp first"]}
      >
        <ul className="contact-pills" aria-label="Other ways to reach Tosin">
          <li>
            <a href={whatsappLink(`Hello ${site.brand}, I'd like to check your availability.`)} target="_blank" rel="noopener">
              <WhatsAppIcon /> WhatsApp
            </a>
          </li>
          <li>
            <a href={telLink}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" fill="currentColor" /></svg>
              {site.contact.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={mailtoLink("Booking enquiry", `Hello ${site.brand},\n\n`)}>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm8 7.2L4.9 7.4V17h14.2V7.4z" fill="currentColor" /></svg>
              Email
            </a>
          </li>
        </ul>
      </PageHero>

      <section className="section booking-section" aria-label="Booking form">
        <div className="wrap">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
