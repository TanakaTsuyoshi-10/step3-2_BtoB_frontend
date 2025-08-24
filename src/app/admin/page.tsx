'use client';

import Link from 'next/link';
import { Users, Smartphone, Leaf, ArrowRight, Monitor, BarChart3 } from 'lucide-react';

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Carbon Mate</h1>
              <p className="text-xs text-gray-600">企業向けエネルギー管理プラットフォーム</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-6xl">
          {/* Main Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              毎日の<span className="text-green-600">エコ活動</span>を
              <br className="hidden sm:block" />
              見える化・ゲーミフィケーション
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Carbon Mateは、企業のエネルギー管理とCO₂削減活動を総合的にサポートする
              <br className="hidden sm:block" />
              次世代プラットフォームです。従業員のモチベーション向上とサステナビリティを両立します。
            </p>
            <p className="text-lg text-gray-500">ご利用の目的を選択してください</p>
          </div>

          {/* Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mobile User Card */}
            <Link href="/mobile" className="group block">
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-2 border-transparent group-hover:border-blue-300">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                  モバイル利用者
                </h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  従業員の皆様向けのモバイル最適化された<br />
                  インターフェース
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>エネルギー使用量の確認</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Tech0ポイントの獲得・交換</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>削減ランキングの確認</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>明細書のアップロード</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>AI分析レポート</span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-blue-600 group-hover:text-blue-700">
                  <span className="font-medium">モバイル版を利用</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Admin Site Card */}
            <Link href="/admin/login" className="group block">
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-2 border-transparent group-hover:border-green-300">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Monitor className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                  管理者・デスクトップ
                </h3>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  管理者・マネージャー向けの<br />
                  高機能ダッシュボード
                </p>
                <div className="space-y-2 text-left mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>総合ダッシュボード</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>ポイントルール管理</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>景品・商品管理</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>CSRレポート生成</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>組織分析・統計</span>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-green-600 group-hover:text-green-700">
                  <span className="font-medium">管理者としてログイン</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          {/* Key Features */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">主な機能</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">利用量可視化</h4>
                <p className="text-xs text-gray-600">月次のエネルギー利用量・料金を分かりやすく表示</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Tech0ポイント</h4>
                <p className="text-xs text-gray-600">省エネ活動でポイント獲得、従業員のモチベーション向上</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">ランキング</h4>
                <p className="text-xs text-gray-600">企業内での削減率ランキングで競争意識を醸成</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">AI分析</h4>
                <p className="text-xs text-gray-600">AIによる使用パターン分析と改善提案</p>
              </div>
            </div>
          </div>

          {/* Tokyo Gas Partnership */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">東京ガスとの連携</h3>
              <p className="text-gray-600 mb-4">
                東京ガスのスマートメーターデータと連携し、<br />
                リアルタイムなエネルギー使用量の把握が可能です
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Copyright © 2025 - All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}