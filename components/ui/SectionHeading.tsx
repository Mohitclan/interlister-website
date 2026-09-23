import type { ReactNode } from "react";
import { SplitWords } from "./SplitWords";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  id,
  children,
}: {
  eyebrow: string;
  title: string;
  body?: ReactNode;
  align?: "center" | "left";
  id?: string;
  children?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-5 ${centered ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl"}`}>
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2
        id={id}
        data-split
        className="text-[2.1rem] leading-[1.05] font-semibold sm:text-5xl lg:text-[3.6rem]"
      >
        <SplitWords text={title} wordClassName="text-gradient-soft" />
      </h2>
      {body && (
        <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg" data-reveal>
          {body}
        </p>
      )}
      {children}
    </div>
  );
}
