import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountUp, SplitText } from '../ui';

export default function Hero() {
  const [roomType, setRoomType] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to rooms page with filters
    navigate('/rooms', {
      state: {
        roomType: roomType || 'all',
        location: location || 'derabassi'
      }
    });
  };

  const stats = [
    {
      number: 150,
      suffix: '+',
      label: 'Happy Guests',
      delay: 0.2,
      duration: 2.5
    },
    {
      number: 25,
      suffix: '+',
      label: 'Comfortable Rooms',
      delay: 0.4,
      duration: 2.0
    },
    {
      number: 15,
      suffix: '+',
      label: 'Premium Amenities',
      delay: 0.6,
      duration: 1.8
    }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Split Layout Container */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Left Content Section */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-8 lg:py-16 order-last lg:order-first">
          <div className="max-w-xl mx-auto lg:mx-0 animate-slide-in-up">

            {/* Main Heading with SplitText Animation */}
            <div className="mb-8">
              <div className="mb-4">
                <SplitText
                  text="Reserve Your"
                  tag="h1"
                  className="text-4xl sm:text-5xl lg:text-6xl font-grotesk text-gray-900 leading-tight block grotesk-optimized uppercase tracking-wide"
                  textAlign="left"
                  splitType="chars"
                  delay={50}
                  duration={0.8}
                  ease="power3.out"
                  from={{ opacity: 0, y: 50, rotationX: -90 }}
                  to={{ opacity: 1, y: 0, rotationX: 0 }}
                  threshold={0.2}
                  rootMargin="-50px"
                  onLetterAnimationComplete={() => console.log('Reserve Your animation complete')}
                />
                <SplitText
                  text="Ideal Holiday"
                  tag="h1"
                  className="text-4xl sm:text-5xl lg:text-6xl font-grotesk text-blue-600 leading-tight block mt-2 grotesk-optimized uppercase tracking-wide"
                  textAlign="left"
                  splitType="chars"
                  delay={60}
                  duration={0.9}
                  ease="power3.out"
                  from={{ opacity: 0, y: 60, scale: 0.8 }}
                  to={{ opacity: 1, y: 0, scale: 1 }}
                  threshold={0.2}
                  rootMargin="-50px"
                  onLetterAnimationComplete={() => console.log('Ideal Holiday animation complete')}
                />
              </div>
              
              <SplitText
                text="Let's get acquainted!"
                tag="p"
                className="text-lg sm:text-xl font-grotesk text-gray-700 mb-6 grotesk-optimized tracking-wide"
                textAlign="left"
                splitType="words"
                delay={80}
                duration={0.6}
                ease="power2.out"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.3}
                rootMargin="-30px"
              />
              
              <SplitText
                text="We specialize in providing exceptional hotel accommodation, offering an unparalleled level of comfort, privacy, and convenience for your perfect stay in Derabassi."
                tag="p"
                className="text-sm sm:text-base font-grotesk text-gray-500 leading-relaxed mb-8 grotesk-optimized"
                textAlign="left"
                splitType="words"
                delay={40}
                duration={0.5}
                ease="power2.out"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.4}
                rootMargin="-20px"
              />

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center justify-center px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 group touch-target"
                >
                  More
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <a
                  href="tel:01762506147"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-200 touch-target sm:hidden"
                >
                  <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>

            {/* Statistics with CountUp Animation */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left group relative">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-2"></div>

                  {/* Number with CountUp */}
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 transition-all duration-300 group-hover:text-blue-600 relative z-10">
                    <CountUp
                      to={stat.number}
                      from={0}
                      duration={stat.duration}
                      delay={stat.delay}
                      className="inline-block tabular-nums"
                      separator=","
                      onStart={() => console.log(`Started counting ${stat.label}`)}
                      onEnd={() => console.log(`Finished counting ${stat.label}`)}
                    />
                    <span className="text-blue-600 ml-0.5">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <div className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800 relative z-10">
                    {stat.label}
                  </div>

                  {/* Animated underline on hover */}
                  <div className="w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto lg:mx-0 transition-all duration-500 group-hover:w-full mt-2 rounded-full"></div>

                  {/* Pulse effect on hover */}
                  <div className="absolute inset-0 rounded-lg border-2 border-blue-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 -m-1"></div>
                </div>
              ))}
            </div>

            {/* Featured Property Card */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 mb-6 lg:mb-0 hero-card-shadow">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-float">
                  <span className="text-white text-lg">🏨</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Derabassi, Punjab</div>
                  <div className="font-semibold text-gray-900">Premium Location</div>
                </div>
                <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                  <span className="text-yellow-500 text-sm">⭐</span>
                  <span className="text-xs font-medium text-yellow-700">Popular</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 relative min-h-[60vh] lg:min-h-screen order-first lg:order-last">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hero-bg.jpg')",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 lg:bg-gradient-to-l lg:from-black/60 lg:via-black/20 lg:to-transparent"></div>
          </div>

          {/* Location Badge */}
          <div className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-white/90 backdrop-blur-sm rounded-xl p-2 lg:p-3 shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 lg:w-4 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="text-xs text-gray-500">Derabassi, Punjab</div>
                <div className="text-sm font-semibold text-gray-900">India</div>
              </div>
              <div className="sm:hidden">
                <div className="text-xs font-semibold text-gray-900">Derabassi</div>
              </div>
            </div>
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-lg sm:text-xl font-medium mb-6 leading-relaxed">
              Enjoy a luxurious stay in Derabassi with breathtaking highway views and easy access to the vibrant city life and culinary delights.
            </p>

            {/* Search Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-0 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none cursor-pointer touch-target"
                      aria-label="Select room type"
                    >
                      <option value="">Select Type</option>
                      <option value="standard">Standard Room</option>
                      <option value="deluxe">Deluxe Room</option>
                      <option value="suite">Suite</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl border-0 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none cursor-pointer touch-target"
                      aria-label="Select location"
                    >
                      <option value="">Location</option>
                      <option value="derabassi">Derabassi</option>
                      <option value="mohali">Mohali</option>
                      <option value="chandigarh">Near Chandigarh</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  className="w-full px-8 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 touch-target flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search Rooms</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-8 w-16 h-16 bg-blue-100 rounded-full opacity-20 animate-pulse hidden lg:block"></div>
      <div className="absolute top-40 left-32 w-8 h-8 bg-purple-100 rounded-full opacity-30 animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-yellow-100 rounded-full opacity-25 animate-pulse hidden lg:block"></div>
    </section>
  );
}