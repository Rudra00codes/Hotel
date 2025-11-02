import { useState, useCallback } from 'react';
import OptimizedImage from '../OptimizedImage';

interface RoomGalleryProps {
  images: string[];
  roomName: string;
  className?: string;
}

export default function RoomGallery({ images, roomName, className = '' }: RoomGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setShowLightbox(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setShowLightbox(false);
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
    } else {
      setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
    }
  }, [images.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!showLightbox) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox('prev');
        break;
      case 'ArrowRight':
        navigateLightbox('next');
        break;
    }
  }, [showLightbox, closeLightbox, navigateLightbox]);

  // Add keyboard event listener
  useState(() => {
    if (showLightbox) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  });

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center h-96 ${className}`}>
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">🏨</div>
          <p className="text-lg">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`room-gallery ${className}`}>
      {/* Main Image */}
      <div className="relative mb-4">
        <div 
          className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(selectedImageIndex)}
        >
          <OptimizedImage
            src={images[selectedImageIndex]}
            alt={`${roomName} - Image ${selectedImageIndex + 1}`}
            className="w-full h-full"
            sizes="(max-width: 768px) 100vw, 80vw"
            loading="eager"
          />
          
          {/* Zoom Indicator */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white bg-opacity-90 rounded-full p-3">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Arrows for Main Image */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
              >
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                index === selectedImageIndex
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : 'hover:opacity-80'
              }`}
            >
              <OptimizedImage
                src={image}
                alt={`${roomName} - Thumbnail ${index + 1}`}
                className="w-full h-full"
                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Lightbox Image */}
          <div className="max-w-6xl max-h-full">
            <OptimizedImage
              src={images[selectedImageIndex]}
              alt={`${roomName} - Image ${selectedImageIndex + 1}`}
              className="max-h-[85vh] w-auto mx-auto"
              loading="eager"
              sizes="90vw"
            />
            
            {/* Image Info */}
            <div className="text-center mt-4">
              <p className="text-white text-lg font-grotesk font-medium tracking-wide">{roomName}</p>
              <p className="text-gray-300 text-sm mt-1">
                Image {selectedImageIndex + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}