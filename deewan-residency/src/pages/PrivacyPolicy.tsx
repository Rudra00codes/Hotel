import { useSEO } from '../utils/seo';
import { ProgressiveBlur } from "../components/ui/ProgressiveBlur";

export default function PrivacyPolicy() {
  useSEO('home'); // Using home SEO as fallback, ideally should have specific SEO

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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-300 font-grotesk max-w-2xl mx-auto">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 font-grotesk text-gray-700 space-y-8">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us when you make a reservation, contact us, or use our services. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Payment information (Credit card details, billing address)</li>
              <li>Booking details (Dates of stay, room preferences, special requests)</li>
              <li>Government-issued identification (required at check-in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and confirm your reservations</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Send you important updates regarding your stay</li>
              <li>Improve our services and website experience</li>
              <li>Comply with legal obligations and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Protection</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your payment information is processed securely through industry-standard encryption protocols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking</h2>
            <p>
              Our website uses cookies to enhance your browsing experience and analyze website traffic. You can choose to disable cookies through your browser settings, but this may limit some features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="font-bold text-gray-900">Deewan Residency</p>
              <p>Amb-Chd Highway, Sukhmani College</p>
              <p>Derabassi (Mohali), Punjab, India</p>
              <p className="mt-2">Email: thedeewanhotel@gmail.com</p>
              <p>Phone: +91 9955442822</p>
            </div>
          </section>

          <div className="pt-8 border-t border-gray-100 text-sm text-gray-500">
            <p>Last Updated: December 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
