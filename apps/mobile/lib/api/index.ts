// Use the shared apiClient for consistency
import { api } from '@lib/apiClient';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await api.request({
    url: path,
    method: init?.method || 'GET',
    data: init?.body ? JSON.parse(init.body as string) : undefined,
    headers: init?.headers as Record<string, string>,
    ...init,
  });
  return response.data;
}

/* ======== Auth (利用者向け) ======== */
export async function login(email: string, password: string) {
  return request<{ access_token: string; token_type: string }>('/api/v1/login/access-token', {
    method: 'POST',
    body: JSON.stringify({ username: email, password }),
  });
}

export async function register(payload: { email: string; password: string; full_name?: string }) {
  return request('/api/v1/users/', { method: 'POST', body: JSON.stringify(payload) });
}

/* ======== Metrics (ダッシュボード) ======== */
export async function fetchKpi() {
  return request('/api/v1/metrics/kpi');
}
export async function fetchMonthlyUsage() {
  return request('/api/v1/metrics/monthly-usage');
}
export async function fetchCo2Trend() {
  return request('/api/v1/metrics/co2-trend');
}
export async function fetchYoyUsage() {
  return request('/api/v1/metrics/yoy-usage');
}

/* ======== Mobile Products & Rewards ======== */
export async function getProducts() {
  return request('/api/v1/mobile/products');
}

export async function redeemProduct(productId: number) {
  return request(`/api/v1/mobile/redeem?product_id=${productId}`, {
    method: 'POST',
  });
}

export async function getPointsBalance() {
  return request('/api/v1/mobile/points/balance');
}

export async function getPointsHistory(limit: number = 20) {
  return request(`/api/v1/mobile/points/history?limit=${limit}`);
}

export default {
  login,
  register,
  fetchKpi,
  fetchMonthlyUsage,
  fetchCo2Trend,
  fetchYoyUsage,
  getProducts,
  redeemProduct,
  getPointsBalance,
  getPointsHistory,
};
