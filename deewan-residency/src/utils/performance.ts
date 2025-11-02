// Performance optimization utilities for Deewan Residency website

// Lazy loading utility for images
export const lazyLoadImage = (img: HTMLImageElement, src: string, placeholder?: string) => {
  // Set placeholder if provided
  if (placeholder) {
    img.src = placeholder;
  }

  // Create intersection observer for lazy loading
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement;
          target.src = src;
          target.classList.remove('lazy-loading');
          target.classList.add('lazy-loaded');
          observer.unobserve(target);
        }
      });
    },
    {
      rootMargin: '50px 0px', // Start loading 50px before image enters viewport
      threshold: 0.01
    }
  );

  img.classList.add('lazy-loading');
  observer.observe(img);

  return observer;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontPreloads = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ];

  fontPreloads.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = [
    '/images/hotel-exterior.jpg',
    '/images/hero-bg.jpg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimize images with WebP support detection
export const getOptimizedImageSrc = (basePath: string, format: 'webp' | 'jpg' = 'jpg'): string => {
  // Check WebP support
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  if (supportsWebP && format === 'webp') {
    return basePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  return basePath;
};

// Core Web Vitals monitoring
export const measureCoreWebVitals = () => {
  // Largest Contentful Paint (LCP)
  const observeLCP = () => {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Report to analytics if needed
        if (lastEntry.startTime > 2500) {
          console.warn('LCP is above 2.5s threshold:', lastEntry.startTime);
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP measurement not supported');
    }
  };

  // First Input Delay (FID)
  const observeFID = () => {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as any; // Type assertion for FID entry
          const fid = fidEntry.processingStart - fidEntry.startTime;
          console.log('FID:', fid);
          
          if (fid > 100) {
            console.warn('FID is above 100ms threshold:', fid);
          }
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID measurement not supported');
    }
  };

  // Cumulative Layout Shift (CLS)
  const observeCLS = () => {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
        
        if (clsValue > 0.1) {
          console.warn('CLS is above 0.1 threshold:', clsValue);
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS measurement not supported');
    }
  };

  // Only measure in production
  if (import.meta.env.PROD) {
    observeLCP();
    observeFID();
    observeCLS();
  }
};

// Resource hints for better loading performance
export const addResourceHints = () => {
  // DNS prefetch for external domains
  const dnsPrefetchDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'maps.googleapis.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect to critical external resources
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    if (domain.includes('gstatic')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};

// Debounce utility for performance-sensitive operations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for scroll and resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      window.setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  // Add resource hints
  addResourceHints();
  
  // Preload critical resources
  preloadCriticalResources();
  
  // Start Core Web Vitals monitoring
  measureCoreWebVitals();
  
  // Add performance observer for navigation timing
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('Page Load Time:', navEntry.loadEventEnd - navEntry.fetchStart);
          console.log('DOM Content Loaded:', navEntry.domContentLoadedEventEnd - navEntry.fetchStart);
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation'] });
  }
};

// Image optimization component helper
export const createOptimizedImageProps = (
  src: string,
  alt: string,
  options: {
    lazy?: boolean;
    placeholder?: string;
    sizes?: string;
    priority?: boolean;
  } = {}
) => {
  const { lazy = true, sizes, priority = false } = options;
  
  const props: any = {
    alt,
    loading: priority ? 'eager' : lazy ? 'lazy' : 'auto',
    decoding: 'async'
  };

  // Add sizes attribute for responsive images
  if (sizes) {
    props.sizes = sizes;
  }

  // Add srcset for different screen densities
  const baseName = src.replace(/\.[^/.]+$/, '');
  const extension = src.split('.').pop();
  
  props.srcSet = `
    ${baseName}.${extension} 1x,
    ${baseName}@2x.${extension} 2x
  `.trim();

  // Use WebP if supported
  props.src = getOptimizedImageSrc(src, 'webp');

  return props;
};