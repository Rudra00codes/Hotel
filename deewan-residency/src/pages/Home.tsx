import { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Map from '../components/Map';
import { ClipPathCarousel } from '../components/ui/Carousel';
import GoogleReviews from '../components/GoogleReviews/GoogleReviews';
import { ProgressiveBlur } from '../components/ui/ProgressiveBlur';
import { useSEO } from '../utils/seo';

export default function Home() {
  // Apply SEO for home page
  useSEO('home');

  // Animation refs
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-top-normal');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Progressive Blur Effect - Top */}
      <ProgressiveBlur position="top" backgroundColor="#000000e8" blurAmount="10px" />
      
      <Hero />

      {/* Carousel Section */}
      <section className="py-16 md:py-24 bg-[#EDEDED]" id="carousel-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-32 md:mb-32">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-stardom text-gray-900 mb-4">
              Explore Our Hotel
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-grotesk">
              Experience luxury and comfort on the Chandigarh-Ambala Highway
            </p>
          </div>
          <div
            ref={(el) => {
              if (el && !sectionsRef.current.includes(el)) {
                sectionsRef.current.push(el);
              }
            }}
            className="opacity-0 transition-all duration-1000"
          >
            <ClipPathCarousel autoplay={true} loop={true} />
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Location & Map Section */}
      <section className="pt-44" style={{ backgroundColor: '#000000f2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 slide-top-normal">
            <h2 className="text-3xl font-grotesk text-white mb-6 uppercase tracking-wide">
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