import * as React from "react"
import { cn } from "./utils"

interface TabsProps extends React.HTMLAttributes<div> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const Tabs = React.forwardRef<div, TabsProps>(
  ({ className, defaultValue, value, onValueChange, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue || "")
    
    const currentValue = value !== undefined ? value : activeTab
    
    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setActiveTab(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        data-value={currentValue}
        {...props}
      />
    )
  }
)
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<div>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<div> {
  value: string
}

const TabsTrigger = React.forwardRef<div, TabsTriggerProps>(
  ({ className, value, onClick, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        const tabs = e.currentTarget.closest('[data-value]') as HTMLElement
        if (tabs) {
          tabs.setAttribute('data-value', value)
        }
      }}
      {...props}
    />
  )
)
TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.HTMLAttributes<div> {
  value: string
}

const TabsContent = React.forwardRef<div, TabsContentProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        className
      )}
      data-value={value}
      {...props}
    />
  )
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }