"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { MockupFrame } from "@/components/ui/mockup-frame";
import { drawPath } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Clicks narrow to leads narrow to bookings — the funnel, told in three chips. */
const CHIPS = [
  { label: "Clicks", value: "1,284", width: "100%", color: "#2563EB" },
  { label: "Leads", value: "213", width: "62%", color: "#8B5CF6" },
  { label: "Booked", value: "88", width: "34%", color: "#22C55E" },
];

const AREA_PATH =
  "M0 78 C 26 74, 42 58, 66 56 C 92 54, 108 66, 132 58 C 158 49, 172 28, 198 24 C 222 20, 238 30, 260 18";

export function AdsDashboardMockup({
  className,
  accent = "#22C55E",
}: {
  className?: string;
  /** Accent for the trend line, its fill and the booked bar. */
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={cn(className)}>
      <MockupFrame>
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-inkMuted">
            Cost per booking
          </p>
          <p className="text-[12px] font-semibold" style={{ color: accent }}>
            ↓ 38%
          </p>
        </div>

        <svg
          viewBox="0 0 260 96"
          preserveAspectRatio="none"
          className="mt-3 h-[96px] w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="ads-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.28" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
            <clipPath id="ads-clip">
              <rect x="0" y="0" width="260" height="96" />
            </clipPath>
          </defs>

          {/* Baseline grid, kept almost invisible */}
          {[24, 48, 72].map((y) => (
            <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="#E4E3DE" strokeWidth="1" />
          ))}

          {/* Fill fades up under the stroke once the line has drawn */}
          <motion.path
            d={`${AREA_PATH} L 260 96 L 0 96 Z`}
            fill="url(#ads-fill)"
            clipPath="url(#ads-clip)"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={inView || reduceMotion ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.6 }}
          />

          <motion.path
            d={AREA_PATH}
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            variants={drawPath}
            initial={reduceMotion ? false : "hidden"}
            animate={inView || reduceMotion ? "visible" : undefined}
          />
        </svg>

        <div className="mt-4 space-y-2.5">
          {CHIPS.map((chip, i) => (
            <div key={chip.label} className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-[11.5px] text-inkMuted">
                {chip.label}
              </span>
              <span className="h-6 flex-1 overflow-hidden rounded-full bg-[#F1F0EC]">
                <motion.span
                  className="block h-full rounded-full"
                  style={{
                    backgroundColor: chip.label === "Booked" ? accent : chip.color,
                  }}
                  initial={reduceMotion ? false : { width: 0 }}
                  animate={inView || reduceMotion ? { width: chip.width } : undefined}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.12 }}
                />
              </span>
              <span className="w-12 shrink-0 text-right text-[12px] font-semibold text-ink">
                {chip.value}
              </span>
            </div>
          ))}
        </div>
      </MockupFrame>
    </div>
  );
}
