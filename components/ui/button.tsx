import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex light:text-background transition-colors duration-250 items-center justify-center gap-2 rounded-[var(--radius)] whitespace-nowrap cursor-pointer text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        active: "light:text-background font-semibold",
        default: "bg-primary hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "group-hover:bg-accent group-hover:text-accent-foreground text-left group-dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 h-fit! p-0! hover:underline",
        tab: "border-b-3 h-full border-transparent text-foreground/80 hover:border-primary h-full hover:text-primary rounded-none bg-transparent p-0 m-0",
        activeTab: "border-b-3 h-full border-transparent hover:border-primary h-full hover:text-primary rounded-none bg-transparent p-0 m-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 py-0 has-[>svg]:px-2",
        tab: "h-10 px-2 py-0 has-[>svg]:px-1",
        lg: "h-10 px-6 has-[>svg]:px-4 font-semibold",
        xl: "h-12 px-4 has-[>svg]:px-4 text-lg",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10 rounded-none text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
