import { MapPin, Navigation, Phone, Car, Train, Plane, Bus, GraduationCap, ShoppingBag, Landmark, Heart, ExternalLink } from 'lucide-react';

interface MapProps {
  className?: string;
}

export default function Map({ className = '' }: MapProps) {
  const hotelLocation = {
    lat: 30.6186,
    lng: 76.8256,
    address: "Deewan Residency, Amb-Chd Highway, Near Sukhmani College, Derabassi, Mohali, Punjab 140507",
    shortAddress: "Amb-Chd Highway, Derabassi, Mohali"
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelLocation.address)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotelLocation.address)}`;

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Main Map Card */}
      <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2!2d76.8256!3d30.6186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f93c8c6f5b5b5%3A0x1234567890abcdef!2sAmb-Chd%20Highway%2C%20Derabassi%2C%20Mohali%2C%20Punjab!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Deewan Residency Location"
          className="w-full h-full grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
        />
        
        {/* Floating Info Card (Desktop) */}
        <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl max-w-xs border border-white/20 transform transition-transform hover:scale-105 hidden md:block">
          <div className="flex items-start space-x-3">
            <div className="bg-red-50 p-2 rounded-lg">
              <MapPin className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Deewan Residency</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Amb-Chd Highway, Near Sukhmani College, Derabassi
              </p>
            </div>
          </div>
        </div>

        {/* Open in Maps Button */}
        <a
          href={mapSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-6 right-6 bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg text-sm font-medium transition-all flex items-center gap-2 group/btn"
        >
          <span>Open in Maps</span>
          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
        </a>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* How to Reach (Left - 7 cols) */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10">
          <h3 className="text-xl font-sinoreta text-white mb-6 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-400" />
            How to Reach
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            <TransportItem 
              icon={<Car className="w-6 h-6" />}
              title="By Car"
              desc="On NH-44 (Amb-Chd Highway)"
              details={["Chandigarh: 25 km", "Ambala: 45 km", "Delhi: 260 km"]}
              color="blue"
            />
            <TransportItem 
              icon={<Train className="w-6 h-6" />}
              title="By Train"
              desc="Major stations nearby"
              details={["Ambala Cantt: 45 km", "Chandigarh Stn: 30 km"]}
              color="green"
            />
            <TransportItem 
              icon={<Plane className="w-6 h-6" />}
              title="By Air"
              desc="Chandigarh Airport (IXC)"
              details={["Distance: 30 km", "Time: 40 mins"]}
              color="purple"
            />
            <TransportItem 
              icon={<Bus className="w-6 h-6" />}
              title="By Bus"
              desc="Regular state services"
              details={["Derabassi Stand: 2 km", "From ISBT Chd"]}
              color="orange"
            />
          </div>
        </div>

        {/* Nearby & Contact (Right - 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Nearby Landmarks */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10 flex-1">
            <h3 className="text-xl font-sinoreta text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-400" />
              Nearby Landmarks
            </h3>
            
            <div className="space-y-4">
              <LandmarkItem icon={<GraduationCap className="w-4 h-4" />} label="Sukhmani College" dist="0.5 km" />
              <LandmarkItem icon={<ShoppingBag className="w-4 h-4" />} label="Derabassi Market" dist="2.0 km" />
              <LandmarkItem icon={<Landmark className="w-4 h-4" />} label="Gurudwara Amb Sahib" dist="5.0 km" />
              <LandmarkItem icon={<Heart className="w-4 h-4" />} label="Civil Hospital" dist="3.0 km" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all font-medium text-sm gap-2 group"
            >
              <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Get Directions
            </a>
            <a
              href="tel:01762506147"
              className="flex items-center justify-center px-4 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all font-medium text-sm gap-2 border border-white/10"
            >
              <Phone className="w-4 h-4" />
              Call Hotel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TransportItem({ icon, title, desc, details, color }: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: any = {
    blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    green: "bg-green-500/10 text-green-400 border border-green-500/20",
    purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    orange: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dotColors: any = {
    blue: "bg-blue-400",
    green: "bg-green-400",
    purple: "bg-purple-400",
    orange: "bg-orange-400",
  };

  return (
    <div className="flex items-start gap-5 group">
      <div className={`p-3.5 rounded-2xl ${colors[color]} group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-lg shadow-black/20`}>
        {icon}
      </div>
      <div className="pt-1">
        <h4 className="text-white font-semibold text-base mb-1.5 tracking-wide">{title}</h4>
        <p className="text-gray-400 text-sm mb-3 leading-relaxed font-medium opacity-90">{desc}</p>
        <ul className="space-y-2">
          {details.map((d: string, i: number) => (
            <li key={i} className="flex items-center gap-2.5 text-xs text-gray-500 font-medium">
              <span className={`w-1.5 h-1.5 rounded-full ${dotColors[color]} opacity-60`} />
              <span className="leading-none tracking-wide">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LandmarkItem({ icon, label, dist }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
      <div className="flex items-center gap-3">
        <div className="text-gray-400">
          {icon}
        </div>
        <span className="text-gray-300 text-sm">{label}</span>
      </div>
      <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">{dist}</span>
    </div>
  );
}