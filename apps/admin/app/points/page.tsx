'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import PointsOrgDashboard from '@/components/points/PointsOrgDashboard';
import PointsEmployeesTable from '@/components/points/PointsEmployeesTable';

const PointsPage: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ポイント管理</h1>
          <p className="text-gray-600">組織全体のポイント配布状況と従業員の利用実績を管理</p>
        </div>

        <div className="space-y-8">
          {/* 組織ダッシュボード */}
          <div />
          
          {/* 従業員テーブル */}
          <div />
        </div>
      </div>
    </Layout>
  );
};

export default PointsPage;