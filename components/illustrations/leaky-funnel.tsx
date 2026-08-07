"use client";

import { motion, useReducedMotion } from "framer-motion";

import { problem } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A glass funnel with three cracked walls. Leads pour in the top; most of them
 * escape sideways through the cracks and fade out, and only a thin trickle
 * reaches the cup. Each label sits at the end of its dot's fall, well clear of
 * the glass, so the leak and its cause read as one movement.
 *
 * Geometry: rim at y=70, walls converging to the neck at y=178. Crack points
 * are computed on those wall lines so the dots leave exactly at the fractures.
 */

/** Leads entering at the top, staggered so the pour reads as continuous. */
const INBOUND = [
  { x: 100, delay: 0, color: "#2563EB" },
  { x: 122, delay: 0.55, color: "#8B5CF6" },
  { x: 142, delay: 1.1, color: "#06B6D4" },
  { x: 110, delay: 1.65, color: "#EC4899" },
  { x: 132, delay: 2.2, color: "#F97316" },
  { x: 120, delay: 2.75, color: "#2563EB" },
];

/** Exit point on the wall, fall direction, and where the caption lands. */
const LEAKS = [
  {
    x: 77,
    y: 110,
    dir: -1,
    delay: 0.9,
    color: "#F97316",
    label: problem.funnelLabels[0],
  },
  {
    x: 156,
    y: 130,
    dir: 1,
    delay: 1.9,
    color: "#EC4899",
    label: problem.funnelLabels[1],
  },
  {
    x: 92,
    y: 152,
    dir: -1,
    delay: 2.9,
    color: "#8B5CF6",
    label: problem.funnelLabels[2],
  },
];

const FALL_X = 52;
const FALL_Y = 70;

export function LeakyFunnelIllustration({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="-40 0 320 300"
        className="h-auto w-full"
        role="img"
        aria-label="A funnel with three cracks. Most incoming leads escape through the cracks — missed calls, no reply, after hours — and only a trickle reaches the cup at the bottom."
      >
        <defs>
          <linearGradient id="funnel-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EAF1FF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#F5F8FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#DCE6FA" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="funnel-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="cup-fill">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.12" />
          </radialGradient>
        </defs>

        {/* Funnel body and neck */}
        <path
          d="M62 70 L178 70 L138 178 L138 208 L102 208 L102 178 Z"
          fill="url(#funnel-glass)"
          stroke="#C9D4EC"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="120"
          cy="70"
          rx="58"
          ry="9"
          fill="#EDF3FF"
          stroke="#C9D4EC"
          strokeWidth="1.5"
        />
        <path d="M72 78 L104 78 L86 166 L78 166 Z" fill="url(#funnel-shine)" opacity="0.7" />

        {/* Fractures in the glass, at the three exit points */}
        <g stroke="#9AA9C6" strokeWidth="1.4" strokeLinecap="round" fill="none">
          <path d="M79 104 l-8 4 l6 5 l-9 3" />
          <path d="M154 124 l8 5 l-6 4 l9 4" />
          <path d="M94 146 l-8 5 l6 4 l-9 4" />
        </g>

        {/* Leads pouring in */}
        {!reduceMotion &&
          INBOUND.map((dot, i) => (
            <motion.circle
              key={`in-${i}`}
              cx={dot.x}
              r="4"
              fill={dot.color}
              initial={{ cy: 16, opacity: 0 }}
              animate={{ cy: [16, 70, 120], opacity: [0, 1, 0.9] }}
              transition={{
                duration: 1.8,
                delay: dot.delay,
                repeat: Infinity,
                repeatDelay: 1.6,
                ease: "easeIn",
              }}
            />
          ))}

        {/* Leads escaping through the cracks */}
        {!reduceMotion &&
          LEAKS.map((leak, i) => (
            <motion.circle
              key={`leak-${i}`}
              r="4"
              fill={leak.color}
              initial={{ cx: leak.x, cy: leak.y, opacity: 0 }}
              animate={{
                cx: [leak.x, leak.x + leak.dir * (FALL_X * 0.6), leak.x + leak.dir * FALL_X],
                cy: [leak.y, leak.y + FALL_Y * 0.4, leak.y + FALL_Y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.1,
                delay: leak.delay,
                repeat: Infinity,
                repeatDelay: 1.3,
                ease: "easeIn",
              }}
            />
          ))}

        {/* Captions, parked where each escaping dot fades out */}
        {LEAKS.map((leak) => (
          <text
            key={`label-${leak.label}`}
            x={leak.x + leak.dir * FALL_X}
            y={leak.y + FALL_Y + 15}
            textAnchor="middle"
            fill="#8E8E8E"
            fontSize="11"
            fontFamily="var(--font-sans), sans-serif"
          >
            {leak.label}
          </text>
        ))}

        {/* The thin trickle that survives */}
        {!reduceMotion && (
          <motion.circle
            cx="120"
            r="3.5"
            fill="#22C55E"
            initial={{ cy: 178, opacity: 0 }}
            animate={{ cy: [178, 212, 248], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.9,
              repeat: Infinity,
              repeatDelay: 2.8,
              ease: "easeIn",
            }}
          />
        )}

        {/* Collection cup */}
        <path
          d="M92 250 L148 250 L142 284 L98 284 Z"
          fill="url(#cup-fill)"
          stroke="#9FD9B4"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="120"
          cy="250"
          rx="28"
          ry="5"
          fill="#DFF5E7"
          stroke="#9FD9B4"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
