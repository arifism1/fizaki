import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { faq } from "@/lib/content";

export function Faq() {
  return (
    <Section id={faq.id} labelledBy="faq-heading" tone="alt">
      <Reveal>
        <SectionHeading
          id="faq-heading"
          eyebrow={faq.eyebrow}
          title={faq.heading}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <Accordion type="single" collapsible className="mt-12 max-w-measure">
          {faq.items.map((item, i) => (
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
