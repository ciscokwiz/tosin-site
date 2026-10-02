import { site } from "@/data/site";
import { packages } from "@/data/rates";

export const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.person,
  alternateName: [site.brand, site.shortBrand, site.nickname],
  jobTitle: "Event Host and Master of Ceremonies",
  url: site.url,
  image: `${site.url}/og.png`,
  email: site.contact.email,
  telephone: site.contact.phone,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Obafemi Awolowo University" },
  knowsAbout: ["Event hosting", "Master of ceremonies", "Corporate events", "Conference moderation", "Weddings", "Product launches", "Award ceremonies"],
  address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "NG" },
  sameAs: Object.values(site.social).filter(Boolean),
};

export const serviceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: site.brand,
  description: site.description,
  url: site.url,
  image: `${site.url}/og.png`,
  telephone: site.contact.phone,
  email: site.contact.email,
  priceRange: "₦₦₦",
  currenciesAccepted: "NGN",
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "Lagos", addressCountry: "NG" },
  areaServed: [{ "@type": "Country", name: "Nigeria" }, "International"],
  provider: { "@id": `${site.url}/#person` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "MC and event hosting packages",
    itemListElement: packages.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: p.name, description: p.summary },
    })),
  },
};

export function breadcrumbLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
