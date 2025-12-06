import { useEffect } from 'react';

export default function GoogleReviews() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-sinoreta text-gray-900 mb-4">
            Guest Reviews
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-grotesk">
            See what our guests have to say about their stay at Deewan Residency
          </p>
        </div>
        <div className="elfsight-app-37f644db-f7a5-4f08-9892-e9cf4089d1ee" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}
