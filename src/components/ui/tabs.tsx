// src/components/ui/tabs.tsx
"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";

export type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;
export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>;
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { children, ...props },
  ref
) {
  return (
    <TabsPrimitive.Root ref={ref} {...props}>
      {children}
    </TabsPrimitive.Root>
  );
});

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { children, ...props },
  ref
) {
  return (
    <TabsPrimitive.List ref={ref} {...props}>
      {children}
    </TabsPrimitive.List>
  );
});

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ children, ...props }, ref) {
    return (
      <TabsPrimitive.Trigger ref={ref} {...props}>
        {children}
      </TabsPrimitive.Trigger>
    );
  }
);

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ children, ...props }, ref) {
    return (
      <TabsPrimitive.Content ref={ref} {...props}>
        {children}
      </TabsPrimitive.Content>
    );
  }
);