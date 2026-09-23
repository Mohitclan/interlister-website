import { Fragment } from "react";

/**
 * Renders text as masked words so GSAP (or CSS) can slide each word up.
 * Plain text stays in the DOM, so screen readers and crawlers read it normally.
 *
 * Gradient text must go on `wordClassName`: background-clip:text on a parent
 * doesn't paint through inline-block children.
 */
export function SplitWords({
  text,
  className = "",
  wordClassName = "",
  delayStart,
  step = 0.06,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  /** When set, words animate on load via CSS instead of on scroll via GSAP. */
  delayStart?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split-line">
            <span
              className={`split-word ${delayStart !== undefined ? "anim-word" : ""} ${wordClassName}`}
              style={delayStart !== undefined ? { animationDelay: `${delayStart + i * step}s` } : undefined}
            >
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
