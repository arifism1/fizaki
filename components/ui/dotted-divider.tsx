import { cn } from "@/lib/utils";

/** The only divider on the site. Dotted, 1px, never solid. */
export function DottedDivider({ className }: { className?: string }) {
  return <div aria-hidden className={cn("dotted-x my-16 h-px w-full", className)} />;
}
