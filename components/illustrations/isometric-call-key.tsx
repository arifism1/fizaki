"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * A keycap in true isometric projection, drawn as three parallelogram faces.
 *
 * Screen coords come from the standard isometric transform of a 100×100×34
 * cap: sx = (x − y)·cos30°, sy = (x + y)·sin30° − z, translated by (100, 40)
 * so the solid sits inside the viewBox. Doing the geometry explicitly keeps the
 * three faces meeting exactly, which stacked CSS skews rarely manage.
 */
const TOP = "100,12 186.6,62 100,112 13.4,62";
const RIGHT = "186.6,62 100,112 100,146 186.6,96";
const LEFT = "13.4,62 100,112 100,146 13.4,96";

/**
 * Face content lies flat on the top plane but still reads left-to-right. A line
 * running horizontally on screen is the face's own diagonal, so the projection
 * reduces to a horizontal stretch of √3/√2 and a vertical squash of 1/√2 —
 * which is why the lettering looks correctly foreshortened rather than tilted.
 */
const FACE_PLANE = "translate(100 62) scale(1.2247 0.7071)";

export function IsometricCallKey({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  const bob = reduceMotion
    ? undefined
    : {
        animate: { y: [0, -7, 0] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <div className={cn("w-[176px] shrink-0", className)}>
      <svg
        viewBox="0 0 200 184"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="An 'Answer' key, drawn as a three-dimensional keycap"
      >
        <defs>
          <linearGradient id="key-top" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="key-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#128040" />
          </linearGradient>
          <linearGradient id="key-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#0E6031" />
          </linearGradient>
        </defs>

        {/* Contact shadow — softened, and it lightens as the cap rises.
            Animating opacity rather than rx keeps the SVG geometry static,
            which avoids Framer handing the attribute an undefined length. */}
        <motion.ellipse
          cx="100"
          cy="164"
          rx="62"
          ry="12"
          fill="rgba(15,15,15,0.16)"
          style={{ filter: "blur(6px)" }}
          animate={reduceMotion ? undefined : { opacity: [0.95, 0.6, 0.95] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        />

        <motion.g {...bob}>
          {/* Two shaded walls give the cap its depth. */}
          <polygon points={LEFT} fill="url(#key-left)" />
          <polygon points={RIGHT} fill="url(#key-right)" />
          <polygon points={TOP} fill="url(#key-top)" />

          {/* A lighter inset reads as the dish of a real keycap. */}
          <polygon
            points="100,26 168,66 100,106 32,66"
            fill="#FFFFFF"
            fillOpacity="0.12"
          />

          <g transform={FACE_PLANE}>
            {/* Phone handset, centred above the label on the face. */}
            <g transform="translate(0 -26) scale(1.25) translate(-12 -12)">
              <path
                d="M7.5 4.5h3.2l1.6 4-2 1.2a10.5 10.5 0 0 0 4.5 4.5l1.2-2 4 1.6v3.2a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 6 6.1 1.5 1.5 0 0 1 7.5 4.5Z"
                fill="#FFFFFF"
              />
            </g>

            <text
              x="0"
              y="28"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="19"
              fontWeight="600"
              fontFamily="var(--font-sans), sans-serif"
            >
              Answer
            </text>
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
