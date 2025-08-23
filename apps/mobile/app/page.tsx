import React from "react";

export default function MobileHome() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <section className="text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ようこそ</h1>
          <p className="text-gray-600">
            あなたの電気・ガス使用量、CO₂削減状況を一目で確認できます。
          </p>
        </section>
        
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">今月の状況</h2>
          <p className="text-gray-600 mb-4">ダッシュボードで詳細を確認してください。</p>
          <a href="/mobile/dashboard" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            ダッシュボードを見る
          </a>
        </div>
      </div>
    </div>
  );
}