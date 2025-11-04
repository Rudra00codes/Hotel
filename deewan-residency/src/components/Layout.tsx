import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { SimpleNavbar } from './Navbar';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';
import { SmoothCursor } from './ui/cursor';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary>
      {/* Custom Cursor - Desktop Only */}
      <SmoothCursor
        size={20}
        color="#2563eb"
        rotateOnMove={true}
        scaleOnClick={true}
        glowEffect={true}
        showTrail={false}
        magneticDistance={60}
        magneticElements="[data-magnetic]"
        springConfig={{
          damping: 45,
          stiffness: 400,
          mass: 1,
          restDelta: 0.001
        }}
      />
      
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <SimpleNavbar />
        
        {/* Main Content */}
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner fullScreen message="Loading page..." />}>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </Suspense>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}