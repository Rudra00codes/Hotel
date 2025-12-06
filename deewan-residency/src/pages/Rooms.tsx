import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { roomsData, roomCategories } from '../data/rooms';
import { useSEO } from '../utils/seo';

export default function Rooms() {
  // Apply SEO for rooms page
  useSEO('rooms');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  // Filter rooms based on selected category
  const filteredRooms = selectedCategory === 'all' 
    ? roomsData 
    : roomsData.filter(room => room.category === selectedCategory);

  const handleViewDetails = (roomId: string) => {
    navigate(`/rooms/${roomId}`);
  };

  const handleInquiry = (roomId: string) => {
    const room = roomsData.find(r => r.id === roomId);
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
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-sinoreta font-extrabold mb-4 uppercase tracking-wide">
              Rooms & Suites
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-grotesk">
              Discover comfort and luxury in our thoughtfully designed accommodations at Deewan Residency
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {roomCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-grotesk font-medium transition-all duration-200 tracking-wide ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
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
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-sinoreta mb-4 uppercase tracking-wide">
            Need Help Choosing the Perfect Room?
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto font-grotesk">
            Our team is here to help you find the ideal accommodation for your stay at Deewan Residency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-grotesk font-medium hover:bg-gray-100 transition-colors duration-200 tracking-wide"
            >
              Contact Us
            </button>
            <a
              href="tel:01762-506147"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-grotesk font-medium hover:bg-blue-800 transition-colors duration-200 tracking-wide"
            >
              Call: 01762-506147
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}