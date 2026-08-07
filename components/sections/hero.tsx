"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { DuskSkyBackdrop } from "@/components/illustrations/dusk-sky-backdrop";
import { PhoneRescueMockup } from "@/components/illustrations/phone-rescue-mockup";
import { Pill } from "@/components/ui/pill";
import { finalCta, hero } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/content";

/** On-mount entrance: 100ms between each element, top to bottom. */
const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: EASE },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-heading"
      // overflow-x-clip (not -hidden) contains the phone's wide halo on narrow
      // screens while still letting the device bleed vertically into §3.
      className="relative z-10 flex min-h-screen flex-col items-center overflow-x-clip pt-32 md:pt-40"
    >
      <DuskSkyBackdrop />

      {/* Must be positioned: the sky backdrop is absolute, so static in-flow
          content would paint underneath it the moment the entrance transform
          is cleared. */}
      <div className="relative z-10 mx-auto w-full max-w-shell px-6 text-center">
        <motion.p
          custom={0}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-[13px] text-white backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            {!reduceMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brandGreen opacity-75" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brandGreen" />
          </span>
          {hero.badge}
        </motion.p>

        <motion.h1
          id="hero-heading"
          custom={1}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="display-tight mx-auto mt-7 max-w-[900px] font-display text-4xl font-normal text-white md:text-6xl lg:text-[68px]"
        >
          {hero.headingLineOne}
          <br />
          <em className="italic text-white/90">{hero.headingLineTwo}</em>
        </motion.h1>

        <motion.p
          custom={2}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-7 max-w-[620px] text-[15px] leading-[1.65] text-white/80 md:text-base"
        >
          {hero.subline}
        </motion.p>

        <motion.div
          custom={3}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7"
        >
          <Pill asChild variant="light">
            <a href={`#${finalCta.id}`}>{hero.primaryCta}</a>
          </Pill>

          {/* One dominant CTA; this one stays a text link on purpose. */}
          <a
            href={buildWhatsAppUrl(whatsappMessages.audit)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[15px] text-white/70 transition-colors hover:text-white"
          >
            {hero.secondaryCta}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </motion.div>

        <motion.p
          custom={4}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="mt-8 text-[13px] text-white/55"
        >
          {hero.trustLine}
        </motion.p>
      </div>

      {/* The device bleeds past the fold and overlaps the section below it. */}
      <motion.div
        custom={5}
        variants={rise}
        initial="hidden"
        animate="visible"
        style={reduceMotion ? undefined : { y: parallaxY }}
        className="relative z-10 mt-16 -mb-56 px-6 md:-mb-64"
      >
        <div className="rounded-[28px] bg-white p-3 shadow-float">
          <PhoneRescueMockup width={300} />
        </div>
      </motion.div>
    </section>
  );
}
