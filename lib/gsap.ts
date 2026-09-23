"use client";

import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export type GsapLib = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

let loader: Promise<GsapLib> | null = null;

/**
 * GSAP is loaded lazily after hydration so it never sits on the critical path.
 * The promise is shared, so every section reuses the same instance.
 */
export function loadGsap(): Promise<GsapLib> {
  if (!loader) {
    loader = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([g, st]) => {
        g.gsap.registerPlugin(st.ScrollTrigger);
        g.gsap.defaults({ ease: "power3.out", duration: 0.9 });
        return { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
      },
    );
  }
  return loader;
}
