import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <Section id={howItWorks.id} labelledBy="how-heading" tone="canvas">
      <Reveal>
        <SectionHeading
          id="how-heading"
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.heading}
          subtitle={howItWorks.body}
        />
      </Reveal>

      <ol className="relative mt-14 max-w-measure">
        {/* One dotted spine running behind the numbered steps. */}
        <div
          aria-hidden
          className="dotted-y absolute bottom-8 left-3 top-3 w-px"
        />

        {howItWorks.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delay={0.1 * i} className="relative flex gap-6 pb-12 last:pb-0">
            <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brandBlue text-[12px] font-semibold text-white">
              {i + 1}
            </span>
            <span className="block">
              <h3 className="text-[17px] font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-inkBody md:text-base">
                {step.body}
              </p>
            </span>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
