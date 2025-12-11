import { useState } from "react";
import type { DiningOption } from "../../data/dining";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

interface DiningCardProps {
  diningOption: DiningOption;
}

export default function DiningCard({ diningOption }: DiningCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full group/card">
      <div className="relative h-72 overflow-hidden">
        <OptimizedImage
          src={diningOption.image}
          alt={diningOption.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 tracking-wide">
            {diningOption.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {diningOption.cuisineType.slice(0, 3).map((cuisine, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm font-grotesk uppercase tracking-wider"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-6">
          <p
            className={`text-gray-600 leading-relaxed font-grotesk ${!isExpanded ? "line-clamp-3" : ""}`}
          >
            {diningOption.description}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-sm text-gray-600 font-grotesk">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mr-3 text-amber-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Opening Hours
              </span>
              <span className="font-medium text-gray-900">
                {diningOption.operatingHours}
              </span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 font-grotesk">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center mr-3 text-amber-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                Contact
              </span>
              <a
                href={`tel:${diningOption.contactInfo}`}
                className="font-medium text-gray-900 hover:text-amber-600 transition-colors"
              >
                {diningOption.contactInfo}
              </a>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="pt-6 border-t border-gray-100 space-y-8 pb-4">
            {/* Features */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider font-grotesk flex items-center">
                <span className="w-1 h-4 bg-amber-500 mr-2 rounded-full"></span>
                Features
              </h4>
              <ul className="grid grid-cols-1 gap-3">
                {diningOption.features.map((feature, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-start font-grotesk bg-gray-50 p-2 rounded-lg"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Menu Highlights */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider font-grotesk flex items-center">
                <span className="w-1 h-4 bg-amber-500 mr-2 rounded-full"></span>
                Menu Highlights
              </h4>
              <div className="space-y-4">
                {diningOption.menuHighlights.slice(0, 4).map((item) => (
                  <div key={item.id} className="group/item">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-base font-sinoreta text-gray-900 tracking-wide group-hover/item:text-amber-600 transition-colors">
                        {item.name}
                      </span>
                      <div className="flex gap-1">
                        {item.isVegetarian && (
                          <span
                            className="w-2 h-2 rounded-full bg-green-500 ring-2 ring-green-100"
                            title="Vegetarian"
                          ></span>
                        )}
                        {item.isSpicy && (
                          <span
                            className="w-2 h-2 rounded-full bg-red-500 ring-2 ring-red-100"
                            title="Spicy"
                          ></span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-grotesk leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center py-2 text-xs font-bold text-gray-500 hover:text-amber-600 transition-colors uppercase tracking-widest font-grotesk mb-4 group/btn"
          >
            {isExpanded ? "Show Less" : "View Details"}
            <svg
              className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : "group-hover/btn:translate-y-0.5"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <a
            href={`tel:${diningOption.contactInfo}`}
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg hover:shadow-gray-900/20 hover:-translate-y-0.5 transition-all duration-300 text-center block uppercase tracking-wide text-sm font-grotesk relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center">
              Reserve Table
              <svg
                className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>
      </div>
    </div>
  );
}
