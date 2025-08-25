'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, User, Settings, Zap, LayoutDashboard, Trophy, Gift, FileText, Cog, ExternalLink } from 'lucide-react';
import { logout, getCurrentUser } from '@/lib/auth';
import { MOBILE_PUBLIC_URL } from '@/lib/constants';

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const navigationItems = [
    { name: 'ダッシュボード', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: '社内ランキング', href: '/admin/ranking', icon: Trophy },
    { name: 'ポイント管理', href: '/admin/points', icon: Gift },
    { name: '商品管理', href: '/admin/products', icon: Gift },
    { name: 'レポート', href: '/admin/reports', icon: FileText },
    { name: '設定', href: '/admin/settings', icon: Cog },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 px-6 py-4 relative z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold text-gray-900 block whitespace-nowrap">
                CarbonMate 管理システム
              </span>
              <span className="text-xs text-gray-500 whitespace-nowrap">Administration Panel</span>
            </div>
          </Link>
          
          <div className="hidden md:flex overflow-x-auto no-scrollbar snap-x snap-mandatory">
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

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-slate-500 to-blue-500 rounded-full">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm font-medium text-slate-700 whitespace-nowrap block">
                {user?.full_name || user?.email || '管理者ユーザー'}
              </span>
              <span className="text-xs text-slate-500 whitespace-nowrap">Administrator</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <a
              href={MOBILE_PUBLIC_URL}
              target="_blank"
              rel="noopener"
              className="p-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="アプリ利用者サイト"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;