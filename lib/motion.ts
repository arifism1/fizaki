import type { Transition, Variants } from "framer-motion";

/**
 * One easing curve and one duration band for the entire site.
 * Nothing faster, nothing bouncier — no spring physics anywhere.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.45,
  base: 0.7,
  slow: 0.8,
} as const;

export const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASE,
};

/** The single entrance animation used by <Reveal>. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/** Shared viewport config so every block fires at the same scroll offset. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/** The entire hover vocabulary: a 4px lift and a deeper shadow. */
export const cardHover = {
  y: -4,
  transition: { duration: DURATION.fast, ease: EASE },
} as const;

/** Staggered children for hero copy and list groups. */
export const stagger = (delay = 0, step = 0.1): Transition => ({
  delayChildren: delay,
  staggerChildren: step,
});

/** SVG paths draw themselves in on scroll. */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: EASE },
  },
};
