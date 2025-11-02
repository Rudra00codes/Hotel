import InquiryForm from '../InquiryForm';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            {/* Hotel Name and Tagline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Deewan Residency
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Experience Comfort & Hospitality on Amb-Chd Highway
            </p>
            <p className="text-lg md:text-xl mb-12 opacity-90">
              Your Perfect Stay in Derabassi, Mohali
            </p>

            {/* Primary Inquiry Form */}
            <div className="max-w-2xl mx-auto">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
}