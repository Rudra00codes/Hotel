import ContactForm from '../components/ContactForm';
import { useSEO } from '../utils/seo';

export default function Contact() {
  // Apply SEO for contact page
  useSEO('contact');
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div 
        className="text-white pt-36 pb-16"
        style={{ background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center slide-top-normal">
            <h1 className="text-4xl md:text-6xl font-grotesk font-extrabold mb-6 text-white uppercase tracking-wide">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-grotesk">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="relative pt-36">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/contact-section-bg.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-600/30 via-gray-800/90 to-gray-900/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div className="space-y-8 slide-top-normal">
              <div>
                <h2 className="text-3xl font-grotesk text-white mb-8 uppercase tracking-wide drop-shadow-2xl">
                  Contact Information
                </h2>
                <p className="text-gray-100 mb-8 leading-relaxed font-grotesk text-lg">
                  Reach out to us through any of the following channels. Our team is here to help you find your perfect stay.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                
                {/* Phone Numbers */}
                <div className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-grotesk text-white mb-1 tracking-wide font-medium">Phone</h3>
                    <div className="space-y-1">
                      <a 
                        href="tel:01762506147" 
                        className="block text-gray-200 hover:text-white font-grotesk text-lg transition-colors"
                      >
                        01762-506147
                      </a>
                      <a 
                        href="tel:01762506146" 
                        className="block text-gray-200 hover:text-white font-grotesk text-lg transition-colors"
                      >
                        01762-506146
                      </a>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 font-grotesk">Mon-Fri 8am to 6pm</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-grotesk text-white mb-1 tracking-wide font-medium">Email</h3>
                    <a 
                      href="mailto:thedeewanhotel@gmail.com" 
                      className="block text-gray-200 hover:text-white font-grotesk text-lg transition-colors"
                    >
                      thedeewanhotel@gmail.com
                    </a>
                    <p className="text-sm text-gray-400 mt-2 font-grotesk">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-5 group">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-grotesk text-white mb-1 tracking-wide font-medium">Office</h3>
                    <address className="text-gray-200 not-italic leading-relaxed font-grotesk text-lg">
                      Amb-Chd Highway<br />
                      Near Sukhmani College<br />
                      Derabassi, Mohali, Punjab
                    </address>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl mt-8">
                <h3 className="text-lg font-grotesk text-white mb-6 tracking-wide font-semibold border-b border-white/10 pb-4">Operating Hours</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-grotesk">Monday - Friday</span>
                    <span className="text-white font-grotesk font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-grotesk">Saturday</span>
                    <span className="text-white font-grotesk font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-grotesk">Sunday</span>
                    <span className="text-white-300 font-grotesk font-medium bg-green-500/30 px-3 py-1 rounded-full text-sm">Open</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="slide-top-normal">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}