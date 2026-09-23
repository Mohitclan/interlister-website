"use client";

import { useEffect, type RefObject } from "react";

/**
 * Sets data-offscreen on the element while it's out of view, which pauses
 * its infinite CSS animations (see globals.css) and saves GPU work.
 */
export function useOffscreenPause(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.setAttribute("data-offscreen", String(!entry.isIntersecting)),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}
