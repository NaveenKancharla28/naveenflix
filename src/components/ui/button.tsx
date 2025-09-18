import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-colors " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 " +
  "h-9 px-4 py-2"

const variants: Record<string, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
  ghost: "bg-transparent hover:bg-white/10",
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: keyof typeof variants
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp ref={ref as any} className={`${base} ${variants[variant]} ${className}`} {...props} />
  }
)
Button.displayName = "Button"
