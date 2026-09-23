"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ButtonLink } from "@/components/ui/Button";
import { DashboardFull } from "@/components/visuals/DashboardMock";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { DESKTOP } from "@/hooks/useGsap";
import { scaleOnScroll } from "@/lib/animations";
import { appLinks } from "@/lib/site";

export function DashboardPreview() {
  const ref = useRef<HTMLElement>(null);

  useSectionReveal(ref, ({ gsap, mm, scope }) => {
    mm.add(DESKTOP, () => {
      const frame = scope.querySelector<HTMLElement>("[data-dp-frame]");
      if (frame) scaleOnScroll(gsap, frame);
    });
  });

  return (
    <section ref={ref} aria-labelledby="dashboard-title" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[700px] bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgb(79_125_255/0.2),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="dashboard-title"
          eyebrow="The workspace"
          title="The control center for your entire catalog."
          body="Products, marketplace status, sync controls and live activity — in the same view."
        >
          <div data-reveal>
            <ButtonLink href={appLinks.dashboard} variant="secondary" arrow>
              Open the dashboard
            </ButtonLink>
          </div>
        </SectionHeading>

        <div className="mt-16 [perspective:1600px]">
          <div data-dp-frame>
            <BrowserFrame caption="Sample data">
              <DashboardFull />
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
