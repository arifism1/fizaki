"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden>
      <path d="M13.6 10.62 20.2 3h-1.57l-5.73 6.62L8.32 3H3l6.93 10.02L3 21h1.57l6.05-6.99L15.68 21H21l-7.4-10.38Zm-2.14 2.48-.7-1L5.2 4.15h2.4l4.5 6.44.7 1 5.85 8.37h-2.4l-4.79-6.86Z" />
    </svg>
  );
}

const iconButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full text-inkMuted transition-colors hover:bg-black/5 hover:text-ink";

export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard permission denied — nothing we can recover from silently
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span className="mr-1 text-[13px] text-inkMuted">Share</span>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={iconButtonClass}
      >
        <LinkedInIcon />
      </a>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className={iconButtonClass}
      >
        <XIcon />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className={iconButtonClass}
      >
        <MessageCircle size={18} aria-hidden />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        className={iconButtonClass}
      >
        {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
      </button>
    </div>
  );
}
