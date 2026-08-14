"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pill } from "@/components/ui/pill";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { quote } from "@/lib/content";
import { openWhatsApp } from "@/lib/whatsapp";

const { dialog, packages } = quote;

type Errors = Partial<Record<"name" | "business" | "phone", string>>;

/** At least 10 digits once punctuation and a country code are stripped. */
function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

export function QuoteDialog({
  packageKey,
  onOpenChange,
}: {
  /** Which card was clicked, or null when the dialog is closed. */
  packageKey: string | null;
  onOpenChange: (key: string | null) => void;
}) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [pkg, setPkg] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  // Package interest is prefilled from whichever card opened the dialog.
  useEffect(() => {
    if (!packageKey) return;
    const found = packages.find((p) => p.key === packageKey);
    if (found) setPkg(found.name);
    setErrors({});
  }, [packageKey]);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!name.trim()) next.name = dialog.errors.name;
    if (!business) next.business = dialog.errors.business;
    if (!isValidPhone(phone)) next.phone = dialog.errors.phone;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    // No backend — the whole enquiry is handed to WhatsApp as one message.
    // Built by push rather than filter(Boolean) so the deliberate blank
    // separator lines survive.
    const lines = [
      "Hi _fizaki_ — I'd like a quote.",
      "",
      `Name: ${name.trim()}`,
      `Business: ${business}`,
      `Phone/WhatsApp: ${phone.trim()}`,
      `Package interest: ${pkg || "Not sure yet"}`,
    ];

    if (message.trim()) {
      lines.push("", `What's broken: ${message.trim()}`);
    }

    openWhatsApp(lines.join("\n"));
    onOpenChange(null);
  };

  return (
    <Dialog
      open={packageKey !== null}
      onOpenChange={(next) => onOpenChange(next ? packageKey : null)}
    >
      <DialogContent>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogDescription>{dialog.description}</DialogDescription>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="quote-name"
              className="mb-1.5 block text-[13px] font-medium text-ink"
            >
              {dialog.fields.name}
            </label>
            <Input
              id="quote-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={dialog.placeholders.name}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "quote-name-error" : undefined}
              autoComplete="name"
            />
            {errors.name && (
              <p id="quote-name-error" className="mt-1.5 text-[12px] text-brandPink">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <span className="mb-1.5 block text-[13px] font-medium text-ink">
              {dialog.fields.business}
            </span>
            <Select value={business} onValueChange={setBusiness}>
              <SelectTrigger
                aria-label={dialog.fields.business}
                aria-invalid={Boolean(errors.business)}
              >
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {dialog.businessOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.business && (
              <p className="mt-1.5 text-[12px] text-brandPink">{errors.business}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="quote-phone"
              className="mb-1.5 block text-[13px] font-medium text-ink"
            >
              {dialog.fields.phone}
            </label>
            <Input
              id="quote-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={dialog.placeholders.phone}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "quote-phone-error" : undefined}
              autoComplete="tel"
            />
            {errors.phone && (
              <p id="quote-phone-error" className="mt-1.5 text-[12px] text-brandPink">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <span className="mb-1.5 block text-[13px] font-medium text-ink">
              {dialog.fields.packageInterest}
            </span>
            <Select value={pkg} onValueChange={setPkg}>
              <SelectTrigger aria-label={dialog.fields.packageInterest}>
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                {packages.map((p) => (
                  <SelectItem key={p.key} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="quote-message"
              className="mb-1.5 block text-[13px] font-medium text-ink"
            >
              {dialog.fields.message}
            </label>
            <Textarea
              id="quote-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={dialog.placeholders.message}
              rows={3}
            />
          </div>

          <Pill type="submit" variant="green" className="w-full">
            {dialog.submit}
          </Pill>
        </form>
      </DialogContent>
    </Dialog>
  );
}
