'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { YoyUsageResponse } from '@/lib/api/metrics';

interface YoyUsageChartProps {
  data: YoyUsageResponse | null;
  isLoading?: boolean;
}

const YoyUsageChart: React.FC<YoyUsageChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-2 text-gray-600">読み込み中...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">データがありません</span>
      </div>
    );
  }

  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    return `${year}年${parseInt(monthNum)}月`;
  };

  const getPreviousYearMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const prevYear = parseInt(year) - 1;
    return `${prevYear}年${parseInt(monthNum)}月`;
  };

  const chartData = [
    {
      category: '電力 (kWh)',
      current: data.current.electricity_kwh,
      previous: data.previous.electricity_kwh,
      delta: data.delta.electricity_kwh,
    },
    {
      category: 'ガス (m³)', 
      current: data.current.gas_m3,
      previous: data.previous.gas_m3,
      delta: data.delta.gas_m3,
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'current' ? `${formatMonth(data.month)}` :
               entry.dataKey === 'previous' ? `${getPreviousYearMonth(data.month)}` : '差分'}:
              <span className="font-medium ml-1">
                {entry.dataKey === 'delta' && entry.value > 0 ? '+' : ''}
                {entry.value.toFixed(1)}
                {label.includes('kWh') ? ' kWh' : ' m³'}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div className="font-medium text-gray-700">{formatMonth(data.month)}</div>
          <div className="text-xs text-gray-500">今年</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-700">{getPreviousYearMonth(data.month)}</div>
          <div className="text-xs text-gray-500">前年同月</div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={chartData} 
          layout="horizontal"
          margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis 
            type="category" 
            dataKey="category" 
            tick={{ fontSize: 12 }}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="current" 
            name="今年" 
            fill="#3B82F6"
            radius={[0, 2, 2, 0]}
          />
          <Bar 
            dataKey="previous" 
            name="前年" 
            fill="#94A3B8"
            radius={[0, 2, 2, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* デルタ表示 */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        {chartData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-sm font-medium text-gray-600">{item.category}</div>
            <div className={`text-lg font-bold ${
              item.delta > 0 ? 'text-red-600' : item.delta < 0 ? 'text-green-600' : 'text-gray-600'
            }`}>
              {item.delta > 0 ? '+' : ''}{item.delta.toFixed(1)}
              {item.category.includes('kWh') ? ' kWh' : ' m³'}
            </div>
            <div className="text-xs text-gray-500">
              {item.delta > 0 ? '増加' : item.delta < 0 ? '削減' : '変化なし'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoyUsageChart;