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
  // 社内カフェ (2商品のみ)
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
    id: 3,
    title: "社員カフェ ランチ引換券",
    description: "社内カフェの日替わりランチ1食分です。栄養バランスの取れた美味しいお食事をお楽しみください。",
    category: "社内カフェ",
    points_required: 600,
    stock: 25,
    active: true
  },
  
  // エコグッズ
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
    id: 4,
    title: "竹製タンブラー (蓋付き)",
    description: "天然竹素材の環境に優しいタンブラーです。保温・保冷機能付きで、使い捨てカップの削減に。",
    category: "エコグッズ",
    points_required: 800,
    stock: 40,
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
    id: 11,
    title: "リサイクル素材マウスパッド",
    description: "海洋プラスチックをリサイクルして作られたマウスパッドです。環境保護に貢献できます。",
    category: "エコグッズ",
    points_required: 200,
    stock: 80,
    active: true
  },

  // ギフト券関係 (充実)
  {
    id: 13,
    title: "Amazonギフト券 ¥1,000",
    description: "Amazon.co.jpで使える電子ギフト券です。日用品から家電まで幅広い商品に利用できます。",
    category: "ギフト",
    points_required: 1000,
    stock: 50,
    active: true
  },
  {
    id: 14,
    title: "QUOカード ¥500",
    description: "コンビニや書店、レストランなど全国5万店以上で使えるプリペイドカードです。",
    category: "ギフト",
    points_required: 500,
    stock: 100,
    active: true
  },
  {
    id: 15,
    title: "図書カード ¥1,000",
    description: "全国の書店で本や雑誌の購入に使える図書カードです。読書好きの方におすすめ。",
    category: "ギフト",
    points_required: 800,
    stock: 40,
    active: true
  },
  {
    id: 16,
    title: "iTunesギフトカード ¥1,500",
    description: "App StoreやiTunes Storeで使えるデジタルギフトカードです。アプリや音楽、映画に。",
    category: "ギフト",
    points_required: 1500,
    stock: 30,
    active: true
  },
  {
    id: 17,
    title: "Google Playギフトカード ¥1,000",
    description: "Google Playストアで使えるギフトカードです。アプリやゲーム、映画などに利用可能。",
    category: "ギフト",
    points_required: 1000,
    stock: 35,
    active: true
  },
  {
    id: 18,
    title: "楽天ポイント 1,200pt",
    description: "楽天市場や楽天サービスで1pt=1円として利用できる楽天ポイントです。",
    category: "ギフト",
    points_required: 1200,
    stock: 60,
    active: true
  },
  {
    id: 19,
    title: "JCBギフトカード ¥1,000",
    description: "全国のJCBギフトカード取扱店で現金同様に使えるギフトカードです。",
    category: "ギフト",
    points_required: 1000,
    stock: 25,
    active: true
  },
  {
    id: 20,
    title: "スターバックスカード ¥2,000",
    description: "全国のスターバックス店舗で利用できるプリペイドカードです。コーヒー好きに最適。",
    category: "ギフト",
    points_required: 2000,
    stock: 20,
    active: true
  },

  // その他 (体験・レジャー関係)
  {
    id: 21,
    title: "プロ野球観戦チケット (内野自由席)",
    description: "東京ドームや神宮球場などでのプロ野球観戦チケットです。応援グッズ付き。",
    category: "その他",
    points_required: 2500,
    stock: 15,
    active: true
  },
  {
    id: 22,
    title: "映画鑑賞券 (2枚組)",
    description: "全国の映画館で利用できる映画鑑賞券2枚セットです。最新作もご覧いただけます。",
    category: "その他",
    points_required: 1800,
    stock: 25,
    active: true
  },
  {
    id: 23,
    title: "温泉施設入浴券",
    description: "都内近郊の日帰り温泉施設で利用できる入浴券です。リラックス・リフレッシュに。",
    category: "その他",
    points_required: 1500,
    stock: 20,
    active: true
  },
  {
    id: 24,
    title: "美術館・博物館共通券",
    description: "東京都内の主要美術館・博物館で利用できる共通入場券です。文化・芸術鑑賞に。",
    category: "その他",
    points_required: 1200,
    stock: 30,
    active: true
  },
  {
    id: 25,
    title: "ボウリング場利用券 (3ゲーム)",
    description: "都内ボウリング場で利用できる3ゲーム券です。同僚や友人との親睦に最適。",
    category: "その他",
    points_required: 1000,
    stock: 35,
    active: true
  },
  {
    id: 26,
    title: "カラオケルーム利用券 (2時間)",
    description: "人気カラオケチェーンで使える2時間利用券です。ストレス発散・チームビルディングに。",
    category: "その他",
    points_required: 800,
    stock: 40,
    active: true
  },
  {
    id: 27,
    title: "プラネタリウム鑑賞券",
    description: "都内のプラネタリウム施設で利用できる鑑賞券です。癒しの星空体験をお楽しみください。",
    category: "その他",
    points_required: 600,
    stock: 25,
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
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // 1ページに表示する商品数

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // フロントエンド仮実装：APIを完全にスキップしてモックデータのみ使用
      console.log('Loading mock data only...');
      
      // モック残高データ
      const mockBalance: PointsBalance = {
        user_id: 1,
        current_balance: 1250,
        last_updated: new Date().toISOString()
      };
      
      // モック履歴データ
      const mockHistory: PointHistory[] = [
        { id: 3, delta: 80, reason: '省エネ研修受講完了', balance_after: 1100, created_at: '2025-01-12T10:00:00Z', type: 'earn' },
        { id: 4, delta: 120, reason: 'ガス使用量10%削減達成', balance_after: 1020, created_at: '2025-01-11T10:00:00Z', type: 'earn' },
        { id: 5, delta: 40, reason: '待機電力削減実施', balance_after: 900, created_at: '2025-01-09T10:00:00Z', type: 'earn' },
        { id: 6, delta: 60, reason: '週次目標達成ボーナス', balance_after: 860, created_at: '2025-01-08T10:00:00Z', type: 'earn' }
      ];
      
      setProducts(mockProducts);
      setBalance(mockBalance);
      setHistory(mockHistory);
      
      console.log('Mock data loaded:', { products: mockProducts.length, balance: mockBalance, history: mockHistory.length });
      
    } catch (error) {
      console.error('Failed to load mock data:', error);
      setProducts(mockProducts);
      setMessage({ type: 'error', text: 'データの読み込みに失敗しました。' });
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (productId: number, productTitle: string, pointsRequired: number) => {
    console.log('🔥 handleRedeem called:', { 
      productId, 
      productTitle, 
      pointsRequired, 
      currentBalance: balance?.current_balance,
      balance: balance 
    });
    
    if (!balance || balance.current_balance < pointsRequired) {
      console.log('❌ Insufficient points:', balance?.current_balance, 'required:', pointsRequired);
      setMessage({ type: 'error', text: 'ポイントが不足しています' });
      return;
    }

    // フロントエンド仮実装：バックエンド呼び出しを完全にスキップ
    setRedeeming(productId);
    setMessage(null);
    console.log('Starting redemption for product:', productId);
    
    // 少し遅延を入れてリアル感を演出
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // ポイント残高を更新
    const newBalance = balance.current_balance - pointsRequired;
    console.log('New balance calculated:', newBalance);
    
    const updatedBalance = {
      ...balance,
      current_balance: newBalance,
      last_updated: new Date().toISOString()
    };
    setBalance(updatedBalance);
    console.log('Balance updated:', updatedBalance);
    
    // 履歴に交換記録を追加
    const newRecord = {
      id: Date.now(), // 仮のID
      delta: -pointsRequired,
      reason: `${productTitle}を交換`,
      balance_after: newBalance,
      created_at: new Date().toISOString(),
      type: 'spend' as const
    };
    setHistory(prev => {
      const updated = [newRecord, ...prev];
      console.log('History updated:', updated);
      return updated;
    });
    
    // 商品の在庫を減らす（ローカル更新）
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, stock: product.stock - 1 }
          : product
      )
    );
    
    // モック商品の在庫も更新（表示用）
    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      mockProducts[productIndex].stock -= 1;
      console.log('Mock product stock updated:', mockProducts[productIndex]);
    }
    
    setMessage({ 
      type: 'success', 
      text: `${productTitle}を交換しました！残りポイント: ${newBalance.toLocaleString()}pt` 
    });
    
    // 成功メッセージを3秒後に自動で消す
    setTimeout(() => setMessage(null), 3000);
    
    setRedeeming(null);
    console.log('Redemption completed');
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
            Tech0ポイントシステム
          </h1>
          <div className="mt-2 h-1 w-24 mx-auto bg-gradient-to-r from-primary-400 to-green-400 rounded-full"></div>
          <p className="text-gray-600 mt-2">環境活動でポイントを貯めて、素敵な商品と交換しよう</p>
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

        {/* ポイント残高カード */}
        <div className="bg-white/70 backdrop-blur-lg border border-blue-200/50 rounded-xl p-6 shadow-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-sm">
                <Coins className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600 font-medium">現在の残高</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  {balance?.current_balance?.toLocaleString() || 0}pt
                </div>
              </div>
            </div>
          </div>
          
          {/* 累計統計 */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-gray-100/50">
            <div className="text-center p-3 bg-green-50/50 rounded-lg">
              <div className="text-lg font-bold text-green-700">+2,580pt</div>
              <div className="text-xs text-green-600">累計獲得</div>
            </div>
            <div className="text-center p-3 bg-orange-50/50 rounded-lg">
              <div className="text-lg font-bold text-orange-700">-1,330pt</div>
              <div className="text-xs text-orange-600">累計使用</div>
            </div>
          </div>
        </div>

        {/* 商品一覧 - カテゴリータブ付き */}
        <div className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <h2 className="text-xl font-bold flex items-center space-x-3 text-gray-800">
            <Gift className="w-6 h-6 text-green-600" />
            <span>交換できる商品</span>
          </h2>
          
          {/* カテゴリータブ */}
          <div className="flex bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl p-1 overflow-x-auto whitespace-nowrap shadow-lg">
            {['All', 'Cafe', 'Eco', 'Gift', 'Other'].map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1); // カテゴリ変更時はページを1に戻す
                }}
                className={`flex-shrink-0 py-2 px-4 rounded-lg font-medium transition-all duration-300 text-sm ${
                  activeCategory === category 
                    ? 'bg-white text-primary-600 shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                {category === 'All' && '全て'}
                {category === 'Cafe' && 'カフェ'}
                {category === 'Eco' && 'エコ'}
                {category === 'Gift' && 'ギフト'}
                {category === 'Other' && 'その他'}
              </button>
            ))}
          </div>

          {/* 商品グリッド */}
          {(() => {
            const currentBalance = balance?.current_balance || 0;
            const filteredProducts = products.filter(product => 
              activeCategory === 'All' || 
              (activeCategory === 'Cafe' && product.category === '社内カフェ') ||
              (activeCategory === 'Eco' && product.category === 'エコグッズ') ||
              (activeCategory === 'Gift' && product.category === 'ギフト') ||
              (activeCategory === 'Other' && product.category === 'その他')
            );

            console.log('🎯 Rendering products:', {
              currentBalance,
              balanceState: balance,
              filteredProducts: filteredProducts.length,
              products: products.length
            });

            if (filteredProducts.length === 0) {
              return (
                <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl p-8 text-center shadow-lg">
                  <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">このカテゴリーに商品がありません</p>
                </div>
              );
            }

            // ページネーション計算
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedProducts = activeCategory === 'All' 
              ? filteredProducts.slice(startIndex, endIndex)
              : filteredProducts; // 「全て」以外は全表示

            return (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {paginatedProducts.map((product) => {
                  const canAfford = currentBalance >= product.points_required;
                  const isInStock = product.stock > 0;
                  
                  console.log(`🔍 Product ${product.title}:`, {
                    canAfford,
                    isInStock,
                    currentBalance,
                    required: product.points_required,
                    stock: product.stock,
                    disabled: !canAfford || !isInStock
                  });
                  
                  return (
                    <div key={product.id} className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="flex flex-col space-y-4 h-full">
                        <div className="flex-1 min-w-0">
                          {/* アイコン + 商品名 */}
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-sm">
                              <Gift className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 truncate text-base">
                                {product.title}
                              </h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="px-2 py-1 bg-primary-100/80 text-primary-700 rounded-full text-xs font-medium">
                                  {product.category}
                                </span>
                                {product.stock <= 5 && (
                                  <span className="px-2 py-1 bg-red-100/80 text-red-700 rounded-full text-xs font-medium">
                                    残り{product.stock}個
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {product.description}
                          </p>
                          
                          {/* 必要ポイント */}
                          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg mb-3">
                            <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                              {product.points_required.toLocaleString()}pt
                            </div>
                            <div className="text-xs text-blue-600">必要ポイント</div>
                          </div>
                        </div>
                        
                        {/* 交換ボタン */}
                        <div className="flex-shrink-0 w-full">
                          <button
                            onClick={() => handleRedeem(product.id, product.title, product.points_required)}
                            disabled={
                              redeeming === product.id ||
                              !canAfford ||
                              !isInStock
                            }
                            className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                              canAfford && isInStock
                                ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white hover:shadow-xl transform hover:scale-105 active:scale-95'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {redeeming === product.id ? (
                              '交換中...'
                            ) : !canAfford ? (
                              `ポイント不足 (${(product.points_required - currentBalance).toLocaleString()}pt足りません)`
                            ) : !isInStock ? (
                              '在庫切れ'
                            ) : (
                              '交換する'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
                
                {/* ページネーション - 「全て」の場合のみ表示 */}
                {activeCategory === 'All' && totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-4 pt-6">
                    <button
                      onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white/70 text-primary-600 hover:bg-primary-50 shadow-md hover:shadow-lg'
                      }`}
                    >
                      前へ
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                            currentPage === page
                              ? 'bg-primary-600 text-white shadow-lg'
                              : 'bg-white/70 text-primary-600 hover:bg-primary-50 shadow-md hover:shadow-lg'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === totalPages
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white/70 text-primary-600 hover:bg-primary-50 shadow-md hover:shadow-lg'
                      }`}
                    >
                      次へ
                    </button>
                  </div>
                )}
                
                {/* 商品数表示 */}
                {activeCategory === 'All' && (
                  <div className="text-center text-sm text-gray-600 pt-2">
                    全{filteredProducts.length}件中 {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)}件を表示
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* ポイント履歴セクション */}
        <div className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <h2 className="text-xl font-bold flex items-center space-x-3 text-gray-800">
            <History className="w-6 h-6 text-purple-600" />
            <span>ポイント履歴</span>
          </h2>
          
          <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-100/50">
              {/* 動的履歴データ */}
              {history.map((record) => (
                <div key={record.id} className="p-5 flex items-center justify-between hover:bg-white/50 transition-colors duration-300">
                  <div className="flex-1 min-w-0 flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      record.type === 'earn' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      {record.type === 'earn' ? '+' : '−'}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {record.reason}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {new Date(record.created_at).toLocaleDateString('ja-JP')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      record.type === 'earn' 
                        ? 'bg-green-100/80 text-green-700' 
                        : 'bg-orange-100/80 text-orange-700'
                    }`}>
                      {record.delta > 0 ? '+' : ''}{record.delta.toLocaleString()}pt
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 履歴をもっと見るボタン */}
            <div className="p-4 border-t border-gray-100/50 bg-gray-50/30 text-center">
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                すべての履歴を見る
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}