import React from 'react';

// Base component props
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

// KPI Card props
export interface KPICardProps extends BaseProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactElement;
  isLoading?: boolean;
}

// Chart props
export interface ChartProps extends BaseProps {
  data: any[];
  isLoading?: boolean;
}

// API Response
export interface APIResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Points related types
export interface PointsEmployee {
  id: number;
  name: string;
  department: string;
  points: number;
  rank: number;
}

export interface PointsSummary {
  totalPoints: number;
  monthlyChange: number;
  activeUsers: number;
}

export interface PointsDistribution {
  department: string;
  points: number;
  users: number;
}

// Device related types
export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: string;
}

// Energy related types
export interface EnergyRecord {
  id: string;
  deviceId: string;
  consumption: number;
  timestamp: string;
  cost?: number;
}

// Incentive related types
export interface Incentive {
  id: string;
  title: string;
  description: string;
  points: number;
  active: boolean;
  createdAt: string;
}

// Report related types
export interface Report {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}

// Select component props
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

// Card component props
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// Button component props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}