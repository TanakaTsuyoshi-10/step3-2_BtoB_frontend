'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import YoyUsageChart from '@/components/charts/YoyUsageChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { isAuthenticated } from '@/lib/auth';
import { authAPI } from '@/lib/api';
import { metricsAPI, KPIResponse, MonthlyUsageResponse, Co2TrendResponse, YoyUsageResponse } from '@/lib/api/metrics';
import { User } from '@/types';
import ja from '@/i18n/ja';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [kpiData, setKpiData] = useState<KPIResponse | null>(null);
  const [monthlyUsageData, setMonthlyUsageData] = useState<MonthlyUsageResponse | null>(null);
  const [co2TrendData, setCo2TrendData] = useState<Co2TrendResponse | null>(null);
  const [yoyUsageData, setYoyUsageData] = useState<YoyUsageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 本番環境では認証チェックを緩く設定（デモ用）
    const shouldRedirectToLogin = false; // 一時的にfalseに設定
    if (shouldRedirectToLogin && !isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // ユーザー情報を取得を試行、失敗してもデフォルトユーザーで継続
        try {
          const userResponse = await authAPI.getCurrentUser();
          setUser(userResponse);
        } catch (userError) {
          console.log('ユーザー情報取得失敗、デフォルトユーザーを使用:', userError);
          setUser({
            id: 0,
            email: 'demo@example.com',
            full_name: 'デモユーザー',
            is_active: true,
            is_superuser: false
          });
        }

        // 現在の年月を取得
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = `${currentYear}-${String(now.getMonth() + 1).padStart(2, '0')}`;

        // 並列でメトリクスデータを取得
        const [kpiResponse, monthlyUsageResponse, co2TrendResponse, yoyUsageResponse] = await Promise.all([
          metricsAPI.getKPI(),
          metricsAPI.getMonthlyUsage({ year: currentYear }),
          metricsAPI.getCo2Trend({ interval: 'month' }),
          metricsAPI.getYoyUsage({ month: currentMonth }),
        ]);

        setKpiData(kpiResponse);
        setMonthlyUsageData(monthlyUsageResponse);
        setCo2TrendData(co2TrendResponse);
        setYoyUsageData(yoyUsageResponse);
        
      } catch (error) {
        console.error('メトリクスデータ取得エラー:', error);
        setError('データの取得に失敗しました。しばらくしてから再度お試しください。');
        
        // エラーが発生してもデフォルトデータで表示（開発用）
        setKpiData({
          company_id: 1,
          range: { from_date: '2025-08-01', to_date: '2025-08-19' },
          active_users: 0,
          electricity_total_kwh: 0,
          gas_total_m3: 0,
          co2_reduction_total_kg: 0,
          total_redemptions: 0,
          total_points_spent: 0,
        });
        setMonthlyUsageData({
          company_id: 1,
          year: 2025,
          months: Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            electricity_kwh: 0,
            gas_m3: 0,
          })),
        });
        setCo2TrendData({
          company_id: 1,
          points: [],
        });
        setYoyUsageData({
          company_id: 1,
          month: currentMonth,
          current: { electricity_kwh: 0, gas_m3: 0 },
          previous: { electricity_kwh: 0, gas_m3: 0 },
          delta: { electricity_kwh: 0, gas_m3: 0 },
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

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
              こんにちは、{user?.full_name || 'ユーザー'}さん
            </p>
          </div>
          <div className="text-sm text-gray-600">
            最終更新: {new Date().toLocaleString('ja-JP')}
          </div>
        </div>

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">注意</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <KPICard
            title="アクティブユーザー"
            value={kpiData?.active_users || 0}
            unit="人"
            icon={<Users className="text-blue-600" />}
          />
          <KPICard
            title="電気使用量合計"
            value={kpiData?.electricity_total_kwh || 0}
            unit="kWh"
            icon={<Zap className="text-yellow-600" />}
          />
          <KPICard
            title="ガス使用量合計"
            value={kpiData?.gas_total_m3 || 0}
            unit="m³"
            icon={<Gauge className="text-orange-600" />}
          />
          <KPICard
            title="CO₂削減量"
            value={kpiData?.co2_reduction_total_kg || 0}
            unit="kg"
            icon={<Leaf className="text-green-600" />}
          />
          <KPICard
            title="商品交換回数"
            value={kpiData?.total_redemptions || 0}
            unit="回"
            icon={<Gift className="text-purple-600" />}
          />
          <KPICard
            title="消費ポイント合計"
            value={kpiData?.total_points_spent || 0}
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
                data={monthlyUsageData?.months || []} 
                isLoading={!monthlyUsageData}
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
                data={co2TrendData?.points || []} 
                isLoading={!co2TrendData}
              />
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 gap-6">
          {/* Year-over-Year Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle>前年同期比較</CardTitle>
            </CardHeader>
            <CardContent>
              <YoyUsageChart 
                data={yoyUsageData} 
                isLoading={!yoyUsageData}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;