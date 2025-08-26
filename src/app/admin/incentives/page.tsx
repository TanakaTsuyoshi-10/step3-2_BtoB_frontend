'use client';

import React, { useState } from 'react';
// import Layout from '@components/layout/Layout';
// import ProductList from '@components/incentives/ProductList';
// import RedemptionStats from '@components/incentives/RedemptionStats';

// Mock Tabs components
const Tabs = ({ children, defaultValue, className }: any) => <div className={className} data-default-value={defaultValue}>{children}</div>;
const TabsList = ({ children, className }: any) => <div className={`flex space-x-1 ${className}`}>{children}</div>;
const TabsTrigger = ({ children, value, className, onClick }: any) => <button className={`px-4 py-2 rounded ${className}`} onClick={() => onClick?.(value)}>{children}</button>;
const TabsContent = ({ children, value, className }: any) => <div className={className}>{children}</div>;

// Temporary mock components for build
const ProductList = () => <div className="p-4 bg-white rounded-lg shadow">商品リスト（準備中）</div>;
const RedemptionStats = () => <div className="p-4 bg-white rounded-lg shadow">交換実績（準備中）</div>;

export default function Page() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">インセンティブ管理</h1>
          <p className="text-gray-600">商品管理と交換実績・人気度分析を統合管理</p>
        </div>

        <Tabs className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger 
              value="products" 
              className={`whitespace-nowrap ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('products')}
            >
              商品管理
            </TabsTrigger>
            <TabsTrigger 
              value="stats" 
              className={`whitespace-nowrap ${activeTab === 'stats' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setActiveTab('stats')}
            >
              実績・人気度
            </TabsTrigger>
          </TabsList>

          {activeTab === 'products' && (
          <TabsContent value="products" className="space-y-6">
            <ProductList />
          </TabsContent>
          )}

          {activeTab === 'stats' && (
          <TabsContent value="stats" className="space-y-6">
            <RedemptionStats />
          </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

