import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { SimpleNavbar } from './Navbar';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary>
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