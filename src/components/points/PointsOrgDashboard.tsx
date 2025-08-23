'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@admin-ui/card';
import { Badge } from '@admin-ui/badge';
import { Button } from '@admin-ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@admin-ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Award, Users, TrendingUp, Calendar, RefreshCw } from 'lucide-react';
import { getPointsSummary, getPointsDistribution } from '@/lib/api/points';

interface PointsSummary {
  total_points_distributed: number;
  monthly_distributed: number;
  total_unused_balance: number;
  utilization_rate: number;
  period_start: string;
  period_end: string;
}

interface MonthlyData {
  month: string;
  distributed: number;
  used: number;
  balance: number;
}

interface DepartmentData {
  department: string;
  total_distributed: number;
  employees_count: number;
  average_per_employee: number;
  utilization_rate: number;
}

const PointsOrgDashboard: React.FC = () => {
  const [summary, setSummary] = useState<PointsSummary | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [departmentData, setDepartmentData] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6months');

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // APIが実装されるまではダミーデータを使用
      setSummary({
        total_points_distributed: 156800,
        monthly_distributed: 12400,
        total_unused_balance: 89200,
        utilization_rate: 43.1,
        period_start: '2024-07-01',
        period_end: '2024-12-31'
      });

      setMonthlyData([
        { month: '7月', distributed: 15200, used: 6800, balance: 8400 },
        { month: '8月', distributed: 18400, used: 7900, balance: 10500 },
        { month: '9月', distributed: 16800, used: 9200, balance: 7600 },
        { month: '10月', distributed: 19600, used: 8400, balance: 11200 },
        { month: '11月', distributed: 14200, used: 10600, balance: 3600 },
        { month: '12月', distributed: 12400, used: 11800, balance: 600 },
      ]);

      setDepartmentData([
        { department: '営業部', total_distributed: 45600, employees_count: 12, average_per_employee: 3800, utilization_rate: 52.3 },
        { department: '開発部', total_distributed: 38200, employees_count: 8, average_per_employee: 4775, utilization_rate: 48.7 },
        { department: '総務部', total_distributed: 24800, employees_count: 6, average_per_employee: 4133, utilization_rate: 39.2 },
        { department: '経理部', total_distributed: 22400, employees_count: 5, average_per_employee: 4480, utilization_rate: 36.8 },
        { department: '人事部', total_distributed: 18600, employees_count: 4, average_per_employee: 4650, utilization_rate: 41.5 },
        { department: '企画部', total_distributed: 7200, employees_count: 3, average_per_employee: 2400, utilization_rate: 28.9 },
      ]);

    } catch (error) {
      console.error('Failed to fetch points data:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-900">組織ダッシュボード</h2>
          <p className="text-gray-600">全従業員のポイント配布・利用状況</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">直近3ヶ月</SelectItem>
              <SelectItem value="6months">直近6ヶ月</SelectItem>
              <SelectItem value="12months">直近12ヶ月</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchData} variant="outline" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* KPIカード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総配布ポイント</p>
                <p className="text-2xl font-bold text-gray-900">
                  {summary?.total_points_distributed.toLocaleString()}pt
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  期間: {summary?.period_start} 〜 {summary?.period_end}
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
                <p className="text-sm font-medium text-gray-600">今月配布</p>
                <p className="text-2xl font-bold text-green-600">
                  +{summary?.monthly_distributed.toLocaleString()}pt
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
                <p className="text-sm font-medium text-gray-600">未使用残高</p>
                <p className="text-2xl font-bold text-orange-600">
                  {summary?.total_unused_balance.toLocaleString()}pt
                </p>
                <p className="text-sm text-orange-600 mt-1">
                  全体の57%
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">利用率</p>
                <p className="text-2xl font-bold text-purple-600">
                  {summary?.utilization_rate}%
                </p>
                <p className="text-sm text-purple-600 mt-1">
                  前月比 +2.8%
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* グラフセクション */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 月次推移 */}
        <Card>
          <CardHeader>
            <CardTitle>月次推移</CardTitle>
            <CardDescription>配布・使用・残高の推移</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()}pt`} />
                <Line 
                  type="monotone" 
                  dataKey="distributed" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="配布ポイント"
                />
                <Line 
                  type="monotone" 
                  dataKey="used" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="使用ポイント"
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  name="残高"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 部署別配布状況 */}
        <Card>
          <CardHeader>
            <CardTitle>部署別配布状況</CardTitle>
            <CardDescription>部署ごとの配布ポイント</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="department" 
                  type="category" 
                  width={80}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()}pt`} />
                <Bar dataKey="total_distributed" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 部署別詳細テーブル */}
      <Card>
        <CardHeader>
          <CardTitle>部署別詳細</CardTitle>
          <CardDescription>各部署の配布状況と利用率</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-900">部署名</th>
                  <th className="text-right p-3 font-medium text-gray-900 whitespace-nowrap">配布ポイント</th>
                  <th className="text-right p-3 font-medium text-gray-900 whitespace-nowrap">従業員数</th>
                  <th className="text-right p-3 font-medium text-gray-900 whitespace-nowrap">一人当たり</th>
                  <th className="text-right p-3 font-medium text-gray-900 whitespace-nowrap">利用率</th>
                </tr>
              </thead>
              <tbody>
                {departmentData.map((dept) => (
                  <tr key={dept.department} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <Badge variant="outline" className="whitespace-nowrap">
                        {dept.department}
                      </Badge>
                    </td>
                    <td className="p-3 text-right font-mono">
                      {dept.total_distributed.toLocaleString()}pt
                    </td>
                    <td className="p-3 text-right">
                      {dept.employees_count}名
                    </td>
                    <td className="p-3 text-right font-mono">
                      {dept.average_per_employee.toLocaleString()}pt
                    </td>
                    <td className="p-3 text-right">
                      <Badge 
                        variant={dept.utilization_rate >= 50 ? "default" : dept.utilization_rate >= 30 ? "secondary" : "destructive"}
                        className="whitespace-nowrap"
                      >
                        {dept.utilization_rate}%
                      </Badge>
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

export default PointsOrgDashboard;