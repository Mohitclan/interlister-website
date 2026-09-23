"use client";

import { useRef } from "react";
import {
  Check,
  FileCheck2,
  FolderSearch,
  ImageUp,
  IndianRupee,
  KeyRound,
  LayoutGrid,
  Receipt,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarketplaceMark } from "@/components/ui/MarketplaceMark";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { DESKTOP, MOBILE } from "@/hooks/useGsap";
import { horizontalScroll } from "@/lib/animations";
import { meeshoStages } from "@/lib/content";

const icons: Record<(typeof meeshoStages)[number]["key"], LucideIcon> = {
  login: KeyRound,
  catalog: FolderSearch,
  category: Tags,
  images: ImageUp,
  gst: Receipt,
  pricing: IndianRupee,
  inventory: LayoutGrid,
  draft: FileCheck2,
};

const Mono = ({ children }: { children: React.ReactNode }) => (
  <span className="font-mono text-[0.7rem]">{children}</span>
);

/** Small illustrative detail for each stage. */
const details: Record<(typeof meeshoStages)[number]["key"], React.ReactNode> = {
  login: (
    <div className="space-y-1.5">
      <div className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-faint"><Mono>supplier@••••••.in</Mono></div>
      <div className="flex items-center gap-1.5 text-success"><Check aria-hidden className="size-3" /><Mono>session persisted</Mono></div>
    </div>
  ),
  catalog: (
    <div className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-muted"><Mono>…/growth/cataloging ✓</Mono></div>
  ),
  category: (
    <div className="flex flex-wrap gap-1.5">
      <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-faint"><Mono>Men</Mono></span>
      <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-faint"><Mono>Topwear</Mono></span>
      <span className="rounded-md bg-meesho/15 px-2 py-0.5 text-meesho"><Mono>Shirts</Mono></span>
    </div>
  ),
  images: (
    <div className="grid grid-cols-4 gap-1.5" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="aspect-square rounded-md bg-gradient-to-br from-electric/25 to-meesho/25 ring-1 ring-white/10" />
      ))}
    </div>
  ),
  gst: (
    <div className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-muted">
      <Mono>HSN 6205</Mono>
      <span className="text-success"><Mono>mapped</Mono></span>
    </div>
  ),
  pricing: (
    <div className="space-y-1 text-muted">
      <div className="flex justify-between"><Mono>Meesho price</Mono><Mono>auto</Mono></div>
      <div className="flex justify-between"><Mono>Defective returns</Mono><Mono>mapped</Mono></div>
      <div className="flex justify-between"><Mono>MRP</Mono><Mono>auto</Mono></div>
    </div>
  ),
  inventory: (
    <div className="grid grid-cols-4 gap-1.5 text-center">
      {["S", "M", "L", "XL"].map((s, i) => (
        <span key={s} className="rounded-md bg-white/[0.04] py-1 text-muted">
          <Mono>{s}·{[12, 30, 26, 16][i]}</Mono>
        </span>
      ))}
    </div>
  ),
  draft: (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-success ring-1 ring-success/25">
      <Check aria-hidden className="size-3" /> <Mono>Saved as draft</Mono>
    </span>
  ),
};

export function MeeshoFlow() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref, ({ gsap, ScrollTrigger, mm, scope }) => {
    const pin = scope.querySelector<HTMLElement>("[data-mf-pin]")!;
    const track = scope.querySelector<HTMLElement>("[data-mf-track]")!;
    const bar = scope.querySelector<HTMLElement>("[data-mf-bar]")!;
    const cards = [...scope.querySelectorAll<HTMLElement>("[data-mf-card]")];

    mm.add(DESKTOP, () => {
      gsap.set(bar, { scaleX: 0, transformOrigin: "0 50%" });
      const move = horizontalScroll(gsap, track, pin, (p) => gsap.set(bar, { scaleX: p }));
      cards.forEach((card) =>
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: move,
          start: "left 70%",
          end: "right 30%",
          toggleClass: { targets: card, className: "is-active" },
        }),
      );
    });

    mm.add(MOBILE, () => {
      cards.forEach((card) =>
        gsap.from(card, { x: -24, autoAlpha: 0, duration: 0.8, scrollTrigger: { trigger: card, start: "top 88%", once: true } }),
      );
    });
  });

  return (
    <section ref={ref} aria-labelledby="meesho-title" className="relative">
      <div data-mf-pin className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgb(240_64_156/0.12),transparent)]" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              align="left"
              id="meesho-title"
              eyebrow="Meesho automation"
              title="From catalog to draft, without the repetitive work."
              body="Meesho has no public listing API, so InterLister drives the supplier panel with Playwright browser automation — the same steps you'd click through, handled for you."
            />
            <div className="glass flex items-center gap-3 self-start rounded-2xl px-4 py-3 lg:self-auto" data-reveal>
              <MarketplaceMark id="meesho" size={34} />
              <div className="text-sm">
                <p className="font-medium">Single catalog upload & resync</p>
                <p className="text-xs text-faint">Playwright · 8 automated stages</p>
              </div>
            </div>
          </div>

          <div aria-hidden className="relative mt-12 hidden h-px bg-line lg:block">
            <div data-mf-bar className="absolute inset-0 bg-gradient-to-r from-electric via-cyan to-meesho" />
          </div>
        </div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:mt-8 lg:max-w-none lg:px-0">
          <ol
            data-mf-track
            className="relative flex flex-col gap-4 border-l border-line pl-6 lg:w-max lg:flex-row lg:gap-5 lg:border-0 lg:pr-[10vw] lg:pl-[max(1.5rem,calc((100vw_-_80rem)/2_+_1.5rem))]"
          >
            {meeshoStages.map((s, i) => {
              const Icon = icons[s.key];
              return (
                <li
                  key={s.key}
                  data-mf-card
                  className="group panel relative rounded-2xl p-5 transition-[border-color,box-shadow,translate] duration-500 lg:w-[300px] lg:shrink-0 lg:[&.is-active]:-translate-y-2 lg:[&.is-active]:border-meesho/40 lg:[&.is-active]:shadow-[0_20px_60px_-20px_rgb(240_64_156/0.5)]"
                >
                  <span aria-hidden className="absolute top-6 -left-[1.95rem] size-3 rounded-full border-2 border-ink bg-meesho lg:hidden" />
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl bg-meesho/10 text-meesho ring-1 ring-meesho/25">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")} / 08</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.detail}</p>
                  <div className="mt-5 text-xs">{details[s.key]}</div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
