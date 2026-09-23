"use client";

import { useRef } from "react";
import { ArrowDown, Check, FileSpreadsheet, Pencil, Repeat2 } from "lucide-react";
import { MarketplaceMark } from "@/components/ui/MarketplaceMark";
import { LogoGlyph } from "@/components/visuals/DashboardMock";
import { SplitWords } from "@/components/ui/SplitWords";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { DESKTOP, MOBILE } from "@/hooks/useGsap";
import type { MarketplaceId } from "@/lib/content";

function SellerTab({ id, title, line }: { id: MarketplaceId; title: string; line: string }) {
  return (
    <div className="panel w-full overflow-hidden rounded-xl lg:w-60">
      <div className="flex items-center gap-2 border-b border-line bg-black/30 px-3 py-2">
        <MarketplaceMark id={id} size={16} />
        <span className="truncate text-[0.7rem] text-muted">{title}</span>
        <span className="ml-auto text-[0.7rem] text-faint" aria-hidden>×</span>
      </div>
      <div className="space-y-2 p-3">
        <div className="h-2 w-3/4 rounded-full bg-white/10" />
        <div className="h-2 w-1/2 rounded-full bg-white/[0.06]" />
        <p className="flex items-center gap-1.5 pt-1 text-[0.7rem] text-warn">
          <Pencil aria-hidden className="size-3" /> {line}
        </p>
      </div>
    </div>
  );
}

const chaos = [
  { key: "amz", pos: "lg:left-[3%] lg:top-[12%]", rot: -7, node: <SellerTab id="amazon" title="Amazon seller panel" line="Edit price… again" /> },
  { key: "fk", pos: "lg:right-[4%] lg:top-[10%]", rot: 6, node: <SellerTab id="flipkart" title="Flipkart seller panel" line="Update stock manually" /> },
  { key: "ms", pos: "lg:left-[7%] lg:bottom-[11%]", rot: 5, node: <SellerTab id="meesho" title="Meesho supplier panel" line="Re-enter description" /> },
  {
    key: "xls",
    pos: "lg:right-[7%] lg:bottom-[13%]",
    rot: -5,
    node: (
      <div className="panel w-full rounded-xl p-3 lg:w-56">
        <p className="mb-2 flex items-center gap-2 text-[0.7rem] text-muted">
          <FileSpreadsheet aria-hidden className="size-3.5 text-success" /> catalog_final_v3.xlsx
        </p>
        <div className="grid grid-cols-4 gap-px overflow-hidden rounded-md bg-line">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={`h-3.5 ${i === 6 ? "bg-warn/30" : "bg-panel-2"}`} />
          ))}
        </div>
      </div>
    ),
  },
  {
    key: "manual",
    pos: "lg:left-[33%] lg:bottom-[5%]",
    rot: -3,
    node: (
      <div className="w-full rounded-xl border border-warn/25 bg-warn/[0.07] p-3 text-[0.72rem] text-warn lg:w-52">
        <p className="font-medium">Manual updates</p>
        <p className="mt-1 text-warn/70">Copy · paste · check · repeat</p>
      </div>
    ),
  },
  {
    key: "repeat",
    pos: "lg:right-[32%] lg:top-[6%]",
    rot: 4,
    node: (
      <div className="glass w-full rounded-xl p-3 text-[0.72rem] lg:w-52">
        <p className="flex items-center gap-2 font-medium text-fg">
          <Repeat2 aria-hidden className="size-3.5 text-magenta" /> Repeated edits
        </p>
        <p className="mt-1 text-muted">Same change, three times over</p>
      </div>
    ),
  },
];

