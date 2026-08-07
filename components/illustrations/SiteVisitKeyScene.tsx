"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE } from "@/lib/motion";

/**
 * A bobbing isometric key beside three building silhouettes, a map pin that
 * drops in with a bounce and emits ripple rings, and a booked-site-visit card.
 */
export function SiteVisitKeyScene({
  accent,
  accentAlt = "#06B6D4",
}: {
  accent: string;
  accentAlt?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 440 340"
      className="h-auto w-full"
      role="img"
      aria-label="A key beside three buildings with a map pin dropping onto a location, and a card reading site visit Saturday 4 PM, 3BHK Whitefield."
    >
      <defs>
        <filter id="sv-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.14" />
        </filter>
      </defs>

      <line x1="40" y1="272" x2="400" y2="272" stroke="#E4E3DE" strokeWidth="2" />

      {/* Three building silhouettes of varying heights */}
      <g>
        <rect x="70" y="150" width="58" height="122" rx="4" fill="#D8DAE8" />
        <rect x="132" y="104" width="66" height="168" rx="4" fill={accentAlt} fillOpacity="0.85" />
        <rect x="202" y="176" width="50" height="96" rx="4" fill="#C7C9DA" />
        {/* windows */}
        {[0, 1, 2, 3].map((r) =>
          [0, 1].map((c) => (
            <rect key={`a${r}${c}`} x={82 + c * 22} y={166 + r * 24} width="12" height="14" rx="2" fill="#FFFFFF" fillOpacity="0.7" />
          )),
        )}
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`b${r}${c}`} x={144 + c * 18} y={120 + r * 26} width="10" height="14" rx="2" fill="#FFFFFF" fillOpacity="0.85" />
          )),
        )}
      </g>

      {/* Bobbing key with faked isometric depth */}
      <motion.g
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={
          reduce ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* back face for depth */}
        <g transform="translate(4 5)" opacity="0.4">
          <circle cx="300" cy="150" r="30" fill="#B8860B" />
          <rect x="326" y="142" width="76" height="16" rx="4" fill="#B8860B" />
        </g>
        <g filter="url(#sv-shadow)">
          <circle cx="296" cy="146" r="30" fill="#E0A94B" />
          <circle cx="296" cy="146" r="14" fill="#F7F7F5" />
          <rect x="322" y="138" width="80" height="16" rx="4" fill="#E0A94B" />
          <rect x="388" y="138" width="8" height="26" rx="2" fill="#E0A94B" />
          <rect x="374" y="138" width="6" height="20" rx="2" fill="#E0A94B" />
        </g>
        <circle cx="296" cy="146" r="30" fill="#FFFFFF" fillOpacity="0.15" />
      </motion.g>

      {/* Map pin drops in with a bounce, over ripple rings */}
      <g transform="translate(300 236)">
        {!reduce &&
          [0, 1].map((i) => (
            <motion.circle
              key={i}
              cx="0"
              cy="8"
              r="10"
              fill="none"
              stroke={accent}
              strokeWidth="2"
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: [0.4, 2.4], opacity: [0.6, 0] }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: 0.7 + i * 0.4,
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 0.6,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "0px 8px" } as React.CSSProperties}
            />
          ))}
        <motion.g
          initial={reduce ? false : { y: -48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <path
            d="M0 -22 C -13 -22 -20 -12 -20 -3 C -20 9 0 22 0 22 C 0 22 20 9 20 -3 C 20 -12 13 -22 0 -22 Z"
            fill={accent}
            filter="url(#sv-shadow)"
          />
          <circle cx="0" cy="-3" r="7" fill="#FFFFFF" />
        </motion.g>
      </g>

      {/* Booked-visit card */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: 1, duration: 0.6, ease: EASE }}
      >
        <g filter="url(#sv-shadow)">
          <rect x="70" y="288" width="256" height="34" rx="17" fill="#FFFFFF" />
        </g>
        <circle cx="90" cy="305" r="7" fill={accent} />
        <path d="M86.5 305 l3 3 l5 -5.5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="106" y="310" fill="#0F0F0F" fontSize="12" fontWeight="600" fontFamily="var(--font-sans), sans-serif">
          Site visit · Sat 4:00 PM · 3BHK, Whitefield
        </text>
      </motion.g>
    </svg>
  );
}
