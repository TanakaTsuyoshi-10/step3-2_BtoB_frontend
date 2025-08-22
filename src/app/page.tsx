import Link from "next/link";
import { Users, Monitor, Leaf } from 'lucide-react';

export default function RootPicker() {
  return (
    <main className="min-h-dvh bg-gray-50 px-4 py-8">
      <div className="max-w-md mx-auto space-y-8">
        {/* ブランドヘッダー */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tech0 by scope3</h1>
              <p className="text-sm text-gray-600">エネルギー管理プラットフォーム</p>
            </div>
          </div>
        </div>

        {/* 選択画面 */}
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-center text-gray-900 mb-6">ご利用の目的を選択してください</h2>
          
          <Link href="/admin" className="block bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Monitor className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 mb-1">管理者画面に進む</div>
                <p className="text-sm text-gray-600">KPI・ランキング・ポイント・レポート作成</p>
              </div>
            </div>
          </Link>

          <Link href="/mobile" className="block bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 mb-1">モバイル画面に進む</div>
                <p className="text-sm text-gray-600">個人の使用量・ポイント確認</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}