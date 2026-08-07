import { LeakyFunnelIllustration } from "@/components/illustrations/leaky-funnel";
import { CountUp } from "@/components/ui/count-up";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { problem } from "@/lib/content";

export function Problem() {
  return (
    // Extra top padding clears the hero device that overlaps into this section.
    <Section
      id={problem.id}
      labelledBy="problem-heading"
      tone="canvas"
      className="pt-72 md:pt-80"
    >
      <Reveal>
        <SectionHeading
          id="problem-heading"
          eyebrow={problem.eyebrow}
          title={problem.heading}
          subtitle={problem.body}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <LeakyFunnelIllustration className="mx-auto my-16 max-w-[560px]" />
      </Reveal>

      <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {problem.stats.map((stat, i) => (
          <Reveal as="li" key={stat.label} delay={0.08 * i}>
            <IconBadge icon={stat.icon} color={stat.color} />
            <p className="mt-4 text-[28px] font-semibold leading-none text-ink">
              <CountUp
                value={stat.value}
                prefix={"prefix" in stat ? stat.prefix : ""}
                suffix={stat.suffix}
              />
            </p>
            <p className="mt-2 max-w-[280px] text-[15px] leading-[1.6] text-inkBody">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
