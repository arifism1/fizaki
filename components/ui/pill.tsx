import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[18px] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Hero + dusk sections: white on sky. */
        light: "bg-white text-ink shadow-rest hover:shadow-lift",
        /** The page's default solid action. */
        dark: "bg-ink text-white hover:bg-black hover:shadow-lift",
        /** Quiet secondary — a hairline, no fill. */
        outline:
          "border border-hairline bg-transparent text-ink hover:border-ink/30",
        /** Same shape over a dusk sky, where hairline would vanish. */
        outlineLight:
          "border border-white/50 bg-transparent text-white hover:border-white hover:bg-white/10",
        green: "bg-brandGreen text-white hover:brightness-105 hover:shadow-lift",
      },
      size: {
        default: "px-6 py-3 text-[15px]",
        sm: "px-4 py-2 text-[13px]",
      },
    },
    defaultVariants: { variant: "dark", size: "default" },
  },
);

export interface PillProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillVariants> {
  asChild?: boolean;
}

export const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(pillVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Pill.displayName = "Pill";

export { pillVariants };
