import { useSEO } from '../utils/seo';
import { ProgressiveBlur } from "../components/ui/ProgressiveBlur";

export default function TermsOfService() {
  useSEO('home'); // Using home SEO as fallback

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressiveBlur
        position="top"
        backgroundColor="#000000e8"
        blurAmount="10px"
      />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-sinoreta font-extrabold mb-4 uppercase tracking-wide">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-300 font-grotesk max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our services.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 font-grotesk text-gray-700 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website and services of Deewan Residency, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Booking Policies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Check-in/Check-out:</strong> Standard check-in time is 11:00 AM and check-out time is 11:00 PM. Early check-in and late check-out are subject to availability and may incur additional charges.</li>
              <li><strong>Identification:</strong> Valid government-issued photo identification is required for all guests at the time of check-in.</li>
              <li><strong>Age Requirement:</strong> The primary guest must be at least 18 years of age to check in.</li>
              <li><strong>Occupancy:</strong> Room occupancy limits must be strictly adhered to. Additional guests may be charged extra.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment & Cancellation</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Payment:</strong> Full payment or a deposit may be required at the time of booking or check-in, depending on the rate plan selected.</li>
              <li><strong>Cancellation:</strong> Cancellation policies vary by rate type. Please refer to your specific booking confirmation for details. Generally, cancellations made less than 24 hours before arrival may be subject to a cancellation fee.</li>
              <li><strong>Refunds:</strong> Refunds, if applicable, will be processed within 7-10 business days to the original method of payment.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Guest Conduct</h2>
            <p className="mb-4">
              We strive to provide a comfortable and safe environment for all guests. We reserve the right to refuse service or evict guests who:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Engage in unlawful or disruptive behavior</li>
              <li>Cause damage to hotel property</li>
              <li>Violate our non-smoking policy (smoking is only permitted in designated areas)</li>
              <li>Disturb other guests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Liability</h2>
            <p>
              Deewan Residency is not responsible for any loss, damage, or theft of personal property left in guest rooms or public areas. Guests are advised to use the in-room safes (where available) or deposit valuables at the front desk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of the modified terms.
            </p>
          </section>

          <div className="pt-8 border-t border-gray-100 text-sm text-gray-500">
            <p>Last Updated: December 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
