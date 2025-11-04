import Gallery from '../components/Gallery';
import { galleryImages, galleryCategories } from '../data/gallery';
import { useSEO } from '../utils/seo';

export default function GalleryPage() {
  // Apply SEO for gallery page
  useSEO('gallery');
  return (
    <>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-grotesk font-extrabold text-gray-900 mb-4 uppercase tracking-wide">
                Photo Gallery
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-grotesk">
                Explore Deewan Residency through our comprehensive photo gallery. 
                View our comfortable rooms, dining facilities, business amenities, 
                and prime location on Amb-Chandigarh Highway.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Gallery 
            images={galleryImages}
            className="gallery-page"
            showLightbox={true}
          />
        </div>

        {/* Category Information */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-grotesk text-gray-900 mb-8 text-center uppercase tracking-wide">
              Explore Our Facilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryCategories.slice(1).map((category) => (
                <div key={category.id} className="text-center p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-grotesk text-gray-900 mb-2 tracking-wide">
                    {category.label}
                  </h3>
                  <p className="text-gray-600 text-sm font-grotesk">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-3xl font-grotesk text-white mb-4 uppercase tracking-wide">
                Ready to Experience Deewan Residency?
              </h2>
              <p className="text-xl text-blue-100 mb-8 font-grotesk">
                Contact us for reservations and availability
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:01762506147"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-grotesk font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200 tracking-wide"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-white text-base font-grotesk font-medium rounded-md text-white hover:bg-blue-700 transition-colors duration-200 tracking-wide"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}