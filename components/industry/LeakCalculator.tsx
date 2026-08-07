"use client";

import { useEffect, useState } from "react";
import { useReducedMotion, useSpring } from "framer-motion";

import { Pill } from "@/components/ui/pill";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Industry } from "@/lib/industries";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/content";

const inr = new Intl.NumberFormat("en-IN");

function Slider({
  label,
  value,
  max,
  accent,
  format,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  accent: string;
  format: (n: number) => string;
  onChange: (n: number) => void;
}) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-[14px] text-inkBody">{label}</label>
        <span className="text-[15px] font-semibold text-ink">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="leak-slider mt-3"
        style={
          {
            "--fill": accent,
            background: `linear-gradient(to right, ${accent} ${pct}%, #E4E3DE ${pct}%)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

export function LeakCalculator({ industry }: { industry: Industry }) {
  const c = industry.calculator;
  const reduce = useReducedMotion();
  const [a, setA] = useState(c.inputADefault);
  const [b, setB] = useState(c.inputBDefault);

  const target = Math.round(a * b * c.multiplier);
  const spring = useSpring(target, { stiffness: 90, damping: 18 });
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (reduce) {
      setDisplay(target);
      return;
    }
    spring.set(target);
  }, [target, spring, reduce]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [spring]);

  const shown = reduce ? target : display;
  const valueStr =
    c.unit === "inr" ? `₹${inr.format(shown)}` : `${inr.format(shown)} hours`;

  return (
    <Section tone="alt" labelledBy="calc-heading">
      <Reveal>
        <SectionHeading id="calc-heading" title={[{ text: c.heading }]} />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 grid max-w-breakout gap-10 rounded-3xl border border-hairline bg-canvas p-8 md:grid-cols-2 md:p-10">
          <div className="flex flex-col justify-center gap-8">
            <Slider
              label={c.inputALabel}
              value={a}
              max={c.inputAMax}
              accent={industry.accent}
              format={(n) => inr.format(n)}
              onChange={setA}
            />
            <Slider
              label={c.inputBLabel}
              value={b}
              max={c.inputBMax}
              accent={industry.accent}
              format={(n) =>
                c.inputBLabel.toLowerCase().includes("hour") ||
                c.inputBLabel.toLowerCase().includes("minute")
                  ? inr.format(n)
                  : `₹${inr.format(n)}`
              }
              onChange={setB}
            />
          </div>

          <div className="flex flex-col justify-center border-t border-hairline pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <p className="text-[15px] leading-[1.5] text-inkBody">
              {c.resultPrefix.trim()}
            </p>
            <p
              className="display-tight my-1 font-display text-[56px] font-normal leading-[1.05] text-ink"
              aria-live="polite"
            >
              {valueStr}
            </p>
            <p className="text-[15px] leading-[1.5] text-inkBody">
              {c.resultSuffix.trim()}
            </p>
            <p className="mt-5 text-[13px] leading-[1.6] text-inkMuted">
              {c.footnote}
            </p>
            <div className="mt-6">
              <Pill asChild variant="dark">
                <a
                  href={buildWhatsAppUrl(whatsappMessages.audit)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get my exact number in a free audit
                </a>
              </Pill>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
