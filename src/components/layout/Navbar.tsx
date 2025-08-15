'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User, Settings, Zap } from 'lucide-react';
import { logout, getCurrentUser } from '@/lib/auth';

const Navbar: React.FC = () => {
  const router = useRouter();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

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
          
          <div className="hidden md:flex space-x-6">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/devices"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Devices
            </Link>
            <Link
              href="/energy-records"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Energy Records
            </Link>
            <Link
              href="/reports"
              className="text-gray-700 hover:text-primary-600 font-medium"
            >
              Reports
            </Link>
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