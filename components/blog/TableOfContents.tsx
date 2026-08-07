"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { accentBorder } from "@/lib/blog-colors";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string };

export function TableOfContents({
  containerId,
  accent,
}: {
  containerId: string;
  accent: string;
}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const nodes = Array.from(container.querySelectorAll("h2[id]"));
    const list = nodes.map((n) => ({ id: n.id, text: n.textContent ?? "" }));
    setHeadings(list);
    if (list.length) setActiveId(list[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [containerId]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
    >
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-inkMuted">
        On this page
      </p>
      <ul className="space-y-1 border-l border-hairline">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  if (reduceMotion) return;
                  const target = document.getElementById(h.id);
                  if (!target) return;
                  e.preventDefault();
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.replaceState(null, "", `#${h.id}`);
                }}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-4 text-[14px] leading-snug transition-colors",
                  isActive
                    ? cn("font-medium text-ink", accentBorder(accent))
                    : "border-transparent text-inkMuted hover:text-ink",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
