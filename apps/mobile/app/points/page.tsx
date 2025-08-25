'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/apps/mobile/components/ui/card';
import { Button } from '@/apps/mobile/components/ui/button';
import { Badge } from '@/apps/mobile/components/ui/badge';
import { Coins, Gift, History, CheckCircle, AlertCircle } from 'lucide-react';
import { getProducts, redeemProduct, getPointsBalance, getPointsHistory } from '@mobile/lib/api';

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
        getProducts(),
        getPointsBalance(),
        getPointsHistory(10)
      ]);
      
      setProducts(productsData as Product[]);
      setBalance(balanceData as PointsBalance);
      setHistory((historyData as any).history || []);
    } catch (error) {
      console.error('Failed to load data:', error);
      setMessage({ type: 'error', text: 'データの読み込みに失敗しました' });
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
      const result = await redeemProduct(productId) as { new_balance: number };
      
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
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* メッセージ */}
        {message && (
          <div className={`p-4 rounded-xl flex items-center space-x-2 ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        {/* ポイント残高 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Coins className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">現在のポイント</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {balance?.current_balance?.toLocaleString() || 0}pt
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 商品一覧 */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <Gift className="w-5 h-5" />
            <span>交換できる商品</span>
          </h2>
          
          {products.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Gift className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">現在交換可能な商品がありません</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between space-x-3">
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
                          onClick={() => handleRedeem(product.id, product.title, product.points_required)}
                          disabled={
                            redeeming === product.id ||
                            !balance ||
                            balance.current_balance < product.points_required ||
                            product.stock <= 0
                          }
                          className="whitespace-nowrap"
                        >
                          {redeeming === product.id ? '交換中...' : '交換する'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* ポイント履歴 */}
        {history.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <History className="w-5 h-5" />
              <span>最近の履歴</span>
            </h2>
            
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {history.map((record) => (
                    <div key={record.id} className="p-4 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 truncate">
                          {record.reason}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(record.created_at).toLocaleDateString('ja-JP', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          record.type === 'earn' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {record.type === 'earn' ? '+' : ''}{record.delta.toLocaleString()}pt
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}