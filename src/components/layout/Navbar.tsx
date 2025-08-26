'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, User, Settings, Zap, LayoutDashboard, Trophy, Gift, FileText, Cog, ExternalLink, Menu, X } from 'lucide-react';
import { logout, getCurrentUser } from '@/lib/auth';
import { MOBILE_PUBLIC_URL } from '@/lib/constants';

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { name: 'ダッシュボード', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'ランキング', href: '/admin/ranking', icon: Trophy },
    { name: 'ポイント', href: '/admin/points', icon: Gift },
    { name: '商品', href: '/admin/products', icon: Gift },
    { name: 'レポート', href: '/admin/reports', icon: FileText },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 px-4 sm:px-6 py-4 relative z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-slate-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xl font-bold text-gray-900 block whitespace-nowrap">
                CarbonMate
              </span>
              <span className="text-xs text-gray-500 whitespace-nowrap">Admin</span>
            </div>
            <div className="text-left sm:hidden">
              <span className="text-sm font-bold text-gray-900 block">
                CarbonMate
              </span>
            </div>
          </Link>
          
          <div className="hidden lg:flex overflow-x-auto no-scrollbar snap-x snap-mandatory">
            <div className="flex space-x-1 min-w-max">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 snap-start ${
                      isActive
                        ? 'text-slate-700 bg-gradient-to-r from-slate-100 to-blue-100 shadow-sm border border-slate-200'
                        : 'text-gray-600 hover:text-slate-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 hover:shadow-sm'
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{item.name}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Desktop User Info */}
          <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-slate-500 to-blue-500 rounded-full">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm font-medium text-slate-700 whitespace-nowrap block">
                {user?.full_name || user?.email || '管理者ユーザー'}
              </span>
              <span className="text-xs text-slate-500 whitespace-nowrap">管理者</span>
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden sm:flex space-x-2">
            <Link
              href="/admin/settings"
              className="p-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="メニューを開く"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg z-10">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile User Info */}
            <div className="flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-slate-500 to-blue-500 rounded-full">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-slate-700 block">
                  {user?.full_name || user?.email || '管理者ユーザー'}
                </span>
                <span className="text-xs text-slate-500">管理者</span>
              </div>
            </div>

            {/* Mobile Navigation Items */}
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-slate-700 bg-gradient-to-r from-slate-100 to-blue-100 shadow-sm border border-slate-200'
                      : 'text-gray-600 hover:text-slate-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Mobile Actions */}
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              <Link
                href="/admin/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>設定</span>
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center space-x-3 px-4 py-3 text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>ログアウト</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;