import type { MarketplaceId } from "@/lib/content";

const styles: Record<MarketplaceId, { bg: string; glyph: string; label: string; color: string }> = {
  amazon: {
    label: "Amazon",
    glyph: "a",
    color: "var(--color-amazon)",
    bg: "linear-gradient(145deg, #2a1c08, #16100a)",
  },
  flipkart: {
    label: "Flipkart",
    glyph: "F",
    color: "var(--color-flipkart)",
    bg: "linear-gradient(145deg, #0d1f45, #0a1224)",
  },
  meesho: {
    label: "Meesho",
    glyph: "M",
    color: "var(--color-meesho)",
    bg: "linear-gradient(145deg, #3a0d27, #1a0914)",
  },
};

export const marketplaceColor = (id: MarketplaceId) => styles[id].color;

/**
 * Neutral monogram tile for a marketplace. Deliberately not the official logo —
 * InterLister has no partnership with these marketplaces.
 */
export function MarketplaceMark({
  id,
  size = 40,
  className = "",
  decorative = true,
}: {
  id: MarketplaceId;
  size?: number;
  className?: string;
  decorative?: boolean;
}) {
  const s = styles[id];
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : s.label}
      aria-hidden={decorative || undefined}
      className={`relative inline-grid shrink-0 place-items-center font-semibold ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: s.bg,
        color: s.color,
        fontSize: size * 0.5,
        boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${s.color} 35%, transparent), 0 8px 24px -8px color-mix(in srgb, ${s.color} 55%, transparent)`,
        lineHeight: 1,
      }}
    >
      <span style={{ transform: id === "amazon" ? "translateY(-0.06em)" : undefined }}>{s.glyph}</span>
      {id === "amazon" && (
        <svg
          viewBox="0 0 20 6"
          className="absolute"
          style={{ width: size * 0.46, bottom: size * 0.2 }}
          aria-hidden
        >
          <path d="M1 1.5c5 3.4 12 3.4 18 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}
