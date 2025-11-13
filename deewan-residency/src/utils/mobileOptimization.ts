/**
 * Mobile optimization utilities for touch-friendly interactions
 * Implements requirements 4.4 and 4.5 for mobile-specific features
 */

// Touch target size constants (minimum 44x44px as per requirements)
export const TOUCH_TARGET_SIZE = {
  MIN_WIDTH: '44px',
  MIN_HEIGHT: '44px',
  RECOMMENDED_WIDTH: '48px',
  RECOMMENDED_HEIGHT: '48px',
} as const;

// Mobile breakpoints
export const MOBILE_BREAKPOINTS = {
  MOBILE_MAX: 767,
  TABLET_MIN: 768,
  DESKTOP_MIN: 1024,
} as const;

/**
 * Detects if the current device is mobile based on screen width
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= MOBILE_BREAKPOINTS.MOBILE_MAX;
};

/**
 * Detects if the device supports touch interactions
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Creates a click-to-call link for phone numbers
 * Automatically formats phone numbers for tel: links
 */
export const createClickToCallLink = (phoneNumber: string): string => {
  // Remove all non-digit characters except + for international numbers
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  return `tel:${cleanNumber}`;
};

/**
 * Formats phone number for display while maintaining click-to-call functionality
 */
export const formatPhoneForDisplay = (phoneNumber: string): string => {
  // Keep original formatting for display
  return phoneNumber;
};

/**
 * Touch-friendly button classes for Tailwind CSS
 * Ensures minimum 44x44px touch targets
 */
export const getTouchFriendlyClasses = (size: 'small' | 'medium' | 'large' = 'medium'): string => {
  const baseClasses = 'touch-manipulation select-none';
  
  switch (size) {
    case 'small':
      return `${baseClasses} min-w-touch min-h-touch px-3 py-2`;
    case 'medium':
      return `${baseClasses} min-w-12 min-h-12 px-4 py-3`;
    case 'large':
      return `${baseClasses} min-w-16 min-h-16 px-6 py-4`;
    default:
      return `${baseClasses} min-w-12 min-h-12 px-4 py-3`;
  }
};

/**
 * Touch-friendly form input classes
 * Optimizes form inputs for mobile interaction
 */
export const getTouchFriendlyInputClasses = (): string => {
  return 'min-h-12 px-4 py-3 text-base touch-manipulation';
};

/**
 * Optimizes navigation for thumb-friendly interaction
 * Returns classes for mobile navigation items
 */
export const getThumbFriendlyNavClasses = (): string => {
  return 'min-h-12 px-4 py-3 flex items-center touch-manipulation';
};

/**
 * Adds haptic feedback for supported devices
 */
export const addHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light'): void => {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) return;
  
  const patterns = {
    light: [10],
    medium: [20],
    heavy: [30],
  };
  
  navigator.vibrate(patterns[type]);
};

/**
 * Prevents zoom on double-tap for form inputs on iOS
 */
export const preventZoomOnDoubleTap = (element: HTMLElement): void => {
  if (!isTouchDevice()) return;
  
  let lastTouchEnd = 0;
  element.addEventListener('touchend', (event) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
};

/**
 * Optimizes scroll behavior for mobile devices
 */
export const optimizeScrollForMobile = (): void => {
  if (typeof document === 'undefined' || !isMobileDevice()) return;
  
  // Add momentum scrolling for iOS
  (document.body.style as unknown as Record<string, string>).webkitOverflowScrolling = 'touch';
  
  // Prevent overscroll bounce on iOS
  document.body.style.overscrollBehavior = 'none';
};

/**
 * Creates a mobile-optimized phone number component props
 */
export interface MobilePhoneProps {
  phoneNumber: string;
  displayText?: string;
  className?: string;
  showIcon?: boolean;
}

/**
 * Mobile-optimized phone number link generator
 */
export const createMobilePhoneLink = ({
  phoneNumber,
  displayText,
  className = '',
  showIcon = true,
}: MobilePhoneProps) => {
  const href = createClickToCallLink(phoneNumber);
  const display = displayText || formatPhoneForDisplay(phoneNumber);
  const touchClasses = getTouchFriendlyClasses('small');
  
  return {
    href,
    display,
    className: `${touchClasses} ${className}`,
    showIcon,
  };
};

/**
 * Viewport meta tag optimization for mobile
 */
export const getOptimalViewportMeta = (): string => {
  return 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
};

/**
 * Mobile-specific event handlers
 */
export const addMobileEventListeners = () => {
  if (typeof window === 'undefined') return;
  
  // Optimize scroll performance
  optimizeScrollForMobile();
  
  // Add touch-friendly focus management
  document.addEventListener('touchstart', () => {
    document.body.classList.add('touch-device');
  }, { once: true });
  
  // Handle orientation changes
  window.addEventListener('orientationchange', () => {
    // Small delay to ensure viewport has updated
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  });
};