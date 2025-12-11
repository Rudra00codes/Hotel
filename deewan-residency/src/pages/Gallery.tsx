import Gallery from "../components/Gallery";
import { galleryImages, galleryCategories } from "../data/gallery";
import { useSEO } from "../utils/seo";
import { useSanityContent } from "../hooks/useSanityContent";
import { ProgressiveBlur } from "../components/ui/ProgressiveBlur";
import { urlFor } from "../lib/urlFor";
import { useMemo } from "react";

export default function GalleryPage() {
  // Apply SEO for gallery page
  useSEO("gallery");

  // Fetch gallery images from Sanity
  const { data: sanityGallery, loading: galleryLoading } = useSanityContent<
    any[]
  >(
    `*[_type == "galleryImage"] {
      _id,
      image,
      alt,
      category,
      caption
    }`
  );

  // Merge/Fallback logic for Gallery
  const displayGallery = useMemo(() => {
    if (galleryLoading) return galleryImages;

    if (sanityGallery && sanityGallery.length > 0) {
      return sanityGallery.map((item) => ({
        id: item._id,
        src: item.image ? urlFor(item.image).url() : "",
        alt: item.alt || "",
        category: item.category,
        caption: item.caption,
      }));
    }

    return galleryImages;
  }, [sanityGallery, galleryLoading]);

  return (
    <>
      <div className="relative">
        {/* Progressive Blur Effect - Top */}
        <ProgressiveBlur
          position="top"
          backgroundColor="#000000e8"
          blurAmount="10px"
        />
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative overflow-hidden">
              <div className="text-center relative z-10">
                <h1 className="text-4xl font-sinoreta font-extrabold text-gray-900 mb-4 uppercase tracking-wide">
                  Photo Gallery
                </h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto font-grotesk">
                  Explore Deewan Residency through our comprehensive photo
                  gallery. View our comfortable rooms, dining facilities,
                  amenities, and prime location on Amb-Chandigarh Highway.
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Gallery
              images={displayGallery}
              className="gallery-page"
              showLightbox={true}
            />
          </div>

          {/* Category Information */}
          <div className="bg-stone-50 py-20 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-sinoreta text-gray-900 mb-4 uppercase tracking-wider">
                  Explore Our Facilities
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {galleryCategories.slice(1).map((category) => (
                  <div 
                    key={category.id} 
                    className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>

                    <h3 className="text-xl font-sinoreta text-gray-900 mb-3 tracking-wide group-hover:text-amber-700 transition-colors">
                      {category.label}
                    </h3>
                    <p className="text-gray-600 text-sm font-grotesk leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="relative bg-gray-900 py-24 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ 
              backgroundImage: 'radial-gradient(#fbbf24 1px, transparent 1px)', 
              backgroundSize: '32px 32px' 
            }}></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
              <h2 className="text-4xl md:text-5xl font-sinoreta text-white mb-6 uppercase tracking-wider leading-tight">
                Ready to Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Deewan Residency?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 font-grotesk max-w-2xl mx-auto leading-relaxed">
                Immerse yourself in luxury and comfort. Book your stay today on the Amb-Chandigarh Highway.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="tel:01762506147"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 rounded-full shadow-lg hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 tracking-wide font-grotesk overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </span>
                </a>
                
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-300 border-2 border-gray-700 rounded-full hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-all duration-300 tracking-wide font-grotesk"
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
