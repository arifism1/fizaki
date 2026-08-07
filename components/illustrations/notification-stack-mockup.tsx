"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { MockupFrame } from "@/components/ui/mockup-frame";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ROWS = [
  { name: "Dr. Mehta Dental", meta: "Missed call · qualified · booked", from: "#2563EB", to: "#06B6D4" },
  { name: "Iron Pulse Gym", meta: "Trial enquiry · qualified · booked", from: "#F97316", to: "#EC4899" },
  { name: "Suryodaya Solar", meta: "Bill ₹6–8k · survey booked", from: "#22C55E", to: "#06B6D4" },
  { name: "Meraki Interiors", meta: "Budget qualified · call booked", from: "#8B5CF6", to: "#EC4899" },
];

/**
 * The lead desk as the owner sees it: a quiet stack of already-handled leads,
 * with a toast for the one that just landed.
 */
export function NotificationStackMockup({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      <MockupFrame innerClassName="p-3">
        <ul className="space-y-2.5">
          {ROWS.map((row) => (
            <li
              key={row.name}
              className="flex items-center gap-3 rounded-xl border border-hairline bg-white px-3 py-2.5"
            >
              <span
                aria-hidden
                className="h-8 w-8 shrink-0 rounded-full"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${row.from}, ${row.to})`,
                }}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-ink">
                  {row.name}
                </span>
                <span className="block truncate text-[11.5px] text-inkMuted">
                  {row.meta}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span aria-hidden className="h-2 w-2 rounded-full bg-brandGreen" />
                <span className="text-[11px] font-medium text-inkMuted">booked</span>
              </span>
            </li>
          ))}
        </ul>
      </MockupFrame>

      {/* The toast overlaps the frame's top-right corner at a slight rotation. */}
      <motion.div
        className="absolute -right-3 -top-5 flex items-center gap-2.5 rounded-2xl border border-hairline bg-white px-3.5 py-2.5 shadow-lift md:-right-6"
        style={{ rotate: -3 }}
        initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.97 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: [0, 1, 1, 0], y: [-12, 0, 0, -8] }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 5.5,
                times: [0, 0.14, 0.82, 1],
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: EASE,
              }
        }
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brandGreen">
          <Check size={14} className="text-white" aria-hidden />
        </span>
        <span>
          <span className="block text-[12px] font-semibold text-ink">
            New Lead Booked
          </span>
          <span className="block text-[11px] text-inkMuted">
            Dr. Mehta Dental · 10:02 AM
          </span>
        </span>
      </motion.div>
    </div>
  );
}
