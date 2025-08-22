import "../styles/globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-neutral-50">
        <header className="sticky top-0 z-40 nav-blur border-b border-neutral-200">
          <nav className="mx-auto max-w-screen-sm flex items-center justify-between px-4 py-3">
            <span className="font-semibold tracking-tight nowrap">エネルギー利用者サイト</span>
            <a href="/" className="text-sm underline">管理者へ</a>
          </nav>
        </header>
        <main className="mx-auto max-w-screen-sm">{children}</main>
      </body>
    </html>
  );
}