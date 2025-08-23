'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-corporate-600 via-corporate-500 to-blue-600 shadow-xl backdrop-blur-sm px-6 fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Icon icon="carbon:leaf" className="w-5 h-5 text-white" />
          </div>
          <Link href="/mobile" className="text-xl font-bold text-white tracking-tight">
            Carbon Mate
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <nav className="flex items-center space-x-1 bg-white/10 backdrop-blur-md rounded-full px-2 py-1 border border-white/20">
            <Link 
              href="/mobile/dashboard" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                pathname === '/mobile/dashboard' 
                  ? 'bg-white text-corporate-600 shadow-lg scale-105' 
                  : 'text-white/90 hover:text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              <Icon icon="carbon:dashboard" className="w-4 h-4" />
              <span>ダッシュボード</span>
            </Link>
            <Link 
              href="/mobile/points" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                pathname === '/mobile/points' 
                  ? 'bg-white text-corporate-600 shadow-lg scale-105' 
                  : 'text-white/90 hover:text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              <Icon icon="ion:trophy" className="w-4 h-4" />
              <span>ポイント</span>
            </Link>
            <Link 
              href="/mobile/ranking" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                pathname === '/mobile/ranking' 
                  ? 'bg-white text-corporate-600 shadow-lg scale-105' 
                  : 'text-white/90 hover:text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              <Icon icon="ion:stats-chart" className="w-4 h-4" />
              <span>ランキング</span>
            </Link>
            <Link 
              href="/mobile/upload" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                pathname === '/mobile/upload' 
                  ? 'bg-white text-corporate-600 shadow-lg scale-105' 
                  : 'text-white/90 hover:text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              <Icon icon="carbon:upload" className="w-4 h-4" />
              <span>アップロード</span>
            </Link>
            <Link 
              href="/mobile/ai-analysis" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                pathname === '/mobile/ai-analysis' 
                  ? 'bg-white text-corporate-600 shadow-lg scale-105' 
                  : 'text-white/90 hover:text-white hover:bg-white/20 hover:scale-105'
              }`}
            >
              <Icon icon="carbon:watson-machine-learning" className="w-4 h-4" />
              <span>AI分析</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Desktop user menu */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-sm">田</span>
              </div>
              <span className="text-white/90 text-sm font-medium">田中 太郎</span>
            </div>
            <button className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Icon icon="carbon:settings" className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button 
            className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-b from-corporate-600 to-corporate-700 shadow-2xl backdrop-blur-md border-t border-white/20 fixed top-16 left-0 right-0 z-40">
          <div className="px-4 py-4 space-y-2">
            <Link 
              href="/mobile/dashboard" 
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/mobile/dashboard' 
                  ? 'text-white bg-white/20 font-semibold' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              onClick={closeMenu}
            >
              <Icon icon="carbon:dashboard" className="inline mr-2" />ダッシュボード
            </Link>
            <Link 
              href="/mobile/points" 
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/mobile/points' 
                  ? 'text-white bg-white/20 font-semibold' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              onClick={closeMenu}
            >
              <Icon icon="ion:trophy" className="inline mr-2" />ポイント
            </Link>
            <Link 
              href="/mobile/ranking" 
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/mobile/ranking' 
                  ? 'text-white bg-white/20 font-semibold' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              onClick={closeMenu}
            >
              <Icon icon="ion:stats-chart" className="inline mr-2" />ランキング
            </Link>
            <Link 
              href="/mobile/upload" 
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/mobile/upload' 
                  ? 'text-white bg-white/20 font-semibold' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              onClick={closeMenu}
            >
              <Icon icon="carbon:upload" className="inline mr-2" />アップロード
            </Link>
            <Link 
              href="/mobile/ai-analysis" 
              className={`block px-3 py-2 text-base font-medium rounded-md ${
                pathname === '/mobile/ai-analysis' 
                  ? 'text-white bg-white/20 font-semibold' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              onClick={closeMenu}
            >
              <Icon icon="carbon:watson-machine-learning" className="inline mr-2" />AI分析
            </Link>
            
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                  <span className="text-primary font-bold text-sm">田</span>
                </div>
                <span className="text-sm font-medium text-white">田中 太郎</span>
              </div>
              <Link 
                href="/mobile/profile" 
                className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                onClick={closeMenu}
              >
                プロフィール
              </Link>
              <Link 
                href="/mobile/settings" 
                className="block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md"
                onClick={closeMenu}
              >
                設定
              </Link>
              <button 
                className="block w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-red-500/20 rounded-md"
                onClick={closeMenu}
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}