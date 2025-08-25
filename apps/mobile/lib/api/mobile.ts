const BASE = process.env.NEXT_PUBLIC_API_BASE || "";

function u(path: string) {
  return `${BASE.replace(/\/+$/,"")}/mobile/${path.replace(/^\/+/,"")}`;
}

export type Product = {
  id: string|number;
  title: string;
  description: string;
  category?: string;
  points_required: number;
  image_url?: string;
};
export type PointsBalance = {
  current_balance: number;
  user_id?: string|number;
  last_updated?: string;
};
export type PointsHistoryItem = {
  id: string|number;
  type: "earn"|"redeem";
  points: number;
  created_at: string;
};

export async function getProducts(): Promise<Product[]> {
  const r = await fetch(u("products"), { cache: "no-store" });
  if (!r.ok) throw new Error(`getProducts ${r.status}`);
  return r.json() as Promise<Product[]>;
}
export async function redeemProduct(productId: string|number, body?: Record<string,unknown>): Promise<{success: boolean; new_balance?: number}> {
  const r = await fetch(u(`redeem/${String(productId)}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body||{}),
  });
  if (!r.ok) throw new Error(`redeemProduct ${r.status}: ${await r.text()}`);
  return r.json() as Promise<{success: boolean; new_balance?: number}>;
}
export async function getPointsBalance(userId?: string|number): Promise<PointsBalance> {
  const r = await fetch(u(`points/balance${userId?`?userId=${String(userId)}`:""}`), { cache: "no-store" });
  if (!r.ok) throw new Error(`getPointsBalance ${r.status}`);
  return r.json() as Promise<PointsBalance>;
}
export async function getPointsHistory(userId?: string|number): Promise<PointsHistoryItem[]> {
  const r = await fetch(u(`points/history${userId?`?userId=${String(userId)}`:""}`), { cache: "no-store" });
  if (!r.ok) throw new Error(`getPointsHistory ${r.status}`);
  return r.json() as Promise<PointsHistoryItem[]>;
}