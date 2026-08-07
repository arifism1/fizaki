"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { industries } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Card keys → their dedicated vertical page.
const KEY_TO_SLUG: Record<string, string> = {
  clinics: "clinics-dental",
  gyms: "gyms",
  interiors: "interior-designers",
  solar: "solar",
  brokers: "brokers",
  cas: "chartered-accountants",
};

/** Each vertical gets its own pastel sky and its own hand-drawn glyph. */
const SKINS: Record<string, { from: string; to: string; ink: string }> = {
  clinics: { from: "#DBEAFE", to: "#EDE9FE", ink: "#2563EB" },
  gyms: { from: "#FFEDD5", to: "#FEE2E2", ink: "#F97316" },
  interiors: { from: "#FCE7F3", to: "#EDE9FE", ink: "#EC4899" },
  solar: { from: "#FEF3C7", to: "#DCFCE7", ink: "#16A34A" },
  brokers: { from: "#CFFAFE", to: "#DBEAFE", ink: "#06B6D4" },
  cas: { from: "#EDE9FE", to: "#E0E7FF", ink: "#8B5CF6" },
};

function Glyph({ kind, color }: { kind: string; color: string }) {
  const stroke = {
    fill: "none",
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14" aria-hidden>
      {kind === "clinics" && (
        // Tooth
        <path
          d="M14 14c0-4 3-6 6-5l4 1.5L28 9c3-1 6 1 6 5 0 6-2 8-3 14-.6 3.6-1 8-3 8s-2-5-4-5-2 5-4 5-2.4-4.4-3-8c-1-6-3-8-3-14Z"
          {...stroke}
        />
      )}
      {kind === "gyms" && (
        // Dumbbell
        <g {...stroke}>
          <path d="M18 24h12" />
          <rect x="10" y="18" width="6" height="12" rx="2" />
          <rect x="32" y="18" width="6" height="12" rx="2" />
          <path d="M7 21v6M41 21v6" />
        </g>
      )}
      {kind === "interiors" && (
        // Sofa
        <g {...stroke}>
          <path d="M10 26v-6a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v6" />
          <path d="M10 26a3 3 0 0 0-3 3v6h34v-6a3 3 0 0 0-3-3" />
          <path d="M14 26v-4h20v4" />
          <path d="M12 35v3M36 35v3" />
        </g>
      )}
      {kind === "solar" && (
        // Sun over a panel
        <g {...stroke}>
          <circle cx="24" cy="14" r="5" />
          <path d="M24 5v2M24 21v2M15 14h2M31 14h2M17.6 7.6l1.4 1.4M29 19l1.4 1.4M30.4 7.6 29 9M19 19l-1.4 1.4" />
          <path d="M12 40h24l-3-11H15Z" />
          <path d="M17 34.5h14M23 29v11" />
        </g>
      )}
      {kind === "brokers" && (
        // House with a key
        <g {...stroke}>
          <path d="M10 23 24 12l14 11" />
          <path d="M14 22v14h20V22" />
          <circle cx="24" cy="29" r="3" />
          <path d="M24 32v4M24 35h2.5" />
        </g>
      )}
      {kind === "cas" && (
        // Document with a rupee
        <g {...stroke}>
          <path d="M14 8h14l8 8v24a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" />
          <path d="M28 8v8h8" />
          <path d="M19 23h10M19 27h10M27 23c0 4-3.5 4-8 4l8 6" />
        </g>
      )}
    </svg>
  );
}

/** Alternating tilt and vertical offset, so the six read as a hand-dealt fan. */
const FAN = [
  { rotate: -6, y: 10 },
  { rotate: 4, y: -4 },
  { rotate: -3, y: 6 },
  { rotate: 6, y: -6 },
  { rotate: -5, y: 8 },
  { rotate: 3, y: -2 },
];

export function FannedIndustryCards({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    // The rail always owns the horizontal overflow. `w-max` + `mx-auto` on the
    // track centres the fan when it fits and lets it swipe when it doesn't —
    // letting the fan itself overflow would widen the whole document at tablet
    // widths, where six overlapping cards are still ~1100px across.
    <div
      className={cn(
        "no-scrollbar -mx-6 overflow-x-auto px-6 md:mx-0 md:px-0",
        className,
      )}
    >
      <div
        className="flex w-max snap-x snap-mandatory gap-4 pb-16 pt-10 md:mx-auto md:gap-0"
        onMouseLeave={() => setHovered(null)}
      >
      {industries.cards.map((card, i) => {
        const skin = SKINS[card.key];
        const fan = FAN[i];
        const isHovered = hovered === i;
        // Neighbours ease away from whichever card is lifted.
        const push =
          hovered === null || isHovered ? 0 : i < hovered ? -14 : 14;

        return (
          <motion.a
            key={card.key}
            href={`/industries/${KEY_TO_SLUG[card.key]}`}
            aria-label={`Explore ${card.label}`}
            onMouseEnter={() => setHovered(i)}
            className="relative block w-[190px] shrink-0 snap-center overflow-hidden rounded-2xl border border-hairline bg-canvasAlt md:-ml-14 md:first:ml-0"
            // Later cards sit on top, so each card is overlapped on its right
            // and its label stays readable — a hand of cards fanned rightwards.
            style={{ zIndex: isHovered ? 30 : i }}
            initial={false}
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: isHovered ? 0 : fan.rotate,
                    y: isHovered ? fan.y - 18 : fan.y,
                    x: push,
                    boxShadow: isHovered
                      ? "0 24px 80px -20px rgba(30,30,60,0.25)"
                      : "0 1px 2px rgba(0,0,0,0.04)",
                  }
            }
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* The "hero image" of the mini landing page */}
            <div
              className="flex h-[112px] items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(140deg, ${skin.from}, ${skin.to})`,
              }}
            >
              <Glyph kind={card.key} color={skin.ink} />
            </div>

            <div className="p-4">
              {/* Fake nav bars */}
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-6 rounded-full bg-[#E4E3DE]" />
                <span className="h-1.5 w-4 rounded-full bg-[#EDECE8]" />
                <span className="h-1.5 w-5 rounded-full bg-[#EDECE8]" />
              </div>

              <h3 className="mt-3 text-[15px] font-semibold text-ink">
                {card.label}
              </h3>
              <p className="mt-1 text-[12px] leading-[1.5] text-inkBody">
                {card.blurb}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-brandGreen px-3 py-1.5 text-[11px] font-medium text-white">
                Book now
              </span>
            </div>
          </motion.a>
        );
      })}
      </div>
    </div>
  );
}
