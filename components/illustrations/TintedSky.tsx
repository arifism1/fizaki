"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useInViewGate } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * The homepage DuskSkyBackdrop, refactored to accept a `tint`. Every vertical
 * page shares one sky; the mid-gradient stops are blended 35% toward the
 * industry's hue so each page reads in its own colour while the star field,
 * mountain silhouettes and mist stay identical to the homepage.
 */

type Star = {
  left: number;
  top: number;
  size: number;
  min: number;
  max: number;
  dur: number;
};

// Seeded LCG so the server and client generate byte-identical coordinates.
function buildStars(count: number, seed: number): Star[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => {
    const max = 0.3 + rand() * 0.6;
    return {
      left: rand() * 100,
      top: rand() * 45,
      size: rand() > 0.78 ? 2 : 1,
      min: max * 0.25,
      max,
      dur: 3 + rand() * 4,
    };
  });
}

const STARS = buildStars(44, 20260807);
const STARS_SOFT = buildStars(20, 99117);

/** Ordered [color, position%] stops for each base sky. */
const HERO_STOPS: [string, number][] = [
  ["#3E4FA8", 0],
  ["#5B67C4", 18],
  ["#8B7FD1", 38],
  ["#B98FC4", 55],
  ["#D9A2B6", 70],
  ["#EFC3A4", 84],
  ["#F7F7F5", 100],
];

const SOFT_STOPS: [string, number][] = [
  ["#5B67C4", 0],
  ["#7C7FCC", 20],
  ["#A38ACD", 42],
  ["#C79ABD", 62],
  ["#E6B3A9", 80],
  ["#F7F7F5", 100],
];

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function blend(base: string, tint: string, amount: number) {
  const a = hexToRgb(base);
  const b = hexToRgb(tint);
  return rgbToHex(
    a.r + (b.r - a.r) * amount,
    a.g + (b.g - a.g) * amount,
    a.b + (b.b - a.b) * amount,
  );
}

/** Blend every stop toward the tint except the final canvas stop (kept for mist). */
function tintedGradient(
  stops: [string, number][],
  tint: string,
  amount: number,
) {
  const body = stops
    .map(([color, pos], i) => {
      const isLast = i === stops.length - 1;
      const c = isLast ? color : blend(color, tint, amount);
      return `${c} ${pos}%`;
    })
    .join(", ");
  return `linear-gradient(180deg, ${body})`;
}

export function TintedSky({
  tint,
  variant = "hero",
  className,
}: {
  tint: string;
  variant?: "hero" | "cta";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  // Pause every loop (twinkle + drifting clouds) once this full-viewport
  // backdrop scrolls out of view — it otherwise composites forever.
  const { ref, inView } = useInViewGate<HTMLDivElement>();
  const animating = inView && !reduceMotion;
  const cta = variant === "cta";
  const stars = cta ? STARS_SOFT : STARS;
  const gradient = tintedGradient(
    cta ? SOFT_STOPS : HERO_STOPS,
    tint,
    cta ? 0.28 : 0.35,
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Base tinted sky */}
      <div className="absolute inset-0" style={{ backgroundImage: gradient }} />

      {/* Star field */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={
              {
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
                opacity: star.max,
                animationPlayState: inView ? "running" : "paused",
                "--star-min": star.min,
                "--star-max": star.max,
                "--star-dur": `${star.dur}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Low glow, tinted to the accent, right of centre */}
      <div
        className="absolute bottom-[14%] right-[8%] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${blend(
            "#FFDCB4",
            tint,
            0.35,
          )}80, transparent 65%)`,
        }}
      />

      {/* Two slow-drifting cloud blobs — only animate while the sky is on screen. */}
      {!reduceMotion && (
        <>
          <motion.div
            className="absolute left-[-10%] top-[38%] h-24 w-[420px] rounded-full bg-white/12 blur-2xl"
            animate={animating ? { x: ["0%", "60%", "0%"] } : { x: "0%" }}
            transition={
              animating
                ? { duration: 52, repeat: Infinity, ease: "linear" }
                : { duration: 0 }
            }
          />
          <motion.div
            className="absolute right-[-14%] top-[52%] h-20 w-[340px] rounded-full bg-white/10 blur-2xl"
            animate={animating ? { x: ["0%", "-50%", "0%"] } : { x: "0%" }}
            transition={
              animating
                ? { duration: 44, repeat: Infinity, ease: "linear" }
                : { duration: 0 }
            }
          />
        </>
      )}

      {/* Mountain silhouettes — back range then front, both dissolving into mist. */}
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="block h-[200px] w-full md:h-[280px]"
        >
          <path
            fill="#8E8FC0"
            fillOpacity="0.45"
            d="M0 214 L118 150 L206 196 L318 108 L430 188 L540 130 L648 200 L760 142 L880 206 L988 150 L1104 210 L1216 156 L1330 208 L1440 168 L1440 320 L0 320 Z"
          />
          <path
            fill="#6E6FA8"
            fillOpacity="0.65"
            d="M0 268 L96 222 L182 258 L286 190 L390 250 L500 206 L604 262 L716 214 L830 266 L940 220 L1060 268 L1170 224 L1288 266 L1440 226 L1440 320 L0 320 Z"
          />
        </svg>

        {/* Mist: the ranges melt into the page canvas rather than ending on a line. */}
        <div
          className="absolute inset-x-0 bottom-0 h-[130px]"
          style={{
            backgroundImage: "linear-gradient(to top, #F7F7F5, transparent)",
          }}
        />
      </div>
    </div>
  );
}
