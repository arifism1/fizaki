import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { GrainOverlay } from "@/components/illustrations/grain-overlay";
import { DayInTheLife } from "@/components/industry/DayInTheLife";
import { IndustryCTA } from "@/components/industry/IndustryCTA";
import { IndustryHero } from "@/components/industry/IndustryHero";
import { IndustrySwitcher } from "@/components/industry/IndustrySwitcher";
import { InstallStack } from "@/components/industry/InstallStack";
import { IntegrationStrip } from "@/components/industry/IntegrationStrip";
import { LeakCalculator } from "@/components/industry/LeakCalculator";
import { LeakTimeline } from "@/components/industry/LeakTimeline";
import { ObjectionFAQ } from "@/components/industry/ObjectionFAQ";
import { ScriptPlayer } from "@/components/industry/ScriptPlayer";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { site } from "@/lib/content";
import { INDUSTRIES, getIndustry } from "@/lib/industries";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const industry = getIndustry(params.slug);
  if (!industry) return {};

  const url = `/industries/${industry.slug}`;
  return {
    title: industry.meta.title,
    description: industry.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: site.name,
      title: industry.meta.title,
      description: industry.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: industry.meta.title,
      description: industry.meta.description,
    },
  };
}

export default function IndustryPage({
  params,
}: {
  params: { slug: string };
}) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  const pageUrl = `${site.url}/industries/${industry.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industries",
        item: `${site.url}/industries`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: industry.name,
        item: pageUrl,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `AI lead systems for ${industry.name}`,
    name: industry.meta.title,
    description: industry.meta.description,
    areaServed: "IN",
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
    },
    url: pageUrl,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = (
    <nav aria-label="Breadcrumb" className="text-[13px]">
      <ol className="flex items-center gap-1.5">
        <li>
          <Link href="/" className="text-white/55 transition-colors hover:text-white">
            Home
          </Link>
        </li>
        <ChevronRight size={13} className="text-white/35" aria-hidden />
        <li>
          <Link
            href="/industries"
            className="text-white/55 transition-colors hover:text-white"
          >
            Industries
          </Link>
        </li>
        <ChevronRight size={13} className="text-white/35" aria-hidden />
        <li aria-current="page" className="text-white">
          {industry.name}
        </li>
      </ol>
    </nav>
  );

  return (
    <>
      <Nav />
      <main>
        <IndustryHero industry={industry} breadcrumb={breadcrumb} />
        <LeakTimeline industry={industry} />
        <LeakCalculator industry={industry} />
        <InstallStack industry={industry} />
        <ScriptPlayer industry={industry} />
        <DayInTheLife industry={industry} />
        <IntegrationStrip industry={industry} />

        {/* Results block */}
        <Section tone="canvas" labelledBy="results-heading">
          <Reveal>
            <SectionHeading
              id="results-heading"
              title={[
                { text: "Built to deliver " },
                { text: "numbers like these", italic: true },
                { text: "." },
              ]}
            />
          </Reveal>

          <div className="relative mt-14">
            <div
              aria-hidden
              className="dotted-y absolute inset-y-0 left-1/3 hidden w-px sm:block"
            />
            <div
              aria-hidden
              className="dotted-y absolute inset-y-0 left-2/3 hidden w-px sm:block"
            />
            <div className="grid gap-10 sm:grid-cols-3 sm:gap-0">
              {industry.stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={0.08 * i}
                  className={[
                    i > 0 ? "sm:pl-8" : "",
                    i < industry.stats.length - 1 ? "sm:pr-8" : "",
                  ].join(" ")}
                >
                  <p className="font-display text-[44px] leading-none text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[15px] font-medium leading-[1.5] text-ink">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-measure text-[13px] leading-[1.5] text-inkMuted">
              Pilot results published soon — we&apos;d rather show you real numbers
              than borrowed ones.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-16 max-w-measure">
              <blockquote className="font-display text-[22px] italic leading-[1.4] text-ink">
                &ldquo;{industry.testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-9 w-9 rounded-full"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${industry.accent}, ${industry.accentAlt})`,
                  }}
                />
                <span>
                  <span className="block text-[14px] font-medium text-ink">
                    {industry.testimonial.name}
                  </span>
                  <span className="block text-[13px] text-inkMuted">
                    {industry.testimonial.role}
                  </span>
                </span>
              </div>
              <p className="mt-4 text-[12px] text-inkMuted">
                Illustrative — replace with a live client on launch.
              </p>
            </div>
          </Reveal>
        </Section>

        <ObjectionFAQ industry={industry} />
        <IndustrySwitcher current={industry} />
        <IndustryCTA industry={industry} />
      </main>
      <Footer />
      <WhatsAppFab />
      <GrainOverlay />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
