"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BatteryMedium, Check, PhoneMissed, Signal, Wifi } from "lucide-react";

import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The 9-second rescue loop, told in four beats:
 *   0.0s  missed call lands
 *   2.0s  a 60-second clock starts running
 *   4.5s  the AI replies on WhatsApp with a booking link
 *   7.0s  the appointment is confirmed
 * Then everything clears and it runs again.
 */
const STAGE_AT_MS = [0, 2000, 4500, 7000] as const;
const CYCLE_MS = 9000;

const RING_CIRCUMFERENCE = 2 * Math.PI * 34;

export function PhoneRescueMockup({
  width = 300,
  className,
  accent = "#22C55E",
}: {
  width?: number;
  className?: string;
  /** Solid accent for the halo, timer ring, booking button and confirmation. */
  accent?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [seconds, setSeconds] = useState(60);

  // One self-rescheduling cycle rather than four independent intervals, which
  // would drift apart over time. Reduced motion freezes on the resolved beat.
  useEffect(() => {
    if (reduceMotion) {
      setStage(3);
      setSeconds(0);
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];

    const runCycle = () => {
      if (cancelled) return;
      STAGE_AT_MS.forEach((at, index) => {
        timeouts.push(window.setTimeout(() => setStage(index), at));
      });
      timeouts.push(window.setTimeout(runCycle, CYCLE_MS));
    };

    runCycle();
    return () => {
      cancelled = true;
      timeouts.forEach(window.clearTimeout);
    };
  }, [reduceMotion]);

  // The visible countdown only ticks while the clock is on screen.
  useEffect(() => {
    if (reduceMotion) return;
    if (stage !== 1) {
      setSeconds(60);
      return;
    }
    const id = window.setInterval(() => {
      setSeconds((s) => (s <= 3 ? 0 : s - 3));
    }, 110);
    return () => window.clearInterval(id);
  }, [stage, reduceMotion]);

  const scale = width / 300;

  return (
    <div className={cn("relative", className)} style={{ width }}>
      {/* Soft green halo — the only glow on the site, and it sits behind glass. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[115%] w-[135%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${accent}47, transparent 68%)`,
        }}
      />

      <div
        className="relative overflow-hidden rounded-[38px] border-8 border-[#1A1A1A] bg-white"
        style={{
          width,
          height: 610 * scale,
          borderRadius: 38 * scale + 8,
        }}
        role="img"
        aria-label="Phone showing a missed call answered automatically on WhatsApp and an appointment booked in under 60 seconds"
      >
        {/* Notch */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-2xl bg-[#1A1A1A]"
          style={{ width: 108 * scale, height: 22 * scale }}
        />

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-5 text-ink"
          style={{
            height: 42 * scale,
            fontSize: 11 * scale,
            paddingLeft: 20 * scale,
            paddingRight: 20 * scale,
          }}
        >
          <span className="font-semibold">9:41</span>
          <span className="flex items-center" style={{ gap: 4 * scale }}>
            <Signal size={11 * scale} aria-hidden />
            <Wifi size={11 * scale} aria-hidden />
            <BatteryMedium size={13 * scale} aria-hidden />
          </span>
        </div>

        {/* Screen */}
        <div
          className="relative bg-[#FAFAF8]"
          style={{ height: `calc(100% - ${42 * scale}px)` }}
        >
          <AnimatePresence>
            {/* Beat 1 — the missed call */}
            {stage === 0 && (
              <motion.div
                key="missed"
                initial={{ y: -70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-x-0 top-0"
                style={{ padding: 12 * scale }}
              >
                <div
                  className="flex items-center rounded-2xl border border-[#FECACA] bg-[#FEF2F2]"
                  style={{ gap: 10 * scale, padding: 11 * scale }}
                >
                  <span
                    className="flex shrink-0 items-center justify-center rounded-full bg-[#EF4444]"
                    style={{ width: 30 * scale, height: 30 * scale }}
                  >
                    <PhoneMissed size={15 * scale} className="text-white" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span
                      className="block font-semibold text-[#991B1B]"
                      style={{ fontSize: 11.5 * scale }}
                    >
                      Missed call
                    </span>
                    <span
                      className="block text-[#B91C1C]"
                      style={{ fontSize: 10.5 * scale }}
                    >
                      +91 98xxx xxxxx
                    </span>
                  </span>
                </div>
              </motion.div>
            )}

            {/* Beat 2 — the 60-second window */}
            {stage === 1 && (
              <motion.div
                key="clock"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div
                  className="relative"
                  style={{ width: 88 * scale, height: 88 * scale }}
                >
                  <svg
                    width={88 * scale}
                    height={88 * scale}
                    viewBox="0 0 80 80"
                    className="absolute inset-0 -rotate-90"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke="#E4E3DE"
                      strokeWidth="5"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke={accent}
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={RING_CIRCUMFERENCE}
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: RING_CIRCUMFERENCE }}
                      transition={{ duration: 2.3, ease: "linear" }}
                    />
                  </svg>
                  {/* Centered via inset-0 + flex, not bare `absolute` — a bare
                      absolute span here has no top/left offsets, so the browser
                      falls back to its pre-flex static position, which drifts
                      off the ring's true center. */}
                  <span
                    className="absolute inset-0 flex items-center justify-center font-semibold text-ink"
                    style={{ fontSize: 19 * scale }}
                  >
                    {seconds}s
                  </span>
                </div>
                <span
                  className="mt-3 text-inkMuted"
                  style={{ fontSize: 10.5 * scale }}
                >
                  Replying automatically…
                </span>
              </motion.div>
            )}

            {/* Beat 3 — the AI answers on WhatsApp */}
            {stage === 2 && (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 flex flex-col justify-end"
                style={{ padding: 12 * scale, gap: 8 * scale }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 1, 0], y: 0 }}
                  transition={{ duration: 1.1, times: [0, 0.2, 0.75, 1], ease: EASE }}
                  className="self-end rounded-2xl bg-[#DCF8C6]"
                  style={{ padding: `${8 * scale}px ${12 * scale}px` }}
                >
                  <span className="flex items-center" style={{ gap: 3 * scale }}>
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="block rounded-full bg-[#5C8A4A]"
                        style={{ width: 4 * scale, height: 4 * scale }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: d * 0.15,
                        }}
                      />
                    ))}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.05, ease: EASE }}
                  className="self-end rounded-2xl rounded-br-md bg-[#DCF8C6] text-[#0F2E14]"
                  style={{
                    padding: `${9 * scale}px ${12 * scale}px`,
                    maxWidth: "88%",
                    fontSize: 11 * scale,
                    lineHeight: 1.45,
                  }}
                >
                  Hi! Sorry we missed your call — pick a time that works:
                  <span
                    className="mt-2 block rounded-full text-center font-semibold text-white"
                    style={{
                      backgroundColor: accent,
                      padding: `${5 * scale}px ${10 * scale}px`,
                      fontSize: 10.5 * scale,
                    }}
                  >
                    Book Now
                  </span>
                </motion.div>
              </motion.div>
            )}

            {/* Beat 4 — booked */}
            {stage === 3 && (
              <motion.div
                key="booked"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-x-0 bottom-0"
                style={{ padding: 12 * scale }}
              >
                <div
                  className="rounded-2xl border border-hairline bg-white text-center shadow-rest"
                  style={{ padding: 16 * scale }}
                >
                  <span
                    className="mx-auto flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: accent,
                      width: 34 * scale,
                      height: 34 * scale,
                    }}
                  >
                    <Check size={17 * scale} className="text-white" aria-hidden />
                  </span>
                  <span
                    className="mt-3 block font-semibold text-ink"
                    style={{ fontSize: 12.5 * scale }}
                  >
                    Appointment Booked
                  </span>
                  <span
                    className="mt-1 block text-inkMuted"
                    style={{ fontSize: 11 * scale }}
                  >
                    Tomorrow, 11:30 AM
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
