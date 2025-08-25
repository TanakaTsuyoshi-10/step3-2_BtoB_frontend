// Use the shared apiClient for consistency
import { api } from '@lib/apiClient';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await api.request({
    url: path,
    method: init?.method || 'GET',
    data: init?.body ? JSON.parse(init.body as string) : undefined,
    headers: init?.headers as Record<string, string>,
  });
  return response.data;
}

/* ======== Auth (利用者向け) ======== */
async function login(email: string, password: string) {
  return request<{ access_token: string; token_type: string }>('/api/v1/login/access-token', {
    method: 'POST',
    body: JSON.stringify({ username: email, password }),
  });
}

async function register(payload: { email: string; password: string; full_name?: string }) {
  return request('/api/v1/users/', { method: 'POST', body: JSON.stringify(payload) });
}

/* ======== Metrics (ダッシュボード) ======== */
async function fetchKpi() {
  return request('/api/v1/metrics/kpi');
}
async function fetchMonthlyUsage() {
  return request('/api/v1/metrics/monthly-usage');
}
async function fetchCo2Trend() {
  return request('/api/v1/metrics/co2-trend');
}
async function fetchYoyUsage() {
  return request('/api/v1/metrics/yoy-usage');
}

/* ======== Mobile Products & Rewards ======== */
async function getProducts() {
  return request('/api/v1/mobile/products');
}

async function redeemProduct(productId: number) {
  return request(`/api/v1/mobile/redeem?product_id=${productId}`, {
    method: 'POST',
  });
}

async function getPointsBalance() {
  return request('/api/v1/mobile/points/balance');
}

async function getPointsHistory(limit: number = 20) {
  return request(`/api/v1/mobile/points/history?limit=${limit}`);
}

// Named exports for individual imports
export { 
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

// Default export for backward compatibility
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
