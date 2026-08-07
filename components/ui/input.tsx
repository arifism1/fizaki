import * as React from "react";

import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-2xl border border-hairline bg-canvas px-4 py-3 text-[14px] text-ink transition-colors placeholder:text-inkMuted hover:border-dotline focus:border-ink focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-brandPink";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input ref={ref} type={type} className={cn(fieldBase, className)} {...props} />
));
Input.displayName = "Input";

export { fieldBase };
