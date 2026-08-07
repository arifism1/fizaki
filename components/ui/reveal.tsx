"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { baseTransition, revealVariants, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Seconds. Siblings stagger at 0.08–0.12 increments. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * The only entrance animation on the site. Every block uses it — there is no
 * second reveal style, no scale, no blur, no direction variants.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ ...baseTransition, delay }}
    >
      {children}
    </MotionTag>
  );
}
