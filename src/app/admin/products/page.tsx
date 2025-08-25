'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">製品管理</h1>
        <p className="text-gray-600">製品の管理とメンテナンス</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>製品概要</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">製品管理機能を開発中...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}