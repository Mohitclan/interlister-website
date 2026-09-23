"use client";

import { useRef } from "react";
import { SplitWords } from "@/components/ui/SplitWords";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { MarketplaceMark } from "@/components/ui/MarketplaceMark";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { useOffscreenPause } from "@/hooks/useOffscreenPause";
import { appLinks } from "@/lib/site";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  useOffscreenPause(ref);
  useSectionReveal(ref, ({ gsap, scope }) => {
    gsap.fromTo(
      "[data-cta-glow]",
      { scale: 0.6, autoAlpha: 0.2 },
      { scale: 1, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: scope, start: "top bottom", end: "center center", scrub: 0.8 } },
    );
  });

  return (
    <section ref={ref} aria-labelledby="cta-title" className="relative isolate overflow-hidden py-32 sm:py-44">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-cta-glow className="absolute top-1/2 left-1/2 h-[760px] w-[1200px] max-w-[200vw] -translate-1/2">
          <div className="anim-aurora absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgb(79_125_255/0.45),rgb(139_108_255/0.18)_45%,transparent)] blur-2xl" />
          <div className="anim-aurora absolute inset-[20%] rounded-full bg-[radial-gradient(closest-side,rgb(47_217_244/0.35),transparent)] blur-2xl [animation-delay:-7s]" />
          <div className="anim-aurora absolute top-[30%] right-[10%] h-1/2 w-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(224_79_211/0.18),transparent)] blur-2xl [animation-delay:-12s]" />
        </div>
        <div className="grid-bg absolute inset-0 opacity-60" />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <div className="flex items-center gap-2" data-reveal aria-hidden>
          <MarketplaceMark id="amazon" size={34} />
          <MarketplaceMark id="flipkart" size={34} />
          <MarketplaceMark id="meesho" size={34} />
        </div>
        <h2 id="cta-title" data-split className="mt-8 text-[2.75rem] leading-[1] font-semibold sm:text-7xl lg:text-[5.5rem]">
          <SplitWords text="Your marketplaces." className="block" wordClassName="text-gradient-soft" />
          <SplitWords text="One workspace." className="block" wordClassName="text-gradient pb-2" />
        </h2>
        <p className="mt-7 max-w-xl text-lg text-muted sm:text-xl" data-reveal>
          Bring your product catalog into one place and take control of marketplace synchronization.
        </p>
        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row" data-reveal>
          <Magnetic className="w-full sm:w-auto">
            <ButtonLink href={appLinks.products} size="lg" arrow className="w-full sm:w-auto">
              Start with InterLister
            </ButtonLink>
          </Magnetic>
          <ButtonLink href={appLinks.dashboard} variant="secondary" size="lg" className="w-full sm:w-auto">
            Explore the Dashboard
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
