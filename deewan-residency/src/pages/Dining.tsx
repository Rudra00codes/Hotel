import { diningOptions } from '../data/dining';
import DiningCard from '../components/DiningCard';
import DiningReservationForm from '../components/DiningReservationForm';
import { useSEO } from '../utils/seo';
import { useSanityContent } from '../hooks/useSanityContent';
import { urlFor } from '../lib/urlFor';
import { useMemo } from 'react';

export default function Dining() {
  // Apply SEO for dining page
  useSEO('dining');

  // Fetch dining options from Sanity
  const { data: sanityDining, loading } = useSanityContent<any[]>(
    `*[_type == "diningOption"] {
      _id,
      name,
      description,
      image,
      operatingHours,
      contactInfo,
      cuisineType,
      features,
      menuUrl,
      menuHighlights
    }`
  );

  // Merge/Fallback logic
  const displayDining = useMemo(() => {
    if (loading) return diningOptions;
    
    if (sanityDining && sanityDining.length > 0) {
      return sanityDining.map(item => ({
        id: item._id,
        name: item.name,
        description: item.description,
        image: item.image ? urlFor(item.image).url() : '',
        operatingHours: item.operatingHours || '',
        contactInfo: item.contactInfo || '',
        cuisineType: item.cuisineType || [],
        features: item.features || [],
        menuHighlights: item.menuHighlights ? item.menuHighlights.map((highlight: any, index: number) => ({
          id: `highlight-${index}`,
          name: highlight.name,
          description: highlight.description,
          category: 'main-course', // Default category as it's not in schema
          isVegetarian: highlight.isVegetarian,
          isSpicy: highlight.isSpicy
        })) : []
      }));
    }
    
    return diningOptions;
  }, [sanityDining, loading]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-sinoreta font-extrabold mb-4 uppercase tracking-wide">
            Dining at Deewan Residency
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto font-grotesk">
            Savor authentic flavors and culinary excellence with our diverse dining options
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-sinoreta text-gray-900 mb-4 uppercase tracking-wide">
            Culinary Excellence Awaits
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-grotesk">
            From traditional Indian delicacies to international favorites, our dining options cater to every palate. 
            Experience the perfect blend of authentic flavors, quality ingredients, and exceptional service.
          </p>
        </div>

        {/* Dining Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {displayDining.map((option) => (
            <DiningCard key={option.id} diningOption={option} />
          ))}
        </div>

        {/* Menu Information Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-sinoreta text-gray-900 mb-6 text-center uppercase tracking-wide">
            Our Cuisine Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🍛</span>
              </div>
              <h3 className="font-sinoreta text-gray-900 mb-2 tracking-wide">North Indian</h3>
              <p className="text-sm text-gray-600 font-grotesk">Rich curries, tandoor specialties, and aromatic biryanis</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🥘</span>
              </div>
              <h3 className="font-sinoreta text-gray-900 mb-2 tracking-wide">South Indian</h3>
              <p className="text-sm text-gray-600 font-grotesk">Authentic dosas, idlis, and traditional curries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🥢</span>
              </div>
              <h3 className="font-sinoreta text-gray-900 mb-2 tracking-wide">Chinese</h3>
              <p className="text-sm text-gray-600 font-grotesk">Indo-Chinese favorites and authentic preparations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🍽️</span>
              </div>
              <h3 className="font-sinoreta text-gray-900 mb-2 tracking-wide">Continental</h3>
              <p className="text-sm text-gray-600 font-grotesk">International dishes and comfort food classics</p>
            </div>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="max-w-4xl mx-auto">
          <DiningReservationForm />
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-sinoreta text-gray-900 mb-4 uppercase tracking-wide">
            Ready to Dine With Us?
          </h2>
          <p className="text-gray-600 mb-6 font-grotesk">
            For immediate reservations or special dietary requirements, contact us directly
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="tel:01762-506147"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-grotesk font-medium hover:bg-amber-700 transition-colors tracking-wide"
            >
              📞 Restaurant: 01762-506147
            </a>
            <a
              href="tel:01762-506146"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-grotesk font-medium hover:bg-orange-700 transition-colors tracking-wide"
            >
              📞 Room Service: 01762-506146
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}