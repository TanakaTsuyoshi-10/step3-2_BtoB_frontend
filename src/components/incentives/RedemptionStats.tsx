'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@admin-ui/card';
import { Badge } from '@admin-ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@admin-ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Award, Package, Users } from 'lucide-react';
import { getRedemptionStats, getPopularity } from '@/lib/api/incentives';

interface RedemptionStats {
  total_redemptions: number;
  monthly_redemptions: number;
  total_points_used: number;
  low_stock_alerts: number;
  period_start: string;
  period_end: string;
}

interface PopularityItem {
  product_name: string;
  category: string;
  redemption_count: number;
  selection_rate: number;
  points_per_redemption: number;
}

interface MonthlyTrend {
  month: string;
  redemptions: number;
  points_used: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const RedemptionStats: React.FC = () => {
  const [stats, setStats] = useState<RedemptionStats | null>(null);
  const [popularity, setPopularity] = useState<PopularityItem[]>([]);
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // APIが実装されるまではダミーデータを使用
      setStats({
        total_redemptions: 156,
        monthly_redemptions: 24,
        total_points_used: 45600,
        low_stock_alerts: 3,
        period_start: '2024-01-01',
        period_end: '2024-12-31'
      });

      setPopularity([
        {
          product_name: 'Amazonギフト券 1,000円分',
          category: 'ギフトカード',
          redemption_count: 45,
          selection_rate: 28.8,
          points_per_redemption: 1000
        },
        {
          product_name: 'スターバックス ドリンクチケット',
          category: '食品・飲料',
          redemption_count: 38,
          selection_rate: 24.4,
          points_per_redemption: 500
        },
        {
          product_name: 'QUOカード 500円分',
          category: 'ギフトカード',
          redemption_count: 32,
          selection_rate: 20.5,
          points_per_redemption: 500
        },
        {
          product_name: 'ワイヤレスマウス',
          category: '電子機器',
          redemption_count: 24,
          selection_rate: 15.4,
          points_per_redemption: 800
        },
        {
          product_name: 'エコバッグセット',
          category: '生活用品',
          redemption_count: 17,
          selection_rate: 10.9,
          points_per_redemption: 300
        }
      ]);

      setMonthlyTrend([
        { month: '7月', redemptions: 18, points_used: 6800 },
        { month: '8月', redemptions: 24, points_used: 7900 },
        { month: '9月', redemptions: 22, points_used: 9200 },
        { month: '10月', redemptions: 28, points_used: 8400 },
        { month: '11月', redemptions: 32, points_used: 10600 },
        { month: '12月', redemptions: 24, points_used: 11800 },
      ]);

    } catch (error) {
      console.error('Failed to fetch redemption stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // カテゴリ別集計
  const categoryStats = popularity.reduce((acc: any[], item) => {
    const existing = acc.find(cat => cat.name === item.category);
    if (existing) {
      existing.value += item.redemption_count;
    } else {
      acc.push({
        name: item.category,
        value: item.redemption_count
      });
    }
    return acc;
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-gray-200 rounded-lg"></div>
            <div className="h-80 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">交換実績・人気度分析</h2>
          <p className="text-gray-600">商品の交換実績と選択率を分析</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">今月</SelectItem>
            <SelectItem value="quarter">四半期</SelectItem>
            <SelectItem value="year">年間</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総交換回数</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.total_redemptions}回
                </p>
                <p className="text-sm text-green-600 mt-1">
                  前月比 +12.5%
                </p>
              </div>
              <Award className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">今月交換</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats?.monthly_redemptions}回
                </p>
                <p className="text-sm text-green-600 mt-1">
                  前月比 +8.2%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">使用ポイント</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats?.total_points_used.toLocaleString()}pt
                </p>
                <p className="text-sm text-purple-600 mt-1">
                  平均292pt/回
                </p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">在庫警告</p>
                <p className="text-2xl font-bold text-red-600">
                  {stats?.low_stock_alerts}件
                </p>
                <p className="text-sm text-red-600 mt-1">
                  要補充対応
                </p>
              </div>
              <Users className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* グラフセクション */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 人気商品ランキング */}
        <Card>
          <CardHeader>
            <CardTitle>人気商品ランキング（選択率）</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={popularity.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="product_name" 
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'selection_rate' ? `${value}%` : `${value}回`,
                    name === 'selection_rate' ? '選択率' : '交換回数'
                  ]}
                />
                <Bar dataKey="selection_rate" fill="#3B82F6" name="選択率" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* カテゴリ別分布 */}
        <Card>
          <CardHeader>
            <CardTitle>カテゴリ別交換分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 月次推移 */}
      <Card>
        <CardHeader>
          <CardTitle>月次交換推移</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="redemptions" fill="#3B82F6" name="交換回数" />
              <Bar yAxisId="right" dataKey="points_used" fill="#10B981" name="使用ポイント" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 詳細テーブル */}
      <Card>
        <CardHeader>
          <CardTitle>商品別詳細実績</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-900">順位</th>
                  <th className="text-left p-3 font-medium text-gray-900 whitespace-nowrap">商品名</th>
                  <th className="text-left p-3 font-medium text-gray-900 whitespace-nowrap">カテゴリ</th>
                  <th className="text-right p-3 font-medium text-gray-900 whitespace-nowrap">交換回数</th>
                  <th className="text-right p-3 font-medium text-gray-900 whitespace-nowrap">選択率</th>
                  <th className="text-right p-3 font-medium text-gray-900 whitespace-nowrap">平均ポイント</th>
                </tr>
              </thead>
              <tbody>
                {popularity.map((item, index) => (
                  <tr key={item.product_name} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <Badge
                        variant={index < 3 ? "default" : "secondary"}
                        className={`whitespace-nowrap ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-amber-600' : ''
                        }`}
                      >
                        {index + 1}位
                      </Badge>
                    </td>
                    <td className="p-3 font-medium">
                      <div className="max-w-xs truncate" title={item.product_name}>
                        {item.product_name}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className="whitespace-nowrap">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="p-3 text-right font-mono">
                      {item.redemption_count}回
                    </td>
                    <td className="p-3 text-right font-mono">
                      {item.selection_rate}%
                    </td>
                    <td className="p-3 text-right font-mono">
                      {item.points_per_redemption.toLocaleString()}pt
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedemptionStats;