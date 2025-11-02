import { useState, useRef, useEffect } from 'react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  lowQualitySrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function ProgressiveImage({
  src,
  alt,
  className = '',
  lowQualitySrc,
  onLoad,
  onError
}: ProgressiveImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lowQualityLoaded, setLowQualityLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  // Generate low quality src if not provided
  const getLowQualitySrc = () => {
    if (lowQualitySrc) return lowQualitySrc;
    
    // Generate a low quality version by modifying the filename
    const baseName = src.replace(/\.[^/.]+$/, '');
    const extension = src.split('.').pop();
    return `${baseName}-low.${extension}`;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setHasError(true);
    onError?.();
  };

  const handleLowQualityLoad = () => {
    setLowQualityLoaded(true);
  };

  if (!isInView) {
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

  if (hasError) {
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
    <div className={`relative overflow-hidden ${className}`}>
      {/* Low quality placeholder */}
      {!imageLoaded && (
        <>
          {/* Blur placeholder */}
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          
          {/* Low quality image */}
          {lowQualitySrc && (
            <img
              src={getLowQualitySrc()}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-300 ${
                lowQualityLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleLowQualityLoad}
              onError={() => {}} // Ignore low quality errors
              aria-hidden="true"
            />
          )}
        </>
      )}

      {/* High quality image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />

      {/* Loading indicator */}
      {!imageLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-80 rounded-full p-2">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}