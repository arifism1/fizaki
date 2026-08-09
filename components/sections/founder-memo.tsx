import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { founderMemo } from "@/lib/content";

export function FounderMemo() {
  return (
    <Section id={founderMemo.id} labelledBy="memo-heading" tone="canvas">
      <div className="max-w-[620px]">
        <Reveal>
          <h2 id="memo-heading" className="eyebrow">
            {founderMemo.eyebrow}
          </h2>
        </Reveal>

        <div className="mt-7 space-y-5">
          {founderMemo.paragraphs.map((para, i) => (
            <Reveal key={para} delay={0.08 * i}>
              <p className="text-[15px] leading-[1.75] text-inkBody md:text-base">
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="mt-10">
            {/* Signature: the display serif, italic and oversized, doing the
                work a scanned signature would otherwise do. */}
            {founderMemo.signature && (
              <p className="font-display text-[34px] italic leading-none text-ink">
                {founderMemo.signature}
              </p>
            )}
            <p className="mt-3 text-[13px] text-inkMuted">{founderMemo.role}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
