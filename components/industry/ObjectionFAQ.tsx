import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Industry } from "@/lib/industries";

export function ObjectionFAQ({ industry }: { industry: Industry }) {
  return (
    <Section tone="alt" labelledBy="objection-heading">
      <Reveal>
        <SectionHeading
          id="objection-heading"
          title={[
            {
              text: `The four things ${industry.shortName} owners ask before saying yes.`,
            },
          ]}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <Accordion type="single" collapsible className="mt-12 max-w-measure">
          {industry.faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
