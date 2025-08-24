import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh bg-gray-50">
        <header className="sticky top-0 z-40 bg-gradient-to-r from-green-500 to-blue-500 shadow-lg">
          <nav className="mx-auto max-w-screen-sm flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">Carbon Mate</span>
            </div>
            <a href="/" className="text-white/80 hover:text-white text-sm font-medium px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200">
              管理者へ
            </a>
          </nav>
        </header>
        <main className="mx-auto max-w-screen-sm">{children}</main>
      </body>
    </html>
  );
}