const trimSlash = (url: string) => url.replace(/\/+$/, "");

export const SITE_URL = trimSlash(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
);

/** Base URL of the InterLister application (Next.js frontend of the app). */
export const APP_URL = trimSlash(
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
);

export const appLinks = {
  dashboard: `${APP_URL}/dashboard`,
  products: `${APP_URL}/products`,
  marketplaces: `${APP_URL}/marketplaces`,
};

export const site = {
  name: "InterLister",
  tagline: "One catalog. Every marketplace.",
  title: "InterLister — Amazon, Flipkart & Meesho Listing Management in One Dashboard",
  description:
    "InterLister is marketplace management software for Indian e-commerce sellers. Manage one product catalog and sync names, descriptions, prices and inventory to Amazon, Flipkart and Meesho — with live sync progress and full sync history.",
  keywords: [
    "marketplace management software",
    "Amazon Flipkart Meesho seller software",
    "ecommerce marketplace management",
    "product listing management",
    "multichannel ecommerce software",
    "marketplace sync software",
    "Amazon Flipkart inventory management",
    "Meesho catalog automation",
    "ecommerce product synchronization",
  ],
};

/** Optional links. Each is only rendered when configured, so nothing points nowhere. */
export const optionalLinks = {
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  docs: process.env.NEXT_PUBLIC_DOCS_URL || "",
  privacy: process.env.NEXT_PUBLIC_PRIVACY_URL || "",
  terms: process.env.NEXT_PUBLIC_TERMS_URL || "",
};

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Marketplaces", href: "#marketplaces" },
  { label: "Features", href: "#features" },
];
