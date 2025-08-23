import { Card, Section, Title } from "@mobile/components/ui/card";
import { api } from "@/lib/apiClient";

export default async function MobileDashboard() {
  // Use apiClient for consistent API routing
  let kpi = {};
  try {
    const kpiRes = await api.get('/metrics/kpi');
    kpi = kpiRes.data || {};
  } catch (error) {
    console.error('Failed to fetch KPI data:', error);
  }

  return (
    <div className="px-4 py-5 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Card><Section><Title>電気使用量</Title><div className="text-2xl font-bold text-gray-900">{kpi?.power_total ?? "-"} kWh</div></Section></Card>
        <Card><Section><Title>ガス使用量</Title><div className="text-2xl font-bold text-gray-900">{kpi?.gas_total ?? "-"} m³</div></Section></Card>
        <Card className="col-span-2"><Section><Title>CO₂削減量</Title><div className="text-2xl font-bold text-gray-900">{kpi?.co2_saved ?? "-"} kg</div></Section></Card>
      </div>
    </div>
  );
}