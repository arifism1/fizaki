import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Two-column feature row: a drawn mockup on one side, a small bold Inter title
 * and grey paragraph on the other. The sans title against the serif section
 * heading above is the core type contrast — never set these in serif.
 */
export function FeatureRow({
  title,
  body,
  visual,
  badge,
  reverse = false,
  className,
}: {
  title: string;
  body: string;
  visual: ReactNode;
  badge?: string;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-12 md:grid-cols-2",
        className,
      )}
    >
      <Reveal className={cn(reverse && "md:order-2")}>
        <div className="max-w-[440px]">
          {badge ? (
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-canvasAlt px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-inkMuted">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-brandGreen"
              />
              {badge}
            </span>
          ) : null}

          <h3 className="text-[17px] font-semibold leading-[1.4] text-ink">
            {title}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.65] text-inkBody md:text-base">
            {body}
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1} className={cn("min-w-0", reverse && "md:order-1")}>
        {visual}
      </Reveal>
    </div>
  );
}
