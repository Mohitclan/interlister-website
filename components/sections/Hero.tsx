import { ArrowDown } from "lucide-react";
import { appLinks } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { MarketplaceMark } from "@/components/ui/MarketplaceMark";
import { SplitWords } from "@/components/ui/SplitWords";
import { HeroVisual } from "@/components/visuals/HeroVisual";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      {/* Atmospheric lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div className="anim-aurora absolute top-[-18%] left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(79_125_255/0.32),transparent)] blur-3xl" />
        <div className="anim-aurora absolute top-[8%] left-[8%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(139_108_255/0.22),transparent)] blur-3xl [animation-delay:-6s]" />
        <div className="anim-aurora absolute top-[20%] right-[4%] h-[420px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgb(47_217_244/0.16),transparent)] blur-3xl [animation-delay:-11s]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <p className="anim-rise glass inline-flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2 font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase">
            <span className="relative grid size-4 place-items-center">
              <span className="anim-pulse-ring absolute inset-0 rounded-full bg-cyan/40" aria-hidden />
              <span className="size-1.5 rounded-full bg-cyan" />
            </span>
            The marketplace operating system
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-[2.9rem] leading-[0.98] font-semibold sm:text-7xl lg:text-[6.2rem]"
          >
            <SplitWords text="One catalog." delayStart={0.1} className="block" wordClassName="text-gradient-soft pb-1" />
            <SplitWords text="Every marketplace." delayStart={0.28} className="block" wordClassName="text-gradient pb-2" />
          </h1>

          <p
            className="anim-rise mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
            style={{ animationDelay: "0.45s" }}
          >
            Manage, sync, and control your Amazon, Flipkart, and Meesho listings from one powerful workspace.
          </p>

          <div
            className="anim-rise mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: "0.58s" }}
          >
            <Magnetic className="w-full sm:w-auto">
              <ButtonLink href={appLinks.products} size="lg" arrow className="w-full sm:w-auto">
                Start Managing Products
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#how-it-works" variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore How It Works
              <ArrowDown aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </ButtonLink>
          </div>

          <div
            className="anim-rise mt-9 flex items-center gap-3 text-sm text-faint"
            style={{ animationDelay: "0.7s" }}
          >
            <span>Sync to</span>
            <span className="flex items-center gap-2">
              <MarketplaceMark id="amazon" size={26} decorative={false} />
              <MarketplaceMark id="flipkart" size={26} decorative={false} />
              <MarketplaceMark id="meesho" size={26} decorative={false} />
            </span>
            <span className="hidden sm:inline">Amazon · Flipkart · Meesho</span>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
