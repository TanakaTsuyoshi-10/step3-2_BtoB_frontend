'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Trophy, 
  Medal, 
  Award, 
  Users, 
  Filter,
  Calendar,
  TrendingUp,
} from '@iconify/react/icons/heroicons';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@admin-ui/card';
import { isAuthenticated } from '@/lib/auth';
import ja from '@/i18n/ja';

interface RankingEntry {
  user_id: number;
  user_name: string;
  department: string;
  reduced_co2_kg: number;
  rank: number;
  points_earned: number;
}

const RankingPage: React.FC = () => {
  const router = useRouter();
  const [rankings, setRankings] = useState<div[]>([]);
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [departments, setDepartments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myRank, setMyRank] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchRankings = async () => {
      try {
        // 実際のAPIが実装されたら以下のコメントアウト部分を使用
        /*
        const response = await pointsAPI.getRanking({
          period,
          department: selectedDepartment || undefined,
          limit: 100
        });
        setRankings(response);
        */
        
        // 仮データ
        const mockRankings: RankingEntry[] = [
          { user_id: 1, user_name: "田中太郎", department: "営業部", reduced_co2_kg: 125.5, rank: 1, points_earned: 1255 },
          { user_id: 2, user_name: "佐藤花子", department: "開発部", reduced_co2_kg: 118.2, rank: 2, points_earned: 1182 },
          { user_id: 3, user_name: "鈴木一郎", department: "営業部", reduced_co2_kg: 112.8, rank: 3, points_earned: 1128 },
          { user_id: 4, user_name: "山田美咲", department: "人事部", reduced_co2_kg: 108.5, rank: 4, points_earned: 1085 },
          { user_id: 5, user_name: "高橋健太", department: "開発部", reduced_co2_kg: 102.3, rank: 5, points_earned: 1023 },
          { user_id: 6, user_name: "渡辺由美", department: "営業部", reduced_co2_kg: 98.7, rank: 6, points_earned: 987 },
          { user_id: 7, user_name: "松本直樹", department: "企画部", reduced_co2_kg: 95.2, rank: 7, points_earned: 952 },
          { user_id: 8, user_name: "木村愛子", department: "人事部", reduced_co2_kg: 91.8, rank: 8, points_earned: 918 },
          { user_id: 9, user_name: "小林正雄", department: "開発部", reduced_co2_kg: 88.4, rank: 9, points_earned: 884 },
          { user_id: 10, user_name: "中村千春", department: "企画部", reduced_co2_kg: 85.1, rank: 10, points_earned: 851 },
        ];
        
        const filteredRankings = selectedDepartment 
          ? mockRankings.filter(r => r.department === selectedDepartment)
          : mockRankings;
        
        setRankings(filteredRankings);
        setMyRank(15); // 仮の自分の順位
        
        // 部門リストを取得
        const uniqueDepartments = Array.from(new Set(mockRankings.map(r => r.department)));
        setDepartments(uniqueDepartments);
        
      } catch (error) {
        console.error('ランキング取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankings();
  }, [router, period, selectedDepartment]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <div className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <div className="w-6 h-6 text-gray-400" />;
      case 3:
        return <div className="w-6 h-6 text-yellow-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">{rank}</span>;
    }
  };

  const getRankBackgroundColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <span className="ml-4 text-lg text-gray-600">{ja.common.loading}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ja.ranking.title}</h1>
            <p className="text-gray-600 mt-1">
              従業員CO₂削減ランキング
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-4 h-4" />
            <span>期間: {ja.ranking.period[period]}</span>
          </div>
        </div>

        {/* フィルター */}
        <div>
          <div className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">期間:</span>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as any)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="monthly">{ja.ranking.period.monthly}</option>
                  <option value="quarterly">{ja.ranking.period.quarterly}</option>
                  <option value="yearly">{ja.ranking.period.yearly}</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">部門:</span>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">{ja.ranking.allDepartments}</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 自分の順位 */}
        {myRank && (
          <div className="border-primary-200 bg-primary-50">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-primary-900">{ja.ranking.myRank}</span>
                </div>
                <span className="text-2xl font-bold text-primary-600">{myRank}位</span>
              </div>
            </div>
          </div>
        )}

        {/* ランキングリスト */}
        <div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5" />
              ランキング
            </div>
          </div>
          <div>
            <div className="space-y-3">
              {rankings.map((entry) => (
                <div
                  key={entry.user_id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${getRankBackgroundColor(entry.rank)}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{entry.user_name}</p>
                      <p className="text-sm text-gray-600">{entry.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{entry.reduced_co2_kg.toFixed(1)} kg</p>
                    <p className="text-sm text-gray-600">{entry.points_earned.toLocaleString()} pt</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;