import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Curtain } from "@/components/Curtain";
import { MarkSprite } from "@/components/MarkSprite";
import { MotionEngine } from "@/components/MotionEngine";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { personLd, serviceLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Corporate MC & Event Host in Lagos, Nigeria | ${site.brand}`,
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.person }],
  keywords: ["MC in Lagos", "corporate MC Nigeria", "event host Lagos", "wedding MC Lagos", "conference moderator Nigeria", "The Corporate Emcee", "Oluwatosin Aina"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: site.brand,
    title: `${site.brand} — Event Host & MC, Lagos`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.brand }],
  },
  twitter: { card: "summary_large_image", title: `${site.brand} — Event Host & MC`, description: site.description, images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#412d63",
  width: "device-width",
  initialScale: 1,
};

/* Runs before first paint: picks the theme (light unless the visitor chose dark), turns on
   scroll reveals, and decides whether the once-per-session intro plays. */
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('tce-theme');if(t!=='dark')t='light';d.dataset.theme=t}catch(e){d.dataset.theme='light'}d.classList.add('js');var r=matchMedia('(prefers-reduced-motion: reduce)').matches;try{if(!r&&!sessionStorage.getItem('tce-intro')){d.classList.add('intro');sessionStorage.setItem('tce-intro','1')}}catch(e){}setTimeout(function(){if(!window.__tceMotion){d.classList.remove('js');d.classList.add('intro-over')}},4000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={personLd} />
        <JsonLd data={serviceLd} />
      </head>
      <body>
        <MarkSprite />
        <a className="skip-link" href="#main">Skip to content</a>
        <Curtain />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MotionEngine />
        <SmoothScroll />
      </body>
    </html>
  );
}
