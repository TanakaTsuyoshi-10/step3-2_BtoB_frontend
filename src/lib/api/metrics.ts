import axios from 'axios';
import { getAuthToken } from '@/lib/auth';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1';

// メトリクス APIレスポンス型定義
export interface KPIResponse {
  company_id: number;
  range: {
    from_date: string;
    to_date: string;
  };
  active_users: number;
  electricity_total_kwh: number;
  gas_total_m3: number;
  co2_reduction_total_kg: number;
  total_redemptions: number;
  total_points_spent: number;
}

export interface MonthlyUsageItem {
  month: number;
  electricity_kwh: number;
  gas_m3: number;
}

export interface MonthlyUsageResponse {
  company_id: number;
  year: number;
  months: MonthlyUsageItem[];
}

export interface Co2TrendItem {
  period: string; // YYYY-MM format
  co2_kg: number;
}

export interface Co2TrendResponse {
  company_id: number;
  points: Co2TrendItem[];
}

export interface UsageData {
  electricity_kwh: number;
  gas_m3: number;
}

export interface YoyUsageResponse {
  company_id: number;
  month: string; // YYYY-MM format
  current: UsageData;
  previous: UsageData;
  delta: UsageData;
}

// APIクライアント設定
const createApiClient = () => {
  const instance = axios.create({
    baseURL: API_BASE,
  });

  // リクエストインターセプターでAuthorizationヘッダーを追加
  instance.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

const apiClient = createApiClient();

// メトリクスAPIクライアント関数
export const metricsAPI = {
  /**
   * KPI metrics を取得
   */
  async getKPI(params?: {
    company_id?: number;
    from_date?: string;
    to_date?: string;
  }): Promise<KPIResponse> {
    const response = await apiClient.get('/metrics/kpi', { params });
    return response.data;
  },

  /**
   * 月別使用量データを取得
   */
  async getMonthlyUsage(params?: {
    company_id?: number;
    year?: number;
  }): Promise<MonthlyUsageResponse> {
    const response = await apiClient.get('/metrics/monthly-usage', { params });
    return response.data;
  },

  /**
   * CO2削減トレンドデータを取得
   */
  async getCo2Trend(params?: {
    company_id?: number;
    from_date?: string;
    to_date?: string;
    interval?: 'month' | 'week';
  }): Promise<Co2TrendResponse> {
    const response = await apiClient.get('/metrics/co2-trend', { params });
    return response.data;
  },

  /**
   * 前年比使用量データを取得
   */
  async getYoyUsage(params?: {
    company_id?: number;
    month?: string;
  }): Promise<YoyUsageResponse> {
    const response = await apiClient.get('/metrics/yoy-usage', { params });
    return response.data;
  },
};

export default metricsAPI;