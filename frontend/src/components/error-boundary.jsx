import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[Growvia ErrorBoundary caught error]:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-card border border-destructive/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-destructive/15 border border-destructive/30 flex items-center justify-center text-destructive mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              We encountered an unexpected error while loading this page. Our engineers have been notified.
            </p>

            {this.state.error?.message && (
              <div className="bg-black/50 border border-white/10 rounded-xl p-3 mb-6 text-left overflow-x-auto">
                <p className="text-[11px] font-mono text-red-300 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                onClick={this.handleReset}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Reload Page
              </Button>
              <Button
                asChild
                type="button"
                variant="outline"
                className="border-white/15 text-xs text-white"
              >
                <a href="/">
                  <Home className="w-3.5 h-3.5 mr-1.5" /> Return Home
                </a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
