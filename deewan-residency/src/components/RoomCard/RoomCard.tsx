import OptimizedImage from '../OptimizedImage';

export interface Room {
  id: string;
  name: string;
  category: 'standard' | 'deluxe' | 'suite';
  description: string;
  amenities: string[];
  images: string[];
  maxOccupancy: number;
  size: string;
  features: string[];
  priceRange: string;
}

interface RoomCardProps {
  room: Room;
  onViewDetails: (roomId: string) => void;
  onInquiry: (roomId: string) => void;
}

export default function RoomCard({ room, onViewDetails, onInquiry }: RoomCardProps) {
  const handleImageError = () => {
    // Error handling is now managed by OptimizedImage component
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full group/card">
      {/* Room Image */}
      <div className="relative h-72 overflow-hidden">
        <OptimizedImage
          src={room.images[0] || '/images/placeholder-room.jpg'}
          alt={`${room.name} - ${room.category} room at Deewan Residency`}
          className="w-full h-full group-hover/card:scale-110 transition-transform duration-700 object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          placeholder="/images/placeholder-room.jpg"
          onError={handleImageError}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold font-grotesk text-white tracking-widest uppercase backdrop-blur-md shadow-lg ${
            room.category === 'standard' ? 'bg-blue-600/90' :
            room.category === 'deluxe' ? 'bg-amber-600/90' :
            'bg-gray-900/90 border border-amber-500/50'
          }`}>
            {room.category}
          </span>
        </div>

        {/* Price Range */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full border border-white/10">
          <span className="text-sm font-grotesk font-bold tracking-wide">{room.priceRange}</span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl md:text-3xl font-sinoreta text-white mb-2 tracking-wide">
            {room.name}
          </h3>
          <div className="flex items-center text-gray-300 text-sm font-grotesk">
            <svg className="w-4 h-4 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="uppercase tracking-wider text-xs font-bold">Up to {room.maxOccupancy} guests</span>
          </div>
        </div>
      </div>

      {/* Room Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Room Size */}
        <div className="flex items-center text-gray-500 text-sm mb-4 font-grotesk border-b border-gray-100 pb-4">
          <svg className="w-4 h-4 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span className="font-medium">{room.size}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3 font-grotesk leading-relaxed text-sm">
          {room.description}
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {room.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold font-grotesk bg-amber-50 text-amber-900 border border-amber-100/50"
              >
                {feature}
              </span>
            ))}
            {room.features.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold font-grotesk bg-gray-50 text-gray-600 border border-gray-100">
                +{room.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onViewDetails(room.id)}
            className="px-4 py-3 rounded-xl text-sm font-bold font-grotesk text-gray-700 border border-gray-200 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 uppercase tracking-wide"
          >
            View Details
          </button>
          <button
            onClick={() => onInquiry(room.id)}
            className="px-4 py-3 rounded-xl text-sm font-bold font-grotesk text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-wide"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}