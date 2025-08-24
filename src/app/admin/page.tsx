'use client';

import Link from 'next/link';
import { Users, Smartphone, Leaf, ArrowRight, Monitor, BarChart3, Sparkles, Star, Zap } from 'lucide-react';

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Leaf className="w-8 h-8 text-green-400/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{animationDelay: '1s'}}>
          <Sparkles className="w-6 h-6 text-blue-400/30" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-float" style={{animationDelay: '2s'}}>
          <Star className="w-7 h-7 text-purple-400/30" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float" style={{animationDelay: '3s'}}>
          <Zap className="w-5 h-5 text-yellow-400/30" />
        </div>
      </div>
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Carbon Mate</h1>
              <p className="text-xs text-gray-600">企業向けエネルギー管理プラットフォーム</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 relative z-10">
        <div className="w-full max-w-6xl">
          {/* Main Title */}
          <div className="text-center mb-8 md:mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 relative">
              毎日の<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 animate-gradient">エコ活動</span>を
              <br className="hidden sm:block" />
              <span className="relative">
                見える化
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </div>
              </span>
            </h2>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-4 md:mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              企業のエネルギー管理とCO₂削減活動を<br />サポートする次世代プラットフォーム
            </p>
            <p className="text-base md:text-xl text-gray-500 animate-fade-in-up" style={{animationDelay: '0.4s'}}>ご利用の目的を選択してください</p>
          </div>

          {/* Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            {/* Mobile User Card */}
            <Link href="/mobile/login" className="group block">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 p-6 md:p-8 border-2 border-transparent group-hover:border-blue-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Smartphone className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-3 md:mb-4">
                  従業員向けアプリ
                </h3>
                
                <div className="space-y-1 md:space-y-2 text-left mb-4 md:mb-6 hidden md:block">
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
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                </div>
              </div>
            </Link>

            {/* Admin Site Card */}
            <Link href="/admin/login" className="group block">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 p-6 md:p-8 border-2 border-transparent group-hover:border-green-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mx-auto mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Monitor className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-3 md:mb-4">
                  管理者向けダッシュボード
                </h3>
                
                <div className="space-y-1 md:space-y-2 text-left mb-4 md:mb-6 hidden md:block">
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
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Key Features - Simplified for Mobile */}
          <div className="mt-12 md:mt-20 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-12 relative">
              <span className="relative">
                主な機能
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-lg">利用量可視化</h4>
                <p className="text-xs md:text-sm text-gray-600 hidden md:block">月次のエネルギー利用量・料金を分かりやすく表示</p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-lg">Tech0ポイント</h4>
                <p className="text-xs md:text-sm text-gray-600 hidden md:block">省エネ活動でポイント獲得、従業員のモチベーション向上</p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-lg">ランキング</h4>
                <p className="text-xs md:text-sm text-gray-600 hidden md:block">企業内での削減率ランキングで競争意識を醸成</p>
              </div>

              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-lg">AI分析</h4>
                <p className="text-xs md:text-sm text-gray-600 hidden md:block">AIによる使用パターン分析と改善提案</p>
              </div>
            </div>
          </div>

          {/* Tokyo Gas Partnership - Simplified for Mobile */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 mt-12 md:mt-20 max-w-3xl mx-auto border border-gray-100 hover:shadow-3xl transition-all duration-500 animate-fade-in-up" style={{animationDelay: '1s'}}>
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">東京ガスとの連携</h3>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                東京ガスのスマートメーターデータと連携し、<br className="hidden md:block" />
                リアルタイムなエネルギー使用量の把握が可能です
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 md:mt-16 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
            <p className="text-gray-500 text-sm">
              Copyright © 2025 - All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}