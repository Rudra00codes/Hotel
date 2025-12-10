import { useState, useRef, useEffect } from 'react';
import { useImageOptimization } from '../../hooks/useImageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  imgClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  placeholder = '/images/placeholder.jpg',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const startTimeRef = useRef<number>(0);

  // Use image optimization hook
  const {

    error: optimizationError,
    getOptimizedSources,
    handleImageLoad: trackImageLoad,
    handleImageError: trackImageError
  } = useImageOptimization(src, {
    preload: loading === 'eager',
    trackPerformance: true
  });

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'lazy' && imgRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observerRef.current?.disconnect();
            }
          });
        },
        {
          rootMargin: '50px 0px', // Start loading 50px before the image enters viewport
          threshold: 0.1
        }
      );

      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loading]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    trackImageLoad(startTimeRef.current);
    onLoad?.();
  };

  const handleImageError = () => {
    trackImageError('Image failed to load');
    onError?.();
  };

  // Don't render the actual image until it's in view (for lazy loading)
  if (loading === 'lazy' && !isInView) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ aspectRatio: '16/9' }}
        role="img"
        aria-label={`Loading image: ${alt}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-gray-400" aria-hidden="true">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (optimizationError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        role="img"
        aria-label={`Failed to load image: ${alt}`}
      >
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2" aria-hidden="true">🏨</div>
          <p className="text-sm">Image not available</p>
          <p className="text-xs text-gray-400 mt-1">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          role="img"
          aria-label={`Loading image: ${alt}`}
        >
          <div className="text-gray-400" aria-hidden="true">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      <picture>
        {/* Generate optimized sources */}
        {getOptimizedSources().map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            sizes={source.sizes}
            type={source.type}
          />
        ))}
        
        {/* Fallback img element */}
        <img
          ref={imgRef}
          src={optimizationError ? placeholder : src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName || 'w-full h-full object-cover'}`}
          loading={loading}
          onLoad={() => {
            startTimeRef.current = performance.now();
            handleImageLoad();
          }}
          onError={handleImageError}
          sizes={sizes}
        />
      </picture>
    </div>
  );
}