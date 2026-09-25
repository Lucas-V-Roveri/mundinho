import * as React from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "success" | "external" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-torch-500 text-night-950 border-torch-700 hover:bg-torch-300 active:bg-torch-700 active:text-paper-50",
  secondary:
    "bg-wood-500 text-paper-50 border-wood-900 hover:bg-wood-300 hover:text-ink-900 active:bg-wood-700 active:text-paper-50",
  success:
    "bg-grass-500 text-night-950 border-grass-900 hover:bg-grass-300 active:bg-grass-700 active:text-paper-50",
  external:
    "bg-blue-500 text-night-950 border-blue-900 hover:bg-blue-300 active:bg-blue-700 active:text-paper-50",
  ghost:
    "bg-paper-100 text-ink-900 border-stone-700 hover:bg-paper-50 active:bg-stone-100",
  danger:
    "bg-redstone-500 text-paper-50 border-redstone-900 hover:bg-redstone-300 hover:text-night-950 active:bg-redstone-700 active:text-paper-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 py-1.5 text-xs",
  md: "min-h-11 px-4 py-2 text-sm",
  lg: "min-h-13 px-5 py-3 text-base",
  icon: "size-11 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "pixel-control inline-flex items-center justify-center gap-2 border-4 font-label leading-none disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
