import React from 'react';
import type { SizedProps, DisabledProps } from '../types';

interface InputProps extends SizedProps, DisabledProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glass?: boolean;
}

const Input: React.FC<InputProps> = ({
  className = '',
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  size = 'md',
  disabled = false,
  label,
  error,
  helperText,
  required = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  glass = false,
  id,
  'data-testid': dataTestId,
  ...props
}) => {
  // Base classes
  const baseClasses = 'border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';

  // Size classes
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs min-h-[32px]',
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-sm min-h-[40px]',
    lg: 'px-4 py-3 text-base min-h-[44px]',
    xl: 'px-6 py-4 text-lg min-h-[48px]'
  };

  // Glass effect classes
  const glassClasses = glass
    ? 'backdrop-blur-xl bg-white/80 border-white/20'
    : 'bg-white border-gray-300';

  // Error state classes
  const errorClasses = error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : '';

  // Icon padding adjustment
  const iconPaddingClasses = icon
    ? iconPosition === 'left' 
      ? 'pl-10' 
      : 'pr-10'
    : '';

  // Combine classes
  const inputClasses = [
    baseClasses,
    sizeClasses[size],
    glassClasses,
    errorClasses,
    iconPaddingClasses,
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}

        {/* Input */}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={inputClasses}
          data-testid={dataTestId}
          {...props}
        />

        {/* Right Icon */}
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
      </div>

      {/* Helper Text or Error */}
      {(error || helperText) && (
        <p className={`mt-1 text-xs ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;