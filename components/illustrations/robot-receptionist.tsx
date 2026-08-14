"use client";

import { motion, useReducedMotion } from "framer-motion";

import { finalCta } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The house mascot: a small headset robot standing on a mound at the end of the
 * page. It blinks every four seconds and holds a speech bubble reporting the
 * one number the whole site is about.
 */
export function RobotReceptionist({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const blink = reduceMotion
    ? {}
    : {
        animate: { scaleY: [1, 1, 0.1, 1] },
        transition: {
          duration: 4,
          times: [0, 0.92, 0.96, 1],
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div className={cn("w-[190px]", className)}>
      <svg
        viewBox="0 0 200 230"
        className="h-auto w-full"
        role="img"
        aria-label={`A friendly robot receptionist holding a speech bubble that reads "${finalCta.robotBubble}"`}
      >
        <defs>
          <linearGradient id="bot-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E8E9F2" />
          </linearGradient>
          <linearGradient id="bot-head" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#EDEEF6" />
          </linearGradient>
          <radialGradient id="eye-glow">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </radialGradient>
        </defs>

        {/* The mound it stands on, dissolving into the sky above the page edge. */}
        <ellipse cx="100" cy="206" rx="76" ry="20" fill="#6E6FA8" fillOpacity="0.5" />
        <ellipse cx="100" cy="200" rx="58" ry="14" fill="#8E8FC0" fillOpacity="0.45" />

        {/* Speech bubble */}
        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <rect x="40" y="8" width="156" height="36" rx="18" fill="#FFFFFF" />
          <path d="M80 44 l-8 12 l16 -7 Z" fill="#FFFFFF" />
          <text
            x="118"
            y="30"
            textAnchor="middle"
            fill="#0F0F0F"
            fontSize="13"
            fontWeight="600"
            fontFamily="var(--font-sans), sans-serif"
          >
            {finalCta.robotBubble}
          </text>
        </motion.g>

        {/* Antenna */}
        <line x1="72" y1="70" x2="72" y2="52" stroke="#C7C9DA" strokeWidth="4" strokeLinecap="round" />
        <motion.circle
          cx="72"
          cy="48"
          r="6"
          fill="#22C55E"
          animate={reduceMotion ? undefined : { opacity: [1, 0.45, 1] }}
          transition={
            reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        />

        {/* Body */}
        <rect x="46" y="140" width="76" height="60" rx="24" fill="url(#bot-body)" />
        <rect x="66" y="158" width="36" height="6" rx="3" fill="#D8DAE8" />
        <rect x="66" y="172" width="24" height="6" rx="3" fill="#D8DAE8" />

        {/* Head */}
        <rect x="38" y="70" width="92" height="76" rx="26" fill="url(#bot-head)" />

        {/* Visor */}
        <rect x="52" y="88" width="64" height="38" rx="17" fill="#1B1D2E" />

        {/* Eyes — the blink is a scaleY squash about the pupil centre. */}
        <motion.g style={{ originX: "0px", originY: "0px" }}>
          <motion.ellipse cx="72" cy="107" rx="7" ry="8" fill="url(#eye-glow)" {...blink} />
          <motion.ellipse cx="96" cy="107" rx="7" ry="8" fill="url(#eye-glow)" {...blink} />
        </motion.g>

        {/* Headset: band over the head plus the mic boom */}
        <path
          d="M32 112 v-16 a52 52 0 0 1 104 0 v16"
          fill="none"
          stroke="#C7C9DA"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x="22" y="104" width="18" height="30" rx="9" fill="#22C55E" />
        <rect x="128" y="104" width="18" height="30" rx="9" fill="#22C55E" />
        <path
          d="M131 132 q-6 22 -24 24"
          fill="none"
          stroke="#C7C9DA"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="105" cy="157" r="5" fill="#22C55E" />
      </svg>
    </div>
  );
}
