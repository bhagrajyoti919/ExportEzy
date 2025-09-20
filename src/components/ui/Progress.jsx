import React from 'react';
import clsx from 'clsx';

const Progress = ({ value = 0, className, color = 'primary', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600'
  };

  return (
    <div className={clsx('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size], className)}>
      <div 
        className={clsx('h-full transition-all duration-300 ease-in-out rounded-full', colorClasses[color])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};

export default Progress;
