'use client';

import React, { useState, useEffect } from 'react';
import { Coins, Users, Award, Plus, Edit, Trash2, FileText } from '@iconify/react/icons/heroicons';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@admin-ui/card';
import ja from '@/i18n/ja';

interface PointRule {
  id: number;
  title: string;
  description: string;
  points: number;
  category: 'energy_reduction' | 'upload' | 'activity' | 'bonus';
  active: boolean;
  created_at: string;
}

interface PointTransaction {
  id: number;
  user_name: string;
  user_email: string;
  points: number;
  reason: string;
  transaction_type: 'earned' | 'redeemed' | 'adjusted';
  created_at: string;
}

export default function AdminPointsPage() {
  const [activeTab, setActiveTab] = useState('rules')
  const [pointRules, setPointRules] = useState<div[]>([
    {
      id: 1,
      title: 'ガス使用量削減10%以上',
      description: '前月比でガス使用量を10%以上削減した場合',
      points: 100,
      category: 'energy_reduction',
      active: true,
      created_at: '2025-01-01'
    },
    {
      id: 2,
      title: '電力使用量削減5%以上',
      description: '前月比で電力使用量を5%以上削減した場合',
      points: 50,
      category: 'energy_reduction',
      active: true,
      created_at: '2025-01-01'
    },
    {
      id: 3,
      title: '利用明細アップロード',
      description: 'ガス・電気の利用明細をアップロードした場合',
      points: 20,
      category: 'upload',
      active: true,
      created_at: '2025-01-01'
    }
  ])

  const [transactions, setTransactions] = useState<div[]>([
    {
      id: 1,
      user_name: '田中 太郎',
      user_email: 'tanaka@example.com',
      points: 100,
      reason: 'ガス使用量削減15%達成',
      transaction_type: 'earned',
      created_at: '2025-01-15T10:30:00Z'
    },
    {
      id: 2,
      user_name: '佐藤 花子',
      user_email: 'sato@example.com',
      points: -500,
      reason: 'Amazonギフトカード交換',
      transaction_type: 'redeemed',
      created_at: '2025-01-14T14:20:00Z'
    },
    {
      id: 3,
      user_name: '鈴木 一郎',
      user_email: 'suzuki@example.com',
      points: 50,
      reason: '電力使用量削減8%達成',
      transaction_type: 'earned',
      created_at: '2025-01-14T09:15:00Z'
    }
  ])

  const [showRuleModal, setShowRuleModal] = useState(false)
  const [editingRule, setEditingRule] = useState<div | null>(null)
  const [newRule, setNewRule] = useState({
    title: '',
    description: '',
    points: 0,
    category: 'energy_reduction' as const,
    active: true
  })

  const handleSaveRule = () => {
    if (editingRule) {
      setPointRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, ...newRule }
          : rule
      ))
    } else {
      const newId = Math.max(...pointRules.map(r => r.id)) + 1
      setPointRules(prev => [...prev, {
        id: newId,
        ...newRule,
        created_at: new Date().toISOString().split('T')[0]
      }])
    }
    setShowRuleModal(false)
    setEditingRule(null)
    setNewRule({ title: '', description: '', points: 0, category: 'energy_reduction', active: true })
  }

  const handleEditRule = (rule: PointRule) => {
    setEditingRule(rule)
    setNewRule({
      title: rule.title,
      description: rule.description,
      points: rule.points,
      category: rule.category,
      active: rule.active
    })
    setShowRuleModal(true)
  }

  const handleDeleteRule = (ruleId: number) => {
    if (confirm('このポイントルールを削除してもよろしいですか？')) {
      setPointRules(prev => prev.filter(rule => rule.id !== ruleId))
    }
  }

  const getCategoryName = (category: string) => {
    const categories = {
      energy_reduction: 'エネルギー削減',
      upload: 'データアップロード', 
      activity: 'アクティビティ',
      bonus: 'ボーナス'
    }
    return categories[category as keyof typeof categories] || category
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      energy_reduction: 'bg-green-100 text-green-800',
      upload: 'bg-blue-100 text-blue-800',
      activity: 'bg-purple-100 text-purple-800', 
      bonus: 'bg-yellow-100 text-yellow-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getTransactionColor = (type: string, points: number) => {
    if (type === 'earned') return 'text-green-600'
    if (type === 'redeemed') return 'text-red-600'
    return 'text-blue-600'
  }

  const totalPointsIssued = transactions
    .filter(t => t.transaction_type === 'earned')
    .reduce((sum, t) => sum + t.points, 0)

  const totalPointsRedeemed = Math.abs(
    transactions
      .filter(t => t.transaction_type === 'redeemed')
      .reduce((sum, t) => sum + t.points, 0)
  )

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ポイント管理</h1>
            <p className="text-gray-600 mt-1">
              ポイントルールの設定と利用実績の管理
            </p>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総発行ポイント</p>
                  <p className="text-2xl font-bold text-green-600">{totalPointsIssued.toLocaleString()} pt</p>
                </div>
                <div className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          <div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総利用ポイント</p>
                  <p className="text-2xl font-bold text-red-600">{totalPointsRedeemed.toLocaleString()} pt</p>
                </div>
                <div className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>

          <div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">アクティブルール</p>
                  <p className="text-2xl font-bold text-blue-600">{pointRules.filter(r => r.active).length}</p>
                </div>
                <div className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          <div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">参加ユーザー数</p>
                  <p className="text-2xl font-bold text-purple-600">1,247</p>
                </div>
                <div className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* タブ */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rules'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ポイントルール
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              取引履歴
            </button>
          </nav>
        </div>

        {activeTab === 'rules' && (
          <div>
            <div>
              <div className="flex items-center justify-between">
                <div>ポイントルール一覧</div>
                <button
                  onClick={() => setShowRuleModal(true)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <div className="w-4 h-4" />
                  <span>新規作成</span>
                </button>
              </div>
            </div>
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">ルール名</th>
                      <th className="text-left py-3 px-4">カテゴリ</th>
                      <th className="text-left py-3 px-4">ポイント</th>
                      <th className="text-left py-3 px-4">ステータス</th>
                      <th className="text-left py-3 px-4">作成日</th>
                      <th className="text-left py-3 px-4">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pointRules.map((rule) => (
                      <tr key={rule.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{rule.title}</p>
                            <p className="text-sm text-gray-600">{rule.description}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(rule.category)}`}>
                            {getCategoryName(rule.category)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-green-600">{rule.points} pt</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            rule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {rule.active ? 'アクティブ' : '無効'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{rule.created_at}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditRule(rule)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <div className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRule(rule.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <div2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            <div>
              <div>取引履歴</div>
            </div>
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">ユーザー</th>
                      <th className="text-left py-3 px-4">ポイント</th>
                      <th className="text-left py-3 px-4">理由</th>
                      <th className="text-left py-3 px-4">種別</th>
                      <th className="text-left py-3 px-4">日時</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{transaction.user_name}</p>
                            <p className="text-sm text-gray-600">{transaction.user_email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-bold ${getTransactionColor(transaction.transaction_type, transaction.points)}`}>
                            {transaction.points > 0 ? '+' : ''}{transaction.points} pt
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{transaction.reason}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            transaction.transaction_type === 'earned' ? 'bg-green-100 text-green-800' :
                            transaction.transaction_type === 'redeemed' ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {transaction.transaction_type === 'earned' ? '獲得' :
                             transaction.transaction_type === 'redeemed' ? '利用' : '調整'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(transaction.created_at).toLocaleString('ja-JP')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ルール作成/編集モーダル */}
        {showRuleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingRule ? 'ルール編集' : '新規ルール作成'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ルール名</label>
                  <input
                    type="text"
                    value={newRule.title}
                    onChange={(e) => setNewRule({...newRule, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="例: ガス使用量削減10%以上"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                  <textarea
                    value={newRule.description}
                    onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    rows={3}
                    placeholder="ルールの詳細説明"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ポイント</label>
                  <input
                    type="number"
                    value={newRule.points}
                    onChange={(e) => setNewRule({...newRule, points: parseInt(e.target.value) || 0})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
                  <select
                    value={newRule.category}
                    onChange={(e) => setNewRule({...newRule, category: e.target.value as any})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="energy_reduction">エネルギー削減</option>
                    <option value="upload">データアップロード</option>
                    <option value="activity">アクティビティ</option>
                    <option value="bonus">ボーナス</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={newRule.active}
                    onChange={(e) => setNewRule({...newRule, active: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="active" className="text-sm font-medium text-gray-700">アクティブ</label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowRuleModal(false)
                    setEditingRule(null)
                    setNewRule({ title: '', description: '', points: 0, category: 'energy_reduction', active: true })
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSaveRule}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {editingRule ? '更新' : '作成'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}