'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@admin-ui/card';

interface ChartData {
  time: string;
  produced: number;
  consumed: number;
  imported: number;
  exported: number;
}

interface EnergyChartProps {
  data: ChartData[];
  type?: 'line' | 'bar';
  title?: string;
  height?: number;
}

const EnergyChart: React.FC<EnergyChartProps> = ({
  data,
  type = 'line',
  title = 'Energy Overview',
  height = 300,
}) => {
  const formatTooltip = (value: number, name: string) => {
    const labels: Record<string, string> = {
      produced: 'Produced',
      consumed: 'Consumed',
      imported: 'Grid Import',
      exported: 'Grid Export',
    };
    return [`${value.toFixed(2)} kWh`, labels[name] || name];
  };

  const ChartComponent = type === 'bar' ? BarChart : LineChart;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <ChartComponent data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              fontSize={12}
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              fontSize={12}
              tick={{ fill: '#6b7280' }}
              label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip formatter={formatTooltip} />
            <Legend />
            
            {type === 'line' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="produced"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: '#22c55e', r: 3 }}
                  name="Produced"
                />
                <Line
                  type="monotone"
                  dataKey="consumed"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 3 }}
                  name="Consumed"
                />
                <Line
                  type="monotone"
                  dataKey="imported"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b', r: 3 }}
                  name="Grid Import"
                />
                <Line
                  type="monotone"
                  dataKey="exported"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 3 }}
                  name="Grid Export"
                />
              </>
            ) : (
              <>
                <Bar dataKey="produced" fill="#22c55e" name="Produced" />
                <Bar dataKey="consumed" fill="#3b82f6" name="Consumed" />
                <Bar dataKey="imported" fill="#f59e0b" name="Grid Import" />
                <Bar dataKey="exported" fill="#8b5cf6" name="Grid Export" />
              </>
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EnergyChart;