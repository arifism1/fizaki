import { IsometricCallKey } from "@/components/illustrations/isometric-call-key";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { outcomes } from "@/lib/content";

export function Outcomes() {
  return (
    <Section id={outcomes.id} labelledBy="outcomes-heading" tone="alt">
      <Reveal>
        <SectionHeading
          id="outcomes-heading"
          eyebrow={outcomes.eyebrow}
          title={outcomes.heading}
        />
      </Reveal>

      {/* A 2×2 grid divided by dotted rules rather than card borders. */}
      <div className="relative mt-16">
        <div
          aria-hidden
          className="dotted-y absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 sm:block"
        />
        <div
          aria-hidden
          className="dotted-x absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 sm:block"
        />

        <div className="grid sm:grid-cols-2">
          {outcomes.cells.map((cell, i) => (
            <Reveal
              key={cell.title}
              delay={0.08 * i}
              className={[
                "py-8 sm:py-10",
                i % 2 === 0 ? "sm:pr-10" : "sm:pl-10",
                // Only the mobile stack needs its own separators.
                i < outcomes.cells.length - 1 ? "dotted-x bg-[length:100%_1px] bg-bottom bg-no-repeat sm:bg-none" : "",
              ].join(" ")}
            >
              <IconBadge icon={cell.icon} color={cell.color} />
              <h3 className="mt-5 max-w-[300px] text-[17px] font-semibold leading-[1.4] text-ink">
                {cell.title}
              </h3>
              <p className="mt-3 max-w-[340px] text-[15px] leading-[1.65] text-inkBody">
                {cell.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[340px] text-[17px] font-semibold leading-[1.4] text-ink">
            {outcomes.caption}
          </p>
          <IsometricCallKey />
        </div>
      </Reveal>
    </Section>
  );
}
