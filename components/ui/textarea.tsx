import * as React from "react";

import { fieldBase } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, rows = 3, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={cn(fieldBase, "resize-none leading-[1.6]", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";
