import { get, post, path } from '../apiClient';
import type { PointsEmployee, PointsSummary, PointsDistribution } from '@/shared/types';
import type { PointsBalance } from '@/types/points';

// Use PointsHistory from @/types/points instead
// export interface PointsHistory {
//   id: string;
//   type: 'earned' | 'redeemed';
//   amount: number;
//   description: string;
//   date: string;
// }

export type RedemptionResponse = { new_balance: number } & Record<string, unknown>;

export interface KPIData {
  totalUsers: number;
  totalPoints: number;
  averageUsage: number;
  co2Reduction: number;
}

export interface MonthlyUsage {
  month: string;
  usage: number;
  target: number;
}

export interface Co2TrendData {
  date: string;
  reduction: number;
  baseline: number;
}

export async function fetchBalance(userId?: number): Promise<PointsBalance> {
  const params = userId ? { userId } : {};
  const response = await get('/mobile/points/balance', { params });
  return response.data as Promise<PointsBalance>;
}

export async function fetchHistory(userId?: number, limit: number = 20): Promise<{ history: import('@/types/points').PointsHistory[] }> {
  const params = userId ? { userId, limit } : { limit };
  const response = await get('/mobile/points/history', { params });
  return response.data as Promise<{ history: import('@/types/points').PointsHistory[] }>;
}

export async function redeem(productId: number, userId?: number): Promise<RedemptionResponse> {
  const data = userId ? { userId, productId } : { productId };
  const response = await post('/mobile/redeem', data);
  return response.data as Promise<RedemptionResponse>;
}

export async function fetchKpi(): Promise<KPIData> {
  const response = await get(path('metrics/kpi'));
  return response.data;
}

export async function fetchMonthlyUsage(): Promise<MonthlyUsage[]> {
  const response = await get(path('metrics/monthly-usage'));
  return response.data;
}

export async function fetchCo2Trend(): Promise<Co2TrendData[]> {
  const response = await get(path('metrics/co2-trend'));
  return response.data;
}

// New API functions for shared types
export async function getPointsEmployees(): Promise<PointsEmployee[]> {
  try {
    const response = await get('/points/employees');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching points employees:', error);
    return [];
  }
}

export async function getPointsSummary(): Promise<PointsSummary> {
  try {
    const response = await get('/points/summary');
    return response.data || { totalPoints: 0, monthlyChange: 0, activeUsers: 0 };
  } catch (error) {
    console.error('Error fetching points summary:', error);
    return { totalPoints: 0, monthlyChange: 0, activeUsers: 0 };
  }
}

export async function getPointsDistribution(): Promise<PointsDistribution[]> {
  try {
    const response = await get('/points/distribution');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching points distribution:', error);
    return [];
  }
}