export function ProblemSolution() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref, ({ gsap, mm, scope }) => {
    const cards = [...scope.querySelectorAll<HTMLElement>("[data-ps-card]")];
    const stage = scope.querySelector<HTMLElement>("[data-ps-stage]")!;

    mm.add(DESKTOP, () => {
      cards.forEach((c) => gsap.set(c, { rotation: Number(c.dataset.rot) }));
      gsap.set("[data-ps-b]", { autoAlpha: 0, scale: 0.8 });

      // Layout offsets (not transformed rects) so the target is the true stage center.
      const toCenter = (axis: "x" | "y") => (_: number, el: HTMLElement) =>
        axis === "x"
          ? stage.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2)
          : stage.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2);

      gsap
        .timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: "[data-ps-pin]",
            start: "top top",
            end: "+=1600",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(cards, { y: (i) => (i % 2 ? -18 : 18), rotation: (i, el) => Number(el.dataset.rot) * 1.4, duration: 1 })
        .to(cards, { x: toCenter("x"), y: toCenter("y"), rotation: 0, scale: 0.25, autoAlpha: 0, duration: 1.4, stagger: 0.06 })
        .to("[data-ps-a]", { autoAlpha: 0, y: -40, scale: 0.94, duration: 0.9 }, "<0.2")
        .to("[data-ps-b]", { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power3.out" }, "-=0.6")
        .from("[data-ps-row]", { x: -16, autoAlpha: 0, stagger: 0.15, duration: 0.6 }, "-=0.4")
        .from("[data-ps-check]", { scale: 0, stagger: 0.15, duration: 0.4, ease: "back.out(2)" }, "<0.2")
        .to({}, { duration: 0.5 });
    });

    mm.add(MOBILE, () => {
      gsap.from(cards, { y: 30, autoAlpha: 0, stagger: 0.07, scrollTrigger: { trigger: "[data-ps-chaos]", start: "top 85%", once: true } });
      gsap.from("[data-ps-b]", { y: 40, autoAlpha: 0, scale: 0.96, scrollTrigger: { trigger: "[data-ps-b]", start: "top 85%", once: true } });
    });
  });

  return (
    <section ref={ref} aria-labelledby="problem-title" className="relative">
      <div data-ps-pin className="relative overflow-hidden py-24 lg:h-screen lg:py-0">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgb(139_108_255/0.1),transparent)]" />
        <div data-ps-stage className="relative mx-auto h-full max-w-7xl px-4 sm:px-6">
          <div data-ps-a className="relative z-10 mx-auto max-w-3xl text-center lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center">
            <p className="eyebrow">The old way</p>
            <h2
              id="problem-title"
              data-split
              className="mt-5 text-[2.1rem] leading-[1.05] font-semibold sm:text-5xl lg:text-[3.8rem]"
            >
              <SplitWords text="Stop managing marketplaces one tab at a time." wordClassName="text-gradient-soft" />
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-muted sm:text-lg">
              Three seller panels, a spreadsheet, and the same edit made over and over. Every change is a chance to miss one.
            </p>
          </div>

          <div data-ps-chaos className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:contents">
            {chaos.map((c) => (
              <div key={c.key} data-ps-card data-rot={c.rot} className={`lg:absolute ${c.pos}`}>
                {c.node}
              </div>
            ))}
          </div>

          <div className="my-8 flex justify-center lg:hidden" aria-hidden>
            <span className="grid size-10 place-items-center rounded-full border border-line bg-white/[0.03]">
              <ArrowDown className="size-4 text-cyan" />
            </span>
          </div>

          <div data-ps-b className="relative z-10 lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center">
            <div className="panel glow-border mx-auto w-full max-w-lg rounded-3xl p-5 shadow-[0_0_120px_-20px_rgb(79_125_255/0.55)] sm:p-7">
              <div className="flex items-center gap-3">
                <LogoGlyph className="size-9" />
                <div>
                  <p className="eyebrow !text-[0.62rem]">The new way</p>
                  <h3 className="text-xl font-semibold sm:text-2xl">One InterLister workspace.</h3>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-line bg-white/[0.02] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Premium Cotton Shirt</span>
                  <span className="font-mono text-xs text-cyan">1 edit</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {(["amazon", "flipkart", "meesho"] as const).map((id) => (
                    <li
                      key={id}
                      data-ps-row
                      className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2 text-sm capitalize"
                    >
                      <span className="flex items-center gap-2.5">
                        <MarketplaceMark id={id} size={22} />
                        {id}
                      </span>
                      <span data-ps-check className="flex items-center gap-1 text-xs text-success normal-case">
                        <Check aria-hidden className="size-3.5" /> Synced from one place
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
