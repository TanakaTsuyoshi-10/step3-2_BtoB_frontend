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
  Crown,
  Star,
  Target,
  Download
} from 'lucide-react';
import Layout from '@components/layout/Layout';
import { isAuthenticated } from '@lib/auth';
import ja from '@/i18n/ja';

interface RankingEntry {
  user_id: number;
  user_name: string;
  department: string;
  reduced_co2_kg: number;
  rank: number;
  points_earned: number;
}

export default function Page() {
  const router = useRouter();
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [period, setPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [departments, setDepartments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myRank, setMyRank] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
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
    }

    fetchRankings();
  }, [router, period, selectedDepartment]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-7 h-7 text-yellow-500" />;
      case 2:
        return <Medal className="w-7 h-7 text-gray-400" />;
      case 3:
        return <Award className="w-7 h-7 text-orange-500" />;
      default:
        return (
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-slate-600">{rank}</span>
          </div>
        );
    }
  }

  const getRankCard = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50/90 to-amber-50/90 border-2 border-yellow-300 shadow-lg';
      case 2:
        return 'bg-gradient-to-r from-slate-50/90 to-gray-50/90 border-2 border-gray-300 shadow-lg';
      case 3:
        return 'bg-gradient-to-r from-orange-50/90 to-red-50/90 border-2 border-orange-300 shadow-lg';
      default:
        return 'bg-white/90 backdrop-blur-sm border border-slate-200 hover:shadow-md transition-all duration-200';
    }
  }

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

  const totalParticipants = rankings.length;
  const avgCO2Reduction = rankings.length > 0 
    ? rankings.reduce((sum, entry) => sum + entry.reduced_co2_kg, 0) / rankings.length 
    : 0;
  const topPerformers = rankings.slice(0, 3);

  return (
    <Layout>
      <div className="space-y-8">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{ja.ranking.title}</h1>
            <p className="text-slate-600 mt-1">従業員CO₂削減活動の実績ランキング</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>CSVエクスポート</span>
            </button>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="admin-stat-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">参加者数</p>
                <p className="text-2xl font-bold text-blue-600">{totalParticipants}名</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="admin-stat-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">平均削減量</p>
                <p className="text-2xl font-bold text-green-600">{avgCO2Reduction.toFixed(1)} kg</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="admin-stat-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">対象期間</p>
                <p className="text-2xl font-bold text-purple-600">{ja.ranking.period[period]}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* フィルター */}
        <div className="admin-card p-6">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">期間:</span>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as any)}
                className="input-field min-w-[120px]"
              >
                <option value="monthly">{ja.ranking.period.monthly}</option>
                <option value="quarterly">{ja.ranking.period.quarterly}</option>
                <option value="yearly">{ja.ranking.period.yearly}</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">部門:</span>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="input-field min-w-[150px]"
              >
                <option value="">{ja.ranking.allDepartments}</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* トップ3表彰台 */}
        {topPerformers.length >= 3 && (
          <div className="admin-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">トップパフォーマー</h2>
              <p className="text-slate-600">優秀な削減実績を達成した上位3名</p>
            </div>
            
            <div className="flex justify-center items-end space-x-6">
              {/* 2位 */}
              <div className="text-center">
                <div className="w-24 h-32 bg-gradient-to-t from-slate-100 to-slate-50 rounded-t-lg flex flex-col justify-end items-center p-4 border-2 border-slate-300 shadow-lg">
                  <Medal className="w-8 h-8 text-slate-400 mb-2" />
                  <span className="text-2xl font-bold text-slate-600">2</span>
                </div>
                <div className="mt-4">
                  <p className="font-bold text-slate-900">{topPerformers[1]?.user_name}</p>
                  <p className="text-sm text-slate-600">{topPerformers[1]?.department}</p>
                  <p className="text-lg font-bold text-green-600">{topPerformers[1]?.reduced_co2_kg.toFixed(1)} kg</p>
                </div>
              </div>

              {/* 1位 */}
              <div className="text-center">
                <div className="w-28 h-40 bg-gradient-to-t from-yellow-100 to-yellow-50 rounded-t-lg flex flex-col justify-end items-center p-4 border-2 border-yellow-300 shadow-xl">
                  <Crown className="w-10 h-10 text-yellow-500 mb-2" />
                  <span className="text-3xl font-bold text-yellow-600">1</span>
                </div>
                <div className="mt-4">
                  <p className="font-bold text-slate-900 text-lg">{topPerformers[0]?.user_name}</p>
                  <p className="text-sm text-slate-600">{topPerformers[0]?.department}</p>
                  <p className="text-xl font-bold text-yellow-600">{topPerformers[0]?.reduced_co2_kg.toFixed(1)} kg</p>
                </div>
              </div>

              {/* 3位 */}
              <div className="text-center">
                <div className="w-24 h-28 bg-gradient-to-t from-orange-100 to-orange-50 rounded-t-lg flex flex-col justify-end items-center p-4 border-2 border-orange-300 shadow-lg">
                  <Award className="w-8 h-8 text-orange-500 mb-2" />
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <div className="mt-4">
                  <p className="font-bold text-slate-900">{topPerformers[2]?.user_name}</p>
                  <p className="text-sm text-slate-600">{topPerformers[2]?.department}</p>
                  <p className="text-lg font-bold text-orange-600">{topPerformers[2]?.reduced_co2_kg.toFixed(1)} kg</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 全体ランキングリスト */}
        <div className="admin-card">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-slate-600" />
                <h2 className="text-xl font-bold text-slate-900">全体ランキング</h2>
              </div>
              <div className="text-sm text-slate-500">{rankings.length}名が参加</div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {rankings.map((entry, index) => (
                <div
                  key={entry.user_id}
                  className={`flex items-center justify-between p-4 rounded-xl ${getRankCard(entry.rank)}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center">
                      {getRankIcon(entry.rank)}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{entry.user_name}</p>
                        <p className="text-sm text-slate-600">{entry.department}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-sm text-slate-600">CO₂削減量</p>
                      <p className="text-xl font-bold text-green-600">{entry.reduced_co2_kg.toFixed(1)} kg</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">獲得ポイント</p>
                      <p className="text-xl font-bold text-blue-600">{entry.points_earned.toLocaleString()} pt</p>
                    </div>
                    {entry.rank <= 3 && (
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}