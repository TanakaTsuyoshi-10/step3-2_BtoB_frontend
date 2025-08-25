'use client';

import React from 'react';
import Navbar from './Navbar';
import { Settings, Shield } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Floating Background Elements - Admin Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-slate-400/10 to-gray-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-gray-400/10 to-slate-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Admin Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Shield className="w-8 h-8 text-slate-400/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{animationDelay: '1s'}}>
          <Settings className="w-6 h-6 text-gray-400/20" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-float" style={{animationDelay: '2s'}}>
          <Shield className="w-7 h-7 text-blue-400/20" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float" style={{animationDelay: '3s'}}>
          <Settings className="w-5 h-5 text-indigo-400/20" />
        </div>
      </div>

      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 min-h-[calc(100vh-200px)] p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;