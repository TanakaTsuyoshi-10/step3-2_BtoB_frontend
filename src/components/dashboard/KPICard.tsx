'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ReactElement<LucideIcon>;
  isLoading?: boolean;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  icon,
  isLoading = false,
  className = '',
}) => {
  const formatValue = (val: number | string): string => {
    if (typeof val === 'string') return val;
    
    // 数値の場合、適切なフォーマットを適用
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    } else if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'k';
    } else if (val % 1 === 0) {
      return val.toString();
    } else {
      return val.toFixed(1);
    }
  };

  if (isLoading) {
    return (
      <Card className={`${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-bold text-gray-900">
                {formatValue(value)}
              </span>
              {unit && (
                <span className="text-sm font-medium text-gray-500">{unit}</span>
              )}
            </div>
          </div>
          <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
            {React.cloneElement(icon, { className: 'w-6 h-6' })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;