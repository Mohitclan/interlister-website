const trimSlash = (url: string) => url.replace(/\/+$/, "");

export const SITE_URL = trimSlash(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
);

/**
 * Base URL of the InterLister application (Next.js frontend of the app).
 * Defaults to the live instance; set NEXT_PUBLIC_APP_URL=http://localhost:3000
 * to point the site at a local app instead.
 */
export const APP_URL = trimSlash(
  process.env.NEXT_PUBLIC_APP_URL || "https://interlister.panscience.ai",
);

/**
 * Routes that exist in the app (frontend/app). There is no /dashboard.
 * "Open the app" CTAs go to /products: a signed-in visitor lands in the app,
 * a signed-out one is redirected by Clerk to /login and brought back after.
 * Sign-in buttons go straight to /login.
 */
export const appLinks = {
  login: `${APP_URL}/login`,
  signUp: `${APP_URL}/sign-up`,
  dashboard: `${APP_URL}/products`,
  products: `${APP_URL}/products`,
};

/**
 * The business behind InterLister, as shown to customers and payment partners.
 * Matches the operator named on the app's live /terms, /privacy and /contact
 * pages, which Razorpay reviewed when it approved this site.
 */
export const company = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "PanScience Innovation",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "launch@panscience.xyz",
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

/**
 * Policy pages. They are public pages of the app, so they default to it;
 * override any one with its env var if it moves.
 */
export const legalLinks = {
  terms: process.env.NEXT_PUBLIC_TERMS_URL || `${APP_URL}/terms`,
  privacy: process.env.NEXT_PUBLIC_PRIVACY_URL || `${APP_URL}/privacy`,
  refund: process.env.NEXT_PUBLIC_REFUND_URL || `${APP_URL}/refund-policy`,
  contact: process.env.NEXT_PUBLIC_CONTACT_URL || `${APP_URL}/contact`,
};

/** Optional links. Each is only rendered when configured, so nothing points nowhere. */
export const optionalLinks = {
  docs: process.env.NEXT_PUBLIC_DOCS_URL || "",
};

export const navLinks = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Marketplaces", href: "#marketplaces" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];
