import { Card, Section, Title } from "@mobile/components/ui/card";
import { api } from "@lib/apiClient";

type Totals = { power_total: number; gas_total: number; co2_saved: number };

export default async function MobileDashboard() {
  // Use apiClient for consistent API routing
  let data: any = {};
  try {
    const kpiRes = await api.get('/metrics/kpi');
    data = kpiRes.data || {};
  } catch (error) {
    console.error('Failed to fetch KPI data:', error);
  }

  const totals: Totals = {
    power_total: Number(data?.power_total ?? 0),
    gas_total: Number(data?.gas_total ?? 0),
    co2_saved: Number(data?.co2_saved ?? 0),
  };

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card><Section><Title>電気使用量</Title><div className="text-2xl font-bold text-gray-900">{totals.power_total || "-"} kWh</div></Section></Card>
        <Card><Section><Title>ガス使用量</Title><div className="text-2xl font-bold text-gray-900">{totals.gas_total || "-"} m³</div></Section></Card>
        <Card className="col-span-2"><Section><Title>CO₂削減量</Title><div className="text-2xl font-bold text-gray-900">{totals.co2_saved || "-"} kg</div></Section></Card>
      </div>
    </div>
  );
}