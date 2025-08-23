import { api, path } from '../apiClient';
import type { PointsBalance, PointsHistory, RedemptionResponse } from '@/types/points';
import type { KPIData, MonthlyUsage, Co2TrendData } from '@/types/kpi';

export async function fetchBalance(userId?: number): Promise<PointsBalance> {
  const params = userId ? { userId } : {};
  const response = await api.get(path('/mobile/points/balance'), { params });
  return response.data;
}

export async function fetchHistory(userId?: number, limit: number = 20): Promise<{ history: PointsHistory[] }> {
  const params = userId ? { userId, limit } : { limit };
  const response = await api.get(path('/mobile/points/history'), { params });
  return response.data;
}

export async function redeem(productId: number, userId?: number): Promise<RedemptionResponse> {
  const data = userId ? { userId, productId } : { productId };
  const response = await api.post(path('/mobile/redeem'), data);
  return response.data;
}

export async function fetchKpi(): Promise<KPIData> {
  const response = await api.get(path('/metrics/kpi'));
  return response.data;
}

export async function fetchMonthlyUsage(): Promise<MonthlyUsage[]> {
  const response = await api.get(path('/metrics/monthly-usage'));
  return response.data;
}

export async function fetchCo2Trend(): Promise<Co2TrendData[]> {
  const response = await api.get(path('/metrics/co2-trend'));
  return response.data;
}