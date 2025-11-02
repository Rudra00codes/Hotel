import React from 'react';
import type { BaseProps } from '../types';

interface ContainerProps extends BaseProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = '7xl',
  padding = 'md',
  center = true,
  id,
  'data-testid': dataTestId,
  ...props
}) => {
  // Max width classes
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'px-2 sm:px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16'
  };

  // Center classes
  const centerClasses = center ? 'mx-auto' : '';

  // Combine classes
  const containerClasses = [
    maxWidthClasses[maxWidth],
    paddingClasses[padding],
    centerClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={containerClasses}
      id={id}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;