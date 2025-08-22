import Link from "next/link";

export default function RootPicker() {
  return (
    <main className="min-h-dvh grid place-items-center bg-gradient-to-b from-white to-neutral-50 px-6">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-center">アプリを選択</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/dashboard" className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="font-semibold mb-1">管理者画面</div>
            <p className="text-sm text-neutral-600">KPI/ランキング/ポイント/レポート作成</p>
          </Link>
          <Link href="/mobile" className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition">
            <div className="font-semibold mb-1">アプリ利用者（mobile）</div>
            <p className="text-sm text-neutral-600">個人の使用量/ポイント確認</p>
          </Link>
        </div>
      </div>
    </main>
  );
}