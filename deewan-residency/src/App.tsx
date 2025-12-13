import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import PerformanceMonitor from './components/PerformanceMonitor';
import { addMobileEventListeners } from './utils/mobileOptimization';
import { initializePerformanceOptimizations } from './utils/performance';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const Dining = lazy(() => import('./pages/Dining'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const SanityTest = lazy(() => import('./pages/SanityTest'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  // Initialize optimizations
  useEffect(() => {
    addMobileEventListeners();
    initializePerformanceOptimizations();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <PerformanceMonitor />
        <Layout>
          <Suspense fallback={<LoadingSpinner fullScreen message="Loading page..." />}>
            <Routes>
              <Route path="/" element={
                <ErrorBoundary>
                  <Home />
                </ErrorBoundary>
              } />
              <Route path="/rooms" element={
                <ErrorBoundary>
                  <Rooms />
                </ErrorBoundary>
              } />
              <Route path="/rooms/:roomId" element={
                <ErrorBoundary>
                  <RoomDetail />
                </ErrorBoundary>
              } />
              <Route path="/dining" element={
                <ErrorBoundary>
                  <Dining />
                </ErrorBoundary>
              } />
              <Route path="/gallery" element={
                <ErrorBoundary>
                  <Gallery />
                </ErrorBoundary>
              } />
              <Route path="/about" element={
                <ErrorBoundary>
                  <About />
                </ErrorBoundary>
              } />
              <Route path="/contact" element={
                <ErrorBoundary>
                  <Contact />
                </ErrorBoundary>
              } />
              <Route path="/privacy-policy" element={
                <ErrorBoundary>
                  <PrivacyPolicy />
                </ErrorBoundary>
              } />
              <Route path="/terms-of-service" element={
                <ErrorBoundary>
                  <TermsOfService />
                </ErrorBoundary>
              } />
              <Route path="/sanity-test" element={
                <ErrorBoundary>
                  <SanityTest />
                </ErrorBoundary>
              } />
              <Route path="*" element={
                <ErrorBoundary>
                  <NotFound />
                </ErrorBoundary>
              } />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App
