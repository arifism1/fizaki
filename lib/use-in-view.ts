"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Gate looping/decorative animations so they only run while their element is on
 * screen. Continuous `repeat: Infinity` animations otherwise keep the compositor
 * busy even when scrolled far out of view — the main reason the industry pages
 * feel sluggish while scrolling.
 *
 * `once: false` so loops resume if the element scrolls back into view; the
 * margin keeps them running slightly before/after the edge to avoid popping.
 *
 * Used only by post-landing components — the homepage animation feel is
 * intentionally left untouched.
 */
export function useInViewGate<T extends Element = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: "120px 0px" });
  return { ref, inView };
}
