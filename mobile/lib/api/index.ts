const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_BASE is empty. Set it in GitHub Secrets or App Settings.');
  }
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
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

export default {
  login,
  register,
  fetchKpi,
  fetchMonthlyUsage,
  fetchCo2Trend,
  fetchYoyUsage,
};
