'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@admin-ui/card';
import { Button } from '@admin-ui/button';
import { Input } from '@admin-ui/input';
import { Badge } from '@admin-ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@admin-ui/select';
import { Search, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPointsEmployees } from '@/lib/api/points';

interface Employee {
  id: number;
  name: string;
  department: string;
  grade: string;
  points_distributed: number;
  points_used: number;
  points_balance: number;
  utilization_rate: number;
  last_activity: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

const PointsEmployeesTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    total_pages: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points_distributed');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const departments = ['営業部', '開発部', '総務部', '経理部', '人事部', '企画部'];

  useEffect(() => {
    fetchEmployees();
  }, [pagination.page, searchQuery, departmentFilter, sortBy, sortOrder]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      
      // APIが実装されるまではダミーデータを使用
      const dummyEmployees: Employee[] = [
        {
          id: 1,
          name: '田中 太郎',
          department: '営業部',
          grade: '主任',
          points_distributed: 4800,
          points_used: 2400,
          points_balance: 2400,
          utilization_rate: 50.0,
          last_activity: '2024-12-15'
        },
        {
          id: 2,
          name: '佐藤 花子',
          department: '開発部',
          grade: '課長',
          points_distributed: 5200,
          points_used: 3100,
          points_balance: 2100,
          utilization_rate: 59.6,
          last_activity: '2024-12-14'
        },
        {
          id: 3,
          name: '山田 一郎',
          department: '営業部',
          grade: '一般',
          points_distributed: 3600,
          points_used: 1800,
          points_balance: 1800,
          utilization_rate: 50.0,
          last_activity: '2024-12-13'
        },
        {
          id: 4,
          name: '鈴木 美咲',
          department: '総務部',
          grade: '主任',
          points_distributed: 4200,
          points_used: 1500,
          points_balance: 2700,
          utilization_rate: 35.7,
          last_activity: '2024-12-12'
        },
        {
          id: 5,
          name: '高橋 健太',
          department: '開発部',
          grade: '一般',
          points_distributed: 4600,
          points_used: 2300,
          points_balance: 2300,
          utilization_rate: 50.0,
          last_activity: '2024-12-11'
        }
      ];

      // フィルタリング処理
      let filteredEmployees = dummyEmployees;
      
      if (searchQuery) {
        filteredEmployees = filteredEmployees.filter(emp => 
          emp.name.includes(searchQuery) || emp.department.includes(searchQuery)
        );
      }
      
      if (departmentFilter !== 'all') {
        filteredEmployees = filteredEmployees.filter(emp => emp.department === departmentFilter);
      }

      // ソート処理
      filteredEmployees.sort((a, b) => {
        const aVal = a[sortBy as keyof Employee];
        const bVal = b[sortBy as keyof Employee];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
        } else {
          const aStr = String(aVal);
          const bStr = String(bVal);
          return sortOrder === 'desc' ? bStr.localeCompare(aStr) : aStr.localeCompare(bStr);
        }
      });

      setEmployees(filteredEmployees);
      setPagination({
        page: 1,
        limit: 20,
        total: filteredEmployees.length,
        total_pages: Math.ceil(filteredEmployees.length / 20)
      });

    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleExport = () => {
    // CSV エクスポート機能の実装
    console.log('Exporting employee data...');
  };

  const getUtilizationBadgeVariant = (rate: number) => {
    if (rate >= 70) return 'default';
    if (rate >= 40) return 'secondary';
    return 'destructive';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>従業員一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>従業員別ポイント管理</CardTitle>
        
        {/* フィルター・検索バー */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="従業員名・部署で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部署</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              CSV出力
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* テーブル */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('name')}
                    className="font-medium text-gray-900 whitespace-nowrap"
                  >
                    従業員名
                    {sortBy === 'name' && (
                      <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </Button>
                </th>
                <th className="text-left p-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('department')}
                    className="font-medium text-gray-900 whitespace-nowrap"
                  >
                    部署・役職
                    {sortBy === 'department' && (
                      <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </Button>
                </th>
                <th className="text-right p-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('points_distributed')}
                    className="font-medium text-gray-900 whitespace-nowrap"
                  >
                    配布ポイント
                    {sortBy === 'points_distributed' && (
                      <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </Button>
                </th>
                <th className="text-right p-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('points_used')}
                    className="font-medium text-gray-900 whitespace-nowrap"
                  >
                    使用ポイント
                    {sortBy === 'points_used' && (
                      <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </Button>
                </th>
                <th className="text-right p-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('points_balance')}
                    className="font-medium text-gray-900 whitespace-nowrap"
                  >
                    残高
                    {sortBy === 'points_balance' && (
                      <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </Button>
                </th>
                <th className="text-right p-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('utilization_rate')}
                    className="font-medium text-gray-900 whitespace-nowrap"
                  >
                    利用率
                    {sortBy === 'utilization_rate' && (
                      <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </Button>
                </th>
                <th className="text-left p-3">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('last_activity')}
                    className="font-medium text-gray-900 whitespace-nowrap"
                  >
                    最終利用日
                    {sortBy === 'last_activity' && (
                      <span className="ml-1">{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium text-gray-900 whitespace-nowrap">
                      {employee.name}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="space-y-1">
                      <Badge variant="outline" className="whitespace-nowrap">
                        {employee.department}
                      </Badge>
                      <div className="text-sm text-gray-600">{employee.grade}</div>
                    </div>
                  </td>
                  <td className="p-3 text-right font-mono">
                    {employee.points_distributed.toLocaleString()}pt
                  </td>
                  <td className="p-3 text-right font-mono">
                    {employee.points_used.toLocaleString()}pt
                  </td>
                  <td className="p-3 text-right font-mono">
                    {employee.points_balance.toLocaleString()}pt
                  </td>
                  <td className="p-3 text-right">
                    <Badge 
                      variant={getUtilizationBadgeVariant(employee.utilization_rate)}
                      className="whitespace-nowrap"
                    >
                      {employee.utilization_rate}%
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">
                    {new Date(employee.last_activity).toLocaleDateString('ja-JP')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ページネーション */}
        {pagination.total_pages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              {pagination.total}件中 {Math.min(pagination.limit * (pagination.page - 1) + 1, pagination.total)} - {Math.min(pagination.limit * pagination.page, pagination.total)}件を表示
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                前へ
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={pagination.page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPagination(prev => ({ ...prev, page: pageNum }))}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.total_pages}
              >
                次へ
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PointsEmployeesTable;