import React from 'react';
import type { SizedProps } from '../types';

interface AvatarProps extends SizedProps {
  src?: string;
  alt?: string;
  name?: string;
  fallback?: string;
  rounded?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  className = '',
  size = 'md',
  src,
  alt,
  name,
  fallback,
  rounded = true,
  id,
  'data-testid': dataTestId,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayFallback = fallback || (name ? getInitials(name) : '?');

  const avatarClasses = [
    'inline-flex items-center justify-center bg-gray-500 text-white font-medium',
    sizeClasses[size],
    rounded ? 'rounded-full' : 'rounded-lg',
    className
  ].filter(Boolean).join(' ');

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={avatarClasses}
        id={id}
        data-testid={dataTestId}
        {...props}
      />
    );
  }

  return (
    <div
      className={avatarClasses}
      id={id}
      data-testid={dataTestId}
      {...props}
    >
      {displayFallback}
    </div>
  );
};

export default Avatar;