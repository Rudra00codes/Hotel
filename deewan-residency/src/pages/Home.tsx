import Hero from '../components/Hero';
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Deewan Residency
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience exceptional hospitality at our hotel located on the Amb-Chd Highway in Derabassi, Mohali. 
            We offer comfortable accommodations and excellent service for both business and leisure travelers.
          </p>
        </div>
      </section>
    </div>
  );
}