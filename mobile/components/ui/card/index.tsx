import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref}
      className={cn("rounded-xl border border-neutral-200 card-surface shadow-sm", className)}
      {...props}
    />
  )
); Card.displayName = "Card";

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-4 py-4", className)} {...props} />
  )
); Section.displayName = "Section";

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-base font-semibold tracking-tight", className)} {...props} />
  )
); Title.displayName = "Title";