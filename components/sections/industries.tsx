"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { industries } from "@/lib/content";
import { INDUSTRIES } from "@/lib/industries";
import { EASE } from "@/lib/motion";

// Homepage tab keys → their dedicated vertical page.
const TAB_TO_SLUG: Record<string, string> = {
  clinics: "clinics-dental",
  gyms: "gyms",
  interiors: "interior-designers",
  solar: "solar",
  brokers: "brokers",
  cas: "chartered-accountants",
};

// The card fan is heavy, purely decorative and well below the fold.
const FannedIndustryCards = dynamic(
  () =>
    import("@/components/illustrations/fanned-industry-cards").then(
      (m) => m.FannedIndustryCards,
    ),
  { ssr: false, loading: () => <div className="h-[300px]" /> },
);

export function Industries() {
  const [active, setActive] = useState<string>(industries.tabs[0].key);

  return (
    <Section id={industries.id} labelledBy="industries-heading" tone="alt">
      <Reveal>
        <SectionHeading
          id="industries-heading"
          eyebrow={industries.eyebrow}
          title={industries.heading}
          subtitle={industries.body}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <Tabs
          value={active}
          onValueChange={setActive}
          className="mt-12"
        >
          <TabsList>
            {industries.tabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key}>
                {/* A single shared indicator slides between the pills. */}
                {active === tab.key && (
                  <motion.span
                    layoutId="industry-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {industries.tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key} className="mt-10 max-w-measure">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="text-[17px] font-semibold leading-[1.4] text-ink">
                  {tab.pain}
                </p>
                <p className="mt-3 text-[15px] leading-[1.65] text-inkBody md:text-base">
                  {tab.outcome}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {tab.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-inkBody"
                    >
                      <Check
                        size={15}
                        className="mt-1 shrink-0 text-brandGreen"
                        aria-hidden
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {(() => {
                  const ind = INDUSTRIES.find(
                    (i) => i.slug === TAB_TO_SLUG[tab.key],
                  );
                  if (!ind) return null;
                  return (
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="group mt-7 inline-flex items-center gap-1.5 text-[14px] font-medium"
                      style={{ color: ind.accent }}
                    >
                      Learn more about {ind.name}
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  );
                })()}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </Reveal>

      {/* Breaks out past the text column on large screens. Gated to lg so the
          negative margin can never escape the outer container's padding. */}
      <div className="mt-16 lg:-mx-16">
        <FannedIndustryCards />
      </div>
    </Section>
  );
}
