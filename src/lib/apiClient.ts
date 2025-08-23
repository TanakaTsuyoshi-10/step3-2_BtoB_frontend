import axios, { AxiosRequestConfig } from "axios";

const rawBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
// 末尾のスラッシュを除去（…/api/v1 想定）
const apiBase = rawBase.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: apiBase,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

// /api/v1 の二重付与を防ぐ正規化関数
const stripApiV1 = (p: string) => {
  if (!p) return "/";
  let u = p.trim();
  // 絶対URLはそのまま（baseURL無効化されるため）
  if (/^https?:\/\//i.test(u)) return u;
  // 先頭/を1つに正規化
  u = "/" + u.replace(/^\/+/, "");
  // 先頭の /api/v1 を剥がす（重複防止）
  u = u.replace(/^\/api\/v1(?=\/|$)/i, "");
  // 二重スラッシュ除去
  u = u.replace(/\/{2,}/g, "/");
  return u || "/";
};

// 全リクエストでURLを正規化 + 認証ヘッダ付与
api.interceptors.request.use((cfg) => {
  const url = cfg.url ?? "/";
  // 絶対URLは対象外
  if (!/^https?:\/\//i.test(url)) {
    const normalized = stripApiV1(url);
    cfg.url = normalized;
  }
  
  // 認証ヘッダの付与
  if (typeof window !== "undefined") {
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return cfg;
});

// 使いやすい薄いラッパ
export const get  = <T=any>(url: string, cfg?: AxiosRequestConfig) => api.get<T>(stripApiV1(url), cfg);
export const post = <T=any>(url: string, data?: any, cfg?: AxiosRequestConfig) => api.post<T>(stripApiV1(url), data, cfg);
export const put  = <T=any>(url: string, data?: any, cfg?: AxiosRequestConfig) => api.put<T>(stripApiV1(url), data, cfg);
export const del  = <T=any>(url: string, cfg?: AxiosRequestConfig) => api.delete<T>(stripApiV1(url), cfg);

// デバッグログ（本番でも1回だけ）
if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.log("[API_BASE]", apiBase);
}