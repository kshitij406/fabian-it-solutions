import * as React from "react"
import { cn } from "@/lib/utils"

const Accordion = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-3", className)} {...props} />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
  HTMLDetailsElement,
  React.DetailsHTMLAttributes<HTMLDetailsElement>
>(({ className, ...props }, ref) => (
  <details
    ref={ref}
    className={cn(
      "group rounded-lg border border-border/50 bg-card/60 px-4",
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLMapElement,
  React.HTMLAttributes<HTMLMapElement>
>(({ className, ...props }, ref) => (
  <summary
    ref={ref}
    className={cn(
      "flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden",
      className
    )}
    {...props}
  />
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pb-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
