"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/lib/motion";
import { useInViewGate } from "@/lib/use-in-view";

/**
 * An isometric rooftop whose six solar panels tilt into place one by one, under
 * a sun with rotating rays. An electricity-bill bar drops from tall to short and
 * a qualification chip floats in.
 */
export function RooftopSolarScene({
  accent,
  accentAlt = "#22C55E",
}: {
  accent: string;
  accentAlt?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewGate<SVGSVGElement>();
  const animating = inView && !reduce;

  // 2 rows × 3 columns of panels on the skewed roof plane.
  const panels = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      panels.push({ x: c * 66, y: r * 46, i: r * 3 + c });
    }
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 340"
      className="h-auto w-full"
      role="img"
      aria-label="An isometric house rooftop with six solar panels installing under a sun, an electricity bill dropping, and a chip reading roof owned, bill 7,200, qualified."
    >
      <defs>
        <filter id="rs-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* Sun with rotating rays */}
      <g transform="translate(356 74)">
        <motion.g
          animate={animating ? { rotate: 360 } : undefined}
          transition={
            animating ? { duration: 26, repeat: Infinity, ease: "linear" } : undefined
          }
          style={{ transformOrigin: "0px 0px" } as React.CSSProperties}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="-1.5"
              y="-40"
              width="3"
              height="12"
              rx="1.5"
              fill={accent}
              transform={`rotate(${i * 45})`}
            />
          ))}
        </motion.g>
        <circle cx="0" cy="0" r="20" fill={accent} />
        <circle cx="0" cy="0" r="20" fill="#FFFFFF" fillOpacity="0.2" />
      </g>

      {/* House body */}
      <g filter="url(#rs-shadow)">
        <path d="M96 300 V196 L220 150 L344 196 V300 Z" fill="#FFFFFF" />
      </g>
      <path d="M96 196 L220 150 L344 196 L220 236 Z" fill="#EDECE8" />
      <rect x="150" y="236" width="34" height="60" rx="3" fill="#E4E3DE" />
      <rect x="252" y="240" width="46" height="34" rx="3" fill={accent} fillOpacity="0.25" />

      {/* Solar panels — installed one by one on the skewed roof plane */}
      <g transform="translate(112 168) skewY(20.5)">
        {panels.map((p) => (
          <motion.g
            key={p.i}
            initial={reduce ? false : { opacity: 0, y: -14, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2 + p.i * 0.18, duration: 0.5, ease: EASE }}
            style={{ transformOrigin: `${p.x + 28}px ${p.y + 18}px` } as React.CSSProperties}
          >
            <rect x={p.x} y={p.y} width="56" height="38" rx="3" fill="#1B2A4A" />
            <rect x={p.x} y={p.y} width="56" height="38" rx="3" fill="none" stroke={accentAlt} strokeWidth="1" strokeOpacity="0.5" />
            <line x1={p.x + 18} y1={p.y} x2={p.x + 18} y2={p.y + 38} stroke={accentAlt} strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1={p.x + 37} y1={p.y} x2={p.x + 37} y2={p.y + 38} stroke={accentAlt} strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1={p.x} y1={p.y + 19} x2={p.x + 56} y2={p.y + 19} stroke={accentAlt} strokeWidth="0.8" strokeOpacity="0.4" />
          </motion.g>
        ))}
      </g>

      {/* Electricity-bill card, bar drops from tall to short */}
      <g transform="translate(40 214)" filter="url(#rs-shadow)">
        <rect x="0" y="0" width="86" height="96" rx="10" fill="#FFFFFF" />
        <rect x="0" y="0" width="86" height="96" rx="10" fill="none" stroke="#E4E3DE" strokeWidth="1.4" />
        <text x="12" y="22" fill="#8E8E8E" fontSize="9" letterSpacing="0.1em" fontFamily="var(--font-sans), sans-serif">
          BILL
        </text>
        <rect x="14" y="76" width="16" height="8" rx="2" fill="#E4E3DE" />
        <motion.rect
          x="14"
          width="16"
          rx="2"
          fill={accentAlt}
          initial={reduce ? false : { height: 52, y: 32 }}
          whileInView={{ height: 14, y: 70 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
        />
        <rect x="44" y="34" width="30" height="6" rx="3" fill="#E4E3DE" />
        <rect x="44" y="48" width="24" height="6" rx="3" fill="#E4E3DE" />
        <rect x="44" y="62" width="28" height="6" rx="3" fill="#E4E3DE" />
      </g>

      {/* Qualification chip floats in */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: 1.5, duration: 0.6, ease: EASE }}
      >
        <g filter="url(#rs-shadow)">
          <rect x="150" y="60" width="196" height="34" rx="17" fill="#FFFFFF" />
        </g>
        <circle cx="170" cy="77" r="7" fill={accentAlt} />
        <path d="M166.5 77 l3 3 l5 -5.5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="186" y="82" fill="#0F0F0F" fontSize="12" fontWeight="600" fontFamily="var(--font-sans), sans-serif">
          Roof: Owned · Bill: ₹7,200 · Qualified
        </text>
      </motion.g>
    </svg>
  );
}
