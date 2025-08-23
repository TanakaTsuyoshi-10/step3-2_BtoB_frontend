'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  Gift, 
  Coins, 
  FileText, 
  Users,
  BarChart,
  Shield,
  Download,
} from '@iconify/react/icons/heroicons';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@admin-ui/card';
import { isAuthenticated, getCurrentUser } from '@/lib/auth';
import ja from '@/i18n/ja';

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const checkAdminAccess = async () => {
      try {
        const user = getCurrentUser();
        // 実際のAPIでは is_superuser フィールドをチェック
        setIsAdmin(true); // 仮で管理者権限ありに設定
        
      } catch (error) {
        console.error('管理者権限チェックエラー:', error);
        router.push('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [router]);

  const handleExportReport = async () => {
    try {
      // 実際のAPIが実装されたら以下のコメントアウト部分を使用
      /*
      const response = await reportsAPI.exportCSR({
        range_start: '2025-01-01',
        range_end: '2025-01-31',
        granularity: 'monthly',
        format: 'csv'
      });
      
      // ファイルダウンロード処理
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'csr_report.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      */
      
      alert('CSRレポートのエクスポート機能は実装中です');
    } catch (error) {
      console.error('レポートエクスポートエラー:', error);
      alert('レポートのエクスポートに失敗しました');
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <span className="ml-4 text-lg text-gray-600">{ja.common.loading}</span>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">管理者権限が必要です</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ja.admin.title}</h1>
            <p className="text-gray-600 mt-1">
              システム管理とレポート出力
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-4 h-4" />
            <span>管理者モード</span>
          </div>
        </div>

        {/* 管理機能カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ポイントルール管理 */}
          <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/points')}>
            <div>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">ポイント管理</h3>
                    <p className="text-sm text-gray-600">CO₂削減ポイントの付与ルールと取引履歴</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">アクティブルール</span>
                    <span className="font-medium">3件</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 景品管理 */}
          <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/products')}>
            <div>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">商品管理</h3>
                    <p className="text-sm text-gray-600">交換可能な景品の追加・編集・人気度分析</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">登録商品数</span>
                    <span className="font-medium">15件</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* レポート生成 */}
          <div className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/admin/reports')}>
            <div>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">レポート生成</h3>
                    <p className="text-sm text-gray-600">CSRレポートと各種実績レポートの生成</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">今月生成数</span>
                    <span className="font-medium">12件</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CSRレポート */}
        <div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5" />
              CSRレポート出力
            </CardTitle>
          </CardHeader>
          <div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    対象期間
                  </label>
                  <div className="space-y-2">
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      defaultValue="2025-01-01"
                    />
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      defaultValue="2025-01-31"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    粒度
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="monthly">月次</option>
                    <option value="quarterly">四半期</option>
                    <option value="yearly">年次</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    部門フィルタ
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">全部門</option>
                    <option value="営業部">営業部</option>
                    <option value="開発部">開発部</option>
                    <option value="人事部">人事部</option>
                    <option value="企画部">企画部</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleExportReport}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <div className="w-4 h-4" />
                  <span>CSVでエクスポート</span>
                </button>
                
                <button
                  onClick={() => router.push('/admin/reports')}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <div className="w-4 h-4" />
                  <span>レポート生成へ</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総CO₂削減量</p>
                  <p className="text-2xl font-bold text-green-600">2,847.5 kg</p>
                </div>
                <div className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総付与ポイント</p>
                  <p className="text-2xl font-bold text-blue-600">28,475 pt</p>
                </div>
                <div className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">景品交換回数</p>
                  <p className="text-2xl font-bold text-purple-600">156 回</p>
                </div>
                <div className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">参加率</p>
                  <p className="text-2xl font-bold text-orange-600">78.5%</p>
                </div>
                <div className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;