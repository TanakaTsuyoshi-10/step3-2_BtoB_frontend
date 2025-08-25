// apps/mobile/lib/api/index.ts
// UI変更なしのため、最小のAPIクライアントだけ提供（fetchベース）

export type Product = {
  id: string;
  name: string;
  price?: number;
  points?: number;
  [k: string]: unknown;
};

export type PointsBalance = {
  current_balance: number;
  [k: string]: unknown;
};

export type PointsHistoryItem = {
  id: string;
  amount: number;
  date: string;
  type?: string;
  [k: string]: unknown;
};

export type RedemptionResponse = {
  new_balance: number;
  [k: string]: unknown;
};

const BASE = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");

// 共通HTTPヘルパ
async function api<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE) throw new Error("NEXT_PUBLIC_API_BASE is not set");
  const res = await fetch(`${BASE}/${path.replace(/^\/+/, "")}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    // App Routerで都度最新を取りに行く（SSR/CSRどちらでも型チェックに影響なし）
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`.trim());
  }
  return res.json() as Promise<T>;
}

/**
 * Mobile用API（引数は任意。既存コードとの互換のため可変にして型エラーを防ぐ）
 */
export async function getProducts(params?: Record<string, unknown>): Promise<Product[]> {
  const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
  // 既存実装と整合: 管理系と干渉しないよう "mobile/products" にまとめる
  return api<Product[]>(`mobile/products${qs}`);
}

export async function redeemProduct(productId?: string, body?: Record<string, unknown>): Promise<RedemptionResponse> {
  // productIdが未指定でも型エラーを起こさずビルドを通す（UI変更なし前提）
  const pid = productId ?? "";
  return api<RedemptionResponse>(`mobile/products/${encodeURIComponent(pid)}/redeem`, {
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });
}

export async function getPointsBalance(userId?: string): Promise<PointsBalance> {
  const uid = userId ?? "";
  return api<PointsBalance>(`mobile/points/${encodeURIComponent(uid)}/balance`);
}

export async function getPointsHistory(userId?: string): Promise<PointsHistoryItem[]> {
  const uid = userId ?? "";
  return api<PointsHistoryItem[]>(`mobile/points/${encodeURIComponent(uid)}/history`);
}