'use client';

import React from 'react';
import { 
  Users, 
  Zap, 
  Gauge, 
  Leaf,
  Gift,
  Coins,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import KPICard from '@/components/dashboard/KPICard';
import MonthlyUsageChart from '@/components/charts/MonthlyUsageChart';
import Co2TrendChart from '@/components/charts/Co2TrendChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useKpi, useMonthlyUsage, useCo2Trend } from '@/hooks/useKpi';
import ja from '@/i18n/ja';

const DashboardPage: React.FC = () => {
  const { kpi, isLoading: kpiLoading } = useKpi();
  const { monthlyUsage, isLoading: monthlyLoading } = useMonthlyUsage();
  const { co2Trend, isLoading: co2Loading } = useCo2Trend();
  
  const isLoading = kpiLoading || monthlyLoading || co2Loading;


  if (isLoading) {
    return (
      <Layout>
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
              <KPICard
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
            <Card>
              <CardContent className="p-6">
                <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
          <KPICard
            title="総ユーザー数"
            value={kpi?.total_users || 0}
            unit="人"
            icon={<Users className="text-blue-600" />}
          />
          <KPICard
            title="節電量"
            value={kpi?.total_energy_saved || 0}
            unit="kWh"
            icon={<Zap className="text-yellow-600" />}
          />
          <KPICard
            title="CO₂削減量"
            value={kpi?.total_co2_reduced || 0}
            unit="kg"
            icon={<Leaf className="text-green-600" />}
          />
          <KPICard
            title="付与ポイント"
            value={kpi?.total_points_awarded || 0}
            unit="pt"
            icon={<Coins className="text-green-600" />}
          />
          <KPICard
            title="商品交換回数"
            value={kpi?.total_redemptions || 0}
            unit="回"
            icon={<Gift className="text-purple-600" />}
          />
          <KPICard
            title="消費ポイント"
            value={kpi?.total_points_spent || 0}
            unit="pt"
            icon={<Coins className="text-indigo-600" />}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle>月次推移（電気・ガス）</CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyUsageChart 
                data={monthlyUsage || []} 
                isLoading={monthlyLoading}
              />
            </CardContent>
          </Card>

          {/* CO2 Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>CO₂削減量推移</CardTitle>
            </CardHeader>
            <CardContent>
              <Co2TrendChart 
                data={co2Trend || []} 
                isLoading={co2Loading}
              />
            </CardContent>
          </Card>
        </div>

      </div>
    </Layout>
  );
};

export default DashboardPage;