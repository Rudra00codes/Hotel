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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Room Image */}
      <div className="relative h-64 overflow-hidden group">
        <OptimizedImage
          src={room.images[0] || '/images/placeholder-room.jpg'}
          alt={`${room.name} - ${room.category} room at Deewan Residency`}
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          placeholder="/images/placeholder-room.jpg"
          onError={handleImageError}
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
            room.category === 'standard' ? 'bg-blue-600' :
            room.category === 'deluxe' ? 'bg-purple-600' :
            'bg-gold-600'
          }`}>
            {room.category.charAt(0).toUpperCase() + room.category.slice(1)}
          </span>
        </div>

        {/* Price Range */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
          <span className="text-sm font-medium">{room.priceRange}</span>
        </div>
      </div>

      {/* Room Content */}
      <div className="p-6">
        {/* Room Name and Occupancy */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>Up to {room.maxOccupancy} guests</span>
          </div>
        </div>

        {/* Room Size */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          <span>{room.size}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 line-clamp-3">{room.description}</p>

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {room.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {feature}
              </span>
            ))}
            {room.features.length > 3 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{room.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails(room.id)}
            className="flex-1 bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200"
          >
            View Details
          </button>
          <button
            onClick={() => onInquiry(room.id)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}