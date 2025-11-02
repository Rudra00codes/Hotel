import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Amenities from './pages/Amenities';
import Dining from './pages/Dining';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import PerformanceMonitor from './components/PerformanceMonitor';
import { addMobileEventListeners } from './utils/mobileOptimization';
import { initializePerformanceOptimizations } from './utils/performance';

function App() {
  // Initialize optimizations
  useEffect(() => {
    addMobileEventListeners();
    initializePerformanceOptimizations();
  }, []);

  return (
    <Router>
      <PerformanceMonitor />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:roomId" element={<RoomDetail />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
