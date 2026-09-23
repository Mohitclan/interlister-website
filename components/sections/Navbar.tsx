"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { appLinks, navLinks } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { LogoGlyph } from "@/components/visuals/DashboardMock";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape / desktop resize, keep focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const compact = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto transition-[max-width,padding,margin] duration-500 ease-[var(--ease-out-expo)] ${
          compact ? "mt-2 max-w-6xl px-3 sm:mt-3" : "mt-0 max-w-7xl px-0"
        }`}
      >
        <nav
          aria-label="Main"
          className={`flex items-center justify-between rounded-2xl border px-4 transition-all duration-500 ease-[var(--ease-out-expo)] sm:px-5 ${
            compact
              ? "h-14 border-line bg-ink/70 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl backdrop-saturate-150"
              : "h-20 border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 rounded-lg" aria-label="InterLister home">
            <LogoGlyph className="size-8" />
            <span className="text-[1.05rem] font-semibold tracking-tight">InterLister</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/[0.05] hover:text-fg"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <ButtonLink href={appLinks.dashboard} variant="ghost">
              Log in
            </ButtonLink>
            <ButtonLink href={appLinks.dashboard} arrow>
              Get Started
            </ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.04] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </nav>

        <div
          id="mobile-menu"
          ref={panelRef}
          hidden={!open}
          className="mt-2 rounded-2xl border border-line bg-ink/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((l, i) => (
              <li key={l.href} className="anim-rise" style={{ animationDelay: `${i * 0.05}s` }}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium text-fg hover:bg-white/[0.05]"
                >
                  {l.label}
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
            <ButtonLink href={appLinks.dashboard} variant="secondary" size="lg">
              Log in
            </ButtonLink>
            <ButtonLink href={appLinks.dashboard} size="lg">
              Get Started
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
