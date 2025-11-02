export default function NavbarDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-grotesk font-bold text-gray-900 mb-6">
            Enhanced Resizable Navbar
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Experience the modern navbar with glassmorphism effects and dynamic resizing. 
            Scroll down to see the navbar transform with smooth animations.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Scroll to See Magic ✨
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-grotesk font-bold text-center text-gray-900 mb-16">
            Navbar Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-grotesk font-semibold text-gray-900 mb-3">
                Dynamic Resizing
              </h3>
              <p className="text-gray-600">
                Navbar intelligently resizes from 100% to 40% width on scroll, creating a focused navigation experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-grotesk font-semibold text-gray-900 mb-3">
                Glassmorphism Effects
              </h3>
              <p className="text-gray-600">
                Beautiful translucent design with backdrop blur and layered shadows for a premium look.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-grotesk font-semibold text-gray-900 mb-3">
                Mobile Optimized
              </h3>
              <p className="text-gray-600">
                Fully responsive design with touch-friendly interactions and optimized mobile animations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-grotesk font-bold text-center text-gray-900 mb-12">
            Keep Scrolling to Test
          </h2>
          
          {/* Content blocks to enable scrolling */}
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="mb-8 p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <h3 className="text-xl font-grotesk font-semibold text-gray-900 mb-4">
                Content Block {i + 1}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This is sample content to demonstrate the navbar behavior during scrolling. 
                Notice how the navbar transforms as you scroll down the page, becoming more compact 
                and focused while maintaining its glassmorphism effects. The animation is smooth 
                and uses spring physics for a natural feel.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Glassmorphism
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Animations
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Responsive
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-grotesk font-semibold mb-4">
            Enhanced Navbar Implementation
          </h3>
          <p className="text-gray-400">
            Built with React, Framer Motion, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}