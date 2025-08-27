"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from 'lucide-react';

interface CO2ChartProps {
  selectedYear: number;
}

const data2025 = [
  { month: "4月", value: 0.9 },
  { month: "5月", value: 1.1 },
  { month: "6月", value: 1.2 },
  { month: "7月", value: 1.4 },
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
  { month: "4月", value: 0.5 },
  { month: "5月", value: 0.8 },
  { month: "6月", value: 1.0 },
  { month: "7月", value: 1.2 },
  { month: "8月", value: 0.9 },
  { month: "9月", value: 1.5 },
  { month: "10月", value: 1.2 },
  { month: "11月", value: 1.8 },
  { month: "12月", value: 2.4 },
  { month: "1月", value: 2.1 },
  { month: "2月", value: 3.6 },
  { month: "3月", value: 2.7 },
];

export default function CO2Chart({ selectedYear }: CO2ChartProps) {
  const data = selectedYear === 2025 ? data2025 : data2024;
  
  return (
    <div className="w-full bg-white rounded-lg border shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">CO₂削減量推移</h3>
          <p className="text-sm text-gray-600">累計削減量の推移</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
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
            domain={[0, 4]}
            tickFormatter={(value) => `${value}t`}
          />
          <Tooltip
            formatter={(value: number | null) => 
              value !== null ? [`${value}t`, "CO2削減量"] : ["データなし", ""]
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
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#10b981" 
            strokeWidth={3}
            connectNulls={false}
            dot={{ 
              fill: '#10b981', 
              strokeWidth: 2, 
              r: 4,
              stroke: '#ffffff'
            }}
            activeDot={{ 
              r: 6, 
              stroke: '#10b981',
              strokeWidth: 2,
              fill: '#ffffff'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}