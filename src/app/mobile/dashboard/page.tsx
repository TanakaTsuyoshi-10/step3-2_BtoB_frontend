'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MobileNav from '@/components/mobile/MobileNav'

interface KPIData {
  totalKWh: number
  totalGasM3: number
  co2Reduction: number
  currentPoints: number
  monthlyTarget: number
  recentActivity: Activity[]
}

interface Activity {
  id: number
  date: string
  type: string
  description: string
  points: number
}

export default function MobileDashboard() {
  const [kpiData, setKpiData] = useState<KPIData>({
    totalKWh: 245,
    totalGasM3: 432,
    co2Reduction: 180,
    currentPoints: 850,
    monthlyTarget: 1000,
    recentActivity: [
      { id: 1, date: '2025-01-13', type: 'upload', description: 'ガス明細書をアップロード', points: 30 },
      { id: 2, date: '2025-01-12', type: 'survey', description: '省エネアンケートに回答', points: 15 },
      { id: 3, date: '2025-01-11', type: 'achievement', description: '週間削減目標達成', points: 50 },
    ]
  })

  const progressPercentage = (kpiData.currentPoints / kpiData.monthlyTarget) * 100

  return (
    <div className="min-h-screen bg-white pt-16">
      <MobileNav />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">ダッシュボード</h1>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 font-medium">ガス使用量</div>
            <div className="text-2xl font-bold text-blue-900">{kpiData.totalGasM3} m³</div>
            <div className="text-xs text-blue-700">今月合計</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-green-600 font-medium">電力使用量</div>
            <div className="text-2xl font-bold text-green-900">{kpiData.totalKWh} kWh</div>
            <div className="text-xs text-green-700">今月合計</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 col-span-2">
            <div className="text-sm text-purple-600 font-medium">CO₂削減量</div>
            <div className="text-2xl font-bold text-purple-900">{kpiData.co2Reduction} kg</div>
            <div className="text-xs text-purple-700">累計削減量</div>
          </div>
        </div>

        {/* Points Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-orange-600 font-medium">Tech0ポイント</div>
            <div className="text-xl font-bold text-orange-900">{kpiData.currentPoints}pt</div>
          </div>
          <div className="w-full bg-orange-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-orange-700 mt-1">
            月間目標まで {kpiData.monthlyTarget - kpiData.currentPoints}pt
          </div>
        </div>

        {/* AI Comment */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div className="text-sm font-medium text-gray-700">今月の分析コメント</div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            今月は前月比で8.5%の使用量削減を達成されています。特にガス使用量の削減が顕著で、暖房設定の工夫が効果的でした。
            継続的な省エネ活動で年間目標の達成が期待できます。
          </p>
        </div>

        {/* Usage Chart Placeholder */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">月次使用量推移</h3>
          <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-500 text-sm">グラフ表示エリア</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">最近のアクティビティ</h3>
          <div className="space-y-3">
            {kpiData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.description}</div>
                  <div className="text-xs text-gray-500">{activity.date}</div>
                </div>
                <div className="text-sm font-bold text-green-600">+{activity.points}pt</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Link href="/mobile/upload" className="bg-primary-500 text-white rounded-lg p-4 text-center hover:bg-primary-600 transition-colors">
            <div className="font-medium">明細書アップロード</div>
          </Link>
          <Link href="/mobile/ranking" className="bg-green-500 text-white rounded-lg p-4 text-center hover:bg-green-600 transition-colors">
            <div className="font-medium">ランキング確認</div>
          </Link>
        </div>
      </div>
    </div>
  )
}