'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Save, FileText, Trash2 } from 'lucide-react';
// import { reportsAPI, ReportFormData, ReportItem, formatTonnes } from '@/lib/reportingApi';

// Temporary mock types and functions for build
type ReportFormData = {
  name: string;
  period_start: string;
  period_end: string;
  methodology: string;
  notes: string;
  items: ReportItem[];
};

type ReportItem = {
  site_name: string;
  device_name: string;
  scope: string;
  amount_kg: number;
};

const formatTonnes = (kg: number) => (kg / 1000).toFixed(2);
const reportsAPI = {
  createReport: async (data: ReportFormData) => ({ id: '1', ...data })
};

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState<ReportFormData>({
    name: '',
    period_start: '',
    period_end: '',
    methodology: 'ghg_protocol',
    notes: '',
    items: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const report = await reportsAPI.createReport(formData);
      router.push(`/reports/${report.id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'レポートの作成に失敗しました');
    } finally {
      setLoading(false);
    }
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        site_name: '',
        device_name: '',
        scope: 'scope1',
        amount_kg: 0
      }]
    }));
  }

  const updateItem = (index: number, field: keyof ReportItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  }

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  }

  const calculateTotals = () => {
    const scope1 = formData.items.filter(item => item.scope === 'scope1').reduce((sum, item) => sum + Number(item.amount_kg), 0);
    const scope2 = formData.items.filter(item => item.scope === 'scope2').reduce((sum, item) => sum + Number(item.amount_kg), 0);
    const scope3 = formData.items.filter(item => item.scope === 'scope3').reduce((sum, item) => sum + Number(item.amount_kg), 0);
    const total = scope1 + scope2 + scope3;
    return { scope1, scope2, scope3, total }
  }

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center">
              <Link 
                href="/reports"
                className="mr-4 p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">新規レポート作成</h1>
                <p className="mt-1 text-sm text-gray-500">CO₂削減量レポートを作成します</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインフォーム */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基本情報 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">基本情報</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      レポート名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="例: FY2025上半期 CO₂削減実績"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      期間開始 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.period_start}
                      onChange={(e) => setFormData(prev => ({ ...prev, period_start: e.target.value }))}
                      required
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      期間終了 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.period_end}
                      onChange={(e) => setFormData(prev => ({ ...prev, period_end: e.target.value }))}
                      required
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">方法論</label>
                    <select
                      value={formData.methodology}
                      onChange={(e) => setFormData(prev => ({ ...prev, methodology: e.target.value as any }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="ghg_protocol">GHG Protocol</option>
                      <option value="internal">社内基準</option>
                      <option value="other">その他</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">備考</label>
                    <textarea
                      value={formData.notes || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="社内監査済み、第三者認証取得済み等"
                    />
                  </div>
                </div>
              </div>

              {/* 削減量明細 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray-900">削減量明細</h2>
                  <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-primary-700 bg-primary-100 hover:bg-primary-200"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    明細追加
                  </button>
                </div>

                {formData.items.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p>削減量明細を追加してください</p>
                    <button
                      type="button"
                      onClick={addItem}
                      className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-500"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      明細追加
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-200 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">サイト名</label>
                          <input
                            type="text"
                            value={item.site_name}
                            onChange={(e) => updateItem(index, 'site_name', e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="東京本社"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">設備名</label>
                          <input
                            type="text"
                            value={item.device_name}
                            onChange={(e) => updateItem(index, 'device_name', e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="太陽光発電"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
                          <select
                            value={item.scope}
                            onChange={(e) => updateItem(index, 'scope', e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          >
                            <option value="scope1">Scope1</option>
                            <option value="scope2">Scope2</option>
                            <option value="scope3">Scope3</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">削減量(kg)</label>
                          <input
                            type="number"
                            value={item.amount_kg}
                            onChange={(e) => updateItem(index, 'amount_kg', Number(e.target.value))}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* エラー表示 */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {/* 保存ボタン */}
              <div className="flex justify-end space-x-3">
                <Link
                  href="/reports"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  キャンセル
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? '保存中...' : '下書き保存'}
                </button>
              </div>
            </form>
          </div>

          {/* サマリーパネル */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">削減量サマリー</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-900">Scope1</span>
                  <span className="text-sm font-semibold text-blue-900">
                    {formatTonnes(totals.scope1)} t-CO₂
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-900">Scope2</span>
                  <span className="text-sm font-semibold text-green-900">
                    {formatTonnes(totals.scope2)} t-CO₂
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-900">Scope3</span>
                  <span className="text-sm font-semibold text-purple-900">
                    {formatTonnes(totals.scope3)} t-CO₂
                  </span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center p-4 bg-gray-900 text-white rounded-lg">
                    <span className="font-medium">合計削減量</span>
                    <span className="text-lg font-bold">
                      {formatTonnes(totals.total)} t-CO₂
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

