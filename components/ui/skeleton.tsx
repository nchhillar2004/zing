import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-background/90 animate-pulse h-12 rounded-[var(--radius)] flex items-center justify-center", className)}
      {...props}
    >Loading...</div>
  )
}

export { Skeleton }
