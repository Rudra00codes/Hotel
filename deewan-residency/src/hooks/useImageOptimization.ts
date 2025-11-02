import { useState, useEffect, useCallback } from 'react';
import { 
  supportsWebP as checkWebPSupport, 
  preloadImage, 
  ImagePerformanceTracker,
  generateResponsiveSources 
} from '../utils/imageOptimization';

interface UseImageOptimizationOptions {
  preload?: boolean;
  trackPerformance?: boolean;
  fallbackFormat?: 'jpg';
}

interface ImageOptimizationState {
  supportsWebP: boolean;
  isLoading: boolean;
  error: string | null;
  loadTime: number | null;
}

export function useImageOptimization(
  src: string,
  options: UseImageOptimizationOptions = {}
) {
  const {
    preload = false,
    trackPerformance = true,
    fallbackFormat = 'jpg' as const
  } = options;

  const [state, setState] = useState<ImageOptimizationState>({
    supportsWebP: false,
    isLoading: true,
    error: null,
    loadTime: null
  });

  const tracker = ImagePerformanceTracker.getInstance();

  // Check WebP support
  useEffect(() => {
    checkWebPSupport().then((supported: boolean) => {
      setState(prev => ({ ...prev, supportsWebP: supported }));
    });
  }, []);

  // Preload image if requested
  useEffect(() => {
    if (preload && src) {
      const startTime = performance.now();
      
      preloadImage(src, state.supportsWebP ? 'webp' : fallbackFormat)
        .then(() => {
          const loadTime = performance.now() - startTime;
          
          setState(prev => ({
            ...prev,
            isLoading: false,
            loadTime
          }));

          if (trackPerformance) {
            tracker.trackImageLoad(src, startTime);
          }
        })
        .catch((error) => {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: error.message || 'Failed to load image'
          }));

          if (trackPerformance) {
            tracker.trackImageError(src, error.message || 'Load failed');
          }
        });
    }
  }, [src, preload, state.supportsWebP, fallbackFormat, trackPerformance, tracker]);

  // Generate optimized sources
  const getOptimizedSources = useCallback(() => {
    if (!src) return [];
    
    const formats = state.supportsWebP ? ['webp', 'jpg'] : ['jpg'];
    return generateResponsiveSources(src, undefined, formats as ('webp' | 'jpg')[]);
  }, [src, state.supportsWebP]);

  // Get the best format for the current browser
  const getOptimalFormat = useCallback(() => {
    return state.supportsWebP ? 'webp' : fallbackFormat;
  }, [state.supportsWebP, fallbackFormat]);

  // Handle image load event
  const handleImageLoad = useCallback((startTime?: number) => {
    if (trackPerformance && startTime) {
      tracker.trackImageLoad(src, startTime);
    }
    
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: null
    }));
  }, [src, trackPerformance, tracker]);

  // Handle image error event
  const handleImageError = useCallback((error: string) => {
    if (trackPerformance) {
      tracker.trackImageError(src, error);
    }
    
    setState(prev => ({
      ...prev,
      isLoading: false,
      error
    }));
  }, [src, trackPerformance, tracker]);

  return {
    ...state,
    getOptimizedSources,
    getOptimalFormat,
    handleImageLoad,
    handleImageError
  };
}

// Hook for managing multiple images (galleries, etc.)
export function useImageGalleryOptimization(images: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [supportsWebP, setSupportsWebP] = useState(false);

  // Check WebP support
  useEffect(() => {
    const checkSupport = async () => {
      const supported = await checkWebPSupport();
      setSupportsWebP(supported);
    };
    checkSupport();
  }, []);

  // Preload critical images (first few in gallery)
  useEffect(() => {
    const criticalImages = images.slice(0, 3); // Preload first 3 images
    
    criticalImages.forEach(src => {
      preloadImage(src, supportsWebP ? 'webp' : 'jpg')
        .then(() => {
          setLoadedImages(prev => new Set(prev).add(src));
        })
        .catch(() => {
          setFailedImages(prev => new Set(prev).add(src));
        });
    });
  }, [images, supportsWebP]);

  const isImageLoaded = useCallback((src: string) => {
    return loadedImages.has(src);
  }, [loadedImages]);

  const hasImageFailed = useCallback((src: string) => {
    return failedImages.has(src);
  }, [failedImages]);

  const markImageLoaded = useCallback((src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  }, []);

  const markImageFailed = useCallback((src: string) => {
    setFailedImages(prev => new Set(prev).add(src));
  }, []);

  return {
    supportsWebP,
    isImageLoaded,
    hasImageFailed,
    markImageLoaded,
    markImageFailed,
    loadedCount: loadedImages.size,
    failedCount: failedImages.size,
    totalCount: images.length
  };
}