import Link from "next/link";
import { faq } from "@/data/faq";
import { faqLd } from "@/lib/seo";
import { FilaRule } from "@/components/Mark";
import { Hero } from "@/components/Hero";
import { Clients } from "@/components/Clients";
import { MeetHost } from "@/components/MeetHost";
import { RangeRail } from "@/components/RangeRail";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { Programme } from "@/components/Programme";
import { Gallery } from "@/components/Gallery";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(faq)} />

      <Hero />
      <Clients />
      <MeetHost />
      <RangeRail />
      <VideoTestimonials />

      {/* ---------------- RUN OF SHOW ---------------- */}
      <section className="section stage show" aria-labelledby="show-title">
        <div className="wrap show__grid">
          <div className="show__head">
            <p className="eyebrow">From first message to final applause</p>
            <h2 id="show-title" className="h2">How a booking <em>runs.</em></h2>
            <p className="lead">No surprises on the night. Every booking follows the same programme, so your planner always knows what happens next.</p>
            <div className="btn-row">
              <Link href="/booking/" className="btn" data-magnetic>Start with an enquiry</Link>
              <Link href="/rates/" className="btn btn--ghost">See the rate card</Link>
            </div>
          </div>
          <Programme />
        </div>
      </section>

      <Gallery />

      {/* ---------------- FAQ ---------------- */}
      <section className="section" aria-labelledby="faq-title">
        <div className="wrap">
          <FilaRule />
          <div className="faq-layout">
            <div className="section-head">
              <p className="eyebrow">Questions</p>
              <h2 id="faq-title" className="h2">Before you <em>book.</em></h2>
              <p>Still unsure? Ask on WhatsApp. It&rsquo;s the fastest way to reach Tosin.</p>
            </div>
            <Faq items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
