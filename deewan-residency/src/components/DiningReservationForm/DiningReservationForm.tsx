import { useState } from "react";
import { sendBookingInquiry } from "../../utils/emailService";

interface DiningReservationFormProps {
  diningOption?: string;
}

export default function DiningReservationForm({
  diningOption,
}: DiningReservationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    diningOption: diningOption || "",
    specialRequests: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const bookingData = {
        checkIn: formData.date,
        checkOut: formData.date,
        guests: parseInt(formData.guests) || 2,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomType: `Dining Reservation: ${formData.diningOption || "General"}`,
        specialRequests: `
Dining Reservation Request

Reservation Details:
- Dining Option: ${formData.diningOption || "Not specified"}
- Time: ${formData.time}

Special Requests:
${formData.specialRequests || "None"}
        `,
      };

      const result = await sendBookingInquiry(bookingData);
      if (!result.success) {
        throw new Error(result.message);
      }
      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        diningOption: diningOption || "",
        specialRequests: "",
      });
    } catch (error) {
      console.error("Error sending dining reservation:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-sinoreta text-gray-900 mb-2 uppercase tracking-wide">
          Make a Reservation
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full"></div>
        <p className="text-gray-500 mt-4 font-grotesk text-sm">
          Book your table for an unforgettable dining experience
        </p>
      </div>

      {submitStatus === "success" && (
        <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center animate-fade-in-up">
          <svg
            className="w-5 h-5 mr-3 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-grotesk font-bold">
              Reservation request sent successfully!
            </p>
            <p className="text-sm mt-1 opacity-90">
              We'll contact you shortly to confirm your table.
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center animate-fade-in-up">
          <svg
            className="w-5 h-5 mr-3 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-grotesk font-bold">Failed to send request.</p>
            <p className="text-sm mt-1 opacity-90">
              Please call us directly at 01762-506147.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label
              htmlFor="name"
              className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 ml-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none placeholder-gray-500 font-grotesk"
            />
          </div>

          <div className="group">
            <label
              htmlFor="email"
              className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 ml-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none placeholder-gray-500 font-grotesk"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label
              htmlFor="phone"
              className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none placeholder-gray-500 font-grotesk"
            />
          </div>

          <div className="group">
            <label
              htmlFor="diningOption"
              className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1"
            >
              Dining Venue
            </label>
            <div className="relative ">
              <select
                id="diningOption"
                name="diningOption"
                value={formData.diningOption}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none appearance-none  placeholder-gray-400 font-grotesk cursor-pointer"
              >
                <option value="">Select Venue</option>
                <option value="Deewan Restaurant">Deewan Restaurant</option>
                <option value="Room Service">Room Service</option>
                <option value="Coffee Lounge">Coffee Lounge</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group">
            <label
              htmlFor="date"
              className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 ml-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none font-grotesk cursor-pointer"
            />
          </div>

          <div className="group">
            <label
              htmlFor="time"
              className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none font-grotesk cursor-pointer"
            />
          </div>

          <div className="group">
            <label
              htmlFor="guests"
              className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1"
            >
              Guests
            </label>
            <div className="relative">
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none appearance-none font-grotesk cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? "Person" : "People"}
                  </option>
                ))}
                <option value="13+">13+ (Group)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="group">
          <label
            htmlFor="specialRequests"
            className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1"
          >
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={3}
            placeholder="Allergies, special occasion, high chair needed, etc."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all outline-none placeholder-gray-500 font-grotesk resize-none"
          />
        </div>

        <button
          type="submit"
          data-magnetic
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 rounded-xl font-grotesk font-bold hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 tracking-wide uppercase text-sm"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing Request...
            </span>
          ) : (
            "Confirm Reservation"
          )}
        </button>
      </form>
    </div>
  );
}
