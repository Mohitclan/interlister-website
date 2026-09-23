import { SITE_URL, site } from "./site";
import { faqs } from "./content";

export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: site.name,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        description: site.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: site.name,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Marketplace listing management",
        operatingSystem: "Web",
        url: SITE_URL,
        description: site.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        featureList: [
          "Unified product inventory",
          "One-click sync to Amazon, Flipkart and Meesho",
          "Selective field resync: name, description, price, inventory",
          "Real-time sync progress via Server-Sent Events",
          "Marketplace connection management",
          "Sync history and job logs",
          "Meesho catalog upload and resync via browser automation",
          "Flipkart gated brand detection with fallback brand name",
        ],
        audience: { "@type": "BusinessAudience", audienceType: "E-commerce sellers in India" },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
