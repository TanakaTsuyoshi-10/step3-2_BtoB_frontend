import React from 'react';
import { cn } from '@lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress: React.FC<ProgressProps> = ({ 
  className,
  value = 0,
  max = 100,
  ...props 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-gray-100',
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-gray-900 transition-all"
        style={{
          transform: `translateX(-${100 - percentage}%)`,
        }}
      />
    </div>
  );
};

export { Progress };