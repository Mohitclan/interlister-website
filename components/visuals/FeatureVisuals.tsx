import { Check, CircleDashed, Link2, RefreshCw, Unlink } from "lucide-react";
import { MarketplaceMark } from "@/components/ui/MarketplaceMark";
import { MarketplaceChips, StatusBadge, sampleRows } from "./DashboardMock";

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`panel rounded-2xl p-4 sm:p-5 ${className}`}>{children}</div>
);

export function DashboardVisual() {
  const bars = [38, 52, 44, 70, 58, 82, 64, 90, 76, 88, 72, 96];
  return (
    <div className="grid gap-3 sm:grid-cols-[1.3fr_1fr]">
      <Card>
        <p className="text-xs text-faint">Sync jobs · last 12 days</p>
        <div className="mt-4 flex h-32 items-end gap-1.5" aria-hidden>
          {bars.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-electric/30 to-cyan/80"
              style={{ height: `${h}%`, opacity: 0.45 + (i / bars.length) * 0.55 }}
            />
          ))}
        </div>
      </Card>
      <div className="grid gap-3">
        {[
          ["Products", "128"],
          ["Connected", "3 / 3"],
          ["Running now", "1 job"],
        ].map(([k, v]) => (
          <Card key={k} className="!p-4">
            <p className="text-[0.68rem] tracking-wide text-faint uppercase">{k}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">{v}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ProductsVisual() {
  return (
    <Card className="!p-0 overflow-hidden">
      {sampleRows.slice(0, 4).map((r, i) => (
        <div key={r.sku} className={`flex items-center gap-3 px-4 py-3.5 ${i ? "border-t border-line" : ""}`}>
          <span className="size-9 shrink-0 rounded-lg bg-gradient-to-br from-panel-2 to-white/10 ring-1 ring-line" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">{r.name}</span>
            <span className="block text-xs text-faint">
              {r.price} · {r.stock} in stock
            </span>
          </span>
          <span className="max-sm:hidden">
            <StatusBadge status={r.status} />
          </span>
          <MarketplaceChips chips={r.chips} size={20} />
        </div>
      ))}
    </Card>
  );
}

export function ConnectionsVisual() {
  const rows = [
    { id: "amazon" as const, name: "Amazon", via: "SP-API · OAuth", on: true },
    { id: "flipkart" as const, name: "Flipkart", via: "Browser automation", on: true },
    { id: "meesho" as const, name: "Meesho", via: "Browser automation", on: false },
  ];
  return (
    <div className="grid gap-3">
      {rows.map((r) => (
        <Card key={r.id} className="flex items-center gap-4 !p-4">
          <MarketplaceMark id={r.id} size={40} />
          <span className="min-w-0 flex-1">
            <span className="block font-medium">{r.name}</span>
            <span className="block text-xs text-faint">{r.via}</span>
          </span>
          {r.on ? (
            <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs text-success ring-1 ring-success/25">
              <Link2 aria-hidden className="size-3.5" /> Connected
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs text-muted ring-1 ring-white/10">
              <Unlink aria-hidden className="size-3.5" /> Disconnected
            </span>
          )}
        </Card>
      ))}
    </div>
  );
}

export function SyncVisual() {
  return (
    <Card className="mx-auto max-w-md">
      <p className="text-sm font-semibold">Sync product</p>
      <p className="text-xs text-faint">Premium Cotton Shirt</p>
      <p className="mt-5 mb-2 text-[0.68rem] tracking-wide text-faint uppercase">Marketplaces</p>
      <div className="grid grid-cols-3 gap-2">
        {(["amazon", "flipkart", "meesho"] as const).map((id) => (
          <span key={id} className="flex items-center gap-2 rounded-xl border border-cyan/30 bg-cyan/[0.06] px-2.5 py-2 text-xs capitalize">
            <MarketplaceMark id={id} size={18} /> {id}
          </span>
        ))}
      </div>
      <p className="mt-5 mb-2 text-[0.68rem] tracking-wide text-faint uppercase">Fields</p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          ["Name", false],
          ["Description", false],
          ["Price", true],
          ["Inventory", true],
        ].map(([f, on]) => (
          <span
            key={f as string}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${on ? "border-electric/40 bg-electric/10 text-fg" : "border-line text-muted"}`}
          >
            <span className={`grid size-4 place-items-center rounded ${on ? "bg-electric text-white" : "ring-1 ring-line-strong"}`}>
              {on && <Check aria-hidden className="size-3" />}
            </span>
            {f as string}
          </span>
        ))}
      </div>
      <span className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-medium text-ink">
        <RefreshCw aria-hidden className="size-4" /> Sync 2 fields to 3 marketplaces
      </span>
    </Card>
  );
}

export function HistoryVisual() {
  const jobs = [
    { id: "job_8f2c", what: "Price, inventory", mk: ["amazon", "flipkart", "meesho"] as const, s: "Completed", ok: true },
    { id: "job_7a91", what: "Catalog upload", mk: ["meesho"] as const, s: "Draft saved", ok: true },
    { id: "job_7a3e", what: "Description", mk: ["flipkart"] as const, s: "Completed", ok: true },
    { id: "job_6d10", what: "Full listing", mk: ["amazon", "flipkart"] as const, s: "Needs review", ok: false },
  ];
  return (
    <Card className="!p-0 overflow-hidden font-mono text-[0.72rem]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-faint">
        <span>Sync logs</span>
        <span>GET /sync-logs</span>
      </div>
      {jobs.map((j) => (
        <div key={j.id} className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-0">
          <span className="text-faint">{j.id}</span>
          <span className="min-w-0 flex-1 truncate font-sans text-[0.8rem] text-fg">{j.what}</span>
          <span className="flex -space-x-1 max-sm:hidden">
            {j.mk.map((m) => (
              <MarketplaceMark key={m} id={m} size={18} />
            ))}
          </span>
          <span className={`flex items-center gap-1 ${j.ok ? "text-success" : "text-warn"}`}>
            {j.ok ? <Check aria-hidden className="size-3" /> : <CircleDashed aria-hidden className="size-3" />}
            {j.s}
          </span>
        </div>
      ))}
    </Card>
  );
}
