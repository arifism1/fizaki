import { AdsDashboardMockup } from "@/components/illustrations/ads-dashboard-mockup";
import { PhoneRescueMockup } from "@/components/illustrations/phone-rescue-mockup";
import { WhatsAppConversationMockup } from "@/components/illustrations/whatsapp-conversation-mockup";
import { DottedDivider } from "@/components/ui/dotted-divider";
import { FeatureRow } from "@/components/ui/feature-row";
import { IndustryIconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Industry } from "@/lib/industries";

export function InstallStack({ industry }: { industry: Industry }) {
  // Icon-circle colours cycle accent → accentAlt → the four brand hues.
  const cycle = [
    industry.accent,
    industry.accentAlt,
    "#2563EB",
    "#22C55E",
    "#F97316",
    "#8B5CF6",
  ];

  // A short teaser thread for the WhatsApp mockup, drawn from the industry's
  // own script so the illustration never shows another vertical's copy.
  const contactName = industry.script.contactName.replace(/·.*/, "").trim();
  const teaserThread = industry.script.turns.slice(0, 4).map((t) => ({
    from: (t.from === "ai" ? "us" : "them") as "us" | "them",
    text: t.text,
  }));

  return (
    <Section id="install" tone="canvas" labelledBy="install-heading">
      <Reveal>
        <SectionHeading
          id="install-heading"
          title={[
            {
              text: `What we install in your ${industry.shortName}, and what each piece stops from leaking.`,
            },
          ]}
        />
      </Reveal>

      {/* Two-column icon list of all six installs, bold titles only. */}
      <Reveal delay={0.1}>
        <ul className="mt-12 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {industry.installs.map((item, i) => (
            <li key={item.title} className="flex items-center gap-3.5">
              <IndustryIconBadge name={item.icon} color={cycle[i % cycle.length]} />
              <span className="text-[15px] font-semibold leading-[1.35] text-ink">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <DottedDivider />

      {/* First three installs as alternating feature rows with reused mockups. */}
      <div className="space-y-20">
        <FeatureRow
          title={industry.installs[0].title}
          body={industry.installs[0].body}
          visual={
            <div className="mx-auto w-[260px]">
              <PhoneRescueMockup width={260} accent={industry.accent} />
            </div>
          }
        />
        <FeatureRow
          reverse
          title={industry.installs[1].title}
          body={industry.installs[1].body}
          visual={
            <WhatsAppConversationMockup
              accent={industry.accent}
              contactName={contactName}
              thread={teaserThread}
              outcome={industry.script.outcome}
            />
          }
        />
        <FeatureRow
          title={industry.installs[2].title}
          body={industry.installs[2].body}
          visual={<AdsDashboardMockup accent={industry.accent} />}
        />
      </div>
    </Section>
  );
}
