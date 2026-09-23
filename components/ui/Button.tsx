import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,background-color,box-shadow,color,border-color] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-ink shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_10px_40px_-8px_rgb(79_125_255/0.7)] hover:shadow-[0_0_0_1px_rgb(255_255_255/0.4),0_14px_60px_-6px_rgb(47_217_244/0.75)]",
  secondary:
    "glass text-fg hover:border-line-strong hover:bg-white/[0.07]",
  ghost: "text-muted hover:text-fg",
};

const sizes = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

export function buttonClass(variant: Variant = "primary", size: keyof typeof sizes = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  arrow?: boolean;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return (
    <a href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
        />
      )}
    </a>
  );
}
