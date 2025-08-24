'use client';

import { useState, useEffect } from 'react';
// Removed UI library imports - using plain HTML/CSS instead
import { Coins, Gift, History, CheckCircle, AlertCircle } from 'lucide-react';
import { fetchProducts } from '@lib/api/products';
import { fetchBalance, fetchHistory, redeem } from '@lib/api/points';
import MobileNav from '@/components/mobile/MobileNav';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  points_required: number;
  stock: number;
  active: boolean;
  image_url?: string;
}

interface PointsBalance {
  user_id: number;
  current_balance: number;
  last_updated: string;
}

interface PointHistory {
  id: number;
  delta: number;
  reason: string;
  balance_after: number;
  created_at: string;
  type: 'earn' | 'spend';
}

// モックデータ - 開発・デモ用
const mockProducts: Product[] = [
  {
    id: 1,
    title: "社員カフェ コーヒーチケット (5杯分)",
    description: "社内カフェで使える無料コーヒーチケット5回分です。毎日の頑張りに美味しいコーヒーをどうぞ。",
    category: "社内カフェ",
    points_required: 250,
    stock: 50,
    active: true
  },
  {
    id: 2,
    title: "オーガニックコットン エコバッグ",
    description: "100%オーガニックコットン製のエコバッグです。買い物時のプラ袋削減に貢献できます。",
    category: "エコグッズ",
    points_required: 400,
    stock: 30,
    active: true
  },
  {
    id: 3,
    title: "社員カフェ ランチ引換券",
    description: "社内カフェの日替わりランチ1食分です。栄養バランスの取れた美味しいお食事をお楽しみください。",
    category: "社内カフェ",
    points_required: 600,
    stock: 25,
    active: true
  },
  {
    id: 4,
    title: "竹製タンブラー (蓋付き)",
    description: "天然竹素材の環境に優しいタンブラーです。保温・保冷機能付きで、使い捨てカップの削減に。",
    category: "エコグッズ",
    points_required: 800,
    stock: 40,
    active: true
  },
  {
    id: 5,
    title: "社内カフェ スイーツセット券",
    description: "パティシエ手作りのケーキとドリンクのセット券です。午後のひと休みにいかがですか。",
    category: "社内カフェ",
    points_required: 450,
    stock: 35,
    active: true
  },
  {
    id: 6,
    title: "ソーラー充電式モバイルバッテリー",
    description: "太陽光で充電できるエコなモバイルバッテリーです。アウトドアや緊急時にも活躍します。",
    category: "エコグッズ",
    points_required: 1200,
    stock: 20,
    active: true
  },
  {
    id: 7,
    title: "社員カフェ 朝食セット券",
    description: "パンとコーヒー、フレッシュサラダの朝食セットです。健康的な一日のスタートを応援します。",
    category: "社内カフェ",
    points_required: 350,
    stock: 45,
    active: true
  },
  {
    id: 8,
    title: "植物由来プラスチック文具セット",
    description: "とうもろこし由来のバイオプラスチック製ボールペン・定規・消しゴムのセットです。",
    category: "エコグッズ",
    points_required: 300,
    stock: 60,
    active: true
  },
  {
    id: 9,
    title: "有機野菜栽培キット",
    description: "オフィスで育てられる有機野菜の栽培キットです。ベビーリーフやハーブが楽しめます。",
    category: "エコグッズ",
    points_required: 500,
    stock: 25,
    active: true
  },
  {
    id: 10,
    title: "社員カフェ VIPルーム利用券",
    description: "カフェ2階の静かなVIPルームを2時間利用できる券です。集中作業や打ち合わせにご利用ください。",
    category: "社内カフェ",
    points_required: 800,
    stock: 15,
    active: true
  },
  {
    id: 11,
    title: "リサイクル素材マウスパッド",
    description: "海洋プラスチックをリサイクルして作られたマウスパッドです。環境保護に貢献できます。",
    category: "エコグッズ",
    points_required: 200,
    stock: 80,
    active: true
  },
  {
    id: 12,
    title: "社員カフェ 月間フリーパス",
    description: "1ヶ月間、社内カフェのドリンク飲み放題パスです。コーヒー・紅茶・ジュース全種類対象。",
    category: "社内カフェ",
    points_required: 1500,
    stock: 10,
    active: true
  }
];

