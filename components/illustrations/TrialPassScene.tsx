"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/lib/motion";
import { useInViewGate } from "@/lib/use-in-view";

/**
 * A tilted "7-DAY FREE TRIAL" membership card with a barcode and a perforated
 * edge, a bobbing dumbbell beside it, and a progress ring that fills 0→100% on
 * view — three confetti dots popping when it completes.
 */
export function TrialPassScene({
  accent,
  accentAlt = "#EC4899",
}: {
  accent: string;
  accentAlt?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInViewGate<SVGSVGElement>();
  const animating = inView && !reduce;

  const confetti = [
    { x: 250, y: 70, c: accent },
    { x: 300, y: 58, c: accentAlt },
    { x: 342, y: 86, c: accent },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 340"
      className="h-auto w-full"
      role="img"
      aria-label="A 7-day free trial gym membership card with a progress ring filling to 100 percent and a dumbbell beside it."
    >
      <defs>
        <filter id="tp-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.14" />
        </filter>
        <linearGradient id="tp-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={accentAlt} />
        </linearGradient>
      </defs>

      {/* Confetti — pops once the ring completes */}
      {confetti.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r="5"
          fill={d.c}
          initial={reduce ? false : { scale: 0, opacity: 0, y: 10 }}
          whileInView={{ scale: [0, 1.2, 1], opacity: [0, 1, 1], y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 1.5 + i * 0.12, duration: 0.5, ease: EASE }}
          style={{ transformOrigin: `${d.x}px ${d.y}px` } as React.CSSProperties}
        />
      ))}

      {/* Card group, tilted */}
      <g transform="rotate(-8 220 180)">
        {/* Progress ring around the card */}
        <rect
          x="106"
          y="112"
          width="228"
          height="136"
          rx="24"
          fill="none"
          stroke="#E4E3DE"
          strokeWidth="6"
        />
        <motion.rect
          x="106"
          y="112"
          width="228"
          height="136"
          rx="24"
          fill="none"
          stroke={accent}
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={1}
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: EASE }}
          transform="rotate(-90 220 180)"
        />

        {/* The card */}
        <g filter="url(#tp-shadow)">
          <rect x="120" y="126" width="200" height="108" rx="16" fill="url(#tp-card)" />
        </g>
        {/* Perforated edge */}
        <line
          x1="120"
          y1="180"
          x2="320"
          y2="180"
          stroke="#FFFFFF"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="2 6"
        />
        <circle cx="120" cy="180" r="7" fill="#F7F7F5" />
        <circle cx="320" cy="180" r="7" fill="#F7F7F5" />

        <text x="136" y="156" fill="#FFFFFF" fontSize="14" fontWeight="600" letterSpacing="0.06em" fontFamily="var(--font-sans), sans-serif">
          7-DAY FREE TRIAL
        </text>
        <text x="136" y="174" fill="#FFFFFF" fillOpacity="0.85" fontSize="10" letterSpacing="0.16em" fontFamily="var(--font-sans), sans-serif">
          IRON YARD FITNESS
        </text>

        {/* Barcode strip */}
        <g transform="translate(136 196)">
          {[0, 4, 7, 12, 15, 18, 24, 27, 33, 38, 42, 48, 54, 58, 64, 70].map(
            (x, i) => (
              <rect
                key={i}
                x={x}
                y="0"
                width={i % 3 === 0 ? 3 : 1.6}
                height="22"
                fill="#FFFFFF"
                fillOpacity="0.9"
              />
            ),
          )}
        </g>
      </g>

      {/* Bobbing dumbbell */}
      <motion.g
        animate={animating ? { y: [0, -10, 0] } : undefined}
        transition={
          animating ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : undefined
        }
      >
        <g stroke="#0F0F0F" strokeWidth="0" filter="url(#tp-shadow)">
          <rect x="360" y="228" width="12" height="34" rx="4" fill="#0F0F0F" />
          <rect x="378" y="222" width="12" height="46" rx="4" fill="#0F0F0F" />
          <rect x="372" y="240" width="24" height="10" rx="5" fill="#0F0F0F" />
          <rect x="356" y="234" width="8" height="22" rx="4" fill={accent} />
          <rect x="388" y="228" width="8" height="34" rx="4" fill={accent} />
        </g>
      </motion.g>
    </svg>
  );
}
