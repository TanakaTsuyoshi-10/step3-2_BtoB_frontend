'use client';

import React from 'react';
import { 
  Users, 
  Zap, 
  Gauge, 
  Leaf,
  Gift,
  Coins,
} from '@iconify/react/icons/heroicons';
import Layout from '@/components/layout/Layout';
import KPICard from '@/components/dashboard/KPICard';
import MonthlyUsageChart from '@/components/charts/MonthlyUsageChart';
import Co2TrendChart from '@/components/charts/Co2TrendChart';
import { Card, CardHeader, CardTitle, CardContent } from '@admin-ui/card';
import { useKpi, useMonthlyUsage, useCo2Trend } from '@/hooks/useKpi';
import ja from '@/i18n/ja';

const DashboardPage: React.FC = () => {
  const { kpi, isLoading: kpiLoading } = useKpi();
  const { monthlyUsage, isLoading: monthlyLoading } = useMonthlyUsage();
  const { co2Trend, isLoading: co2Loading } = useCo2Trend();
  
  const isLoading = kpiLoading || monthlyLoading || co2Loading;


  if (isLoading) {
    return (
      <div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
              <p className="text-gray-600 mt-1">データを読み込み中...</p>
            </div>
          </div>

          {/* KPI Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                title=""
                value=""
                icon={<div />}
                isLoading={true}
              />
            ))}
          </div>

          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="p-6">
                <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
            <div>
              <div className="p-6">
                <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
            <p className="text-gray-600 mt-1">
              リアルタイム更新中のダッシュボード
            </p>
          </div>
          <div className="text-sm text-gray-600">
            最終更新: {new Date().toLocaleString('ja-JP')}
          </div>
        </div>


        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <div
            title="総ユーザー数"
            value={kpi?.total_users || 0}
            unit="人"
            icon={<div className="text-blue-600" />}
          />
          <div
            title="節電量"
            value={kpi?.total_energy_saved || 0}
            unit="kWh"
            icon={<div className="text-yellow-600" />}
          />
          <div
            title="CO₂削減量"
            value={kpi?.total_co2_reduced || 0}
            unit="kg"
            icon={<div className="text-green-600" />}
          />
          <div
            title="付与ポイント"
            value={kpi?.total_points_awarded || 0}
            unit="pt"
            icon={<div className="text-green-600" />}
          />
          <div
            title="商品交換回数"
            value={kpi?.total_redemptions || 0}
            unit="回"
            icon={<div className="text-purple-600" />}
          />
          <div
            title="消費ポイント"
            value={kpi?.total_points_spent || 0}
            unit="pt"
            icon={<div className="text-indigo-600" />}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Usage Chart */}
          <div>
            <div>
              <div>月次推移（電気・ガス）</div>
            </div>
            <div>
              <div 
                data={monthlyUsage || []} 
                isLoading={monthlyLoading}
              />
            </div>
          </div>

          {/* CO2 Trend Chart */}
          <div>
            <div>
              <div>CO₂削減量推移</div>
            </div>
            <div>
              <div2TrendChart 
                data={co2Trend || []} 
                isLoading={co2Loading}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;