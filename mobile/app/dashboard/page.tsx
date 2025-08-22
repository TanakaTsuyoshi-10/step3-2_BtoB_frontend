import { Card, Section, Title } from "@mobile/components/ui/card";

export default async function MobileDashboard() {
  // 既存 API を利用（環境変数は既存 NEXT_PUBLIC_API_BASE を流用）
  const base = process.env.NEXT_PUBLIC_API_BASE!;
  const kpiRes = await fetch(`${base}/api/v1/metrics/kpi`, { cache: "no-store" });
  const kpi = await kpiRes.json().catch(() => ({}));

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card><Section><Title className="kpi-title">電気使用量</Title><div className="kpi-value">{kpi?.power_total ?? "-"} kWh</div></Section></Card>
        <Card><Section><Title className="kpi-title">ガス使用量</Title><div className="kpi-value">{kpi?.gas_total ?? "-"} m³</div></Section></Card>
        <Card className="col-span-2"><Section><Title className="kpi-title">CO₂削減量</Title><div className="kpi-value">{kpi?.co2_saved ?? "-"} kg</div></Section></Card>
      </div>
    </div>
  );
}