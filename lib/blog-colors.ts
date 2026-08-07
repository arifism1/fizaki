/**
 * Maps a post's registry `accent` token (a Tailwind color name defined in
 * tailwind.config.ts) to the static classes / raw hex other blog components
 * need. Kept as explicit lookup tables rather than string interpolation
 * (`bg-${accent}`) because Tailwind only picks up class names it can see
 * literally in source.
 */
export type AccentToken =
  | "brandBlue"
  | "brandGreen"
  | "brandOrange"
  | "brandPink"
  | "brandPurple"
  | "brandTeal";

export const ACCENT_HEX: Record<AccentToken, string> = {
  brandBlue: "#2563EB",
  brandGreen: "#22C55E",
  brandOrange: "#F97316",
  brandPink: "#EC4899",
  brandPurple: "#8B5CF6",
  brandTeal: "#06B6D4",
};

export const ACCENT_BG: Record<AccentToken, string> = {
  brandBlue: "bg-brandBlue",
  brandGreen: "bg-brandGreen",
  brandOrange: "bg-brandOrange",
  brandPink: "bg-brandPink",
  brandPurple: "bg-brandPurple",
  brandTeal: "bg-brandTeal",
};

export const ACCENT_TEXT: Record<AccentToken, string> = {
  brandBlue: "text-brandBlue",
  brandGreen: "text-brandGreen",
  brandOrange: "text-brandOrange",
  brandPink: "text-brandPink",
  brandPurple: "text-brandPurple",
  brandTeal: "text-brandTeal",
};

export const ACCENT_BORDER: Record<AccentToken, string> = {
  brandBlue: "border-brandBlue",
  brandGreen: "border-brandGreen",
  brandOrange: "border-brandOrange",
  brandPink: "border-brandPink",
  brandPurple: "border-brandPurple",
  brandTeal: "border-brandTeal",
};

export function accentHex(accent: string): string {
  return ACCENT_HEX[accent as AccentToken] ?? ACCENT_HEX.brandBlue;
}

export function accentBg(accent: string): string {
  return ACCENT_BG[accent as AccentToken] ?? ACCENT_BG.brandBlue;
}

export function accentText(accent: string): string {
  return ACCENT_TEXT[accent as AccentToken] ?? ACCENT_TEXT.brandBlue;
}

export function accentBorder(accent: string): string {
  return ACCENT_BORDER[accent as AccentToken] ?? ACCENT_BORDER.brandBlue;
}
