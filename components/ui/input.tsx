import * as React from "react";

import { cn } from "@/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "pixel-field min-h-11 w-full border-4 border-night-950 bg-paper-50 px-3 py-2 font-sans text-sm text-ink-900 placeholder:text-ink-700/60 disabled:cursor-not-allowed disabled:opacity-55",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
