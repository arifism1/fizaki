"use client";

import { Pill } from "@/components/ui/pill";
import { openWhatsApp } from "@/lib/whatsapp";

const WHATSAPP_MESSAGE =
  "Hi fizaki — I read one of your blog posts and I'd like to know more about the AI lead system for my business.";

export function BlogCTA() {
  return (
    <div className="my-16 rounded-3xl bg-ink p-10 text-center md:p-14">
      <h2 className="display-tight mx-auto max-w-[520px] font-display text-[32px] font-normal leading-[1.1] text-white md:text-[40px]">
        Stop losing leads to a phone nobody answers.
      </h2>
      <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.65] text-white/70">
        Book a free 20-minute audit — we&apos;ll show you exactly how many leads you&apos;re leaking and what they&apos;re worth.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Pill asChild variant="light">
          <a href="https://fizaki.com/#quote">Book a free lead-leak audit</a>
        </Pill>
        <button
          type="button"
          onClick={() => openWhatsApp(WHATSAPP_MESSAGE)}
          className="text-[14px] text-white/70 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white"
        >
          Message us on WhatsApp
        </button>
      </div>
    </div>
  );
}
