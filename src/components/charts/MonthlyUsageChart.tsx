'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyUsageItem } from '@/lib/api/metrics';

interface MonthlyUsageChartProps {
  data: MonthlyUsageItem[];
  isLoading?: boolean;
}

const MonthlyUsageChart: React.FC<MonthlyUsageChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">読み込み中...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">データがありません</span>
      </div>
    );
  }

  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  const chartData = data.map(item => ({
    ...item,
    monthName: monthNames[item.month - 1],
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'electricity_kwh' ? '電力' : 'ガス'}:
              <span className="font-medium ml-1">
                {entry.value.toFixed(1)}
                {entry.dataKey === 'electricity_kwh' ? ' kWh' : ' m³'}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="monthName" 
          tick={{ fontSize: 12 }}
          className="text-gray-600"
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          className="text-gray-600"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          dataKey="electricity_kwh" 
          name="電力 (kWh)" 
          fill="#3B82F6" 
          radius={[2, 2, 0, 0]}
        />
        <Bar 
          dataKey="gas_m3" 
          name="ガス (m³)" 
          fill="#10B981" 
          radius={[2, 2, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyUsageChart;