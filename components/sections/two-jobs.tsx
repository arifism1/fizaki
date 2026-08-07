"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { twoJobs } from "@/lib/content";
import { drawPath, viewportOnce } from "@/lib/motion";

export function TwoJobs() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={twoJobs.id} labelledBy="two-jobs-heading" tone="alt">
      <Reveal>
        <SectionHeading
          id="two-jobs-heading"
          eyebrow={twoJobs.eyebrow}
          title={twoJobs.heading}
          subtitle={twoJobs.body}
        />
      </Reveal>

      <div className="relative mt-16">
        {/* The arc joins the two panels: fill the funnel, then seal it. It is
            sized to the gutter so it never crosses either panel's text. */}
        <svg
          viewBox="0 0 80 48"
          className="absolute left-1/2 top-1/2 z-10 hidden h-[48px] w-[80px] -translate-x-1/2 -translate-y-1/2 md:block"
          aria-hidden
        >
          <defs>
            <marker
              id="arc-head"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" fill="#8E8E8E" />
            </marker>
          </defs>
          <motion.path
            d="M5 34 C 22 8, 56 8, 73 30"
            fill="none"
            stroke="#8E8E8E"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            strokeLinecap="round"
            markerEnd="url(#arc-head)"
            variants={drawPath}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={viewportOnce}
          />
        </svg>

        <div className="grid gap-6 md:grid-cols-2 md:gap-x-24">
          {twoJobs.panels.map((panel, i) => (
            <Reveal key={panel.title} delay={0.1 * i} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-hairline bg-canvas p-7 md:p-8">
                <IconBadge icon={panel.icon} color={panel.color} />
                <h3 className="mt-5 text-[17px] font-semibold text-ink">
                  {panel.title}
                </h3>

                {/* flex-1 pushes both taglines onto the same baseline even
                    though one list is longer than the other. */}
                <ul className="mt-5 flex-1 space-y-3">
                  {panel.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-inkBody"
                    >
                      <Check
                        size={15}
                        className="mt-1 shrink-0 text-brandGreen"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-hairline pt-5 font-display text-[22px] italic text-ink">
                  {panel.tagline}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
