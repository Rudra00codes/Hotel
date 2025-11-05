import Hero from '../components/Hero';
import Map from '../components/Map';
import { useSEO } from '../utils/seo';

export default function Home() {
  // Apply SEO for home page
  useSEO('home');
  return (
    <div>
      <Hero />
      
      {/* Additional homepage content will be added in future tasks */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-grotesk text-gray-800 mb-4 grotesk-optimized uppercase tracking-wide">
            Welcome to Deewan Residency
          </h2>
          <p className="text-lg font-grotesk text-gray-600 max-w-2xl mx-auto grotesk-optimized">
            Experience exceptional hospitality at our hotel located on the Amb-Chd Highway in Derabassi, Mohali. 
            We offer comfortable accommodations and excellent service for both business and leisure travelers.
          </p>
        </div>
      </section>

      {/* Location & Map Section */}
      <section className="py-16" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 slide-top-normal">
            <h2 className="text-3xl font-grotesk text-white mb-4 uppercase tracking-wide">
              Our Location
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-grotesk">
              Find us on Amb-Chd Highway in Derabassi, Mohali. Easily accessible from major cities with excellent connectivity.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto slide-top-normal">
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
}