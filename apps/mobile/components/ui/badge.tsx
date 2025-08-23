import React from 'react';
import { cn } from '@lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant = 'default', 
  ...props 
}) => {
  const variants = {
    default: 'bg-gray-900 text-gray-50',
    secondary: 'bg-gray-100 text-gray-900',
    destructive: 'bg-red-500 text-gray-50',
    outline: 'text-gray-950 border border-gray-200',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export { Badge };