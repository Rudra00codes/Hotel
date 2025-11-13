import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorCount: 0,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Log to external error tracking service if available
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  public render() {
    if (this.state.hasError) {
      const isDevelopment = import.meta.env.DEV;

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            
            <p className="text-gray-600 mb-4">
              We apologize for the inconvenience. Please try one of the options below.
            </p>

            {isDevelopment && this.state.error && (
              <details className="mb-4 text-left">
                <summary className="cursor-pointer text-sm font-medium text-red-600 mb-2">
                  Error Details (Dev Only)
                </summary>
                <div className="bg-red-50 p-3 rounded text-xs overflow-auto max-h-40">
                  <p className="font-mono text-red-800">{this.state.error.toString()}</p>
                  {this.state.errorInfo && (
                    <pre className="mt-2 text-red-700 whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            {this.state.errorCount > 2 && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                Multiple errors detected. Please contact support if the issue persists.
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Go to Home
              </button>

              <div className="text-sm text-gray-500 pt-2 border-t">
                <p>Need help? Call us at:</p>
                <a
                  href="tel:01762506147"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  01762-506147
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;