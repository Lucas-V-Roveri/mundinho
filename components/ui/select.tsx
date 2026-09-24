import * as React from "react";

import { cn } from "@/lib/cn";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "pixel-field min-h-11 w-full border-4 border-night-950 bg-paper-50 px-3 py-2 font-label text-lg text-ink-900 disabled:cursor-not-allowed disabled:opacity-55",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
