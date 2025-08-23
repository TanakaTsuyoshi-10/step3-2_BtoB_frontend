import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function MobileHome() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 shadow-lg bg-corporate flex justify-between items-center py-4">
        <div className="flex items-center">
          <div className="text-lg sm:text-xl font-bold text-white">Carbon Mate</div>
        </div>
        <div className="flex items-center ml-auto">
          <Link href="/mobile/login" className="px-3 py-1 sm:px-4 sm:py-2 text-sm rounded font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white">
            ログイン
          </Link>
        </div>
      </div>

      <div className="min-h-[60vh] sm:min-h-[80vh] px-4 flex items-center justify-center">
        <div className="text-center w-full">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              毎日の<span className="hidden sm:block" />
              <span className="text-green-600">エコ活動</span>を見える化
            </h1>
            <p className="py-4 sm:py-6 text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Tech0byscopeは、あなた専用のエネルギー管理アプリです。<br className="hidden sm:block" />
              節電・省エネの成果を記録し、ランキングや特典で<br className="hidden sm:block" />
              楽しみながらCO2削減に貢献できます。
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Link href="/mobile/login" className="px-4 py-2 sm:px-6 sm:py-3 sm:text-lg rounded font-medium transition-colors bg-primary-600 hover:bg-primary-700 text-white w-full sm:w-auto text-center">
                今すぐ始める
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            主な機能
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Icon icon="ion:stats-chart" className="text-5xl text-corporate" />
                </div>
                <h3 className="text-xl font-bold text-center">利用量可視化</h3>
                <p>月次のエネルギー利用量・料金を分かりやすく表示</p>
              </div>
            </div>
            
            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Icon icon="ion:trophy" className="text-5xl text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-center">Tech0ポイント</h3>
                <p>省エネ活動でポイント獲得、従業員のモチベーション向上</p>
              </div>
            </div>
            
            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Icon icon="ion:podium" className="text-5xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-center">ランキング</h3>
                <p>企業内での削減率ランキングで競争意識を醸成</p>
              </div>
            </div>
            
            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Icon icon="carbon:watson-machine-learning" className="text-5xl text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-center">AI分析</h3>
                <p>AIによる使用パターン分析と改善提案</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
            東京ガスとの連携
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-lg bg-white shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Icon icon="carbon:connect" className="text-6xl text-corporate" />
                </div>
                <h3 className="text-2xl font-bold mb-4">シームレスなデータ連携</h3>
                <p className="text-lg text-gray-600">
                  東京ガスのスマートメーターデータと連携し、<br />
                  リアルタイムなエネルギー使用量の把握が可能です
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="flex flex-col items-center text-center p-10 bg-gray-800 text-white">
        <aside>
          <div className="text-2xl font-bold mb-2">Carbon Mate</div>
          <p>企業向けエネルギー管理プラットフォーム</p>
          <p>Copyright © 2025 - All rights reserved</p>
        </aside>
      </footer>
    </div>
  );
}