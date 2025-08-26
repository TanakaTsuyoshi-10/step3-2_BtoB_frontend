import axios, { AxiosRequestConfig } from "axios";

// API base from environment variable (fallback to demo mode if not set)
const rawBase = process.env.NEXT_PUBLIC_API_BASE;
const isDemoMode = !rawBase;

// 末尾のスラッシュを除去（…/api/v1 想定）
const apiBase = rawBase ? rawBase.replace(/\/+$/, "") : "";

export const api = axios.create({
  baseURL: apiBase,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

// モックレスポンスを生成する関数
const generateMockResponse = (url: string, method: string = 'GET') => {
  // 基本的なモックレスポンス
  const mockData = {
    message: "Demo mode - Mock response",
    data: [],
    success: true,
    timestamp: new Date().toISOString(),
  };

  // URLに基づいた特定のモックデータ
  if (url.includes('/auth/login')) {
    return {
      access_token: 'mock-demo-token',
      token_type: 'bearer',
      user: {
        id: 1,
        email: 'demo@example.com',
        username: 'demo',
        full_name: 'Demo User',
        is_active: true
      }
    };
  }
  
  if (url.includes('/auth/me')) {
    return {
      id: 1,
      email: 'demo@example.com',
      username: 'demo',
      full_name: 'Demo User',
      is_active: true
    };
  }

  return mockData;
};

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
  // デモモードの場合、リクエストを中断してモックレスポンスを返す
  if (isDemoMode) {
    const mockData = generateMockResponse(cfg.url || '', cfg.method?.toUpperCase());
    
    // モックレスポンスを返すためのPromiseを作成
    const mockResponse = {
      data: mockData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: cfg,
      request: {}
    };
    
    // リクエストを取り消してモックレスポンスを返す
    return Promise.reject({
      response: mockResponse,
      config: cfg,
      isAxiosError: false,
      isMockResponse: true
    });
  }

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

// レスポンスインターセプターでモックレスポンスを処理
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // モックレスポンスの場合は成功として扱う
    if (error.isMockResponse && error.response) {
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

// 使いやすい薄いラッパ
export const get  = <T=any>(url: string, cfg?: AxiosRequestConfig) => api.get<T>(stripApiV1(url), cfg);
export const post = <T=any>(url: string, data?: any, cfg?: AxiosRequestConfig) => api.post<T>(stripApiV1(url), data, cfg);
export const put  = <T=any>(url: string, data?: any, cfg?: AxiosRequestConfig) => api.put<T>(stripApiV1(url), data, cfg);
export const del  = <T=any>(url: string, cfg?: AxiosRequestConfig) => api.delete<T>(stripApiV1(url), cfg);

// Export path function for consistent API path handling
export const path = (endpoint: string) => stripApiV1(endpoint);

// デバッグログ（本番でも1回だけ）
if (typeof window !== "undefined") {
  if (isDemoMode) {
    // eslint-disable-next-line no-console
    console.log("[API_CLIENT] Running in DEMO MODE - All API calls will return mock data");
  } else {
    // eslint-disable-next-line no-console
    console.log("[API_BASE] resolved:", apiBase, "(from env)");
  }
}