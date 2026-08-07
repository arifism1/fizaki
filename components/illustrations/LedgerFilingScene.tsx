"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { EASE } from "@/lib/motion";

/**
 * A stack of document sheets that shuffle upward one at a time, a green "FILED"
 * stamp that lands on the top sheet, a wall calendar with a pulsing red ring on
 * the 31st, and a chip counting queries answered.
 */
export function LedgerFilingScene({
  accent,
  accentAlt = "#22C55E",
}: {
  accent: string;
  accentAlt?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(reduce ? 142 : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 142));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce]);

  const sheets = [
    { y: 92, x: 60, delay: 0 },
    { y: 78, x: 66, delay: 0.2 },
    { y: 64, x: 72, delay: 0.4 },
    { y: 50, x: 78, delay: 0.6 },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 440 340"
      className="h-auto w-full"
      role="img"
      aria-label="A stack of filing documents with a green filed stamp, a wall calendar ringed on the 31st, and a chip counting 142 queries answered."
    >
      <defs>
        <filter id="lf-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="7" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Document stack — sheets shuffle up one at a time */}
      {sheets.map((s, i) => (
        <motion.g
          key={i}
          initial={reduce ? false : { y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: s.delay, duration: 0.5, ease: EASE }}
        >
          <g filter="url(#lf-shadow)">
            <rect x={s.x} y={s.y} width="150" height="184" rx="10" fill="#FFFFFF" />
          </g>
          <rect x={s.x} y={s.y} width="150" height="184" rx="10" fill="none" stroke="#E4E3DE" strokeWidth="1.4" />
          {i === sheets.length - 1 && (
            <g stroke="#E4E3DE" strokeWidth="4" strokeLinecap="round">
              <line x1={s.x + 20} y1={s.y + 28} x2={s.x + 96} y2={s.y + 28} />
              <line x1={s.x + 20} y1={s.y + 46} x2={s.x + 118} y2={s.y + 46} />
              <line x1={s.x + 20} y1={s.y + 64} x2={s.x + 104} y2={s.y + 64} />
              <line x1={s.x + 20} y1={s.y + 82} x2={s.x + 118} y2={s.y + 82} />
              <line x1={s.x + 20} y1={s.y + 100} x2={s.x + 88} y2={s.y + 100} />
            </g>
          )}
        </motion.g>
      ))}

      {/* FILED stamp lands on the top sheet */}
      <motion.g
        initial={reduce ? false : { scale: 2.2, opacity: 0, rotate: -18 }}
        whileInView={{ scale: [2.2, 0.94, 1], opacity: [0, 1, 1], rotate: -18 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: 1, duration: 0.5, ease: EASE, times: [0, 0.7, 1] }}
        style={{ transformOrigin: "150px 108px" } as React.CSSProperties}
      >
        <rect x="96" y="88" width="108" height="40" rx="6" fill="none" stroke={accentAlt} strokeWidth="3.5" transform="rotate(-18 150 108)" />
        <text x="150" y="115" textAnchor="middle" fill={accentAlt} fontSize="24" fontWeight="700" letterSpacing="0.08em" transform="rotate(-18 150 108)" fontFamily="var(--font-sans), sans-serif">
          FILED
        </text>
      </motion.g>

      {/* Wall calendar with a pulsing ring on the 31st */}
      <g transform="translate(258 60)" filter="url(#lf-shadow)">
        <rect x="0" y="0" width="150" height="150" rx="12" fill="#FFFFFF" />
        <rect x="0" y="0" width="150" height="34" rx="12" fill={accent} />
        <rect x="0" y="20" width="150" height="14" fill={accent} />
        <text x="14" y="23" fill="#FFFFFF" fontSize="12" fontWeight="600" fontFamily="var(--font-sans), sans-serif">
          MARCH
        </text>
        {/* grid of day dots */}
        {Array.from({ length: 28 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          return (
            <circle key={i} cx={22 + col * 18} cy={54 + row * 20} r="3" fill="#D6D5D0" />
          );
        })}
        <text x="118" y="140" fill="#0F0F0F" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="var(--font-sans), sans-serif">
          31
        </text>
        <motion.circle
          cx="118"
          cy="135"
          r="13"
          fill="none"
          stroke="#EF4444"
          strokeWidth="2.4"
          animate={reduce ? undefined : { scale: [1, 1.18, 1], opacity: [1, 0.55, 1] }}
          transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "118px 135px" } as React.CSSProperties}
        />
      </g>

      {/* Query counter chip */}
      <motion.g
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
      >
        <g filter="url(#lf-shadow)">
          <rect x="60" y="256" width="196" height="34" rx="17" fill="#FFFFFF" />
        </g>
        <circle cx="80" cy="273" r="7" fill={accentAlt} />
        <path d="M76.5 273 l3 3 l5 -5.5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="96" y="278" fill="#0F0F0F" fontSize="12.5" fontWeight="600" fontFamily="var(--font-sans), sans-serif">
          {count} queries answered
        </text>
      </motion.g>
    </svg>
  );
}
