import React from 'react';
import type { SizedProps, ColorProps } from '../types';

interface SpinnerProps extends SizedProps, ColorProps {
  text?: string;
  center?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  className = '',
  size = 'md',
  color = 'blue',
  text,
  center = false,
  id,
  'data-testid': dataTestId,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  // Color classes
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    gray: 'text-gray-600',
    indigo: 'text-indigo-600'
  };

  // Container classes
  const containerClasses = center 
    ? 'flex items-center justify-center' 
    : 'inline-flex items-center';

  // Spinner classes
  const spinnerClasses = [
    'animate-spin',
    sizeClasses[size],
    colorClasses[color],
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={containerClasses}
      id={id}
      data-testid={dataTestId}
      {...props}
    >
      <svg
        className={spinnerClasses}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <span className="ml-2 text-sm text-gray-600">{text}</span>
      )}
    </div>
  );
};

export default Spinner;