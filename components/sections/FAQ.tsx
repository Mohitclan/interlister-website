"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { faqs } from "@/lib/content";

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section ref={ref} id="faq" aria-labelledby="faq-title" className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            id="faq-title"
            eyebrow="FAQ"
            title="Questions, answered plainly."
            body="What InterLister does, how it syncs, and where each marketplace integration stands today."
          />
        </div>

        <div className="divide-y divide-line border-y border-line" data-reveal>
          {faqs.map((f, i) => (
            <details key={f.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-lg py-6 text-left text-lg font-medium transition-colors hover:text-cyan">
                <h3>{f.q}</h3>
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line transition-colors group-open:border-cyan/40 group-open:text-cyan">
                  <Plus aria-hidden className="faq-icon size-4 transition-transform duration-300" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
