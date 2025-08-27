'use client';

import React, { useState } from 'react';
import Layout from '@components/layout/Layout';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit2, 
  Trash2, 
  User, 
  Calendar, 
  TrendingUp,
  Award,
  DollarSign,
  Users,
  BarChart3,
  Activity
} from 'lucide-react';

export default function PointsManagementPage() {
  const [selectedTab, setSelectedTab] = useState('rules');
  const [searchTerm, setSearchTerm] = useState('');

  // モックデータ
  const pointRules = [
    {
      id: 1,
      name: 'CO₂削減ポイント',
      type: 'per_kg',
      value: 10,
      description: 'CO₂削減量1kgあたり10ポイント',
      active: true,
      created_at: '2025-01-15'
    },
    {
      id: 2,
      name: '月間ランキング1位ボーナス',
      type: 'rank_bonus',
      value: 500,
      description: '月間削減ランキング1位のボーナス',
      active: true,
      created_at: '2025-01-10'
    },
    {
      id: 3,
      name: '継続参加ボーナス',
      type: 'streak_bonus',
      value: 50,
      description: '7日連続参加で50ポイント',
      active: false,
      created_at: '2025-01-05'
    }
  ];

  const pointTransactions = [
    {
      id: 1,
      user_name: '田中太郎',
      department: '営業部',
      type: 'earned',
      points: 120,
      reason: 'CO₂削減活動（12kg）',
      date: '2025-01-20'
    },
    {
      id: 2,
      user_name: '佐藤花子',
      department: '開発部',
      type: 'spent',
      points: -200,
      reason: 'Amazonギフトカード交換',
      date: '2025-01-19'
    },
    {
      id: 3,
      user_name: '鈴木次郎',
      department: '営業部',
      type: 'earned',
      points: 550,
      reason: '月間ランキング1位ボーナス',
      date: '2025-01-18'
    }
  ];

  const stats = {
    totalPointsIssued: 45680,
    totalPointsSpent: 12340,
    activeUsers: 156,
    averagePoints: 292
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ポイント管理</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">ポイントルールの設定と取引履歴の管理</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="btn-secondary flex items-center justify-center space-x-2 text-sm">
              <Download className="w-4 h-4" />
              <span>CSVエクスポート</span>
            </button>
            <button className="btn-primary flex items-center justify-center space-x-2 text-sm">
              <Plus className="w-4 h-4" />
              <span>新規ルール作成</span>
            </button>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総発行ポイント</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{stats.totalPointsIssued.toLocaleString()}</p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総消費ポイント</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.totalPointsSpent.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">アクティブユーザー</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{stats.activeUsers}</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">平均保有ポイント</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.averagePoints}</p>
              </div>
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 px-4 sm:px-6">
              <button
                onClick={() => setSelectedTab('rules')}
                className={`py-2 sm:py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'rules'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ポイントルール
              </button>
              <button
                onClick={() => setSelectedTab('transactions')}
                className={`py-2 sm:py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'transactions'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                取引履歴
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {selectedTab === 'rules' && (
              <div className="space-y-6">
                {/* 検索・フィルター */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ルールを検索..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-10 w-full"
                      />
                    </div>
                  </div>
                  <button className="btn-secondary flex items-center justify-center space-x-2 text-sm">
                    <Filter className="w-4 h-4" />
                    <span>フィルター</span>
                  </button>
                </div>

                {/* ポイントルール一覧 */}
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ルール名
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          種別
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ポイント値
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ステータス
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          作成日
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pointRules.map((rule) => (
                        <tr key={rule.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                              <div className="text-sm text-gray-500">{rule.description}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {rule.type === 'per_kg' ? 'CO₂削減量' : 
                               rule.type === 'rank_bonus' ? 'ランキング' : '継続参加'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {rule.value} pt
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              rule.active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {rule.active ? '有効' : '無効'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {rule.created_at}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button className="text-primary-600 hover:text-primary-900">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'transactions' && (
              <div className="space-y-6">
                {/* 検索・フィルター */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ユーザー名で検索..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-10"
                      />
                    </div>
                    <select className="input-field">
                      <option value="">全ての取引</option>
                      <option value="earned">獲得</option>
                      <option value="spent">消費</option>
                    </select>
                    <select className="input-field">
                      <option value="">全部門</option>
                      <option value="営業部">営業部</option>
                      <option value="開発部">開発部</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-500">
                    {pointTransactions.length}件の取引
                  </div>
                </div>

                {/* 取引履歴一覧 */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ユーザー
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          種別
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ポイント
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          内容
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          日時
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pointTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                  <User className="w-4 h-4 text-gray-500" />
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {transaction.user_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {transaction.department}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.type === 'earned'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.type === 'earned' ? '獲得' : '消費'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${
                              transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.points > 0 ? '+' : ''}{transaction.points}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.reason}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