export default function PointsExchangePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [balance, setBalance] = useState<PointsBalance | null>(null);
  const [history, setHistory] = useState<PointHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, balanceData, historyData] = await Promise.all([
        fetchProducts(),
        fetchBalance(),
        fetchHistory(undefined, 10)
      ]);
      
      // APIからデータが取得できた場合はそれを使用、失敗した場合はモックデータを使用
      const finalProducts = (productsData as Product[])?.length > 0 ? productsData as Product[] : mockProducts;
      setProducts(finalProducts);
      setBalance(balanceData as PointsBalance);
      setHistory((historyData as any).history || []);
    } catch (error) {
      console.error('Failed to load data:', error);
      // API失敗時はモックデータを使用
      setProducts(mockProducts);
      setMessage({ type: 'error', text: 'データの読み込みに失敗しました。モックデータを表示中です。' });
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (productId: number, productTitle: string, pointsRequired: number) => {
    if (!balance || balance.current_balance < pointsRequired) {
      setMessage({ type: 'error', text: 'ポイントが不足しています' });
      return;
    }

    try {
      setRedeeming(productId);
      const result = await redeem(productId) as { new_balance: number };
      
      setMessage({ 
        type: 'success', 
        text: `${productTitle}と交換しました！残りポイント: ${result.new_balance}pt` 
      });
      
      // データを再読み込み
      await loadData();
    } catch (error) {
      console.error('Failed to redeem:', error);
      setMessage({ type: 'error', text: '交換に失敗しました。もう一度お試しください。' });
    } finally {
      setRedeeming(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-gray-50 text-gray-900">
        <div className="max-w-md mx-auto p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-48 bg-gray-200 rounded-xl"></div>
            <div className="h-48 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
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


      <div className="relative max-w-none mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-6 pt-20 space-y-6">
        {/* Header */}
        <div className="text-center mb-8 pt-4 animate-fade-in-up">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 via-green-500 to-blue-600 bg-clip-text text-transparent animate-gradient">
            ポイント交換
          </h1>
          <div className="mt-2 h-1 w-20 mx-auto bg-gradient-to-r from-primary-400 to-green-400 rounded-full"></div>
        </div>
        {/* メッセージ */}
        {message && (
          <div className={`p-4 rounded-xl flex items-center space-x-3 animate-fade-in-up shadow-lg backdrop-blur-sm ${
            message.type === 'success' 
              ? 'bg-green-50/80 text-green-800 border border-green-200/50' 
              : 'bg-red-50/80 text-red-800 border border-red-200/50'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        )}

        {/* ポイント残高 */}
        <div className="bg-white/70 backdrop-blur-lg border border-blue-200/50 rounded-xl p-6 shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-sm">
                <Coins className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600 font-medium">現在のポイント</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  {balance?.current_balance?.toLocaleString() || 0}pt
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 商品一覧 */}
        <div className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-xl font-bold flex items-center space-x-3 text-gray-800">
            <Gift className="w-6 h-6 text-green-600" />
            <span>交換できる商品</span>
          </h2>
          
          {products.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl p-8 text-center shadow-lg">
              <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">現在交換可能な商品がありません</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col space-y-4 h-full">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate text-lg">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center space-x-3 mt-4">
                        <span className="px-3 py-1 bg-gray-100/80 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                          {product.category}
                        </span>
                        <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                          {product.points_required.toLocaleString()}pt
                        </span>
                        {product.stock <= 5 && (
                          <span className="px-2 py-1 bg-red-100/80 backdrop-blur-sm rounded-full text-xs font-medium text-red-700">
                            残り{product.stock}個
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 w-full">
                      <button
                        onClick={() => handleRedeem(product.id, product.title, product.points_required)}
                        disabled={
                          redeeming === product.id ||
                          !balance ||
                          balance.current_balance < product.points_required ||
                          product.stock <= 0
                        }
                        className="w-full px-4 py-2 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {redeeming === product.id ? '交換中...' : '交換する'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ポイント履歴 */}
        {history.length > 0 && (
          <div className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <h2 className="text-xl font-bold flex items-center space-x-3 text-gray-800">
              <History className="w-6 h-6 text-purple-600" />
              <span>最近の履歴</span>
            </h2>
            
            <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-100/50">
                {history.map((record) => (
                  <div key={record.id} className="p-5 flex items-center justify-between hover:bg-white/50 transition-colors duration-300">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {record.reason}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {new Date(record.created_at).toLocaleDateString('ja-JP', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        record.type === 'earn' 
                          ? 'bg-green-100/80 text-green-700' 
                          : 'bg-red-100/80 text-red-700'
                      }`}>
                        {record.type === 'earn' ? '+' : ''}{record.delta.toLocaleString()}pt
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}