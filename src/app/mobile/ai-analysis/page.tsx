'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import MobileNav from '@/components/mobile/MobileNav'

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
        category: '暖房・冷房',
        title: 'エアコン設定温度の調整',
        description: '冬は20℃、夏は28℃に設定することで、月間約10%のエネルギー削減が期待できます。',
        impact: 'high',
        points: 0,
        difficulty: 'easy',
        icon: 'temperature'
      },
      {
        id: 2,
        category: '照明',
        title: '照明の使い分け',
        description: '必要な部屋のみ点灯し、自然光を活用することで照明コストを30%削減できます。',
        impact: 'high',
        points: 0,
        difficulty: 'easy',
        icon: 'idea'
      },
      {
        id: 3,
        category: '電力',
        title: '家電製品の待機電力カット',
        description: 'テレビ、パソコン等の待機電力をこまめに切ることで、月間約5%の電力削減が可能です。',
        impact: 'medium',
        points: 0,
        difficulty: 'easy',
        icon: 'electricity'
      },
      {
        id: 4,
        category: '給湯',
        title: 'お風呂の節約習慣',
        description: 'シャワー時間の短縮や浴槽のお湯の量を調整することで、ガス代を15%削減できます。',
        impact: 'medium',
        points: 0,
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
    alert(`「${recommendation.title}」を実行リストに追加しました！家庭でできる省エネ取り組みを始めましょう。`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 relative overflow-hidden">
      <MobileNav />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-8 w-16 h-16 bg-primary-200/20 rounded-full animate-float"></div>
        <div className="absolute top-60 right-6 w-12 h-12 bg-green-200/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-6 w-20 h-20 bg-blue-200/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-60 right-8 w-14 h-14 bg-purple-200/25 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>


      <div className="relative max-w-none mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-6 pt-20">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-green-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
            AI分析・コメント
          </h1>
          <div className="mt-2 h-1 w-20 mx-auto bg-gradient-to-r from-primary-400 to-green-400 rounded-full"></div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="bg-white/70 backdrop-blur-lg border border-blue-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-sm w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Icon icon="carbon:analytics" className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">総合スコア</h2>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-1">
              {analysisData.overall.score}
            </div>
            <p className="text-sm text-gray-600">エネルギー効率</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-green-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
            <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl shadow-sm w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Icon icon="carbon:chart-line" className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">予測削減率</h3>
            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-2">
              {analysisData.predictions.next_month_reduction}%
            </div>
            <p className="text-sm text-gray-600 mb-3">来月予測</p>
            <div className="border-t pt-3">
              <div className="text-xs text-gray-600">年間削減見込み</div>
              <div className="font-bold text-gray-700">{analysisData.predictions.co2_reduction}kg CO2</div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg border border-yellow-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
            <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl shadow-sm w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Icon icon="carbon:currency-yen" className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">予測節約額</h3>
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent mb-2">
              ¥{analysisData.predictions.annual_savings.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mb-3">年間節約予測</p>
            <div className="border-t pt-3">
              <div className="text-xs text-gray-600">月平均</div>
              <div className="font-bold text-gray-700">¥{Math.round(analysisData.predictions.annual_savings / 12).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl shadow-sm">
                  <Icon icon="carbon:idea" className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600" />
                </div>
                AI改善提案
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {analysisData.recommendations.map((rec) => (
                  <div key={rec.id} className="bg-white/50 backdrop-blur-sm border border-gray-100/50 rounded-xl p-5 lg:p-6 hover:bg-white/70 transition-all duration-300 hover:shadow-md hover:scale-105">
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
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)}`}>
                        {rec.difficulty === 'easy' ? '簡単' : rec.difficulty === 'medium' ? '普通' : '困難'}
                      </div>
                      <button 
                        className="px-4 py-2 text-sm rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
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

          <div className="xl:col-span-1 space-y-6">
            <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                  <div className="p-2 bg-gradient-to-r from-teal-100 to-teal-200 rounded-xl shadow-sm">
                    <Icon icon="carbon:analytics" className="w-5 h-5 text-teal-600" />
                  </div>
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

            <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
                  <div className="p-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl shadow-sm">
                    <Icon icon="carbon:flag" className="w-5 h-5 text-orange-600" />
                  </div>
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

        <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
              <div className="p-2 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl shadow-sm">
                <Icon icon="carbon:chat" className="w-6 h-6 text-indigo-600" />
              </div>
              AIコメント履歴
            </h2>
            
            <div className="space-y-4">
              {aiComments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-gradient-to-b from-primary-400 to-green-400 pl-4 py-3 bg-gradient-to-r from-primary-50/50 to-green-50/50 rounded-r-xl backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg shadow-sm">
                        <Icon icon={getSentimentIcon(comment.sentiment)} className="w-5 h-5 text-primary-600" />
                      </div>
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
              <button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                過去のコメントをもっと見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}