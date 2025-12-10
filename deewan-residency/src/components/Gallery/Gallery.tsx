import { useState, useCallback, useEffect } from 'react';
import OptimizedImage from '../OptimizedImage';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'rooms' | 'dining' | 'amenities' | 'exterior';
  caption?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  className?: string;
  showLightbox?: boolean;
}

export default function Gallery({ images, className = '', showLightbox = true }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'dining', label: 'Dining' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'exterior', label: 'Exterior' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = useCallback((image: GalleryImage, index: number) => {
    if (showLightbox) {
      setLightboxImage(image);
      setLightboxIndex(index);
    }
  }, [showLightbox]);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage?.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setLightboxImage(filteredImages[newIndex]);
    setLightboxIndex(newIndex);
  }, [filteredImages, lightboxImage]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxImage) return;
    
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
  }, [lightboxImage, closeLightbox, navigateLightbox]);

  // Add keyboard event listener
  useEffect(() => {
    if (lightboxImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxImage, handleKeyDown]);

  return (
    <div className={`gallery ${className}`}>
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Photo categories">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              role="tab"
              aria-selected={selectedCategory === category.id}
              aria-controls="gallery-grid"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div 
        id="gallery-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        role="tabpanel"
        aria-label={`${selectedCategory === 'all' ? 'All photos' : categories.find(c => c.id === selectedCategory)?.label} gallery`}
      >
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
            onClick={() => openLightbox(image, index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(image, index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ${image.alt} in lightbox`}
          >
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              className="aspect-square"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              loading="lazy"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 group-focus:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>

            {/* Caption */}
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white text-sm font-medium">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && showLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white z-50 transition-colors p-2 hover:bg-white/10 rounded-full focus:outline-none"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white z-50 transition-all p-2 md:p-3 hover:bg-white/10 rounded-full focus:outline-none"
                aria-label="Previous image"
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white z-50 transition-all p-2 md:p-3 hover:bg-white/10 rounded-full focus:outline-none"
                aria-label="Next image"
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Container */}
          <div 
            className="relative max-w-7xl max-h-full flex flex-col items-center justify-center w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex justify-center items-center rounded-lg shadow-2xl">
              <OptimizedImage
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="flex justify-center items-center"
                imgClassName="max-h-[70vh] md:max-h-[85vh] max-w-[95vw] md:max-w-[90vw] w-auto h-auto object-contain"
                loading="eager"
                sizes="90vw"
              />
            </div>
            
            {/* Image Info */}
            <div className="text-center mt-4 md:mt-6 max-w-3xl px-4 animate-fade-in-up">
              {lightboxImage.caption && (
                <p className="text-white text-base md:text-xl font-light tracking-wide font-grotesk leading-relaxed">
                  {lightboxImage.caption}
                </p>
              )}
              <p className="text-white/40 text-xs mt-2 md:mt-3 uppercase tracking-widest font-medium">
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}