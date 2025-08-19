'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Co2TrendItem } from '@/lib/api/metrics';

interface Co2TrendChartProps {
  data: Co2TrendItem[];
  isLoading?: boolean;
}

const Co2TrendChart: React.FC<Co2TrendChartProps> = ({ data, isLoading }) => {
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

  const formatPeriod = (period: string) => {
    // YYYY-MM format を MM月 に変換
    const [year, month] = period.split('-');
    return `${parseInt(month)}月`;
  };

  const chartData = data.map(item => ({
    ...item,
    periodFormatted: formatPeriod(item.period),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p style={{ color: payload[0].color }}>
            CO₂削減量:
            <span className="font-medium ml-1">
              {payload[0].value.toFixed(2)} kg
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="periodFormatted" 
          tick={{ fontSize: 12 }}
          className="text-gray-600"
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          className="text-gray-600"
          tickFormatter={(value) => `${value} kg`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="co2_kg" 
          stroke="#059669" 
          strokeWidth={3}
          dot={{ fill: '#059669', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, fill: '#059669' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Co2TrendChart;