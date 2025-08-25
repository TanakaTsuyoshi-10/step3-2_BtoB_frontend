// apps/mobile/lib/api/mobile.ts
const BASE = process.env.NEXT_PUBLIC_API_BASE!;
const api = (p: string) => `${BASE.replace(/\/+$/,"")}/${p.replace(/^\/+/,"")}`;

export type Product = {
  id: string; title: string; description: string;
  category?: string; points_required: number; image_url?: string;
  stock?: number; active?: boolean;
};
export type PointsBalance = {
  user_id: string; current_balance: number; last_updated?: string;
};
export type PointsHistoryItem = {
  id: string; type: "earn"|"redeem"; points: number; created_at: string;
};

export async function getProducts(): Promise<Product[]> {
  const r = await fetch(api("mobile/products"), { cache: "no-store" });
  if(!r.ok) throw new Error(await r.text());
  return r.json();
}
export async function redeemProduct(productId: string, body?: Record<string,unknown>) {
  const r = await fetch(api(`mobile/redeem/${encodeURIComponent(productId)}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : "{}",
  });
  if(!r.ok) throw new Error(await r.text());
  return r.json();
}
export async function getPointsBalance(userId: string): Promise<PointsBalance> {
  const r = await fetch(api(`mobile/points/balance/${encodeURIComponent(userId)}`), { cache: "no-store" });
  if(!r.ok) throw new Error(await r.text());
  return r.json();
}
export async function getPointsHistory(userId: string): Promise<PointsHistoryItem[]> {
  const r = await fetch(api(`mobile/points/history/${encodeURIComponent(userId)}`), { cache: "no-store" });
  if(!r.ok) throw new Error(await r.text());
  return r.json();
}