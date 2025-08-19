'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, User, Settings, Zap, LayoutDashboard, Trophy, Coins, Package, Gift, FileText, Cog } from 'lucide-react';
import { logout, getCurrentUser } from '@/lib/auth';

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navigationItems = [
    { name: 'ダッシュボード', href: '/dashboard', icon: LayoutDashboard },
    { name: '社内ランキング', href: '/ranking', icon: Trophy },
    { name: 'ポイント管理', href: '/points', icon: Coins },
    { name: '交換状況', href: '/rewards', icon: Package },
    { name: '商品管理', href: '/admin', icon: Gift },
    { name: 'レポート作成', href: '/reports', icon: FileText },
    { name: '設定', href: '/settings', icon: Cog },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">
              Energy Manager
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">
              {user?.full_name || user?.email}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <Link
              href="/settings"
              className="p-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-100"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-danger-600 rounded-lg hover:bg-gray-100"
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