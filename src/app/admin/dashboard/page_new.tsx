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
  TrendingUp,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
// Removed card import - using simple HTML instead
import { isAuthenticated, getCurrentUser } from '@/lib/auth';
import ja from '@/i18n/ja';

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    const checkAdminAccess = async () => {
      try {
        const user = getCurrentUser();
        // 実際のAPIでは is_superuser フィールドをチェック
        setIsAdmin(true); // 仮で管理者権限ありに設定
        
      } catch (error) {
        console.error('管理者権限チェックエラー:', error);
        router.push('/admin/login');
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
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <span className="ml-4 text-lg text-gray-600">{ja.common.loading}</span>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">管理者権限が必要です</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{ja.admin.title}</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              システム管理とレポート出力
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Settings className="w-4 h-4" />
            <span>管理者モード</span>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総CO₂削減量</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">2,847.5 kg</p>
              </div>
              <BarChart className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総付与ポイント</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">28,475 pt</p>
              </div>
              <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">景品交換回数</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">156 回</p>
              </div>
              <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">参加率</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">78.5%</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* グラフエリア */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* 電気削減量推移（棒グラフ） */}
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">電気削減量推移</h3>
                  <p className="text-sm text-gray-600">過去6ヶ月の電気削減量</p>
                </div>
              </div>
            </div>
            <div className="h-80 pl-12">
              <div className="h-full flex items-end justify-between border-b border-l border-gray-200 relative">
                <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2 w-10 text-right">
                  <span>100%</span>
                  <span>80%</span>
                  <span>60%</span>
                  <span>40%</span>
                  <span>20%</span>
                  <span>0%</span>
                </div>
                
                <div className="flex items-end justify-between w-full h-full pb-8 px-4">
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-yellow-500 rounded-t hover:bg-yellow-600 transition-colors cursor-pointer" 
                      style={{height: '65%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">8月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      8月 電気削減量(%):65
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-yellow-500 rounded-t hover:bg-yellow-600 transition-colors cursor-pointer" 
                      style={{height: '78%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">9月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      9月 電気削減量(%):78
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-yellow-500 rounded-t hover:bg-yellow-600 transition-colors cursor-pointer" 
                      style={{height: '45%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">10月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      10月 電気削減量(%):45
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-yellow-500 rounded-t hover:bg-yellow-600 transition-colors cursor-pointer" 
                      style={{height: '88%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">11月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      11月 電気削減量(%):88
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-yellow-500 rounded-t hover:bg-yellow-600 transition-colors cursor-pointer" 
                      style={{height: '72%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">12月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      12月 電気削減量(%):72
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-yellow-600 rounded-t shadow-md hover:bg-yellow-700 transition-colors cursor-pointer" 
                      style={{height: '95%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">1月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      1月 電気削減量(%):95
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ガス削減量推移（棒グラフ） */}
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">ガス削減量推移</h3>
                  <p className="text-sm text-gray-600">過去6ヶ月のガス削減量</p>
                </div>
              </div>
            </div>
            <div className="h-80 pl-12">
              <div className="h-full flex items-end justify-between border-b border-l border-gray-200 relative">
                <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2 w-10 text-right">
                  <span>100%</span>
                  <span>80%</span>
                  <span>60%</span>
                  <span>40%</span>
                  <span>20%</span>
                  <span>0%</span>
                </div>
                
                <div className="flex items-end justify-between w-full h-full pb-8 px-4">
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-orange-500 rounded-t hover:bg-orange-600 transition-colors cursor-pointer" 
                      style={{height: '55%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">8月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      8月 ガス削減量(%):55
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-orange-500 rounded-t hover:bg-orange-600 transition-colors cursor-pointer" 
                      style={{height: '68%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">9月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      9月 ガス削減量(%):68
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-orange-500 rounded-t hover:bg-orange-600 transition-colors cursor-pointer" 
                      style={{height: '35%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">10月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      10月 ガス削減量(%):35
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-orange-500 rounded-t hover:bg-orange-600 transition-colors cursor-pointer" 
                      style={{height: '82%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">11月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      11月 ガス削減量(%):82
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-orange-500 rounded-t hover:bg-orange-600 transition-colors cursor-pointer" 
                      style={{height: '62%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">12月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      12月 ガス削減量(%):62
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 relative group">
                    <div 
                      className="w-12 bg-orange-600 rounded-t shadow-md hover:bg-orange-700 transition-colors cursor-pointer" 
                      style={{height: '92%'}}
                    ></div>
                    <span className="text-xs text-gray-600 mt-2">1月</span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      1月 ガス削減量(%):92
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CO₂削減量推移（折れ線グラフ） */}
        <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">CO₂削減量推移</h3>
                <p className="text-sm text-gray-600">累計削減量の推移</p>
              </div>
            </div>
          </div>
          <div className="h-80 pl-12">
            <div className="h-full border-b border-l border-gray-200 relative overflow-hidden">
              <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2 w-10 text-right">
                <span>3.0t</span>
                <span>2.4t</span>
                <span>1.8t</span>
                <span>1.2t</span>
                <span>0.6t</span>
                <span>0t</span>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-t border-gray-100"></div>
                <div className="border-t border-gray-100"></div>
                <div className="border-t border-gray-100"></div>
                <div className="border-t border-gray-100"></div>
                <div className="border-t border-gray-100"></div>
              </div>
              
              <svg className="w-full h-full" viewBox="0 0 300 200">
                <polyline
                  points="20,160 70,140 120,150 170,120 220,130 270,80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  className="drop-shadow-sm"
                />
                <g className="group">
                  <circle cx="20" cy="160" r="4" fill="#10b981" className="drop-shadow-sm hover:r-6 transition-all cursor-pointer" />
                  <circle cx="20" cy="160" r="8" fill="transparent" className="cursor-pointer" />
                  <foreignObject x="-25" y="135" width="50" height="20">
                    <div className="flex justify-center">
                      <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        8月 CO2削減量(t):1.2
                      </div>
                    </div>
                  </foreignObject>
                </g>
                <g className="group">
                  <circle cx="70" cy="140" r="4" fill="#10b981" className="drop-shadow-sm hover:r-6 transition-all cursor-pointer" />
                  <circle cx="70" cy="140" r="8" fill="transparent" className="cursor-pointer" />
                  <foreignObject x="25" y="115" width="50" height="20">
                    <div className="flex justify-center">
                      <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        9月 CO2削減量(t):1.8
                      </div>
                    </div>
                  </foreignObject>
                </g>
                <g className="group">
                  <circle cx="120" cy="150" r="4" fill="#10b981" className="drop-shadow-sm hover:r-6 transition-all cursor-pointer" />
                  <circle cx="120" cy="150" r="8" fill="transparent" className="cursor-pointer" />
                  <foreignObject x="75" y="125" width="50" height="20">
                    <div className="flex justify-center">
                      <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        10月 CO2削減量(t):1.5
                      </div>
                    </div>
                  </foreignObject>
                </g>
                <g className="group">
                  <circle cx="170" cy="120" r="4" fill="#10b981" className="drop-shadow-sm hover:r-6 transition-all cursor-pointer" />
                  <circle cx="170" cy="120" r="8" fill="transparent" className="cursor-pointer" />
                  <foreignObject x="125" y="95" width="50" height="20">
                    <div className="flex justify-center">
                      <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        11月 CO2削減量(t):2.4
                      </div>
                    </div>
                  </foreignObject>
                </g>
                <g className="group">
                  <circle cx="220" cy="130" r="4" fill="#10b981" className="drop-shadow-sm hover:r-6 transition-all cursor-pointer" />
                  <circle cx="220" cy="130" r="8" fill="transparent" className="cursor-pointer" />
                  <foreignObject x="175" y="105" width="50" height="20">
                    <div className="flex justify-center">
                      <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        12月 CO2削減量(t):2.1
                      </div>
                    </div>
                  </foreignObject>
                </g>
                <g className="group">
                  <circle cx="270" cy="80" r="4" fill="#059669" className="drop-shadow-sm hover:r-6 transition-all cursor-pointer" />
                  <circle cx="270" cy="80" r="8" fill="transparent" className="cursor-pointer" />
                  <foreignObject x="225" y="55" width="50" height="20">
                    <div className="flex justify-center">
                      <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        1月 CO2削減量(t):3.6
                      </div>
                    </div>
                  </foreignObject>
                </g>
              </svg>
              
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 py-2">
                <span className="text-xs text-gray-600">8月</span>
                <span className="text-xs text-gray-600">9月</span>
                <span className="text-xs text-gray-600">10月</span>
                <span className="text-xs text-gray-600">11月</span>
                <span className="text-xs text-gray-600">12月</span>
                <span className="text-xs text-gray-600">1月</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;