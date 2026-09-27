/**
 * Public plan copy. Mirrors PLANS in the app's backend/lib/plans.js, which is
 * what the in-app pricing page and the Billing Hub seed (Pro = ₹2,499/month)
 * are built from. Change a price there first, then here.
 */
export type Plan = {
  id: "starter" | "pro" | "enterprise";
  name: string;
  tagline: string;
  priceLabel: string;
  period: string;
  badge: string | null;
  highlights: string[];
  bestFor: string;
  cta: "sign-up" | "contact";
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Try one marketplace, no card required.",
    priceLabel: "Free",
    period: "Forever — not a trial",
    badge: null,
    highlights: [
      "1 marketplace — Amazon, Flipkart, or Meesho",
      "Up to 50 SKUs",
      "1 Brand Calibration run — public discovery only, no seller login",
      "Visual-mode sync only (watch it run), triggered manually",
      "Listing template download",
    ],
    bestFor: "Best for a solo seller kicking the tyres before their catalog justifies paying.",
    cta: "sign-up",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Connect seller accounts, sync in the background.",
    priceLabel: "₹2,499",
    period: "/ month",
    badge: "Recommended start",
    highlights: [
      "Amazon + Flipkart + Meesho, up to 2,000 SKUs",
      "Unlimited Brand Calibration — seller-authenticated full catalog access",
      "Completeness / quality scoring on every calibration run",
      "Background (headless) sync mode, in addition to visual",
      "Full sync history, desync controls, calibration re-run",
    ],
    bestFor:
      "Best for a growing seller who wants full catalog access and doesn't want to babysit a browser window.",
    cta: "sign-up",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Unlimited scale, developer access, custom terms.",
    priceLabel: "Custom",
    period: "Scope and price negotiated per account",
    badge: null,
    highlights: [
      "Unlimited marketplaces and SKUs",
      "Everything in Pro, plus priority calibration re-run",
      "Raw SP-API proxy, catalog search & product-type schema endpoints",
    ],
    bestFor: "Best for a single power account running InterLister at scale or building on top of its API.",
    cta: "contact",
  },
];

export const pricingNotes = [
  "Prices are in Indian Rupees (INR).",
  "Pro renews every month until cancelled. Cancel or downgrade any time — the change takes effect at the end of the current billing period.",
];
