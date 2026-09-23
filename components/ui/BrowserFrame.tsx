import type { ReactNode } from "react";
import { Lock } from "lucide-react";

export function BrowserFrame({
  children,
  url = "app.interlister / dashboard",
  className = "",
  caption,
}: {
  children: ReactNode;
  url?: string;
  className?: string;
  caption?: string;
}) {
  return (
    <div className={`panel glow-border overflow-hidden rounded-[22px] ${className}`}>
      <div className="flex items-center gap-3 border-b border-line bg-black/30 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto flex max-w-sm flex-1 items-center justify-center gap-1.5 rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[0.68rem] text-faint">
          <Lock aria-hidden className="size-3" /> {url}
        </span>
        {caption ? (
          <span className="hidden rounded-full border border-line px-2 py-0.5 text-[0.62rem] text-faint sm:inline">{caption}</span>
        ) : (
          <span className="w-10" aria-hidden />
        )}
      </div>
      {children}
    </div>
  );
}
