import { createMobilePhoneLink, addHapticFeedback, type MobilePhoneProps } from '../../utils/mobileOptimization';

interface MobilePhoneComponentProps extends MobilePhoneProps {
  variant?: 'primary' | 'secondary' | 'footer';
  size?: 'small' | 'medium' | 'large';
}

export default function MobilePhone({
  phoneNumber,
  displayText,
  className = '',
  showIcon = true,
  variant = 'primary',
  size = 'medium',
}: MobilePhoneComponentProps) {
  const phoneLink = createMobilePhoneLink({
    phoneNumber,
    displayText,
    className,
    showIcon,
  });

  const handleClick = () => {
    // Add haptic feedback for mobile devices
    addHapticFeedback('light');
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'text-blue-600 hover:text-blue-800 font-medium';
      case 'secondary':
        return 'text-gray-700 hover:text-gray-900';
      case 'footer':
        return 'text-gray-300 hover:text-blue-400';
      default:
        return 'text-blue-600 hover:text-blue-800 font-medium';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <a
      href={phoneLink.href}
      onClick={handleClick}
      className={`
        ${phoneLink.className}
        ${getVariantClasses()}
        ${getSizeClasses()}
        inline-flex items-center gap-2 
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        rounded-md
        ${className}
      `}
      aria-label={`Call ${phoneLink.display}`}
    >
      {showIcon && (
        <svg 
          className="w-4 h-4 flex-shrink-0" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
          />
        </svg>
      )}
      <span>{phoneLink.display}</span>
    </a>
  );
}