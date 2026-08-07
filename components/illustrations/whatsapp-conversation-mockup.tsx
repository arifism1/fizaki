"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";

import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Bubble = { from: "them" | "us"; text: string };

/** Default demo shown on the homepage, where no industry context exists. */
const DEFAULT_THREAD: Bubble[] = [
  { from: "them", text: "Hi, interested in solar for my home" },
  { from: "us", text: "Great! Rough monthly electricity bill?" },
  { from: "them", text: "₹6–8k" },
  {
    from: "us",
    text: "Perfect — you'd qualify for a 3kW system. Free site survey Thursday 4 PM?",
  },
  { from: "them", text: "Yes" },
];
const DEFAULT_NAME = "Suryodaya Solar";
const DEFAULT_OUTCOME = "Site survey booked · Thu 4:00 PM";

function initialsOf(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function WhatsAppConversationMockup({
  className,
  accent = "#075E54",
  contactName = DEFAULT_NAME,
  thread = DEFAULT_THREAD,
  outcome = DEFAULT_OUTCOME,
}: {
  className?: string;
  /** Header, avatar and outcome-chip accent. */
  accent?: string;
  /** WhatsApp header name — defaults to the homepage's solar demo. */
  contactName?: string;
  /** Conversation bubbles — defaults to the homepage's solar demo. */
  thread?: Bubble[];
  /** Closing confirmation chip text. */
  outcome?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const initials = initialsOf(contactName);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setShown(thread.length + 1);
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];

    /** Each outgoing message gets a beat of typing before it lands. */
    const step = (index: number) => {
      if (cancelled || index > thread.length) return;

      if (index === thread.length) {
        timeouts.push(window.setTimeout(() => setShown(index + 1), 500));
        return;
      }

      const isUs = thread[index].from === "us";
      const think = isUs ? 700 : 350;

      if (isUs) setTyping(true);
      timeouts.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setShown(index + 1);
          timeouts.push(window.setTimeout(() => step(index + 1), 550));
        }, think),
      );
    };

    step(0);
    return () => {
      cancelled = true;
      timeouts.forEach(window.clearTimeout);
    };
  }, [inView, reduceMotion, thread]);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-2xl border border-hairline bg-white shadow-rest",
        className,
      )}
      role="img"
      aria-label={`A WhatsApp conversation for ${contactName} where the AI qualifies a lead and books a next step.`}
    >
      {/* WhatsApp header */}
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
            {contactName}
          </span>
          <span className="block text-[11px] text-white/70">online</span>
        </span>
      </div>

      {/* Thread — the faint criss-cross is WhatsApp's own wallpaper, drawn in CSS. */}
      <div
        className="flex min-h-[300px] flex-col justify-end gap-2 p-4"
        style={{
          backgroundColor: "#ECE5DD",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0 2px, transparent 2px 14px)",
        }}
      >
        {thread.slice(0, shown).map((bubble, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={cn(
              "max-w-[82%] rounded-2xl px-3 py-2 text-[12.5px] leading-[1.5] shadow-[0_1px_1px_rgba(0,0,0,0.06)]",
              bubble.from === "us"
                ? "self-end rounded-br-md bg-[#DCF8C6] text-[#0F2E14]"
                : "self-start rounded-bl-md bg-white text-ink",
            )}
          >
            {bubble.text}
            <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-inkMuted">
              10:0{i + 2} AM
              {bubble.from === "us" ? (
                <CheckCheck size={12} className="text-[#4FC3F7]" aria-hidden />
              ) : null}
            </span>
          </motion.div>
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex max-w-[82%] items-center gap-1 self-end rounded-2xl rounded-br-md bg-[#DCF8C6] px-3 py-2.5"
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="block h-1.5 w-1.5 rounded-full bg-[#5C8A4A]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The chip that closes the loop */}
        {shown > thread.length && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-1 flex items-center gap-2 self-center rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-white"
            style={{ backgroundColor: accent }}
          >
            <Check size={13} aria-hidden />
            {outcome}
          </motion.div>
        )}
      </div>
    </div>
  );
}
