'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import MobileNav from '@/components/mobile/MobileNav'
import { useProducts } from '@/hooks/useProducts'
import { usePoints } from '@/hooks/usePoints'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/types/product'

export default function Points() {
  const { products, isLoading: productsLoading } = useProducts()
  const { balance, history, isLoading: pointsLoading, redeem } = usePoints()
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const isLoading = productsLoading || pointsLoading
  
  const categories = [
    { id: 'all', name: 'All', jp: 'すべて' },
    { id: 'ギフトカード', name: 'Gift', jp: 'ギフトカード' },
    { id: '食品・飲料', name: 'Food', jp: '食品・飲料' },
    { id: '生活用品', name: 'Daily', jp: '生活用品' },
    { id: 'エンターテイメント', name: 'Entertainment', jp: 'エンタメ' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const totalEarned = history.filter(h => h.type === 'earn').reduce((sum, h) => sum + Math.abs(h.delta), 0)
  const totalSpent = history.filter(h => h.type === 'spend').reduce((sum, h) => sum + Math.abs(h.delta), 0)

  const handleRedeem = async (productId: number, requiredPoints: number) => {
    if (!balance || balance.current_balance < requiredPoints) {
      alert('ポイントが不足しています。')
      return
    }

    try {
      const product = products.find(p => p.id === productId)
      await redeem(productId)
      alert(`${product?.title}と交換しました！`)
    } catch (error) {
      console.error('Redemption failed:', error)
      alert('交換に失敗しました。もう一度お試しください。')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <MobileNav />
        <div className="container mx-auto px-4 py-4 sm:py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <MobileNav />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Tech0ポイントシステム</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="card bg-corporate text-white shadow-xl">
            <div className="card-body text-center">
              <Icon icon="ion:trophy" className="text-5xl mb-4" />
              <h2 className="card-title justify-center text-white text-2xl">現在のポイント</h2>
              <div className="text-4xl font-bold mb-2">{balance?.current_balance?.toLocaleString() || 0}</div>
              <p className="opacity-90">Tech0 Points</p>
            </div>
          </div>

          <div className="card bg-white shadow-xl">
            <div className="card-body text-center">
              <Icon icon="carbon:chart-line-smooth" className="text-4xl mb-4 text-green-600" />
              <h2 className="card-title justify-center">獲得ポイント</h2>
              <div className="text-3xl font-bold text-green-600">{totalEarned.toLocaleString()}</div>
              <p className="text-gray-600">累計獲得</p>
            </div>
          </div>

          <div className="card bg-white shadow-xl">
            <div className="card-body text-center">
              <Icon icon="carbon:gift" className="text-4xl mb-4 text-orange-600" />
              <h2 className="card-title justify-center">使用ポイント</h2>
              <div className="text-3xl font-bold text-orange-600">{totalSpent.toLocaleString()}</div>
              <p className="text-gray-600">累計使用</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="card bg-white shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6"><Icon icon="carbon:gift" className="inline mr-2" /> ポイント交換</h2>
              
              <div className="tabs tabs-boxed mb-6">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`tab ${selectedCategory === category.id ? 'tab-active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {product.category}
                            </Badge>
                            <span className="text-sm font-medium text-blue-600">
                              {product.points_required.toLocaleString()}pt
                            </span>
                            {product.stock <= 5 && (
                              <Badge variant="destructive" className="text-xs">
                                残り{product.stock}個
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <Button
                            size="sm"
                            onClick={() => handleRedeem(product.id, product.points_required)}
                            disabled={
                              !balance ||
                              balance.current_balance < product.points_required ||
                              product.stock <= 0
                            }
                            className="whitespace-nowrap"
                          >
                            交換する
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6"><Icon icon="ion:stats-chart" className="inline mr-2" /> ポイント履歴</h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.map(record => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon 
                        icon={record.type === 'earn' ? 'carbon:chart-line-smooth' : 'carbon:gift'} 
                        className={`text-2xl ${record.type === 'earn' ? 'text-green-600' : 'text-orange-600'}`} 
                      />
                      <div>
                        <div className="font-medium">{record.reason}</div>
                        <div className="text-sm text-gray-600">{new Date(record.created_at).toLocaleDateString('ja-JP')}</div>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${record.type === 'earn' ? 'text-green-600' : 'text-orange-600'}`}>
                      {record.type === 'earn' ? '+' : ''}{record.delta}pt
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-xl mt-8">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6"><Icon icon="carbon:idea" className="inline mr-2" /> ポイント獲得方法</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Icon icon="carbon:temperature" className="text-4xl mb-3" />
                <h3 className="font-bold mb-2">温度設定最適化</h3>
                <p className="text-sm text-gray-600">エアコンの温度を適切に設定</p>
                <div className="badge badge-success mt-2">10-50pt</div>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Icon icon="carbon:light" className="text-4xl mb-3" />
                <h3 className="font-bold mb-2">LED化推進</h3>
                <p className="text-sm text-gray-600">照明のLED化を実施</p>
                <div className="badge badge-warning mt-2">50-100pt</div>
              </div>

              <div className="text-center p-4 bg-corporate-50 rounded-lg">
                <Icon icon="carbon:education" className="text-4xl mb-3" />
                <h3 className="font-bold mb-2">研修受講</h3>
                <p className="text-sm text-gray-600">省エネ研修を受講</p>
                <div className="badge badge-info mt-2">50-100pt</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Icon icon="ion:flag" className="text-4xl mb-3" />
                <h3 className="font-bold mb-2">目標達成</h3>
                <p className="text-sm text-gray-600">月次削減目標を達成</p>
                <div className="badge badge-secondary mt-2">100-200pt</div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Icon icon="carbon:plug" className="text-4xl mb-3" />
                <h3 className="font-bold mb-2">待機電力削減</h3>
                <p className="text-sm text-gray-600">機器の待機電力を削減</p>
                <div className="badge badge-error mt-2">20-40pt</div>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Icon icon="carbon:upload" className="text-4xl mb-3" />
                <h3 className="font-bold mb-2">データアップロード</h3>
                <p className="text-sm text-gray-600">利用明細をアップロード</p>
                <div className="badge badge-accent mt-2">10-30pt</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}