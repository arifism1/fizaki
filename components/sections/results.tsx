import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { results } from "@/lib/content";

export function Results() {
  return (
    <Section id={results.id} labelledBy="results-heading" tone="canvas">
      <Reveal>
        <SectionHeading
          id="results-heading"
          eyebrow={results.eyebrow}
          title={results.heading}
        />
      </Reveal>

      {/* Dotted rules between the stats — no cards, nothing boxed. */}
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
        {results.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={0.08 * i}
            className={[
              i > 0 ? "sm:pl-8" : "",
              i < results.stats.length - 1 ? "sm:pr-8" : "",
            ].join(" ")}
          >
            <p className="font-display text-[40px] leading-none text-ink">
              {stat.value}
            </p>
            <p className="mt-3 text-[15px] font-medium leading-[1.5] text-ink">
              {stat.label}
            </p>
            <p className="mt-2 text-[13px] leading-[1.5] text-inkMuted">
              {stat.detail}
            </p>
          </Reveal>
        ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-measure text-[13px] leading-[1.5] text-inkMuted">
          {results.disclaimer}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        {results.testimonials.map((item, i) => (
          <Reveal key={item.quote} delay={0.08 * i}>
            <blockquote className="font-display text-[22px] italic leading-[1.4] text-ink">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span
                aria-hidden
                className="h-9 w-9 rounded-full"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${item.from}, ${item.to})`,
                }}
              />
              <span>
                <span className="block text-[14px] font-medium text-ink">
                  {item.name}
                </span>
                <span className="block text-[13px] text-inkMuted">{item.role}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
