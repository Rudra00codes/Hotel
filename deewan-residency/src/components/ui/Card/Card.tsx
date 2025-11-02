import React from 'react';
import type { BaseProps } from '../types';

interface CardProps extends BaseProps {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  border?: boolean;
  hover?: boolean;
  glass?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  border = false,
  hover = false,
  glass = false,
  id,
  'data-testid': dataTestId,
  ...props
}) => {
  // Base classes
  const baseClasses = 'bg-white transition-all duration-200';

  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  // Shadow classes
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  // Rounded classes
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  // Glass effect classes
  const glassClasses = glass 
    ? 'backdrop-blur-xl bg-white/80 border border-white/20' 
    : '';

  // Hover effect classes
  const hoverClasses = hover 
    ? 'hover:shadow-lg hover:scale-105 cursor-pointer' 
    : '';

  // Border classes
  const borderClasses = border && !glass 
    ? 'border border-gray-200' 
    : '';

  // Combine classes
  const cardClasses = [
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    roundedClasses[rounded],
    glassClasses,
    hoverClasses,
    borderClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      id={id}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;