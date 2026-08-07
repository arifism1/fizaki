"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/lib/motion";

/**
 * A side-profile dental chair under an overhead lamp. An appointment card slides
 * in and settles, a green check stamps onto it, and a tooth glyph orbits the
 * lamp glow, which pulses on a 4s loop.
 */
export function DentalChairScene({ accent }: { accent: string; accentAlt?: string }) {
  const reduce = useReducedMotion();

  // 12-point circular path for the orbiting tooth, centred on the lamp.
  const R = 30;
  const steps = 12;
  const orbitX = Array.from({ length: steps + 1 }, (_, i) =>
    Math.cos((i / steps) * Math.PI * 2) * R,
  );
  const orbitY = Array.from({ length: steps + 1 }, (_, i) =>
    Math.sin((i / steps) * Math.PI * 2) * R,
  );

  return (
    <svg
      viewBox="0 0 440 340"
      className="h-auto w-full"
      role="img"
      aria-label="A dental chair beneath an overhead lamp with an appointment card for Mrs. Iyer at 11:30 AM being booked and confirmed."
    >
      <defs>
        <filter id="dc-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.12" />
        </filter>
        <radialGradient id="dc-glow">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Floor line */}
      <line x1="40" y1="300" x2="400" y2="300" stroke="#E4E3DE" strokeWidth="2" />

      {/* Lamp arm + head */}
      <path
        d="M300 40 L300 70 L262 92"
        fill="none"
        stroke="#C7C9DA"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="300" cy="34" r="8" fill="#C7C9DA" />

      {/* Pulsing lamp glow */}
      <motion.circle
        cx="248"
        cy="100"
        r="46"
        fill="url(#dc-glow)"
        animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
        transition={
          reduce
            ? undefined
            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ transformOrigin: "248px 100px" } as React.CSSProperties}
      />
      <circle cx="248" cy="100" r="15" fill={accent} />
      <circle cx="248" cy="100" r="15" fill="#FFFFFF" fillOpacity="0.25" />

      {/* Orbiting tooth (translated around the lamp centre) */}
      <motion.g
        animate={reduce ? undefined : { x: orbitX, y: orbitY }}
        transition={
          reduce
            ? undefined
            : { duration: 7, repeat: Infinity, ease: "linear", times: undefined }
        }
      >
        <path
          d="M248 78c0-3 2-4.5 4-3.8l3 1.2 3-1.2c2-.7 4 .8 4 3.8 0 4-1.3 5.3-2 9.3-.4 2.4-.7 5.3-2 5.3s-1.3-3.3-2.6-3.3-1.3 3.3-2.6 3.3-1.6-2.9-2-5.3c-.7-4-2-5.3-2-9.3Z"
          fill="#FFFFFF"
          stroke={accent}
          strokeWidth="1.6"
        />
      </motion.g>

      {/* Dental chair — backrest, seat, base, headrest */}
      <g filter="url(#dc-shadow)">
        {/* base column */}
        <rect x="150" y="250" width="86" height="20" rx="6" fill="#C7C9DA" />
        <rect x="182" y="215" width="22" height="44" rx="6" fill="#B4B7CC" />
        {/* seat */}
        <rect x="150" y="196" width="150" height="26" rx="12" fill={accent} />
        {/* backrest */}
        <rect
          x="120"
          y="120"
          width="46"
          height="96"
          rx="16"
          fill={accent}
          transform="rotate(-18 143 168)"
        />
        {/* headrest */}
        <rect
          x="104"
          y="112"
          width="34"
          height="26"
          rx="10"
          fill="#0F0F0F"
          transform="rotate(-18 121 125)"
        />
      </g>

      {/* Appointment card — slides in from the right and settles */}
      <motion.g
        initial={reduce ? false : { x: 120, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <g filter="url(#dc-shadow)">
          <rect x="256" y="150" width="150" height="76" rx="14" fill="#FFFFFF" />
        </g>
        <rect x="256" y="150" width="150" height="76" rx="14" fill="none" stroke="#E4E3DE" strokeWidth="1.5" />
        <circle cx="278" cy="176" r="10" fill={accent} fillOpacity="0.18" />
        <text x="296" y="180" fill="#0F0F0F" fontSize="13" fontWeight="600" fontFamily="var(--font-sans), sans-serif">
          Mrs. Iyer
        </text>
        <text x="272" y="204" fill="#5C5C5C" fontSize="11.5" fontFamily="var(--font-sans), sans-serif">
          11:30 AM · Cleaning
        </text>

        {/* Green check stamps on */}
        <motion.g
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.9, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: "388px 164px" } as React.CSSProperties}
        >
          <circle cx="388" cy="164" r="13" fill="#22C55E" />
          <path
            d="M382 164 l4 4 l8 -8"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}
