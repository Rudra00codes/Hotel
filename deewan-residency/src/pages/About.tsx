// About page component
import { useSEO } from '../utils/seo';
import { 
  brandStory, 
  awards, 
  teamMembers, 
  locationHighlights,
  certifications 
} from '../data/about';

export default function About() {
  // Apply SEO for about page
  useSEO('about');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="w-full relative bg-black " style={{ minHeight: '30vh' }}>
        {/* Pearl Mist Background with Top Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-white pt-44 pb-28  overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center slide-top-normal">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-grotesk font-extrabold mb-6 uppercase tracking-wide">
              About Deewan Residency
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-grotesk leading-relaxed" style={{ color: '#ffb703' }}>
              Where tradition meets modern hospitality on the Amb-Chandigarh Highway
            </p>
          </div>
        </div>
      </div>

      {/* Brand Story Section */}
      <section className="py-18 md:py-24" style={{ backgroundColor: '#000000ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 slide-top-normal">
            <h2 className="text-3xl md:text-4xl font-grotesk text-white mb-4 uppercase tracking-wide">
              {brandStory.title}
            </h2>
            <p className="text-xl font-grotesk" style={{ color: '#ffb703' }}>
              {brandStory.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16 slide-top-normal">
            <div className="space-y-6">
              {brandStory.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-300 leading-relaxed font-grotesk">
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
          <div className="mt-16 slide-top-normal">
            <h3 className="text-3xl font-grotesk text-white mb-8 text-center uppercase tracking-wide">
              Our Core Values
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandStory.values.map((value, index) => (
                <div 
                  key={index}
                  className="border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#1a1a1a', borderColor: '#ffb703' }}
                >
                  <h4 className="text-xl font-grotesk mb-2 uppercase tracking-wide" style={{ color: '#ffb703' }}>
                    {value.title}
                  </h4>
                  <p className="text-gray-300 font-grotesk leading-relaxed">
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
          <div className="text-center mb-12 slide-top-normal">
            <h2 className="text-3xl md:text-4xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
              Awards & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-grotesk">
              Celebrated for excellence in hospitality and service
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 slide-top-normal">
            {awards.map((award) => (
              <div 
                key={award.id}
                className="rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <div className="text-5xl mb-4">{award.icon}</div>
                <h3 className="text-xl font-grotesk text-white mb-2 uppercase tracking-wide">
                  {award.title}
                </h3>
                <p className="font-grotesk mb-2" style={{ color: '#ffb703' }}>
                  {award.organization}
                </p>
                <p className="text-sm text-gray-400 font-grotesk mb-3">
                  {award.year}
                </p>
                <p className="text-gray-300 leading-relaxed font-grotesk">
                  {award.description}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-16 rounded-2xl p-8 shadow-lg slide-top-normal" style={{ backgroundColor: '#1a1a1a' }}>
            <h3 className="text-2xl font-grotesk text-white mb-6 text-center uppercase tracking-wide">
              Certifications & Licenses
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center">
                  <div className="rounded-lg p-4 mb-3" style={{ backgroundColor: 'rgba(255, 183, 3, 0.1)' }}>
                    <p className="font-grotesk font-semibold uppercase tracking-wide" style={{ color: '#ffb703' }}>
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


      {/* Team Introduction Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 slide-top-normal">
            <h2 className="text-3xl md:text-4xl font-grotesk text-gray-900 mb-4 uppercase tracking-wide">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-grotesk">
              Dedicated professionals committed to making your stay exceptional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 slide-top-normal">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <div className="aspect-square bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-grotesk text-white mb-1 uppercase tracking-wide">
                    {member.name}
                  </h3>
                  <p className="font-grotesk mb-3" style={{ color: '#ffb703' }}>
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3 font-grotesk">
                    {member.bio}
                  </p>
                  {member.specialization && (
                    <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(255, 183, 3, 0.1)' }}>
                      <p className="text-xs font-grotesk font-semibold" style={{ color: '#ffb703' }}>
                        {member.specialization}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Location Advantage Section */}
      <section id="location-advantage" className="py-16 md:py-24" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 slide-top-normal">
            <h2 className="text-3xl md:text-4xl font-grotesk text-white mb-4 uppercase tracking-wide">
              Location Advantage
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-grotesk">
              Strategically located on the Amb-Chandigarh Highway with easy access to major destinations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 slide-top-normal">
            {locationHighlights.map((location) => (
              <div 
                key={location.id}
                className="rounded-xl p-6 hover:shadow-lg transition-all duration-300 border"
                style={{ backgroundColor: '#1a1a1a', borderColor: '#ffb703' }}
              >
                <div className="text-4xl mb-3">{location.icon}</div>
                <h3 className="text-lg font-grotesk text-white mb-2 uppercase tracking-wide">
                  {location.title}
                </h3>
                <p className="text-sm text-gray-300 mb-3 font-grotesk">
                  {location.description}
                </p>
                <div className="bg-gray-900 rounded-lg p-2 border-l-4" style={{ borderColor: '#ffb703' }}>
                  <p className="text-sm font-grotesk font-semibold" style={{ color: '#ffb703' }}>
                    📍 {location.distance}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Neighborhood Guide */}
          <div style={{ background: 'linear-gradient(to right, #1a1a1a, #000000, #1a1a1a)' }} className="rounded-2xl p-8 md:p-12 text-white shadow-xl slide-top-normal">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-grotesk mb-4 uppercase tracking-wide">
                Explore the Neighborhood
              </h3>
              <p className="text-lg max-w-3xl mx-auto font-grotesk leading-relaxed" style={{ color: '#ffb703' }}>
                Derabassi offers a perfect blend of urban convenience and natural beauty. Located strategically 
                between Chandigarh and Ambala, our location provides easy access to business districts, shopping 
                centers, tourist attractions, and scenic getaways.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-grotesk mb-2 uppercase tracking-wide">🏢 Business Hub</h4>
                <p className="font-grotesk" style={{ color: '#ffb703' }}>
                  Minutes away from major industrial areas and IT parks
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-grotesk mb-2 uppercase tracking-wide">🎯 Tourist Spots</h4>
                <p className="font-grotesk" style={{ color: '#ffb703' }}>
                  Quick access to Chandigarh's famous attractions and gardens
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-grotesk mb-2 uppercase tracking-wide">🛣️ Connectivity</h4>
                <p className="font-grotesk" style={{ color: '#ffb703' }}>
                  Prime location on NH-22 with excellent road connectivity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-white" style={{ background: 'linear-gradient(to right, #000000, #1a1a1a, #000000)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center slide-top-normal">
          <h2 className="text-3xl md:text-4xl font-grotesk mb-6 uppercase tracking-wide">
            Experience the Deewan Difference
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto font-grotesk" style={{ color: '#ffb703' }}>
            Join hundreds of satisfied guests who have made Deewan Residency their home away from home
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/rooms"
              className="px-8 py-4 rounded-lg font-grotesk font-semibold hover:bg-gray-800 transition-colors tracking-wide shadow-lg uppercase border-2"
              style={{ backgroundColor: '#1a1a1a', borderColor: '#ffb703', color: '#ffb703' }}
            >
              View Our Rooms
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-grotesk font-semibold transition-colors tracking-wide uppercase"
              style={{ 
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.color = '#ffb703';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Contact Us
            </a>
          </div>
          
          <div className="mt-12 pt-8 border-t" style={{ borderColor: '#ffb703' }}>
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