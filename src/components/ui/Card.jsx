import React from 'react';
import clsx from 'clsx';

export const Card = ({ children, className, ...props }) => (
  <div 
    className={clsx(
      'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }) => (
  <div 
    className={clsx('px-6 py-4 border-b border-gray-200', className)}
    {...props}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={clsx('p-6', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3 
    className={clsx('text-lg font-semibold text-gray-900', className)}
    {...props}
  >
    {children}
  </h3>
);
