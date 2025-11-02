import type { DiningOption } from '../../data/dining';
import OptimizedImage from '../OptimizedImage/OptimizedImage';

interface DiningCardProps {
  diningOption: DiningOption;
}

export default function DiningCard({ diningOption }: DiningCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64">
        <OptimizedImage
          src={diningOption.image}
          alt={diningOption.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {diningOption.name}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {diningOption.description}
        </p>
        
        <div className="space-y-3 mb-6">
          <div>
            <span className="text-sm font-semibold text-gray-700">Operating Hours: </span>
            <span className="text-sm text-gray-600">{diningOption.operatingHours}</span>
          </div>
          
          <div>
            <span className="text-sm font-semibold text-gray-700">Contact: </span>
            <a 
              href={`tel:${diningOption.contactInfo}`}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {diningOption.contactInfo}
            </a>
          </div>
          
          <div>
            <span className="text-sm font-semibold text-gray-700">Cuisine Types: </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {diningOption.cuisineType.map((cuisine, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Features:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {diningOption.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Menu Highlights:</h4>
          <div className="space-y-2">
            {diningOption.menuHighlights.slice(0, 4).map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    {item.isVegetarian && (
                      <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">
                        Veg
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded">
                        Spicy
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <a
            href={`tel:${diningOption.contactInfo}`}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
          >
            Make a Reservation
          </a>
        </div>
      </div>
    </div>
  );
}