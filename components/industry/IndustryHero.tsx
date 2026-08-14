"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { TintedSky } from "@/components/illustrations/TintedSky";
import { emphasizeBrand } from "@/components/ui/emphasize-brand";
import { Pill } from "@/components/ui/pill";
import { EASE } from "@/lib/motion";
import type { Industry } from "@/lib/industries";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/content";

type SceneProps = { accent: string; accentAlt?: string };

// Each vertical's signature scene is drawn purely in SVG/CSS and loaded client
// side only — they animate on view and have no server-meaningful markup.
const SCENES: Record<string, React.ComponentType<SceneProps>> = {
  "clinics-dental": dynamic(
    () =>
      import("@/components/illustrations/DentalChairScene").then(
        (m) => m.DentalChairScene,
      ),
    { ssr: false, loading: () => <div className="aspect-[440/340]" /> },
  ),
  gyms: dynamic(
    () =>
      import("@/components/illustrations/TrialPassScene").then(
        (m) => m.TrialPassScene,
      ),
    { ssr: false, loading: () => <div className="aspect-[440/340]" /> },
  ),
  "interior-designers": dynamic(
    () =>
      import("@/components/illustrations/MoodboardScene").then(
        (m) => m.MoodboardScene,
      ),
    { ssr: false, loading: () => <div className="aspect-[440/340]" /> },
  ),
  solar: dynamic(
    () =>
      import("@/components/illustrations/RooftopSolarScene").then(
        (m) => m.RooftopSolarScene,
      ),
    { ssr: false, loading: () => <div className="aspect-[440/340]" /> },
  ),
  brokers: dynamic(
    () =>
      import("@/components/illustrations/SiteVisitKeyScene").then(
        (m) => m.SiteVisitKeyScene,
      ),
    { ssr: false, loading: () => <div className="aspect-[440/340]" /> },
  ),
  "chartered-accountants": dynamic(
    () =>
      import("@/components/illustrations/LedgerFilingScene").then(
        (m) => m.LedgerFilingScene,
      ),
    { ssr: false, loading: () => <div className="aspect-[440/340]" /> },
  ),
};

export function IndustryHero({
  industry,
  breadcrumb,
}: {
  industry: Industry;
  breadcrumb?: React.ReactNode;
}) {
  const Scene = SCENES[industry.slug];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={ref}
      aria-labelledby="industry-hero-heading"
      className="relative flex min-h-[88vh] flex-col items-center overflow-hidden pb-0 pt-36 text-center"
    >
      <TintedSky tint={industry.skyTint} />

      {/* Breadcrumb, over the sky so the nav stays legible. */}
      {breadcrumb ? (
        <div className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto max-w-shell px-6 pt-24 text-left">
            {breadcrumb}
          </div>
        </div>
      ) : null}

      <div className="relative mx-auto max-w-shell px-6">
        {/* Eyebrow badge with pulsing accent dot */}
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            {!reduce && (
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: industry.accent }}
              />
            )}
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: industry.accent }}
            />
          </span>
          {industry.eyebrow}
        </motion.span>

        <motion.h1
          id="industry-hero-heading"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
          className="display-tight mx-auto mt-6 max-w-[880px] font-display text-4xl font-normal text-white md:text-6xl"
        >
          {industry.h1.lead}
          <br />
          <em className="italic text-white/90">{industry.h1.emphasis}</em>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: EASE }}
          className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.65] text-white/80 md:text-base"
        >
          {emphasizeBrand(industry.sub)}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Pill asChild variant="light">
            <a
              href={buildWhatsAppUrl(whatsappMessages.audit)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Free Lead-Leak Audit
            </a>
          </Pill>
          <a
            href="#install"
            className="text-[14px] text-white/70 transition-colors hover:text-white"
          >
            See how it works ↓
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {industry.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/25 px-4 py-1.5 text-[12px] text-white/75"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Signature illustration in a white bezel, cropped by the fold and
          overlapping the next section, with slow scroll parallax. */}
      <motion.div
        style={reduce ? undefined : { y: parallax }}
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: reduce ? 0 : undefined }}
        transition={{ duration: 0.9, delay: 0.36, ease: EASE }}
        className="relative z-10 mt-14 w-full max-w-[560px] px-6"
      >
        <div className="-mb-24 rounded-[28px] bg-white p-3 shadow-float md:-mb-32">
          <div className="overflow-hidden rounded-[20px] bg-canvas p-4">
            {Scene ? (
              <Scene accent={industry.accent} accentAlt={industry.accentAlt} />
            ) : null}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
