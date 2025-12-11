import { diningOptions } from "../data/dining";
import DiningCard from "../components/DiningCard";
import DiningReservationForm from "../components/DiningReservationForm";
import { ProgressiveBlur } from "../components/ui/ProgressiveBlur";
import { useSEO } from "../utils/seo";
import { useSanityContent } from "../hooks/useSanityContent";
import { urlFor } from "../lib/urlFor";
import { useMemo } from "react";

export default function Dining() {
  // Apply SEO for dining page
  useSEO("dining");

  // Fetch dining options from Sanity
  const { data: sanityDining, loading } = useSanityContent<any[]>(
    `*[_type == "diningOption"] {
      _id,
      name,
      description,
      image,
      operatingHours,
      contactInfo,
      cuisineType,
      features,
      menuUrl,
      menuHighlights
    }`
  );

  // Merge/Fallback logic
  const displayDining = useMemo(() => {
    if (loading) return diningOptions;

    if (sanityDining && sanityDining.length > 0) {
      return sanityDining.map((item) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        image: item.image ? urlFor(item.image).url() : "",
        operatingHours: item.operatingHours || "",
        contactInfo: item.contactInfo || "",
        cuisineType: item.cuisineType || [],
        features: item.features || [],
        menuHighlights: item.menuHighlights
          ? item.menuHighlights.map((highlight: any, index: number) => ({
              id: `highlight-${index}`,
              name: highlight.name,
              description: highlight.description,
              category: "main-course", // Default category as it's not in schema
              isVegetarian: highlight.isVegetarian,
              isSpicy: highlight.isSpicy,
            }))
          : [],
      }));
    }

    return diningOptions;
  }, [sanityDining, loading]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progressive Blur Effect - Top */}
      <ProgressiveBlur
        position="top"
        backgroundColor="#000000e0"
        blurAmount="2px"
      />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 to-orange-700 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-sinoreta font-extrabold mb-4 uppercase tracking-wide">
            Dining at Deewan Residency
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto font-grotesk">
            Savor authentic flavors and culinary excellence with our diverse
            dining options
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-sinoreta text-gray-900 mb-4 uppercase tracking-wide">
            Culinary Excellence Awaits
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-grotesk">
            From traditional Indian delicacies to international favorites, our
            dining options cater to every palate. Experience the perfect blend
            of authentic flavors, quality ingredients, and exceptional service.
          </p>
        </div>

        {/* Dining Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {displayDining.map((option) => (
            <DiningCard key={option.id} diningOption={option} />
          ))}
        </div>

        {/* Reservation Form */}
        <div className="max-w-4xl mx-auto">
          <DiningReservationForm />
        </div>

        {/* Contact Information */}
        <div className="mt-16 relative overflow-hidden rounded-2xl bg-gray-900 py-16 px-8 text-center shadow-2xl">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(#fbbf24 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-amber-900/30"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sinoreta text-white mb-6 uppercase tracking-wider">
              Ready to Dine With Us?
            </h2>
            <p className="text-gray-300 mb-10 font-grotesk text-lg leading-relaxed">
              For immediate reservations, special dietary requirements, or to
              plan a private event, our team is at your service.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a
                href="tel:9955442822"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 rounded-full shadow-lg hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 tracking-wide font-grotesk overflow-hidden w-full sm:w-auto"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Restaurant: 9955442822
                </span>
              </a>

              <a
                href="tel:01762-506146"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 bg-white rounded-full shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 tracking-wide font-grotesk w-full sm:w-auto"
              >
                <span className="relative flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.516l2.257-1.13a1 1 0 00.502-1.21l-1.498-4.493a1 1 0 00-.949-.684H5z"
                    />
                  </svg>
                  Room Service: 01762-506146
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
