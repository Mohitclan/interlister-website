import {
  Activity,
  Boxes,
  LayoutDashboard,
  Plug,
  RefreshCw,
  Search,
  ScrollText,
} from "lucide-react";
import type { MarketplaceId } from "@/lib/content";
import { MarketplaceMark } from "@/components/ui/MarketplaceMark";

type ChipState = "synced" | "syncing" | "draft" | "off";
type Row = {
  name: string;
  sku: string;
  price: string;
  stock: number;
  chips: Record<MarketplaceId, ChipState>;
  status: "Synced" | "Syncing" | "Draft saved" | "Not synced";
};

/** Illustrative sample data for the product UI mock. */
export const sampleRows: Row[] = [
  { name: "Premium Cotton Shirt", sku: "PCS-BLU-M", price: "₹1,299", stock: 84, chips: { amazon: "synced", flipkart: "syncing", meesho: "synced" }, status: "Syncing" },
  { name: "Linen Kurta Set", sku: "LKS-OLV-L", price: "₹1,849", stock: 36, chips: { amazon: "synced", flipkart: "synced", meesho: "draft" }, status: "Draft saved" },
  { name: "Steel Water Bottle 1L", sku: "SWB-1000", price: "₹549", stock: 210, chips: { amazon: "synced", flipkart: "synced", meesho: "synced" }, status: "Synced" },
  { name: "Block-Print Dupatta", sku: "BPD-IND-01", price: "₹699", stock: 52, chips: { amazon: "off", flipkart: "draft", meesho: "synced" }, status: "Draft saved" },
  { name: "Canvas Sneakers", sku: "CSN-WHT-9", price: "₹1,499", stock: 18, chips: { amazon: "synced", flipkart: "off", meesho: "off" }, status: "Not synced" },
];

const chipTone: Record<ChipState, string> = {
  synced: "opacity-100",
  syncing: "opacity-100",
  draft: "opacity-80",
  off: "opacity-25 grayscale",
};

export function MarketplaceChips({ chips, size = 20 }: { chips: Record<MarketplaceId, ChipState>; size?: number }) {
  return (
    <span className="flex items-center gap-1.5">
      {(Object.keys(chips) as MarketplaceId[]).map((id) => (
        <span key={id} className={`relative ${chipTone[chips[id]]}`}>
          <MarketplaceMark id={id} size={size} />
          {chips[id] === "syncing" && (
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
          )}
        </span>
      ))}
    </span>
  );
}

const statusTone: Record<Row["status"], string> = {
  Synced: "bg-success/10 text-success ring-success/25",
  Syncing: "bg-cyan/10 text-cyan ring-cyan/25",
  "Draft saved": "bg-violet/10 text-[#b9a8ff] ring-violet/25",
  "Not synced": "bg-white/5 text-faint ring-white/10",
};

