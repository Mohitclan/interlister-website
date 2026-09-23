"use client";

import type { RefObject } from "react";
import { fadeUp, revealText, staggerCards } from "@/lib/animations";
import { useGsap, type GsapSetup } from "./useGsap";

/**
 * Standard section choreography:
 *  - [data-split]  headings reveal word by word
 *  - [data-reveal] elements fade up
 *  - [data-stagger] containers stagger their direct children
 * `extra` adds section-specific animation inside the same GSAP context.
 */
export function useSectionReveal(ref: RefObject<HTMLElement | null>, extra?: GsapSetup) {
  useGsap(ref, (lib) => {
    const { gsap, scope } = lib;
    scope.querySelectorAll("[data-split]").forEach((el) => revealText(gsap, el));
    scope.querySelectorAll("[data-reveal]").forEach((el) => fadeUp(gsap, el));
    scope.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) =>
      staggerCards(gsap, el.children, el),
    );
    return extra?.(lib);
  });
}
