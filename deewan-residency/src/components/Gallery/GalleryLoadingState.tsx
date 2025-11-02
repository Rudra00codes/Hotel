interface GalleryLoadingStateProps {
  count?: number;
}

export default function GalleryLoadingState({ count = 12 }: GalleryLoadingStateProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="aspect-square bg-gray-200 animate-pulse rounded-lg"
          role="img"
          aria-label="Loading gallery image"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-400" aria-hidden="true">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}