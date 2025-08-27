'use client';

import React from 'react';
import Layout from '@components/layout/Layout';
import { BarChart, Settings } from 'lucide-react';

export default function EnergyRecordsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">エネルギー記録</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              エネルギー使用量とCO₂削減の記録管理
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Settings className="w-4 h-4" />
            <span>管理者モード</span>
          </div>
        </div>

        {/* Coming Soon メッセージ */}
        <div className="bg-white rounded-lg border shadow-sm p-6 sm:p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <BarChart className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">開発中</h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
            エネルギー記録管理機能は現在開発中です。近日中に公開予定です。
          </p>
        </div>
      </div>
    </Layout>
  );
}