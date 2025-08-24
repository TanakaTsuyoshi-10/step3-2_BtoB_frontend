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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 relative overflow-hidden">
      <MobileNav />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-6 w-16 h-16 bg-primary-200/20 rounded-full animate-float"></div>
        <div className="absolute top-60 right-8 w-12 h-12 bg-green-200/30 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-80 left-12 w-20 h-20 bg-blue-200/20 rounded-full animate-float" style={{animationDelay: '5s'}}></div>
        <div className="absolute bottom-40 right-6 w-14 h-14 bg-purple-200/25 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-none mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-6 pt-20">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-green-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
            ダッシュボード
          </h1>
          <div className="mt-2 h-1 w-16 mx-auto bg-gradient-to-r from-primary-400 to-green-400 rounded-full"></div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="bg-white/70 backdrop-blur-lg border border-blue-200/50 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-sm text-blue-600 font-semibold">ガス使用量</div>
            <div className="text-2xl font-bold text-blue-900 mt-1">{kpiData.totalGasM3} m³</div>
            <div className="text-xs text-blue-700 mt-2">今月合計</div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-lg border border-green-200/50 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-sm text-green-600 font-semibold">電力使用量</div>
            <div className="text-2xl font-bold text-green-900 mt-1">{kpiData.totalKWh} kWh</div>
            <div className="text-xs text-green-700 mt-2">今月合計</div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-lg border border-purple-200/50 rounded-xl p-5 md:col-span-2 lg:col-span-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-sm text-purple-600 font-semibold">CO₂削減量</div>
            <div className="text-2xl font-bold text-purple-900 mt-1">{kpiData.co2Reduction} kg</div>
            <div className="text-xs text-purple-700 mt-2">累計削減量</div>
          </div>
        </div>

        {/* Points Section */}
        <div className="bg-white/70 backdrop-blur-lg border border-orange-200/50 rounded-xl p-6 mb-8 shadow-lg animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-orange-600 font-semibold">Tech0ポイント</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">{kpiData.currentPoints}pt</div>
          </div>
          <div className="w-full bg-orange-100 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-orange-400 to-yellow-400 h-3 rounded-full transition-all duration-500 shadow-sm" 
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-orange-700 mt-3 text-center font-medium">
            月間目標まで {kpiData.monthlyTarget - kpiData.currentPoints}pt
          </div>
        </div>

        {/* AI Comment */}
        <div className="bg-white/70 backdrop-blur-lg border border-blue-200/50 rounded-xl p-5 mb-8 shadow-lg animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div className="text-sm font-semibold text-gray-700">今月の分析コメント</div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            今月は前月比で8.5%の使用量削減を達成されています。特にガス使用量の削減が顕著で、暖房設定の工夫が効果的でした。
            継続的な省エネ活動で年間目標の達成が期待できます。
          </p>
        </div>

        {/* Usage Chart Placeholder */}
        <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl p-6 mb-8 shadow-lg animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <h3 className="text-lg font-semibold text-gray-800 mb-6">月次使用量推移</h3>
          <div className="h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center shadow-inner border border-gray-200/50">
            <span className="text-gray-500 text-sm font-medium">グラフ表示エリア</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl p-6 shadow-lg animate-fade-in-up" style={{animationDelay: '1s'}}>
          <h3 className="text-lg font-semibold text-gray-800 mb-6">最近のアクティビティ</h3>
          <div className="space-y-4">
            {kpiData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 px-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100/50 hover:bg-white/70 transition-all duration-300 hover:shadow-md">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{activity.description}</div>
                  <div className="text-xs text-gray-600 mt-1">{activity.date}</div>
                </div>
                <div className="text-sm font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent px-3 py-1 bg-green-50 rounded-full">+{activity.points}pt</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-8 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
          <Link href="/mobile/upload" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl p-6 text-center hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
            <div className="font-semibold text-lg">明細書アップロード</div>
          </Link>
          <Link href="/mobile/ranking" className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 text-center hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
            <div className="font-semibold text-lg">ランキング確認</div>
          </Link>
        </div>
      </div>
    </div>
  )
}