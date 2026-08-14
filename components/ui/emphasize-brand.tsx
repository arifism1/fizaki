import type { ReactNode } from "react";

const BRAND_PATTERN = /(fizaki)/g;

/** Splits body copy on "fizaki" and italicizes it, wherever it lands mid-sentence. */
export function emphasizeBrand(text: string): ReactNode {
  const parts = text.split(BRAND_PATTERN);
  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    part === "fizaki" ? (
      <em key={i} className="italic">
        fizaki
      </em>
    ) : (
      part
    ),
  );
}
