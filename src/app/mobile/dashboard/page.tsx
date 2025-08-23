'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MobileNav from '@/components/mobile/MobileNav'
import { Icon } from '@iconify/react'
import { energyAPI, pointsAPI } from '@/lib/api/mobile'

export default function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [usageData, setUsageData] = useState({
    gas: { amount: 245, cost: 12450, unit: 'm³' },
    electricity: { amount: 432, cost: 15680, unit: 'kWh' }
  })
  const [points, setPoints] = useState(1250)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadEnergyData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const monthlyData = await energyAPI.getMonthlyUsage(currentYear, currentMonth + 1)
      const pointsData = await pointsAPI.getBalance()
      
      setUsageData(monthlyData.usage || usageData)
      setPoints(pointsData.balance || points)
    } catch (error) {
      console.warn('API not available, using mock data:', error)
      setError('APIに接続できません。サンプルデータを表示しています。')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEnergyData()
  }, [currentMonth, currentYear])

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  const changeMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const totalCost = usageData.gas.cost + usageData.electricity.cost

  return (
    <div className="min-h-screen bg-white pt-16">
      <MobileNav />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">エネルギー利用状況</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white flex items-center justify-center font-medium transition-colors"
              onClick={() => changeMonth('prev')}
            >
              ❮
            </button>
            <div className="text-lg sm:text-xl font-bold text-center min-w-[100px] sm:min-w-[120px]">
              {currentYear}年{monthNames[currentMonth]}
            </div>
            <button 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white flex items-center justify-center font-medium transition-colors"
              onClick={() => changeMonth('next')}
            >
              ❯
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">月次利用料金・利用量</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-end text-gray-600">
                      <Icon icon="carbon:fire" className="inline-block w-8 h-8" />
                    </div>
                    <div className="text-sm text-gray-600">ガス使用量</div>
                    <div className="text-2xl font-bold text-gray-800">{usageData.gas.amount}</div>
                    <div className="text-sm text-gray-500">{usageData.gas.unit}</div>
                    <div className="text-lg font-bold mt-2">¥{usageData.gas.cost.toLocaleString()}</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-end text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div className="text-sm text-gray-600">電力使用量</div>
                    <div className="text-2xl font-bold text-gray-800">{usageData.electricity.amount}</div>
                    <div className="text-sm text-gray-500">{usageData.electricity.unit}</div>
                    <div className="text-lg font-bold mt-2">¥{usageData.electricity.cost.toLocaleString()}</div>
                  </div>
                </div>

                <div className="border-t border-gray-300 my-6"></div>

                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-gray-800">
                    合計: ¥{totalCost.toLocaleString()}
                  </div>
                  <div className="border border-corporate text-corporate inline-flex items-center px-3 py-2 rounded font-medium">
                    前年比 -8.5%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-lg bg-white border border-corporate shadow-lg">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-corporate-100 rounded-lg">
                      <Icon icon="ion:trophy" className="text-xl text-corporate" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Tech0ポイント</h2>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-3xl sm:text-4xl font-bold text-corporate mb-1">{points.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">今月獲得: <span className="font-medium text-corporate">+180pt</span></div>
                </div>
                <Link href="/mobile/points" className="px-3 py-1 text-sm rounded font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white w-full text-center block">
                  詳細を見る
                </Link>
              </div>
            </div>

            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-bold">
                  <Icon icon="carbon:watson-machine-learning" className="text-lg mr-2" />
                  AI分析コメント
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="bg-gray-50 p-3 rounded-lg border-l-4 border-corporate">
                    「今月のガス使用量は前月比で8.5%削減されています。暖房設定温度の適正化が効果的でした。」
                  </p>
                  <p className="bg-gray-50 p-3 rounded-lg border-l-4 border-corporate">
                    「電力使用量も順調に削減中。照明のLED化による効果が現れています。」
                  </p>
                </div>
                <div className="flex gap-2 pt-4 justify-end mt-4">
                  <Link href="/mobile/ai-analysis" className="px-3 py-1 text-sm rounded font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white">詳細分析</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-lg bg-white shadow-lg">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold">
                <Icon icon="ion:stats-chart" className="text-lg mr-2" />
                使用量推移グラフ
              </h3>
              <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm sm:text-base text-center">グラフコンポーネント<br className="sm:hidden" />（Chart.js等で実装予定）</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white shadow-lg">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold">
                <Icon icon="ion:flag" className="text-lg mr-2" />
                今月の削減目標
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>ガス使用量削減</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary-600 h-2 rounded-full" style={{width: '85%'}}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>電力使用量削減</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary-600 h-2 rounded-full" style={{width: '92%'}}></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}