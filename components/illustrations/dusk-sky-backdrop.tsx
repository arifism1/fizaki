"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Deterministic star field. A seeded LCG runs once at module load so the server
 * and the client generate byte-identical coordinates — a Math.random() field
 * would hydrate mismatched.
 */
type Star = {
  left: number;
  top: number;
  size: number;
  min: number;
  max: number;
  dur: number;
};

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
      // Stars live in the top 45% only, where the sky is still deep.
      top: rand() * 45,
      size: rand() > 0.78 ? 2 : 1,
      min: max * 0.25,
      max,
      dur: 3 + rand() * 4,
    };
  });
}

const STARS = buildStars(60, 20260807);
const STARS_SOFT = buildStars(26, 99117);

const SKY =
  "linear-gradient(180deg, #3E4FA8 0%, #5B67C4 18%, #8B7FD1 38%, #B98FC4 55%, #D9A2B6 70%, #EFC3A4 84%, #F7F7F5 100%)";

/** A gentler sky for the closing section, so the page bookends without repeating. */
const SKY_SOFT =
  "linear-gradient(180deg, #5B67C4 0%, #7C7FCC 20%, #A38ACD 42%, #C79ABD 62%, #E6B3A9 80%, #F7F7F5 100%)";

export function DuskSkyBackdrop({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "soft";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const soft = variant === "soft";
  const stars = soft ? STARS_SOFT : STARS;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Base sky */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: soft ? SKY_SOFT : SKY }}
      />

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
                "--star-min": star.min,
                "--star-max": star.max,
                "--star-dur": `${star.dur}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Low sun-glow, right of centre */}
      <div
        className="absolute bottom-[14%] right-[8%] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,220,180,0.5), transparent 65%)",
        }}
      />

      {/* Two slow-drifting cloud blobs */}
      {!reduceMotion && (
        <>
          <motion.div
            className="absolute left-[-10%] top-[38%] h-24 w-[420px] rounded-full bg-white/12 blur-2xl"
            animate={{ x: ["0%", "60%", "0%"] }}
            transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute right-[-14%] top-[52%] h-20 w-[340px] rounded-full bg-white/10 blur-2xl"
            animate={{ x: ["0%", "-50%", "0%"] }}
            transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
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
