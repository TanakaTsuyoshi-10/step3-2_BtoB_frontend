"use client";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import React from "react";
export type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;
export const Tabs = (props: TabsProps) => <TabsPrimitive.Root {...props} />;
export const TabsList = TabsPrimitive.List;
export const TabsTrigger = TabsPrimitive.Trigger;
export const TabsContent = TabsPrimitive.Content;