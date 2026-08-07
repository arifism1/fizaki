"use client";

import dynamic from "next/dynamic";
import { MessageCircle } from "lucide-react";

import { TintedSky } from "@/components/illustrations/TintedSky";
import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { whatsappMessages } from "@/lib/content";
import type { Industry } from "@/lib/industries";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const RobotReceptionist = dynamic(
  () =>
    import("@/components/illustrations/robot-receptionist").then(
      (m) => m.RobotReceptionist,
    ),
  { ssr: false, loading: () => null },
);

export function IndustryCTA({ industry }: { industry: Industry }) {
  return (
    <section
      id="book"
      aria-labelledby="industry-cta-heading"
      className="relative overflow-hidden pb-40 pt-24 md:pb-48 md:pt-32"
    >
      <TintedSky tint={industry.skyTint} variant="cta" />

      <div className="relative mx-auto max-w-shell px-6 text-center">
        <Reveal>
          <h2
            id="industry-cta-heading"
            className="display-tight mx-auto max-w-[760px] font-display text-4xl font-normal text-white md:text-6xl"
          >
            {industry.cta.heading}{" "}
            <em className="italic text-white/90">{industry.cta.emphasis}</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.65] text-white/80 md:text-base">
            {industry.cta.sub}
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
                Book My Free Audit
              </a>
            </Pill>
            <Pill asChild variant="outlineLight">
              <a
                href={buildWhatsAppUrl(whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden />
                WhatsApp Us
              </a>
            </Pill>
          </div>
        </Reveal>
      </div>

      {/* Mascot with a small sign naming the vertical */}
      <div className="pointer-events-none absolute bottom-0 right-6 hidden md:right-16 md:block lg:right-24">
        <div className="relative">
          <RobotReceptionist />
          <span
            className="absolute bottom-[58px] left-[6px] -rotate-6 rounded-lg border border-hairline bg-white px-2.5 py-1 text-[11px] font-semibold capitalize text-ink shadow-lift"
            style={{ color: industry.accent }}
          >
            {industry.shortName}
          </span>
        </div>
      </div>
    </section>
  );
}
