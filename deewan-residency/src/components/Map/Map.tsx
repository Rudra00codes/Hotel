interface MapProps {
  className?: string;
}

export default function Map({ className = '' }: MapProps) {
  // Hotel coordinates (precise location on Amb-Chd Highway, Derabassi)
  const hotelLocation = {
    lat: 30.6186,
    lng: 76.8256,
    address: "Deewan Residency, Amb-Chd Highway, Near Sukhmani College, Derabassi, Mohali, Punjab 140507",
    shortAddress: "Amb-Chd Highway, Derabassi, Mohali"
  };

  // Google Maps URLs
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelLocation.address)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotelLocation.address)}`;

  return (
    <div className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden ${className}`}>
      {/* Map Header */}
      <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
        <h3 className="text-lg font-semibold text-white mb-2">Our Location</h3>
        <p className="text-sm text-gray-300">
          Conveniently located on Amb-Chd Highway near Sukhmani College
        </p>
      </div>

      {/* Interactive Google Maps */}
      <div className="relative h-96">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2!2d76.8256!3d30.6186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93c8c6f5b5b5%3A0x1234567890abcdef!2sAmb-Chd%20Highway%2C%20Derabassi%2C%20Mohali%2C%20Punjab!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Deewan Residency Location"
          className="rounded-none"
        />
        
        {/* Overlay with location info */}
        <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 text-white p-3 rounded-lg shadow-lg max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-sm">Deewan Residency</span>
          </div>
          <p className="text-xs text-gray-300">
            Amb-Chd Highway, Near Sukhmani College
          </p>
        </div>

        {/* Quick action overlay */}
        <div className="absolute bottom-4 right-4">
          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Open in Maps</span>
          </a>
        </div>
      </div>

      {/* Directions and Transportation */}
      <div className="p-6 space-y-6">
        {/* Address */}
        <div>
          <h4 className="font-semibold text-white mb-2">Address</h4>
          <address className="text-gray-300 not-italic">
            Deewan Residency<br />
            Amb-Chd Highway, Near Sukhmani College<br />
            Derabassi, Mohali, Punjab, India
          </address>
        </div>

        {/* Transportation Options */}
        <div>
          <h4 className="font-semibold text-white mb-4">How to Reach</h4>
          <div className="space-y-4">
            
            {/* By Car */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 6h3l2 7H9l-1-7h5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-white mb-1">By Car</h5>
                <p className="text-sm text-gray-300 mb-2">
                  Located directly on National Highway 44 (Amb-Chd Highway). Easy access with ample free parking.
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• From Chandigarh: 25 km (30 minutes)</div>
                  <div>• From Ambala: 45 km (50 minutes)</div>
                  <div>• From Delhi: 260 km (4.5 hours)</div>
                </div>
              </div>
            </div>

            {/* By Train */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-white mb-1">By Train</h5>
                <p className="text-sm text-gray-300 mb-2">
                  Multiple railway stations nearby with good connectivity.
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Ambala Cantt Junction: 45 km (1 hour by taxi)</div>
                  <div>• Chandigarh Railway Station: 30 km (45 minutes)</div>
                  <div>• Kalka Railway Station: 35 km (50 minutes)</div>
                </div>
              </div>
            </div>

            {/* By Air */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-white mb-1">By Air</h5>
                <p className="text-sm text-gray-300 mb-2">
                  Convenient airport access with multiple transportation options.
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Chandigarh Airport: 30 km (40 minutes)</div>
                  <div>• Delhi IGI Airport: 280 km (5 hours by road)</div>
                  <div>• Pre-paid taxis and shuttles available</div>
                </div>
              </div>
            </div>

            {/* By Bus */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3M8 14V9a2 2 0 012-2h4a2 2 0 012 2v5M8 14H6a2 2 0 01-2-2V9a2 2 0 012-2h2m8 0h2a2 2 0 012 2v3a2 2 0 01-2 2h-2" />
                </svg>
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-white mb-1">By Bus</h5>
                <p className="text-sm text-gray-300 mb-2">
                  Regular bus services from major cities in Punjab and Haryana.
                </p>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>• Derabassi Bus Stand: 2 km (5 minutes)</div>
                  <div>• Regular services from Chandigarh ISBT</div>
                  <div>• State transport and private buses available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Landmarks & Attractions */}
        <div>
          <h4 className="font-semibold text-white mb-4">Nearby Landmarks & Attractions</h4>
          <div className="space-y-3">
            
            {/* Educational Institutions */}
            <div className="bg-gray-700 rounded-lg p-3">
              <h5 className="text-sm font-medium text-green-400 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Educational Institutions
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                <div>• Sukhmani College - 0.5 km</div>
                <div>• DAV College - 3 km</div>
                <div>• Government Schools - 1-2 km</div>
                <div>• Coaching Centers - 2 km</div>
              </div>
            </div>

            {/* Shopping & Markets */}
            <div className="bg-gray-700 rounded-lg p-3">
              <h5 className="text-sm font-medium text-blue-400 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shopping & Markets
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                <div>• Derabassi Market - 2 km</div>
                <div>• Local Shopping Complex - 1 km</div>
                <div>• Zirakpur Mall - 15 km</div>
                <div>• Chandigarh Markets - 25 km</div>
              </div>
            </div>

            {/* Religious Places */}
            <div className="bg-gray-700 rounded-lg p-3">
              <h5 className="text-sm font-medium text-purple-400 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Religious Places
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                <div>• Gurudwara Amb Sahib - 5 km</div>
                <div>• Local Temples - 1-3 km</div>
                <div>• Gurudwara Singh Sabha - 2 km</div>
                <div>• Churches & Mosques - 3-5 km</div>
              </div>
            </div>

            {/* Healthcare & Services */}
            <div className="bg-gray-700 rounded-lg p-3">
              <h5 className="text-sm font-medium text-red-400 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Healthcare & Services
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                <div>• Civil Hospital - 3 km</div>
                <div>• Private Clinics - 1-2 km</div>
                <div>• Pharmacy Stores - 1 km</div>
                <div>• Banks & ATMs - 1-2 km</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-600">
          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            View on Google Maps
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </a>
          <a
            href="tel:01762506147"
            className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Hotel
          </a>
        </div>
      </div>
    </div>
  );
}