"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { IndustryGlyph } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE } from "@/lib/motion";
import { INDUSTRIES, type Industry } from "@/lib/industries";

const FAN = [-5, 3, -4, 5, -3];

export function IndustrySwitcher({ current }: { current: Industry }) {
  const others = INDUSTRIES.filter((i) => i.slug !== current.slug);
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <Section tone="canvas" labelledBy="switch-heading">
      <Reveal>
        <SectionHeading
          id="switch-heading"
          title={[{ text: "Not quite your business? Pick the one that is." }]}
        />
      </Reveal>

      <div className="no-scrollbar -mx-6 mt-10 overflow-x-auto px-6 md:mx-0 md:px-0">
        <div
          className="flex w-max snap-x snap-mandatory gap-4 pb-10 pt-8 md:mx-auto md:gap-0"
          onMouseLeave={() => setHovered(null)}
        >
          {others.map((ind, i) => {
            const isHovered = hovered === i;
            const rot = FAN[i % FAN.length];
            const push =
              hovered === null || isHovered ? 0 : i < hovered ? -12 : 12;

            return (
              <motion.a
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                onMouseEnter={() => setHovered(i)}
                aria-label={`Explore ${ind.name}`}
                className="relative flex h-[260px] w-[200px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-hairline bg-white md:-ml-10 md:first:ml-0"
                style={{ zIndex: isHovered ? 30 : i }}
                initial={false}
                animate={
                  reduce
                    ? undefined
                    : {
                        rotate: isHovered ? 0 : rot,
                        y: isHovered ? -16 : 0,
                        x: push,
                        boxShadow: isHovered
                          ? "0 24px 80px -20px rgba(30,30,60,0.25)"
                          : "0 1px 2px rgba(0,0,0,0.04)",
                      }
                }
                transition={{ duration: 0.5, ease: EASE }}
              >
                {/* Top 60% — accent gradient with a faint glyph */}
                <div
                  className="flex h-[156px] items-center justify-center"
                  style={{
                    backgroundImage: `linear-gradient(140deg, ${ind.accent}, ${ind.accentAlt})`,
                  }}
                >
                  <span className="text-white/40">
                    <IndustryGlyph name={ind.glyph} size={64} strokeWidth={1.6} />
                  </span>
                </div>

                {/* Bottom 40% — name + arrow */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <h3 className="text-[15px] font-semibold leading-[1.3] text-ink">
                    {ind.name}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1 text-[13px] font-medium"
                    style={{ color: ind.accent }}
                  >
                    Explore
                    <ArrowRight size={14} aria-hidden />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
