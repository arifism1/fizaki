"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

import { MockupFrame } from "@/components/ui/mockup-frame";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Reviews per month, once the request stops depending on someone remembering. */
const BARS = [
  { month: "Apr", height: 26 },
  { month: "May", height: 44 },
  { month: "Jun", height: 68 },
  { month: "Jul", height: 96 },
];

export function ReviewEngineMockup({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const animate = inView || reduceMotion;

  return (
    <div ref={ref} className={cn(className)}>
      <MockupFrame>
        {/* Stars light up one at a time */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
              animate={animate ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.13, ease: EASE }}
            >
              <Star size={19} className="fill-[#FBBF24] text-[#FBBF24]" aria-hidden />
            </motion.span>
          ))}
          <span className="ml-2 text-[13px] font-semibold text-ink">5.0</span>
        </div>

        {/* Google-style review snippet */}
        <div className="mt-4 rounded-xl border border-hairline bg-white p-3.5">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-7 w-7 rounded-full"
              style={{ backgroundImage: "linear-gradient(135deg,#2563EB,#8B5CF6)" }}
            />
            <span className="min-w-0">
              <span className="block text-[12.5px] font-semibold text-ink">
                Priyanka B.
              </span>
              <span className="block text-[11px] text-inkMuted">
                Local Guide · 2 days ago
              </span>
            </span>
          </div>
          <p className="mt-2.5 text-[12.5px] leading-[1.55] text-inkBody">
            &ldquo;Called after hours and still got a reply in a minute with a slot
            for the next morning. Painless.&rdquo;
          </p>
        </div>

        {/* Reviews per month */}
        <div className="mt-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-inkMuted">
            Reviews per month
          </p>
          <div className="mt-3 flex h-[104px] items-end gap-3">
            {BARS.map((bar, i) => (
              <div key={bar.month} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  className="w-full rounded-t-md bg-brandGreen"
                  style={{ originY: 1 }}
                  initial={reduceMotion ? false : { height: 0 }}
                  animate={animate ? { height: bar.height } : undefined}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: EASE }}
                />
                <span className="text-[10.5px] text-inkMuted">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      </MockupFrame>
    </div>
  );
}
