"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, RefreshCw, RotateCcw, Shirt } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarketplaceMark } from "@/components/ui/MarketplaceMark";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { MarketplaceId } from "@/lib/content";

const fields = [
  { key: "name", label: "Name", value: "Premium Cotton Shirt" },
  { key: "description", label: "Description", value: "Breathable 100% cotton, regular fit" },
  { key: "price", label: "Price", value: "₹1,299" },
  { key: "inventory", label: "Inventory", value: "84 units" },
] as const;
type FieldKey = (typeof fields)[number]["key"];

const targets: { id: MarketplaceId; name: string }[] = [
  { id: "amazon", name: "Amazon" },
  { id: "flipkart", name: "Flipkart" },
  { id: "meesho", name: "Meesho" },
];

type MkState = "idle" | "syncing" | "done";

export function SelectiveSync() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useSectionReveal(ref);

  const [selected, setSelected] = useState<Set<FieldKey>>(new Set(["price", "inventory"]));
  const [state, setState] = useState<Record<MarketplaceId, MkState>>({ amazon: "idle", flipkart: "idle", meesho: "idle" });
  const [synced, setSynced] = useState<FieldKey[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const running = Object.values(state).some((s) => s === "syncing");
  const finished = Object.values(state).every((s) => s === "done");

  const toggle = (k: FieldKey) => {
    if (running) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setState({ amazon: "idle", flipkart: "idle", meesho: "idle" });
    setSynced([]);
  };

  const sync = () => {
    if (!selected.size || running) return;
    timers.current.forEach(clearTimeout);
    const chosen = fields.filter((f) => selected.has(f.key)).map((f) => f.key);
    setSynced(chosen);
    const step = reduced ? 0 : 750;
    targets.forEach((t, i) => {
      timers.current.push(
        window.setTimeout(() => setState((s) => ({ ...s, [t.id]: "syncing" })), i * step * 0.5),
        window.setTimeout(() => setState((s) => ({ ...s, [t.id]: "done" })), step * 1.4 + i * step),
      );
    });
  };

  const status = running
    ? `Syncing ${synced.length} field${synced.length === 1 ? "" : "s"}…`
    : finished
      ? `${synced.length} field${synced.length === 1 ? "" : "s"} synced to 3 marketplaces`
      : "";

  return (
    <section ref={ref} aria-labelledby="selective-title" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[500px] bg-[radial-gradient(ellipse_50%_50%_at_30%_50%,rgb(47_217_244/0.08),transparent)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          align="left"
          id="selective-title"
          eyebrow="Selective sync"
          title="Changed the price? Sync the price."
          body="You don't always need to resync everything. Pick the exact fields — name, description, price or inventory — and push only those."
        >
          <p className="text-sm text-faint" data-reveal>
            Try it: toggle fields, then sync.
          </p>
        </SectionHeading>

        <div className="panel glow-border rounded-[28px] p-4 sm:p-6" data-reveal>
          <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
            {/* Product card */}
            <div className="rounded-2xl border border-line bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-electric/30 to-violet/30 ring-1 ring-white/10">
                  <Shirt aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="text-[0.65rem] tracking-wider text-faint uppercase">Product</p>
                  <p className="text-sm font-medium">Premium Cotton Shirt</p>
                </div>
              </div>
              <fieldset className="mt-4" disabled={running}>
                <legend className="sr-only">Fields to sync</legend>
                <div className="space-y-2">
                  {fields.map((f) => {
                    const on = selected.has(f.key);
                    return (
                      <button
                        key={f.key}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(f.key)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 disabled:cursor-not-allowed ${
                          on
                            ? "border-electric/50 bg-electric/[0.12] shadow-[0_0_24px_-8px_rgb(79_125_255/0.8)]"
                            : "border-line hover:border-line-strong hover:bg-white/[0.03]"
                        }`}
                      >
                        <span
                          className={`grid size-5 shrink-0 place-items-center rounded-md transition-colors ${on ? "bg-electric text-white" : "ring-1 ring-line-strong"}`}
                        >
                          {on && <Check aria-hidden className="size-3.5" />}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium">{f.label}</span>
                          <span className="block truncate text-xs text-faint">{f.value}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <button
                type="button"
                onClick={finished ? reset : sync}
                disabled={!finished && (!selected.size || running)}
                className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-ink transition-all hover:shadow-[0_8px_30px_-6px_rgb(47_217_244/0.7)] active:scale-[0.98] disabled:opacity-40"
              >
                {finished ? (
                  <>
                    <RotateCcw aria-hidden className="size-4" /> Reset demo
                  </>
                ) : running ? (
                  <>
                    <Loader2 aria-hidden className="size-4 anim-spin" /> Syncing…
                  </>
                ) : (
                  <>
                    <RefreshCw aria-hidden className="size-4" />
                    {selected.size ? `Sync ${selected.size} selected field${selected.size > 1 ? "s" : ""}` : "Select a field"}
                  </>
                )}
              </button>
            </div>

            {/* Beam */}
            <div aria-hidden className="relative hidden w-10 md:block">
              <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line-strong to-transparent" />
              <div
                className={`absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_12px_3px_var(--color-cyan)] transition-opacity ${running ? "opacity-100 [animation:flow-drop_1.1s_ease-in-out_infinite]" : "top-1/2 opacity-0"}`}
              />
            </div>

            {/* Marketplaces */}
            <div className="flex flex-col gap-2.5">
              {targets.map((t) => {
                const s = state[t.id];
                return (
                  <div
                    key={t.id}
                    className={`flex-1 rounded-2xl border p-3.5 transition-all duration-500 ${
                      s === "done" ? "border-success/30 bg-success/[0.05]" : s === "syncing" ? "border-cyan/30 bg-cyan/[0.04]" : "border-line bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2.5 text-sm font-medium">
                        <MarketplaceMark id={t.id} size={24} />
                        {t.name}
                      </span>
                      <span className="text-xs">
                        {s === "idle" && <span className="text-faint">Waiting</span>}
                        {s === "syncing" && (
                          <span className="flex items-center gap-1.5 text-cyan">
                            <Loader2 aria-hidden className="size-3.5 anim-spin" /> Syncing
                          </span>
                        )}
                        {s === "done" && (
                          <span className="flex items-center gap-1.5 text-success">
                            <Check aria-hidden className="size-3.5" /> Updated
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="mt-2.5 flex min-h-6 flex-wrap gap-1.5">
                      {(s === "idle" ? fields.filter((f) => selected.has(f.key)).map((f) => f.key) : synced).map((k) => (
                        <span
                          key={k}
                          className={`rounded-md px-2 py-0.5 font-mono text-[0.65rem] capitalize transition-colors ${
                            s === "done" ? "bg-success/15 text-success" : s === "syncing" ? "bg-cyan/10 text-cyan" : "bg-white/5 text-faint"
                          }`}
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p role="status" aria-live="polite" className="mt-4 min-h-5 text-center text-xs text-muted">
            {status}
          </p>
        </div>
      </div>
    </section>
  );
}
