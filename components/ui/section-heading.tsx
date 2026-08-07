import type { ReactNode } from "react";

import type { Heading } from "@/lib/content";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Segments with `italic: true` render as italic serif emphasis. */
  title: Heading;
  subtitle?: string | readonly string[] | ReactNode;
  id?: string;
  className?: string;
};

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/**
 * Serif H2 that reads like a sentence across 2–3 lines, left-aligned inside the
 * 660px measure, with a small grey paragraph underneath. Centred headings are
 * reserved for the hero and the final CTA only.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-measure", className)}>
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}

      <h2
        id={id}
        className="heading-tight font-display text-3xl font-normal text-ink md:text-[44px]"
      >
        {title.map((segment, i) =>
          segment.italic ? (
            <em key={i} className="italic">
              {segment.text}
            </em>
          ) : (
            <span key={i}>{segment.text}</span>
          ),
        )}
      </h2>

      {typeof subtitle === "string" ? (
        <p className="mt-6 text-[15px] leading-[1.65] text-inkBody md:text-base">
          {subtitle}
        </p>
      ) : isStringArray(subtitle) ? (
        <div className="mt-6 space-y-4">
          {subtitle.map((para) => (
            <p
              key={para}
              className="text-[15px] leading-[1.65] text-inkBody md:text-base"
            >
              {para}
            </p>
          ))}
        </div>
      ) : subtitle ? (
        <div className="mt-6 text-[15px] leading-[1.65] text-inkBody md:text-base">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
