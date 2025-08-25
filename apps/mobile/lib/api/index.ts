// apps/mobile/lib/api/index.ts
// UI変更なし・型整合最優先の最小クライアント（fetchベース）

// API側の型定義
export type ApiProduct = {
  id: string | number;
  title?: string;
  description?: string;
  category?: string;
  points_required?: number;
  stock?: number;
  active?: boolean;
  image_url?: string;
  [k: string]: unknown;
};

export type ApiPointsBalance = {
  balance?: number;
  current_balance?: number;
  user_id?: string | number;
  last_updated?: string;
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

// 画面側のローカル表示用型に寄せる変換（不足項目は安全なデフォルト）
export function toViewProduct(p: ApiProduct) {
  return {
    id: Number(p.id) || 0,
    title: (p.title ?? "") as string,
    description: (p.description ?? "") as string,
    category: (p.category ?? "") as string,
    points_required: Number(p.points_required ?? 0),
    stock: Number(p.stock ?? 0),
    active: Boolean(p.active ?? true),
    image_url: (p.image_url ?? "") as string,
  };
}

export function toViewPointsBalance(pb: ApiPointsBalance) {
  return {
    current_balance: Number(pb.current_balance ?? pb.balance ?? 0),
    user_id: pb.user_id ? Number(pb.user_id) : 0,
    last_updated: (pb.last_updated ?? "") as string,
  };
}

const BASE = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  if (!BASE) throw new Error("NEXT_PUBLIC_API_BASE is not set");
  const res = await fetch(`${BASE}/${path.replace(/^\/+/, "")}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`.trim());
  }
  return res.json() as Promise<T>;
}

// ==== 必須 named exports（apps/mobile/app/points/page.tsx が参照） ====
export async function getProducts(params?: Record<string, unknown>): Promise<ApiProduct[]> {
  const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
  return api<ApiProduct[]>(`mobile/products${qs}`);
}

export async function redeemProduct(productId?: string | number, body?: Record<string, unknown>): Promise<RedemptionResponse> {
  const pid = String(productId ?? "");
  return api<RedemptionResponse>(`mobile/products/${encodeURIComponent(pid)}/redeem`, {
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });
}

export async function getPointsBalance(userId?: string | number): Promise<ApiPointsBalance> {
  const uid = String(userId ?? "");
  return api<ApiPointsBalance>(`mobile/points/${encodeURIComponent(uid)}/balance`);
}

export async function getPointsHistory(userId?: string | number, limit?: number): Promise<PointsHistoryItem[]> {
  const uid = String(userId ?? "");
  const limitParam = limit ? `?limit=${limit}` : "";
  return api<PointsHistoryItem[]>(`mobile/points/${encodeURIComponent(uid)}/history${limitParam}`);
}