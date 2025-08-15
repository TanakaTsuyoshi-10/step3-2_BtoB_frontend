'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { cn, formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  className,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-danger-600" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success-600';
      case 'down':
        return 'text-danger-600';
      case 'neutral':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className={cn('', className)}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <div className="flex items-baseline space-x-1">
              <p className="text-2xl font-bold text-gray-900">
                {typeof value === 'number' ? formatNumber(value) : value}
              </p>
              {unit && (
                <p className="text-sm font-medium text-gray-600">{unit}</p>
              )}
            </div>
            {trend && trendValue !== undefined && (
              <div className="flex items-center space-x-1 mt-2">
                {getTrendIcon()}
                <span className={cn('text-sm font-medium', getTrendColor())}>
                  {formatNumber(Math.abs(trendValue))}%
                </span>
                <span className="text-sm text-gray-600">vs last month</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0 p-3 bg-primary-50 rounded-lg">
              <div className="text-primary-600">{icon}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;