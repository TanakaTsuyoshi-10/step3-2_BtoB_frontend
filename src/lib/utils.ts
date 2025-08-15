import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, decimals = 2): string {
  return num.toFixed(decimals);
}

export function formatEnergy(kwh: number): string {
  return `${formatNumber(kwh)} kWh`;
}

export function formatPower(kw: number): string {
  return `${formatNumber(kw)} kW`;
}

export function formatPercentage(value: number): string {
  return `${formatNumber(value)}%`;
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'normal':
      return 'text-success-600';
    case 'warning':
      return 'text-warning-600';
    case 'error':
      return 'text-danger-600';
    default:
      return 'text-gray-600';
  }
}

export function getStatusBadgeColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'normal':
      return 'bg-success-100 text-success-800';
    case 'warning':
      return 'bg-warning-100 text-warning-800';
    case 'error':
      return 'bg-danger-100 text-danger-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function calculateSavings(
  energyProduced: number,
  gridImport: number,
  electricityRate = 0.12
): number {
  const selfConsumed = Math.max(0, energyProduced - gridImport);
  return selfConsumed * electricityRate;
}