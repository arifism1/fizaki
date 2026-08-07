"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/lib/motion";

/**
 * An architect's flat-lay: a blueprint floor-plan sheet, three fabric swatches
 * that fan out on view, a line-drawn armchair, and a budget chip that flips from
 * "Unqualified" to a qualified brief.
 */
export function MoodboardScene({
  accent,
  accentAlt = "#EC4899",
}: {
  accent: string;
  accentAlt?: string;
}) {
  const reduce = useReducedMotion();

  // Muted terracotta / sage / cream, fanned to their resting angles.
  const swatches = [
    { c: "#C08457", rot: -14, x: -26 },
    { c: "#9CAF88", rot: 0, x: 0 },
    { c: "#E8DCC4", rot: 14, x: 26 },
  ];

  return (
    <svg
      viewBox="0 0 440 340"
      className="h-auto w-full"
      role="img"
      aria-label="An interior design flat-lay with a floor plan, fabric swatches, an armchair sketch and a budget chip flipping from unqualified to a qualified 3BHK brief."
    >
      <defs>
        <filter id="mb-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Blueprint floor-plan sheet */}
      <g transform="rotate(-5 150 150)" filter="url(#mb-shadow)">
        <rect x="52" y="70" width="196" height="150" rx="8" fill="#FFFFFF" />
        <rect x="52" y="70" width="196" height="150" rx="8" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1.5" />
        <g stroke={accent} strokeOpacity="0.5" strokeWidth="1.4" fill="none">
          <path d="M62 120 H160 V80" />
          <path d="M160 120 H238" />
          <path d="M120 120 V210" />
          <path d="M120 168 H238" />
          <path d="M62 80 V210 H238" />
          {/* door swings */}
          <path d="M120 145 a10 10 0 0 1 10 -10" />
          <path d="M182 168 a10 10 0 0 1 10 10" />
        </g>
        <rect x="62" y="86" width="18" height="4" rx="2" fill={accent} fillOpacity="0.4" />
      </g>

      {/* Fabric swatches — fan out on view */}
      <g transform="translate(300 128)">
        {swatches.map((s, i) => (
          <motion.g
            key={i}
            initial={reduce ? false : { rotate: 0, x: 0, opacity: 0 }}
            whileInView={{ rotate: s.rot, x: s.x, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: EASE }}
            style={{ transformOrigin: "0px 40px" } as React.CSSProperties}
          >
            <g filter="url(#mb-shadow)">
              <rect x="-30" y="-4" width="60" height="60" rx="8" fill={s.c} />
            </g>
            <rect x="-30" y="-4" width="60" height="60" rx="8" fill="#FFFFFF" fillOpacity="0.12" />
            <rect x="-30" y="42" width="60" height="14" rx="0" fill="#000000" fillOpacity="0.08" />
          </motion.g>
        ))}
      </g>

      {/* Line-drawn armchair */}
      <g transform="translate(300 224)" stroke={accentAlt} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 14 v-8 a8 8 0 0 1 8 -8 h40 a8 8 0 0 1 8 8 v8" />
        <path d="M-4 14 a6 6 0 0 0 -6 6 v12 h72 v-12 a6 6 0 0 0 -6 -6" />
        <path d="M4 12 v-2 h48 v2" />
        <path d="M-4 32 v10 M60 32 v10" />
      </g>

      {/* Budget chip — flips from Unqualified to the qualified brief */}
      <g transform="translate(112 250)">
        {/* Unqualified face */}
        <motion.g
          initial={reduce ? false : { scaleX: 1 }}
          whileInView={{ scaleX: reduce ? 1 : [1, 0, 0] }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASE, times: [0, 0.5, 1] }}
          style={{ transformOrigin: "108px 22px" } as React.CSSProperties}
        >
          <rect x="0" y="0" width="216" height="44" rx="22" fill="#FEECEC" />
          <rect x="0" y="0" width="216" height="44" rx="22" fill="none" stroke="#F4B4B4" strokeWidth="1.4" />
          <circle cx="26" cy="22" r="7" fill="#EF4444" />
          <text x="44" y="27" fill="#B91C1C" fontSize="14" fontWeight="600" fontFamily="var(--font-sans), sans-serif">
            Unqualified
          </text>
        </motion.g>

        {/* Qualified face */}
        <motion.g
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: reduce ? 1 : [0, 0, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASE, times: [0, 0.5, 1] }}
          style={{ transformOrigin: "108px 22px" } as React.CSSProperties}
        >
          <rect x="0" y="0" width="216" height="44" rx="22" fill={accent} />
          <circle cx="26" cy="22" r="7" fill="#FFFFFF" />
          <path d="M22.5 22 l3 3 l5 -5.5" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="44" y="27" fill="#FFFFFF" fontSize="13" fontWeight="600" fontFamily="var(--font-sans), sans-serif">
            ₹18L+ · 3BHK · Q4
          </text>
        </motion.g>
      </g>
    </svg>
  );
}
