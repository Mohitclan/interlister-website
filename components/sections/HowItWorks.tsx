"use client";

import { useRef } from "react";
import { Boxes, ListChecks, Plug, ScrollText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { DESKTOP, MOBILE } from "@/hooks/useGsap";
import { howItWorks } from "@/lib/content";

const icons = [Plug, Boxes, ListChecks, ScrollText];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref, ({ gsap, mm, scope }) => {
    const steps = [...scope.querySelectorAll<HTMLElement>("[data-hiw-step]")];
    const activate = (i: number) => steps.forEach((s, k) => s.setAttribute("data-active", String(k <= i)));

    const build = (axis: "scaleX" | "scaleY") => {
      activate(-1);
      gsap.set("[data-hiw-line]", { [axis]: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-hiw-list]",
          start: "top 70%",
          end: "bottom 55%",
          scrub: 0.6,
          onUpdate: (self) => activate(Math.min(steps.length - 1, Math.floor(self.progress * steps.length + 0.15))),
          onLeaveBack: () => activate(-1),
        },
      });
      tl.to("[data-hiw-line]", { [axis]: 1, ease: "none" });
    };

    mm.add(DESKTOP, () => build("scaleX"));
    mm.add(MOBILE, () => build("scaleY"));
  });

  return (
    <section ref={ref} id="how-it-works" aria-labelledby="hiw-title" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="hiw-title"
          eyebrow="How it works"
          title="Four steps from scattered to synced."
          body="No migration project. Connect, add, choose, track."
        />

        <ol data-hiw-list className="relative mt-20 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Progress rail */}
          <span aria-hidden className="absolute top-7 bottom-7 left-7 w-px bg-line lg:top-7 lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-px lg:w-auto">
            <span
              data-hiw-line
              className="absolute inset-0 origin-top bg-gradient-to-b from-electric via-cyan to-violet lg:origin-left lg:bg-gradient-to-r"
            />
          </span>

          {howItWorks.map((s, i) => {
            const Icon = icons[i];
            return (
              <li
                key={s.n}
                data-hiw-step
                data-active="true"
                className="group relative grid grid-cols-[3.5rem_1fr] gap-5 lg:flex lg:flex-col lg:items-center lg:text-center"
              >
                <span className="relative z-10 grid size-14 place-items-center rounded-2xl border border-line bg-panel text-faint transition-all duration-500 group-data-[active=true]:border-cyan/40 group-data-[active=true]:text-cyan group-data-[active=true]:shadow-[0_0_40px_-6px_rgb(47_217_244/0.6)]">
                  <Icon aria-hidden className="size-6" />
                </span>
                <div className="lg:mt-6">
                  <p className="font-mono text-xs text-faint">{s.n}</p>
                  <h3 className="mt-1.5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted lg:mx-auto lg:max-w-[16rem]">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
