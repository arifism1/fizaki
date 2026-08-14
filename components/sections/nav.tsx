"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

import { IndustryIconBadge } from "@/components/ui/icon-badge";
import { Pill } from "@/components/ui/pill";
import { finalCta, nav, site } from "@/lib/content";
import { INDUSTRIES } from "@/lib/industries";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const INDUSTRIES_HREF = "#industries";

export function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolledPast, setScrolledPast] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState(false);
  const [mobileIndustries, setMobileIndustries] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  // `solid` is for pages with no dark hero behind the nav (e.g. the blog) —
  // the white-on-transparent variant below would be unreadable there, so
  // those pages force the scrolled/ink styling from the very first paint.
  const scrolled = solid || scrolledPast;

  // Homepage-section anchors need a leading "/" from any other route.
  const resolve = (href: string) =>
    href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolledPast(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  // The full-screen menu must not leave the page scrollable underneath it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-hairline bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-shell items-center justify-between px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${site.name} home`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brandGreen">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              aria-hidden
            >
              <path
                d="M 20 28 Q 20 24 24 24 L 32 24 Q 36 24 36 28"
                stroke="white"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 28 24 Q 28 24 32 28 L 40 36 Q 44 40 40 44"
                stroke="white"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 16 36 L 20 40 L 26 32"
                stroke="white"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={cn(
              "text-[17px] font-semibold italic lowercase tracking-[-0.01em] transition-colors duration-300",
              scrolled ? "text-ink" : "text-white",
            )}
          >
            {site.wordmark}
          </span>
        </Link>

        {/* Centre links */}
        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {nav.links.map((link) => {
            const isIndustries = link.href === INDUSTRIES_HREF;

            if (isIndustries) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => {
                    setHovered(link.href);
                    setDropdown(true);
                  }}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link
                    href="/industries"
                    aria-haspopup="menu"
                    aria-expanded={dropdown}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-4 py-2 text-[14px] transition-colors duration-300",
                      scrolled
                        ? "text-inkBody hover:text-ink"
                        : "text-white/80 hover:text-white",
                    )}
                  >
                    {hovered === link.href && (
                      <motion.span
                        layoutId="nav-pill"
                        className={cn(
                          "absolute inset-0 -z-10 rounded-full",
                          scrolled ? "bg-black/5" : "bg-white/15",
                        )}
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    )}
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-300",
                        dropdown && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </Link>

                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        role="menu"
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-3"
                      >
                        <div className="rounded-2xl border border-hairline bg-white/95 p-2 shadow-lift backdrop-blur-xl">
                          {INDUSTRIES.map((ind) => (
                            <Link
                              key={ind.slug}
                              href={`/industries/${ind.slug}`}
                              role="menuitem"
                              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-black/[0.04]"
                            >
                              <IndustryIconBadge
                                name={ind.glyph}
                                color={ind.accent}
                                size={16}
                                className="h-8 w-8"
                              />
                              <span className="text-[14px] font-medium text-ink">
                                {ind.navLabel}
                              </span>
                            </Link>
                          ))}
                          <Link
                            href="/industries"
                            role="menuitem"
                            className="mt-1 block rounded-xl border-t border-hairline px-3 py-3 text-[13px] font-medium text-inkBody transition-colors hover:text-ink"
                          >
                            View all industries →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={resolve(link.href)}
                onMouseEnter={() => setHovered(link.href)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[14px] transition-colors duration-300",
                  scrolled
                    ? "text-inkBody hover:text-ink"
                    : "text-white/80 hover:text-white",
                )}
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className={cn(
                      "absolute inset-0 -z-10 rounded-full",
                      scrolled ? "bg-black/5" : "bg-white/15",
                    )}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Pill
            asChild
            size="sm"
            variant={scrolled ? "dark" : "light"}
            className="hidden md:inline-flex"
          >
            <a href={resolve(`#${finalCta.id}`)}>{nav.cta}</a>
          </Pill>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={nav.menuOpen}
            aria-expanded={open}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
              scrolled ? "text-ink hover:bg-black/5" : "text-white hover:bg-white/15",
            )}
          >
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile overlay */}
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-50 overflow-y-auto bg-canvas md:hidden"
        >
            <div className="flex h-[72px] items-center justify-between px-6">
              <span className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brandGreen">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    aria-hidden
                  >
                    <path
                      d="M 20 28 Q 20 24 24 24 L 32 24 Q 36 24 36 28"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 28 24 Q 28 24 32 28 L 40 36 Q 44 40 40 44"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 16 36 L 20 40 L 26 32"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-[17px] font-semibold italic lowercase text-ink">
                  {site.wordmark}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={nav.menuClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-black/5"
              >
                <X size={20} aria-hidden />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col px-6 pt-6">
              {nav.links.map((link, i) => {
                const isIndustries = link.href === INDUSTRIES_HREF;

                if (isIndustries) {
                  return (
                    <motion.div
                      key={link.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
                      className="border-b border-hairline"
                    >
                      <button
                        type="button"
                        onClick={() => setMobileIndustries((v) => !v)}
                        aria-expanded={mobileIndustries}
                        className="flex w-full items-center justify-between py-5 text-left font-display text-[32px] text-ink"
                      >
                        {link.label}
                        <ChevronDown
                          size={24}
                          className={cn(
                            "text-inkMuted transition-transform duration-300",
                            mobileIndustries && "rotate-180",
                          )}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileIndustries && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="overflow-hidden"
                          >
                            {INDUSTRIES.map((ind) => (
                              <li key={ind.slug}>
                                <Link
                                  href={`/industries/${ind.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center gap-3 py-3"
                                >
                                  <IndustryIconBadge
                                    name={ind.glyph}
                                    color={ind.accent}
                                    size={15}
                                    className="h-7 w-7"
                                  />
                                  <span className="text-[16px] text-inkBody">
                                    {ind.navLabel}
                                  </span>
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href="/industries"
                                onClick={() => setOpen(false)}
                                className="block py-3 pb-6 text-[15px] font-medium text-ink"
                              >
                                View all industries →
                              </Link>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                return (
                  <motion.a
                    key={link.href}
                    href={resolve(link.href)}
                    onClick={() => setOpen(false)}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}
                    className="border-b border-hairline py-5 font-display text-[32px] text-ink"
                  >
                    {link.label}
                  </motion.a>
                );
              })}

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 * nav.links.length, ease: EASE }}
                className="py-8"
              >
                <Pill asChild variant="dark" className="w-full">
                  <a href={resolve(`#${finalCta.id}`)} onClick={() => setOpen(false)}>
                    {nav.cta}
                  </a>
                </Pill>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
