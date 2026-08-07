import { Reveal } from "@/components/ui/reveal";
import type { Industry } from "@/lib/industries";

export function IntegrationStrip({ industry }: { industry: Industry }) {
  return (
    <section className="bg-canvasAlt py-16">
      <div className="mx-auto max-w-shell px-6 text-center">
        <Reveal>
          <p className="eyebrow">PLUGS INTO WHAT YOU ALREADY USE</p>

          <div className="mx-auto mt-7 flex max-w-[760px] flex-wrap items-center justify-center gap-2.5">
            {industry.integrations.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-hairline bg-white px-5 py-2 text-[14px] text-inkBody"
              >
                {tool}
              </span>
            ))}
          </div>

          <p className="mt-7 text-[13px] text-inkMuted">
            No new software for your staff. No number change. Nothing to learn.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
