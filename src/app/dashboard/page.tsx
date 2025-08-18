'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Leaf, 
  Award, 
  TrendingUp, 
  Activity, 
  Users, 
  Coins,
  Target,
  Calendar,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatsCard from '@/components/dashboard/StatsCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { isAuthenticated } from '@/lib/auth';
import { authAPI } from '@/lib/api';
import { User } from '@/types';
import ja from '@/i18n/ja';

interface DashboardData {
  pointsSummary: {
    current_balance: number;
    total_earned: number;
    total_spent: number;
    this_month_earned: number;
  };
  ranking: Array<{
    user_id: number;
    user_name: string;
    department: string;
    reduced_co2_kg: number;
    rank: number;
    points_earned: number;
  }>;
  myRank: number;
  todayCo2: number;
  thisMonthCo2: number;
}

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // ユーザー情報とダッシュボードデータを取得（仮の実装）
        const userResponse = await authAPI.getCurrentUser();
        setUser(userResponse);
        
        // 実際のAPIが実装されたら以下のコメントアウト部分を使用
        /*
        const [pointsResponse, rankingResponse] = await Promise.all([
          pointsAPI.getMyPoints(),
          pointsAPI.getRanking({ period: 'monthly', limit: 10 }),
        ]);
        
        setDashboardData({
          pointsSummary: pointsResponse,
          ranking: rankingResponse,
          myRank: rankingResponse.findIndex(r => r.user_id === userResponse.id) + 1,
          todayCo2: 2.5, // 仮データ
          thisMonthCo2: 48.7, // 仮データ
        });
        */
        
        // 仮データ
        setDashboardData({
          pointsSummary: {
            current_balance: 1250,
            total_earned: 3480,
            total_spent: 2230,
            this_month_earned: 620,
          },
          ranking: [
            { user_id: 1, user_name: "田中太郎", department: "営業部", reduced_co2_kg: 125.5, rank: 1, points_earned: 1255 },
            { user_id: 2, user_name: "佐藤花子", department: "開発部", reduced_co2_kg: 118.2, rank: 2, points_earned: 1182 },
            { user_id: 3, user_name: "鈴木一郎", department: "営業部", reduced_co2_kg: 112.8, rank: 3, points_earned: 1128 },
          ],
          myRank: 15,
          todayCo2: 2.5,
          thisMonthCo2: 48.7,
        });
        
      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <span className="ml-4 text-lg text-gray-600">{ja.common.loading}</span>
        </div>
      </Layout>
    );
  }

  if (!dashboardData) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <span className="text-lg text-gray-600">{ja.common.error}</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ja.dashboard.title}</h1>
            <p className="text-gray-600 mt-1">
              こんにちは、{user?.full_name || 'ユーザー'}さん
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Activity className="w-4 h-4" />
            <span>{ja.dashboard.todaySummary}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="今日のCO₂削減量"
            value={dashboardData.todayCo2}
            unit="kg"
            icon={<Leaf className="w-6 h-6 text-green-500" />}
            trend="up"
            trendValue={8.3}
          />
          <StatsCard
            title="今月のCO₂削減量"
            value={dashboardData.thisMonthCo2}
            unit="kg"
            icon={<Target className="w-6 h-6 text-blue-500" />}
            trend="up"
            trendValue={15.2}
          />
          <StatsCard
            title="現在のポイント"
            value={dashboardData.pointsSummary.current_balance}
            unit="pt"
            icon={<Coins className="w-6 h-6 text-yellow-500" />}
            trend="up"
            trendValue={12.5}
          />
          <StatsCard
            title="今月の順位"
            value={dashboardData.myRank}
            unit="位"
            icon={<Award className="w-6 h-6 text-purple-500" />}
            trend="up"
            trendValue={3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 今月のランキング */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  今月のランキング Top 3
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.ranking.slice(0, 3).map((user, index) => (
                    <div key={user.user_id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 'bg-yellow-600'
                        }`}>
                          {user.rank}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.user_name}</p>
                          <p className="text-sm text-gray-600">{user.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{user.reduced_co2_kg.toFixed(1)} kg</p>
                        <p className="text-sm text-gray-600">{user.points_earned} pt</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">あなたの順位</span>
                      <span className="text-lg font-bold text-primary-600">
                        {dashboardData.myRank}位
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ポイント概要 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5" />
                ポイント概要
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">現在のポイント</span>
                <span className="text-lg font-bold text-primary-600">
                  {dashboardData.pointsSummary.current_balance.toLocaleString()} pt
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">今月獲得</span>
                <span className="text-lg font-bold text-green-600">
                  +{dashboardData.pointsSummary.this_month_earned.toLocaleString()} pt
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">総獲得ポイント</span>
                <span className="text-lg font-bold text-gray-900">
                  {dashboardData.pointsSummary.total_earned.toLocaleString()} pt
                </span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">最近の活動</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      CO₂削減ポイント
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      +25 pt
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      景品交換
                    </span>
                    <span className="text-sm font-medium text-red-600">
                      -50 pt
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      ランキングボーナス
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      +10 pt
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* クイックアクション */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/ranking')}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ランキングを見る</h3>
                    <p className="text-sm text-gray-600">全社・部門別ランキング</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/rewards')}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">景品を見る</h3>
                    <p className="text-sm text-gray-600">ポイントで景品交換</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/points')}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">履歴を見る</h3>
                    <p className="text-sm text-gray-600">ポイント獲得履歴</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;