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
  Eye, 
  Package, 
  Tag,
  TrendingUp,
  ShoppingCart,
  Users,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Image
} from 'lucide-react';

export default function ProductsManagementPage() {
  const [selectedTab, setSelectedTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');

  // モックデータ
  const products = [
    {
      id: 1,
      name: 'Amazonギフトカード 1,000円',
      category: 'ギフトカード',
      points_required: 1000,
      stock: 50,
      description: 'Amazon.co.jpで使える1,000円分のギフトカード',
      image_url: '/images/amazon-gift.jpg',
      active: true,
      popularity: 85,
      exchanges_this_month: 25,
      created_at: '2025-01-15'
    },
    {
      id: 2,
      name: 'スターバックス ドリンクチケット',
      category: '商品',
      points_required: 500,
      stock: 30,
      description: 'スターバックスで使えるドリンクチケット（700円相当）',
      image_url: '/images/starbucks-ticket.jpg',
      active: true,
      popularity: 92,
      exchanges_this_month: 18,
      created_at: '2025-01-12'
    },
    {
      id: 3,
      name: '社内カフェ無料券',
      category: '社内サービス',
      points_required: 200,
      stock: 100,
      description: '社内カフェで使える無料券（500円相当）',
      image_url: '/images/cafe-ticket.jpg',
      active: true,
      popularity: 76,
      exchanges_this_month: 42,
      created_at: '2025-01-10'
    },
    {
      id: 4,
      name: '環境保護団体への寄付',
      category: '寄付',
      points_required: 300,
      stock: 999,
      description: '環境保護団体への300円寄付',
      image_url: '/images/donation.jpg',
      active: true,
      popularity: 68,
      exchanges_this_month: 15,
      created_at: '2025-01-08'
    },
    {
      id: 5,
      name: 'エコバッグ',
      category: '商品',
      points_required: 800,
      stock: 0,
      description: 'オリジナルエコバッグ（在庫切れ）',
      image_url: '/images/eco-bag.jpg',
      active: false,
      popularity: 45,
      exchanges_this_month: 0,
      created_at: '2025-01-05'
    }
  ];

  const exchanges = [
    {
      id: 1,
      user_name: '田中太郎',
      department: '営業部',
      product_name: 'Amazonギフトカード 1,000円',
      points_used: 1000,
      status: 'approved',
      date: '2025-01-20',
      delivery_info: 'メールで配送済み'
    },
    {
      id: 2,
      user_name: '佐藤花子',
      department: '開発部',
      product_name: 'スターバックス ドリンクチケット',
      points_used: 500,
      status: 'pending',
      date: '2025-01-19',
      delivery_info: '承認待ち'
    },
    {
      id: 3,
      user_name: '鈴木次郎',
      department: '営業部',
      product_name: '社内カフェ無料券',
      points_used: 200,
      status: 'shipped',
      date: '2025-01-18',
      delivery_info: '社内便で配送済み'
    }
  ];

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active).length,
    totalExchanges: 103,
    avgPointsPerExchange: 650
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: '申請中', class: 'bg-yellow-100 text-yellow-800' },
      approved: { label: '承認済み', class: 'bg-green-100 text-green-800' },
      rejected: { label: '却下', class: 'bg-red-100 text-red-800' },
      shipped: { label: '発送済み', class: 'bg-blue-100 text-blue-800' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.class}`}>
        {config.label}
      </span>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">商品管理</h1>
            <p className="text-gray-600 mt-1">交換可能な商品・景品の管理と交換申請の処理</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>CSVエクスポート</span>
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>新規商品追加</span>
            </button>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">登録商品数</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">有効商品数</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeProducts}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">今月の交換数</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalExchanges}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">平均交換ポイント</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgPointsPerExchange}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setSelectedTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'products'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                商品一覧
              </button>
              <button
                onClick={() => setSelectedTab('exchanges')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'exchanges'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                交換申請
              </button>
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'products' && (
              <div className="space-y-6">
                {/* 検索・フィルター */}
                <div className="flex items-center space-x-4">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="商品を検索..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>
                  <select className="input-field">
                    <option value="">全カテゴリ</option>
                    <option value="ギフトカード">ギフトカード</option>
                    <option value="商品">商品</option>
                    <option value="社内サービス">社内サービス</option>
                    <option value="寄付">寄付</option>
                  </select>
                  <select className="input-field">
                    <option value="">全ステータス</option>
                    <option value="active">有効</option>
                    <option value="inactive">無効</option>
                  </select>
                  <button className="btn-secondary flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>フィルター</span>
                  </button>
                </div>

                {/* 商品一覧 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Image className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button className="text-primary-600 hover:text-primary-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-primary-600 hover:text-primary-900">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">必要ポイント</span>
                            <span className="text-sm font-medium text-primary-600">
                              {product.points_required} pt
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">在庫数</span>
                            <span className={`text-sm font-medium ${
                              product.stock === 0 ? 'text-red-600' : 
                              product.stock < 10 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {product.stock === 999 ? '∞' : product.stock}
                              {product.stock === 0 && (
                                <AlertCircle className="inline w-4 h-4 ml-1" />
                              )}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">人気度</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-primary-600 h-2 rounded-full" 
                                  style={{ width: `${product.popularity}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{product.popularity}%</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">今月交換数</span>
                            <span className="text-sm font-medium text-gray-900">
                              {product.exchanges_this_month}件
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.active ? '有効' : '無効'}
                            </span>
                            <span className="text-xs text-gray-500">{product.created_at}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'exchanges' && (
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
                      <option value="">全ステータス</option>
                      <option value="pending">申請中</option>
                      <option value="approved">承認済み</option>
                      <option value="rejected">却下</option>
                      <option value="shipped">発送済み</option>
                    </select>
                    <select className="input-field">
                      <option value="">全部門</option>
                      <option value="営業部">営業部</option>
                      <option value="開発部">開発部</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-500">
                    {exchanges.length}件の申請
                  </div>
                </div>

                {/* 交換申請一覧 */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          申請者
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          商品名
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          使用ポイント
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ステータス
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          申請日
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          配送状況
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {exchanges.map((exchange) => (
                        <tr key={exchange.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                  <Users className="w-4 h-4 text-gray-500" />
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {exchange.user_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {exchange.department}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{exchange.product_name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-primary-600">
                              {exchange.points_used} pt
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(exchange.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {exchange.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {exchange.delivery_info}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              {exchange.status === 'pending' && (
                                <>
                                  <button className="text-green-600 hover:text-green-900 px-2 py-1 text-xs border border-green-300 rounded">
                                    承認
                                  </button>
                                  <button className="text-red-600 hover:text-red-900 px-2 py-1 text-xs border border-red-300 rounded">
                                    却下
                                  </button>
                                </>
                              )}
                              <button className="text-primary-600 hover:text-primary-900">
                                <Eye className="w-4 h-4" />
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
