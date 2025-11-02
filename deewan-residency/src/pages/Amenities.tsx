import { useState } from 'react';
import { amenitiesData, getAllCategories } from '../data/amenities';
import { businessFacilities } from '../data/businessFacilities';
import AmenityCard from '../components/AmenityCard';
import CategoryFilter from '../components/CategoryFilter';
import BusinessFacilityCard from '../components/BusinessFacilityCard';
import BusinessBookingForm from '../components/BusinessBookingForm';
import { useSEO } from '../utils/seo';

export default function Amenities() {
  // Apply SEO for amenities page
  useSEO('amenities');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = getAllCategories();

  const filteredAmenities = activeCategory
    ? amenitiesData.filter(amenity => amenity.category === activeCategory)
    : amenitiesData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-grotesk mb-4 uppercase tracking-wide">
            Hotel Amenities & Services
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-grotesk">
            Discover our comprehensive range of facilities designed to make your stay comfortable and memorable
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAmenities.map((amenity) => (
            <AmenityCard key={amenity.id} amenity={amenity} />
          ))}
        </div>

        {/* Business Facilities Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
              Business Facilities
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-grotesk">
              Professional meeting spaces and business services designed to support your corporate needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {businessFacilities.map((facility) => (
              <BusinessFacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
          
          {/* Business Booking Form */}
          <div className="max-w-4xl mx-auto">
            <BusinessBookingForm />
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
            Need More Information?
          </h2>
          <p className="text-gray-600 mb-6 font-grotesk">
            Our friendly staff is available 24/7 to assist you with any questions about our amenities and services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="tel:01762-506147"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-grotesk font-medium hover:bg-blue-700 transition-colors tracking-wide"
            >
              📞 Call: 01762-506147
            </a>
            <a
              href="tel:01762-506146"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-grotesk font-medium hover:bg-blue-700 transition-colors tracking-wide"
            >
              📞 Call: 01762-506146
            </a>
            <a
              href="mailto:thedeewanhotel@gmail.com"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-grotesk font-medium hover:bg-gray-700 transition-colors tracking-wide"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}