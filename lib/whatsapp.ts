/**
 * Every CTA on this site hands off to WhatsApp — there is no backend.
 * Country code (91) + subscriber number, digits only, as wa.me requires.
 */
export const WHATSAPP_NUMBER = "919101776379";

export const WHATSAPP_DISPLAY = "+91 91017 76379";

/** Builds a wa.me deep link with a pre-filled message. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp in a new tab. Safe to call from any client event handler. */
export function openWhatsApp(message: string): void {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}
