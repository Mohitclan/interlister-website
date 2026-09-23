export type MarketplaceId = "amazon" | "flipkart" | "meesho";

export const marketplaces: {
  id: MarketplaceId;
  name: string;
  method: string;
  summary: string;
  status: { label: string; tone: "live" | "sandbox" | "pending" };
  capabilities: string[];
  note: string;
}[] = [
  {
    id: "amazon",
    name: "Amazon",
    method: "SP-API + browser automation",
    summary:
      "SP-API client with token caching and an OAuth connect flow. Listing drafts are synced through Playwright browser automation.",
    status: { label: "SP-API in sandbox", tone: "sandbox" },
    capabilities: [
      "SP-API client with token caching",
      "Amazon OAuth connection flow",
      "Draft sync via browser automation",
      "Selective field resync",
    ],
    note: "The SP-API connection currently runs in sandbox mode, so API calls don't modify live listings. Active syncing runs through Playwright.",
  },
  {
    id: "flipkart",
    name: "Flipkart",
    method: "API integration + browser automation",
    summary:
      "Official API client is built in. Draft listing resync runs through Playwright, including gated-brand detection with a fallback brand name.",
    status: { label: "API approval pending", tone: "pending" },
    capabilities: [
      "Official API client (awaiting approval)",
      "Draft listing resync via browser automation",
      "Gated brand detection",
      "Fallback brand name handling",
    ],
    note: "Flipkart's official API access is pending approval, so live API syncing is disabled. Draft updates run through Playwright.",
  },
  {
    id: "meesho",
    name: "Meesho",
    method: "Browser automation",
    summary:
      "Single catalog upload and resync, handled end to end by Playwright — from login and category matching to pricing, inventory and draft save.",
    status: { label: "Fully functional", tone: "live" },
    capabilities: [
      "Automated login + session persistence",
      "Category matching + image upload",
      "GST / HSN mapping",
      "Price, MRP & size-wise inventory",
    ],
    note: "Meesho has no public listing API, so InterLister automates the supplier panel directly.",
  },
];

export const meeshoStages = [
  { key: "login", title: "Login", detail: "Automated sign-in with session persistence, so repeat runs skip the login step." },
  { key: "catalog", title: "Catalog", detail: "Detects your supplier-specific growth and cataloging URLs before starting." },
  { key: "category", title: "Category", detail: "Smart category matching with search filtering to find the right leaf category." },
  { key: "images", title: "Images", detail: "Uploads catalog images straight from your InterLister product." },
  { key: "gst", title: "GST / HSN", detail: "Maps GST / HSN classification and selects the matching dropdown options." },
  { key: "pricing", title: "Pricing", detail: "Auto-calculates Meesho price, the defective-returns price mapping and MRP." },
  { key: "inventory", title: "Inventory", detail: "Fills size-specific pricing and the inventory grid." },
  { key: "draft", title: "Draft", detail: "Saves the catalog as a draft, ready for your review." },
] as const;

export const faqs = [
  {
    q: "What is InterLister?",
    a: "InterLister is a marketplace management platform for Indian e-commerce sellers. You keep one product catalog in InterLister and sync listings from it to Amazon, Flipkart and Meesho, with live progress and a full history of every sync job.",
  },
  {
    q: "Which marketplaces does InterLister support?",
    a: "Amazon, Flipkart and Meesho. Each marketplace has its own connection that you can connect or disconnect from the Marketplaces page.",
  },
  {
    q: "How does InterLister sync products?",
    a: "When you start a sync, InterLister creates a sync job for the selected marketplaces. Each marketplace uses its own workflow: official APIs where available, and Playwright browser automation for draft listing updates. Progress streams back to your dashboard in real time.",
  },
  {
    q: "Can I manage Amazon and Flipkart products from one dashboard?",
    a: "Yes. Products live in a single InterLister inventory, and each product shows its status on every connected marketplace. You can sync to Amazon, Flipkart and Meesho from the same screen.",
  },
  {
    q: "Does InterLister use official marketplace APIs?",
    a: "Where it can. The Amazon SP-API integration currently runs in sandbox mode, and Flipkart's official API access is pending approval, so draft updates on both run through Playwright browser automation today. Meesho has no public listing API and is fully handled by browser automation.",
  },
  {
    q: "Does InterLister support Meesho?",
    a: "Yes. InterLister automates single catalog upload and resync on Meesho: login and session persistence, category matching, image upload, GST/HSN mapping, price and MRP calculation, size-wise inventory, and saving the catalog as a draft.",
  },
  {
    q: "Can I sync only the price or inventory?",
    a: "Yes. Selective resync lets you choose exactly which fields to push — name, description, price or inventory — instead of resyncing the whole listing.",
  },
  {
    q: "How does InterLister track synchronization?",
    a: "Every sync is a job. Live progress streams to the browser over Server-Sent Events while it runs, and afterwards the job and its logs are kept in sync history so you can see what changed, where, and when.",
  },
];

export const howItWorks = [
  { n: "01", title: "Connect marketplaces", body: "Link Amazon, Flipkart and Meesho from one Marketplaces page. Connect or disconnect each one independently." },
  { n: "02", title: "Add your products", body: "Build a single inventory: name, description, price and stock, managed in one place." },
  { n: "03", title: "Choose what to sync", body: "Push a full listing, or resync only the fields that changed — to one marketplace or all three." },
  { n: "04", title: "Track every job", body: "Watch progress live, then review each sync job and its logs in history." },
];
