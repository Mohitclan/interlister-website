"use client";

import { useRef } from "react";
import { ChevronRight, Database, Eye, GitBranch, History, Link2, SlidersHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSectionReveal } from "@/hooks/useSectionReveal";

const pillars = [
  { icon: Database, title: "Centralized product management", body: "One inventory is the source of truth. Marketplaces follow it — not the other way round." },
  { icon: SlidersHorizontal, title: "Controlled synchronization", body: "Nothing syncs until you pick the product, the fields and the marketplaces." },
  { icon: GitBranch, title: "Marketplace-specific workflows", body: "Official APIs where they're available, browser automation where they're not — each marketplace on its own path." },
  { icon: Eye, title: "Sync visibility", body: "Live progress streams to the dashboard while a job runs, marketplace by marketplace." },
  { icon: History, title: "Activity history", body: "Every sync job and its logs are kept, so you can trace what changed, where, and when." },
  { icon: Link2, title: "Explicit connection status", body: "Always see which marketplaces are connected. Connect or disconnect each one on its own." },
];

const pipeline = ["Your catalog", "Sync job", "Marketplace workflow", "Listing / draft", "Sync log"];

export function Trust() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section ref={ref} aria-labelledby="trust-title" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="trust-title"
          eyebrow="Reliability by design"
          title="Built for control, not just speed."
          body="Syncing listings touches your storefronts. InterLister is designed so you always know what's running and what it changed."
        />

        <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-2 font-mono text-xs" data-reveal aria-label="How a sync flows">
          {pipeline.map((p, i) => (
            <span key={p} className="flex items-center gap-2">
              <span className="glass rounded-full px-3.5 py-1.5 text-muted">{p}</span>
              {i < pipeline.length - 1 && <ChevronRight aria-hidden className="size-3.5 text-cyan" />}
            </span>
          ))}
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="group relative bg-ink-2 p-7 transition-colors duration-500 hover:bg-panel">
              <span className="grid size-11 place-items-center rounded-xl border border-line bg-white/[0.03] text-cyan transition-all duration-500 group-hover:border-cyan/40 group-hover:shadow-[0_0_30px_-6px_rgb(47_217_244/0.6)]">
                <Icon aria-hidden className="size-5 transition-transform duration-500 group-hover:scale-110" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
