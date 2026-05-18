import { site } from "./site";
import { faq } from "@/content/faq";
import { services } from "@/content/services";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  sameAs: [site.telegram, site.github].filter(Boolean),
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name} — ${site.role}`,
  description: site.description,
  url: site.url,
  image: `${site.url}${site.ogImage}`,
  priceRange: "50000 ₽ — 400000+ ₽",
  email: site.email,
  telephone: site.phone,
  areaServed: { "@type": "Country", name: "Russia" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Услуги веб-разработки",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.tagline,
      },
      priceSpecification: {
        "@type": "PriceSpecification",
        price: s.price,
        priceCurrency: "RUB",
      },
    })),
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  inLanguage: "ru-RU",
  publisher: { "@type": "Person", name: site.name },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })),
};

export function breadcrumbsSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
