import React from 'react';
import type { VariantSizedProps } from '../types';

interface BadgeProps extends VariantSizedProps {
  dot?: boolean;
  outline?: boolean;
  rounded?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  dot = false,
  outline = false,
  rounded = false,
  id,
  'data-testid': dataTestId,
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center font-medium';

  // Size classes
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-3 py-1 text-sm',
    xl: 'px-4 py-1.5 text-base'
  };

  // Variant classes for filled badges
  const variantClasses = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800'
  };

  // Variant classes for outline badges
  const outlineVariantClasses = {
    primary: 'border border-blue-200 text-blue-800 bg-white',
    secondary: 'border border-gray-200 text-gray-800 bg-white',
    success: 'border border-green-200 text-green-800 bg-white',
    warning: 'border border-yellow-200 text-yellow-800 bg-white',
    error: 'border border-red-200 text-red-800 bg-white',
    info: 'border border-indigo-200 text-indigo-800 bg-white'
  };

  // Rounded classes
  const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';

  // Dot classes
  const dotClasses = dot ? 'w-2 h-2 rounded-full' : '';

  // Combine classes
  const badgeClasses = [
    baseClasses,
    !dot ? sizeClasses[size] : '',
    outline ? outlineVariantClasses[variant] : variantClasses[variant],
    dot ? dotClasses : roundedClasses,
    className
  ].filter(Boolean).join(' ');

  if (dot) {
    return (
      <span
        className={badgeClasses}
        id={id}
        data-testid={dataTestId}
        {...props}
      />
    );
  }

  return (
    <span
      className={badgeClasses}
      id={id}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;