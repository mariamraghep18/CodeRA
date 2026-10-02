import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * CodeRa Security-Hardened Error Boundary
 * Catches unhandled runtime render exceptions, prevents white-screen crashes,
 * and masks technical internal stack traces from potential malicious enumeration.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Secure sanitized logging - avoids leaking sensitive internal state
    console.error('[CodeRa Security Shield] Uncaught React UI Exception:', {
      name: error?.name,
      message: error?.message,
      componentStack: errorInfo?.componentStack?.slice(0, 300),
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleHome = () => {
    window.location.hash = '#/';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 text-white font-sans">
          <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center border border-rose-500/30">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold font-serif tracking-tight text-white">
                Application Shield Active
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                CodeRa encountered an isolated rendering error. Your session data remains safe and protected.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-700/50 text-[11px] font-mono text-slate-400 text-start overflow-hidden">
              <span className="text-rose-400 font-bold block mb-1">Status: Protected Fallback</span>
              <p className="truncate">Reference: {this.state.error?.message || 'Component Exception'}</p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload CodeRa</span>
              </button>
              <button
                type="button"
                onClick={this.handleHome}
                className="py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
