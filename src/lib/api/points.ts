import { get, post, path } from '../apiClient';
import type { PointsBalance, PointsHistory, RedemptionResponse } from '@/types/points';
import type { KPIData, MonthlyUsage, Co2TrendData } from '@/types/kpi';

export async function fetchBalance(userId?: number): Promise<PointsBalance> {
  const params = userId ? { userId } : {};
  const response = await get('/mobile/points/balance', { params });
  return response.data;
}

export async function fetchHistory(userId?: number, limit: number = 20): Promise<{ history: PointsHistory[] }> {
  const params = userId ? { userId, limit } : { limit };
  const response = await get('/mobile/points/history', { params });
  return response.data;
}

export async function redeem(productId: number, userId?: number): Promise<RedemptionResponse> {
  const data = userId ? { userId, productId } : { productId };
  const response = await post('/mobile/redeem', data);
  return response.data;
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