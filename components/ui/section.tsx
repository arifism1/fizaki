import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Page shell. The text column is deliberately positioned left-of-centre: an
 * 880px inner shell inside the 1120px outer container, with the 660px measure
 * pinned to its left edge. Nothing readable ever runs full width.
 */
export function Section({
  id,
  labelledBy,
  tone = "canvas",
  className,
  children,
}: {
  id?: string;
  labelledBy?: string;
  tone?: "canvas" | "alt";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-20 md:py-28",
        tone === "canvas" ? "bg-canvas" : "bg-canvasAlt",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-shell px-6">
        <div className="mx-auto w-full max-w-offset">{children}</div>
      </div>
    </section>
  );
}

/** Visual breakouts sit wider than the measure without leaving the shell. */
export function Breakout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("w-full max-w-breakout", className)}>{children}</div>;
}
