import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Industry } from "@/lib/industries";

export function DayInTheLife({ industry }: { industry: Industry }) {
  return (
    <Section tone="canvas" labelledBy="day-heading">
      <Reveal>
        <SectionHeading
          id="day-heading"
          title={[
            { text: "A Tuesday, with fizaki running quietly in the background." },
          ]}
        />
      </Reveal>

      {/* Desktop: horizontal timeline */}
      <Reveal delay={0.1}>
        <div className="relative mt-14 hidden max-w-breakout md:block">
          <div className="dotted-x absolute inset-x-0 top-[30px] h-px" />
          <ol className="grid grid-cols-5 gap-4">
            {industry.day.map((d) => (
              <li key={d.time} className="flex flex-col items-center text-center">
                <span
                  className="mb-3 text-[13px] font-semibold"
                  style={{ color: industry.accent }}
                >
                  {d.time}
                </span>
                <span
                  className="relative z-10 h-4 w-4 rounded-full ring-4 ring-canvas"
                  style={{ backgroundColor: industry.accent }}
                />
                <span className="mt-4 text-[13px] leading-[1.55] text-inkBody">
                  {d.event}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      {/* Mobile: vertical timeline */}
      <ol className="mt-12 max-w-[560px] md:hidden">
        {industry.day.map((d, i) => (
          <Reveal as="li" key={d.time} delay={i * 0.08}>
            <div className="grid grid-cols-[20px_1fr] gap-x-3">
              <span className="relative flex justify-center">
                <span
                  className="z-10 mt-1 h-4 w-4 rounded-full"
                  style={{ backgroundColor: industry.accent }}
                />
                {i < industry.day.length - 1 && (
                  <span className="dotted-y absolute left-1/2 top-5 h-[calc(100%-0.25rem)] w-px -translate-x-1/2" />
                )}
              </span>
              <div className={i < industry.day.length - 1 ? "pb-7" : ""}>
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: industry.accent }}
                >
                  {d.time}
                </span>
                <p className="mt-1 text-[14px] leading-[1.6] text-inkBody">
                  {d.event}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
