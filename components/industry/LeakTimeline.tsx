import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Industry } from "@/lib/industries";

export function LeakTimeline({ industry }: { industry: Industry }) {
  return (
    <Section tone="canvas" labelledBy="leak-heading">
      <Reveal>
        <SectionHeading
          id="leak-heading"
          title={[
            {
              text: "Here's where your leads are actually leaking. Four gaps, every single week.",
            },
          ]}
        />
      </Reveal>

      <ol className="mt-12 max-w-[620px]">
        {industry.leaks.map((leak, i) => (
          <Reveal as="li" key={leak.title} delay={i * 0.1} className="relative">
            <div className="grid grid-cols-[76px_28px_1fr] gap-x-3">
              {/* Time */}
              <span className="pt-0.5 text-right font-mono text-[12px] leading-[1.4] text-inkMuted">
                {leak.time}
              </span>

              {/* Dot + connecting dotted rule */}
              <span className="relative flex justify-center">
                <span
                  className="z-10 mt-1 h-6 w-6 shrink-0 rounded-full"
                  style={{ backgroundColor: industry.accent }}
                />
                {i < industry.leaks.length - 1 && (
                  <span className="dotted-y absolute left-1/2 top-7 h-[calc(100%-0.25rem)] w-px -translate-x-1/2" />
                )}
              </span>

              {/* Content */}
              <div className={i < industry.leaks.length - 1 ? "pb-9" : ""}>
                <h3 className="text-[17px] font-semibold leading-[1.4] text-ink">
                  {leak.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-inkBody">
                  {leak.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
