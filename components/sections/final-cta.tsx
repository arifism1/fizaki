"use client";

import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";

import { DuskSkyBackdrop } from "@/components/illustrations/dusk-sky-backdrop";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { finalCta, whatsappMessages } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

// Mascot is decorative and at the very bottom of the page.
const RobotReceptionist = dynamic(
  () =>
    import("@/components/illustrations/robot-receptionist").then(
      (m) => m.RobotReceptionist,
    ),
  { ssr: false, loading: () => null },
);

export function FinalCta() {
  return (
    <section
      id={finalCta.id}
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden pb-40 pt-24 md:pb-48 md:pt-32"
    >
      {/* The page bookends: the same sky as the hero, turned down. */}
      <DuskSkyBackdrop variant="soft" />

      <div className="relative mx-auto max-w-shell px-6 text-center">
        <Reveal>
          <h2
            id="final-cta-heading"
            className="display-tight mx-auto max-w-[760px] font-display text-4xl font-normal text-white md:text-6xl"
          >
            {finalCta.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.65] text-white/80 md:text-base">
            {finalCta.subline}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Pill asChild variant="light">
              <a
                href={buildWhatsAppUrl(whatsappMessages.audit)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {finalCta.primaryCta}
              </a>
            </Pill>

            <Pill asChild variant="outlineLight">
              <a
                href={buildWhatsAppUrl(whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden />
                {finalCta.secondaryCta}
              </a>
            </Pill>
          </div>
        </Reveal>
      </div>

      {/* The mascot stands on its mound at the bottom-right. */}
      <div className="pointer-events-none absolute bottom-0 right-6 hidden md:right-16 md:block lg:right-24">
        <RobotReceptionist />
      </div>
    </section>
  );
}
