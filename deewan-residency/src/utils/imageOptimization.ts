/**
 * Image optimization utilities for Deewan Residency website
 * Handles WebP conversion, responsive sizing, and lazy loading
 */

export interface ImageSizes {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
}

export const DEFAULT_SIZES: ImageSizes = {
  small: 320,
  medium: 640,
  large: 1024,
  xlarge: 1920
};

/**
 * Generate responsive image sources for different screen sizes
 */
export function generateResponsiveSources(
  baseSrc: string,
  sizes: ImageSizes = DEFAULT_SIZES,
  formats: ('webp' | 'jpg')[] = ['webp', 'jpg']
) {
  // Skip optimization for external URLs (like Sanity CDN)
  if (baseSrc.startsWith('http://') || baseSrc.startsWith('https://')) {
    return [];
  }

  const sources: Array<{
    srcSet: string;
    sizes: string;
    type: string;
  }> = [];

  formats.forEach(format => {
    const extension = format === 'webp' ? '.webp' : '.jpg';
    const baseName = baseSrc.replace(/\.[^/.]+$/, '');
    
    // Generate srcSet with multiple densities for better quality
    const srcSet = [
      `${baseName}-${sizes.small}w${extension} ${sizes.small}w`,
      `${baseName}-${sizes.medium}w${extension} ${sizes.medium}w`,
      `${baseName}-${sizes.large}w${extension} ${sizes.large}w`,
      `${baseName}-${sizes.xlarge}w${extension} ${sizes.xlarge}w`,
      // Add 2x density versions for high-DPI displays
      `${baseName}-${sizes.medium * 2}w${extension} ${sizes.medium * 2}w`,
      `${baseName}-${sizes.large * 2}w${extension} ${sizes.large * 2}w`
    ].join(', ');

    sources.push({
      srcSet,
      sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
      type: `image/${format}`
    });
  });

  return sources;
}

/**
 * Generate low quality image placeholder
 */
export function generateLowQualityPlaceholder(src: string): string {
  const baseName = src.replace(/\.[^/.]+$/, '');
  const extension = src.split('.').pop();
  return `${baseName}-low.${extension}`;
}

/**
 * Generate optimized image URL for a specific width
 */
export function getOptimizedImageUrl(
  baseSrc: string,
  width: number,
  format: 'webp' | 'jpg' = 'webp'
): string {
  // Return original URL for external images
  if (baseSrc.startsWith('http://') || baseSrc.startsWith('https://')) {
    return baseSrc;
  }

  const extension = format === 'webp' ? '.webp' : '.jpg';
  const baseName = baseSrc.replace(/\.[^/.]+$/, '');
  return `${baseName}-${width}w${extension}`;
}

/**
 * Preload critical images for better performance
 */
export function preloadImage(src: string, format: 'webp' | 'jpg' = 'webp'): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    
    // Try WebP first, fallback to JPEG
    if (format === 'webp') {
      img.src = getOptimizedImageUrl(src, 1024, 'webp');
    } else {
      img.src = getOptimizedImageUrl(src, 1024, 'jpg');
    }
  });
}

/**
 * Check if browser supports WebP format
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Lazy loading intersection observer options
 */
export const LAZY_LOADING_OPTIONS: IntersectionObserverInit = {
  rootMargin: '50px 0px',
  threshold: 0.1
};

/**
 * Image compression quality settings
 */
export const COMPRESSION_SETTINGS = {
  webp: {
    quality: 85,
    effort: 4
  },
  jpeg: {
    quality: 90,
    progressive: true
  }
};

/**
 * Responsive breakpoints for image sizing
 */
export const RESPONSIVE_BREAKPOINTS = {
  mobile: '(max-width: 768px)',
  tablet: '(max-width: 1024px)',
  desktop: '(max-width: 1440px)',
  large: '(min-width: 1441px)'
};

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizesAttribute(
  mobileSize = '100vw',
  tabletSize = '50vw',
  desktopSize = '33vw'
): string {
  return [
    `${RESPONSIVE_BREAKPOINTS.mobile} ${mobileSize}`,
    `${RESPONSIVE_BREAKPOINTS.tablet} ${tabletSize}`,
    desktopSize
  ].join(', ');
}

/**
 * Image loading performance metrics
 */
export class ImagePerformanceTracker {
  private static instance: ImagePerformanceTracker;
  private loadTimes: Map<string, number> = new Map();
  private errors: Map<string, string> = new Map();

  static getInstance(): ImagePerformanceTracker {
    if (!ImagePerformanceTracker.instance) {
      ImagePerformanceTracker.instance = new ImagePerformanceTracker();
    }
    return ImagePerformanceTracker.instance;
  }

  trackImageLoad(src: string, startTime: number): void {
    const loadTime = performance.now() - startTime;
    this.loadTimes.set(src, loadTime);
  }

  trackImageError(src: string, error: string): void {
    this.errors.set(src, error);
  }

  getAverageLoadTime(): number {
    const times = Array.from(this.loadTimes.values());
    return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  }

  getErrorRate(): number {
    const totalImages = this.loadTimes.size + this.errors.size;
    return totalImages > 0 ? this.errors.size / totalImages : 0;
  }

  getReport(): {
    averageLoadTime: number;
    errorRate: number;
    totalImages: number;
    errors: Array<{ src: string; error: string }>;
  } {
    return {
      averageLoadTime: this.getAverageLoadTime(),
      errorRate: this.getErrorRate(),
      totalImages: this.loadTimes.size + this.errors.size,
      errors: Array.from(this.errors.entries()).map(([src, error]) => ({ src, error }))
    };
  }
}