// About page component
import { useSEO } from '../utils/seo';
import { 
  brandStory, 
  awards, 
  sustainabilityInitiatives, 
  teamMembers, 
  companyCulture,
  locationHighlights,
  certifications 
} from '../data/about';

export default function About() {
  // Apply SEO for about page
  useSEO('about');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-grotesk mb-6 uppercase tracking-wide">
            About Deewan Residency
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-grotesk leading-relaxed">
            Where tradition meets modern hospitality on the Amb-Chandigarh Highway
          </p>
        </div>
      </div>

      {/* Brand Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
              {brandStory.title}
            </h2>
            <p className="text-xl text-blue-600 font-grotesk">
              {brandStory.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              {brandStory.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed font-grotesk">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg">
              <div className="mb-8">
                <h3 className="text-2xl font-grotesk text-gray-900 mb-3 uppercase tracking-wide">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed font-grotesk">
                  {brandStory.vision}
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-grotesk text-gray-900 mb-3 uppercase tracking-wide">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed font-grotesk">
                  {brandStory.mission}
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16">
            <h3 className="text-3xl font-grotesk text-gray-900 mb-8 text-center uppercase tracking-wide">
              Our Core Values
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandStory.values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="text-xl font-grotesk text-blue-600 mb-2 uppercase tracking-wide">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 font-grotesk leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
              Awards & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-grotesk">
              Celebrated for excellence in hospitality and service
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award) => (
              <div 
                key={award.id}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-5xl mb-4">{award.icon}</div>
                <h3 className="text-xl font-grotesk text-gray-900 mb-2 uppercase tracking-wide">
                  {award.title}
                </h3>
                <p className="text-blue-600 font-grotesk mb-2">
                  {award.organization}
                </p>
                <p className="text-sm text-gray-500 font-grotesk mb-3">
                  {award.year}
                </p>
                <p className="text-gray-600 leading-relaxed font-grotesk">
                  {award.description}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-grotesk text-gray-900 mb-6 text-center uppercase tracking-wide">
              Certifications & Licenses
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-50 rounded-lg p-4 mb-3">
                    <p className="font-grotesk font-semibold text-blue-600 uppercase tracking-wide">
                      {cert.title}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 font-grotesk">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Initiatives Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
              Sustainability Initiatives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-grotesk">
              Committed to environmental responsibility and community welfare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sustainabilityInitiatives.map((initiative) => (
              <div 
                key={initiative.id}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 border border-green-100"
              >
                <div className="text-4xl mb-4">{initiative.icon}</div>
                <h3 className="text-xl font-grotesk text-gray-900 mb-3 uppercase tracking-wide">
                  {initiative.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4 font-grotesk">
                  {initiative.description}
                </p>
                <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                  <p className="text-sm font-grotesk text-green-700 font-semibold">
                    Impact: {initiative.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Introduction Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-grotesk">
              Dedicated professionals committed to making your stay exceptional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-grotesk text-gray-900 mb-1 uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-grotesk mb-3">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 font-grotesk">
                    {member.bio}
                  </p>
                  {member.specialization && (
                    <div className="bg-blue-50 rounded-lg p-2">
                      <p className="text-xs font-grotesk text-blue-700 font-semibold">
                        {member.specialization}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Company Culture */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
                {companyCulture.title}
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto font-grotesk">
                {companyCulture.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyCulture.highlights.map((highlight, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{highlight.icon}</div>
                  <h4 className="text-lg font-grotesk text-gray-900 mb-2 uppercase tracking-wide">
                    {highlight.title}
                  </h4>
                  <p className="text-sm text-gray-600 font-grotesk">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Advantage Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
              Location Advantage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-grotesk">
              Strategically located on the Amb-Chandigarh Highway with easy access to major destinations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {locationHighlights.map((location) => (
              <div 
                key={location.id}
                className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-100"
              >
                <div className="text-4xl mb-3">{location.icon}</div>
                <h3 className="text-lg font-grotesk text-gray-900 mb-2 uppercase tracking-wide">
                  {location.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 font-grotesk">
                  {location.description}
                </p>
                <div className="bg-white rounded-lg p-2 border-l-4 border-blue-500">
                  <p className="text-sm font-grotesk text-blue-700 font-semibold">
                    📍 {location.distance}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Neighborhood Guide */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-grotesk mb-4 uppercase tracking-wide">
                Explore the Neighborhood
              </h3>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto font-grotesk leading-relaxed">
                Derabassi offers a perfect blend of urban convenience and natural beauty. Located strategically 
                between Chandigarh and Ambala, our location provides easy access to business districts, shopping 
                centers, tourist attractions, and scenic getaways.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-grotesk mb-2 uppercase tracking-wide">🏢 Business Hub</h4>
                <p className="text-blue-100 font-grotesk">
                  Minutes away from major industrial areas and IT parks
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-grotesk mb-2 uppercase tracking-wide">🎯 Tourist Spots</h4>
                <p className="text-blue-100 font-grotesk">
                  Quick access to Chandigarh's famous attractions and gardens
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-grotesk mb-2 uppercase tracking-wide">🛣️ Connectivity</h4>
                <p className="text-blue-100 font-grotesk">
                  Prime location on NH-22 with excellent road connectivity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-grotesk mb-6 uppercase tracking-wide">
            Experience the Deewan Difference
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto font-grotesk">
            Join hundreds of satisfied guests who have made Deewan Residency their home away from home
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/rooms"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-grotesk font-semibold hover:bg-blue-50 transition-colors tracking-wide shadow-lg uppercase"
            >
              View Our Rooms
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-grotesk font-semibold hover:bg-white hover:text-blue-600 transition-colors tracking-wide uppercase"
            >
              Contact Us
            </a>
          </div>
          
          <div className="mt-12 pt-8 border-t border-blue-500">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-blue-100">
              <a href="tel:01762-506147" className="hover:text-white transition-colors font-grotesk">
                📞 01762-506147
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="tel:01762-506146" className="hover:text-white transition-colors font-grotesk">
                📞 01762-506146
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="mailto:thedeewanhotel@gmail.com" className="hover:text-white transition-colors font-grotesk">
                ✉️ thedeewanhotel@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}