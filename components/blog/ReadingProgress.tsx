"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { accentBg } from "@/lib/blog-colors";
import { cn } from "@/lib/utils";

export function ReadingProgress({
  containerId,
  accent,
}: {
  containerId: string;
  accent: string;
}) {
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const onScroll = () => {
      const el = document.getElementById(containerId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerId, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    >
      <div
        className={cn("h-full origin-left", accentBg(accent))}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
