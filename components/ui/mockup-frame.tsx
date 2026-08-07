import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The container every fake-UI illustration sits inside: white card, hairline
 * border, soft resting shadow, and a slightly warmer inner surface so the
 * mockup content reads as a screen rather than as page background.
 */
export function MockupFrame({
  children,
  className,
  innerClassName,
  bare = false,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Skip the inner #FAFAF8 surface when the child paints its own. */
  bare?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-hairline bg-canvasAlt p-4 shadow-rest",
        className,
      )}
    >
      {bare ? (
        children
      ) : (
        <div
          className={cn(
            "overflow-hidden rounded-xl bg-[#FAFAF8] p-4",
            innerClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
