"use client";

import { useRef } from "react";
import { Check, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarketplaceMark, marketplaceColor } from "@/components/ui/MarketplaceMark";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { marketplaces } from "@/lib/content";

const tone = {
  live: "bg-success/10 text-success ring-success/25",
  sandbox: "bg-warn/10 text-warn ring-warn/25",
  pending: "bg-warn/10 text-warn ring-warn/25",
};

export function MarketplaceCards() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  // Pointer-following spotlight, written straight to CSS vars (no re-render).
  const spotlight = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section ref={ref} id="marketplaces" aria-labelledby="marketplaces-title" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="marketplaces-title"
          eyebrow="Supported marketplaces"
          title="Three marketplaces. Three workflows. One place."
          body="Every marketplace works differently, so each gets its own integration. Here's exactly how each one connects today."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3" data-stagger>
          {marketplaces.map((m) => (
            <article
              key={m.id}
              onPointerMove={spotlight}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-panel p-6 transition-[border-color,translate] duration-500 hover:-translate-y-1 hover:border-line-strong sm:p-7"
              style={{ "--c": marketplaceColor(m.id) } as React.CSSProperties}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), color-mix(in srgb, var(--c) 16%, transparent), transparent 60%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px opacity-60"
                style={{ background: "linear-gradient(90deg, transparent, var(--c), transparent)" }}
              />

              <div className="relative flex items-start justify-between">
                <MarketplaceMark id={m.id} size={52} className="transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3" />
                <span className={`rounded-full px-2.5 py-1 text-[0.7rem] font-medium ring-1 ${tone[m.status.tone]}`}>
                  {m.status.label}
                </span>
              </div>

              <h3 className="relative mt-6 text-2xl font-semibold">{m.name}</h3>
              <p className="relative mt-1 font-mono text-xs" style={{ color: "var(--c)" }}>
                {m.method}
              </p>
              <p className="relative mt-4 text-sm leading-relaxed text-muted">{m.summary}</p>

              <ul className="relative mt-6 space-y-2.5 border-t border-line pt-6">
                {m.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0" style={{ color: "var(--c)" }} />
                    {c}
                  </li>
                ))}
              </ul>

              <p className="relative mt-auto flex gap-2 pt-6 text-xs leading-relaxed text-faint">
                <Info aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                {m.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
