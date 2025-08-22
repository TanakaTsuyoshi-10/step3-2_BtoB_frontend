import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  variant: {
    default: "bg-blue-100 text-blue-800 border-transparent",
    secondary: "bg-gray-100 text-gray-800 border-transparent",
    destructive: "bg-red-100 text-red-800 border-transparent",
    outline: "text-gray-600 border-gray-200 bg-transparent",
  },
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants.variant;
}

function Badge({ 
  className, 
  variant = "default", 
  ...props 
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants.variant[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };