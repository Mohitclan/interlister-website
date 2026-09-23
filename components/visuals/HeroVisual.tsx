"use client";

import { useRef } from "react";
import { Check, Pencil, Shirt } from "lucide-react";
import { MarketplaceMark, marketplaceColor } from "@/components/ui/MarketplaceMark";
import { DashboardCompact } from "./DashboardMock";
import { useGsap, DESKTOP } from "@/hooks/useGsap";
import { useOffscreenPause } from "@/hooks/useOffscreenPause";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { MarketplaceId } from "@/lib/content";

/* Stage coordinate system: 1200 × 640. HTML layers use the same numbers as %. */
const W = 1200;
const H = 640;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

const nodes: { id: MarketplaceId; name: string; y: number; status: string }[] = [
  { id: "amazon", name: "Amazon", y: 141, status: "Draft updated" },
  { id: "flipkart", name: "Flipkart", y: 320, status: "Syncing · 82%" },
  { id: "meesho", name: "Meesho", y: 499, status: "Draft updated" },
];

const paths = {
  in: "M234 320 C262 320 284 320 312 320",
  amazon: "M840 320 C904 320 902 141 966 141",
  flipkart: "M840 320 C888 320 918 320 966 320",
  meesho: "M840 320 C904 320 902 499 966 499",
};

