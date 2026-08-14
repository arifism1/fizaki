import Link from "next/link";

import { footer, site } from "@/lib/content";
import { INDUSTRIES } from "@/lib/industries";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas py-16">
      <div className="mx-auto max-w-shell px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
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
            <p className="mt-4 max-w-[300px] text-[15px] leading-[1.6] text-inkBody">
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Footer" className="flex flex-col gap-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-inkMuted">
                Company
              </p>
              {footer.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-inkBody transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <nav aria-label="Industries" className="flex flex-col gap-3">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-inkMuted">
                Industries
              </p>
              {INDUSTRIES.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="text-[14px] text-inkBody transition-colors hover:text-ink"
                >
                  {ind.navLabel}
                </Link>
              ))}
            </nav>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="text-[14px] text-ink transition-colors hover:text-inkBody"
          >
            {site.email}
          </a>
        </div>

        <div className="mt-14 flex flex-col gap-2 text-[13px] text-inkMuted md:flex-row md:items-center md:justify-between">
          <p>{footer.note}</p>
          <p>{footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
