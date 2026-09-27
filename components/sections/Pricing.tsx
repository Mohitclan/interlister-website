"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { appLinks, legalLinks } from "@/lib/site";
import { plans, pricingNotes } from "@/lib/pricing";

export function Pricing() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section ref={ref} id="pricing" aria-labelledby="pricing-title" className="relative overflow-x-clip py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          title="Start free. Upgrade when your catalog grows."
          body="One marketplace is free, forever. Pro unlocks all three marketplaces, seller-authenticated calibration and background sync."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3" data-stagger>
          {plans.map((p) => {
            const featured = p.id === "pro";
            return (
              <article
                key={p.id}
                aria-labelledby={`plan-${p.id}`}
                className={`relative flex flex-col rounded-3xl p-7 sm:p-8 ${
                  featured ? "panel border-electric/50 shadow-[0_30px_90px_-30px_rgb(79_125_255/0.6)]" : "glass"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 id={`plan-${p.id}`} className="text-xl font-semibold">
                    {p.name}
                  </h3>
                  {p.badge && (
                    <span className="rounded-full border border-electric/40 bg-electric/10 px-3 py-1 font-mono text-[0.68rem] tracking-wide text-cyan uppercase">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{p.tagline}</p>

                <p className="mt-7 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight sm:text-5xl">{p.priceLabel}</span>
                  {p.period.startsWith("/") && <span className="text-muted">{p.period}</span>}
                </p>
                {!p.period.startsWith("/") && <p className="mt-2 text-sm text-faint">{p.period}</p>}

                <ul className="mt-7 space-y-3 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-success" />
                      <span className="text-fg/90">{h}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-sm text-faint">{p.bestFor}</p>

                <div className="mt-auto pt-8">
                  {p.cta === "contact" ? (
                    <ButtonLink href={legalLinks.contact} variant="secondary" size="lg" className="w-full">
                      Contact Sales
                    </ButtonLink>
                  ) : (
                    <ButtonLink href={appLinks.signUp} variant={featured ? "primary" : "secondary"} size="lg" arrow className="w-full">
                      {p.id === "starter" ? "Start free" : "Get Pro"}
                    </ButtonLink>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-1.5 text-center text-sm text-faint" data-reveal>
          {pricingNotes.map((n) => (
            <p key={n}>{n}</p>
          ))}
          <p>
            See our{" "}
            <a href={legalLinks.refund} className="text-muted underline underline-offset-4 hover:text-fg">
              refund policy
            </a>{" "}
            and{" "}
            <a href={legalLinks.terms} className="text-muted underline underline-offset-4 hover:text-fg">
              terms of service
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