function ProductSource({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`panel glow-border rounded-2xl ${compact ? "p-3" : "p-4"}`}>
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric/30 via-cyan/15 to-violet/30 ring-1 ring-white/10">
          <Shirt aria-hidden className="size-5 text-white/90" />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.65rem] tracking-wider text-faint uppercase">Product</span>
          <span className="block truncate text-sm font-medium">Premium Cotton Shirt</span>
        </span>
      </div>
      {!compact && (
        <dl className="mt-4 space-y-2 text-[0.72rem]">
          {[
            ["Price", "₹1,299", true],
            ["Inventory", "84 units", true],
            ["Name", "Premium Cotton…", false],
            ["Description", "Breathable 100%…", false],
          ].map(([k, v, changed]) => (
            <div key={k as string} className="flex items-center justify-between gap-2">
              <dt className="text-faint">{k}</dt>
              <dd className={`flex items-center gap-1.5 truncate ${changed ? "text-fg" : "text-muted"}`}>
                {changed && <Pencil aria-hidden className="size-3 text-cyan" />}
                {v}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {!compact && (
        <p className="mt-4 rounded-lg bg-cyan/10 px-2.5 py-1.5 text-[0.68rem] text-cyan ring-1 ring-cyan/20">
          2 fields changed · ready to sync
        </p>
      )}
    </div>
  );
}

function NodeCard({ n }: { n: (typeof nodes)[number] }) {
  const done = n.status.startsWith("Draft");
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-3 pr-4 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)]">
      <span className="relative">
        <span
          aria-hidden
          className="anim-pulse-ring absolute inset-0 rounded-[11px]"
          style={{ boxShadow: `0 0 0 1.5px ${marketplaceColor(n.id)}`, animationDelay: `${nodes.indexOf(n) * 0.5}s` }}
        />
        <MarketplaceMark id={n.id} size={38} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{n.name}</span>
        <span className={`flex items-center gap-1 text-[0.68rem] ${done ? "text-success" : "text-cyan"}`}>
          {done && <Check aria-hidden className="size-3" />}
          {n.status}
        </span>
      </span>
    </div>
  );
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useOffscreenPause(ref);

  useGsap(ref, ({ gsap, mm, scope }) => {
    mm.add(`${DESKTOP} and (pointer: fine)`, () => {
      // Mouse parallax: each layer moves by its data-depth.
      const layers = [...scope.querySelectorAll<HTMLElement>("[data-depth]")].map((el) => ({
        d: Number(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
      }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(nx * l.d);
          l.y(ny * l.d);
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    });

    mm.add(DESKTOP, () => {
      // Stage starts tilted back and settles flat as you scroll into the page.
      gsap.fromTo(
        "[data-tilt]",
        { rotateX: 16, transformPerspective: 1800, transformOrigin: "50% 0%" },
        { rotateX: 0, ease: "none", scrollTrigger: { trigger: scope, start: "top 75%", end: "top 10%", scrub: 0.6 } },
      );
    });
  });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[1200px]">
      {/* ---------- Desktop stage ---------- */}
      <div className="anim-stage hidden lg:block">
        <div data-tilt className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id="hv-line" x1="0" x2="1">
                <stop offset="0" stopColor="#4f7dff" />
                <stop offset=".5" stopColor="#2fd9f4" />
                <stop offset="1" stopColor="#8b6cff" />
              </linearGradient>
              <radialGradient id="hv-packet">
                <stop offset="0" stopColor="#fff" />
                <stop offset=".4" stopColor="#2fd9f4" />
                <stop offset="1" stopColor="#2fd9f4" stopOpacity="0" />
              </radialGradient>
              {Object.entries(paths).map(([k, d]) => (
                <path key={k} id={`hp-${k}`} d={d} />
              ))}
            </defs>
            {Object.entries(paths).map(([k, d]) => (
              <g key={k}>
                <path d={d} stroke="url(#hv-line)" strokeOpacity=".22" strokeWidth="6" fill="none" />
                <path d={d} stroke="url(#hv-line)" strokeWidth="1.5" fill="none" className="flow-line" />
              </g>
            ))}
            {!reduced &&
              (["in", "amazon", "flipkart", "meesho"] as const).map((k, i) => (
                <circle key={k} r="7" fill="url(#hv-packet)">
                  <animateMotion dur={k === "in" ? "1.6s" : "2.2s"} begin={`${i * 0.35}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .25 1">
                    <mpath href={`#hp-${k}`} />
                  </animateMotion>
                </circle>
              ))}
          </svg>

          <div
            data-depth="18"
            className="absolute -translate-y-1/2"
            style={{ left: pct(18, W), width: pct(216, W), top: "50%" }}
          >
            <div className="anim-float" style={{ animationDelay: "-2s" }}>
              <ProductSource />
            </div>
          </div>

          <div
            data-depth="8"
            className="absolute"
            style={{ left: pct(312, W), width: pct(528, W), top: pct(26, H), height: pct(588, H) }}
          >
            <div aria-hidden className="absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgb(79_125_255/0.35),transparent)] blur-2xl" />
            <div className="panel glow-border h-full overflow-hidden rounded-[22px]">
              <DashboardCompact />
            </div>
          </div>

          {nodes.map((n, i) => (
            <div
              key={n.id}
              data-depth={24 + i * 6}
              className="absolute -translate-y-1/2"
              style={{ left: pct(966, W), width: pct(216, W), top: pct(n.y, H) }}
            >
              <div className="anim-float" style={{ animationDelay: `${-i * 1.7}s` }}>
                <NodeCard n={n} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Mobile / tablet: vertical flow ---------- */}
      <div className="anim-stage mx-auto flex max-w-md flex-col items-center lg:hidden">
        <div className="w-full">
          <ProductSource compact />
        </div>
        <FlowConnector />
        <div className="panel glow-border w-full overflow-hidden rounded-[20px]">
          <DashboardCompact />
        </div>
        <FlowConnector />
        <div className="grid w-full grid-cols-3 gap-2">
          {nodes.map((n) => (
            <div key={n.id} className="glass flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center">
              <MarketplaceMark id={n.id} size={34} />
              <span className="text-xs font-medium">{n.name}</span>
              <span className={`text-[0.62rem] ${n.status.startsWith("Draft") ? "text-success" : "text-cyan"}`}>
                {n.status.startsWith("Draft") ? "Updated" : "Syncing"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowConnector() {
  return (
    <div aria-hidden className="relative h-10 w-px overflow-hidden bg-gradient-to-b from-electric/60 to-cyan/60">
      <span className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_2px_var(--color-cyan)] [animation:flow-drop_1.6s_ease-in_infinite]" />
    </div>
  );
}
