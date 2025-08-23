import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-gray-50">
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <nav className="mx-auto max-w-screen-sm flex items-center justify-between px-4 py-3">
            <span className="font-semibold tracking-tight text-gray-900">エネルギー利用者サイト</span>
            <a href="/" className="text-sm text-blue-600 hover:text-blue-800">管理者へ</a>
          </nav>
        </header>
        <main className="mx-auto max-w-screen-sm">{children}</main>
      </body>
    </html>
  );
}