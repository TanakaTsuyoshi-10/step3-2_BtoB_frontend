'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Coins, 
  Plus, 
  Minus, 
  Calendar,
  TrendingUp,
  TrendingDown,
  History,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { isAuthenticated } from '@/lib/auth';
import ja from '@/i18n/ja';

interface PointsSummary {
  current_balance: number;
  total_earned: number;
  total_spent: number;
  this_month_earned: number;
}

interface PointsHistory {
  id: number;
  delta: number;
  reason: string;
  balance_after: number;
  created_at: string;
}

const PointsPage: React.FC = () => {
  const router = useRouter();
  const [pointsSummary, setPointsSummary] = useState<PointsSummary | null>(null);
  const [pointsHistory, setPointsHistory] = useState<PointsHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchPointsData = async () => {
      try {
        // 実際のAPIが実装されたら以下のコメントアウト部分を使用
        /*
        const [summaryResponse, historyResponse] = await Promise.all([
          pointsAPI.getMyPoints(),
          pointsAPI.getHistory({ limit: 50 })
        ]);
        
        setPointsSummary(summaryResponse);
        setPointsHistory(historyResponse);
        */
        
        // 仮データ
        setPointsSummary({
          current_balance: 1250,
          total_earned: 3480,
          total_spent: 2230,
          this_month_earned: 620,
        });

        setPointsHistory([
          {
            id: 1,
            delta: 25,
            reason: "CO₂削減ポイント (2.5kg削減)",
            balance_after: 1250,
            created_at: "2025-01-18T09:30:00Z"
          },
          {
            id: 2,
            delta: -50,
            reason: "景品交換: Amazonギフトカード 500円分",
            balance_after: 1225,
            created_at: "2025-01-17T14:20:00Z"
          },
          {
            id: 3,
            delta: 30,
            reason: "CO₂削減ポイント (3.0kg削減)",
            balance_after: 1275,
            created_at: "2025-01-17T08:15:00Z"
          },
          {
            id: 4,
            delta: 10,
            reason: "ランキングボーナス (月間10位以内)",
            balance_after: 1245,
            created_at: "2025-01-16T18:00:00Z"
          },
          {
            id: 5,
            delta: 20,
            reason: "CO₂削減ポイント (2.0kg削減)",
            balance_after: 1235,
            created_at: "2025-01-16T10:45:00Z"
          },
        ]);
        
      } catch (error) {
        console.error('ポイントデータ取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPointsData();
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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

  if (!pointsSummary) {
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
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ja.points.title}</h1>
            <p className="text-gray-600 mt-1">
              ポイント残高と獲得履歴
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Coins className="w-4 h-4" />
            <span>現在のポイント</span>
          </div>
        </div>

        {/* ポイント概要 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-primary-200 bg-primary-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600">現在のポイント</p>
                  <p className="text-3xl font-bold text-primary-900">
                    {pointsSummary.current_balance.toLocaleString()}
                  </p>
                  <p className="text-sm text-primary-600">pt</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Coins className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">今月獲得</p>
                  <p className="text-2xl font-bold text-green-600">
                    +{pointsSummary.this_month_earned.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">pt</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総獲得</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pointsSummary.total_earned.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">pt</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総使用</p>
                  <p className="text-2xl font-bold text-red-600">
                    {pointsSummary.total_spent.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">pt</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Minus className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ポイント履歴 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              {ja.points.history}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pointsHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      entry.delta > 0 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {entry.delta > 0 ? (
                        <Plus className="w-5 h-5" />
                      ) : (
                        <Minus className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{entry.reason}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(entry.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      entry.delta > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.delta > 0 ? '+' : ''}{entry.delta.toLocaleString()} pt
                    </p>
                    <p className="text-sm text-gray-600">
                      残高: {entry.balance_after.toLocaleString()} pt
                    </p>
                  </div>
                </div>
              ))}
              
              {pointsHistory.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">{ja.points.noHistory}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* クイックアクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/rewards')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Coins className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">景品を見る</h3>
                  <p className="text-sm text-gray-600">ポイントで景品と交換</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/ranking')}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">ランキングを見る</h3>
                  <p className="text-sm text-gray-600">順位を確認してポイントを獲得</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PointsPage;