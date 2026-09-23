"use client";

import type { GsapLib } from "./gsap";

type G = GsapLib["gsap"];
type Targets = gsap.TweenTarget;

const once = (trigger: gsap.DOMTarget, start = "top 85%") => ({
  trigger,
  start,
  once: true,
});

/** Fade + rise when the element enters the viewport. */
export function fadeUp(gsap: G, targets: Targets, opts: { trigger?: gsap.DOMTarget; y?: number; delay?: number } = {}) {
  return gsap.from(targets, {
    y: opts.y ?? 36,
    autoAlpha: 0,
    duration: 1,
    delay: opts.delay ?? 0,
    scrollTrigger: once(opts.trigger ?? (targets as gsap.DOMTarget)),
  });
}

/** Staggered entrance for a group of cards sharing one trigger. */
export function staggerCards(gsap: G, targets: Targets, trigger: gsap.DOMTarget, stagger = 0.09) {
  return gsap.from(targets, {
    y: 48,
    autoAlpha: 0,
    scale: 0.97,
    duration: 1,
    stagger,
    scrollTrigger: once(trigger, "top 80%"),
  });
}

/** Word-by-word reveal for text rendered with <SplitWords>. */
export function revealText(gsap: G, container: Element) {
  const words = container.querySelectorAll(".split-word");
  if (!words.length) return;
  return gsap.from(words, {
    yPercent: 115,
    duration: 1.05,
    ease: "expo.out",
    stagger: 0.045,
    scrollTrigger: once(container, "top 88%"),
  });
}

/** Scroll-linked vertical drift. */
export function parallax(gsap: G, target: Targets, trigger: gsap.DOMTarget, amount = 80) {
  return gsap.fromTo(
    target,
    { y: amount / 2 },
    { y: -amount / 2, ease: "none", scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true } },
  );
}

/** Tilted, slightly scaled-down panel that settles flat as it scrolls into view. */
export function scaleOnScroll(gsap: G, target: gsap.DOMTarget, trigger: gsap.DOMTarget = target) {
  return gsap.fromTo(
    target,
    { rotateX: 18, scale: 0.9, y: 40, transformPerspective: 1600, transformOrigin: "50% 0%" },
    { rotateX: 0, scale: 1, y: 0, ease: "none", scrollTrigger: { trigger, start: "top 95%", end: "top 25%", scrub: 0.6 } },
  );
}

/** Clip-path wipe reveal for large visuals. */
export function clipReveal(gsap: G, target: gsap.DOMTarget) {
  return gsap.fromTo(
    target,
    { clipPath: "inset(12% 8% 12% 8% round 28px)", autoAlpha: 0.2 },
    { clipPath: "inset(0% 0% 0% 0% round 28px)", autoAlpha: 1, duration: 1.4, ease: "expo.out", scrollTrigger: once(target, "top 82%") },
  );
}

/** Prepares SVG paths for a stroke-draw animation and returns their lengths. */
export function prepareDraw(gsap: G, paths: SVGPathElement[]) {
  paths.forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  });
}

/** Horizontal track driven by vertical scroll while its section is pinned. */
export function horizontalScroll(
  gsap: G,
  track: HTMLElement,
  section: HTMLElement,
  onUpdate?: (progress: number) => void,
) {
  const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
  return gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: onUpdate ? (self) => onUpdate(self.progress) : undefined,
    },
  });
}
