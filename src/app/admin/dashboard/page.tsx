'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  Gift, 
  Coins, 
  FileText, 
  Users,
  BarChart,
  Shield,
  Download,
  TrendingUp,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
// Removed card import - using simple HTML instead
import { isAuthenticated, getCurrentUser } from '@/lib/auth';
import ja from '@/i18n/ja';
import ElectricityChart from './ElectricityChart';
import GasChart from './GasChart';
import CO2Chart from './CO2Chart';

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [mounted, setMounted] = useState(false);

  const getStatsForYear = (year: number) => {
    if (year === 2025) {
      return {
        co2Reduction: '1,247.5',
        totalPoints: '12,475',
        rewardExchanges: '68',
        participationRate: '82.3'
      };
    } else {
      return {
        co2Reduction: '2,847.5',
        totalPoints: '28,475',
        rewardExchanges: '156',
        participationRate: '78.5'
      };
    }
  };

  const defaultStats = getStatsForYear(2025);
  const stats = mounted ? getStatsForYear(selectedYear) : defaultStats;

  useEffect(() => {
    setMounted(true);
    
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    const checkAdminAccess = async () => {
      try {
        const user = getCurrentUser();
        // 実際のAPIでは is_superuser フィールドをチェック
        setIsAdmin(true); // 仮で管理者権限ありに設定
        
      } catch (error) {
        console.error('管理者権限チェックエラー:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [router]);

  const handleExportReport = async () => {
    try {
      // 実際のAPIが実装されたら以下のコメントアウト部分を使用
      /*
      const response = await reportsAPI.exportCSR({
        range_start: '2025-01-01',
        range_end: '2025-01-31',
        granularity: 'monthly',
        format: 'csv'
      });
      
      // ファイルダウンロード処理
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'csr_report.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      */
      
      alert('CSRレポートのエクスポート機能は実装中です');
    } catch (error) {
      console.error('レポートエクスポートエラー:', error);
      alert('レポートのエクスポートに失敗しました');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-lg text-gray-600">{ja.common.loading}</span>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">管理者権限が必要です</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!mounted) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <span className="ml-4 text-lg text-gray-600">{ja.common.loading}</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{ja.admin.title}</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              システム管理とレポート出力
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* 年度セレクター */}
            <div className="flex items-center gap-2">
              <label htmlFor="year-select" className="text-sm text-gray-600 whitespace-nowrap">年度:</label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={2025}>2025年</option>
                <option value={2024}>2024年</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Settings className="w-4 h-4" />
              <span>管理者モード</span>
            </div>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総CO₂削減量</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.co2Reduction} kg</p>
              </div>
              <BarChart className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総付与ポイント</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.totalPoints} pt</p>
              </div>
              <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">景品交換回数</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.rewardExchanges} 回</p>
              </div>
              <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">参加率</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.participationRate}%</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* グラフエリア */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <ElectricityChart selectedYear={selectedYear} />
          <GasChart selectedYear={selectedYear} />
        </div>

        {/* CO₂削減量推移（折れ線グラフ） */}
        <div className="mt-4 sm:mt-6">
          <CO2Chart selectedYear={selectedYear} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;