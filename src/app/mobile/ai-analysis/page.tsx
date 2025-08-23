'use client'

import { useState } from 'react'
import MobileNav from '@/components/mobile/MobileNav'
import { Icon } from '@iconify/react'

interface AnalysisData {
  overall: {
    score: number
    trend: string
    summary: string
  }
  recommendations: Recommendation[]
  patterns: {
    peak_usage: string
    low_usage: string
    weekly_pattern: string
    seasonal_trend: string
  }
  predictions: {
    next_month_reduction: number
    annual_savings: number
    co2_reduction: number
  }
}

interface Recommendation {
  id: number
  category: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
  icon: string
}

interface AIComment {
  id: number
  date: string
  category: string
  comment: string
  sentiment: 'positive' | 'neutral' | 'negative'
  actionable: boolean
}

export default function AIAnalysis() {
  const [analysisData] = useState<AnalysisData>({
    overall: {
      score: 85,
      trend: 'improving',
      summary: 'あなたのエネルギー使用パターンは優秀です。継続的な改善が見られています。'
    },
    recommendations: [
      {
        id: 1,
        category: 'ガス',
        title: '暖房設定温度の最適化',
        description: 'エアコンの設定温度を1度下げることで、月間約8%のガス使用量削減が期待できます。',
        impact: 'high',
        points: 50,
        difficulty: 'easy',
        icon: 'temperature'
      },
      {
        id: 2,
        category: '電力',
        title: 'LED照明への完全移行',
        description: '残りの蛍光灯をLEDに交換することで、照明コストを40%削減できます。',
        impact: 'high',
        points: 100,
        difficulty: 'medium',
        icon: 'idea'
      },
      {
        id: 3,
        category: '電力',
        title: '待機電力の削減',
        description: 'OA機器の待機電力を削減することで、月間約3%の電力削減が可能です。',
        impact: 'medium',
        points: 30,
        difficulty: 'easy',
        icon: 'electricity'
      },
      {
        id: 4,
        category: '水道',
        title: '節水器具の導入',
        description: '節水シャワーヘッドの導入で水道使用量を15%削減できます。',
        impact: 'medium',
        points: 40,
        difficulty: 'easy',
        icon: 'water'
      }
    ],
    patterns: {
      peak_usage: '14:00-16:00',
      low_usage: '22:00-06:00',
      weekly_pattern: 'weekdays_high',
      seasonal_trend: 'winter_peak'
    },
    predictions: {
      next_month_reduction: 12.5,
      annual_savings: 45600,
      co2_reduction: 280
    }
  })

  const [aiComments] = useState<AIComment[]>([
    {
      id: 1,
      date: '2025-01-13',
      category: '全体分析',
      comment: '今月は前月比で全体的で8.5%の使用量削減を達成されています。特にガス使用量の削減が顕著で、暖房設定の工夫が効果的でした。',
      sentiment: 'positive',
      actionable: true
    },
    {
      id: 2,
      date: '2025-01-12',
      category: '使用パターン',
      comment: '平日14-16時に電力使用量のピークが見られます。この時間帯の機器使用を見直すことで、さらなる削減が期待できます。',
      sentiment: 'neutral',
      actionable: true
    },
    {
      id: 3,
      date: '2025-01-11',
      category: '比較分析',
      comment: '同規模企業と比較して、あなたの削減率は上位20%に位置しています。継続的な取り組みが実を結んでいます。',
      sentiment: 'positive',
      actionable: false
    },
    {
      id: 4,
      date: '2025-01-10',
      category: '予測分析',
      comment: '現在のペースを維持すれば、年間目標の15%削減を3月までに達成できる見込みです。',
      sentiment: 'positive',
      actionable: false
    }
  ])

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSentimentIcon = (sentiment: string): string => {
    switch (sentiment) {
      case 'positive': return 'carbon:checkmark-filled'
      case 'neutral': return 'carbon:information'
      case 'negative': return 'carbon:warning'
      default: return 'carbon:watson-machine-learning'
    }
  }

  const implementRecommendation = (recommendation: Recommendation) => {
    alert(`「${recommendation.title}」を実行リストに追加しました！実行後は${recommendation.points}ポイントを獲得できます。`)
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <MobileNav />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
          <Icon icon="carbon:watson-machine-learning" className="text-4xl text-corporate" />
          AI分析・コメント
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div className="rounded-lg bg-corporate text-white shadow-lg">
            <div className="p-6 text-center">
              <div className="mb-4">
                <Icon icon="carbon:analytics" className="text-6xl text-white" />
              </div>
              <h2 className="text-xl font-bold justify-center text-white">総合スコア</h2>
              <div className="text-4xl font-bold">{analysisData.overall.score}</div>
              <p className="opacity-90">エネルギー効率</p>
            </div>
          </div>

          <div className="rounded-lg bg-white shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Icon icon="carbon:trending-up" className="text-xl" />
                予測削減率
              </h3>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {analysisData.predictions.next_month_reduction}%
              </div>
              <p className="text-sm text-gray-600">来月予測</p>
              <div className="mt-3">
                <div className="text-sm text-gray-600">年間削減見込み</div>
                <div className="font-bold">{analysisData.predictions.co2_reduction}kg CO2</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Icon icon="carbon:currency-yen" className="text-xl" />
                予測節約額
              </h3>
              <div className="text-3xl font-bold text-corporate mb-2">
                ¥{analysisData.predictions.annual_savings.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">年間節約予測</p>
              <div className="mt-3">
                <div className="text-sm text-gray-600">月平均</div>
                <div className="font-bold">¥{Math.round(analysisData.predictions.annual_savings / 12).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-lg bg-white shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Icon icon="carbon:idea" className="text-2xl text-corporate" />
                AI改善提案
              </h2>
              
              <div className="space-y-4">
                {analysisData.recommendations.map((rec) => (
                  <div key={rec.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <Icon icon={
                            rec.icon === 'temperature' ? 'carbon:temperature' :
                            rec.icon === 'idea' ? 'carbon:idea' :
                            rec.icon === 'electricity' ? 'carbon:electricity' :
                            rec.icon === 'water' ? 'carbon:drop' :
                            'carbon:settings'
                          } className="text-4xl text-corporate" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{rec.title}</h3>
                          <div className="border border-primary-600 text-primary-600 px-2 py-1 rounded text-xs font-medium">{rec.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(rec.impact)}`}>
                          {rec.impact === 'high' ? '高効果' : rec.impact === 'medium' ? '中効果' : '低効果'}
                        </div>
                        <div className="text-sm text-green-600 font-bold mt-1">+{rec.points}pt</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                        {rec.difficulty === 'easy' ? '簡単' : rec.difficulty === 'medium' ? '普通' : '困難'}
                      </div>
                      <button 
                        className="px-3 py-1 text-sm rounded font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white"
                        onClick={() => implementRecommendation(rec)}
                      >
                        実行する
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon icon="carbon:analytics" className="text-xl" />
                  使用パターン分析
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">ピーク使用時間</span>
                    <span className="bg-yellow-100 text-yellow-800 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">{analysisData.patterns.peak_usage}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">低使用時間</span>
                    <span className="bg-green-100 text-green-800 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">{analysisData.patterns.low_usage}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">週間パターン</span>
                    <span className="bg-blue-100 text-blue-800 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">平日多め</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">季節傾向</span>
                    <span className="bg-gray-100 text-gray-800 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">冬季ピーク</span>
                  </div>
                </div>

                <div className="border-t border-gray-300 my-4"></div>

                <div className="text-center">
                  <div className="text-lg font-bold text-gray-800 mb-2">使用効率</div>
                  <div className="radial-progress text-primary" style={{"--value": analysisData.overall.score} as React.CSSProperties} role="progressbar">
                    {analysisData.overall.score}%
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon icon="carbon:flag" className="text-xl" />
                  改善目標
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>月間削減率</span>
                      <span>12.5% / 15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-600 h-2 rounded-full" style={{width: '83%'}}></div></div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>年間CO2削減</span>
                      <span>280kg / 400kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div></div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>節約額目標</span>
                      <span>¥45,600 / ¥60,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-yellow-600 h-2 rounded-full" style={{width: '76%'}}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white shadow-lg mt-6 sm:mt-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon icon="carbon:chat" className="text-2xl text-corporate" />
              AIコメント履歴
            </h2>
            
            <div className="space-y-4">
              {aiComments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-corporate pl-4 py-3 bg-corporate-50 rounded-r-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon icon={getSentimentIcon(comment.sentiment)} className="text-2xl text-corporate" />
                      <div>
                        <div className="font-bold">{comment.category}</div>
                        <div className="text-sm text-gray-600">{comment.date}</div>
                      </div>
                    </div>
                    {comment.actionable && (
                      <div className="bg-orange-100 text-orange-800 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">実行可能</div>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-4 py-2 rounded font-medium transition-colors">
                過去のコメントをもっと見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}