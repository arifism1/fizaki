"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { QuoteDialog } from "@/components/sections/quote-dialog";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { quote } from "@/lib/content";
import { cardHover } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Quote() {
  const [openPackage, setOpenPackage] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <Section id={quote.id} labelledBy="quote-heading" tone="alt">
      <Reveal>
        <SectionHeading
          id="quote-heading"
          eyebrow={quote.eyebrow}
          title={quote.heading}
          subtitle={quote.body}
        />
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {quote.packages.map((pkg, i) => (
          <Reveal key={pkg.key} delay={0.08 * i}>
            <motion.div
              whileHover={reduceMotion ? undefined : cardHover}
              className={cn(
                "flex h-full flex-col rounded-3xl border p-7 transition-shadow duration-300 hover:shadow-lift",
                pkg.featured
                  ? "border-ink bg-ink text-white"
                  : "border-hairline bg-canvas shadow-rest",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3
                  className={cn(
                    "text-[17px] font-semibold",
                    pkg.featured ? "text-white" : "text-ink",
                  )}
                >
                  {pkg.name}
                </h3>
                {"badge" in pkg && pkg.badge ? (
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink">
                    {pkg.badge}
                  </span>
                ) : null}
              </div>

              <p
                className={cn(
                  "mt-2 text-[14px] leading-[1.5]",
                  pkg.featured ? "text-white/70" : "text-inkBody",
                )}
              >
                {pkg.tagline}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                        pkg.featured ? "bg-brandGreen" : "bg-brandGreen",
                      )}
                    >
                      <Check size={10} className="text-white" aria-hidden />
                    </span>
                    <span
                      className={cn(
                        "text-[14px] leading-[1.5]",
                        pkg.featured ? "text-white/85" : "text-inkBody",
                      )}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Pill
                variant={pkg.featured ? "light" : "dark"}
                className="mt-7 w-full"
                onClick={() => setOpenPackage(pkg.key)}
              >
                {pkg.cta}
              </Pill>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 text-[13px] text-inkMuted">{quote.footnote}</p>
      </Reveal>

      <QuoteDialog packageKey={openPackage} onOpenChange={setOpenPackage} />
    </Section>
  );
}
