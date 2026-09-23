"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarketplaceMark, marketplaceColor } from "@/components/ui/MarketplaceMark";
import { LogoGlyph } from "@/components/visuals/DashboardMock";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { DESKTOP, MOBILE } from "@/hooks/useGsap";
import { prepareDraw } from "@/lib/animations";
import type { MarketplaceId } from "@/lib/content";

const W = 600;
const H = 560;
const HUB = { x: 300, y: 250 };
const nodes: { id: MarketplaceId; name: string; x: number; y: number; d: string }[] = [
  { id: "amazon", name: "Amazon", x: 110, y: 78, d: "M300 250 C230 250 150 200 110 78" },
  { id: "flipkart", name: "Flipkart", x: 490, y: 78, d: "M300 250 C370 250 450 200 490 78" },
  { id: "meesho", name: "Meesho", x: 300, y: 488, d: "M300 250 C300 330 300 400 300 488" },
];

const steps = [
  { t: "Your catalog lives in InterLister", b: "Products, prices and stock are managed once — the single source of truth." },
  { t: "Each marketplace gets its own connection", b: "Connect or disconnect Amazon, Flipkart and Meesho independently." },
  { t: "Changes travel as sync jobs", b: "Pick the fields and marketplaces. InterLister runs each workflow for you." },
  { t: "Listings update, marketplace by marketplace", b: "Progress streams back live, and every job lands in sync history." },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function MarketplaceNetwork() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref, ({ gsap, mm, scope }) => {
    const paths = [...scope.querySelectorAll<SVGPathElement>("[data-net-path]")];
    const packets = [...scope.querySelectorAll<SVGCircleElement>("[data-net-packet]")];
    const stepEls = [...scope.querySelectorAll<HTMLElement>("[data-net-step]")];
    const setStep = (i: number) =>
      stepEls.forEach((el, k) => el.setAttribute("data-active", String(k <= i)));

    const build = (tl: gsap.core.Timeline) => {
      prepareDraw(gsap, paths);
      tl.addLabel("s0")
        .from("[data-net-hub]", { scale: 0.6, autoAlpha: 0, duration: 1, ease: "back.out(1.6)" })
        .from("[data-net-ring]", { scale: 0.4, autoAlpha: 0, stagger: 0.15, duration: 1 }, "<0.2")
        .addLabel("s1")
        .to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.12, ease: "power2.inOut" })
        .from("[data-net-node]", { scale: 0.7, autoAlpha: 0, y: 20, stagger: 0.12, duration: 0.8, ease: "back.out(1.4)" }, "-=0.5")
        .addLabel("s2");

      packets.forEach((c, i) => {
        const p = paths[i];
        const len = p.getTotalLength();
        const proxy = { t: 0 };
        tl.fromTo(c, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, i === 0 ? ">" : "<0.1").to(
          proxy,
          {
            t: 1,
            duration: 1.1,
            ease: "power1.inOut",
            onUpdate: () => {
              const pt = p.getPointAtLength(proxy.t * len);
              c.setAttribute("cx", String(pt.x));
              c.setAttribute("cy", String(pt.y));
            },
          },
          "<",
        );
      });

      tl.to(packets, { autoAlpha: 0, duration: 0.2 })
        .addLabel("s3")
        .fromTo("[data-net-old]", { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -10, duration: 0.4, stagger: 0.1 }, "<")
        .fromTo("[data-net-new]", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.1 }, "<0.15")
        .from("[data-net-check]", { scale: 0, autoAlpha: 0, stagger: 0.1, duration: 0.5, ease: "back.out(2)" }, "<0.1")
        .to({}, { duration: 0.6 });

      // Highlight the step whose label the playhead has passed — works in both scroll directions.
      tl.eventCallback("onUpdate", () => {
        const t = tl.time();
        let active = -1;
        for (let i = 0; i < steps.length; i++) if (t >= tl.labels[`s${i}`]) active = i;
        setStep(Math.max(active, 0));
      });
      setStep(0);
    };

    mm.add(DESKTOP, () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: "[data-net-pin]", start: "top top", end: "+=1800", pin: true, scrub: 0.8, anticipatePin: 1 },
      });
      build(tl);
    });
    mm.add(MOBILE, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-net-stage]", start: "top 70%", once: true } });
      build(tl);
    });
  });

  return (
    <section ref={ref} id="product" aria-labelledby="network-title" className="relative">
      <div data-net-pin className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-[62%] -z-10 h-[700px] w-[700px] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(79_125_255/0.18),transparent)]" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div>
            <SectionHeading
              align="left"
              id="network-title"
              eyebrow="The control center"
              title="Your marketplaces. One control center."
              body="InterLister sits between your catalog and every marketplace you sell on — so an update starts in one place and reaches all of them."
            />
            <ol className="mt-10 space-y-2">
              {steps.map((s, i) => (
                <li
                  key={s.t}
                  data-net-step
                  data-active="true"
                  className="group relative rounded-2xl border border-transparent px-4 py-3 transition-all duration-500 data-[active=false]:opacity-40 data-[active=true]:border-line data-[active=true]:bg-white/[0.025]"
                >
                  <p className="flex items-center gap-3 text-[0.95rem] font-medium">
                    <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                    {s.t}
                  </p>
                  <p className="mt-1 pl-8 text-sm text-muted">{s.b}</p>
                </li>
              ))}
            </ol>
          </div>

          <div data-net-stage className="relative mx-auto w-full max-w-[600px]" style={{ aspectRatio: `${W} / ${H}` }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
              <defs>
                <linearGradient id="net-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#2fd9f4" />
                  <stop offset="1" stopColor="#8b6cff" />
                </linearGradient>
                <radialGradient id="net-packet">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset=".35" stopColor="#6fe3ff" />
                  <stop offset="1" stopColor="#2fd9f4" stopOpacity="0" />
                </radialGradient>
              </defs>
              {nodes.map((n) => (
                <path key={`g-${n.id}`} d={n.d} style={{ stroke: marketplaceColor(n.id) }} strokeOpacity=".12" strokeWidth="10" fill="none" />
              ))}
              {nodes.map((n) => (
                <path key={n.id} data-net-path d={n.d} stroke="url(#net-line)" strokeWidth="2" fill="none" strokeLinecap="round" />
              ))}
              {nodes.map((n) => (
                <circle key={`p-${n.id}`} data-net-packet r="10" cx={HUB.x} cy={HUB.y} fill="url(#net-packet)" opacity="0" />
              ))}
            </svg>

            {/* Hub */}
            <div
              className="absolute -translate-1/2"
              style={{ left: pct(HUB.x, W), top: pct(HUB.y, H) }}
            >
              <span data-net-ring aria-hidden className="absolute top-1/2 left-1/2 size-56 -translate-1/2 rounded-full border border-electric/15" />
              <span data-net-ring aria-hidden className="absolute top-1/2 left-1/2 size-40 -translate-1/2 rounded-full border border-cyan/20" />
              <div data-net-hub className="panel glow-border relative flex flex-col items-center gap-2 rounded-3xl px-6 py-5 shadow-[0_0_80px_-10px_rgb(79_125_255/0.6)]">
                <LogoGlyph className="size-12" />
                <span className="text-sm font-semibold">InterLister</span>
                <span className="font-mono text-[0.62rem] text-faint">Premium Cotton Shirt</span>
              </div>
            </div>

            {/* Marketplace nodes */}
            {nodes.map((n) => (
              <div
                key={n.id}
                className="absolute -translate-1/2"
                style={{ left: pct(n.x, W), top: pct(n.y, H) }}
              >
                <div data-net-node className="glass flex w-28 flex-col gap-2 rounded-2xl p-2.5 sm:w-44 sm:p-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <MarketplaceMark id={n.id} size={26} />
                      <span className="text-xs font-medium sm:text-sm">{n.name}</span>
                    </span>
                    <span data-net-check className="grid size-5 place-items-center rounded-full bg-success/15 text-success">
                      <Check aria-hidden className="size-3" />
                    </span>
                  </div>
                  <div className="relative h-5 overflow-hidden font-mono text-[0.7rem]">
                    <span data-net-old className="invisible absolute inset-0 text-faint line-through opacity-0">
                      ₹1,399<span className="max-sm:hidden"> · 60 units</span>
                    </span>
                    <span data-net-new className="absolute inset-0 text-fg">
                      ₹1,299<span className="max-sm:hidden"> · 84 units</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
