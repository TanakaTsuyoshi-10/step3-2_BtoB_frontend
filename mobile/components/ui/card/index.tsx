import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref}
      className={cn("bg-white rounded-xl border border-gray-200 shadow-md p-4", className)}
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
    <h3 ref={ref} className={cn("text-sm font-medium text-gray-600 mb-2", className)} {...props} />
  )
); Title.displayName = "Title";