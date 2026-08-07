"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { fab } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  // Only appears once the hero is behind you — it would compete with the
  // hero's single CTA otherwise.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
        >
          <span className="pointer-events-none translate-x-2 rounded-full bg-ink px-3.5 py-2 text-[13px] font-medium text-white opacity-0 shadow-lift transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {fab.tooltip}
          </span>

          <a
            href={buildWhatsAppUrl(fab.message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fab.label}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brandGreen shadow-lift transition-transform duration-300"
          >
            {!reduceMotion && (
              <span
                aria-hidden
                className="absolute inset-0 animate-halo rounded-full bg-brandGreen"
              />
            )}
            {/* WhatsApp's own glyph — Lucide has no faithful equivalent. */}
            <svg
              viewBox="0 0 24 24"
              className="relative h-7 w-7 fill-white"
              aria-hidden
            >
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
              <path d="M12.04 2C6.6 2 2.17 6.43 2.16 11.87c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.86 9.86 0 0 0 4.68 1.19h.01c5.44 0 9.87-4.43 9.88-9.87A9.8 9.8 0 0 0 19.03 4.9 9.8 9.8 0 0 0 12.04 2Zm5.8 15.67a8.2 8.2 0 0 1-5.8 2.4h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.52 3.69-8.2 8.21-8.2a8.15 8.15 0 0 1 5.8 2.41 8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2Z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
