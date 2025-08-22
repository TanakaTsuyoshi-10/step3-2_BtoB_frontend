'use client';

import Link from 'next/link';
import { Users, Smartphone, Zap, ArrowRight } from 'lucide-react';
import { MOBILE_PUBLIC_URL } from '@/lib/constants';

export default function Home() {
  const handleMobileClick = () => {
    window.open(MOBILE_PUBLIC_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Zap className="w-12 h-12 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900 whitespace-nowrap">Energy Manager</h1>
          </div>
          <p className="text-xl text-gray-600">エネルギー管理システムへようこそ</p>
          <p className="text-lg text-gray-500 mt-2">ご利用の目的を選択してください</p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Site Card */}
          <Link href="/dashboard" className="group block">
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-200">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-4 whitespace-nowrap">
                管理者サイトへ
              </h2>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                ポイント管理、インセンティブ設定、<br />
                レポート作成、社内ランキング確認などの<br />
                管理業務を行います
              </p>
              <div className="flex items-center justify-center space-x-2 text-blue-600 group-hover:text-blue-700">
                <span className="font-medium whitespace-nowrap">管理画面を開く</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Mobile Site Card */}
          <button onClick={handleMobileClick} className="group block w-full">
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-200">
              <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Smartphone className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-4 whitespace-nowrap">
                利用者（mobile）サイトへ
              </h2>
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                従業員向けのモバイル対応サイト<br />
                エネルギー使用状況確認、<br />
                ポイント獲得、景品交換を行います
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600 group-hover:text-green-700">
                <span className="font-medium whitespace-nowrap">利用者画面を開く</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            © 2024 Energy Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}