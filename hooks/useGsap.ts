"use client";

import { useEffect, useRef, type RefObject } from "react";
import { loadGsap, type GsapLib } from "@/lib/gsap";

export type GsapSetup = (
  lib: GsapLib & { mm: gsap.MatchMedia; scope: HTMLElement },
) => void | (() => void);

export const DESKTOP = "(min-width: 1024px)";
export const MOBILE = "(max-width: 1023px)";

/**
 * Runs GSAP setup inside a gsap.context scoped to `scope`, so every tween,
 * ScrollTrigger and matchMedia query is reverted on unmount. Skipped entirely
 * when the user prefers reduced motion — content is fully visible by default.
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: GsapSetup) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let ctx: gsap.Context | undefined;
    let mm: gsap.MatchMedia | undefined;
    let cleanup: void | (() => void);

    loadGsap().then((lib) => {
      const el = scope.current;
      if (cancelled || !el) return;
      mm = lib.gsap.matchMedia();
      ctx = lib.gsap.context(() => {
        cleanup = setupRef.current({ ...lib, mm: mm!, scope: el });
      }, el);
    });

    return () => {
      cancelled = true;
      cleanup?.();
      mm?.revert();
      ctx?.revert();
    };
  }, [scope]);
}
