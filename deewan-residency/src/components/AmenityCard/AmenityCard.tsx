import type { Amenity } from '../../data/amenities';
import OptimizedImage from '../OptimizedImage/OptimizedImage';

interface AmenityCardProps {
  amenity: Amenity;
}

export default function AmenityCard({ amenity }: AmenityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <OptimizedImage
          src={amenity.image}
          alt={amenity.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {amenity.name}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {amenity.description}
        </p>
        
        {amenity.operatingHours && (
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-700">Operating Hours: </span>
            <span className="text-sm text-gray-600">{amenity.operatingHours}</span>
          </div>
        )}
        
        {amenity.contactInfo && (
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700">Contact: </span>
            <a 
              href={`tel:${amenity.contactInfo}`}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {amenity.contactInfo}
            </a>
          </div>
        )}
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {amenity.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}