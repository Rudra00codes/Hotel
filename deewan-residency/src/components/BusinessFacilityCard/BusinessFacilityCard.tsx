import type { BusinessFacility } from '../../data/businessFacilities';
import OptimizedImage from '../OptimizedImage/OptimizedImage';

interface BusinessFacilityCardProps {
  facility: BusinessFacility;
}

export default function BusinessFacilityCard({ facility }: BusinessFacilityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64">
        <OptimizedImage
          src={facility.image}
          alt={facility.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {facility.name}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {facility.description}
        </p>
        
        <div className="space-y-3 mb-6">
          {facility.capacity && (
            <div>
              <span className="text-sm font-semibold text-gray-700">Capacity: </span>
              <span className="text-sm text-gray-600">{facility.capacity}</span>
            </div>
          )}
          
          <div>
            <span className="text-sm font-semibold text-gray-700">Operating Hours: </span>
            <span className="text-sm text-gray-600">{facility.operatingHours}</span>
          </div>
          
          <div>
            <span className="text-sm font-semibold text-gray-700">Contact: </span>
            <a 
              href={`tel:${facility.contactInfo}`}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {facility.contactInfo}
            </a>
          </div>
          
          {facility.pricing && (
            <div>
              <span className="text-sm font-semibold text-gray-700">Pricing: </span>
              <span className="text-sm text-gray-600">{facility.pricing}</span>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Features:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {facility.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Equipment & Technology:</h4>
          <ul className="grid grid-cols-1 gap-2">
            {facility.equipment.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Booking Requirements:</h4>
          <ul className="space-y-1">
            {facility.bookingRequirements.map((requirement, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <a
            href={`tel:${facility.contactInfo}`}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block mb-2"
          >
            Book This Facility
          </a>
          <p className="text-xs text-gray-500 text-center">
            Call to check availability and make reservations
          </p>
        </div>
      </div>
    </div>
  );
}