export function StatusBadge({ status }: { status: Row["status"] }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.68rem] font-medium ring-1 ${statusTone[status]}`}>
      {status === "Syncing" ? (
        <RefreshCw aria-hidden className="size-2.5 anim-spin" />
      ) : (
        <span className="size-1.5 rounded-full bg-current" />
      )}
      {status}
    </span>
  );
}

const nav = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Boxes, label: "Products" },
  { icon: Plug, label: "Marketplaces" },
  { icon: ScrollText, label: "Sync logs" },
];

function Sidebar({ active = "Dashboard" }: { active?: string }) {
  return (
    <div className="hidden w-48 shrink-0 flex-col gap-1 border-r border-line bg-black/20 p-3 md:flex">
      <div className="mb-4 flex items-center gap-2 px-2 pt-1">
        <LogoGlyph className="size-6" />
        <span className="text-sm font-semibold">InterLister</span>
      </div>
      {nav.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.8rem] ${
            label === active ? "bg-white/[0.07] text-fg shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]" : "text-muted"
          }`}
        >
          <Icon aria-hidden className="size-4" />
          {label}
        </span>
      ))}
      <div className="mt-auto rounded-xl border border-line bg-white/[0.02] p-3">
        <p className="mb-2 text-[0.65rem] tracking-wider text-faint uppercase">Connections</p>
        {(["amazon", "flipkart", "meesho"] as const).map((id) => (
          <div key={id} className="flex items-center justify-between py-1 text-[0.72rem] text-muted capitalize">
            <span className="flex items-center gap-2">
              <MarketplaceMark id={id} size={16} />
              {id}
            </span>
            <span className="size-1.5 rounded-full bg-success shadow-[0_0_6px_var(--color-success)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg-a" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f7dff" />
          <stop offset=".55" stopColor="#2fd9f4" />
          <stop offset="1" stopColor="#8b6cff" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="#0c0f1c" />
      <rect x=".5" y=".5" width="31" height="31" rx="8.5" fill="none" stroke="url(#lg-a)" strokeOpacity=".6" />
      <circle cx="10" cy="16" r="3" fill="url(#lg-a)" />
      <path d="M13 16h3.5M16.5 16c2.5 0 2.5-6 6-6M16.5 16h6M16.5 16c2.5 0 2.5 6 6 6" stroke="url(#lg-a)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="23.5" cy="10" r="1.8" fill="#fff" />
      <circle cx="23.5" cy="16" r="1.8" fill="#fff" />
      <circle cx="23.5" cy="22" r="1.8" fill="#fff" />
    </svg>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-line bg-white/[0.025] p-3">
      <p className="text-[0.66rem] tracking-wide text-faint uppercase">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums">{value}</p>
      {hint && <p className="text-[0.66rem] text-muted">{hint}</p>}
    </div>
  );
}

/** Compact dashboard used inside the hero visual. */
export function DashboardCompact() {
  return (
    <div className="flex h-full flex-col overflow-hidden text-left">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <LogoGlyph className="size-5" />
          <span className="text-[0.8rem] font-semibold">InterLister</span>
          <span className="text-[0.72rem] text-faint">/ Products</span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-cyan/10 px-2 py-0.5 text-[0.65rem] text-cyan ring-1 ring-cyan/25">
          <span className="size-1.5 rounded-full bg-cyan anim-blink" /> Live sync
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        <Stat label="Products" value="128" />
        <Stat label="Marketplaces" value="3 / 3" />
        <Stat label="Jobs today" value="16" />
      </div>
      <div className="flex-1 px-3 pb-3">
        <div className="overflow-hidden rounded-xl border border-line">
          {sampleRows.slice(0, 4).map((r, i) => (
            <div
              key={r.sku}
              className={`flex items-center gap-3 px-3 py-2.5 ${i ? "border-t border-line" : ""} ${i === 0 ? "bg-cyan/[0.04]" : ""}`}
            >
              <span className="size-7 shrink-0 rounded-md bg-gradient-to-br from-panel-2 to-white/10 ring-1 ring-line" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.76rem] font-medium">{r.name}</span>
                <span className="block text-[0.64rem] text-faint">{r.price} · {r.stock} in stock</span>
              </span>
              <MarketplaceChips chips={r.chips} size={17} />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-line bg-white/[0.02] p-3">
          <div className="mb-2 flex items-center justify-between text-[0.68rem]">
            <span className="text-muted">Syncing · Premium Cotton Shirt</span>
            <span className="font-mono text-cyan">price · inventory</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-[72%] origin-left rounded-full bg-gradient-to-r from-electric via-cyan to-violet [animation:fill-x_2.4s_var(--ease-out-expo)_1.2s_both]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Full application view used in the dashboard showcase. */
export function DashboardFull() {
  return (
    <div className="flex min-h-[560px] text-left">
      <Sidebar />
      <div className="min-w-0 flex-1 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[0.7rem] text-faint">Overview</p>
            <h3 className="text-lg font-semibold tracking-tight">Dashboard</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-[0.75rem] text-faint sm:flex">
              <Search aria-hidden className="size-3.5" /> Search products
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[0.75rem] font-medium text-ink">
              <RefreshCw aria-hidden className="size-3.5" /> Sync selected
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Products" value="128" hint="in one inventory" />
          <Stat label="Listings synced" value="342" hint="across 3 marketplaces" />
          <Stat label="Connections" value="3 / 3" hint="Amazon · Flipkart · Meesho" />
          <Stat label="Sync jobs" value="16" hint="today" />
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_260px]">
          <div className="overflow-hidden rounded-xl border border-line">
            <div className="grid grid-cols-[1.6fr_0.7fr_0.6fr_1fr_0.9fr] gap-3 border-b border-line bg-white/[0.02] px-4 py-2.5 text-[0.66rem] tracking-wide text-faint uppercase max-sm:grid-cols-[1.6fr_1fr]">
              <span>Product</span>
              <span className="max-sm:hidden">Price</span>
              <span className="max-sm:hidden">Stock</span>
              <span>Marketplaces</span>
              <span className="max-sm:hidden">Status</span>
            </div>
            {sampleRows.map((r) => (
              <div
                key={r.sku}
                className="grid grid-cols-[1.6fr_0.7fr_0.6fr_1fr_0.9fr] items-center gap-3 border-b border-line px-4 py-3 text-[0.78rem] last:border-0 max-sm:grid-cols-[1.6fr_1fr]"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="size-8 shrink-0 rounded-lg bg-gradient-to-br from-panel-2 to-white/10 ring-1 ring-line" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{r.name}</span>
                    <span className="block font-mono text-[0.64rem] text-faint">{r.sku}</span>
                  </span>
                </span>
                <span className="tabular-nums max-sm:hidden">{r.price}</span>
                <span className="tabular-nums text-muted max-sm:hidden">{r.stock}</span>
                <MarketplaceChips chips={r.chips} />
                <span className="max-sm:hidden">
                  <StatusBadge status={r.status} />
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-line bg-white/[0.02] p-4">
            <p className="mb-3 flex items-center gap-2 text-[0.72rem] font-medium text-muted">
              <Activity aria-hidden className="size-3.5 text-cyan" /> Sync activity
            </p>
            <ol className="space-y-3 text-[0.72rem]">
              {[
                { t: "now", m: "Flipkart · price, inventory", s: "Running", c: "text-cyan" },
                { t: "2m", m: "Amazon · price, inventory", s: "Draft updated", c: "text-success" },
                { t: "2m", m: "Meesho · price, inventory", s: "Draft updated", c: "text-success" },
                { t: "1h", m: "Meesho · catalog upload", s: "Draft saved", c: "text-[#b9a8ff]" },
                { t: "3h", m: "Flipkart · description", s: "Draft updated", c: "text-success" },
              ].map((e, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-7 shrink-0 font-mono text-faint">{e.t}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-fg/90">{e.m}</span>
                    <span className={e.c}>{e.s}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
