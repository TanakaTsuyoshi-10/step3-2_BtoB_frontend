'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@admin-ui/tabs';
import Layout from '@/components/layout/Layout';
import ProductList from '@/components/incentives/ProductList';
import RedemptionStats from '@/components/incentives/RedemptionStats';

const IncentivesPage: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">インセンティブ管理</h1>
          <p className="text-gray-600">商品管理と交換実績・人気度分析を統合管理</p>
        </div>

        <div defaultValue="products" className="space-y-6">
          <div className="grid grid-cols-2 w-full max-w-md">
            <div value="products" className="whitespace-nowrap">商品管理</TabsTrigger>
            <div value="stats" className="whitespace-nowrap">実績・人気度</TabsTrigger>
          </TabsList>

          <div value="products" className="space-y-6">
            <div />
          </TabsContent>

          <div value="stats" className="space-y-6">
            <div />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IncentivesPage;