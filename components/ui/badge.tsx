import type * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "warning" | "danger"

const variants: Record<BadgeVariant, string> = {
  default: "bg-primary/15 text-primary border border-primary/30",
  secondary: "bg-secondary text-secondary-foreground border border-border",
  outline: "text-muted-foreground border border-border",
  success: "bg-chart-5/15 text-chart-5 border border-chart-5/30",
  warning: "bg-chart-3/15 text-chart-3 border border-chart-3/30",
  danger: "bg-destructive/15 text-destructive border border-destructive/30",
}

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
