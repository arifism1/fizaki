import { AdsDashboardMockup } from "@/components/illustrations/ads-dashboard-mockup";
import { NotificationStackMockup } from "@/components/illustrations/notification-stack-mockup";
import { PhoneRescueMockup } from "@/components/illustrations/phone-rescue-mockup";
import { ReviewEngineMockup } from "@/components/illustrations/review-engine-mockup";
import { WhatsAppConversationMockup } from "@/components/illustrations/whatsapp-conversation-mockup";
import { DottedDivider } from "@/components/ui/dotted-divider";
import { FeatureRow } from "@/components/ui/feature-row";
import { IconBadge } from "@/components/ui/icon-badge";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/content";

/** Each flagship row gets its own drawn UI — never a repeated icon card. */
const VISUALS: Record<string, React.ReactNode> = {
  receptionist: (
    <div className="flex justify-center md:justify-start">
      <div className="rounded-[24px] bg-white p-2.5 shadow-float">
        <PhoneRescueMockup width={228} />
      </div>
    </div>
  ),
  whatsapp: <WhatsAppConversationMockup />,
  ads: <AdsDashboardMockup />,
  reviews: <ReviewEngineMockup />,
  qualifier: <NotificationStackMockup />,
};

export function Services() {
  return (
    <Section id={services.id} labelledBy="services-heading" tone="canvas">
      <Reveal>
        <SectionHeading
          id="services-heading"
          eyebrow={services.eyebrow}
          title={services.heading}
          subtitle={services.body}
        />
      </Reveal>

      {/* The whole toolkit at a glance, before the deep dives. */}
      <ul className="mt-14 grid gap-x-10 gap-y-5 sm:grid-cols-2">
        {services.list.map((item, i) => (
          <Reveal as="li" key={item.name} delay={0.05 * i}>
            <span className="flex items-center gap-3.5">
              <IconBadge icon={item.icon} color={item.color} />
              <span className="text-[15px] font-medium text-ink">{item.name}</span>
            </span>
          </Reveal>
        ))}
      </ul>

      <DottedDivider />

      {services.rows.map((row, i) => (
        <div key={row.key}>
          <FeatureRow
            title={row.title}
            body={row.body}
            badge={"badge" in row ? row.badge : undefined}
            reverse={i % 2 === 1}
            visual={VISUALS[row.key]}
          />
          {i < services.rows.length - 1 ? <DottedDivider /> : null}
        </div>
      ))}
    </Section>
  );
}
