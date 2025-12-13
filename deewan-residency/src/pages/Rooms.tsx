import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { roomsData, roomCategories as staticCategories } from '../data/rooms';
import { useSEO } from '../utils/seo';
import { useSanityContent } from '../hooks/useSanityContent';
import { urlFor } from '../lib/urlFor';
import type { Room } from '../components/RoomCard/RoomCard';

export default function Rooms() {
  // Apply SEO for rooms page
  useSEO('rooms');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  // Fetch rooms from Sanity
  const { data: sanityRooms, loading } = useSanityContent<any[]>(
    `*[_type == "room"] {
      _id,
      name,
      category,
      description,
      amenities,
      images,
      maxOccupancy,
      size,
      features,
      priceRange
    }`
  );

  // Merge/Fallback logic
  const displayRooms = useMemo(() => {
    if (loading) return roomsData; // Show static data while loading (or could show skeleton)
    
    if (sanityRooms && sanityRooms.length > 0) {
      return sanityRooms.map((room): Room => ({
        id: room._id,
        name: room.name,
        category: room.category || 'standard', // Default category
        description: room.description,
        amenities: room.amenities || [],
        // Handle nested asset object from schema
        images: room.images?.map((img: any) => urlFor(img.asset || img).url()) || [],
        maxOccupancy: room.maxOccupancy,
        size: room.size,
        features: room.features || [],
        priceRange: room.priceRange
      }));
    }
    
    return roomsData;
  }, [sanityRooms, loading]);

  // Calculate categories with dynamic counts
  const categories = useMemo(() => {
    return staticCategories.map(cat => ({
      ...cat,
      count: cat.id === 'all' 
        ? displayRooms.length 
        : displayRooms.filter(r => r.category === cat.id).length
    }));
  }, [displayRooms]);

  // Filter rooms based on selected category
  const filteredRooms = selectedCategory === 'all' 
    ? displayRooms 
    : displayRooms.filter(room => room.category === selectedCategory);

  const handleViewDetails = (roomId: string) => {
    navigate(`/rooms/${roomId}`);
  };

  const handleInquiry = (roomId: string) => {
    const room = displayRooms.find(r => r.id === roomId);
    // Navigate to contact page with room pre-selected
    navigate('/contact', { 
      state: { 
        roomType: room?.name,
        inquiryType: 'booking'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-sinoreta font-extrabold mb-4 uppercase tracking-wide">
              Rooms & Suites
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto font-grotesk">
              Discover comfort and luxury in our thoughtfully designed accommodations at Deewan Residency
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-grotesk font-bold transition-all duration-300 tracking-wide uppercase text-sm ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30 scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-500 hover:text-amber-600'
                }`}
              >
                {category.name}
                <span className={`ml-2 text-xs ${selectedCategory === category.id ? 'text-amber-100' : 'text-gray-400'}`}>
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onViewDetails={handleViewDetails}
              onInquiry={handleInquiry}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-sinoreta font-medium text-gray-900 mb-2 tracking-wide">
              No rooms found
            </h3>
            <p className="text-gray-600 font-grotesk">
              Try selecting a different category to see available rooms.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 relative overflow-hidden rounded-2xl bg-gray-900 py-16 px-8 text-center shadow-2xl">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#fbbf24 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-amber-900/30"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sinoreta text-white mb-6 uppercase tracking-wider">
              Need Help Choosing the Perfect Room?
            </h2>
            <p className="text-lg text-gray-300 mb-10 font-grotesk leading-relaxed">
              Our team is here to help you find the ideal accommodation for your stay at Deewan Residency.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 bg-white rounded-full shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 tracking-wide font-grotesk w-full sm:w-auto"
              >
                Contact Us
              </button>
              <a
                href="tel:01762-506147"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 rounded-full shadow-lg hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 tracking-wide font-grotesk overflow-hidden w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">Call: 01762-506147</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}