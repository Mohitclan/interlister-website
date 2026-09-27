"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Radio, RotateCcw } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarketplaceMark } from "@/components/ui/MarketplaceMark";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { MarketplaceId } from "@/lib/content";

const TOTAL = 4.4; // seconds

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
const seg = (t: number, a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a)));

const bars: { id: MarketplaceId; name: string; progress: (t: number) => number }[] = [
  { id: "amazon", name: "Amazon", progress: (t) => easeOut(seg(t, 0.2, 2.6)) * 100 },
  // Flipkart holds at 82% for a moment — real jobs don't move in straight lines.
  { id: "flipkart", name: "Flipkart", progress: (t) => (t < 2.4 ? easeOut(seg(t, 0.3, 2.4)) * 82 : 82 + easeOut(seg(t, 3.1, 3.8)) * 18) },
  { id: "meesho", name: "Meesho", progress: (t) => easeOut(seg(t, 0.4, 3.2)) * 100 },
];

const logs = [
  { at: 0.05, mk: "job", text: "sync job created · fields: price, inventory" },
  { at: 0.35, mk: "amazon", text: "browser session ready" },
  { at: 0.6, mk: "meesho", text: "session restored" },
  { at: 1.2, mk: "flipkart", text: "draft listing opened" },
  { at: 2.0, mk: "meesho", text: "price + MRP calculated" },
  { at: 2.6, mk: "amazon", text: "draft updated ✓" },
  { at: 3.2, mk: "meesho", text: "inventory grid filled · draft saved ✓" },
  { at: 3.8, mk: "flipkart", text: "draft updated ✓" },
  { at: 4.0, mk: "job", text: "completed · 3 of 3 marketplaces" },
];

const mkColor: Record<string, string> = {
  job: "text-violet",
  amazon: "text-amazon",
  flipkart: "text-flipkart",
  meesho: "text-meesho",
};

export function RealtimeSync() {
  const ref = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
  const raf = useRef(0);
  useSectionReveal(ref);

  const play = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (reduced) {
      setT(TOTAL);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const e = (now - start) / 1000;
      setT(Math.min(e, TOTAL));
      if (e < TOTAL) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [reduced]);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [play]);

  const done = t >= 4.0;
  const visibleLogs = logs.filter((l) => t >= l.at);

  return (
    <section ref={ref} aria-labelledby="realtime-title" className="relative overflow-x-clip py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="realtime-title"
          eyebrow="Real-time sync"
          title="Watch every sync as it happens."
          body="Progress streams to your dashboard live over Server-Sent Events. No refreshing, no guessing whether a job is still running."
        />

        <div ref={panelRef} className="relative mx-auto mt-16 max-w-4xl" data-reveal>
          <div aria-hidden className="absolute -inset-x-20 -inset-y-10 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(79_125_255/0.18),transparent_65%)]" />
          <div className="panel glow-border overflow-hidden rounded-[26px]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">Syncing product</p>
                <p className="mt-0.5 text-lg font-semibold">Premium Cotton Shirt</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-cyan/10 px-2.5 py-1 font-mono text-[0.65rem] text-cyan ring-1 ring-cyan/25">
                  <Radio aria-hidden className={`size-3 ${done ? "" : "anim-blink"}`} />
                  {done ? "Stream closed" : "Live · SSE"}
                </span>
                <button
                  type="button"
                  onClick={play}
                  className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
                >
                  <RotateCcw aria-hidden className="size-3" /> Replay
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-[1.25fr_1fr]">
              <div className="space-y-5 p-5 sm:p-6">
                {bars.map((b) => {
                  const p = Math.round(b.progress(t));
                  return (
                    <div key={b.id}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2.5 font-medium">
                          <MarketplaceMark id={b.id} size={24} />
                          {b.name}
                        </span>
                        <span className={`font-mono tabular-nums ${p === 100 ? "text-success" : "text-muted"}`}>
                          {p === 100 ? "✓ 100%" : `${p}%`}
                        </span>
                      </div>
                      <div
                        role="progressbar"
                        aria-label={`${b.name} sync progress`}
                        aria-valuenow={p}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className="h-2.5 overflow-hidden rounded-full bg-white/[0.05] ring-1 ring-white/5"
                      >
                        <div
                          className={`relative h-full rounded-full ${p === 100 ? "bg-gradient-to-r from-success/70 to-success" : "bg-gradient-to-r from-electric via-cyan to-violet"}`}
                          style={{ width: `${p}%` }}
                        >
                          {p > 0 && p < 100 && <span className="shimmer absolute inset-0 rounded-full" />}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <ul className="grid gap-2 pt-2 sm:grid-cols-3" aria-label="Updated fields">
                  {["Product updated", "Inventory updated", "Price updated"].map((l, i) => (
                    <li
                      key={l}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition-all duration-500 ${
                        done ? "border-success/25 bg-success/[0.06] text-success" : "border-line text-faint"
                      }`}
                      style={{ transitionDelay: done ? `${i * 120}ms` : "0ms" }}
                    >
                      <Check aria-hidden className="size-3.5" /> {l}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-line bg-black/30 p-5 font-mono text-[0.7rem] leading-relaxed md:border-t-0 md:border-l sm:p-6">
                <p className="mb-3 text-faint">GET /sync-stream/job_8f2c</p>
                <ol className="h-56 space-y-1.5 overflow-hidden" aria-label="Sync job log">
                  {visibleLogs.map((l) => (
                    <li key={l.at} className="anim-rise flex gap-2" style={{ animationDuration: "0.5s" }}>
                      <span className="text-faint tabular-nums">{l.at.toFixed(1).padStart(4, "0")}s</span>
                      <span className={`w-14 shrink-0 ${mkColor[l.mk]}`}>{l.mk}</span>
                      <span className="text-fg/85">{l.text}</span>
                    </li>
                  ))}
                  {!done && <li className="anim-blink text-cyan">▍</li>}
                </ol>
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-faint">
            Amazon and Flipkart updates currently run as draft updates through browser automation.
          </p>
        </div>
      </div>
    </section>
  );
}
