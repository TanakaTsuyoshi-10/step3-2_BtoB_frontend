import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default async function MobileDashboard() {
  // 既存 API を利用（環境変数は既存 NEXT_PUBLIC_API_BASE を流用）
  const base = process.env.NEXT_PUBLIC_API_BASE!;
  const kpiRes = await fetch(`${base}/api/v1/metrics/kpi`, { cache: "no-store" });
  const kpi = await kpiRes.json().catch(() => ({}));

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent>
            <CardTitle className="text-sm font-medium text-gray-600 mb-2">電気使用量</CardTitle>
            <div className="text-2xl font-bold text-gray-900">{kpi?.power_total ?? "-"} kWh</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle className="text-sm font-medium text-gray-600 mb-2">ガス使用量</CardTitle>
            <div className="text-2xl font-bold text-gray-900">{kpi?.gas_total ?? "-"} m³</div>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent>
            <CardTitle className="text-sm font-medium text-gray-600 mb-2">CO₂削減量</CardTitle>
            <div className="text-2xl font-bold text-gray-900">{kpi?.co2_saved ?? "-"} kg</div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}