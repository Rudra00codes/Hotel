// About page component
import { useSEO } from '../utils/seo';
import { Target, Eye, User } from 'lucide-react';
import { useSanityContent } from '../hooks/useSanityContent';
import { urlFor } from '../lib/urlFor';
import { useMemo } from 'react';
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

  // Fetch team members from Sanity
  const { data: sanityTeam, loading: teamLoading } = useSanityContent<any[]>(
    `*[_type == "teamMember"] {
      _id,
      name,
      position,
      image,
      bio,
      specialization
    }`
  );

  // Merge/Fallback logic for Team
  const displayTeam = useMemo(() => {
    if (teamLoading) return teamMembers;
    
    if (sanityTeam && sanityTeam.length > 0) {
      return sanityTeam.map(member => ({
        id: member._id,
        name: member.name,
        position: member.position,
        image: member.image ? urlFor(member.image).url() : '',
        bio: member.bio,
        specialization: member.specialization
      }));
    }
    
    return teamMembers;
  }, [sanityTeam, teamLoading]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="w-full relative pt-16 bg-black overflow-hidden" style={{ minHeight: '30vh' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20"
             style={{
                 backgroundImage: "radial-gradient(#ffb703 1px, transparent 1px)",
                 backgroundSize: "40px 40px"
             }}
        />
        
        {/* Pearl Mist Background with Top Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 183, 3, 0.15), transparent 70%), #000000",
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-white h-full flex flex-col justify-center items-center pt-40 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center slide-top-normal">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sinoreta font-extrabold mb-8 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              About Deewan Residency
            </h1>
            
            <div className="w-32 h-1 mx-auto mb-8 rounded-full" style={{ backgroundColor: '#ffb703' }} />
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-grotesk leading-relaxed tracking-wide" style={{ color: '#ffb703' }}>
              Where tradition meets modern hospitality on the Amb-Chandigarh Highway
            </p>
          </div>
        </div>
      </div>

      {/* Brand Story Section */}
      <section className="pt-18 md:pt-24 pb-8" style={{ backgroundColor: '#000000ff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 slide-top-normal">
            <h2 className="text-3xl md:text-4xl font-sinoreta text-white mb-4 uppercase tracking-wide">
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
            
            <div className="relative rounded-2xl p-8 md:p-10 border border-[#ffb703]/20 bg-[#111] shadow-2xl overflow-hidden group hover:border-[#ffb703]/40 transition-all duration-500">
              {/* Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffb703]/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700 group-hover:bg-[#ffb703]/10" />
              
              <div className="relative z-10 mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-[#ffb703]/10 text-[#ffb703]">
                    <Eye size={24} />
                  </div>
                  <h3 className="text-2xl font-sinoreta text-white uppercase tracking-wide">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed font-grotesk pl-4 border-l-2 border-[#ffb703]/30">
                  {brandStory.vision}
                </p>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-[#ffb703]/10 text-[#ffb703]">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-sinoreta text-white uppercase tracking-wide">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed font-grotesk pl-4 border-l-2 border-[#ffb703]/30">
                  {brandStory.mission}
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-16 pt-16 slide-top-normal">
            <h3 className="text-3xl font-sinoreta text-white mb-8 text-center uppercase tracking-wide">
              Our Core Values
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandStory.values.map((value, index) => (
                <div 
                  key={index}
                  className="border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#1a1a1a', borderColor: '#ffb703' }}
                >
                  <h4 className="text-xl font-sinoreta mb-2 uppercase tracking-wide" style={{ color: '#ffb703' }}>
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
      <section className="mt-16 pt-16 md:pt-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 slide-top-normal">
            <h2 className="text-3xl md:text-4xl font-sinoreta text-gray-900 mb-4 uppercase tracking-wide">
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
                <h3 className="text-xl font-sinoreta text-white mb-2 uppercase tracking-wide">
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
            <h3 className="text-2xl font-sinoreta text-white mb-6 text-center uppercase tracking-wide">
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
      <section className="mt-16 pt-16 md:pt-24 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 slide-top-normal">
            <h2 className="text-3xl md:text-4xl font-sinoreta text-gray-900 mb-4 uppercase tracking-wide">
              Meet Our Team
            </h2>
            <div className="w-24 h-1 mx-auto mb-6 rounded-full bg-[#ffb703]" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-grotesk">
              Dedicated professionals committed to making your stay exceptional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 slide-top-normal">
            {displayTeam.map((member) => (
              <div 
                key={member.id}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-[#111] border border-transparent hover:border-[#ffb703]/30"
              >
                {/* Image Placeholder with Overlay */}
                <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-b from-[#222] to-[#111]">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                      <User size={80} className="text-gray-600 group-hover:text-[#ffb703] transition-colors duration-500" />
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />
                  
                  {/* Hover Reveal Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/90 to-transparent">
                     <p className="text-white/90 text-sm font-grotesk leading-relaxed">
                        {member.bio}
                     </p>
                  </div>
                </div>

                <div className="p-6 relative z-10 bg-[#111] border-t border-gray-800 group-hover:border-[#ffb703]/30 transition-colors duration-300">
                  <h3 className="text-xl font-sinoreta text-white mb-1 uppercase tracking-wide group-hover:text-[#ffb703] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="font-grotesk text-sm font-medium tracking-wider text-gray-400 mb-4 uppercase">
                    {member.position}
                  </p>
                  
                  {member.specialization && (
                    <div className="inline-block rounded-full px-3 py-1 bg-[#ffb703]/10 border border-[#ffb703]/20 group-hover:bg-[#ffb703]/20 transition-colors duration-300">
                      <p className="text-xs font-grotesk font-semibold text-[#ffb703]">
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
      <section id="location-advantage" className="pt-16 pb-16 md:pt-24" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 slide-top-normal">
            <h2 className="text-3xl md:text-4xl font-sinoreta text-white mt-12 uppercase tracking-wide">
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
                <h3 className="text-lg font-sinoreta text-white mb-2 uppercase tracking-wide">
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
              <h3 className="text-3xl font-sinoreta mb-4 uppercase tracking-wide">
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
                <h4 className="text-xl font-sinoreta mb-2 uppercase tracking-wide">🏢 Business Hub</h4>
                <p className="font-grotesk" style={{ color: '#ffb703' }}>
                  Minutes away from major industrial areas and IT parks
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-sinoreta mb-2 uppercase tracking-wide">🎯 Tourist Spots</h4>
                <p className="font-grotesk" style={{ color: '#ffb703' }}>
                  Quick access to Chandigarh's famous attractions and gardens
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-xl font-sinoreta mb-2 uppercase tracking-wide">🛣️ Connectivity</h4>
                <p className="font-grotesk" style={{ color: '#ffb703' }}>
                  Prime location on NH-22 with excellent road connectivity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-16 text-white" style={{ background: 'linear-gradient(to right, #000000, #1a1a1a, #000000)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center slide-top-normal">
          <h2 className="text-3xl md:text-4xl font-sinoreta mb-6 uppercase tracking-wide">
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