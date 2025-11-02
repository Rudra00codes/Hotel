import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import RoomGallery from '../components/RoomGallery';
import InquiryForm from '../components/InquiryForm';
import { roomsData } from '../data/rooms';
import type { Room } from '../components/RoomCard/RoomCard';
import { useSEO } from '../utils/seo';

export default function RoomDetail() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const room = roomsData.find((r: Room) => r.id === roomId);

  // Apply dynamic SEO for room detail page
  useSEO('rooms', room ? {
    title: `${room.name} - Room Details | Deewan Residency Derabassi`,
    description: `Book the ${room.name} at Deewan Residency. ${room.description} Located on Amb-Chd Highway, Derabassi with excellent amenities.`,
    keywords: `${room.name.toLowerCase()}, ${room.category} room derabassi, hotel room booking mohali, deewan residency accommodation`
  } : undefined);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h1>
          <p className="text-gray-600 mb-6">The room you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/rooms')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Room Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RoomGallery
            images={room.images}
            roomName={room.name}
            className="mb-8"
          />
        </div>
      </div>

      {/* Room Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Room Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h1>
                  <div className="flex items-center text-gray-600">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium text-white mr-4 ${
                      room.category === 'standard' ? 'bg-blue-600' :
                      room.category === 'deluxe' ? 'bg-purple-600' :
                      'bg-gold-600'
                    }`}>
                      {room.category.charAt(0).toUpperCase() + room.category.slice(1)}
                    </span>
                    <span className="text-lg font-semibold">{room.priceRange}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>Up to {room.maxOccupancy} guests</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>{room.size}</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">{room.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Room Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book This Room</h3>
              <p className="text-gray-600 mb-6">
                Contact us to check availability and make a reservation for the {room.name}.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowInquiryForm(true)}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Check Availability
                </button>
                
                <div className="text-center text-gray-500">
                  <p className="text-sm">Or call us directly:</p>
                  <div className="mt-2 space-y-1">
                    <a href="tel:01762506147" className="block text-blue-600 hover:text-blue-700 font-medium">
                      01762-506147
                    </a>
                    <a href="tel:01762506146" className="block text-blue-600 hover:text-blue-700 font-medium">
                      01762-506146
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Book {room.name}</h3>
                <button
                  onClick={() => setShowInquiryForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <InquiryForm
                prefilledRoomType={room.name}
                onSuccess={() => setShowInquiryForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}