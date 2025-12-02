import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Home, Mail, MapPin, Coffee, BedDouble } from 'lucide-react';
import { motion } from 'motion/react';

const NotFound = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to a search results page
    // For now, we'll just redirect to home if query exists
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-black rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-medium text-gray-500 mb-4 uppercase tracking-widest">Oops! Page Not Found</h2>
          
          {/* 404 Visual */}
          <div className="relative inline-block mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-gray-900 select-none">
              4
              <span className="relative inline-block mx-2">
                0
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                </motion.div>
              </span>
              4
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            We couldn't find the page you're looking for. It might have been removed, renamed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="max-w-md mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for rooms, amenities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm text-lg"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-black text-white rounded-full p-3 hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </form>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            to="/" 
            className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
          <Link 
            to="/contact" 
            className="flex items-center gap-2 px-8 py-3 bg-white text-black border border-gray-300 rounded-full hover:bg-gray-50 transition-all transform hover:scale-105 shadow-sm"
          >
            <Mail size={20} />
            <span>Contact Support</span>
          </Link>
        </motion.div>

        {/* Suggested Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-200 pt-10"
        >
          <p className="text-gray-500 mb-6">Or try one of these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/rooms" className="flex items-center gap-2 text-gray-800 hover:text-black font-medium transition-colors group">
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <BedDouble size={18} />
              </div>
              <span>Our Rooms</span>
            </Link>
            <Link to="/dining" className="flex items-center gap-2 text-gray-800 hover:text-black font-medium transition-colors group">
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <Coffee size={18} />
              </div>
              <span>Dining</span>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 text-gray-800 hover:text-black font-medium transition-colors group">
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <MapPin size={18} />
              </div>
              <span>Location</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
