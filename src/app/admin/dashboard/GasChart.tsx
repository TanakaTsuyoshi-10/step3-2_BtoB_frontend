"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GasChartProps {
  selectedYear: number;
}

const data2025 = [
  { month: "4月", value: 8 },
  { month: "5月", value: 14 },
  { month: "6月", value: 20 },
  { month: "7月", value: 28 },
  { month: "8月", value: null },
  { month: "9月", value: null },
  { month: "10月", value: null },
  { month: "11月", value: null },
  { month: "12月", value: null },
  { month: "1月", value: null },
  { month: "2月", value: null },
  { month: "3月", value: null },
];

const data2024 = [
  { month: "4月", value: 5 },
  { month: "5月", value: 12 },
  { month: "6月", value: 18 },
  { month: "7月", value: 25 },
  { month: "8月", value: 18 },
  { month: "9月", value: 32 },
  { month: "10月", value: 25 },
  { month: "11月", value: 48 },
  { month: "12月", value: 39 },
  { month: "1月", value: 65 },
  { month: "2月", value: 42 },
  { month: "3月", value: 56 },
];

export default function GasChart({ selectedYear }: GasChartProps) {
  const data = selectedYear === 2025 ? data2025 : data2024;
  
  return (
    <div className="w-full bg-white rounded-lg border shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <div className="w-5 h-5 bg-orange-600 rounded"></div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">ガス削減率推移</h3>
          <p className="text-sm text-gray-600">過去12ヶ月のガス削減率</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value: number | null) => 
              value !== null ? [`${value}%`, "削減量"] : ["データなし", ""]
            }
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '12px'
            }}
          />
          <Bar 
            dataKey="value" 
            fill="#f97316" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}