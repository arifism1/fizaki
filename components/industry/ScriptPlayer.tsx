"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Check, RotateCcw } from "lucide-react";

import { emphasizeBrand } from "@/components/ui/emphasize-brand";
import { MockupFrame } from "@/components/ui/mockup-frame";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Industry } from "@/lib/industries";

const TYPING_MS = 600;
const BASE_MIN = 22 * 60 + 41; // ascending timestamps from a 10:41 PM baseline

function stamp(i: number) {
  const m = (BASE_MIN + i) % (24 * 60);
  const hh = Math.floor(m / 60);
  const mm = m % 60;
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12 = ((hh + 11) % 12) + 1;
  return `${h12}:${mm.toString().padStart(2, "0")} ${ampm}`;
}

export function ScriptPlayer({ industry }: { industry: Industry }) {
  const { script, accent } = industry;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const [count, setCount] = useState(0);
  const [typingSide, setTypingSide] = useState<"lead" | "ai" | null>(null);
  const [runId, setRunId] = useState(0);
  const done = count >= script.turns.length;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(script.turns.length);
      setTypingSide(null);
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];
    setCount(0);
    setTypingSide(null);

    const play = (i: number) => {
      if (cancelled || i >= script.turns.length) return;
      const turn = script.turns[i];
      timeouts.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setTypingSide(turn.from);
          timeouts.push(
            window.setTimeout(() => {
              if (cancelled) return;
              setTypingSide(null);
              setCount(i + 1);
              play(i + 1);
            }, TYPING_MS),
          );
        }, turn.delay),
      );
    };

    play(0);
    return () => {
      cancelled = true;
      timeouts.forEach(window.clearTimeout);
    };
  }, [inView, reduce, runId, script.turns]);

  const replay = useCallback(() => setRunId((n) => n + 1), []);

  const initials = script.contactName
    .replace(/·.*/, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Section tone="alt" labelledBy="script-heading">
      <Reveal>
        <SectionHeading
          id="script-heading"
          title={[{ text: script.heading }]}
          subtitle="This is the real conversation. No hold music, no callback, no 'we'll get back to you.'"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div ref={ref} className="mx-auto mt-12 max-w-[460px]">
          <MockupFrame bare className="overflow-hidden">
            <div className="overflow-hidden rounded-xl border border-hairline">
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ backgroundColor: accent }}
              >
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[12px] font-semibold"
                  style={{ color: accent }}
                >
                  {initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold text-white">
                    {emphasizeBrand(script.contactName)}
                  </span>
                  <span className="block text-[11px] text-white/75">online</span>
                </span>
              </div>

              {/* Thread with a faint dot wallpaper at ~4% opacity */}
              <div
                className="flex min-h-[420px] flex-col justify-end gap-2 p-4"
                style={{
                  backgroundColor: "#ECE5DD",
                  backgroundImage:
                    "radial-gradient(rgba(0,0,0,0.04) 1.4px, transparent 1.4px)",
                  backgroundSize: "16px 16px",
                }}
              >
                {script.turns.slice(0, count).map((turn, i) => {
                  const isAi = turn.from === "ai";
                  return (
                    <motion.div
                      key={i}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className={cn(
                        "max-w-[84%] rounded-2xl px-3 py-2 text-[12.5px] leading-[1.5] shadow-[0_1px_1px_rgba(0,0,0,0.06)]",
                        isAi
                          ? "self-end rounded-br-md text-ink"
                          : "self-start rounded-bl-md bg-white text-ink",
                      )}
                      style={isAi ? { backgroundColor: `${accent}22` } : undefined}
                    >
                      {turn.text}
                      <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-inkMuted">
                        {stamp(i)}
                        {isAi && (
                          <Check size={11} style={{ color: accent }} aria-hidden />
                        )}
                      </span>
                    </motion.div>
                  );
                })}

                <AnimatePresence>
                  {typingSide && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className={cn(
                        "flex max-w-[84%] items-center gap-1 rounded-2xl px-3 py-2.5",
                        typingSide === "ai"
                          ? "self-end rounded-br-md"
                          : "self-start rounded-bl-md bg-white",
                      )}
                      style={
                        typingSide === "ai"
                          ? { backgroundColor: `${accent}22` }
                          : undefined
                      }
                    >
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="block h-1.5 w-1.5 rounded-full bg-inkMuted"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: d * 0.15,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {done && !typingSide && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="mt-1 flex items-center gap-2 self-center rounded-full bg-brandGreen px-3.5 py-1.5 text-center text-[11.5px] font-medium text-white"
                  >
                    <Check size={13} aria-hidden />
                    {script.outcome}
                  </motion.div>
                )}
              </div>
            </div>
          </MockupFrame>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={replay}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-inkBody transition-colors hover:bg-black/5 hover:text-ink"
            >
              <RotateCcw size={14} aria-hidden />
              Replay
            </button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
