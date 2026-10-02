import Link from "next/link";
import { faq } from "@/data/faq";
import { faqLd } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { Clients } from "@/components/Clients";
import { MeetHost } from "@/components/MeetHost";
import { RangeRail } from "@/components/RangeRail";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { Programme } from "@/components/Programme";
import { Gallery } from "@/components/Gallery";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { StageDust } from "@/components/StageDust";

export default function Home() {
  const homeFaq = faq.filter((f) => f.home);

  return (
    <>
      <JsonLd data={faqLd(homeFaq)} />
      <StageDust />

      <Hero />
      <Clients />
      <MeetHost />
      <RangeRail />
      <VideoTestimonials />

      {/* ---------------- HOW BOOKING WORKS ---------------- */}
      <section className="section stage show" aria-labelledby="show-title" data-depth>
        <div className="wrap show__grid">
          <div className="show__head">
            <p className="eyebrow">From first message to final applause</p>
            <h2 id="show-title" className="h2">How booking <em>works.</em></h2>
            <p className="lead">Five clear steps, so you and your planner always know what comes next.</p>
            <div className="btn-row">
              <Link href="/booking/" className="btn btn--sm" data-magnetic>Start an enquiry</Link>
              <Link href="/rates/" className="btn btn--sm btn--ghost">See rates</Link>
            </div>
          </div>
          <Programme />
        </div>
      </section>

      <Gallery />

      {/* ---------------- FAQ ---------------- */}
      <section className="section faq-section" aria-labelledby="faq-title" data-depth="y">
        <div className="wrap faq-layout">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title" className="h2">Quick <em>answers.</em></h2>
            <p>Anything else? <Link href="/booking/">Send a message</Link> and Tosin will reply.</p>
          </div>
          <Faq items={homeFaq} />
        </div>
      </section>
    </>
  );
}
