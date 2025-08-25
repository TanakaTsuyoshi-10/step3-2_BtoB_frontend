// apps/mobile/lib/api/index.ts
import axios, { AxiosInstance } from "axios";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "";
if (!BASE) throw new Error("NEXT_PUBLIC_API_BASE is not set for mobile api");

const api: AxiosInstance = axios.create({
  baseURL: BASE.replace(/\/+$/, "") + "/",
  headers: {
    "Content-Type": "application/json",
  } as Record<string, string>,
});

// ---- named exports expected by apps/mobile/app/points/page.tsx

export async function getProducts() {
  const res = await api.get("products");
  return res.data;
}

export async function redeemProduct(productId: number) {
  const res = await api.post("points/redeem", { product_id: productId });
  return res.data;
}

export async function getPointsBalance() {
  const res = await api.get("points/balance");
  return res.data;
}

export async function getPointsHistory(limit: number = 20) {
  const res = await api.get(`points/history?limit=${limit}`);
  return res.data;
}

// Legacy exports for compatibility
export async function login(email: string, password: string) {
  return api.post('/login/access-token', {
    username: email,
    password,
  }).then(res => res.data);
}

export async function register(payload: { email: string; password: string; full_name?: string }) {
  return api.post('/users/', payload).then(res => res.data);
}

export async function fetchKpi() {
  return api.get('/metrics/kpi').then(res => res.data);
}

export async function fetchMonthlyUsage() {
  return api.get('/metrics/monthly-usage').then(res => res.data);
}

export async function fetchCo2Trend() {
  return api.get('/metrics/co2-trend').then(res => res.data);
}

export async function fetchYoyUsage() {
  return api.get('/metrics/yoy-usage').then(res => res.data);
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