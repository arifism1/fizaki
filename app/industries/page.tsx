import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { DuskSkyBackdrop } from "@/components/illustrations/dusk-sky-backdrop";
import { GrainOverlay } from "@/components/illustrations/grain-overlay";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { DottedDivider } from "@/components/ui/dotted-divider";
import { IndustryGlyph, IndustryIconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { site } from "@/lib/content";
import { INDUSTRIES } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries We Build For | arifwork",
  description:
    "Six verticals, six different ways leads leak. Clinics, gyms, interior designers, solar installers, brokers and chartered accountants — see exactly what we install.",
  alternates: { canonical: "/industries" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/industries",
    siteName: site.name,
    title: "Industries We Build For | arifwork",
    description:
      "Six verticals, six different ways leads leak. Pick yours and see exactly what we install.",
  },
};

const ENGINE = [
  { label: "Answer", icon: "MessageCircle" },
  { label: "Qualify", icon: "Filter" },
  { label: "Book", icon: "CalendarCheck" },
  { label: "Follow up", icon: "Repeat" },
];

export default function IndustriesIndex() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero on the standard, untinted dusk sky */}
        <section
          aria-labelledby="industries-index-heading"
          className="relative flex min-h-[60vh] items-center overflow-hidden pt-28"
        >
          <DuskSkyBackdrop />
          <div className="relative mx-auto max-w-shell px-6 py-20 text-center">
            <Reveal>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                Industries
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1
                id="industries-index-heading"
                className="display-tight mx-auto mt-5 max-w-[900px] font-display text-4xl font-normal text-white md:text-6xl"
              >
                We only build for businesses that{" "}
                <em className="italic text-white/90">
                  live and die by the phone.
                </em>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-[620px] text-[15px] leading-[1.65] text-white/80 md:text-base">
                Six verticals, six different ways leads leak. Pick yours and see
                exactly what we install.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Card grid */}
        <Section tone="canvas" labelledBy="industries-index-heading">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-white shadow-rest transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div
                    className="relative flex h-[140px] items-center justify-center"
                    style={{
                      backgroundImage: `linear-gradient(140deg, ${ind.accent}, ${ind.accentAlt})`,
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "radial-gradient(rgba(255,255,255,0.25) 1.2px, transparent 1.2px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <span className="relative text-white/35">
                      <IndustryGlyph name={ind.glyph} size={56} strokeWidth={1.6} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h2 className="text-[18px] font-semibold text-ink">
                      {ind.name}
                    </h2>
                    <p className="mt-2 flex-1 font-display text-[19px] italic leading-[1.35] text-inkBody">
                      {ind.h1.emphasis}
                    </p>
                    <span
                      className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium"
                      style={{ color: ind.accent }}
                    >
                      Explore
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <DottedDivider />

          {/* Shared engine band */}
          <Reveal>
            <SectionHeading
              title={[
                { text: "The same engine underneath. " },
                { text: "Tuned differently", italic: true },
                { text: "." },
              ]}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-4">
              {ENGINE.map((step, i) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <IndustryIconBadge name={step.icon} color="#0F0F0F" />
                    <span className="text-[15px] font-semibold text-ink">
                      {step.label}
                    </span>
                  </div>
                  {i < ENGINE.length - 1 && (
                    <span className="text-inkMuted" aria-hidden>
                      ·
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab />
      <GrainOverlay />
    </>
  );
}
