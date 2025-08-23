import useSWR from 'swr';
import { fetchKpi, fetchMonthlyUsage, fetchCo2Trend } from '@/lib/api/points';
import { SWR_KEYS } from '@/lib/swr';
import type { KPIData, MonthlyUsage, Co2TrendData } from '@/types/kpi';

export function useKpi() {
  const { data, error, isLoading, mutate } = useSWR(SWR_KEYS.kpi, fetchKpi, {
    refreshInterval: 10000, // Auto-refresh every 10 seconds
    revalidateOnFocus: true,
    dedupingInterval: 2000,
  });

  return {
    kpi: data,
    isLoading,
    error,
    refetch: mutate,
  };
}

export function useMonthlyUsage() {
  const { data, error, isLoading, mutate } = useSWR(SWR_KEYS.monthlyUsage, fetchMonthlyUsage, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  return {
    monthlyUsage: data || [],
    isLoading,
    error,
    refetch: mutate,
  };
}

export function useCo2Trend() {
  const { data, error, isLoading, mutate } = useSWR(SWR_KEYS.co2Trend, fetchCo2Trend, {
    revalidateOnFocus: true,
    dedupingInterval: 5000,
  });

  return {
    co2Trend: data || [],
    isLoading,
    error,
    refetch: mutate,
  };
}