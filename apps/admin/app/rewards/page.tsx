'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Gift, 
  Search, 
  Filter, 
  Coins,
  ShoppingCart,
  Package,
  Heart,
  Coffee,
} from '@iconify/react/icons/heroicons';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@admin-ui/card';
import { isAuthenticated } from '@/lib/auth';
import ja from '@/i18n/ja';

interface Reward {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  stock: number;
  points_required: number;
  active: boolean;
}

interface RedemptionHistory {
  id: number;
  reward_title: string;
  reward_category: string;
  points_spent: number;
  status: 'pending' | 'approved' | 'rejected' | 'shipped';
  created_at: string;
}

const RewardsPage: React.FC = () => {
  const router = useRouter();
  const [rewards, setRewards] = useState<div[]>([]);
  const [redemptions, setRedemptions] = useState<div[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const fetchRewardsData = async () => {
      try {
        // 実際のAPIが実装されたら以下のコメントアウト部分を使用
        /*
        const [rewardsResponse, redemptionsResponse, balanceResponse] = await Promise.all([
          rewardsAPI.getRewards({ category: selectedCategory, q: searchQuery }),
          rewardsAPI.getMyRedemptions(),
          pointsAPI.getMyPoints()
        ]);
        
        setRewards(rewardsResponse);
        setRedemptions(redemptionsResponse);
        setCurrentBalance(balanceResponse.current_balance);
        */
        
        // 仮データ
        const mockRewards: Reward[] = [
          {
            id: 1,
            title: "Amazonギフトカード 500円分",
            description: "Amazon.co.jpで使えるギフトカードです。有効期限は発行から10年間です。",
            category: "ギフトカード",
            stock: 20,
            points_required: 500,
            active: true
          },
          {
            id: 2,
            title: "スターバックス ドリンクチケット",
            description: "全国のスターバックス店舗で使えるドリンクチケット（Tallサイズまで）",
            category: "商品",
            stock: 15,
            points_required: 400,
            active: true
          },
          {
            id: 3,
            title: "社内カフェ利用券",
            description: "社内カフェで使える500円分の利用券です。",
            category: "社内サービス",
            stock: 50,
            points_required: 300,
            active: true
          },
          {
            id: 4,
            title: "環境保護団体への寄付",
            description: "あなたの代わりに環境保護団体に1000円を寄付します。",
            category: "寄付",
            stock: 100,
            points_required: 800,
            active: true
          },
          {
            id: 5,
            title: "QUOカード 1000円分",
            description: "全国の加盟店で使えるQUOカードです。",
            category: "ギフトカード",
            stock: 10,
            points_required: 1000,
            active: true
          },
        ];

        const mockRedemptions: RedemptionHistory[] = [
          {
            id: 1,
            reward_title: "Amazonギフトカード 500円分",
            reward_category: "ギフトカード",
            points_spent: 500,
            status: "shipped",
            created_at: "2025-01-15T10:30:00Z"
          },
          {
            id: 2,
            reward_title: "スターバックス ドリンクチケット",
            reward_category: "商品",
            points_spent: 400,
            status: "approved",
            created_at: "2025-01-10T14:20:00Z"
          },
        ];

        const filteredRewards = mockRewards.filter(reward => {
          const matchesCategory = !selectedCategory || reward.category === selectedCategory;
          const matchesSearch = !searchQuery || 
            reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reward.description.toLowerCase().includes(searchQuery.toLowerCase());
          
          return matchesCategory && matchesSearch && reward.active;
        });

        setRewards(filteredRewards);
        setRedemptions(mockRedemptions);
        setCurrentBalance(1250);
        
        // カテゴリ一覧を設定
        const uniqueCategories = Array.from(new Set(mockRewards.map(r => r.category)));
        setCategories(uniqueCategories);
        
      } catch (error) {
        console.error('景品データ取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRewardsData();
  }, [router, selectedCategory, searchQuery]);

  const handleExchange = async (reward: Reward) => {
    if (currentBalance < reward.points_required) {
      alert('ポイントが不足しています');
      return;
    }

    if (reward.stock <= 0) {
      alert('在庫が不足しています');
      return;
    }

    if (confirm(`${reward.title}を${reward.points_required}ポイントで交換しますか？`)) {
      try {
        // 実際のAPIが実装されたら以下のコメントアウト部分を使用
        /*
        await rewardsAPI.exchange({ reward_id: reward.id });
        */
        alert('交換申請を受け付けました');
        // データを再取得
        setCurrentBalance(prev => prev - reward.points_required);
      } catch (error) {
        console.error('交換エラー:', error);
        alert('交換に失敗しました');
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ギフトカード':
        return <div className="w-5 h-5" />;
      case '商品':
        return <div className="w-5 h-5" />;
      case '社内サービス':
        return <div className="w-5 h-5" />;
      case '寄付':
        return <div className="w-5 h-5" />;
      default:
        return <div className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { text: '申請中', color: 'bg-yellow-100 text-yellow-800' },
      approved: { text: '承認', color: 'bg-green-100 text-green-800' },
      rejected: { text: '却下', color: 'bg-red-100 text-red-800' },
      shipped: { text: '発送済', color: 'bg-blue-100 text-blue-800' },
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <span className="ml-4 text-lg text-gray-600">{ja.common.loading}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ja.rewards.title}</h1>
            <p className="text-gray-600 mt-1">
              ポイントを使って景品と交換
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-lg">
              <div className="w-5 h-5 text-primary-600" />
              <span className="font-medium text-primary-900">{currentBalance.toLocaleString()} pt</span>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {showHistory ? '景品一覧' : '交換履歴'}
            </button>
          </div>
        </div>

        {!showHistory ? (
          <>
            {/* フィルター */}
            <div>
              <div className="p-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center space-x-2 flex-1 max-w-md">
                    <div className="w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="景品を検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">カテゴリ:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">すべて</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 景品一覧 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <div key={reward.id} className="hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(reward.category)}
                          <span className="text-sm text-gray-600">{reward.category}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          reward.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          在庫: {reward.stock}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{reward.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-gray-900">{reward.points_required.toLocaleString()}</span>
                          <span className="text-sm text-gray-600">pt</span>
                        </div>
                        
                        <button
                          onClick={() => handleExchange(reward)}
                          disabled={currentBalance < reward.points_required || reward.stock <= 0}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                            currentBalance >= reward.points_required && reward.stock > 0
                              ? 'bg-primary-600 text-white hover:bg-primary-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          <div className="w-4 h-4 inline mr-1" />
                          交換
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {rewards.length === 0 && (
              <div>
                <div className="p-8 text-center">
                  <p className="text-gray-500">条件に一致する景品がありません</p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* 交換履歴 */
          <div>
            <div>
              <div>交換履歴</div>
            </div>
            <div>
              <div className="space-y-4">
                {redemptions.map((redemption) => (
                  <div
                    key={redemption.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start space-x-4">
                      {getCategoryIcon(redemption.reward_category)}
                      <div>
                        <p className="font-medium text-gray-900">{redemption.reward_title}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(redemption.created_at).toLocaleDateString('ja-JP')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center space-x-4">
                      <div>
                        <p className="font-bold text-red-600">-{redemption.points_spent.toLocaleString()} pt</p>
                      </div>
                      {getStatusBadge(redemption.status)}
                    </div>
                  </div>
                ))}
                
                {redemptions.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">交換履歴がありません</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardsPage;