"use client";

import { useRef } from "react";
import { Boxes, History, LayoutDashboard, Plug, RefreshCw } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ConnectionsVisual,
  DashboardVisual,
  HistoryVisual,
  ProductsVisual,
  SyncVisual,
} from "@/components/visuals/FeatureVisuals";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { DESKTOP } from "@/hooks/useGsap";
import { clipReveal, parallax } from "@/lib/animations";

const features = [
  {
    icon: Boxes,
    label: "Products",
    title: "One catalog. One source of truth.",
    body: "Manage your product data once — name, description, price and stock — and keep every marketplace listing aligned with it.",
    visual: <ProductsVisual />,
  },
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "Your whole operation, at a glance.",
    body: "Product counts, connection health and recent sync jobs on a single overview, so you always know where things stand.",
    visual: <DashboardVisual />,
  },
  {
    icon: Plug,
    label: "Marketplace connections",
    title: "Connect once. Stay in control.",
    body: "Each marketplace has an explicit connection you can connect or disconnect at any time. Nothing syncs where you haven't said it should.",
    visual: <ConnectionsVisual />,
  },
  {
    icon: RefreshCw,
    label: "Sync",
    title: "One click — or just the fields that changed.",
    body: "Push a full listing, or resync only name, description, price or inventory to the marketplaces you pick.",
    visual: <SyncVisual />,
  },
  {
    icon: History,
    label: "Sync history",
    title: "Every job, on the record.",
    body: "Each sync is logged as a job with its marketplaces, fields and outcome — so you can see exactly what changed and when.",
    visual: <HistoryVisual />,
  },
];

export function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref, ({ gsap, mm, scope }) => {
    scope.querySelectorAll<HTMLElement>("[data-feature-visual]").forEach((el) => clipReveal(gsap, el));
    mm.add(DESKTOP, () => {
      scope.querySelectorAll<HTMLElement>("[data-feature-glow]").forEach((el) => parallax(gsap, el, el, 120));
    });
  });

  return (
    <section ref={ref} id="features" aria-labelledby="features-title" className="relative overflow-x-clip py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="features-title"
          eyebrow="The product"
          title="Built around how sellers actually work."
          body="Five screens that replace a dozen tabs. Everything InterLister does, it does from one place."
        />

        <div className="mt-20 space-y-24 sm:mt-28 sm:space-y-36">
          {features.map((f, i) => {
            const Icon = f.icon;
            const flip = i % 2 === 1;
            return (
              <article key={f.label} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <div className={flip ? "lg:order-2" : ""}>
                  <p className="flex items-center gap-2.5 text-sm text-muted" data-reveal>
                    <span className="grid size-8 place-items-center rounded-lg border border-line bg-white/[0.03]">
                      <Icon aria-hidden className="size-4 text-cyan" />
                    </span>
                    {f.label}
                  </p>
                  <h3 className="mt-5 text-3xl leading-tight font-semibold sm:text-[2.6rem]" data-reveal>
                    {f.title}
                  </h3>
                  <p className="mt-4 max-w-md text-muted sm:text-lg" data-reveal>
                    {f.body}
                  </p>
                </div>
                <div className={`relative ${flip ? "lg:order-1" : ""}`}>
                  <div
                    aria-hidden
                    data-feature-glow
                    className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[110%] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(79_125_255/0.16),transparent)]"
                  />
                  <div data-feature-visual className="rounded-[28px] border border-line bg-gradient-to-b from-white/[0.035] to-transparent p-3 sm:p-6">
                    {f.visual}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
