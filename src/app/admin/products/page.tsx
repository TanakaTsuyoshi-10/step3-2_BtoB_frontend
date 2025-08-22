'use client';

import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, Eye, EyeOff, TrendingUp, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  points_required: number;
  stock: number;
  active: boolean;
  created_at: string;
  redeemed_count: number;
  popularity_score: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Amazonギフトカード 500円分',
      description: 'Amazon.co.jpで使えるギフトカードです。有効期限は発行から10年間です。',
      category: 'ギフトカード',
      points_required: 500,
      stock: 20,
      active: true,
      created_at: '2025-01-01',
      redeemed_count: 45,
      popularity_score: 8.9
    },
    {
      id: 2,
      name: 'スターバックス ドリンクチケット',
      description: '全国のスターバックス店舗で使えるドリンクチケット（Tallサイズまで）',
      category: '商品',
      points_required: 400,
      stock: 15,
      active: true,
      created_at: '2025-01-01',
      redeemed_count: 32,
      popularity_score: 7.8
    },
    {
      id: 3,
      name: '社内カフェ利用券',
      description: '社内カフェで使える500円分の利用券です。',
      category: '社内サービス',
      points_required: 300,
      stock: 50,
      active: true,
      created_at: '2025-01-01',
      redeemed_count: 78,
      popularity_score: 9.2
    },
    {
      id: 4,
      name: 'QUOカード 1000円分',
      description: '全国の加盟店で使えるQUOカードです。',
      category: 'ギフトカード',
      points_required: 1000,
      stock: 10,
      active: false,
      created_at: '2025-01-01',
      redeemed_count: 12,
      popularity_score: 6.5
    }
  ])

  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    points_required: 0,
    stock: 0,
    active: true
  })

  const [filter, setFilter] = useState({
    category: '',
    status: 'all' // all, active, inactive
  })

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id 
          ? { 
              ...product, 
              ...newProduct,
              redeemed_count: product.redeemed_count,
              popularity_score: product.popularity_score,
              created_at: product.created_at
            }
          : product
      ))
    } else {
      const newId = Math.max(...products.map(p => p.id)) + 1
      setProducts(prev => [...prev, {
        id: newId,
        ...newProduct,
        created_at: new Date().toISOString().split('T')[0],
        redeemed_count: 0,
        popularity_score: 0
      }])
    }
    setShowProductModal(false)
    setEditingProduct(null)
    setNewProduct({ name: '', description: '', category: '', points_required: 0, stock: 0, active: true })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      description: product.description,
      category: product.category,
      points_required: product.points_required,
      stock: product.stock,
      active: product.active
    })
    setShowProductModal(true)
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm('この商品を削除してもよろしいですか？')) {
      setProducts(prev => prev.filter(product => product.id !== productId))
    }
  }

  const handleToggleActive = (productId: number) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, active: !product.active }
        : product
    ))
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = !filter.category || product.category === filter.category
    const matchesStatus = filter.status === 'all' || 
      (filter.status === 'active' && product.active) ||
      (filter.status === 'inactive' && !product.active)
    
    return matchesCategory && matchesStatus
  })

  const categories = Array.from(new Set(products.map(p => p.category)))
  const totalProducts = products.length
  const activeProducts = products.filter(p => p.active).length
  const totalRedemptions = products.reduce((sum, p) => sum + p.redeemed_count, 0)
  const avgPopularity = products.reduce((sum, p) => sum + p.popularity_score, 0) / products.length || 0

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'bg-red-100 text-red-800'
    if (stock < 10) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const getPopularityColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">商品管理</h1>
            <p className="text-gray-600 mt-1">
              交換商品の管理と人気度分析
            </p>
          </div>
          <button
            onClick={() => setShowProductModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>新規商品</span>
          </button>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総商品数</p>
                  <p className="text-2xl font-bold text-blue-600">{totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">アクティブ商品</p>
                  <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総交換回数</p>
                  <p className="text-2xl font-bold text-purple-600">{totalRedemptions}</p>
                </div>
                <Users className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">平均人気度</p>
                  <p className="text-2xl font-bold text-orange-600">{avgPopularity.toFixed(1)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* フィルター */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">カテゴリ:</label>
                <select
                  value={filter.category}
                  onChange={(e) => setFilter({...filter, category: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="">すべて</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">ステータス:</label>
                <select
                  value={filter.status}
                  onChange={(e) => setFilter({...filter, status: e.target.value})}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">すべて</option>
                  <option value="active">アクティブ</option>
                  <option value="inactive">非アクティブ</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 商品一覧 */}
        <Card>
          <CardHeader>
            <CardTitle>商品一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">商品名</th>
                    <th className="text-left py-3 px-4">カテゴリ</th>
                    <th className="text-left py-3 px-4">ポイント</th>
                    <th className="text-left py-3 px-4">在庫</th>
                    <th className="text-left py-3 px-4">交換回数</th>
                    <th className="text-left py-3 px-4">人気度</th>
                    <th className="text-left py-3 px-4">ステータス</th>
                    <th className="text-left py-3 px-4">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">{product.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-green-600">{product.points_required} pt</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStockStatusColor(product.stock)}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium">{product.redeemed_count}</td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${getPopularityColor(product.popularity_score)}`}>
                          {product.popularity_score.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleActive(product.id)}
                          className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
                            product.active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {product.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{product.active ? 'アクティブ' : '非アクティブ'}</span>
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 商品作成/編集モーダル */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingProduct ? '商品編集' : '新規商品作成'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">商品名 *</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="商品の名前を入力"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    rows={3}
                    placeholder="商品の詳細説明"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ *</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="">選択してください</option>
                      <option value="ギフトカード">ギフトカード</option>
                      <option value="商品">商品</option>
                      <option value="社内サービス">社内サービス</option>
                      <option value="寄付">寄付</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">必要ポイント *</label>
                    <input
                      type="number"
                      value={newProduct.points_required}
                      onChange={(e) => setNewProduct({...newProduct, points_required: parseInt(e.target.value) || 0})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      min="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">在庫数 *</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    min="0"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active"
                    checked={newProduct.active}
                    onChange={(e) => setNewProduct({...newProduct, active: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="active" className="text-sm font-medium text-gray-700">アクティブ（公開状態）</label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowProductModal(false)
                    setEditingProduct(null)
                    setNewProduct({ name: '', description: '', category: '', points_required: 0, stock: 0, active: true })
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleSaveProduct}
                  disabled={!newProduct.name || !newProduct.category || newProduct.points_required <= 0}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {editingProduct ? '更新' : '作成'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}